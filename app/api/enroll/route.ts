import { NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { UserLogger } from "@/lib/user-logger"

export async function POST(req: NextRequest) {
  const user = await getCurrentUser()
  if (!user) {
    await UserLogger.logAuthAction('enrollment', null, 'failure', {
      reason: 'unauthorized',
      courseId: (await req.json()).courseId
    }, req)

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { courseId } = await req.json()
  if (!courseId) {
    await UserLogger.logUserAction(user.id, 'enrollment_attempt', {
      reason: 'missing_course_id'
    }, req)

    return NextResponse.json({ error: "Course ID is required." }, { status: 400 })
  }

  const course = await prisma.course.findUnique({ where: { id: courseId } })
  if (!course) {
    await UserLogger.logUserAction(user.id, 'enrollment_attempt', {
      reason: 'course_not_found',
      courseId
    }, req)

    return NextResponse.json({ error: "Course not found." }, { status: 404 })
  }

  // Check if already enrolled
  const existing = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId: user.id, courseId } },
  })
  if (existing) {
    await UserLogger.logUserAction(user.id, 'enrollment_attempt', {
      reason: 'already_enrolled',
      courseId,
      courseTitle: course.title
    }, req)

    return NextResponse.json({ error: "Already enrolled in this course." }, { status: 409 })
  }

  const enrollment = await prisma.enrollment.create({
    data: { userId: user.id, courseId },
  })

  await prisma.activity.create({
    data: {
      userId: user.id,
      type: "enrollment",
      description: `Enrolled in ${course.title}`,
    },
  })

  // Log successful enrollment
  await UserLogger.logUserAction(
    'course_enrollment',
    user.id,
    `Enrolled in course: ${course.title}`,
    {
      courseId,
      courseTitle: course.title,
      courseCategory: course.category,
      courseLevel: course.level
    },
    req
  )

  return NextResponse.json({ enrollment })
}
