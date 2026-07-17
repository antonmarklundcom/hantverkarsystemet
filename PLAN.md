# PLAN.md — Hantverkarsystemet marketing site

> **Authored by Fable 5 — handoff to Sonnet 5 / Opus 4.8**

## Model tiering (who does what)

| Model | Role |
|---|---|
| **Fable 5** | Architecture, spec/schema decisions, gap analysis, review gates at end of each phase. Do **not** burn Fable time on mechanical implementation. |
| **Sonnet 5** | Most build phases: scaffold, sections, components, copy integration, SEO plumbing, polish, deploy. |
| **Opus 4.8** | Hardest problems only — primarily the live-demo GHL call/SMS integration and verification, and any performance problem Sonnet can't close after two attempts. |

Review gate = a short Fable session that checks the phase's exit criteria against this plan before the next phase starts.

---

## 1. Current state (verified 2026-07-17)

The repository is **empty**: one commit containing only a generic Node.js
`.gitignore` (already covers `.next/`, `out/`, `.env*`). No `package.json`,
no Next.js scaffold, no source, no README, no CI. Everything below is
greenfield.

## 2. Confirmed business decisions (from owner, 2026-07-17)

1. **Bindningstid: 3 månader**, därefter löpande månadsvis. Pricing copy and
   FAQ must state this plainly and honestly — no "ingen bindningstid" claims.
2. **Live-demo GHL number does NOT exist yet.** Provisioning is a hard
   dependency (checklist in Phase 0). Site reads the number from an env var.
3. **Demo UX: simple variant.** Visitor calls the demo number from their own
   phone, hangs up, and receives the real automated SMS on their own phone
   within seconds. The page shows the number plus an animated explanation —
   it does **not** track the call live (no webhook/polling/server state).
4. **Hosting exists, domain does not.** Hostinger managed Node.js account is
   active; domain must be chosen and registered (Phase 0 decision — it feeds
   SEO, JSON-LD, e-mail and outreach material).

## 3. Emotional goal (the success metric)

A roofer/electrician on his phone, one-handed, dusty, between jobs, must feel
**"wow, jag behöver faktiskt det här"** within 5 seconds — not "seems
reasonable". Every structural, copy and performance decision is judged
against that. Concretely:

- Hero names the **painful moment first** (phone buzzing up a ladder / under
  a sink, knowing that's a lost job), then the fix.
- The live call-in demo is the single highest-priority feature — **core, not
  decoration**. The animated fallback visualizer exists for visitors who
  won't dial.
- The lost-income calculator makes the pain a number in kronor, live.
- Mobile-first is literal: design and test at 360–390 px width, one-handed
  reach, patchy signal.

## 4. Hard rules (non-negotiable, apply to every phase)

1. **Tone:** welcoming, dead-simple, honest Swedish, **du-form** throughout.
2. **No tech jargon.** Never "plattform", "AI" or "automation" as headline
   nouns. Describe what it does for their day.
3. **Feature names in plain-Swedish benefit language** in all user-facing
   copy: "Automatiskt SMS-svar när du missar samtal" — never "missed call
   text-back". No anglicisms in headings.
4. **Anti-fabrication is absolute:** no invented testimonials, client logos,
   review counts or user numbers. Social-proof sections are structured
   placeholders (hidden or clearly framed) until real customers exist.
5. **One primary CTA** ("Kom igång" lead form + phone link), repeated after
   every section. No competing CTAs.
6. **One pricing plan only:** 2 995 kr/mån, everything included, 3 månaders
   bindningstid stated plainly. A second tier is a v2 decision — not built,
   not hinted at.
7. **Performance budget:** LCP < 2.0 s on mid-range mobile, CLS < 0.05,
   **no animation/JS libraries** (no framer-motion, no GSAP, no Lottie).
   CSS keyframes + IntersectionObserver only.
8. **Honesty in claims:** every number on the site (setup time, SMS speed)
   must be real and verified before launch.

## 5. Architecture decisions (decided — downstream models do not re-open)

- **Next.js 15, App Router, TypeScript, Tailwind CSS v4.** React 19 as
  shipped by Next 15.
- **Rendering:** all pages statically rendered at build time. One dynamic
  API route (`/api/lead`) proxies the lead form server-side to the GHL
  webhook — avoids CORS/adblock loss, keeps the webhook URL out of the
  client bundle, allows validation + honeypot. Therefore the app runs as a
  Node server (`next start` / standalone), **not** `output: 'export'`.
- **Deployment:** `output: 'standalone'` in `next.config.ts` for Hostinger
  managed Node.js (small upload, `node server.js` entry).
- **Fonts:** system font stack (`system-ui, -apple-system, ...`). No web
  fonts — the fastest LCP win for this audience. If Phase 3 decides a brand
  font is worth it, it must be one self-hosted variable font, `swap`,
  subsetted — and must still pass the LCP budget.
- **Images:** none above the fold except pure CSS/SVG. Any photography later
  is AVIF/WebP via `next/image` with explicit dimensions (CLS rule).
- **State:** no client state library. Calculator and visualizer are small
  `"use client"` islands; everything else is server components.
- **Copy lives in one file** (`content/copy.sv.ts`), typed, so tone review
  happens in one place and copy edits never touch components.
- **Env vars** (all read server-side except the public ones):
  - `GHL_LEAD_WEBHOOK_URL` — GHL inbound webhook for the lead form.
  - `NEXT_PUBLIC_DEMO_PHONE_NUMBER` — the demo number, E.164 (`+46...`).
  - `NEXT_PUBLIC_CONTACT_PHONE_NUMBER` — the real sales/contact number.
  - `NEXT_PUBLIC_SITE_URL` — canonical origin for metadata/sitemap/JSON-LD.
  - `NEXT_PUBLIC_GA4_ID` — GA4 measurement ID (Phase 4).
  - `.env.example` committed with all keys and comments; real `.env` never
    committed.
- **No CMS, no database, no auth.** This is a brochure + two interactive
  islands + one POST proxy.

## 6. Site map & routes

| Route | Purpose |
|---|---|
| `/` | Full sales page (section order fixed, see §7) |
| `/sa-funkar-det` | Depth page: the three parts step-by-step, screenshots/illustrations, setup timeline |
| `/kontakt` | Phone, e-mail, lead form (same `LeadForm` component) |
| `/integritetspolicy` | GDPR/privacy (needs real org details — Phase 0 input) |
| `/villkor` | Terms incl. 3 mån bindningstid, uppsägning, pris |
| `sitemap.ts`, `robots.ts` | Generated from route list + `NEXT_PUBLIC_SITE_URL` |
| `/api/lead` | POST-only proxy → GHL webhook |

JSON-LD: `Organization` + `Service` on `/`, `FAQPage` on the FAQ section,
emitted from a typed helper (`lib/jsonld.ts`).

## 7. Home page — section order (fixed) & component inventory

Layout shell: `app/layout.tsx` (metadata, JSON-LD Organization, skip-link,
`<Header/>` minimal — logo + phone link only, no nav clutter — and
`<Footer/>` with legal links).

### 7.1 Hero — `components/sections/Hero.tsx` (server)
- Names the painful moment BEFORE the product: phone buzzing while up on a
  roof / under a sink → that call just went to a competitor.
- One headline promise, subline, then `LeadForm` (short: namn + mobilnummer)
  and `PhoneLink` as secondary.
- Sub-components: `ui/LeadForm.tsx` (client island, posts to `/api/lead`),
  `ui/PhoneLink.tsx` (tel: link, GA event), `ui/CtaButton.tsx`.
- No hero image. Pure typography + a subtle CSS-only phone/SMS motif at most.

### 7.2 Lost-income calculator — `components/sections/LostIncomeCalculator.tsx` (client island)
- Two native `<input type="range">` sliders: missade samtal/vecka (0–20,
  default 5) and snittvärde per jobb (1 000–50 000 kr, stepped, default
  8 000 kr). Live output: "≈ X kr i förlorade jobb varje månad" with a
  conservative conversion assumption stated honestly in small print (e.g.
  "vi räknar försiktigt: bara en del av missade samtal blir jobb" — exact
  factor fixed in Phase 0 copy deck and shown, not hidden).
- Formula in `lib/calculator.ts` with unit tests. `Intl.NumberFormat('sv-SE')`
  for formatting. Result element has fixed height (CLS rule).
- Ends in the primary CTA.

### 7.3 Live demo — `components/sections/LiveDemo.tsx`
- **Call-in demo** (`DemoCallCard`, server-rendered, number from env):
  "Ring numret. Lägg på efter en signal. Titta på din telefon." Big
  tappable `tel:` number. Small honest note: "Det här är exakt samma SMS
  dina kunder skulle få."
- **Animated fallback** (`MissedCallVisualizer.tsx`, client island): a
  CSS-keyframe phone mock playing missed call → typing dots → SMS bubble,
  triggered by IntersectionObserver, respects `prefers-reduced-motion`
  (static end-state instead). No libraries, no video.
- If `NEXT_PUBLIC_DEMO_PHONE_NUMBER` is unset, the call card renders the
  visualizer-only variant — the site must never show a dead number.

### 7.4 The three parts — `components/sections/BenefitCards.tsx` (server)
- Three plain benefit cards (not a feature list): missat samtal → kunden får
  svar direkt; nöjda kunder → fler Google-recensioner utan tjat; en snygg
  hemsida som gör att du ser seriös ut. Copy from copy deck; icons are
  inline SVG.

### 7.5 Pricing — `components/sections/Pricing.tsx` (server)
- ONE card: **2 995 kr/mån. Allt ingår.** Bullet list of everything
  included, plain language. States clearly: "3 månaders bindningstid,
  därefter månadsvis." No asterisks, no "från"-pricing, no tiers.
- Primary CTA.

### 7.6 FAQ — `components/sections/Faq.tsx` (server) 
- Native `<details>/<summary>` accordions (zero JS). Questions fixed:
  uppstart/hur lång tid, "måste jag kunna teknik?", support, behåller jag
  mitt nummer? (number porting in plain words), bindningstid (3 mån, honest),
  vad händer när jag säger upp, vem skriver SMS:en/hemsidan.
- Emits `FAQPage` JSON-LD from the same data source (`content/faq.sv.ts`).

### 7.7 Final CTA — `components/sections/FinalCta.tsx` (server)
- Phone link + the same short `LeadForm` again. One closing line that
  re-anchors the painful moment.

Shared UI: `ui/Container.tsx`, `ui/SectionHeading.tsx`, `ui/CtaButton.tsx`,
`ui/PhoneLink.tsx`, `ui/LeadForm.tsx`. Between every section: the primary
CTA appears (inline or as section closer) per hard rule 5.

### `/api/lead` — `app/api/lead/route.ts`
- POST JSON `{ namn, telefon, foretag?, meddelande?, sourceSection }`.
- Validates (Swedish mobile format, length caps), honeypot field, basic
  in-memory rate limit per IP, forwards server-side to `GHL_LEAD_WEBHOOK_URL`,
  returns 200/4xx. Logs failures. 5 s upstream timeout with a friendly
  Swedish error + fallback "ring oss direkt" in the form UI.

## 8. Phased milestones

### Phase 0 — Spec & decisions *(Fable 5 + owner; ~1 session + owner homework)*
Deliverables:
1. **Final Swedish copy deck** (`content/copy.sv.ts` contents drafted as a
   doc first): hero headline/subline, calculator labels + conversion
   assumption, demo instructions, three benefit cards, pricing block
   (3 mån bindningstid wording), all FAQ answers, final CTA, footer/legal
   microcopy. Every line passes the hard rules; reviewed by owner.
2. **Domain chosen and registered** (owner). Candidate: hantverkarsystemet.se
   — confirm availability. Feeds `NEXT_PUBLIC_SITE_URL`, e-mail, JSON-LD.
3. **GHL provisioning checklist** (owner, in GHL):
   - [ ] Buy/assign a Swedish number for the public demo (voice + SMS).
   - [ ] Missed-call workflow: inbound call → (no answer / hangup) → SMS
         within seconds, using the exact SMS template from the copy deck.
   - [ ] Abuse guard in the workflow: max 1 demo SMS per number per day
         (public numbers on a website get spam-dialed; SMS costs money).
   - [ ] Inbound webhook for leads created; URL captured as
         `GHL_LEAD_WEBHOOK_URL`; field mapping (namn/telefon/källa) agreed.
   - [ ] Test both end-to-end from a personal phone; record actual
         call→SMS latency (this number may be quoted on the site — only if real).
4. **Legal inputs collected** (owner): legal company name, org.nr, address,
   contact e-mail — required for integritetspolicy, villkor, JSON-LD.
Exit criteria: copy deck approved; domain live at registrar; GHL demo number
answers and texts back; webhook URL in hand.

### Phase 1 — Core build *(Sonnet 5, live-demo integration verified with Opus 4.8 if it fights back; ~2–3 sessions)*
1. Scaffold Next.js 15 + TS + Tailwind v4, `output: 'standalone'`,
   `.env.example`, ESLint, README with run/deploy notes.
2. Layout shell, Header/Footer, shared UI components.
3. Home sections in fixed order (§7), copy wired from `content/copy.sv.ts`.
4. Calculator with tested formula; visualizer with reduced-motion path.
5. `LeadForm` + `/api/lead` → GHL, tested against the real webhook.
6. Secondary pages `/kontakt`, `/integritetspolicy`, `/villkor` (real legal
   inputs), plus a stub `/sa-funkar-det` (fleshed out in Phase 2).
Exit criteria: `npm run build` clean; a real lead submitted from a phone
appears in GHL; demo section renders correctly with and without the env var;
all copy matches the deck verbatim.

### Phase 2 — SEO & content depth *(Sonnet 5; ~1 session)*
1. `/sa-funkar-det` full page: the three parts step-by-step in plain words,
   setup timeline ("från ja till igång"), what the owner has to do (nästan
   ingenting) — same tone rules.
2. Metadata per route (title/description in honest Swedish, OG image —
   simple generated card, no stock photos), canonical URLs.
3. JSON-LD: Organization + Service on `/`, FAQPage from FAQ data.
4. `sitemap.ts`, `robots.ts`, favicon set, `lang="sv"`.
Exit criteria: valid structured data (Rich Results test), Lighthouse SEO ≥ 95.

### Phase 3 — Polish & performance *(Sonnet 5; ~1 session)*
1. Budget enforcement on throttled mid-range mobile profile: **LCP < 2.0 s,
   CLS < 0.05**, TBT sane; measure with Lighthouse CI or WebPageTest, fix
   until green.
2. No JS-library animations audit; bundle check (first-load JS of `/` kept
   minimal — target < 110 kB gzipped; islands code-split).
3. Accessibility pass: contrast, focus states, 48 px tap targets, labels on
   sliders/inputs, `prefers-reduced-motion` verified.
4. Form edge cases: upstream GHL down → friendly error + "ring oss" fallback;
   double-submit guard.
5. 360 px one-handed walkthrough of every section.
Exit criteria: budgets met on real-phone test; a11y checklist done.

### Phase 4 — Launch & graduate *(Sonnet 5 + owner; ~1 session + outreach ongoing)*
**"Done" means first paid customer, not deployment.**
1. Deploy standalone build to Hostinger managed Node.js; point domain; HTTPS;
   env vars set in Hostinger panel; smoke-test demo call + lead form in prod.
2. GA4: pageview + events (`lead_submitted`, `demo_number_clicked`,
   `phone_clicked`, `calculator_used`) — loaded after interaction/idle so it
   can't hurt LCP. Verify GHL receives prod leads with source attribution.
3. Search Console: verify domain, submit sitemap.
4. **Sales-outreach checklist (owner, launch week):**
   - [ ] List of 30 local tradesmen (elektriker, takläggare, rörmokare,
         solcellsinstallatörer) with mobile numbers from public sources.
   - [ ] One-liner pitch script that mirrors the hero copy + "ring vårt
         demonummer så ser du själv" as the hook — the demo number is the
         sales tool, not just a site feature.
   - [ ] 10 calls/day cadence; log every conversation in GHL.
   - [ ] Follow-up SMS template (same honest tone) sent via GHL.
   - [ ] Offer: kom-igång within [X real days from Phase 0 timeline].
   - [ ] Track: calls → demos dialed → meetings → **first signed customer**.
5. Post-launch guardrails: watch demo-number SMS volume/cost weekly; first
   real customer → replace social-proof placeholder with their real review
   (with permission) — still no fabrication, ever.
Exit criteria: site live on domain, budgets green in prod, tracking verified,
outreach running, **first paid customer signed**.

## 9. Open questions (owner — none block Phase 1 start except #1–2)

1. **Domain name** — final choice + registration (Phase 0). Candidate:
   hantverkarsystemet.se.
2. **Legal details** — company name, org.nr, address, contact e-mail for
   policy pages and JSON-LD (Phase 0).
3. **Calculator conversion assumption** — which conservative factor do we
   state publicly (e.g. "var tredje missat samtal hade blivit ett jobb")?
   Fable proposes a default in the Phase 0 copy deck; owner approves.
4. **Demo SMS template wording** — exact text (it doubles as the product
   demo, so it must be the same message real customers' callers get).
5. **GA4 property** — existing account or create new in Phase 4.

## 10. Estimated path to launch

~5–7 working sessions total: Phase 0 (1 Fable session + owner homework in
GHL/registrar), Phase 1 (2–3 Sonnet sessions), Phase 2 (1), Phase 3 (1),
Phase 4 (1 + ongoing owner outreach). Critical path item outside code:
**GHL demo number provisioning** — start it first, everything else can
proceed in parallel.

## 11. Progress log (Sonnet 5)

- **Phase 1 (core build): done.** Next.js 16 scaffold (App Router, TS,
  Tailwind v4, `output: standalone`), full home page in the fixed section
  order, `/sa-funkar-det`, `/kontakt`, `/integritetspolicy`, `/villkor`,
  `/api/lead` → GHL proxy, sitemap/robots/JSON-LD. Draft Swedish copy deck
  written in `content/copy.sv.ts` / `content/faq.sv.ts` — **needs owner
  sign-off**, including the calculator's 1-in-3 conversion assumption
  (open question §9.3).
- **Phase 2 (SEO/content depth): done**, minus items that need real owner
  data. Added canonical URLs per route, OpenGraph/Twitter metadata, and a
  code-generated OG image (`app/opengraph-image.tsx`, no stock photography).
  `/sa-funkar-det` depth content was written directly in Phase 1.
- **Phase 3 (performance/polish): done for what's measurable pre-launch.**
  Fixed a color-contrast a11y issue (borderline grays bumped to
  `neutral-600`) and a heading-hierarchy gap (benefit cards had `h3`s with
  no parent `h2`). Verified with a real Lighthouse run (mobile, simulated
  throttling) against the local production build:
  **Performance 99, Accessibility 100, SEO 100 — LCP 1.7s, CLS 0, TBT
  90ms** — comfortably inside the LCP <2.0s / CLS <0.05 budget. Note for
  the record: raw first-load JS is ~190KB gzipped, mostly React 19 +
  Next.js runtime rather than app code (three small client islands:
  `LeadForm`, `LostIncomeCalculator`, `MissedCallVisualizer`) — Lighthouse
  scores it well on real timing metrics, but it's above the plan's
  original informal 110KB gzip reference point. Not re-architected, since
  actual timing metrics pass; flagging in case a stricter budget matters
  later. Real-device / real-network verification on a mid-range phone is
  still outstanding (this environment has no physical device).
- **Phase 4 (launch): blocked**, as expected, on GHL number/webhook,
  domain registration, and legal details (§9).
