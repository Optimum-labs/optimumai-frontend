import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export async function POST(req: NextRequest) {
  // Get authenticated user if available (not required)
  let user: { id: string; name: string; email: string } | null = null
  try {
    user = await getCurrentUser()
  } catch {
    // Guest user, that's fine
  }

  const { programSlug, fullName, email } = await req.json()
  if (!programSlug) {
    return NextResponse.json({ error: "Program is required." }, { status: 400 })
  }

  // Guest users must provide name and email
  if (!user && (!fullName || !email)) {
    return NextResponse.json({ error: "Full name and email are required." }, { status: 400 })
  }

  // Validate email format for guest
  if (!user && email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 })
    }
  }

  const program = await prisma.researchProgram.findUnique({ where: { slug: programSlug } })
  if (!program) {
    return NextResponse.json({ error: "Research program not found." }, { status: 404 })
  }

  if (program.status === "closed") {
    return NextResponse.json({ error: "This program is no longer accepting applications." }, { status: 400 })
  }

  // Check for duplicate application by email
  const applyEmail = user ? user.email : email
  const existing = await prisma.researchApplication.findUnique({
    where: { programId_email: { programId: program.id, email: applyEmail } },
  })
  if (existing) {
    return NextResponse.json({ error: "You have already applied to this program." }, { status: 409 })
  }

  const application = await prisma.researchApplication.create({
    data: {
      programId: program.id,
      userId: user ? user.id : null,
      fullName: user ? user.name : fullName,
      email: applyEmail,
      jsonData: {
        fullName: user ? user.name : fullName,
        email: applyEmail,
        appliedAt: new Date().toISOString(),
      },
    },
  })

  if (user) {
    await prisma.activity.create({
      data: {
        userId: user.id,
        type: "research",
        description: `Applied to research: ${program.title}`,
      },
    })
  }

  return NextResponse.json({
    message: "Application submitted! You'll receive updates via email.",
    application: { id: application.id },
  })
}
