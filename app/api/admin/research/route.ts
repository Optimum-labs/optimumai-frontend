import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET() {
  try {
    await requireAdmin()
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  try {
    const programs = await prisma.researchProgram.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { applications: true } } },
    })
    return NextResponse.json(programs)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: "Failed to fetch research programs", detail: msg }, { status: 500 })
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
    const { title, description, organization, difficulty, duration, tags, objectives, prerequisites, status, meetingLink } = body

    if (!title || !description || !organization || !difficulty || !duration) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")

    const program = await prisma.researchProgram.create({
      data: {
        title, slug, description, organization, difficulty, duration,
        tags: tags || [], objectives: objectives || [], prerequisites: prerequisites || [],
        status: status || "accepting", meetingLink: meetingLink || null,
      },
    })

    return NextResponse.json(program, { status: 201 })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: "Failed to create research program", detail: msg }, { status: 500 })
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
    const { id, ...data } = body

    if (!id) {
      return NextResponse.json({ error: "Program ID required" }, { status: 400 })
    }

    if (data.title) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    }

    const program = await prisma.researchProgram.update({ where: { id }, data })
    return NextResponse.json(program)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: "Failed to update research program", detail: msg }, { status: 500 })
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
      return NextResponse.json({ error: "Program ID required" }, { status: 400 })
    }

    await prisma.researchProgram.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: "Failed to delete research program", detail: msg }, { status: 500 })
  }
}
