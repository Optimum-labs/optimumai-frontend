---
name: optimumai-platform
description: >
  Full-stack knowledge base for the OptimumAI platform — an AI education, research, and enterprise
  product serving learners, researchers, and companies. Provides codebase conventions, architecture,
  deployment context, and iterative development guidelines for autonomous AI agents.
applyTo: "**"
---

# OptimumAI Platform — Codebase Skill

## 1. Product Vision

OptimumAI is a **product platform** for three audiences:

| Audience | Value Proposition |
|----------|-------------------|
| **Learners** | AI bootcamps, courses, challenges, certifications |
| **Researchers** | Collaborative research programs, paper co-authoring, compute access |
| **Companies** | Talent pipeline, sponsored challenges, enterprise training, partnerships |

### Product Pillars (roadmap priorities)
1. **Learning Management** — course catalog, enrollments, progress tracking, certifications
2. **Research Collaboration** — program applications, paper submissions, peer review
3. **Challenge Platform** — hackathons, AI challenges, team formation, judging
4. **Events Engine** — symposiums, workshops, webinars, community meetups
5. **Enterprise Portal** — company dashboards, sponsored programs, talent matching
6. **Community** — ambassador program, volunteer network, beta outreach

---

## 2. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.x |
| Language | TypeScript | 5.x |
| Runtime | Node.js | 20.x |
| Package Manager | pnpm | 10.30+ |
| Database | PostgreSQL (Supabase-hosted) | 16+ |
| ORM | Prisma | 7.x |
| Auth | Supabase Auth (SSR cookies) | 2.x |
| UI Framework | shadcn/ui (Radix UI + Tailwind) | latest |
| Styling | Tailwind CSS | 4.x |
| Email | nodemailer (SMTP) | — |
| File Storage | Supabase Storage | — |
| Analytics | Vercel Analytics | — |
| Deployment | **Vercel** (primary) | — |
| CI/CD | Azure Pipelines → Azure Static Web Apps | — |
| Containerization | Docker + docker-compose | — |

---

## 3. Project Structure

```
OptimumAI-website/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (Playfair + DM Mono fonts)
│   ├── page.tsx            # Landing page
│   ├── globals.css         # Design tokens + grain texture + animations
│   ├── api/                # API routes (24 endpoints)
│   │   ├── auth/           # login, signup, reset-password
│   │   ├── admin/          # CRUD for all resources (admin-only)
│   │   ├── challenges/     # Public challenge listing + registration
│   │   ├── events/         # Public event listing + registration
│   │   ├── research/       # Research program applications
│   │   ├── enroll/         # Bootcamp enrollment
│   │   ├── contact/        # Contact form (sends email)
│   │   ├── dashboard/      # User dashboard data
│   │   ├── profile/        # Profile updates
│   │   ├── health/         # DB health check
│   │   ├── logs/           # Activity logs
│   │   └── logout/         # Sign out
│   └── [pages]/            # 20 page routes (public, auth, protected)
├── components/             # Reusable React components
│   ├── ui/                 # shadcn/ui primitives (badge, button, card, input, label)
│   └── *.tsx               # Section components (hero, footer, header, etc.)
├── lib/                    # Shared utilities
│   ├── auth.ts             # getCurrentUser, requireAuth, requireAdmin
│   ├── db.ts               # Prisma client (PrismaPg adapter)
│   ├── supabase.ts         # Browser + Server + Admin Supabase clients
│   ├── user-logger.ts      # Activity logging system
│   └── utils.ts            # cn() and helpers
├── prisma/
│   ├── schema.prisma       # 10 models (User, Course, Challenge, Event, Research, etc.)
│   ├── seed.ts             # Database seeding
│   └── migrations/         # Prisma migrations
├── middleware.ts            # Auth guard (protected + auth redirects)
├── next.config.mjs         # Next.js config
├── vercel.json             # Vercel deployment config
├── components.json          # shadcn/ui config
└── docker-compose.yml       # Local Docker setup
```

---

## 4. Database Models

10 Prisma models:
- **User** — linked to Supabase auth via `supabaseId`, roles: `user` | `admin`
- **Course** — bootcamp/learning programs with slug-based routing
- **Enrollment** — user↔course with progress tracking, supports guest enrollment
- **Challenge** — AI hackathons with team limits, prizes, partnership info
- **ChallengeRegistration** — team/individual signups, resume upload
- **Event** — symposiums, workshops, panels with capacity limits
- **EventRegistration** — attendee tracking
- **ResearchProgram** — collaborative research with prerequisites + objectives
- **ResearchApplication** — program applications with status workflow
- **Ambassador** — university ambassador program
- **MeetingLink** — reusable meeting URLs for any entity
- **Activity** — user activity audit trail
- **UserLog** — security-grade logging (IP, user agent, metadata)

---

## 5. Authentication Flow

```
Supabase Auth (email/password + OAuth) → SSR Cookies → Middleware guard
    ↓
getCurrentUser() → prisma.user.upsert (sync Supabase → local DB)
    ↓
requireAuth() / requireAdmin() → route protection
```

- Protected paths: `/dashboard`, `/admin`
- Auth pages redirect to `/dashboard` if already logged in
- Admin routes validate `role === 'admin'` at API level

---

## 6. Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--ink` | `#0a0a0a` | Primary text |
| `--paper` | `#f5f0e8` | Background (warm parchment) |
| `--opt-red` | `#c8392b` | Error / accent |
| `--gold` | `#10b981` | Success / secondary |
| `--muted-txt` | `#6b6456` | Tertiary text |

- **Headlines**: Playfair Display (serif)
- **Body/Code**: DM Mono (monospace)
- **Visual FX**: SVG grain overlay, staggered fade-up animations
- **Prefix**: `.opt-*` classes for custom styles (avoid Tailwind collisions)

---

## 7. API Conventions

- **Auth check**: Use `getCurrentUser()` for optional auth, `requireAuth()` for required, `requireAdmin()` for admin-only
- **Response format**: `NextResponse.json({ data?, error?, message? }, { status })`
- **Validation**: Inline checks (TODO: migrate to Zod schemas)
- **File uploads**: `formidable` for multipart parsing → Supabase Storage
- **Email**: nodemailer with HTML templates using brand colors
- **Logging**: `UserLogger` class for audit trail on all auth + data operations

---

## 8. Deployment

### Vercel (Primary)
```json
{
  "framework": "nextjs",
  "installCommand": "corepack enable && pnpm install",
  "buildCommand": "pnpm build"
}
```
- Build: `prisma generate && next build`
- Preview deployments on PRs
- Production on `main` branch

### Environment Variables Required
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
DATABASE_URL
NEXT_PUBLIC_APP_URL
NEXT_PUBLIC_APP_NAME
SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS
```

---

## 9. Development Commands

```bash
pnpm dev              # Start dev server
pnpm build            # prisma generate && next build
pnpm lint             # ESLint
pnpm db:migrate       # Prisma migrate dev
pnpm db:push          # Push schema to DB
pnpm db:seed          # Seed database
pnpm db:studio        # Prisma Studio GUI
pnpm db:generate      # Generate Prisma client
pnpm docker:up        # Docker compose up
```

---

## 10. Coding Conventions

1. **File naming**: kebab-case for files, PascalCase for components
2. **Imports**: Use `@/` alias for absolute imports from project root
3. **Components**: Server Components by default; add `"use client"` only when needed
4. **API routes**: One `route.ts` per endpoint directory, handle multiple HTTP methods
5. **Prisma**: Always use the singleton from `lib/db.ts`
6. **Auth**: Always use helpers from `lib/auth.ts` — never call Supabase directly in routes
7. **Types**: Prefer Prisma-generated types; avoid `any`
8. **CSS**: Use Tailwind utilities; custom styles in `globals.css` with `opt-` prefix
9. **UI primitives**: Use shadcn/ui components from `components/ui/`; install new ones via shadcn CLI

---

## 11. Known Gaps (Backlog)

| Area | Gap | Priority |
|------|-----|----------|
| Testing | No test framework, zero tests | P0 |
| Validation | No Zod schemas for API input | P0 |
| Rate Limiting | No API rate limiting | P1 |
| Payments | No Stripe/payment integration | P1 |
| Search | No full-text search | P1 |
| Blog/CMS | Footer links are placeholders | P2 |
| i18n | English only | P2 |
| Error Tracking | No Sentry | P1 |
| API Docs | No OpenAPI/Swagger | P2 |
| Caching | No Redis/caching layer | P2 |
| 2FA | No two-factor auth | P2 |
| Notifications | No push/in-app notifications | P2 |
| Progress Tracking | Course progress not wired up | P1 |
| Company Portal | No enterprise features | P2 |

---

## 12. Iterative Development Protocol

When developing features for this platform:

1. **Check existing models** in `prisma/schema.prisma` before adding new ones
2. **Reuse existing patterns** — look at similar API routes for conventions
3. **Test locally** with `pnpm dev` before committing
4. **Run `pnpm build`** to verify no TypeScript errors
5. **Update seed data** in `prisma/seed.ts` for new models
6. **Follow the design system** — use existing color tokens and typography
7. **Log user actions** via `UserLogger` for audit trail
8. **Protect routes** using middleware + `requireAuth()`/`requireAdmin()`
