import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

function createPrismaClient() {
  let connectionString =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL

  if (!connectionString) {
    throw new Error("No database connection string found. Set DATABASE_URL.")
  }

  const isRemote = process.env.NODE_ENV === "production" ||
    connectionString.includes("supabase.co")

  if (isRemote) {
    // pg v8 treats sslmode=require as verify-full (rejects Supabase self-signed certs).
    // uselibpqcompat=true makes it use standard libpq semantics instead.
    if (!connectionString.includes("uselibpqcompat=")) {
      const sep = connectionString.includes("?") ? "&" : "?"
      connectionString += `${sep}uselibpqcompat=true`
    }
    if (!connectionString.includes("sslmode=")) {
      connectionString += "&sslmode=require"
    }
  }

  const pool = new pg.Pool({ connectionString })
  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma || createPrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
