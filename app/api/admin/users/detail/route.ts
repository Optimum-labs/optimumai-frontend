import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    await requireAdmin()
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  try {
    const url = new URL(request.url)
    const userId = url.searchParams.get("id")

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true, name: true, email: true, role: true,
        emailVerified: true, dateOfBirth: true, createdAt: true,
        enrollments: {
          include: { course: { select: { title: true, category: true, level: true } } },
          orderBy: { enrolledAt: "desc" },
        },
        challengeRegs: {
          include: { challenge: { select: { title: true, level: true, status: true } } },
          orderBy: { createdAt: "desc" },
        },
        eventRegs: {
          include: { event: { select: { title: true, date: true, type: true } } },
          orderBy: { createdAt: "desc" },
        },
        researchApps: {
          include: { program: { select: { title: true, organization: true, difficulty: true } } },
          orderBy: { createdAt: "desc" },
        },
        ambassadors: {
          orderBy: { createdAt: "desc" },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: "Failed to fetch user details", detail: msg }, { status: 500 })
  }
}
