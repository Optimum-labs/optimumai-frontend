import { NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { UserLogger } from "@/lib/user-logger"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await req.formData()
  const courseId = formData.get('courseId') as string | null
  const courseSlug = formData.get('courseSlug') as string | null
  const resume = formData.get('resume') as File | null
  const jsonDataStr = formData.get('jsonData') as string | null

  if (!courseId && !courseSlug) {
    return NextResponse.json({ error: "Course ID or slug is required." }, { status: 400 })
  }

  const course = courseId
    ? await prisma.course.findUnique({ where: { id: courseId } })
    : await prisma.course.findUnique({ where: { slug: courseSlug } })
  if (!course) {
    return NextResponse.json({ error: "Course not found." }, { status: 404 })
  }

  // Check if already enrolled
  const existing = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId: user.id, courseId: course.id } },
  })
  if (existing) {
    return NextResponse.json({ error: "Already enrolled in this course." }, { status: 409 })
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
  if (jsonDataStr) {
    try {
      jsonData = JSON.parse(jsonDataStr)
    } catch {
      jsonData = { courseTitle: course.title, resumeUploaded: !!resume }
    }
  }

  const enrollment = await prisma.enrollment.create({
    data: {
      userId: user.id,
      courseId: course.id,
      resumeUrl,
      jsonData,
    },
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
