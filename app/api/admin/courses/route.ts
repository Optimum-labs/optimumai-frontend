import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { adminCourseCreateSchema, adminCourseUpdateSchema, parseBody } from "@/lib/validations"

export async function GET() {
  try {
    await requireAdmin()
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  try {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { enrollments: true } } },
    })
    return NextResponse.json(courses)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: "Failed to fetch courses", detail: msg }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin()
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  try {
    const body = await request.json()
    const { data: parsed, error: validationError } = parseBody(adminCourseCreateSchema, body)

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 })
    }

    const { title, description, category, duration, level, tags } = parsed

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")

    const course = await prisma.course.create({
      data: { title, slug, description, category, duration, level, tags: tags || [] },
    })

    return NextResponse.json(course, { status: 201 })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: "Failed to create course", detail: msg }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin()
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  try {
    const body = await request.json()
    const { data: parsed, error: validationError } = parseBody(adminCourseUpdateSchema, body)

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 })
    }

    const { id, ...data } = parsed

    const updateData: Record<string, unknown> = { ...data }
    if (data.title) {
      updateData.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    }

    const course = await prisma.course.update({ where: { id }, data: updateData })
    return NextResponse.json(course)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: "Failed to update course", detail: msg }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAdmin()
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  try {
    const url = new URL(request.url)
    const id = url.searchParams.get("id")
    if (!id) {
      return NextResponse.json({ error: "Course ID required" }, { status: 400 })
    }

    await prisma.course.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: "Failed to delete course", detail: msg }, { status: 500 })
  }
}
