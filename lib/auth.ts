import { createServerSupabaseClient } from './supabase'
import { prisma } from './db'

/**
 * Get or create user in our database.
 * If supabaseUser is provided (e.g. after signup/login), uses that directly.
 * Otherwise, reads the session from cookies.
 */
export async function getCurrentUser(supabaseUser?: { id: string; email?: string; user_metadata?: Record<string, any>; email_confirmed_at?: string | null }) {
  let user = supabaseUser

  if (!user) {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase.auth.getUser()
    if (error || !data.user) return null
    user = data.user
  }

  const dbUser = await prisma.user.upsert({
    where: { supabaseId: user.id },
    update: {
      name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
      email: user.email!,
      emailVerified: !!user.email_confirmed_at,
    },
    create: {
      supabaseId: user.id,
      name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
      email: user.email!,
      emailVerified: !!user.email_confirmed_at,
    }
  })

  return {
    id: dbUser.id,
    name: dbUser.name,
    email: dbUser.email,
  }
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}
