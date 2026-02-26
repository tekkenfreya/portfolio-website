# LLM Portfolio

A portfolio website showcasing AI automation expertise with a live interactive demo — a smart contact form powered by Claude AI that analyzes intent and generates a personalized response in real time.

## Features

- **AI-Powered Contact Form** — Claude Haiku analyzes the message, classifies urgency and intent, and returns a personalized reply
- **Portfolio & Case Studies** — documented n8n + HubSpot automation projects
- **Certificates Section** — Python, Next.js, ComfyUI, and automation course completions
- **Rate Limiting** — per-IP request limiting with 24-hour windows, no database required

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| AI | Anthropic Claude Haiku (`@anthropic-ai/sdk`) |
| Package Manager | pnpm (monorepo) |

## Project Structure

```
llm-portfolio/
├── apps/
│   └── web/                  # Next.js 15 app
│       ├── src/app/          # Pages and API routes
│       ├── src/components/   # React components
│       └── src/lib/          # Claude client, rate limiter
└── packages/
    └── types/                # Shared TypeScript types
```

## Getting Started

```bash
pnpm install
cp apps/web/.env.example apps/web/.env.local  # add ANTHROPIC_API_KEY
pnpm dev
```

## Environment Variables

```
ANTHROPIC_API_KEY=
```

## Deployment

Deployed as a Docker container on a Hetzner VPS via GitHub Actions CI/CD on push to `main`.
