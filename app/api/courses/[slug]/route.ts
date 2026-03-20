import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  try {
    const course = await prisma.course.findUnique({
      where: { slug },
      include: { _count: { select: { enrollments: true } } },
    })

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    // Fetch related courses (same category, excluding current)
    const related = await prisma.course.findMany({
      where: { category: course.category, id: { not: course.id } },
      take: 3,
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ course, related })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: "Failed to fetch course", detail: msg }, { status: 500 })
  }
}
