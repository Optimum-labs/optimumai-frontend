import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET() {
  try {
    const challenges = await prisma.challenge.findMany({
      orderBy: { startsAt: "asc" },
      include: {
        _count: { select: { registrations: true } },
      },
    })

    return NextResponse.json(challenges)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error("Error fetching challenges:", msg)
    return NextResponse.json({ error: "Failed to fetch challenges", detail: msg }, { status: 500 })
  }
}
