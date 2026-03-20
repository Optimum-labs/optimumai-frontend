import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"
import { resetPasswordSchema, parseBody } from "@/lib/validations"
import { rateLimit } from "@/lib/rate-limit"

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  const { allowed, retryAfterMs } = rateLimit(`reset:${ip}`, 5, 60_000)
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many reset attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) } }
    )
  }

  try {
    const body = await req.json()
    const { data: parsed, error: validationError } = parseBody(resetPasswordSchema, body)

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 })
    }

    const { email } = parsed

    const supabase = await createServerSupabaseClient()

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${req.nextUrl.origin}/reset-password`,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ message: "Password reset email sent successfully." })
  } catch (err) {
    console.error("Reset password error:", err)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
