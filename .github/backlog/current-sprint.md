# Current Sprint — Sprint 1.1

**Goal**: Premium brand redesign — design system overhaul, Company dropdown nav, About page story, footer cleanup

**Date**: March 21, 2026 → March 28, 2026

**Branch**: `sprint/1.1/premium-redesign-brand-nav`

---

## Stories

### P0 — Critical

- [x] **BRAND-001** Overhaul global color & typography design system
  - Agent: UI/UX Designer
  - Status: done
  - AC: New tokens — `--ink: #09090E`, `--paper: #FDFCF7`, `--opt-red: #C0392B`, `--gold: #C9A026`; Space Grotesk added as 4th font; all `.opt-*` CSS classes updated

- [x] **BRAND-002** Rewrite homepage hero with consciousness / agency mission copy
  - Agent: UI/UX Designer
  - Status: done
  - AC: Hero headline "The AI that mirrors human consciousness — to excel it." with 4-column modalities grid

- [x] **BRAND-003** Add Company section to homepage (mission, philosophy, LLM timeline)
  - Agent: Full Stack Developer
  - Status: done
  - AC: Three sub-sections — Mission block (two-column), Philosophy grid (3 cards), OptimumLLM 6-month timeline (Mar–Sep 2026)

- [x] **NAV-001** Add Company dropdown to header navigation after About
  - Agent: Full Stack Developer
  - Status: done
  - AC: Animated dropdown with 5 sub-links (About Us, Mission & Vision, Team, Careers, Contact); outside-click close; mobile accordion; `/about#mission` deep-link works

### P1 — High

- [x] **NAV-002** Remove Bootcamps and Community from footer — replace with Beta Outreach
  - Agent: Full Stack Developer
  - Status: done
  - AC: Footer Programs column renamed Products; Bootcamps removed; Beta Outreach + LLM Dashboard added; Community removed entirely

- [x] **NAV-003** Add Mission & Vision to footer Company column
  - Agent: Full Stack Developer
  - Status: done
  - AC: Footer Company column now includes `Mission & Vision → /about#mission`

- [x] **ABOUT-001** Rewrite About page hero, pillars, and mission/vision section
  - Agent: UI/UX + Copywriter
  - Status: done
  - AC: New hero "We didn't start with a product. We started with a question."; 4 pillars updated to consciousness/agency framing; `id="mission"` anchor added for deep-link

- [x] **ABOUT-002** Replace Our Story section with full brand narrative
  - Agent: Copywriter
  - Status: done
  - AC: 5 labelled sections — founding observation, Agency Score origin, what we build now (3 pillars), philosophy, closing argument; tagline "Making Humans Better Humans."

### P2 — Medium

- [x] **ABOUT-003** Update About page values & team card border colours to gold (remove old green)
  - Agent: UI/UX Designer
  - Status: done
  - AC: All `rgba(16,185,129,0.18)` green borders replaced with `rgba(201,160,38,0.18)` gold

- [x] **BRAND-004** Update footer copyright with brand tagline
  - Agent: Copywriter
  - Status: done
  - AC: Footer © line ends with *"Making Humans Better Humans."*

---

## Velocity
- Planned: 10 stories
- Completed: 10
- Carried over: 0

## Files Changed
| File | Change |
|------|--------|
| `app/layout.tsx` | Added Space Grotesk font |
| `app/globals.css` | Full design token overhaul + dropdown CSS classes |
| `app/page.tsx` | Hero, modalities grid, Company section, stats bar, CTA |
| `app/about/page.tsx` | Full page rewrite — hero, pillars, mission anchor, story, values |
| `components/header.tsx` | Company dropdown nav (desktop + mobile) |
| `components/footer.tsx` | Footer column cleanup — Bootcamps removed, Mission & Vision added |
| `app/beta-outreach/page.tsx` | Research Projects tab added |
| `app/globals.css` | Dropdown animation classes |

## Notes
- Design system is now production-stable with 4 fonts, 6 core tokens, and 60+ `.opt-*` utility classes
- All builds: `pnpm build` exit code 0 ✅
- No TypeScript errors on any changed files ✅
- `/about#mission` scroll anchor works with `scrollMarginTop: 88px` to clear fixed header

---

## Previous Sprint Archive

> Sprint 2 (Research Portal) completed March 20, 2026. See `.github/backlog/sprint-2.md` for full record.
