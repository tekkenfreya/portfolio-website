# LLM Portfolio — Development Guidelines

> **Purpose:** Standard development rules and best practices
> **Last Updated:** 2026-02-19

---

## Project Overview

Portfolio website showcasing LLM/automation expertise with **live interactive demos** that clients can try. Web-first, built as a pnpm monorepo.

---

## Critical Rules

### 1. No AI Attribution — Absolute
- Never mention AI, Claude, or any AI assistant in commit messages, code comments, or documentation
- No `Co-Authored-By` lines referencing any AI tool in any commit
- No AI tool names in PR titles, PR descriptions, branch names, or code comments
- Git history must read as human-authored at every line — no exceptions

### 2. Always Read Docs First
Before making any change, check in order:
- `docs/PENDING_TASKS.md` — current task status and priorities
- `CLAUDE.md` — this file, for rules and patterns

### 3. Zero Hallucination — Variables, Names, and Imports
- **Never** use a variable, type, function, or component name that has not been confirmed to exist in the codebase by reading the actual file
- **Never** call an API route that has not been verified to have a `route.ts` file
- **Never** import from a path without confirming the file exists
- **Never** reference a Tailwind class that is not defined in `globals.css` or a standard utility
- When in doubt: read the file first, then write the code

### 4. Plan Before Executing
- State the full implementation plan before writing any code or modifying any file
- Get explicit approval before proceeding
- If scope changes mid-implementation, stop and re-plan

### 5. Production-Grade Clean Code
- No hacks, no shortcuts, no commented-out code, no dead code
- No bloating — do not add dependencies, abstractions, or utilities unless directly required
- No over-engineering — solve only what is asked, nothing more
- No `any` types — use exact types from `@gowater-portfolio/types` or define a precise local interface
- No console.log left in production code — only `console.error` in API routes for server-side error tracking
- Every function does one thing

### 6. Check Codebase Before Writing
- Read the relevant file before editing it
- Check if a component already exists before creating a new one
- Check if a type already exists in `packages/types/src/index.ts` before defining a new one

### 7. AI Temperature — Precision First
- All `generateJsonWithClaude()` calls: `temperature: 0` (structured, deterministic output)
- Creative content calls (`generateWithClaude` for blog posts, captions): `temperature: 0.7` maximum
- Never exceed `temperature: 0.7` anywhere in the codebase

---

## Project Structure

```
llm-portfolio/
├── apps/
│   └── web/                    # Next.js 15 web app
│       ├── src/
│       │   ├── app/            # App Router pages + API routes
│       │   ├── components/     # React components
│       │   │   ├── demos/      # Demo-specific components
│       │   │   └── ui/         # Shared UI components
│       │   └── lib/            # Services, utilities
│       └── public/             # Static assets
├── packages/
│   └── types/                  # Shared TypeScript types
├── docs/                       # Documentation
└── CLAUDE.md                   # This file
```

---

## Naming Conventions

| Context | Convention | Example |
|---------|------------|---------|
| TypeScript/JS variables | camelCase | `demoType`, `aiResponse` |
| React components | PascalCase | `ContentGenerator`, `LeadQualifier` |
| CSS classes | Tailwind utilities | `bg-bg-primary`, `text-accent` |
| API routes | kebab-case | `/api/demos/content-generator` |
| File names (components) | PascalCase | `ContentGenerator.tsx` |
| File names (utilities) | camelCase | `rateLimit.ts` |
| Database fields | snake_case | `demo_type`, `created_at` |

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4
- **AI:** Anthropic Claude Haiku (via `@anthropic-ai/sdk`)
- **Database:** Supabase (PostgreSQL)
- **Package Manager:** pnpm with workspaces

---

## Color Palette (Dark Theme)

All colors are defined as CSS variables in `apps/web/src/app/globals.css` under `@theme`. Use only these tokens via Tailwind utilities — never hardcode hex values in components.

```
bg-bg-primary      → #0a0a0a
bg-bg-secondary    → #111111
bg-bg-card         → #1a1a1a
bg-bg-card-hover   → #222222
border-border      → #2a2a2a
border-border-hover→ #3a3a3a
text-accent        → #6366f1
text-accent-hover  → #818cf8
text-success       → #22c55e
text-warning       → #f59e0b
text-danger        → #ef4444
text-text-primary  → #f5f5f5
text-text-secondary→ #a1a1aa
text-text-muted    → #71717a
```

---

## API Route Pattern

Every demo API route lives at `apps/web/src/app/api/demos/[demo-name]/route.ts` and exports only `POST`.

**Execution order (no deviation):**

```typescript
// 1. Extract IP and enforce rate limit
const ip = getClientIp(request);
const rateLimit = checkRateLimit(ip, 'demo-name');
if (!rateLimit.allowed) return rateLimitResponse(rateLimit.resetAt);

// 2. Parse and validate body — return 400 on invalid input
const body = await request.json();
if (!body.field) {
  return NextResponse.json<ApiResponse<never>>(
    { success: false, error: 'field is required' },
    { status: 400 }
  );
}

// 3. Call Claude
const result = await generateJsonWithClaude<OutputType>(prompt, {
  systemPrompt: '...',
  maxTokens: 512,
  temperature: 0, // structured output — always 0
});

// 4. Persist — fire and forget, never block the response
void saveDemoResult('demo-name', inputData, result as Record<string, unknown>, hashIp(ip));
void trackDemoUsage('demo-name');

// 5. Return success
return NextResponse.json<ApiResponse<OutputType>>({ success: true, data: result });

// Wrap steps 2–5 in try/catch:
// catch (error) {
//   console.error('[demo-name] error:', error);
//   return NextResponse.json<ApiResponse<never>>(
//     { success: false, error: 'Something went wrong. Please try again.' },
//     { status: 500 }
//   );
// }
```

**Imports every API route uses** (verified paths):
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { generateJsonWithClaude } from '@/lib/claude';
import { saveDemoResult, trackDemoUsage } from '@/lib/supabase';
import { getClientIp, checkRateLimit, rateLimitResponse, hashIp } from '@/lib/rateLimit';
import type { ApiResponse } from '@gowater-portfolio/types';
```

---

## Component Patterns

### Server vs Client
- All components are **Server Components by default**
- Add `'use client'` only when the component uses `useState`, `useEffect`, event handlers, or browser APIs
- Never add `'use client'` to a component that does not need it

### Props
- Always define a local `interface Props` at the top of the file — never inline, never `any`
- Example:
```typescript
interface Props {
  topic: string;
  onSubmit: (value: string) => void;
}
```

### File placement
- `components/demos/` — components specific to a single demo (e.g. `ContentGeneratorForm.tsx`)
- `components/ui/` — shared UI used across multiple pages (e.g. `Navbar.tsx`, `Footer.tsx`)
- Never put a demo-specific component in `components/ui/`

### No prop drilling
- Do not pass props more than 2 levels deep
- Co-locate state with the component that owns it

### Component library
- **Custom Tailwind v4 only** — no shadcn, no Radix UI, no headless UI, no external component libraries
- All styling uses utility classes from `globals.css` theme tokens

---

## Rate Limiting

- **Limit:** 10 requests per IP per demo per 24-hour window
- **Implementation:** In-memory `Map` in `apps/web/src/lib/rateLimit.ts`
- **Key format:** `${demoType}:${ip}`
- **On limit exceeded:** return `rateLimitResponse(resetAt)` — HTTP 429 with `Retry-After` header
- Cleanup interval: every 5 minutes (already implemented in `rateLimit.ts`)

---

## Error Handling

- All API routes wrap their logic in `try/catch`
- **Never** expose raw error messages, stack traces, or internal details to the client
- Server-side: `console.error('[route-name] error:', error)` — always include the route name prefix
- Client-side: display a static user-friendly message, never the raw API error string
- 400 — validation failure (missing or malformed input)
- 429 — rate limit exceeded (use `rateLimitResponse()`)
- 500 — unexpected server error

---

## Caching

- **No caching for demo results** — every request is user-specific and must be fresh
- Next.js default static caching applies to all non-dynamic pages
- No Redis, no KV store, no custom cache layer in MVP phase

---

## Testing

- No automated test suite in MVP phase
- TypeScript strict mode (`strict: true` in `tsconfig.json`) is the primary compile-time safety net
- Manual end-to-end testing required for every demo flow before marking a task complete:
  - Valid input → correct AI output displayed
  - Rate limit hit → correct 429 message shown
  - Empty/invalid input → correct validation error shown

---

## Git Workflow

### Commit Message Format
```
feat(web): add content generator demo
fix(api): handle rate limit edge case
refactor(types): reorganize demo types
docs(claude): finalize development rules
```

### Commit Rules — Non-Negotiable
- No mention of AI, Claude, LLM tools, or automation assistants in any commit message
- No `Co-Authored-By` lines of any kind
- No `Generated by`, `Assisted by`, or similar attribution in commit body
- Commits must read as written by a human developer
- Scope must match the actual package changed: `web`, `api`, `types`, `docs`

---

## Deployment

- Build: `next build` with `output: 'standalone'` (configured in `next.config.ts`)
- Runtime: Docker container on Hetzner VPS
- CI/CD: GitHub Actions triggers on push to `main`
- Environment variables are injected at runtime via Docker — never baked into the image

---

## Environment Variables

### Required (`apps/web/.env.local`)
```
ANTHROPIC_API_KEY=
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_KEY=
```

Never commit `.env.local`. It is listed in `.gitignore`.

---

*Rules are finalized. Update this file only when a new convention is established and approved.*
