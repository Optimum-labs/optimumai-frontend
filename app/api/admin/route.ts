import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET() {
  try {
    await requireAdmin()
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  try {
    const [
      userCount,
      challengeCount,
      courseCount,
      eventCount,
      challengeRegCount,
      enrollmentCount,
      researchAppCount,
      eventRegCount,
      researchProgramCount,
      ambassadorCount,
      recentUsers,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.challenge.count(),
      prisma.course.count(),
      prisma.event.count(),
      prisma.challengeRegistration.count(),
      prisma.enrollment.count(),
      prisma.researchApplication.count(),
      prisma.eventRegistration.count(),
      prisma.researchProgram.count(),
      prisma.ambassador.count(),
      prisma.user.findMany({ orderBy: { createdAt: "desc" }, take: 5, select: { id: true, name: true, email: true, createdAt: true } }),
    ])

    return NextResponse.json({
      stats: {
        users: userCount,
        challenges: challengeCount,
        courses: courseCount,
        events: eventCount,
        challengeRegistrations: challengeRegCount,
        enrollments: enrollmentCount,
        researchApplications: researchAppCount,
        eventRegistrations: eventRegCount,
        researchPrograms: researchProgramCount,
        ambassadors: ambassadorCount,
      },
      recentUsers,
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: "Failed to fetch admin stats", detail: msg }, { status: 500 })
  }
}
