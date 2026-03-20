import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export async function GET(req: NextRequest) {
  try {
    // Only allow authenticated users to view logs (in production, add admin role check)
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const action = searchParams.get('action')
    const userId = searchParams.get('userId')
    const supabaseId = searchParams.get('supabaseId')

    const skip = (page - 1) * limit

    const where: Record<string, string> = {}
    if (action) where.action = action
    if (userId) where.userId = userId
    if (supabaseId) where.supabaseId = supabaseId

    const [logs, total] = await Promise.all([
      prisma.userLog.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.userLog.count({ where })
    ])

    return NextResponse.json({
      logs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Error fetching user logs:', error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}