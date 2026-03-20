import { NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { profileUpdateSchema, parseBody } from "@/lib/validations"

export async function PUT(req: NextRequest) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const { data: parsed, error: validationError } = parseBody(profileUpdateSchema, body)

  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 })
  }

  const updateData: { name?: string; dateOfBirth?: Date | null } = {}
  if (parsed.name) {
    updateData.name = parsed.name
  }
  if (parsed.dateOfBirth !== undefined) {
    updateData.dateOfBirth = parsed.dateOfBirth ? new Date(parsed.dateOfBirth) : null
  }

  const updated = await prisma.user.update({
    where: { id: user.id },
    select: { id: true, name: true, email: true, dateOfBirth: true, createdAt: true },
    data: updateData,
  })

  return NextResponse.json({ user: updated })
}
