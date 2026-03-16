import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export async function POST(req: NextRequest) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: "Please sign in to apply." }, { status: 401 })
  }

  const { programSlug } = await req.json()
  if (!programSlug) {
    return NextResponse.json({ error: "Program is required." }, { status: 400 })
  }

  const program = await prisma.researchProgram.findUnique({ where: { slug: programSlug } })
  if (!program) {
    return NextResponse.json({ error: "Research program not found." }, { status: 404 })
  }

  if (program.status === "closed") {
    return NextResponse.json({ error: "This program is no longer accepting applications." }, { status: 400 })
  }

  const existing = await prisma.researchApplication.findUnique({
    where: { programId_userId: { programId: program.id, userId: user.id } },
  })
  if (existing) {
    return NextResponse.json({ error: "You have already applied to this program." }, { status: 409 })
  }

  const application = await prisma.researchApplication.create({
    data: { programId: program.id, userId: user.id },
  })

  await prisma.activity.create({
    data: {
      userId: user.id,
      type: "research",
      description: `Applied to research: ${program.title}`,
    },
  })

  return NextResponse.json({
    message: "Application submitted! You'll receive updates on your dashboard.",
    application: { id: application.id },
  })
}
