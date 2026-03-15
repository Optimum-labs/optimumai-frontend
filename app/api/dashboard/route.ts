import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET() {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const [enrollments, activities, activityCount] = await Promise.all([
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
  ])

  const completedCount = enrollments.filter((e) => e.status === "completed").length
  const inProgressCount = enrollments.filter((e) => e.status === "in-progress").length

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      joinedDate: user.createdAt,
    },
    stats: {
      enrolled: enrollments.length,
      completed: completedCount,
      inProgress: inProgressCount,
      totalActivities: activityCount,
    },
    enrollments: enrollments.map((e) => ({
      id: e.id,
      courseTitle: e.course.title,
      courseCategory: e.course.category,
      status: e.status,
      progress: e.progress,
      enrolledAt: e.enrolledAt,
    })),
    recentActivity: activities.map((a) => ({
      id: a.id,
      type: a.type,
      description: a.description,
      createdAt: a.createdAt,
    })),
  })
}
