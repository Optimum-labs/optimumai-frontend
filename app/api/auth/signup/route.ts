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
    const admin = createAdminSupabaseClient()

    // Check if user already exists in Supabase
    const { data: existingList } = await admin.auth.admin.listUsers()
    const existingUser = existingList?.users?.find(u => u.email === email)

    let supabaseUser

    if (existingUser) {
      // User already exists — try signing in (they may have forgotten they registered)
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password })
      if (signInError) {
        return NextResponse.json({ error: "An account with this email already exists. Please sign in instead." }, { status: 409 })
      }
      supabaseUser = signInData.user
    } else {
      // Create user via admin client — auto-confirms email, bypasses rate limits
      const { data: adminData, error: adminError } = await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { name },
      })

      if (adminError) {
        await UserLogger.logAuthAction('signup', null, null, false, { error: adminError.message, email }, req)
        return NextResponse.json({ error: adminError.message }, { status: 400 })
      }

      supabaseUser = adminData.user

      // Sign in to establish session cookies
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
      if (signInError) {
        console.error('Post-signup sign-in failed:', signInError.message)
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