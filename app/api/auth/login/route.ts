import { NextRequest, NextResponse } from "next/server"
import { SignJWT } from "jose"

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 })
    }

    // Basic email validation
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRe.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 })
    }

    // Simulate user authentication (in a real app, check against database)
    // For demo purposes, accept any email/password combination
    const userId = Math.random().toString(36).substring(2, 15)
    const userName = email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())

    // Create a simple JWT token (in production, use proper JWT with secret)
    const token = await new SignJWT({
      userId,
      email,
      name: userName
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET || 'demo-secret-key'))

    // Set HTTP-only cookie
    const response = NextResponse.json({
      message: "Login successful",
      user: {
        id: userId,
        name: userName,
        email
      }
    })

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 24 hours
    })

    return response

  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Login failed. Please try again." }, { status: 500 })
  }
}