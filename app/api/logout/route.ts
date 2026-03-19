import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { UserLogger } from '@/lib/user-logger'

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          },
        },
      }
    )

    // Get current user before logout for logging
    const { data: { user } } = await supabase.auth.getUser()

    const { error } = await supabase.auth.signOut()

    if (error) {
      await UserLogger.logAuthAction(
        'logout',
        user?.id || null,
        null, // We don't have userId from our DB here
        false,
        { error: error.message },
        request
      )

      console.error('Logout error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Log successful logout
    await UserLogger.logAuthAction(
      'logout',
      user?.id || null,
      null, // We don't have userId from our DB here
      true,
      {},
      request
    )

    return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'))

  } catch (error) {
    console.error('Logout API error:', error)
    await UserLogger.logError('logout_api', error as Error, undefined, request)

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}