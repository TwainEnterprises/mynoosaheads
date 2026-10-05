# My Noosa Heads

> Plan your Noosa trip well.
> **By the headland, by the bar.**
> Built slowly, sourced always, never fabricated.

A tourism-positive, sourced guide to Noosa Heads (Queensland, Australia).

[![Next.js](https://img.shields.io/badge/Next.js-14.2.15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Sprint](https://img.shields.io/badge/Sprint-5%20(v5%20POLISH)-blue?style=flat-square)](#v5-change-log)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4.13-blue?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

**Status:** **v5 (MSN-2959-V5-POLISH)** — surgical visual polish + new content surfaces, shipped 2026-10-05. v5 supersedes v2 (`noosa-site-v2.vercel.app`) on Vercel preview first; production promotion awaits Tim's authority.

---

## What is here (v5)

- Next.js 14 (App Router) + TypeScript strict + Tailwind CSS 3
- **22 public routes** live: `/`, 8 categories + 9 accommodation sub-pages + /plan + /surf-and-weather/breaks + 4 editorial/legal pages
- **Live data** — Open-Meteo Marine + Forecast + NOAA solar + Conway moon (6s timeout, 30-min revalidate)
- **Photography** — Curated Unsplash inventory served from `/public/photos/` at the site origin (31 unique photos across heroes + inlines). Per-page attribution + centralised `/image-credits` page.
- **8 bespoke SVG area hero illustrations** — `src/components/illustrations/AreaHeroes.tsx` (4:3 viewBox, 1.5px stroke, sea-glass palette).
- **Editorial H1 + eyebrow overlay on hero photos** — `HeroPhoto` now takes optional `eyebrow` + `overlayTitle` + uses a strengthened `.hero-overlay-strong` gradient (0→55→88%) for clean white-on-photo readability.
- **Accessibility** — skip link, focus rings, ARIA landmarks, prefers-reduced-motion respected, 44px+ touch targets (`btn-sm` bumped from px-3.5 py-1.5 → px-4 py-2.5).
- **Canonical URL bug fixed** — `SITE.productionUrl` centralised to env-var-driven constant; `sitemap.ts` + `robots.ts` read from the same source.
- **og:image site default** — `/public/og-image.jpg` (1200×630) referenced from `layout.tsx` metadata.
- **5-column footer** — sitemap · live sources · editorial · legal · local partners, plus the 91-word ACCC Sch 2 compliance band.
- **Sitemap** — `/sitemap.xml` auto-generated from `src/app/sitemap.ts`; includes the 9 accommodation sub-pages + /plan + /surf-and-weather/breaks + /image-credits.
- **Robots** — `/robots.txt` allows /, disallows `/api/`, `/styleguide`, `/_next/`.

## v5 change log (MSN-2959-V5-POLISH, 2026-10-05)

### P0 (must-do for "as beautiful as visitnoosa.com.au")

| # | Change | Files | Status |
|---|---|---|---|
| 2 | Homepage hero swap (Wikimedia → Unsplash curated) | `src/data/photos.ts`, `src/app/page.tsx`, `public/photos/unsplash-1473773508845-188df298d2d1.jpg` | ✅ |
| 3 | About-page brand image swap | `src/data/photos.ts`, `src/app/about/page.tsx` (uses new ABOUT_BRAND_IMAGE), `public/photos/unsplash-1540337706094-da10342c93d8.jpg` | ✅ |
| 4–10 | 7 category hero + inline photo swaps (28 Unsplash photos) | `src/data/photos.ts`, 8 category pages use new `CATEGORY_PHOTOS`, `public/photos/unsplash-*.jpg` | ✅ |
| 12 | `/image-credits` page (auto-rendered from photos.ts) | `src/app/image-credits/page.tsx` (NEW) | ✅ |
| 13 | Homepage hero H1 + eyebrow overlay | `src/components/ui/HeroPhoto.tsx`, `src/app/page.tsx` | ✅ |
| 14 | Category hero H1 + eyebrow overlay | `src/components/ui/HeroPhoto.tsx`, `src/components/CategoryPage.tsx`, all 8 category pages | ✅ |
| 15 | Strengthen hero-overlay gradient (`.hero-overlay-strong` 0→55→88%) | `src/app/globals.css` | ✅ |
| 29 | Canonical URL bug fix (centralised env-var-driven productionUrl) | `src/data/site.ts`, `src/app/sitemap.ts`, `src/app/robots.ts` | ✅ |
| 30 | og:image site default (1200×630) | `src/app/layout.tsx`, `public/og-image.jpg` (NEW) | ✅ |

### P1 (should-do for v5 launch)

| # | Change | Files | Status |
|---|---|---|---|
| 11 | 8 bespoke SVG area hero illustrations | `src/components/illustrations/AreaHeroes.tsx` (NEW), `src/app/page.tsx` | ✅ |
| 18 | "Plan your trip" hub section on homepage (3 cards: new / returning / deadline) | `src/app/page.tsx` | ✅ |
| 19 | Per-page cross-link chips | `src/components/CategoryPage.tsx` (default from `RELATED_LINKS[slug]`), `src/data/site.ts` | ✅ |
| 20 | `/plan` page (trip-planning hub) | `src/app/plan/page.tsx` (NEW) | ✅ |
| 21 | 9 accommodation sub-pages (Tim's locked answer #4) | `src/app/accommodation/[slug]/page.tsx` (NEW), `src/data/site.ts` (`ACCOMMODATION_SUBPAGES`), `src/app/sitemap.ts` | ✅ |
| 22 | Surf breaks sub-page | `src/app/surf-and-weather/breaks/page.tsx` (NEW) | ✅ |
| 23 | Tighten CTAs to action verbs | `src/app/page.tsx`, `src/data/site.ts` (NAV descriptions), `src/components/ui/Button.tsx` (unchanged) | ✅ |
| 24 | Editorial section eyebrows | `src/app/page.tsx`, `src/app/accommodation/page.tsx` | ✅ |
| 25 | Card titles for the 8 area cards | `src/app/page.tsx` (editorialPitch map per slug) | ✅ |
| 28 | Bump `btn-sm` to 44px touch target | `src/app/globals.css` | ✅ |

### P2 (nice-to-have)

| # | Change | Files | Status |
|---|---|---|---|
| 1 | Document typography intent in `tailwind.config.ts` | `tailwind.config.ts` | ✅ |
| 17 | Document palette intent in `globals.css` | `src/app/globals.css` | ✅ |
| 26 | Footer unchanged (already gold-standard) | — | ✅ |
| 27 | Verify Vercel Cron infrastructure (deferred to v5.1 per Albert's runbook §6 Q7) | — | ⚠️ deferred |

## What is NOT here yet (v5.1 follow-up)

- **AU commercial lawyer sign-off** (Albert v5 §6 Q8) — required for monetisation switch-on; v5 ships the disclosure posture but cannot activate paid links without Tim's authority.
- **Vercel Cron jobs** (Albert v5 §6 Q7) — sitemap + IndexNow submit, broken-link check. The 30-min ISR revalidation handles data freshness; cron for sitemap is a v5.1 task.
- **`hello@mynoosaheads.com` publication** (Albert v5 §6 Q9) — the contact form currently uses `mailto:` to an unpublished address; v5.1 publishes the address and wires the form to it.
- **Per-page og:image overrides** — v5 ships a site-default og:image; per-page overrides (one per category hero) are a v5.1 polish.
- **Surf breaks sub-page imagery** — currently text + cards only; adding per-break photos is a v5.1 task.

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 14.2.15 (App Router) |
| Language | TypeScript 5.6.2 (strict mode) |
| Styling | Tailwind CSS 3.4.13 + `@tailwindcss/typography` |
| MDX | `next-mdx-remote` 6.0.0 (server components) + `gray-matter` + `reading-time` |
| Hosting | Vercel Hobby (free tier) |
| Photography | 31 curated Unsplash photos (Unsplash License, free for commercial use) served from `public/photos/` |
| Live data | Open-Meteo Marine + Forecast, NOAA solar, Conway moon, BOM Tewantin, QPWS, QLD Traffic (all free, no key) |

## Folder structure (v5)

```
mynoosaheads/
├── app/                        # (placeholder; project uses src/app/)
├── content/                    # MDX content files
│   └── posts/
│       └── hello-noosa.mdx
├── lib/                        # cross-cutting utilities
│   ├── posts.ts                # MDX loader
│   └── live-data.ts            # Open-Meteo + NOAA + QPWS + QLD Traffic
├── public/
│   ├── favicon.svg             # (legacy; root layout uses /favicon.svg)
│   ├── og-image.jpg            # v5 site-default og:image (1200×630)
│   └── photos/                 # v5 Unsplash inventory (31 JPEGs)
│       └── unsplash-{id}.jpg
├── src/
│   ├── app/
│   │   ├── accommodation/
│   │   │   ├── page.tsx        # parent + 9-sub-page links
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # 9 sub-pages (Tim's #4 — not Albert's #4)
│   │   ├── boats-and-watercraft/
│   │   ├── contact/
│   │   ├── fishing-reports/
│   │   ├── image-credits/      # v5: auto-rendered from photos.ts
│   │   ├── noosa-national-park/
│   │   ├── plan/               # v5: trip-planning hub (#20)
│   │   ├── privacy/
│   │   ├── robots.ts           # v5: reads SITE.productionUrl (#29)
│   │   ├── sitemap.ts          # v5: +9 sub-pages + /plan + /breaks + /image-credits
│   │   ├── surf-and-weather/
│   │   │   ├── page.tsx
│   │   │   └── breaks/         # v5: surf-breaks sub-page (#22)
│   │   ├── terms/
│   │   ├── things-to-do/
│   │   ├── travel-and-transport/
│   │   ├── webcams/
│   │   ├── about/
│   │   ├── page.tsx            # v5: hero overlay + plan-your-trip hub + 8 SVG cards
│   │   ├── layout.tsx          # v5: og:image site default (#30)
│   │   └── globals.css         # v5: palette intent + hero-overlay-strong + btn-sm 44px
│   ├── components/
│   │   ├── CategoryPage.tsx    # v5: hero overlay + cross-link chips
│   │   ├── SiteHeader.tsx
│   │   ├── SiteFooter.tsx
│   │   ├── mdxComponents.tsx
│   │   ├── illustrations/
│   │   │   └── AreaHeroes.tsx  # v5: 8 bespoke SVG heroes (#11)
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── CaptionedPhoto.tsx
│   │       ├── Footer.tsx
│   │       ├── Form.tsx
│   │       ├── Hero.tsx
│   │       ├── HeroPhoto.tsx   # v5: eyebrow + overlayTitle props (#13, #14)
│   │       ├── Icon.tsx
│   │       ├── LiveDataWidget.tsx
│   │       ├── Logo.tsx
│   │       ├── NavBar.tsx
│   │       ├── AffiliateBadge.tsx
│   │       └── index.ts
│   └── data/
│       ├── photos.ts           # v5: 31 curated Unsplash photos (Wikimedia removed)
│       └── site.ts             # v5: productionUrl env-var + RELATED_LINKS + ACCOMMODATION_SUBPAGES
├── instrumentation.ts
├── next.config.mjs             # v5: +images.unsplash.com remotePatterns
├── package.json                # next 14.2.15 / tailwind 3.4.13 / next-mdx-remote 6.0.0
├── postcss.config.js
├── tailwind.config.ts          # v5: typography intent documented (#1)
└── tsconfig.json
```

## Local dev

```bash
pnpm install
pnpm dev                        # http://localhost:3010
```

The dev server runs on **port 3010** by default.

## Production build

```bash
pnpm run build
pnpm run start                  # serves the production build on port 3010
```

## Deploy

### Vercel (current production / preview)

```bash
# One-time link
vercel link

# Preview deploy (v5) — what Tim is waiting for
vercel deploy --yes             # preview URL, NOT --prod

# Production promotion — under Tim's authority only
vercel deploy --prod --yes
```

### Canonical URL configuration

The v5 build reads the production URL from `NEXT_PUBLIC_SITE_URL` env var
(defaults to `https://mynoosaheads.vercel.app`). For production on the
`mynoosaheads.com` hostname, set:

```bash
# In Vercel project settings, set:
NEXT_PUBLIC_SITE_URL=https://mynoosaheads.com
```

Without this, the sitemap, robots.txt, and og:image canonical point at the
`mynoosaheads.vercel.app` hostname.

## Known issues

1. **Unsplash photo IDs not visually inspected.** All 31 Unsplash photos were
   batch-HEAD-checked for 200 OK and downloaded via the Unsplash CDN; specific
   photographer attribution per photo is "Unsplash contributor" pending a
   review cycle to map each photo to its actual photographer. The Unsplash
   License permits commercial use without attribution, so licensing is safe;
   the photographer name accuracy is a v5.1 polish task.
2. **No Vercel Cron jobs.** Sitemap + IndexNow submit, broken-link check, and
   affiliate-link check are not wired in v5. Albert's runbook §6 Q7 flagged
   this as a v5.1 follow-up.
3. **`/image-credits` lists 31 photos.** Per the data file (NOT per rendered
   page — `photos.inline` for the 8 categories plus `HOMEPAGE_HERO` and
   `ABOUT_BRAND_IMAGE`). If the page count drops below 31, some inline
   entries are intentional duplicates or unused.
4. **The "Plan your trip" homepage hub reuses the 8-area card-grid layout.**
   For v5.1, this hub can be elevated into a dedicated `/plan` page (which
   also exists in v5 as the trip-planning hub with school holidays + a11y
   + dog rules + emergencies + budget).

## How to run locally

```bash
git clone (private repo, see Tim)
cd mynoosaheads
pnpm install
pnpm dev
```

Visit:
- `http://localhost:3010` — homepage
- `http://localhost:3010/surf-and-weather` — surf report
- `http://localhost:3010/accommodation` — accommodation parent
- `http://localhost:3010/accommodation/hastings-street` — one of 9 sub-pages
- `http://localhost:3010/plan` — trip-planning hub
- `http://localhost:3010/image-credits` — photo attribution register

## Compliance posture (v5 — unchanged from v2)

- **ACCC Schedule 2** — disclosure rendered on every monetised page (surf,
  accommodation, things-to-do, fishing, boats, travel, plan). Footer carries
  the 91-word compliance band with `id="affiliate-disclosure"`.
- **Privacy Act 1988 (Cth)** — privacy policy at `/privacy`; APPs described in
  plain English; NDB scheme mentioned; Spam Act 2003 (Cth) statement present
  in footer.
- **Spam Act 2003** — no newsletter, no email capture, no analytics, no
  third-party cookies. Contact form uses `mailto:` only.
- **ABN** — `00 000 000 000 (placeholder pending entity registration)` in
  footer.
- **Operator/publisher identity** — unstated. No personal names in any
  user-facing string. Brand = MyNoosaHeads only.

## Editorial references

- Albert's v5 runbook — `/Users/twain/.openclaw/agents/albert/agent/output/mynoosaheads-v5-runbook-2026-10-05.md`
- Albert's visitnoosa evidence — `/Users/twain/.openclaw/agents/albert/agent/evidence/mynoosaheads-v5-2026-10-05/`
- Victor's v4 QA — `/Users/twain/.openclaw/agents/victor/agent/output/mynoosaheads-v4-qa-2026-10-05.md`
- v2 RUNBOOK — `./RUNBOOK.md`

---

# Sprint 1.3 — content migration shipped 2026-08-27
# Sprint 1.1 — auto-deploy verified 2026-08-27T11:06:39Z
# v5 (MSN-2959-V5-POLISH) — surgical visual polish shipped 2026-10-05