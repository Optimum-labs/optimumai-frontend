import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { adminChallengeCreateSchema, adminChallengeUpdateSchema, parseBody } from "@/lib/validations"

export async function GET() {
  try {
    await requireAdmin()
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  try {
    const challenges = await prisma.challenge.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { registrations: true } } },
    })
    return NextResponse.json(challenges)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: "Failed to fetch challenges", detail: msg }, { status: 500 })
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
    const { data: parsed, error: validationError } = parseBody(adminChallengeCreateSchema, body)

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 })
    }

    const { title, description, level, duration, prizePool, partnership, maxTeams, teamSize, tags, startsAt, registrationCloses, status } = parsed

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")

    const challenge = await prisma.challenge.create({
      data: {
        title,
        slug,
        description,
        level,
        duration,
        prizePool: prizePool || null,
        partnership: partnership || null,
        maxTeams: maxTeams || 10,
        teamSize: teamSize || 5,
        tags: tags || [],
        startsAt: new Date(startsAt),
        registrationCloses: registrationCloses ? new Date(registrationCloses) : null,
        status: status || "open",
      },
    })

    return NextResponse.json(challenge, { status: 201 })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: "Failed to create challenge", detail: msg }, { status: 500 })
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
    const { data: parsed, error: validationError } = parseBody(adminChallengeUpdateSchema, body)

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 })
    }

    const { id, ...rest } = parsed
    const data: Record<string, unknown> = { ...rest }

    if (data.startsAt) data.startsAt = new Date(data.startsAt as string)
    if (data.registrationCloses) data.registrationCloses = new Date(data.registrationCloses as string)
    if (rest.title) {
      data.slug = rest.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    }

    const challenge = await prisma.challenge.update({ where: { id }, data })
    return NextResponse.json(challenge)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: "Failed to update challenge", detail: msg }, { status: 500 })
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
      return NextResponse.json({ error: "Challenge ID required" }, { status: 400 })
    }

    await prisma.challenge.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: "Failed to delete challenge", detail: msg }, { status: 500 })
  }
}
