import { NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/db"

// GET /api/courses/[slug]/progress — fetch lessons + user progress
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { slug } = await params

  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      lessons: {
        orderBy: { order: "asc" },
        include: {
          progress: { where: { userId: user.id } },
        },
      },
    },
  })

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 })
  }

  const lessons = course.lessons.map((l) => ({
    id: l.id,
    title: l.title,
    order: l.order,
    description: l.description,
    completed: l.progress.length > 0 && l.progress[0].completed,
    completedAt: l.progress.length > 0 ? l.progress[0].completedAt : null,
  }))

  const completedCount = lessons.filter((l) => l.completed).length
  const totalCount = lessons.length
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return NextResponse.json({
    courseId: course.id,
    courseTitle: course.title,
    lessons,
    progress: { completed: completedCount, total: totalCount, percent: progressPercent },
  })
}

// POST /api/courses/[slug]/progress — mark a lesson complete/incomplete
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { slug } = await params
  const body = await request.json()
  const { lessonId, completed } = body as { lessonId: string; completed: boolean }

  if (!lessonId || typeof completed !== "boolean") {
    return NextResponse.json({ error: "lessonId and completed are required" }, { status: 400 })
  }

  // Verify the lesson belongs to this course
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: { course: { select: { slug: true, id: true } } },
  })

  if (!lesson || lesson.course.slug !== slug) {
    return NextResponse.json({ error: "Lesson not found in this course" }, { status: 404 })
  }

  // Upsert lesson progress
  await prisma.lessonProgress.upsert({
    where: { lessonId_userId: { lessonId, userId: user.id } },
    create: { lessonId, userId: user.id, completed, completedAt: completed ? new Date() : null },
    update: { completed, completedAt: completed ? new Date() : null },
  })

  // Recalculate overall enrollment progress
  const totalLessons = await prisma.lesson.count({ where: { courseId: lesson.course.id } })
  const completedLessons = await prisma.lessonProgress.count({
    where: { lesson: { courseId: lesson.course.id }, userId: user.id, completed: true },
  })
  const percent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  // Update enrollment progress field
  await prisma.enrollment.updateMany({
    where: { courseId: lesson.course.id, userId: user.id },
    data: {
      progress: percent,
      status: percent === 100 ? "completed" : percent > 0 ? "in-progress" : "enrolled",
    },
  })

  return NextResponse.json({
    lessonId,
    completed,
    progress: { completed: completedLessons, total: totalLessons, percent },
  })
}
