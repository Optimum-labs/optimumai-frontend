import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"
import { UserLogger } from "@/lib/user-logger"
import { getCurrentUser } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      await UserLogger.logSystemAction(
        'login_attempt',
        'Login attempt with missing credentials',
        { email: email || 'missing' },
        req
      )
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 })
    }

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

    // Get or create user in our database
    const user = await getCurrentUser(data.user.id)

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