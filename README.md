# Hantverkarsystemet

Marketing site for Hantverkarsystemet — Next.js 16 (App Router), TypeScript,
Tailwind CSS v4. See `PLAN.md` for the full build plan and phase status.

## Develop

```bash
npm install
cp .env.example .env.local   # fill in real values, see below
npm run dev
```

## Environment variables

See `.env.example`. Required for a fully working local build:

- `GHL_LEAD_WEBHOOK_URL` — server-side only, receives lead form submissions.
- `NEXT_PUBLIC_DEMO_PHONE_NUMBER` — public "ring och se det hända" demo
  number. If unset, the live-demo section shows the animated visualizer
  only (no dead phone number is ever shown).
- `NEXT_PUBLIC_CONTACT_PHONE_NUMBER` — real sales/contact number. If unset,
  phone links are hidden rather than showing a placeholder number.
- `NEXT_PUBLIC_SITE_URL` — canonical origin, used by metadata/sitemap/JSON-LD.

## Test, lint, build

```bash
npm run test    # vitest — lib/calculator.ts
npm run lint    # eslint
npm run build   # next build, output: standalone
```

## Deploy (Hostinger managed Node.js)

`next.config.ts` sets `output: "standalone"`. After `npm run build`:

1. Upload `.next/standalone/`, `.next/static/` (into
   `.next/standalone/.next/static/`), and `public/` (into
   `.next/standalone/public/`).
2. Set the env vars above in the Hostinger panel.
3. Start with `node server.js` (listens on `PORT`, default 3000).

## Status

Phase 1 (core build) complete per `PLAN.md`. Outstanding before launch:
GHL demo number + webhook provisioning, domain registration, real legal
details for `/integritetspolicy` and `/villkor`, and owner sign-off on the
draft Swedish copy in `content/copy.sv.ts` and `content/faq.sv.ts`.
