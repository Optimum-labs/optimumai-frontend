import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { adminRegistrationPatchSchema, parseBody } from "@/lib/validations"

export async function GET(request: NextRequest) {
  try {
    await requireAdmin()
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  try {
    const url = new URL(request.url)
    const challengeId = url.searchParams.get("challengeId")
    const eventId = url.searchParams.get("eventId")

    if (challengeId) {
      const regs = await prisma.challengeRegistration.findMany({
        where: { challengeId },
        include: { challenge: { select: { title: true } }, user: { select: { name: true, email: true } } },
        orderBy: { createdAt: "desc" },
      })
      return NextResponse.json(regs)
    }

    if (eventId) {
      const regs = await prisma.eventRegistration.findMany({
        where: { eventId },
        include: { event: { select: { title: true } }, user: { select: { name: true, email: true } } },
        orderBy: { createdAt: "desc" },
      })
      return NextResponse.json(regs)
    }

    return NextResponse.json({ error: "Provide challengeId or eventId" }, { status: 400 })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: "Failed to fetch registrations", detail: msg }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await requireAdmin()
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  try {
    const body = await request.json()
    const { data: parsed, error: validationError } = parseBody(adminRegistrationPatchSchema, body)

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 })
    }

    const { id, type, status, meetingLink } = parsed

    const data: Record<string, string> = {}
    if (status) data.status = status
    if (meetingLink !== undefined && meetingLink !== null) data.meetingLink = meetingLink

    if (type === "challenge") {
      const reg = await prisma.challengeRegistration.update({ where: { id }, data })
      return NextResponse.json(reg)
    } else if (type === "event") {
      const reg = await prisma.eventRegistration.update({ where: { id }, data })
      return NextResponse.json(reg)
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: "Failed to update registration", detail: msg }, { status: 500 })
  }
}
