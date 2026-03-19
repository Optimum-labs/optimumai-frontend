import { NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { UserLogger } from "@/lib/user-logger"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: NextRequest) {
  try {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Get authenticated user if available (not required)
  let user: { id: string; name: string; email: string } | null = null
  try {
    user = await getCurrentUser()
  } catch {
    // Guest user, that's fine
  }

  const formData = await req.formData()
  const courseId = formData.get('courseId') as string | null
  const courseSlug = formData.get('courseSlug') as string | null
  const fullName = formData.get('fullName') as string | null
  const email = formData.get('email') as string | null
  const resume = formData.get('resume') as File | null
  const jsonDataStr = formData.get('jsonData') as string | null

  if (!courseId && !courseSlug) {
    return NextResponse.json({ error: "Course ID or slug is required." }, { status: 400 })
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

  const course = courseId
    ? await prisma.course.findUnique({ where: { id: courseId } })
    : await prisma.course.findUnique({ where: { slug: courseSlug! } })
  if (!course) {
    return NextResponse.json({ error: "Course not found." }, { status: 404 })
  }

  // Check for duplicate enrollment
  const enrollEmail = user ? user.email : email!
  const existing = await prisma.enrollment.findUnique({
    where: { courseId_email: { courseId: course.id, email: enrollEmail } },
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
      userId: user ? user.id : null,
      courseId: course.id,
      fullName: user ? user.name : fullName!,
      email: enrollEmail,
      resumeUrl,
      jsonData,
    },
  })

  if (user) {
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
        courseId: course.id,
        courseTitle: course.title,
        courseCategory: course.category,
        courseLevel: course.level
      },
      req
    )
  }

  return NextResponse.json({ enrollment })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error("Enrollment error:", msg)
    return NextResponse.json({ error: "Enrollment failed. Please try again.", detail: msg }, { status: 500 })
  }
}
