import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    await requireAdmin()
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  try {
    const url = new URL(request.url)
    const search = url.searchParams.get("search") || ""
    const page = parseInt(url.searchParams.get("page") || "1")
    const limit = Math.min(parseInt(url.searchParams.get("limit") || "20"), 100)
    const skip = (page - 1) * limit

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { email: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          emailVerified: true,
          dateOfBirth: true,
          createdAt: true,
          _count: {
            select: {
              enrollments: true,
              challengeRegs: true,
              researchApps: true,
              eventRegs: true,
            },
          },
        },
      }),
      prisma.user.count({ where }),
    ])

    return NextResponse.json({ users, total, page, limit, pages: Math.ceil(total / limit) })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: "Failed to fetch users", detail: msg }, { status: 500 })
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
    const { userId, role } = body

    if (!userId || !role || !["user", "admin"].includes(role)) {
      return NextResponse.json({ error: "Invalid userId or role" }, { status: 400 })
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { role },
      select: { id: true, name: true, email: true, role: true },
    })

    return NextResponse.json(user)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: "Failed to update user", detail: msg }, { status: 500 })
  }
}
