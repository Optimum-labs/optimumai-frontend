import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: NextRequest) {
  const { name, email, phone, message } = await req.json()

  if (!name || !email || !phone || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 })
  }

  // Basic email safety check
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRe.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 })
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  try {
    // Email to OptimumAI inbox
    await transporter.sendMail({
      from: `"OptimumAI Contact" <${process.env.SMTP_USER}>`,
      to: "info@optimumai.in",
      replyTo: email,
      subject: `New Contact Enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family:monospace;max-width:600px;margin:0 auto;padding:32px;border:1px solid #e0ddd6;background:#faf7f2;">
          <h2 style="font-family:Georgia,serif;font-size:22px;margin:0 0 24px;color:#0a0a0a;">
            New Contact Enquiry
          </h2>
          <table style="width:100%;border-collapse:collapse;font-size:13px;color:#0a0a0a;">
            <tr><td style="padding:8px 0;color:#6b6456;width:100px;">Name</td><td>${name}</td></tr>
            <tr><td style="padding:8px 0;color:#6b6456;">Email</td><td><a href="mailto:${email}" style="color:#c8392b;">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#6b6456;">Phone</td><td>${phone}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #e0ddd6;margin:24px 0;" />
          <p style="white-space:pre-wrap;font-size:13px;line-height:1.8;color:#0a0a0a;">${message}</p>
          <hr style="border:none;border-top:1px solid #e0ddd6;margin:24px 0;" />
          <p style="font-size:11px;color:#b8965a;letter-spacing:0.15em;">OPTIMUMAI · info@optimumai.in</p>
        </div>
      `,
    })

    // Auto-reply to the sender
    await transporter.sendMail({
      from: `"OptimumAI" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "We received your message — OptimumAI",
      text: `Hi ${name},\n\nThank you for reaching out to OptimumAI.\n\nWe've received your enquiry and will get back to you within 1–2 business days at this email address.\n\nBest regards,\nThe OptimumAI Team\ninfo@optimumai.in`,
      html: `
        <div style="font-family:monospace;max-width:600px;margin:0 auto;padding:32px;border:1px solid #e0ddd6;background:#faf7f2;">
          <h2 style="font-family:Georgia,serif;font-size:22px;margin:0 0 16px;color:#0a0a0a;">
            We got your message.
          </h2>
          <p style="font-size:13px;line-height:1.8;color:#0a0a0a;">Hi <strong>${name}</strong>,</p>
          <p style="font-size:13px;line-height:1.8;color:#0a0a0a;">
            Thank you for reaching out to OptimumAI. We've received your enquiry and will
            get back to you within <strong>1–2 business days</strong>.
          </p>
          <p style="font-size:13px;line-height:1.8;color:#0a0a0a;">
            In the meantime, feel free to explore our research and programmes at
            <a href="https://optimumai.in" style="color:#c8392b;">optimumai.in</a>.
          </p>
          <hr style="border:none;border-top:1px solid #e0ddd6;margin:24px 0;" />
          <p style="font-size:11px;color:#b8965a;letter-spacing:0.15em;">OPTIMUMAI · info@optimumai.in</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[contact] mail send error:", err)
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 })
  }
}
