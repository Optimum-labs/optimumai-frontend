import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

function createPrismaClient() {
  let connectionString =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL

  const isRemote = process.env.NODE_ENV === "production" ||
    (connectionString && connectionString.includes("supabase.co"))

  // pg v8 treats sslmode=require as verify-full, rejecting Supabase's self-signed cert.
  // Adding uselibpqcompat=true makes sslmode=require use standard libpq semantics:
  // "require SSL but don't verify the server certificate" — exactly what Supabase needs.
  if (isRemote && connectionString) {
    const sep = connectionString.includes("?") ? "&" : "?"
    connectionString += `${sep}uselibpqcompat=true`
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
