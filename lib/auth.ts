import { createServerSupabaseClient } from './supabase'
import { prisma } from './db'

export async function getCurrentUser() {
  const supabase = await createServerSupabaseClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  // Get or create user in our database
  const dbUser = await prisma.user.upsert({
    where: { supabaseId: user.id },
    update: {
      name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
      email: user.email!,
      emailVerified: user.email_confirmed_at ? true : false,
    },
    create: {
      supabaseId: user.id,
      name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
      email: user.email!,
      emailVerified: user.email_confirmed_at ? true : false,
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
