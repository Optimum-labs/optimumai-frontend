# OptimumAI Platform — Copilot Instructions

## Project Overview

**OptimumAI** is an AI education, research, and enterprise product platform deployed on **Vercel** 
with **Supabase** (PostgreSQL + Auth + Storage). Built with Next.js 16 (App Router), Prisma 7, 
TypeScript, shadcn/ui, and Tailwind CSS 4.

### Three Audiences
1. **Learners** — AI bootcamps, courses, challenges, certifications
2. **Researchers** — collaborative research programs, paper co-authoring
3. **Companies** — talent pipeline, sponsored challenges, enterprise training

## Agent System

This project uses specialized AI agents for autonomous development. Each agent has deep
context about their domain and self-updates based on codebase changes.

### Available Agents

| Agent | File | Domain |
|-------|------|--------|
| **Scrum Master** | `.github/agents/scrum-master.agent.md` | Sprint planning, backlog, coordination |
| **Product Owner** | `.github/agents/product-owner.agent.md` | Product strategy, user stories, roadmap |
| **UI/UX Designer** | `.github/agents/ui-ux-designer.agent.md` | Design system, pages, accessibility |
| **Full Stack Developer** | `.github/agents/full-stack-developer.agent.md` | End-to-end feature delivery |
| **API Developer** | `.github/agents/api-developer.agent.md` | API routes, validation, security |
| **Backend Developer** | `.github/agents/backend-developer.agent.md` | Database, Prisma, Supabase, infra |
| **Tester** | `.github/agents/tester.agent.md` | Tests, QA, accessibility audits |
| **DevOps Researcher** | `.github/agents/devops-researcher.agent.md` | CI/CD, deps, perf, research |
| **Orchestrator** | `.github/agents/orchestrator.agent.md` | Sprint lifecycle, branching, agent coordination |
| **Architect** | `.github/agents/architect.agent.md` | System design, ADRs, tech evaluation, scalability |

### Codebase Skill
Comprehensive codebase knowledge: `.github/skills/SKILL.md`

## Development Workflow

### Starting a Session
1. Read `.github/agents/scrum-master.agent.md` for current sprint context
2. Read `.github/backlog/current-sprint.md` for active work items
3. Identify highest-priority incomplete task
4. Read the relevant agent file for domain-specific guidance
5. Implement the feature following established patterns
6. Update sprint tracking files

### Implementing Features
1. **Read existing code first** — understand patterns before writing
2. **Schema first** — add Prisma models before API/UI code
3. **API second** — create endpoints with proper auth and validation
4. **UI last** — build the frontend using existing design system
5. **Test** — run `pnpm build` after every change
6. **Log** — use `UserLogger` for data-modifying operations

### Key Rules
- Use `@/` imports everywhere (never relative paths across directories)
- Use Prisma singleton from `lib/db.ts` (never create new client)
- Use auth helpers from `lib/auth.ts` (never call Supabase directly)
- Server Components by default; `"use client"` only for interactivity
- shadcn/ui components from `components/ui/`; install new ones via `npx shadcn@latest add`
- Follow the design system (Playfair Display headings, DM Mono body, warm palette)
- `pnpm` only — never `npm` or `yarn`

### Commands
```bash
pnpm dev              # Local dev server
pnpm build            # Production build (prisma generate + next build)
pnpm lint             # ESLint
pnpm db:migrate       # Create migration
pnpm db:push          # Push schema (no migration file)
pnpm db:seed          # Seed database
pnpm db:studio        # Database GUI
```

### Environment
- **Deployment**: Vercel (primary), Azure Static Web Apps (CI/CD)
- **Database**: PostgreSQL on Supabase
- **Auth**: Supabase Auth (email/password + OAuth)
- **Storage**: Supabase Storage (resumes bucket)
- **Email**: nodemailer SMTP

## Self-Updating Behavior

After every development session, agents should:
1. Update their own agent file if new patterns were discovered
2. Update `SKILL.md` if the codebase structure changed
3. Update `.github/backlog/current-sprint.md` with completed work
4. Flag discovered bugs or tech debt in the backlog
5. Record architectural decisions in `.github/decisions/`

This ensures each session starts with accurate, up-to-date context.
