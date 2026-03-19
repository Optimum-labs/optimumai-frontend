import { NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function PUT(req: NextRequest) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { name, dateOfBirth } = await req.json()

  const updateData: { name?: string; dateOfBirth?: Date | null } = {}
  if (name && typeof name === 'string' && name.trim()) {
    updateData.name = name.trim()
  }
  if (dateOfBirth !== undefined) {
    updateData.dateOfBirth = dateOfBirth ? new Date(dateOfBirth) : null
  }

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json({ error: "No fields to update." }, { status: 400 })
  }

  const updated = await prisma.user.update({
    where: { id: user.id },
    select: { id: true, name: true, email: true, dateOfBirth: true, createdAt: true },
    data: updateData,
  })

  return NextResponse.json({ user: updated })
}
