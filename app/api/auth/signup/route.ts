import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"
import { UserLogger } from "@/lib/user-logger"
import { getCurrentUser } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      await UserLogger.logSystemAction(
        'signup_attempt',
        'Signup attempt with missing fields',
        { name: name || 'missing', email: email || 'missing' },
        req
      )
      return NextResponse.json({ error: "All fields are required." }, { status: 400 })
    }

    if (password.length < 8) {
      await UserLogger.logSystemAction(
        'signup_attempt',
        'Signup attempt with short password',
        { email },
        req
      )
      return NextResponse.json({ error: "Password must be at least 8 characters long." }, { status: 400 })
    }

    const supabase = await createServerSupabaseClient()

    // Create user with Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        }
      }
    })

    if (error) {
      await UserLogger.logAuthAction(
        'signup',
        null,
        null,
        false,
        { error: error.message, email },
        req
      )
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    if (!data.user) {
      return NextResponse.json({ error: "Signup succeeded but no user returned." }, { status: 500 })
    }

    // Get or create user in our database — pass Supabase user directly
    // since there's no session cookie yet (email not verified)
    const user = await getCurrentUser(data.user)

    if (!user) {
      return NextResponse.json({ error: "Failed to create user record." }, { status: 500 })
    }

    // Log successful signup
    await UserLogger.logAuthAction(
      'signup',
      data.user.id,
      user.id,
      true,
      { email, name },
      req
    )

    return NextResponse.json({
      message: "Account created successfully. Please check your email to verify your account.",
      user: { id: user.id, name: user.name, email: user.email },
    })

  } catch (err) {
    console.error('Signup error:', err)
    await UserLogger.logSystemAction(
      'signup_error',
      'Unexpected error during signup',
      { error: err instanceof Error ? err.message : 'Unknown error' },
      req
    )
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}