import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth"
import { prisma } from "@/lib/db"

// GET — list lessons for a course
export async function GET(request: NextRequest) {
  try {
    await requireAdmin()
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const url = new URL(request.url)
  const courseId = url.searchParams.get("courseId")

  if (!courseId) {
    return NextResponse.json({ error: "courseId is required" }, { status: 400 })
  }

  const lessons = await prisma.lesson.findMany({
    where: { courseId },
    orderBy: { order: "asc" },
  })

  return NextResponse.json(lessons)
}

// POST — create a new lesson
export async function POST(request: NextRequest) {
  try {
    await requireAdmin()
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  try {
    const { courseId, title, order, description } = await request.json()

    if (!courseId || !title || typeof order !== "number") {
      return NextResponse.json({ error: "courseId, title, and order are required" }, { status: 400 })
    }

    const lesson = await prisma.lesson.create({
      data: { courseId, title, order, description: description || null },
    })

    return NextResponse.json(lesson, { status: 201 })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: "Failed to create lesson", detail: msg }, { status: 500 })
  }
}

// DELETE — delete a lesson
export async function DELETE(request: NextRequest) {
  try {
    await requireAdmin()
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const url = new URL(request.url)
  const id = url.searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "Lesson ID required" }, { status: 400 })
  }

  try {
    await prisma.lesson.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: "Failed to delete lesson", detail: msg }, { status: 500 })
  }
}
