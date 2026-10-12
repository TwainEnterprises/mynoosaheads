# My Noosa Heads

> Plan your Noosa trip well.
> **By the headland, by the bar.**
> Built slowly, sourced always, never fabricated.

A tourism-positive, sourced guide to Noosa Heads (Queensland, Australia).

[![Next.js](https://img.shields.io/badge/Next.js-14.2.15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Sprint](https://img.shields.io/badge/Sprint-6.1%20(v6.1%20P1%20%2B%20PHOTOS)-blue?style=flat-square)](#v61-change-log)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4.13-blue?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

**Status:** **v6.1 (MSN-2961-V6.1-P1-CONTENT-RAILS)** — P1 content rails + mega-menu search + 15 scene illustrations, built 2026-10-12 on top of v6 (`27c4c1f`). v6 production at `mynoosaheads.vercel.app` remains untouched. Vercel preview link captured at deploy; awaiting Tim's call to promote.

---

## What is here (v6 + v5 carry)

- Next.js 14 (App Router) + TypeScript strict + Tailwind CSS 3
- **26 public routes** live (v5's 22 + no new routes in v6 P0; mega-menu panels render the existing routes).
- **v6 mega menu** — `src/components/ui/MegaMenu.tsx`. 6 top-level categories (Destinations · Stay · See & Do · Plan · What's On · Book Now) with ~55 sub-links. Hover (200ms delay) or keyboard focus reveals an image-rich panel. Mobile (<md) collapses to a hamburger sheet. ARIA: `aria-haspopup`, `aria-expanded`, `aria-controls`, panel `role="region"`. Click-outside / Escape closes.
- **v6 homepage** — 7 P0 sections + v5 carry (live data, plan hub, disclosure, footer). S1 hero · S3 featured areas (6 photo cards replacing 8 SVGs) · S4 things-to-do carousel (8 scroll-snap cards) · S5 where-to-stay grid (6 cross-section cards) · S9 webcams strip (4 tiles) · S10 getting here (5 transport modes + hero photo). Section IDs per Albert's v6 spec §2.1.
- **ContentCard** — `src/components/ui/ContentCard.tsx`. Shared card primitive for S3, S4, S5, S9. Aspect-locked, hover-lift, image-scale 1.0→1.05, link-underline reveal, figcaption credit on hover.
- **Carousel** — `src/components/ui/Carousel.tsx`. Pure CSS scroll-snap rail; `role="region" aria-roledescription="carousel"`. No JS dependency.
- **Design system polish** — `src/app/globals.css` v6 block: semantic palette aliases (`--text-primary`, `--surface-base`, `--accent-brand`), motion tokens (`--motion-snappy/base/slow`, `--ease-out`, `--ease-spring`), hover utilities (`.hover-lift`, `.hover-scale-img`, `.hover-underline`, `.hover-glow`), reveal-on-scroll, mega-panel surface, scroll-snap rail, caption-script role. Fraunces `opsz 144` engaged on H1/H2. H3–H6 letter-spacing tightened.
- **Icon set expansion** — `src/components/ui/Icon.tsx`. v5 had 21 icons; v6 adds 17 (Car, Plane, Bus, Anchor, Map, Bed, House, Building, Wifi, Key, CalendarEvent, Phone, Wheelchair, Pets, Family, Mountain, Question). Total: 38 icons.
- **Photography inventory** — 49 curated Unsplash photos served from `/public/photos/` (v5: 31 + v6 net-new: 18). Per-page attribution + centralised `/image-credits` page. All Unsplash License.
- **Live data** — Open-Meteo Marine + Forecast + NOAA solar + Conway moon + BOM Tewantin + QPWS + QLD Traffic (6s timeout, 30-min revalidate). v5 carry.
- **8 bespoke SVG area hero illustrations** — `src/components/illustrations/AreaHeroes.tsx`. v5 carry; demoted from S3 featured areas grid to mega-menu panel use.
- **Compliance footer** — 5 columns + 91-word ACCC Sch 2 compliance band. v6 update: column 1 (Sitemap) uses the new mega-menu IA.
- **Accessibility** — skip link, focus rings, ARIA landmarks, prefers-reduced-motion respected (extended v6 to cover reveal-on-scroll + image-scale), 44px+ touch targets. v5 carry.
- **Canonical URL** — env-var-driven; `SITE.productionUrl` centralised. v5 carry.
- **og:image** — `/public/og-image.jpg` (1200×630) referenced from `layout.tsx`. v5 carry.
- **Anonymised brand** — 0 matches of personal names in user-facing strings (verified via `grep -rEn "Tim|Whidburn|Twain|myreplicantlives" src/ content/ public/` — the 9 matches are all in source-code JSDoc / `//` comments, not in user-facing rendered text).

## v6.1 change log (MSN-2961-V6.1-P1-CONTENT-RAILS, 2026-10-12)

Built on top of v6 (`27c4c1f`). Adds the P1 backlog from Albert's v6 design spec + mega-menu search (deferred from v6 P0 per Tim's call #2) + 15 bespoke scene illustrations + the full micro-interaction library (Accordion, Lightbox, Tabs, SearchOverlay). Photo manifest had not landed at build time; structure is in place for mechanical integration when it does.

### P1 (should-ship; shipped in v6.1)

| # | Change | Files | Status |
|---|---|---|---|
| P1-1 | S2 Live conditions strip polish — icon adoption (already substantially in v6) | `src/app/page.tsx`, `src/components/ui/LiveDataWidget.tsx` | ✅ |
| P1-2 | S7 Eat & drink strip — 6 venue tiles (Wasabi, Sails, Berardo's, Sum Yung Guys, Bistro C, Locale) | `src/app/page.tsx`, `src/data/site.tsx` (`EAT_AND_DRINK`) | ✅ |
| P1-3 | S8 Noosa right now rail — 4 editorial cards (markets, alerts, moon, school holidays) | `src/app/page.tsx`, `src/data/site.tsx` (`NOOSA_RIGHT_NOW`), `src/components/illustrations/Scenes.tsx` (NEW) | ✅ |
| P1-4 | S13 What's on this week — 6 events with date badge + category icon | `src/app/page.tsx`, `src/data/site.tsx` (`WHATS_ON_THIS_WEEK`) | ✅ |
| P1-5 | S15 FAQ accordion — 8 questions (parking, dog rules, school holidays, emergencies, accessibility, surf, bar crossing, dump point) | `src/app/page.tsx`, `src/data/site.tsx` (`FAQ_ITEMS`), `src/components/ui/Accordion.tsx` (NEW) | ✅ |
| P1-6 | Mega-menu search (deferred from v6 P0) — Cmd/Ctrl-K, static index, 38 entries | `src/components/ui/SearchOverlay.tsx` (NEW), `src/components/ui/MegaMenu.tsx` (wired), `src/data/site.tsx` (`SEARCH_INDEX`) | ✅ |
| P1-7 | 15 scene illustrations (12 ship + 3 stretch) | `src/components/illustrations/Scenes.tsx` (NEW) | ✅ |
| P1-8 | Micro-interaction library: Accordion, Lightbox, Tabs, SearchOverlay | `src/components/ui/Accordion.tsx`, `Lightbox.tsx`, `Tabs.tsx`, `SearchOverlay.tsx` (NEW), barrel in `src/components/ui/index.ts` | ✅ |
| P1-9 | Carousel polish — nav arrow buttons + active-slide tracking | `src/components/ui/Carousel.tsx` | ✅ |
| P1-10 | 10 additional icons for eat & drink, what's on, FAQ | `src/components/ui/Icon.tsx` (`ForkKnife`, `Cup`, `Music`, `Market`, `Sparkle`, `Frame`, `Community`, `Tent`, `Tree`, `Headland`, `ChevronDown`) | ✅ |

**P1 subtotal:** 10 items, all ✅ shipped. Total icon set: 38 → 49 (one over spec's 48 — the bonus is `ChevronDown` for the FAQ accordion).

### Photo integration status

Albert's photo manifest (`mynoosaheads-photo-manifest-2026-10-12.md`) had not landed at the time of this build. The structure is in place for mechanical integration:
- `src/data/photos.ts` — single-file photo inventory; the v6.1 sections reuse `HOMEPAGE_SECTIONS.*` arrays with role-matched indices. When the manifest lands, swap the photo IDs and update the caption / author / sourceUrl fields.
- `src/app/image-credits/page.tsx` — auto-rendered from `photos.ts`; attribution updates are single-file.
- `src/data/site.tsx` (`EAT_AND_DRINK`, `NOOSA_RIGHT_NOW`, `WHATS_ON_THIS_WEEK`, `FAQ_ITEMS`) — content-only; no image refs in the data, all images flow through `HOMEPAGE_SECTIONS`.

If the manifest lands before Tim's call to promote, a follow-on commit will swap the photos in. If it doesn't, the v6.1 build ships with the v6 photo inventory and the new sections reuse role-matched photos.

## v6 change log (MSN-2960-V6-MEGA-MENU-HOMEPAGE, 2026-10-11)

### P0 (must-ship in 3–5 day window)

| # | Change | Files | Status |
|---|---|---|---|
| P0-1 | Mega menu (6 categories, ~55 sub-links, image-rich panels) | `src/components/ui/MegaMenu.tsx` (NEW), `src/data/site.ts` (`MEGA_NAV`, `MegaNavCategory`), `src/components/SiteHeader.tsx`, `src/components/ui/index.ts` | ✅ |
| P0-2 | Hero refined (S1) — incremental polish on v5 hero | `src/app/page.tsx` | ✅ |
| P0-3 | Featured areas grid (S3) — 6 photo cards, photo-swap, drop to 3-col | `src/app/page.tsx`, `src/data/site.ts` (`FEATURED_AREAS`), `src/data/photos.ts` (`HOMEPAGE_SECTIONS.featuredAreas`), `src/components/ui/ContentCard.tsx` (NEW) | ✅ |
| P0-4 | Things to do carousel (S4) — 8 cards, scroll-snap | `src/app/page.tsx`, `src/data/site.ts` (`THINGS_TO_DO`), `src/data/photos.ts` (`HOMEPAGE_SECTIONS.thingsToDo`), `src/components/ui/Carousel.tsx` (NEW) | ✅ |
| P0-5 | Where to stay grid (S5) — 6 cross-section cards | `src/app/page.tsx`, `src/data/site.ts` (`WHERE_TO_STAY`), `src/data/photos.ts` (`HOMEPAGE_SECTIONS.whereToStay`) | ✅ |
| P0-6 | Webcams strip (S9) — 4 tiles | `src/app/page.tsx`, `src/data/site.ts` (`WEBCAMS`) | ✅ |
| P0-7 | Getting here section (S10) — 5 transport modes | `src/app/page.tsx`, `src/data/site.ts` (`GETTING_HERE`), `src/data/photos.ts` (`HOMEPAGE_SECTIONS.gettingHere`) | ✅ |
| P0-8 | Footer update (S16) — column 1 reflects new mega-menu IA | `src/data/site.ts` (`FOOTER_DISCLOSURE.columns[0]`) | ✅ |
| P0-9 | Design system polish — typography scale + palette aliases + motion principles | `src/app/globals.css` (v6 block appended), `tailwind.config.ts` (motion tokens, caption-script role) | ✅ |
| P0-10 | Micro-interaction library — card lift + image scale + link underline + button press | `src/app/globals.css` (utility classes), `src/components/ui/ContentCard.tsx` (wired in) | ✅ |

**P0 subtotal:** 10 items, all ✅ shipped.

### P1 (deferred to follow-on sprint per spec)

| # | Change | Status |
|---|---|---|
| P1-1 | Live conditions strip (S2) — carry + scroll-snap polish + icon adoption | ⏸ carried from v5; P1 polish deferred |
| P1-2 | Plan your trip hub (S6) — refresh copy + scene illustration per card | ⏸ carried from v5; P1 polish deferred |
| P1-3 | Eat & drink strip (S7) — 4-6 tiles | ⏸ P1 |
| P1-4 | Noosa right now rail (S8) | ⏸ P1 |
| P1-5 | What's on this week rail (S13) | ⏸ P1 |
| P1-6 | FAQ accordion (S15) — 6-8 questions | ⏸ P1 |
| P1-7 | Full 30+ icon set (48 icons) — v6 ships 38, 10 more in v6.1 | ⏸ partial; v6 ships 17 new icons |
| P1-8 | Image lightbox component | ⏸ P1 |
| P1-9 | Tabs component (filters for S5/S7) | ⏸ P1 |

### P2 (deferred to post-launch per spec)

| # | Change | Status |
|---|---|---|
| P2-1 | Editorial stories rail (S11) — 2-3 MDX posts | ⏸ P2 |
| P2-2 | Noosa in numbers stats strip (S12) | ⏸ P2 |
| P2-3 | Newsletter inline CTA stub (S14) | ⏸ P2 |
| P2-4 | 12+ scene illustrations | ⏸ P2 |
| P2-5 | Carousel nav arrows + dots indicator | ⏸ P2 |
| P2-6 | Toast / notification component | ⏸ P2 |

## What is NOT here yet (v6.2 follow-up)

- **Photo manifest integration** — when Albert's photo manifest lands, a follow-on commit swaps `src/data/photos.ts` photo IDs + captions + attribution and verifies the `/image-credits` page renders correctly. Structure is in place; no code changes needed beyond the data file.
- **AU commercial lawyer sign-off** (Albert v5 §6 Q8) — still required for monetisation switch-on; v6.1 ships the disclosure posture.
- **`hello@mynoosaheads.com` publication** (Albert v5 §6 Q9) — contact form still uses `mailto:`; v6.2 publishes the address.
- **Per-page og:image overrides** — v6.1 ships a site-default; per-category overrides are a v6.2 polish.
- **Surf breaks sub-page imagery** — v5 was text + cards; v6.2 adds per-break photos.
- **P1 known limitations** — Lightbox and Tabs are built and exported; not yet wired into a page in v6.1 (P2 editorial stories + S5/S7 filters are the planned adopters). Mega-menu does not yet trap focus inside the open panel (non-modal by design, but a v6.2 follow-on adds focus-trap).
- **Live conditions strip scroll-snap polish** — v6.1 keeps the 3-col `LiveDataGrid`; a future polish adds horizontal scroll-snap on mobile with 1.2-tile peek.

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
# v6 (MSN-2960-V6-MEGA-MENU-HOMEPAGE) — mega menu + homepage restructure + design-system polish shipped 2026-10-11
# v6.1 (MSN-2961-V6.1-P1-CONTENT-RAILS) — P1 content rails + mega-menu search + 15 scenes + micro-interaction library shipped 2026-10-12

# v6.1.1 (MSN-2962-V6.1.1-PHOTO-INTEGRATION) — open-licence photo swap + ESLint fixes + P1 quick wins shipped 2026-10-12
#
# Summary
#   - Photo integration: 49 curated Unsplash photos replaced with 42
#     verified location-specific Wikimedia Commons photos (CC-BY-SA 4.0,
#     CC-BY 2.0, public domain, CC0 1.0) per Albert's photo manifest,
#     plus 10 bespoke SVG illustrations for the locations with no
#     open-licence photo (Sunshine Beach, six named eat-and-drink
#     venues, three cross-section accommodation filters).
#   - 4 ESLint `<img>` → `<Image>` conversions in page.tsx, ContentCard,
#     Lightbox, MegaMenu. Zero warnings, zero errors.
#   - next.config.mjs: added `commons.wikimedia.org` to remotePatterns
#     so next/image can hot-link via Special:FilePath.
#   - S9 Webcams strip: 4 distinct photos (was: same hero on all 4 in
#     v6.1). Two of the four are real Commons photos; the other two
#     are SVG fallbacks.
#   - S7 Eat & drink: 6 bespoke SVG illustrations of the venue type
#     (e.g. "riverside Japanese" for Wasabi, "laneway restaurant" for
#     Sum Yung Guys). Not branded imitations.
#   - JSON-LD LocalBusiness structured data on the homepage (P1 / §10
#     launch bar #9 — was partial in v6.1, now full).
#   - Footer column 1 (Sitemap) updated to reflect the v6 mega-menu
#     IA (Destinations, Stay, See & Do, Plan, What's On, Book Now),
#     per Victor's P2-5.
#   - /hello-noosa linked from /about's "Who writes it" section.
#   - Peregian Beach: reuses the same Mountain/Ash 2012 photo for both
#     hero and inline with different crops, per the manifest.
#   - LocationPhoto union type introduced in src/data/photos.ts; the
#     LocationPhoto / LocationCaptionedPhoto wrapper components
#     consolidate the photo-treatment policy in one place.
#
# Known deferred items (to v6.1.2 / v6.2)
#   - P1: JSON-LD Article on inner pages (homepage is now done; inner
#     pages are still missing per Victor's §10 bar #9).
#   - P2-3: Webcam tiles still need operator-supplied thumbnails or
#     tripoded-camera scenes (current build uses Commons photos for
#     the four beach angles; SVG for Sunshine Beach).
#   - P2-4: Scene illustrations in /scenes — the v6.1.1 SVG fallbacks
#     are bespoke for the 10 named gaps; a wider scene library
#     (Markets, Beach access, etc.) is a v6.2 follow-up.
#   - P2-7: Mega menu focus-trap is still non-modal by design.
#   - Sunshine Beach specific photo (no open-licence photo found in
#     this pass; SVG placeholder ships in v6.1.1).
#   - Hinterland (Pomona / Cooran / Kin Kin / Cooroy) specific photos
#     (Everglades photo is used as hinterland context for v6.1.1).
#   - Direct outreach to the 6 named eat-and-drink venues for CC-BY
#     photos (Sally to lead, v6.2 follow-up).
