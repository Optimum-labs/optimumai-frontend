import { z } from "zod"

// ── Shared ──────────────────────────────────────────────

const email = z.string().email("Invalid email address")
const linkedInUrl = z
  .string()
  .url()
  .refine(
    (url) =>
      url.startsWith("https://linkedin.com/") ||
      url.startsWith("https://www.linkedin.com/"),
    "Must be a LinkedIn URL"
  )

// ── Auth ────────────────────────────────────────────────

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Password is required"),
})

export const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email,
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export const resetPasswordSchema = z.object({
  email,
})

// ── Contact ─────────────────────────────────────────────

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email,
  phone: z.string().min(1, "Phone is required"),
  message: z.string().min(1, "Message is required"),
})

// ── Research Apply ──────────────────────────────────────

export const researchApplySchema = z.object({
  programSlug: z.string().min(1, "Program slug is required"),
  fullName: z.string().optional(),
  email: z.string().email().optional(),
})

// ── Profile ─────────────────────────────────────────────

export const profileUpdateSchema = z
  .object({
    name: z.string().trim().min(1).optional(),
    dateOfBirth: z.string().nullable().optional(),
  })
  .refine((data) => data.name || data.dateOfBirth !== undefined, {
    message: "At least one field must be provided",
  })

// ── Admin Users ─────────────────────────────────────────

export const adminUserPatchSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  role: z.enum(["user", "admin"], { message: "Role must be 'user' or 'admin'" }),
})

// ── Admin Courses ───────────────────────────────────────

export const adminCourseCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  duration: z.string().min(1, "Duration is required"),
  level: z.string().min(1, "Level is required"),
  tags: z.array(z.string()).optional(),
})

export const adminCourseUpdateSchema = z.object({
  id: z.string().min(1, "Course ID is required"),
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  duration: z.string().min(1).optional(),
  level: z.string().min(1).optional(),
  tags: z.array(z.string()).optional(),
})

// ── Admin Events ────────────────────────────────────────

export const adminEventCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  location: z.string().min(1, "Location is required"),
  type: z.string().min(1, "Type is required"),
  maxAttendees: z.number().int().positive().optional(),
  status: z.string().optional(),
  meetingLink: z.string().url().optional().nullable(),
})

export const adminEventUpdateSchema = z.object({
  id: z.string().min(1, "Event ID is required"),
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  date: z.string().min(1).optional(),
  time: z.string().min(1).optional(),
  location: z.string().min(1).optional(),
  type: z.string().min(1).optional(),
  maxAttendees: z.number().int().positive().optional().nullable(),
  status: z.string().optional(),
  meetingLink: z.string().url().optional().nullable(),
})

// ── Admin Challenges ────────────────────────────────────

export const adminChallengeCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  level: z.string().min(1, "Level is required"),
  duration: z.string().min(1, "Duration is required"),
  startsAt: z.string().min(1, "Start date is required"),
  prizePool: z.string().optional(),
  partnership: z.string().optional(),
  maxTeams: z.number().int().positive().optional(),
  teamSize: z.number().int().positive().optional(),
  tags: z.array(z.string()).optional(),
  registrationCloses: z.string().optional(),
  status: z.string().optional(),
})

export const adminChallengeUpdateSchema = z.object({
  id: z.string().min(1, "Challenge ID is required"),
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  level: z.string().min(1).optional(),
  duration: z.string().min(1).optional(),
  startsAt: z.string().min(1).optional(),
  prizePool: z.string().optional().nullable(),
  partnership: z.string().optional().nullable(),
  maxTeams: z.number().int().positive().optional(),
  teamSize: z.number().int().positive().optional(),
  tags: z.array(z.string()).optional(),
  registrationCloses: z.string().optional().nullable(),
  status: z.string().optional(),
})

// ── Admin Research ──────────────────────────────────────

export const adminResearchCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  organization: z.string().min(1, "Organization is required"),
  difficulty: z.string().min(1, "Difficulty is required"),
  duration: z.string().min(1, "Duration is required"),
  tags: z.array(z.string()).optional(),
  objectives: z.array(z.string()).optional(),
  prerequisites: z.array(z.string()).optional(),
  status: z.string().optional(),
  meetingLink: z.string().url().optional().nullable(),
})

export const adminResearchUpdateSchema = z.object({
  id: z.string().min(1, "Research ID is required"),
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  organization: z.string().min(1).optional(),
  difficulty: z.string().min(1).optional(),
  duration: z.string().min(1).optional(),
  tags: z.array(z.string()).optional(),
  objectives: z.array(z.string()).optional(),
  prerequisites: z.array(z.string()).optional(),
  status: z.string().optional(),
  meetingLink: z.string().url().optional().nullable(),
})

// ── Admin Ambassadors ───────────────────────────────────

export const adminAmbassadorCreateSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email,
  motivation: z.string().min(1, "Motivation is required"),
  university: z.string().optional().nullable(),
  linkedIn: linkedInUrl.optional().nullable(),
  status: z.string().optional(),
  region: z.string().optional().nullable(),
})

export const adminAmbassadorPatchSchema = z.object({
  id: z.string().min(1, "Ambassador ID is required"),
  fullName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  motivation: z.string().min(1).optional(),
  university: z.string().optional().nullable(),
  linkedIn: linkedInUrl.optional().nullable(),
  status: z.string().optional(),
  region: z.string().optional().nullable(),
})

// ── Admin Registrations ─────────────────────────────────

export const adminRegistrationPatchSchema = z.object({
  id: z.string().min(1, "Registration ID is required"),
  type: z.enum(["challenge", "event"], { message: "Type must be 'challenge' or 'event'" }),
  status: z.string().optional(),
  meetingLink: z.string().url().optional().nullable(),
})

// ── Helper ──────────────────────────────────────────────

export function parseBody<T>(schema: z.ZodSchema<T>, data: unknown) {
  const result = schema.safeParse(data)
  if (!result.success) {
    return {
      data: null as never,
      error: result.error.issues.map((i) => i.message).join(", "),
    }
  }
  return { data: result.data, error: null }
}
