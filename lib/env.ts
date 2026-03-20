import { z } from "zod"

const envSchema = z.object({
  // Database (at least one required)
  DATABASE_URL: z.string().optional(),
  POSTGRES_PRISMA_URL: z.string().optional(),
  POSTGRES_URL: z.string().optional(),

  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().min(1, "NEXT_PUBLIC_SUPABASE_URL is required"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, "NEXT_PUBLIC_SUPABASE_ANON_KEY is required"),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, "SUPABASE_SERVICE_ROLE_KEY is required"),

  // SMTP (optional — contact form won't work without them)
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_SECURE: z.string().optional(),
}).refine(
  (env) => env.DATABASE_URL || env.POSTGRES_PRISMA_URL || env.POSTGRES_URL,
  { message: "At least one database URL is required (DATABASE_URL, POSTGRES_PRISMA_URL, or POSTGRES_URL)" }
)

export function validateEnv() {
  const result = envSchema.safeParse(process.env)
  if (!result.success) {
    const errors = result.error.issues.map((i) => `  - ${i.message}`).join("\n")
    console.error(`\n❌ Environment validation failed:\n${errors}\n`)
    throw new Error(`Missing required environment variables:\n${errors}`)
  }
}
