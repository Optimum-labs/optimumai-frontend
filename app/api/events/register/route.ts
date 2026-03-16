import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import { UserLogger } from "@/lib/user-logger"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const eventId = formData.get('eventId') as string
    const fullName = formData.get('fullName') as string
    const email = formData.get('email') as string

    if (!eventId || !fullName || !email) {
      return NextResponse.json(
        { error: "Event ID, full name, and email are required." },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 })
    }

    // Check event exists
    const event = await prisma.event.findUnique({ where: { id: eventId } })
    if (!event) {
      return NextResponse.json({ error: "Event not found." }, { status: 404 })
    }

    // Check if event is still accepting registrations
    if (event.status !== "upcoming") {
      return NextResponse.json({ error: "Registration for this event is closed." }, { status: 400 })
    }

    // Check for duplicate registration
    const existing = await prisma.eventRegistration.findUnique({
      where: { eventId_email: { eventId, email } },
    })
    if (existing) {
      return NextResponse.json({ error: "You are already registered for this event." }, { status: 409 })
    }

    // Get authenticated user if available
    let userId: string | null = null
    try {
      const user = await getCurrentUser()
      if (user) userId = user.id
    } catch {
      // User not logged in, that's fine
    }

    const registration = await prisma.eventRegistration.create({
      data: {
        eventId,
        userId,
        fullName,
        email,
      },
    })

    // Log the registration
    if (userId) {
      await prisma.activity.create({
        data: {
          userId,
          type: "event",
          description: `Registered for event: ${event.title}`,
        },
      })

      await UserLogger.logUserAction(
        "event_registration",
        userId,
        `Registered for event: ${event.title}`,
        { eventId, eventTitle: event.title },
        req
      )
    }

    return NextResponse.json({
      message: "Registration successful! You'll receive a confirmation email shortly.",
      registration: { id: registration.id },
    })
  } catch (err) {
    console.error("Event registration error:", err)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}