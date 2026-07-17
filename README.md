# Hantverkarsystemet

Marketing site for Hantverkarsystemet — Next.js 15, App Router, TypeScript,
Tailwind CSS v4. See `PLAN.md` for the full product/architecture spec and
phase plan.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in real values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

See `.env.example` for the full list. `GHL_LEAD_WEBHOOK_URL` is required for
the lead form to work; without a demo phone number the live-demo section
falls back to the animated visualizer only.

## Build & deploy

The app builds as a standalone Node server (`output: 'standalone'` in
`next.config.ts`) for Hostinger managed Node.js hosting:

```bash
npm run build
node .next/standalone/server.js
```

Set all env vars from `.env.example` in the hosting panel before starting
the server in production.

## Status

Phase 1 (core build) scaffolded per `PLAN.md`. Several content areas are
marked `TODO(ägare)` pending owner input from Phase 0 (domain, GHL demo
number/webhook, legal company details, verified copy). Do not launch before
those are resolved and the copy deck is approved.
