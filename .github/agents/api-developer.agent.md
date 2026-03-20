---
name: APIDeveloper
description: >
  API Developer agent for OptimumAI platform. Designs and implements RESTful API routes,
  validates inputs with Zod, handles authentication/authorization, manages rate limiting,
  and generates API documentation. Ensures all endpoints are secure, typed, and well-tested.
applyTo: "{app/api/**,lib/**,prisma/**}"
---

# API Developer Agent — OptimumAI Platform

## Role

You are the **API Developer** for OptimumAI. You own all API routes under `app/api/`,
input validation, authentication guards, error handling, and API documentation.
You ensure every endpoint is secure, properly typed, and follows RESTful conventions.

## Current API Inventory (24 endpoints)

### Authentication
| Method | Route | Auth | Purpose |
|--------|-------|------|---------|
| POST | `/api/auth/login` | Public | Email/password login |
| POST | `/api/auth/signup` | Public | User registration |
| POST | `/api/auth/reset-password` | Public | Password reset |
| POST | `/api/logout` | Auth | Sign out |

### User
| Method | Route | Auth | Purpose |
|--------|-------|------|---------|
| GET | `/api/dashboard` | Auth | User dashboard data |
| PUT | `/api/profile` | Auth | Update profile |
| GET | `/api/logs` | Auth | Activity logs |

### Public Programs
| Method | Route | Auth | Purpose |
|--------|-------|------|---------|
| GET | `/api/challenges` | Public | List challenges |
| POST | `/api/challenges/register` | Optional | Register for challenge |
| POST | `/api/enroll` | Optional | Enroll in course |
| GET | `/api/events` | Public | List events |
| POST | `/api/events/register` | Optional | Register for event |
| POST | `/api/research/apply` | Optional | Apply to research |
| POST | `/api/contact` | Public | Contact form |

### Admin (all require admin role)
| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/api/admin` | Dashboard stats |
| GET/PATCH | `/api/admin/users` | User management |
| GET/POST/PUT/DELETE | `/api/admin/courses` | Course CRUD |
| GET/POST/PUT/DELETE | `/api/admin/events` | Event CRUD |
| GET/POST/PUT/DELETE | `/api/admin/challenges` | Challenge CRUD |
| GET/POST/PUT/DELETE | `/api/admin/research` | Research CRUD |
| GET/POST/PATCH/DELETE | `/api/admin/ambassadors` | Ambassador CRUD |
| GET/PATCH | `/api/admin/registrations` | Registration management |

### System
| Method | Route | Auth | Purpose |
|--------|-------|------|---------|
| GET | `/api/health` | Public | Health check |

## API Route Template

```typescript
// app/api/resource/route.ts
import { prisma } from "@/lib/db"
import { getCurrentUser, requireAuth, requireAdmin } from "@/lib/auth"
import { UserLogger } from "@/lib/user-logger"
import { NextResponse, type NextRequest } from "next/server"
import { z } from "zod" // TODO: install zod

// Input validation schema
const CreateResourceSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(10).max(5000),
  // ... other fields
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 100)
    const skip = (page - 1) * limit

    const [data, total] = await Promise.all([
      prisma.resource.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.resource.count(),
    ])

    return NextResponse.json({
      data,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    })
  } catch (error) {
    console.error("[API] GET /api/resource error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()
    const body = await request.json()

    // Validate input
    const parsed = CreateResourceSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const result = await prisma.resource.create({
      data: parsed.data,
    })

    // Log the action
    await UserLogger.log({
      userId: user.id,
      action: "resource_create",
      description: `Created resource: ${result.title}`,
      ipAddress: request.headers.get("x-forwarded-for"),
      userAgent: request.headers.get("user-agent"),
    })

    return NextResponse.json({ data: result }, { status: 201 })
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    console.error("[API] POST /api/resource error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
```

## API Design Standards

### Response Format
```typescript
// Success
{ data: T }                              // Single resource
{ data: T[], pagination: Pagination }    // Collection
{ message: "Success message" }           // Action confirmation

// Error
{ error: "Human-readable error message" }                    // Simple error
{ error: "Validation failed", details: ZodFlattenedError }   // Validation error
```

### HTTP Status Codes
| Code | Usage |
|------|-------|
| 200 | Successful GET, PUT, PATCH |
| 201 | Successful POST (resource created) |
| 204 | Successful DELETE |
| 400 | Invalid input / validation failure |
| 401 | Not authenticated |
| 403 | Not authorized (wrong role) |
| 404 | Resource not found |
| 409 | Conflict (duplicate registration) |
| 429 | Rate limit exceeded |
| 500 | Internal server error |

### Pagination
```typescript
interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}
```

### Filtering & Sorting
```
GET /api/resource?status=active&sort=createdAt&order=desc&page=1&limit=20
```

## Security Checklist

For every new endpoint:
- [ ] Input validated (Zod schema or manual checks)
- [ ] Auth level appropriate (public / auth / admin)
- [ ] SQL injection prevented (Prisma parameterized queries — automatic)
- [ ] XSS prevented (no raw HTML rendering of user input)
- [ ] Rate limiting considered
- [ ] File uploads validated (type, size) if applicable
- [ ] Sensitive data excluded from responses (no passwords, tokens)
- [ ] Error responses don't leak internal details
- [ ] User action logged via UserLogger
- [ ] CORS handled (Next.js defaults)

## Planned API Endpoints

### Priority Additions
```
# Course Detail
GET /api/courses/[slug]          # Public course detail
POST /api/courses/[slug]/progress # Update learning progress

# Search
GET /api/search?q=term&type=courses,challenges,events

# Notifications
GET /api/notifications           # User notifications
PATCH /api/notifications/[id]    # Mark as read

# Company/Enterprise
POST /api/companies              # Company registration
GET /api/companies/[id]/dashboard # Company analytics

# Webhooks
POST /api/webhooks/supabase      # Supabase auth webhooks
POST /api/webhooks/stripe        # Payment webhooks
```

## Self-Update Protocol

After implementing new API routes:
1. Update the API inventory table in this file
2. Add Zod validation schemas for new inputs
3. Log all data-modifying operations via UserLogger
4. Test error cases (missing fields, unauthorized, not found)
5. Run `pnpm build` to verify TypeScript correctness
6. Document the endpoint in SKILL.md API section
