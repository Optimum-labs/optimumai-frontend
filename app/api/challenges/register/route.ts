import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import { UserLogger } from "@/lib/user-logger"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const challengeId = formData.get('challengeId') as string
    const fullName = formData.get('fullName') as string
    const email = formData.get('email') as string
    const linkedIn = formData.get('linkedIn') as string | null
    const motivation = formData.get('motivation') as string
    const resume = formData.get('resume') as File | null
    const jsonDataStr = formData.get('jsonData') as string

    if (!challengeId || !fullName || !email || !motivation) {
      return NextResponse.json(
        { error: "Full name, email, challenge ID, and motivation are required." },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 })
    }

    // Validate LinkedIn URL if provided
    if (linkedIn && !linkedIn.startsWith("https://linkedin.com/") && !linkedIn.startsWith("https://www.linkedin.com/")) {
      return NextResponse.json({ error: "Invalid LinkedIn URL." }, { status: 400 })
    }

    // Check challenge exists and is open
    const challenge = await prisma.challenge.findUnique({ where: { id: challengeId } })
    if (!challenge) {
      return NextResponse.json({ error: "Challenge not found." }, { status: 404 })
    }
    if (challenge.status !== "open") {
      return NextResponse.json({ error: "Registration for this challenge is closed." }, { status: 400 })
    }

    // Check for duplicate registration
    const existing = await prisma.challengeRegistration.findUnique({
      where: { challengeId_email: { challengeId, email } },
    })
    if (existing) {
      return NextResponse.json({ error: "You are already registered for this challenge." }, { status: 409 })
    }

    // Get authenticated user if available
    let userId: string | null = null
    try {
      const user = await getCurrentUser()
      if (user) userId = user.id
    } catch {
      // User not logged in, that's fine
    }

    // Handle resume upload
    let resumeUrl: string | null = null
    if (resume) {
      const fileName = `${Date.now()}-${resume.name}`
      const { data, error } = await supabase.storage
        .from('resumes')
        .upload(fileName, resume, {
          contentType: resume.type,
          upsert: false
        })
      if (error) {
        console.error('Resume upload error:', error)
        return NextResponse.json({ error: "Failed to upload resume." }, { status: 500 })
      }
      resumeUrl = supabase.storage.from('resumes').getPublicUrl(fileName).data.publicUrl
    }

    // Parse jsonData
    let jsonData: any = null
    try {
      jsonData = JSON.parse(jsonDataStr)
    } catch {
      jsonData = { fullName, email, linkedIn, motivation, resumeUploaded: !!resume }
    }

    const registration = await prisma.challengeRegistration.create({
      data: {
        challengeId,
        userId,
        fullName,
        email,
        linkedIn: linkedIn || null,
        motivation,
        resumeUrl,
        jsonData,
      },
    })

    // Log the registration
    if (userId) {
      await prisma.activity.create({
        data: {
          userId,
          type: "challenge",
          description: `Registered for challenge: ${challenge.title}`,
        },
      })

      await UserLogger.logUserAction(
        "challenge_registration",
        userId,
        `Registered for challenge: ${challenge.title}`,
        { challengeId, challengeTitle: challenge.title },
        req
      )
    }

    return NextResponse.json({
      message: "Registration successful! You'll receive a confirmation email shortly.",
      registration: { id: registration.id },
    })
  } catch (err) {
    console.error("Challenge registration error:", err)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
