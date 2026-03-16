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
    console.error("Error fetching challenges:", err)
    return NextResponse.json({ error: "Failed to fetch challenges" }, { status: 500 })
  }
}
