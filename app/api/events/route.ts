import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status') || 'upcoming'
    const limit = parseInt(searchParams.get('limit') || '10')

    const events = await prisma.event.findMany({
      where: {
        status: status,
      },
      include: {
        _count: {
          select: { registrations: true }
        }
      },
      orderBy: {
        date: 'asc'
      },
      take: limit
    })

    // Transform the data to match the frontend expectations
    const transformedEvents = events.map(event => ({
      id: event.id,
      title: event.title,
      date: event.date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: event.time,
      location: event.location,
      type: event.type,
      description: event.description,
      attendees: event._count.registrations,
      status: event.status === 'upcoming' ? 'Registering' : 'Closed',
      maxAttendees: event.maxAttendees
    }))

    return NextResponse.json(transformedEvents)
  } catch (err) {
    console.error("Events fetch error:", err)
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}