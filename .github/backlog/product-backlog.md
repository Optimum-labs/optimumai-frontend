# Product Backlog — OptimumAI Platform

> Prioritized by: Product Owner Agent
> Last updated: March 26, 2026

---

## P0 — Critical (Must have for basic product quality)

| ID | Story | Agent | Status |
|----|-------|-------|--------|
| TEST-001 | Set up test infrastructure (Vitest + Playwright) | Tester | Sprint 1 |
| API-001 | Add Zod validation to all API routes | API Developer | Sprint 1 |
| BACKEND-001 | Remove all `any` types | Backend Developer | Sprint 1 |

---

## P1 — High (Core product features)

| ID | Story | Agent | Status |
|----|-------|-------|--------|
| FEAT-001 | Individual course detail pages (`/courses/[slug]`) | Full Stack | Sprint 1 |
| FEAT-002 | Course progress tracking (lesson completion) | Full Stack | Sprint 1 |
| FEAT-003 | Certificate generation on course completion | Full Stack | Backlog |
| FEAT-004 | Email notifications for enrollments & registrations | Backend | Backlog |
| FEAT-005 | Full-text search across courses, challenges, events | Full Stack | Backlog |
| FEAT-006 | Payment integration (Stripe) for premium courses | Full Stack | Backlog |
| API-002 | Rate limiting on auth and registration endpoints | API Developer | Sprint 1 |
| API-003 | Error tracking integration (Sentry) | API Developer | Backlog |
| UI-001 | Loading skeletons for data-fetching pages | UI/UX | Sprint 1 |
| UI-002 | Mobile responsiveness audit | UI/UX | Sprint 1 |
| BACKEND-002 | Startup environment validation | Backend | Sprint 1 |

---

## P2 — Medium (Enhanced product experience)

| ID | Story | Agent | Status |
|----|-------|-------|--------|
| FEAT-010 | Blog/CMS system for articles and tutorials | Full Stack | Backlog |
| FEAT-011 | Discussion forums per course and challenge | Full Stack | Backlog |
| FEAT-012 | Researcher public profile pages | Full Stack | Backlog |
| FEAT-013 | Gamification (points, badges, streaks) | Full Stack | Backlog |
| FEAT-014 | Push/in-app notification system | Full Stack | Backlog |
| FEAT-015 | Command palette (Cmd+K) for navigation | UI/UX | Backlog |
| FEAT-016 | Paper submission and peer review workflow | Full Stack | Backlog |
| FEAT-017 | Company registration and enterprise portal | Full Stack | Backlog |
| FEAT-018 | Sponsored challenge creation (for companies) | Full Stack | Backlog |
| FEAT-019 | Talent search and matching | Full Stack | Backlog |
| API-010 | OpenAPI/Swagger documentation | API Developer | Backlog |
| API-011 | Webhook system (Supabase, Stripe) | API Developer | Backlog |
| BACKEND-010 | Redis/caching layer | Backend | Backlog |
| BACKEND-011 | Database connection monitoring | Backend | Backlog |
| UI-010 | Dark mode completion and polish | UI/UX | Backlog |
| UI-011 | WCAG 2.1 AA accessibility audit | UI/UX | Backlog |
| TEST-010 | E2E test suite (Playwright) | Tester | Backlog |
| TEST-011 | API integration test suite | Tester | Backlog |

---

## P3 — Low (Nice to have / future)

| ID | Story | Agent | Status |
|----|-------|-------|--------|
| FEAT-020 | Two-factor authentication | Backend | Backlog |
| FEAT-021 | Social login completion (GitHub, Google OAuth) | Backend | Backlog |
| FEAT-022 | Internationalization (i18n) | Full Stack | Backlog |
| FEAT-023 | AI-powered learning recommendations | Full Stack | Backlog |
| FEAT-024 | Adaptive learning paths | Full Stack | Backlog |
| FEAT-025 | Mobile app (React Native) | Full Stack | Backlog |
| FEAT-026 | Third-party API for integrations | API Developer | Backlog |
| FEAT-027 | Enterprise analytics dashboard | Full Stack | Backlog |
| FEAT-028 | Bulk enrollment management | Full Stack | Backlog |
| FEAT-029 | Subscription plans (free/pro/enterprise) | Full Stack | Backlog |
| UI-020 | Visual regression testing | Tester | Backlog |
| BACKEND-020 | Automated DB backup verification | Backend | Backlog |

---

## Completed

### Sprint 1 — Foundation & Infrastructure

| ID | Story | Status | Sprint |
|----|-------|--------|--------|
| TEST-001 | Set up test infrastructure (Vitest + Playwright) | ✅ Done | Sprint 1 |
| API-001 | Add Zod validation to all API routes | ✅ Done | Sprint 1 |
| BACKEND-001 | Remove all `any` types | ✅ Done | Sprint 1 |
| FEAT-001 | Individual course detail pages (`/courses/[slug]`) | ✅ Done | Sprint 1 |
| FEAT-002 | Course progress tracking (lesson completion) | ✅ Done | Sprint 1 |
| API-002 | Rate limiting on auth and registration endpoints | ✅ Done | Sprint 1 |
| UI-001 | Loading skeletons for data-fetching pages | ✅ Done | Sprint 1 |
| UI-002 | Mobile responsiveness audit | ✅ Done | Sprint 1 |
| BACKEND-002 | Startup environment validation | ✅ Done | Sprint 1 |

### Sprint 2 — Research Portal

| ID | Story | Status | Sprint |
|----|-------|--------|--------|
| RESEARCH-001 | Archive Sprint 1 backlog + create Sprint 2 backlog | ✅ Done | Sprint 2 |
| RESEARCH-002 | Move research projects to beta-outreach "Research Projects" tab | ✅ Done | Sprint 2 |
| RESEARCH-003 | Rebuild `app/research/page.tsx` as research hub landing | ✅ Done | Sprint 2 |
| RESEARCH-004 | Create `app/research/assessments/page.tsx` (AI knowledge quizzes) | ✅ Done | Sprint 2 |
| RESEARCH-005 | Create `app/research/publications/page.tsx` (paper showcase, submit modal) | ✅ Done | Sprint 2 |
| RESEARCH-006 | Create `app/research/llm-dashboard/page.tsx` (11 LLMs, benchmarks, compare) | ✅ Done | Sprint 2 |
| RESEARCH-007 | Create `app/research/login/page.tsx` (research portal auth) | ✅ Done | Sprint 2 |
| RESEARCH-008 | Create `app/research/signup/page.tsx` (2-step research profile signup) | ✅ Done | Sprint 2 |
| RESEARCH-009 | Create `app/research/dashboard/page.tsx` (protected; publications, assessments, LLMs, profile) | ✅ Done | Sprint 2 |
| BACKLOG-001 | Update product backlog after Sprint 2 completion | ✅ Done | Sprint 2 |
