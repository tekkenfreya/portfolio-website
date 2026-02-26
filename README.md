# LLM Portfolio

A portfolio website showcasing AI automation expertise. The site includes a live AI-powered contact form that uses Claude Haiku to analyze each message, classify urgency and intent, and return a personalized response.

## Features

- **AI Contact Form** — Claude Haiku analyzes the submission and returns intent classification, urgency level, and a personalized reply
- **Portfolio & Case Studies** — n8n + HubSpot automation projects with documented outcomes
- **Certificates** — Python, Next.js, ComfyUI, and automation course completions
- **Skills & About** — technology stack, background, and education
- **Rate Limiting** — per-IP in-memory limiting (5 requests / 24h on the contact route)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| AI | Anthropic Claude Haiku (`@anthropic-ai/sdk`) |
| Package manager | pnpm (monorepo) |

## Project Structure

```
llm-portfolio/
├── apps/
│   └── web/
│       ├── src/
│       │   ├── app/
│       │   │   ├── api/contact/    # Claude-powered contact form API
│       │   │   ├── contact/        # Contact page
│       │   │   └── page.tsx        # Home page
│       │   ├── components/
│       │   │   ├── demos/          # ContactForm component
│       │   │   └── ui/             # Navbar, Footer
│       │   └── lib/
│       │       ├── claude.ts       # Anthropic SDK client
│       │       └── rateLimit.ts    # In-memory rate limiter
└── packages/
    └── types/                      # Shared TypeScript types
```

## Getting Started

```bash
pnpm install
```

Create `apps/web/.env.local`:

```
ANTHROPIC_API_KEY=your_key_here
```

```bash
pnpm dev
```

## Deployment

Docker container on a Hetzner VPS. GitHub Actions deploys on push to `main`.
