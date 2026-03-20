import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { adminEventCreateSchema, adminEventUpdateSchema, parseBody } from "@/lib/validations"

export async function GET() {
  try {
    await requireAdmin()
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  try {
    const events = await prisma.event.findMany({
      orderBy: { date: "desc" },
      include: { _count: { select: { registrations: true } } },
    })
    return NextResponse.json(events)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: "Failed to fetch events", detail: msg }, { status: 500 })
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
    const { data: parsed, error: validationError } = parseBody(adminEventCreateSchema, body)

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 })
    }

    const { title, description, date, time, location, type, maxAttendees, status, meetingLink } = parsed

    if (!title || !description || !date || !time || !location || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")

    const event = await prisma.event.create({
      data: {
        title,
        slug,
        description,
        date: new Date(date),
        time,
        location,
        type,
        maxAttendees: maxAttendees || null,
        status: status || "upcoming",
        meetingLink: meetingLink || null,
      },
    })

    return NextResponse.json(event, { status: 201 })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: "Failed to create event", detail: msg }, { status: 500 })
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
    const { data: parsed, error: validationError } = parseBody(adminEventUpdateSchema, body)

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 })
    }

    const { id, ...rest } = parsed
    const data: Record<string, unknown> = { ...rest }

    if (data.date) data.date = new Date(data.date as string)
    if (rest.title) {
      data.slug = rest.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    }

    const event = await prisma.event.update({ where: { id }, data })
    return NextResponse.json(event)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: "Failed to update event", detail: msg }, { status: 500 })
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
      return NextResponse.json({ error: "Event ID required" }, { status: 400 })
    }

    await prisma.event.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: "Failed to delete event", detail: msg }, { status: 500 })
  }
}
