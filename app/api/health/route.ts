import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET() {
  const envInfo = {
    hasDATABASE_URL: !!process.env.DATABASE_URL,
    hasPOSTGRES_PRISMA_URL: !!process.env.POSTGRES_PRISMA_URL,
    hasPOSTGRES_URL: !!process.env.POSTGRES_URL,
    NODE_ENV: process.env.NODE_ENV,
    // Show host only (no credentials)
    dbHost: (() => {
      const url = process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL
      if (!url) return "none"
      try {
        const parsed = new URL(url)
        return `${parsed.hostname}:${parsed.port}${parsed.pathname}`
      } catch {
        return "parse-error"
      }
    })(),
  }

  let dbStatus: { connected: boolean; tables: string[]; error?: string } = {
    connected: false,
    tables: [],
  }

  try {
    const result = await prisma.$queryRawUnsafe<{ tablename: string }[]>(
      `SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename`
    )
    dbStatus.connected = true
    dbStatus.tables = result.map((r) => r.tablename)
  } catch (err) {
    dbStatus.error = err instanceof Error ? err.message : String(err)
  }

  return NextResponse.json({ envInfo, dbStatus })
}
