import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"
import { UserLogger } from "@/lib/user-logger"
import { getCurrentUser } from "@/lib/auth"
import { loginSchema, parseBody } from "@/lib/validations"
import { rateLimit } from "@/lib/rate-limit"

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  const { allowed, retryAfterMs } = rateLimit(`login:${ip}`, 5, 60_000)
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many login attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) } }
    )
  }

  try {
    const body = await req.json()
    const { data: parsed, error: validationError } = parseBody(loginSchema, body)

    if (validationError) {
      await UserLogger.logSystemAction(
        'login_attempt',
        'Login attempt with invalid credentials',
        { error: validationError },
        req
      )
      return NextResponse.json({ error: validationError }, { status: 400 })
    }

    const { email, password } = parsed

    const supabase = await createServerSupabaseClient()

    // Attempt login with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      await UserLogger.logAuthAction(
        'login',
        null,
        null,
        false,
        { error: error.message, email },
        req
      )
      return NextResponse.json({ error: error.message }, { status: 401 })
    }

    // Get or create user in our database — pass Supabase user directly
    const user = await getCurrentUser(data.user)

    if (!user) {
      return NextResponse.json({ error: "Failed to retrieve user record." }, { status: 500 })
    }

    // Log successful login
    await UserLogger.logAuthAction(
      'login',
      data.user.id,
      user.id,
      true,
      { email },
      req
    )

    return NextResponse.json({
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email },
    })

  } catch (err) {
    console.error('Login error:', err)
    await UserLogger.logSystemAction(
      'login_error',
      'Unexpected error during login',
      { error: err instanceof Error ? err.message : 'Unknown error' },
      req
    )
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}