# Sprint 2 — Platform Growth & User Experience

**Goal**: Email notifications, blog/CMS, dark mode completion, public researcher profiles, search, and SEO — building a fully navigable, content-rich platform on top of the design system established in Sprint 1.1.

**Planned Start**: March 29, 2026 → April 11, 2026 (2-week sprint)

**Branch**: `sprint/2/platform-growth-ux`

---

## Stories

### P0 — Critical

- [ ] **EMAIL-001** Transactional email system (enrollment confirmations, welcome emails)
  - Agent: Backend Developer
  - Priority: P0
  - Estimate: 3 pts
  - AC: Resend / Nodemailer integration. Emails fire on: account creation, course enrollment, challenge registration, internship application. Templates use brand design tokens.

- [ ] **SEO-001** Metadata & Open Graph for all public pages
  - Agent: Full Stack Developer
  - Priority: P0
  - Estimate: 2 pts
  - AC: Every page exports a `metadata` object with `title`, `description`, `openGraph` (image, title, description). Homepage, About, Research, Courses, Team pages covered first.

- [ ] **PERF-001** Lighthouse performance audit + critical path fixes
  - Agent: Full Stack Developer
  - Priority: P0
  - Estimate: 3 pts
  - AC: Lighthouse score ≥ 85 on Performance, ≥ 90 on Accessibility. Fix: missing `alt` tags, image `priority` props, CLS issues in header, unused CSS.

### P1 — High

- [ ] **BLOG-001** Blog / content system — listing page (`/blog`)
  - Agent: Full Stack Developer
  - Priority: P1
  - Estimate: 5 pts
  - AC: Static MDX-powered blog. Index page with card grid (title, date, author, category, reading time). Categories: Research, Company News, AI Tutorials, Team Spotlights.

- [ ] **BLOG-002** Blog post detail page (`/blog/[slug]`)
  - Agent: Full Stack Developer
  - Priority: P1
  - Estimate: 3 pts
  - AC: MDX render with Playfair headings, Inter body, syntax highlighting (Shiki). Author block, share links, related posts footer. Reading progress indicator.

- [ ] **PROFILE-001** Public researcher profile pages (`/team/[slug]`)
  - Agent: Full Stack Developer
  - Priority: P1
  - Estimate: 5 pts
  - AC: Dynamic profile — avatar, bio, research interests, published papers (from research/publications), assessment badges, social links (GitHub, LinkedIn, Google Scholar). Pulls from Supabase `profiles` table.

- [ ] **SEARCH-001** Global search (Cmd+K / ⌘K) command palette
  - Agent: Full Stack Developer
  - Priority: P1
  - Estimate: 5 pts
  - AC: cmdk-powered command palette. Searches: courses, challenges, publications, team members, blog posts. Keyboard navigation. Opens with `Cmd+K` or the search icon in header. Results grouped by type.

- [ ] **DARK-001** Dark mode — complete and polish all pages
  - Agent: UI/UX Designer
  - Priority: P1
  - Estimate: 3 pts
  - AC: `prefers-color-scheme` + manual toggle via ThemeProvider. All pages (`about`, `research`, `team`, `blog`, `courses`) consistent in dark mode. No white flashes on load.

### P2 — Medium

- [ ] **CERT-001** Course completion certificates (PDF generation)
  - Agent: Full Stack Developer + Backend Developer
  - Priority: P2
  - Estimate: 5 pts
  - AC: On 100% lesson completion → generate PDF certificate with `@react-pdf/renderer`. Shows student name, course name, date, OptimumAI logo. Downloadable from dashboard.

- [ ] **FEAT-006** Payment integration — Stripe for premium courses
  - Agent: Full Stack Developer
  - Priority: P2
  - Estimate: 8 pts
  - AC: Stripe Checkout flow for courses marked `premium: true`. Webhook handler updates `enrollments.paid_at` in DB. Refund policy shown. Test mode with `STRIPE_TEST_KEY`.

- [ ] **A11Y-001** WCAG 2.1 AA accessibility audit
  - Agent: UI/UX Designer + Full Stack Developer
  - Priority: P2
  - Estimate: 3 pts
  - AC: axe-core scan zero critical/serious violations. Keyboard-navigable header, modals, and forms. Focus rings visible. Skip-to-content link added.

- [ ] **COMPANY-001** Company page — dedicated `/company` route
  - Agent: Full Stack Developer
  - Priority: P2
  - Estimate: 3 pts
  - AC: Standalone `/company` page combining: mission statement, philosophy pillars, OptimumLLM timeline, team highlight, and CTA for Beta. Company dropdown in header links here.

- [ ] **MONITORING-001** Error tracking — Sentry integration
  - Agent: Backend Developer
  - Priority: P2
  - Estimate: 2 pts
  - AC: `@sentry/nextjs` configured. Source maps uploaded. Error boundary wraps main client areas. Alerts set up for P0 errors.

---

## Capacity

| Role | Availability |
|------|-------------|
| Full Stack Developer | 10 story points |
| Backend Developer | 6 story points |
| UI/UX Designer | 6 story points |

**Total planned**: 48 pts (to be prioritised down to ~22 pts at sprint planning)

**Recommended scope for Sprint 2**: EMAIL-001, SEO-001, PERF-001, BLOG-001, BLOG-002, PROFILE-001, DARK-001 *(22 pts)*

---

## Dependencies

| Story | Depends on |
|-------|-----------|
| BLOG-002 | BLOG-001 |
| PROFILE-001 | Supabase `profiles` + `publications` tables in sync |
| CERT-001 | FEAT-002 (progress tracking — ✅ Sprint 1) |
| FEAT-006 | Email notifications (EMAIL-001) |

---

## Definition of Done

- [ ] Feature passes all unit tests (Vitest)
- [ ] No TypeScript errors (`pnpm build` clean)
- [ ] Lighthouse ≥ 85 (Performance) on changed pages
- [ ] PR reviewed and approved
- [ ] `current-sprint.md` story marked `[x]`

---

## Notes

- Blog will be MDX-first (static) → moved to DB/CMS only if editorial volume demands it
- Dark mode toggle state persists in `localStorage` via next-themes
- Search index built client-side with Fuse.js for speed; upgrade to Meilisearch if corpus >5k items
- Sentry DSN to be stored in Azure Key Vault, not `.env.local`
