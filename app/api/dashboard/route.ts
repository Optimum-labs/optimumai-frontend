import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET() {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const [enrollments, activities, activityCount, challengeRegs, researchApps] = await Promise.all([
    prisma.enrollment.findMany({
      where: { userId: user.id },
      include: { course: true },
      orderBy: { enrolledAt: "desc" },
      take: 10,
    }),
    prisma.activity.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
    prisma.activity.count({ where: { userId: user.id } }),
    prisma.challengeRegistration.findMany({
      where: { userId: user.id },
      include: { challenge: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.researchApplication.findMany({
      where: { userId: user.id },
      include: { program: true },
      orderBy: { createdAt: "desc" },
    }),
  ])

  const completedCount = enrollments.filter((e) => e.status === "completed").length
  const inProgressCount = enrollments.filter((e) => e.status === "in-progress").length

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      joinedDate: user.createdAt,
    },
    stats: {
      enrolled: enrollments.length,
      completed: completedCount,
      inProgress: inProgressCount,
      totalActivities: activityCount,
      challenges: challengeRegs.length,
      researchPrograms: researchApps.length,
    },
    enrollments: enrollments.map((e) => ({
      id: e.id,
      courseTitle: e.course.title,
      courseCategory: e.course.category,
      status: e.status,
      progress: e.progress,
      meetingLink: e.meetingLink,
      enrolledAt: e.enrolledAt,
    })),
    challengeRegistrations: challengeRegs.map((r) => ({
      id: r.id,
      challengeTitle: r.challenge.title,
      challengeLevel: r.challenge.level,
      challengeDuration: r.challenge.duration,
      startsAt: r.challenge.startsAt,
      status: r.status,
      meetingLink: r.meetingLink,
      appliedAt: r.createdAt,
    })),
    researchApplications: researchApps.map((a) => ({
      id: a.id,
      programTitle: a.program.title,
      programOrganization: a.program.organization,
      programDuration: a.program.duration,
      programDifficulty: a.program.difficulty,
      status: a.status,
      meetingLink: a.meetingLink,
      appliedAt: a.createdAt,
    })),
    recentActivity: activities.map((a) => ({
      id: a.id,
      type: a.type,
      description: a.description,
      createdAt: a.createdAt,
    })),
  })
}
