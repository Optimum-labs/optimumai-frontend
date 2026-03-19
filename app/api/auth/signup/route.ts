import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient, createAdminSupabaseClient } from "@/lib/supabase"
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
        data: { name },
      }
    })

    let supabaseUser = data?.user

    // If rate limit exceeded, use admin client to create user directly
    if (error && error.message.toLowerCase().includes('rate limit')) {
      try {
        const admin = createAdminSupabaseClient()

        // Check if user already exists
        const { data: existingUsers } = await admin.auth.admin.listUsers()
        const existing = existingUsers?.users?.find(u => u.email === email)

        if (existing) {
          // User already exists — just sign them in
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password })
          if (signInError) {
            return NextResponse.json({ error: signInError.message }, { status: 401 })
          }
          supabaseUser = signInData.user
        } else {
          // Create user via admin (bypasses rate limits, auto-confirms email)
          const { data: adminData, error: adminError } = await admin.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: { name },
          })

          if (adminError) {
            return NextResponse.json({ error: adminError.message }, { status: 400 })
          }

          supabaseUser = adminData.user

          // Sign in to establish session cookies
          await supabase.auth.signInWithPassword({ email, password })
        }
      } catch (adminErr) {
        console.error('Admin signup fallback failed:', adminErr)
        return NextResponse.json({ error: "Signup is temporarily unavailable. Please try again later." }, { status: 503 })
      }
    } else if (error) {
      await UserLogger.logAuthAction('signup', null, null, false, { error: error.message, email }, req)
      return NextResponse.json({ error: error.message }, { status: 400 })
    } else if (supabaseUser) {
      // Normal signup succeeded — auto-confirm via admin and sign in
      try {
        const admin = createAdminSupabaseClient()
        await admin.auth.admin.updateUserById(supabaseUser.id, { email_confirm: true })
        await supabase.auth.signInWithPassword({ email, password })
      } catch {
        // Non-critical: user created but email not auto-confirmed
      }
    }

    if (!supabaseUser) {
      return NextResponse.json({ error: "Signup succeeded but no user returned." }, { status: 500 })
    }

    // Get or create user in our database
    const user = await getCurrentUser(supabaseUser)

    if (!user) {
      return NextResponse.json({ error: "Failed to create user record." }, { status: 500 })
    }

    // Log successful signup
    await UserLogger.logAuthAction('signup', supabaseUser.id, user.id, true, { email, name }, req)

    return NextResponse.json({
      message: "Account created successfully!",
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