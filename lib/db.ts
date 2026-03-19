import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

function createPrismaClient() {
  // DATABASE_URL locally; Vercel Supabase integration provides POSTGRES_PRISMA_URL / POSTGRES_URL
  let connectionString =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL

  const isRemote = process.env.NODE_ENV === "production" ||
    (connectionString && connectionString.includes("supabase.co"))

  // Strip sslmode from connection string — pg treats sslmode=require as verify-full
  // which rejects Supabase's self-signed cert. We apply SSL config explicitly instead.
  if (isRemote && connectionString) {
    const url = new URL(connectionString)
    url.searchParams.delete("sslmode")
    connectionString = url.toString()
  }

  const pool = new pg.Pool({
    connectionString,
    ...(isRemote ? { ssl: { rejectUnauthorized: false } } : {}),
  })

  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma || createPrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
