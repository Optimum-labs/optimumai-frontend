import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { adminAmbassadorCreateSchema, adminAmbassadorPatchSchema, parseBody } from "@/lib/validations"

export async function GET(request: NextRequest) {
  try {
    await requireAdmin()
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  try {
    const url = new URL(request.url)
    const search = url.searchParams.get("search") || ""
    const status = url.searchParams.get("status") || ""

    const where: Record<string, unknown> = {}
    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ]
    }
    if (status) where.status = status

    const ambassadors = await prisma.ambassador.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true, role: true } } },
    })

    return NextResponse.json(ambassadors)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: "Failed to fetch ambassadors", detail: msg }, { status: 500 })
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
    const { data: parsed, error: validationError } = parseBody(adminAmbassadorCreateSchema, body)

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 })
    }

    const { fullName, email, university, linkedIn, motivation, status, region } = parsed

    const ambassador = await prisma.ambassador.create({
      data: {
        fullName, email, motivation,
        university: university || null,
        linkedIn: linkedIn || null,
        status: status || "pending",
        region: region || null,
      },
    })

    return NextResponse.json(ambassador, { status: 201 })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: "Failed to create ambassador", detail: msg }, { status: 500 })
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
    const { data: parsed, error: validationError } = parseBody(adminAmbassadorPatchSchema, body)

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 })
    }

    const { id, ...data } = parsed

    const ambassador = await prisma.ambassador.update({ where: { id }, data })
    return NextResponse.json(ambassador)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: "Failed to update ambassador", detail: msg }, { status: 500 })
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
      return NextResponse.json({ error: "Ambassador ID required" }, { status: 400 })
    }

    await prisma.ambassador.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: "Failed to delete ambassador", detail: msg }, { status: 500 })
  }
}
