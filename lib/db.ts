import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

function createPrismaClient() {
  // DATABASE_URL locally; Vercel Supabase integration provides POSTGRES_PRISMA_URL / POSTGRES_URL
  const connectionString =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL
  const needsSsl = process.env.NODE_ENV === "production" ||
    (connectionString && connectionString.includes("supabase.co"))
  const adapter = new PrismaPg({
    connectionString,
    ssl: needsSsl ? { rejectUnauthorized: false } : undefined,
  })
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma || createPrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
