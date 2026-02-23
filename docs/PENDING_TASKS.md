# Pending Tasks — LLM Portfolio Webapp

> **Status:** Phase 2 complete — demos deprioritised, Portfolio expanded
> **Created:** 2026-02-19
> **Last Updated:** 2026-02-20

---

## Phase 1: Foundation
- [x] Initialize monorepo structure (pnpm workspace, package.json, tsconfig)
- [x] Set up Next.js 15 web app with Tailwind CSS
- [x] Create shared types package (`@gowater-portfolio/types`)
- [x] Build landing page (hero, about, tech stack badges, CTA)
- [x] Set up Claude API integration service (reusable, Haiku model)
- [ ] Set up Supabase integration and schema — SQL ready in `supabase/schema.sql`, apply in Supabase dashboard

## Phase 2: First 2 Demos
- [x] Build Demo 1: AI Content Generator — topic input → Claude generates content → draft display → approve/edit/reject flow
- [x] Build Demo 5: Smart Contact Form — contact form → AI analyzes message → auto-generates personalized response → sends confirmation

## Phase 2.5: Portfolio Restructure (2026-02-20)
- [x] Remove DemosPreview section from home page
- [x] Remove "AI Demos" nav link — navbar is now 4 links (About, Skills, Portfolio, Contact)
- [x] Update Hero CTA: "Try Live Demos" → "See My Work" (links to #portfolio)
- [x] Update CTA section: secondary button "Try Demos First" → "View Portfolio"; subtext updated
- [x] Expand Portfolio to 6 tabs: Full Stack, AI Tools, AI Automation, Python / Desktop, Game Dev, Motion Graphics
- [x] Add Full Stack sub-filters: All / Web App / Mobile App with subCategory filtering
- [x] Add AI Tools tab — demos repurposed as portfolio cards with Live/In Progress status badges
- [x] Split AI Automation tab (remove Python tools) and add new Python / Desktop tab
- [x] Add 5th service card "Python & Desktop Apps" to About section

## Phase 3: Remaining Demos (deprioritised — now tracked as AI Tools portfolio cards)
- [ ] Build Document Analyser — upload document → Claude extracts key info, summary, action items
- [ ] Build Meeting Notes → Action Items — paste transcript → assignees, deadlines, priorities
- [ ] Build AI Lead Qualifier Chatbot — chat widget → qualifying questions → lead classification report

## Phase 4: Polish
- [ ] Build Case Studies page (GoWater story, Loom video embeds, project showcases)
- [ ] Add rate limiting on demo endpoints (per IP, daily limits)
- [ ] SEO: meta tags, OG images, structured data
- [ ] Analytics tracking (demo usage counts)
- [ ] Docker setup (docker-compose.yml: web + n8n + ollama)
- [ ] CI/CD: GitHub Actions auto-deploy on push to main
- [x] CLAUDE.md — finalize project rules

---

## Tech Stack
| Layer | Tech |
|-------|------|
| Monorepo | pnpm workspaces |
| Web | Next.js 15 + TypeScript + Tailwind CSS |
| AI | Claude Haiku (prod) + Ollama (fallback) |
| Database | Supabase (PostgreSQL) |
| Automation | n8n (self-hosted, Hetzner) |
| Hosting | Hetzner VPS + Docker |
| CI/CD | GitHub Actions |

---

## Project Structure
```
llm-portfolio/
├── apps/
│   └── web/                    # Next.js portfolio + live demos
├── packages/
│   └── types/                  # Shared TypeScript types
├── docs/
│   └── PENDING_TASKS.md        # This file
├── CLAUDE.md                   # Development rules
├── pnpm-workspace.yaml
└── package.json
```

---

## Notes
- Web first, mobile later
- Demos are now presented as AI Tools portfolio cards rather than a standalone section
- Remaining demos (Document Analyser, Meeting Notes, Lead Qualifier) are in-progress cards in the AI Tools tab — build when prioritised
- Rate limiting prevents API cost abuse
- Contact form doubles as a live AI Tools demo
- Lighthouse target: 90+ performance
