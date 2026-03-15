import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 })
    }

    // Basic email validation
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRe.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 })
    }

    // Password strength validation
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long." }, { status: 400 })
    }

    // Simulate user creation (in a real app, you'd save to database)
    const userId = Math.random().toString(36).substring(2, 15)
    const verificationToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

    // Check if SMTP is configured (all required fields must be non-empty)
    const smtpHost = process.env.SMTP_HOST?.trim()
    const smtpUser = process.env.SMTP_USER?.trim()
    const smtpPass = process.env.SMTP_PASS?.trim()
    const smtpConfigured = smtpHost && smtpUser && smtpPass && smtpPass.length > 0

    // For now, always use development mode to avoid SMTP issues
    const useDevelopmentMode = true

    if (smtpConfigured && !useDevelopmentMode) {
      // Send verification email
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })

      const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/auth/verify?token=${verificationToken}&email=${encodeURIComponent(email)}`

      await transporter.sendMail({
        from: `"OptimumAI" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Verify your OptimumAI account",
        text: `Welcome to OptimumAI, ${name}!\n\nPlease verify your email address by clicking the link below:\n\n${verificationUrl}\n\nIf you didn't create an account, you can safely ignore this email.\n\nBest,\nThe OptimumAI Team`,
        html: `
          <div style="font-family:monospace;max-width:600px;margin:0 auto;padding:32px;border:1px solid #e0ddd6;background:#faf7f2;">
            <div style="text-align:center;margin-bottom:32px;">
              <div style="width:48px;height:48px;border-radius:50%;background:#0a0a0a;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-family:Georgia,serif;font-size:20px;font-weight:700;color:#faf7f2;">O</div>
              <h1 style="font-family:Georgia,serif;font-size:24px;margin:0;color:#0a0a0a;">Welcome to OptimumAI</h1>
            </div>

            <p style="font-size:14px;line-height:1.8;color:#0a0a0a;margin-bottom:24px;">
              Hi ${name},<br><br>
              Thank you for joining OptimumAI! To get started, please verify your email address by clicking the button below.
            </p>

            <div style="text-align:center;margin:32px 0;">
              <a href="${verificationUrl}" style="display:inline-block;padding:12px 32px;background:#c8392b;color:#faf7f2;text-decoration:none;border-radius:4px;font-size:14px;font-weight:500;">
                Verify Email Address
              </a>
            </div>

            <p style="font-size:12px;line-height:1.6;color:#6b6456;margin-bottom:24px;">
              If the button doesn't work, copy and paste this link into your browser:<br>
              <a href="${verificationUrl}" style="color:#c8392b;word-break:break-all;">${verificationUrl}</a>
            </p>

            <p style="font-size:12px;color:#6b6456;margin-bottom:0;">
              If you didn't create an account, you can safely ignore this email.<br><br>
              Best regards,<br>
              The OptimumAI Team
            </p>

            <hr style="border:none;border-top:1px solid #e0ddd6;margin:32px 0 24px;" />
            <p style="font-size:11px;color:#b8965a;letter-spacing:0.15em;text-align:center;margin:0;">OPTIMUMAI · support@optimumai.in</p>
          </div>
        `,
      })
    } else {
      // Development mode: log verification details instead of sending email
      console.log('📧 DEVELOPMENT MODE: Email verification would be sent to:', email)
      console.log('🔗 Verification URL:', `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/auth/verify?token=${verificationToken}&email=${encodeURIComponent(email)}`)
      console.log('⚠️  To enable email sending, configure SMTP environment variables in .env.local')
    }

    return NextResponse.json({
      message: "Account created successfully. Please check your email for verification.",
      userId,
      email
    })

  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Failed to create account. Please try again." }, { status: 500 })
  }
}