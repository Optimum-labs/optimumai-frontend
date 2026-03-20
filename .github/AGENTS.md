# OptimumAI — Agent Team

## Quick Reference

This project uses autonomous AI agents for iterative development. Each agent owns a
specific domain and contains self-updating instructions.

### How to Use

1. **Start a session**: Tag an agent by name (e.g., `@ScrumMaster plan the next sprint`)
2. **Implement features**: Use the appropriate specialist agent
3. **Multi-step work**: Ask the `@ScrumMaster` to coordinate across agents
4. **Research**: Ask `@DevOpsResearcher` for latest best practices or tool evaluation

### Agent Roster

| Agent | Specialty | Key Files |
|-------|-----------|-----------||
| `@Orchestrator` | Sprint lifecycle, agent coordination, branching | Backlog, sprints, git |
| `@Architect` | System design, ADRs, tech evaluation, scalability | SKILL.md, decisions/ |
| `@ScrumMaster` | Sprint planning, backlog, coordination | Backlog, sprint files |
| `@ProductOwner` | Product strategy, user stories, roadmap | Roadmap, personas |
| `@UIUXDesigner` | Design system, pages, accessibility | Components, CSS, pages |
| `@FullStackDeveloper` | End-to-end feature delivery | Everything |
| `@APIDeveloper` | API routes, validation, security | `app/api/`, `lib/` |
| `@BackendDeveloper` | Database, Prisma, Supabase, infra | `prisma/`, `lib/`, configs |
| `@Tester` | Tests, QA, accessibility audits | `__tests__/`, test configs |
| `@DevOpsResearcher` | CI/CD, deps, perf, research | Configs, pipelines |

### Architecture

> The **Orchestrator** sits at the top, coordinating sprints and delegating to all agents.
> The **Architect** provides cross-cutting technical guidance to every agent.

```
                    ┌─────────────────┐
                    │  ORCHESTRATOR   │
                    │ (sprint lifecycle│
                    │  & coordination) │
                    └────────┬────────┘
                             │ delegates
              ┌──────────────┼──────────────┐
              │              │              │
┌─────────────▼┐  ┌──────────▼──┐  ┌───────▼──────────┐
│ Product Owner│  │ Scrum Master │  │    Architect     │
│ (what to     │  │ (how to      │  │ (system design,  │
│  build)      │  │  execute)    │  │  ADRs, tech eval)│
└──────────────┘  └──────┬──────┘  └──────┬───────────┘
                         │ coordinates     │ guides
              ┌──────────┼──────────┐      │
              │          │          │      │
    ┌─────────▼──┐ ┌─────▼────┐ ┌──▼──────────┐
    │  UI/UX     │ │ Full     │ │  Backend    │
    │  Designer  │ │ Stack Dev│ │  Developer  │
    └────────────┘ └────┬─────┘ └─────────────┘
                        │
               ┌────────▼────────┐
               │  API Developer  │
               └────────┬────────┘
                        │
          ┌─────────────┼──────────────┐
          │                            │
 ┌────────▼───────┐          ┌─────────▼─────┐
 │    Tester      │          │    DevOps     │
 │                │          │    Researcher │
 └────────────────┘          └───────────────┘
```

### File Structure

```
.github/
├── AGENTS.md                          # This file
├── copilot-instructions.md            # Global dev instructions
├── skills/
│   └── SKILL.md                       # Full codebase knowledge base
├── agents/
│   ├── scrum-master.agent.md          # Sprint planning & coordination
│   ├── product-owner.agent.md         # Product strategy & roadmap
│   ├── ui-ux-designer.agent.md        # Design system & UI
│   ├── full-stack-developer.agent.md  # End-to-end features
│   ├── api-developer.agent.md         # API routes & validation
│   ├── backend-developer.agent.md     # Database & infrastructure
│   ├── tester.agent.md                # Testing & QA
│   ├── devops-researcher.agent.md     # CI/CD & research
│   ├── orchestrator.agent.md          # Sprint lifecycle & coordination
│   └── architect.agent.md             # System design & ADRs
├── backlog/
│   ├── current-sprint.md              # Active sprint
│   └── product-backlog.md             # Full product backlog
├── sprints/                           # Completed sprint records
└── decisions/                         # Architecture Decision Records
```
