import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')
    const email = searchParams.get('email')

    if (!token || !email) {
      return NextResponse.redirect(new URL('/login?error=invalid_verification_link', req.url))
    }

    // In a real app, you'd verify the token against your database
    // For demo purposes, we'll accept any token

    // Redirect to login with success message
    return NextResponse.redirect(new URL('/login?verified=true', req.url))

  } catch (error) {
    console.error("Verification error:", error)
    return NextResponse.redirect(new URL('/login?error=verification_failed', req.url))
  }
}