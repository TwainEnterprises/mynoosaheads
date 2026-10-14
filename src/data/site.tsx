/**
 * Site constants — single source of truth for nav, footers, disclosure,
 * and category content seeds. Sprint 1.3 content migration.
 *
 * Architecture: this file owns the static content. The category pages
 * (`src/app/<route>/page.tsx`) import NAV, FOOTER_DISCLOSURE, and
 * CATEGORIES below so a single edit re-flows the whole site. Live data
 * is fetched server-side at build/request time via lib/live-data.ts and
 * never baked into this file.
 *
 * AU English throughout. No fabricated metrics. Every category points at
 * an authoritative external source where applicable.
 */

/**
 * v5 (MSN-2959-V5-POLISH, 2026-10-05) — canonical URL bug fix (P0-#29).
 *
 * Per Albert's v5 runbook §3.13: `SITE.productionUrl` was hardcoded to
 * a sibling Vercel project (`noosa-site-v2.vercel.app`) and duplicated
 * across sitemap.ts / robots.ts. v5 centralises the production URL to
 * a single env-var-driven constant; defaults to `mynoosaheads.vercel.app`
 * (the current dormant production hostname). When the chairman provides
 * the GoDaddy creds for the `mynoosaheads.com` DNS flip, this constant
 * updates to `https://mynoosaheads.com` without touching any other file.
 *
 * Env precedence:
 *   1. `process.env.NEXT_PUBLIC_SITE_URL` (Vercel production / preview env)
 *   2. `process.env.SITE_URL` (server-only fallback)
 *   3. Fallback to "https://mynoosaheads.vercel.app" (current prod)
 */
const PRODUCTION_URL_FALLBACK = "https://mynoosaheads.vercel.app";
const _resolvedProductionUrl =
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_SITE_URL) ||
  (typeof process !== "undefined" && process.env?.SITE_URL) ||
  PRODUCTION_URL_FALLBACK;

export const SITE = {
  brand: "My Noosa Heads",
  brandShort: "mynoosaheads",
  tagline: "By the headland, by the bar.",
  domain: "mynoosaheads.com",
  /** v5 (MSN-2959-V5-POLISH #29): single env-var-driven production URL.
   * See comment block above. Read by layout.tsx metadataBase, sitemap.ts,
   * robots.ts, and og:image canonical. */
  productionUrl: _resolvedProductionUrl,
  stagingUrl: _resolvedProductionUrl,
  email: "hello@mynoosaheads.com",
  locale: "en-AU",
  region: "Queensland, Australia",
  established: 2026,
  /** AU Editor/Owner persona — used in editorial bylines. */
  editor: {
    name: "The MyNoosaHeads editors",
    role: "Coastal editorial team",
    location: "Noosa Heads, Queensland",
  },
} as const;

export const SPRINT = {
  id: "Sprint 1.3",
  title: "Content + base pages",
  parentMission: "MSN-2957 — mynoosaheads.com Sprint 1 (Foundation)",
} as const;

/**
 * Primary navigation — order is editorial. Surf & weather first (the
 * highest-frequency page a local opens each morning), then National Park
 * (alerts + tracks), then the consumer categories. No newsletter link,
 * no login, no social. Per chairman directive 2026-08-27.
 */
/**
 * Primary navigation — order is editorial. Surf & weather first (the
 * highest-frequency page a local opens each morning), then National Park
 * (alerts + tracks), then the consumer categories. No newsletter link,
 * no login, no social. Per chairman directive 2026-08-27.
 *
 * v5 (MSN-2959-V5-POLISH #23): CTAs tightened to action verbs per
 * Albert's v5 runbook §3.7. The labels stay editorial; the
 * descriptions get action verbs.
 *
 * v6 (MSN-2960-V6, 2026-10-11): kept for the /styleguide page and
 * any consumer that wants the flat 8-link list. The new MEGA_NAV
 * (below) is what the SiteHeader now uses.
 */
export const NAV = [
  { label: "Surf & weather", href: "/surf-and-weather", description: "Read today's surf report." },
  { label: "National Park", href: "/noosa-national-park", description: "Check park alerts and tracks." },
  { label: "Accommodation", href: "/accommodation", description: "Find a place to stay." },
  { label: "Things to do", href: "/things-to-do", description: "See what locals do on a Tuesday." },
  { label: "Fishing", href: "/fishing-reports", description: "Read this week's fishing insight." },
  { label: "Boats", href: "/boats-and-watercraft", description: "Check the bar crossing." },
  { label: "Travel", href: "/travel-and-transport", description: "Plan the drive in." },
  { label: "Webcams", href: "/webcams", description: "Open the council cams." },
] as const;

/* ======================================================================
 * v6 (MSN-2960-V6) — mega-menu navigation.
 *
 * Replaces the v5 flat 8-link NavBar with a 6-category mega menu
 * (~55 sub-links total). Per Albert's v6 spec §3.1–§3.4. The 6
 * categories mirror visitnoosa.com.au's IA:
 *   1. Destinations (10 sub-links)
 *   2. Stay         (19 sub-links: 10 archetype + 9 v5 carryover)
 *   3. See & Do     (8 sub-links)
 *   4. Plan         (9 sub-links)
 *   5. What's On    (5 sub-links)
 *   6. Book Now     (CTA, no sub-links)
 *
 * P0 notes:
 *   - 10 new archetype stay links point at the v5 /accommodation
 *     parent with hash anchors (#hotels, #self-contained, etc.) —
 *     P1 will generate /accommodation/type/[type] filter pages.
 *   - Plan sub-links without dedicated pages route to the v6 /plan
 *     hub with hash anchors (P1 expansion).
 *   - What's On sub-links route to /things-to-do with hash anchors
 *     (P1 will add dedicated event pages).
 *   - Mega-menu featured image uses the v5 area SVGs (Hastings
 *     Street, Headland, etc.) — no new photo inventory needed.
 *
 * MegaNavCategory kind is "category" for normal entries and "cta"
 * for the Book Now button (no sub-links, rendered as a pill).
 * ====================================================================== */

export type MegaNavLink = {
  label: string;
  href: string;
  description?: string;
};

export type MegaNavCategory =
  | {
      kind: "category";
      label: string;
      href: string;
      sub: readonly MegaNavLink[];
      featured: {
        label: string;
        href: string;
        ctaLabel?: string;
        image?: string;
        alt?: string;
        svg?: string; // reserved for SVG-as-ReactNode handoff (P1)
      };
      editorial: string;
    }
  | {
      kind: "cta";
      label: string;
      href: string;
    };

const DESTINATIONS_SUB: MegaNavLink[] = [
  { label: "Noosa Heads", href: "/surf-and-weather" },
  { label: "Hastings Street", href: "/things-to-do" },
  { label: "Noosa Junction", href: "/things-to-do" },
  { label: "Noosaville", href: "/things-to-do" },
  { label: "Peregian Beach", href: "/things-to-do" },
  { label: "Sunshine Beach", href: "/things-to-do" },
  { label: "Tewantin", href: "/boats-and-watercraft" },
  { label: "Noosa Country (hinterland)", href: "/things-to-do" },
  { label: "Noosa Surrounds (North Shore, Marcus Beach)", href: "/things-to-do" },
  { label: "Noosa National Park", href: "/noosa-national-park" },
];

const STAY_SUB: MegaNavLink[] = [
  { label: "Hotels & Resorts", href: "/accommodation#hotels" },
  { label: "Self-Contained", href: "/accommodation#self-contained" },
  { label: "Apartments", href: "/accommodation#apartments" },
  { label: "Houses & Holiday Letting", href: "/accommodation#houses" },
  { label: "Caravan & Camping", href: "/accommodation#caravan" },
  { label: "B&Bs / Retreats", href: "/accommodation#retreats" },
  { label: "Pet Friendly", href: "/accommodation/pet-friendly" },
  { label: "Accessible", href: "/accommodation/accessible" },
  { label: "Unique / Bespoke", href: "/accommodation#unique" },
  { label: "Family", href: "/accommodation/family" },
  // v5 carryover (9 — Chairman's locked answer)
  { label: "Hastings Street", href: "/accommodation/hastings-street" },
  { label: "Noosaville", href: "/accommodation/noosaville" },
  { label: "Sunshine Beach", href: "/accommodation/sunshine-beach" },
  { label: "Tewantin", href: "/accommodation/tewantin" },
  { label: "Peregian", href: "/accommodation/peregian" },
  { label: "Hinterland", href: "/accommodation/hinterland" },
  // (the v5 carryover also includes pet-friendly, family, accessible — already above)
];

const SEE_AND_DO_SUB: MegaNavLink[] = [
  { label: "Surf & Weather", href: "/surf-and-weather" },
  { label: "Things to Do", href: "/things-to-do" },
  { label: "Fishing", href: "/fishing-reports" },
  { label: "Boats & Watercraft", href: "/boats-and-watercraft" },
  { label: "Webcams", href: "/webcams" },
  { label: "Tours & Experiences", href: "/things-to-do#tours" },
  { label: "Day Trips", href: "/things-to-do#day-trips" },
  { label: "Eat & Drink", href: "/things-to-do#eat-and-drink" },
];

const PLAN_SUB: MegaNavLink[] = [
  { label: "The /plan hub", href: "/plan" },
  { label: "Getting Here", href: "/travel-and-transport" },
  { label: "Weather Almanac", href: "/surf-and-weather" },
  { label: "Itineraries", href: "/plan#itineraries" },
  { label: "Pet-Friendly", href: "/plan#pet-friendly" },
  { label: "Accessibility", href: "/plan#accessibility" },
  { label: "School Holidays", href: "/plan#school-holidays" },
  { label: "Emergencies", href: "/plan#emergencies" },
  { label: "Budget", href: "/plan#budget" },
];

const WHATS_ON_SUB: MegaNavLink[] = [
  { label: "Events", href: "/things-to-do#events" },
  { label: "Markets", href: "/things-to-do#markets" },
  { label: "Festivals", href: "/things-to-do#festivals" },
  { label: "Live Music", href: "/things-to-do#live-music" },
  { label: "Exhibitions", href: "/things-to-do#exhibitions" },
];

export const MEGA_NAV: readonly MegaNavCategory[] = [
  {
    kind: "category",
    label: "Destinations",
    href: "/things-to-do",
    sub: DESTINATIONS_SUB,
    featured: {
      label: "Hastings Street — the walkable end of town",
      href: "/things-to-do",
      ctaLabel: "Open Hastings Street →",
    },
    editorial:
      "From the headland to the river mouth, ten places locals actually base themselves.",
  },
  {
    kind: "category",
    label: "Stay",
    href: "/accommodation",
    sub: STAY_SUB,
    featured: {
      label: "Where to base yourself",
      href: "/accommodation",
      ctaLabel: "Open accommodation →",
    },
    editorial:
      "Hotels, apartments, holiday houses. Nine regional sub-pages plus ten archetype filters — find the right base for the trip.",
  },
  {
    kind: "category",
    label: "See & Do",
    href: "/things-to-do",
    sub: SEE_AND_DO_SUB,
    featured: {
      label: "The headland walk",
      href: "/noosa-national-park",
      ctaLabel: "Open the park guide →",
    },
    editorial:
      "Surf, fish, paddle, walk, eat. The things locals do on a Tuesday, with the tide and the swell in mind.",
  },
  {
    kind: "category",
    label: "Plan",
    href: "/plan",
    sub: PLAN_SUB,
    featured: {
      label: "The /plan hub",
      href: "/plan",
      ctaLabel: "Open /plan →",
    },
    editorial:
      "School holidays, accessibility, dog rules, emergencies, budget. The trip-planning surface, sourced.",
  },
  {
    kind: "category",
    label: "What's On",
    href: "/things-to-do#events",
    sub: WHATS_ON_SUB,
    featured: {
      label: "This week on the shire",
      href: "/things-to-do#events",
      ctaLabel: "See what's on →",
    },
    editorial:
      "Markets, festivals, live music, exhibitions. Curated weekly, manually, in line with Spam Act 2003.",
  },
  {
    kind: "cta",
    label: "Book Now",
    href: "/accommodation",
  },
] as const;

/* ======================================================================
 * v6 (MSN-2960-V6) — homepage section data.
 *
 * Drives the 7 P0 sections of the new homepage (S1, S3, S4, S5, S9,
 * S10, S16). P1 adds S2, S6, S7, S8, S13, S15.
 * ====================================================================== */

/**
 * S3 — Featured areas (6 cards). Each card binds a curated Unsplash
 * photo (HOMEPAGE_FEATURED_AREAS) to an area, tagline, and CTA. v5's
 * "Fishing" and "Boats" areas are demoted from the featured grid and
 * folded into S4 (things to do).
 */
export const FEATURED_AREAS = [
  {
    slug: "noosa-heads",
    name: "Noosa Heads",
    tagline: "The headland, the bars, the national park at your door.",
    href: "/surf-and-weather",
    cta: "Read the surf report →",
    imageIndex: 0,
  },
  {
    slug: "hastings-street",
    name: "Hastings Street",
    tagline: "Cafés, restaurants, and Main Beach within walking distance.",
    href: "/things-to-do",
    cta: "See what to do →",
    imageIndex: 1,
  },
  {
    slug: "noosaville",
    name: "Noosaville",
    tagline: "Across the river; the ferry, the riverfront, the family pace.",
    href: "/things-to-do",
    cta: "See Noosaville →",
    imageIndex: 2,
  },
  {
    slug: "sunshine-beach",
    name: "Sunshine Beach",
    tagline: "South of the headland — the surf village, the village shops.",
    href: "/things-to-do",
    cta: "See Sunshine Beach →",
    imageIndex: 3,
  },
  {
    slug: "peregian-beach",
    name: "Peregian Beach",
    tagline: "Village-square feel; the start of the Coolum stretch.",
    href: "/things-to-do",
    cta: "See Peregian →",
    imageIndex: 4,
  },
  {
    slug: "noosa-national-park",
    name: "Noosa National Park",
    tagline: "Coastal forest, granite headlands, the QPWS alerts.",
    href: "/noosa-national-park",
    cta: "Check park alerts →",
    imageIndex: 5,
  },
] as const;

/**
 * S4 — Things to do (8 experience cards). Pricing in the card is
 * indicative, sourced from local operators and Booking.com at the
 * time of the v6 build; verify before relying on it.
 */
export const THINGS_TO_DO = [
  {
    title: "Learn to surf at First Bay",
    duration: "2 hrs",
    priceFrom: "from $79 pp",
    href: "/things-to-do#learn-to-surf",
    imageIndex: 0,
    disclosure: "Affiliate",
  },
  {
    title: "Guided headland walk",
    duration: "3 hrs",
    priceFrom: "from $45 pp",
    href: "/things-to-do#headland-walk",
    imageIndex: 1,
  },
  {
    title: "Noosa River sunset cruise",
    duration: "2.5 hrs",
    priceFrom: "from $59 pp",
    href: "/things-to-do#river-cruise",
    imageIndex: 2,
  },
  {
    title: "Noosa Junction farmers market",
    duration: "Sunday morning",
    priceFrom: "Free entry",
    href: "/things-to-do#markets",
    imageIndex: 3,
  },
  {
    title: "Half-day fishing charter",
    duration: "5 hrs",
    priceFrom: "from $190 pp",
    href: "/fishing-reports",
    imageIndex: 4,
  },
  {
    title: "Stand-up paddle hire",
    duration: "1 hr",
    priceFrom: "from $25",
    href: "/things-to-do#paddle",
    imageIndex: 5,
  },
  {
    title: "Hinterland waterfalls day trip",
    duration: "Full day",
    priceFrom: "from $135 pp",
    href: "/things-to-do#day-trips",
    imageIndex: 6,
  },
  {
    title: "Eumundi markets + lunch",
    duration: "Half day",
    priceFrom: "Free entry",
    href: "/things-to-do#markets",
    imageIndex: 7,
  },
] as const;

/**
 * S5 — Where to stay (6 cross-section cards). Spans the shire, not
 * region-locked, so a visitor can see the full spread at a glance.
 */
export const WHERE_TO_STAY = [
  {
    name: "Hastings Street boutique hotel",
    area: "Hastings Street",
    priceFrom: "from $245 / night",
    href: "/accommodation/hastings-street",
    imageIndex: 0,
  },
  {
    name: "Noosaville family apartment",
    area: "Noosaville",
    priceFrom: "from $185 / night",
    href: "/accommodation/noosaville",
    imageIndex: 1,
  },
  {
    name: "Sunshine Beach holiday house",
    area: "Sunshine Beach",
    priceFrom: "from $310 / night",
    href: "/accommodation/sunshine-beach",
    imageIndex: 2,
  },
  {
    name: "Hinterland B&B",
    area: "Hinterland",
    priceFrom: "from $165 / night",
    href: "/accommodation/hinterland",
    imageIndex: 3,
  },
  {
    name: "Peregian dog-friendly cottage",
    area: "Peregian",
    priceFrom: "from $210 / night",
    href: "/accommodation/peregian",
    imageIndex: 4,
  },
  {
    name: "Accessible ground-floor unit",
    area: "Shire-wide",
    priceFrom: "from $175 / night",
    href: "/accommodation/accessible",
    imageIndex: 5,
  },
] as const;

/**
 * S9 — Webcams strip (4 tiles, 1:1 aspect). v5 carries the
 * /webcams page; v6 surfaces 4 tiles on the homepage. Where the
 * operator permits, we render a live thumbnail; otherwise we
 * render a static placeholder with a "View live →" CTA.
 */
export const WEBCAMS = [
  {
    name: "Main Beach",
    location: "Noosa Heads",
    href: "/webcams#main-beach",
  },
  {
    name: "Noosa Bar",
    location: "Noosa Heads",
    href: "/webcams#noosa-bar",
  },
  {
    name: "Sunshine Beach",
    location: "Sunshine Beach",
    href: "/webcams#sunshine-beach",
  },
  {
    name: "Maroochydore",
    location: "Sunshine Coast",
    href: "/webcams#maroochydore",
  },
] as const;

/**
 * S10 — Getting here (3-col matrix of transport modes). Drive
 * times are typical, in good conditions, free of incidents; verify
 * via QLD Traffic for live. Per spec §2.1 S10.
 */
export const GETTING_HERE = [
  {
    mode: "Drive from Brisbane",
    duration: "1h 45m",
    icon: "Car" as const,
    href: "/travel-and-transport",
  },
  {
    mode: "Drive from Sydney",
    duration: "10 hrs",
    icon: "Car" as const,
    href: "/travel-and-transport",
  },
  {
    mode: "Sunshine Coast Airport",
    duration: "30 min transfer",
    icon: "Plane" as const,
    href: "/travel-and-transport",
  },
  {
    mode: "Noosa Ferry (Noosaville ↔ Hastings Street)",
    duration: "River route",
    icon: "Anchor" as const,
    href: "https://www.noosaferry.com/",
    external: true,
  },
  {
    mode: "Premier Motorway bus",
    duration: "Brisbane ↔ Noosa",
    icon: "Bus" as const,
    href: "/travel-and-transport",
  },
] as const;

/**
 * v5 (MSN-2959-V5-POLISH #20): cross-link chips for the "Related"
 * rail on every category page. Drives the homepage's "Plan your trip"
 * hub too. Each item has a label + href + 1-line description.
 *
 * Albert's v5 runbook §3.5 #19: "Per-page cross-link chips — on each
 * of the 8 category pages, add a small 'Related' inline strip at
 * the bottom — 3 chips linking to the most relevant 2–3 other
 * categories."
 */
export const RELATED_LINKS = {
  "surf-and-weather": [
    { label: "Noosa National Park", href: "/noosa-national-park", description: "Check coastal walk conditions before you drive to First Bay." },
    { label: "Boats & watercraft", href: "/boats-and-watercraft", description: "Bar crossings depend on the same swell you're reading here." },
    { label: "Webcams", href: "/webcams", description: "Confirm what the buoy is telling you." },
  ],
  "noosa-national-park": [
    { label: "Surf & weather", href: "/surf-and-weather", description: "Read the swell before walking the headland." },
    { label: "Things to do", href: "/things-to-do", description: "Cross-link to the hinterland walks." },
    { label: "Travel & transport", href: "/travel-and-transport", description: "Plan the drive to the park entrance." },
  ],
  accommodation: [
    { label: "Plan", href: "/plan", description: "Plan your trip — accessibility, dog rules, school holidays." },
    { label: "Surf & weather", href: "/surf-and-weather", description: "Check conditions for your travel dates." },
    { label: "Things to do", href: "/things-to-do", description: "What's nearby each region." },
  ],
  "things-to-do": [
    { label: "Plan", href: "/plan", description: "Build a day-by-day plan around what locals do." },
    { label: "Accommodation", href: "/accommodation", description: "Pick the right base for the activity." },
    { label: "Webcams", href: "/webcams", description: "Confirm what you plan to do is open." },
  ],
  "fishing-reports": [
    { label: "Surf & weather", href: "/surf-and-weather", description: "Read the tide and wind before launching." },
    { label: "Boats & watercraft", href: "/boats-and-watercraft", description: "Bar crossings and ramp access." },
    { label: "Travel & transport", href: "/travel-and-transport", description: "Where to launch from Tewantin." },
  ],
  "boats-and-watercraft": [
    { label: "Surf & weather", href: "/surf-and-weather", description: "Bar crossing decisions start here." },
    { label: "Travel & transport", href: "/travel-and-transport", description: "Plan the drive to Tewantin or Noosaville." },
    { label: "Fishing", href: "/fishing-reports", description: "Where to fish once you're on the water." },
  ],
  "travel-and-transport": [
    { label: "Accommodation", href: "/accommodation", description: "Pick your base before you book the drive." },
    { label: "Plan", href: "/plan", description: "School holidays, accessibility, emergencies." },
    { label: "Webcams", href: "/webcams", description: "Check road conditions before you leave." },
  ],
  webcams: [
    { label: "Surf & weather", href: "/surf-and-weather", description: "What the buoy says versus what the cam shows." },
    { label: "Noosa National Park", href: "/noosa-national-park", description: "Headland walk current conditions." },
    { label: "Boats & watercraft", href: "/boats-and-watercraft", description: "Bar crossing live view." },
  ],
} as const;

/**
 * v5 (MSN-2959-V5-POLISH #21): nine accommodation sub-pages —
 * Chairman's locked answer #4 (full SEO-audit gap from MSN-3058 §4).
 *
 * Nine region/archetype sub-pages (Chairman's locked answer, not Albert's
 * default of 4): regional pages for the 5 places to base yourself +
 * 3 archetype pages (pet-friendly, family, accessible) + 1 hinterland
 * page for the western shire.
 *
 * Each sub-page renders with the shared accommodation layout + a
 * region/archetype body + the ACCC affiliate framework slot.
 */
export const ACCOMMODATION_SUBPAGES = [
  {
    slug: "hastings-street",
    name: "Hastings Street",
    region: "Noosa Heads",
    pitch: "The walkable end of town. Cafés, restaurants, the headland, and Main Beach at your door.",
    archetype: "Premium central",
    keywords: ["hastings street", "noosa heads", "main beach", "luxury", "walkable"],
  },
  {
    slug: "noosaville",
    name: "Noosaville",
    region: "Noosaville",
    pitch: "Across the river, along Gympie Terrace. Quieter than Hastings Street; cheaper parking; family-friendly.",
    archetype: "Family riverfront",
    keywords: ["noosaville", "gympie terrace", "river", "family", "ferry"],
  },
  {
    slug: "sunshine-beach",
    name: "Sunshine Beach",
    region: "Sunshine Beach",
    pitch: "South of the headland. Surf club end of town, village shops, and the southern access to Noosa National Park.",
    archetype: "Surf village",
    keywords: ["sunshine beach", "village", "surf club", "national park"],
  },
  {
    slug: "tewantin",
    name: "Tewantin & Noosa North Shore",
    region: "Tewantin",
    pitch: "On the river, ten minutes from Hastings Street by car or ferry. Houseboats and quiet blocks of land.",
    archetype: "Houseboat & quiet",
    keywords: ["tewantin", "north shore", "houseboat", "ferry"],
  },
  {
    slug: "peregian",
    name: "Peregian & Marcus Beach",
    region: "Peregian Beach",
    pitch: "South past Sunshine Beach. Village-square feel; the start of the Coolum stretch. Dog-friendly options.",
    archetype: "Quiet village",
    keywords: ["peregian beach", "marcus beach", "village", "dog friendly"],
  },
  {
    slug: "pet-friendly",
    name: "Pet-friendly stays",
    region: "Shire-wide",
    pitch: "Verified pet-friendly accommodation across the shire. Verify each operator's pet policy before booking.",
    archetype: "Archetype",
    keywords: ["pet friendly", "dog friendly", "pets allowed", "noosa"],
  },
  {
    slug: "family",
    name: "Family stays",
    region: "Shire-wide",
    pitch: "Apartments, holiday houses, and resorts with family-friendly facilities — pools, fenced yards, near the river.",
    archetype: "Archetype",
    keywords: ["family", "kids", "pool", "fenced", "holiday house"],
  },
  {
    slug: "accessible",
    name: "Accessible stays",
    region: "Shire-wide",
    pitch: "Step-free, wheelchair-accessible accommodation verified against current Australian accessibility standards.",
    archetype: "Archetype",
    keywords: ["accessible", "wheelchair", "step free", "disability"],
  },
  {
    slug: "hinterland",
    name: "Hinterland & western shire",
    region: "Pomona · Cooran · Kin Kin · Cooroy",
    pitch: "Inland villages in the western shire. Pomona, Cooran, Kin Kin, Cooroy — hinterland farms, markets, walks.",
    archetype: "Hinterland",
    keywords: ["hinterland", "pomona", "cooran", "kin kin", "cooroy"],
  },
] as const;

/**
 * Eight functional-area landing pages — used by the homepage entry grid
 * and by the dynamic /[category] route stub. Each entry owns its hero,
 * short pitch, icon, and source list.
 */
export const CATEGORIES = [
  {
    slug: "surf-and-weather",
    href: "/surf-and-weather",
    navLabel: "Surf & weather",
    icon: "Wave" as const,
    pitch: "Today's swell, wind, tide, and UV — from BOM Capricornia–Hervey Bay and Open-Meteo Marine.",
    longDescription:
      "The Noosa bar opens on an outgoing tide with a south-east wind under 15 km/h. We pull the marine forecast from the Bureau of Meteorology's Capricornia–Hervey Bay district and Open-Meteo's free marine API, so the tiles on this page update themselves every 30 minutes without a human pushing them.",
    primarySources: [
      { label: "BOM Capricornia–Hervey Bay", href: "https://www.bom.gov.au/qld/forecasts/coastal.shtml" },
      { label: "Open-Meteo Marine Weather API", href: "https://open-meteo.com/en/docs/marine-weather-api" },
      { label: "BOM Tewantin tide", href: "https://www.bom.gov.au/australia/tides/#!/qld-tewantin" },
    ],
  },
  {
    slug: "noosa-national-park",
    href: "/noosa-national-park",
    navLabel: "Noosa National Park",
    icon: "ParkGate" as const,
    pitch: "Coastal walk, Tanglewood track, wildlife sightings — QPWS alerts on top.",
    longDescription:
      "Noosa National Park covers about 4,000 hectares between Noosa Heads and Peregian Beach. The park is managed by the Queensland Parks and Wildlife Service. We link directly to QPWS alerts and conditions pages so you can check before you drive.",
    primarySources: [
      { label: "QPWS — Noosa National Park", href: "https://parks.qld.gov.au/find-a-park/national-parks/noosa-national-park" },
      { label: "QPWS park alerts", href: "https://parks.qld.gov.au/park-alerts" },
    ],
  },
  {
    slug: "accommodation",
    href: "/accommodation",
    navLabel: "Accommodation",
    icon: "Compass" as const,
    pitch: "Hotels, apartments, holiday houses. Booking, Stayz, Airbnb, Expedia.",
    longDescription:
      "We don't take inventory. Each booking option links out to Booking.com, Stayz, Expedia, or Airbnb with our affiliate tag. Per ACCC Schedule 2, every monetised link is labelled before you click; the full disclosure is in the footer.",
    primarySources: [
      { label: "Booking.com affiliate disclosure", href: "https://www.booking.com/affiliate-program/v2/index.html" },
      { label: "Stayz affiliate program", href: "https://www.stayz.com.au/affiliates" },
      { label: "Airbnb affiliate program", href: "https://news.airbnb.com/en-us/airbnb-affiliate-program/" },
      { label: "Expedia Partner Solutions", href: "https://www.expediapartnercentral.com/" },
    ],
  },
  {
    slug: "things-to-do",
    href: "/things-to-do",
    navLabel: "Things to do",
    icon: "Eucalyptus" as const,
    pitch: "Day-by-day ideas across the shire — coast, river, hinterland.",
    longDescription:
      "Categories are organised around the things locals actually do, not what the visitor brochure leads with. Hastings Street, the Noosa River, the hinterland villages (Pomona, Cooran, Kin Kin), and the surf beaches — each with its own weather and tide cues.",
    primarySources: [
      { label: "Tourism Noosa (industry body)", href: "https://www.visitnoosa.com.au/" },
      { label: "Noosa Council — About Noosa", href: "https://www.noosa.qld.gov.au/Community/About-Noosa" },
    ],
  },
  {
    slug: "fishing-reports",
    href: "/fishing-reports",
    navLabel: "Fishing reports",
    icon: "Fish" as const,
    pitch: "Weekly insight, tide tables, solunar times.",
    longDescription:
      "Recreational fishing in Queensland is governed by a possession-limit and size-limit framework. We publish the current Noosa-region rules, point at the QLD Government's recreational fishing page, and link the BOM tide for Tewantin. Live fish-catch data is not free and is deferred to Sprint 2.",
    primarySources: [
      { label: "QLD recreational fishing rules", href: "https://www.qld.gov.au/recreation/activities/boating-fishing/rec-fishing" },
      { label: "BOM Tewantin tide", href: "https://www.bom.gov.au/australia/tides/#!/qld-tewantin" },
    ],
  },
  {
    slug: "boats-and-watercraft",
    href: "/boats-and-watercraft",
    navLabel: "Boats & watercraft",
    icon: "Boat" as const,
    pitch: "Hire options, Noosa River bar, public ramps.",
    longDescription:
      "Crossing the Noosa River bar is a forecast-driven decision. We link Marine Safety Queensland's bar-crossing bulletin, Noosa Council's ramp map, and the hire operators that operate from the Noosaville and Tewantin precincts. Hire prices are operator-set; check the live page before booking.",
    primarySources: [
      { label: "MSQ bar crossings", href: "https://www.msq.qld.gov.au/Safety/Bar-crossings-and-coastal-conditions" },
      { label: "Noosa Council — Parks and Facilities", href: "https://www.noosa.qld.gov.au/Services-and-Facilities/Parks-and-Facilities" },
    ],
  },
  {
    slug: "travel-and-transport",
    href: "/travel-and-transport",
    navLabel: "Travel & transport",
    icon: "Compass" as const,
    pitch: "Bruce Highway conditions, Sunshine Coast Airport, ferry.",
    longDescription:
      "Driving to Noosa means the Bruce Highway (M1) and the Eumundi–Noosa road network. Live road closures come from qldtraffic.qld.gov.au; Sunshine Coast Airport arrivals are pulled from the airport's official feed. The Noosa Ferry connects Noosa Heads to Noosaville along the river.",
    primarySources: [
      { label: "QLD Traffic", href: "https://qldtraffic.qld.gov.au/" },
      { label: "Sunshine Coast Airport", href: "https://www.sunshinecoastairport.com.au/" },
      { label: "Noosa Ferry", href: "https://www.noosaferry.com/" },
    ],
  },
  {
    slug: "webcams",
    href: "/webcams",
    navLabel: "Webcams",
    icon: "Camera" as const,
    pitch: "Council + SLSQ cams. We don't scrape; we link.",
    longDescription:
      "The Sunshine Coast Council maintains a small set of public coastal webcams; Surf Life Saving Queensland publishes patrol flags and webcam stills. Where a feed is embeddable with attribution, we embed. Where the operator requires a link-out, we link.",
    primarySources: [
      { label: "Surf Life Saving QLD webcams", href: "https://www.lifesaving.com.au/" },
      { label: "Beachsafe.org.au", href: "https://beachsafe.org.au/" },
    ],
  },
] as const;

/**
 * Footer disclosure — five columns per Albert's design brief. Every
 * monetised link carries an ACCC pill per Competition and Consumer Act
 * 2010 Schedule 2. Every legal link carries the relevant statute pill.
 *
 * Per chairman directive (2026-08-27) there is no newsletter field anywhere
 * on the site.
 */
export const FOOTER_DISCLOSURE = {
  columns: [
    {
      heading: "Sitemap",
      links: [
        // v6 (MSN-2960-V6) — column 1 reflects the new mega-menu IA.
        { label: "Destinations", href: "/things-to-do" },
        { label: "Stay", href: "/accommodation" },
        { label: "See & Do", href: "/things-to-do" },
        { label: "Plan", href: "/plan" },
        { label: "What's On", href: "/things-to-do#events" },
        { label: "Surf & weather", href: "/surf-and-weather" },
        { label: "Noosa National Park", href: "/noosa-national-park" },
        { label: "Webcams", href: "/webcams" },
      ],
    },
    {
      heading: "Live sources",
      links: [
        { label: "BOM Capricornia–Hervey Bay", href: "https://www.bom.gov.au/qld/forecasts/coastal.shtml", external: true },
        { label: "Open-Meteo", href: "https://open-meteo.com/", external: true },
        { label: "QLD Traffic", href: "https://qldtraffic.qld.gov.au/", external: true },
        { label: "Surf Life Saving QLD", href: "https://www.lifesaving.com.au/", external: true },
        { label: "Beachsafe.org.au", href: "https://beachsafe.org.au/", external: true },
      ],
    },
    {
      heading: "Editorial",
      links: [
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy", href: "/privacy", disclosure: "Privacy Act 1988 (Cth)" },
        { label: "Affiliate disclosure", href: "#affiliate-disclosure", disclosure: "ACCC Sch 2" },
        { label: "Spam Act statement", href: "/privacy#spam-act-2003", disclosure: "Spam Act 2003" },
      ],
    },
    {
      heading: "Local partners",
      links: [
        { label: "Noosa Council", href: "https://www.noosa.qld.gov.au/", external: true },
        { label: "Tourism Noosa", href: "https://www.visitnoosa.com.au/", external: true },
        { label: "Sunshine Coast Council", href: "https://www.sunshinecoast.qld.gov.au/", external: true },
        { label: "QPWS", href: "https://www.qld.gov.au/environment/parks", external: true },
      ],
    },
  ],
  /**
   * MSN-2959 / TSK-2959-FIX-3 — 97-word compliance band (replaces the
   * deleted /how-we-make-money dedicated route). Rendered in the
   * Footer on every page. Per Albert's spec §4.6: the new disclosure
   * is more transparent than the old dedicated page because it shows
   * on every page, not one route most visitors would never find.
   *
   * Carries the in-page anchor id="affiliate-disclosure" so the
   * Footer's "Affiliate disclosure" link (#affiliate-disclosure)
   * scrolls here. Statutory pills (Privacy Act 1988, ACCC Sch 2,
   * Spam Act 2003) sit in the Legal column above.
   */
  complianceBand:
    "MyNoosaHeads is independent. We don’t run a newsletter, collect email addresses, or operate a login. Some links on this site are affiliate links — if you book or purchase through them, we may earn a small commission at no extra cost to you. We participate in the Booking.com, Stayz, Expedia, and Airbnb affiliate programmes; affiliate relationships do not influence our editorial copy. Full statement of which programmes and our editorial firewall: see the Affiliate disclosure item in the Legal column below, per the Competition and Consumer Act 2010 (Cth) Schedule 2.",
  region: "AU · en-AU · Queensland, Australia",
  copyrightYear: 2026,
} as const;

/**
 * Affiliate programme disclosure — the canonical disclosure pill text
 * shown on any monetised link per ACCC Schedule 2 (Australian Consumer
 * Law). See the footer for the full statement.
 *
 * MSN-2959 / TSK-2959-FIX-3: pill text renamed from "Sponsored · ACCC
 * Sch 2" to "Affiliate" per Albert's spec §4.5. The noun "Affiliate"
 * is the more accurate legal term (paid sponsorship ≠ affiliate
 * commission). The programme name and the statute are surfaced via
 * the link element's `title` attribute on the AffiliateBadge.
 */
export const ACCC_DISCLOSURE = {
  pill: "Affiliate",
  body:
    "Some links on this page are affiliate links. If you book or purchase through them, MyNoosaHeads may earn a small commission at no extra cost to you. Affiliate relationships do not influence the editorial content. See the footer for the full statement, per the Competition and Consumer Act 2010 (Cth) Schedule 2.",
} as const;
/* ======================================================================
 * v6.1 (MSN-2961-V6.1) — P1 content rails + mega-menu search.
 *
 * Builds on v6.0 (MSN-2960-V6) with the P1 backlog from Albert's
 * v6 design spec:
 *   - S2 Live conditions strip polish (scroll-snap on mobile; icon adoption)
 *   - S7 Eat & drink strip (4-6 restaurants)
 *   - S8 Noosa right now editorial rail (events + markets + alerts)
 *   - S13 What's on this week rail (5-8 events)
 *   - S15 FAQ accordion (6-8 questions)
 *   - Mega-menu search (deferred from v6 P0 per Chairman's call #2; now in)
 *   - 12+ scene illustrations (in src/components/illustrations/Scenes.tsx)
 *   - Micro-interaction library: Accordion, Lightbox, Tabs, SearchOverlay
 *
 * Photo integration: Albert's photo manifest has not landed at the
 * time of this build. The new sections reuse the existing
 * HOMEPAGE_SECTIONS.* photos with role-matched indices. When the
 * manifest lands, the integration is a mechanical swap of
 * photos.ts (the data) + image references in each section. The
 * /image-credits page is auto-rendered from photos.ts, so the
 * attribution update is single-file.
 *
 * v6.1 hard constraints (unchanged from v6):
 *   - A$30/mo cap (Hawaii envelope)
 *   - Anonymised brand (no personal names)
 *   - Vercel free/Hobby tier; free preview deploys
 *   - No commissioned photography
 *   - Compliance footer on every page
 *   - Editorial tone preserved
 * ====================================================================== */

/* ----------------------------------------------------------------------
 * SEARCH INDEX — static, build-time index for the mega-menu search.
 *
 * Each entry is a search target. Search runs entirely client-side;
 * no query is sent anywhere. The index covers all first-class
 * destinations and pages plus the top-level sections.
 *
 * When new pages are added, append to this array. Search uses
 * case-insensitive substring match on title + description + category.
 * -------------------------------------------------------------------- */

export type SearchIndexEntry = {
  title: string;
  href: string;
  description?: string;
  category: "Destination" | "Surf & weather" | "Stay" | "See & do" | "Plan" | "What's on" | "Editorial" | "Legal";
};

export const SEARCH_INDEX: readonly SearchIndexEntry[] = [
  // Destinations
  { title: "Noosa Heads", href: "/surf-and-weather", description: "Headland, Main Beach, the national park entrance.", category: "Destination" },
  { title: "Hastings Street", href: "/things-to-do", description: "Cafés, restaurants, and the walkable end of town.", category: "Destination" },
  { title: "Noosa Junction", href: "/things-to-do", description: "Sunday farmers market, laneway cafés.", category: "Destination" },
  { title: "Noosaville", href: "/things-to-do", description: "Gympie Terrace, the river, the ferry.", category: "Destination" },
  { title: "Peregian Beach", href: "/things-to-do", description: "Village square south of Sunshine Beach.", category: "Destination" },
  { title: "Sunshine Beach", href: "/things-to-do", description: "South of the headland, the surf village.", category: "Destination" },
  { title: "Tewantin", href: "/boats-and-watercraft", description: "On the river, ten minutes from Hastings Street.", category: "Destination" },
  { title: "Noosa National Park", href: "/noosa-national-park", description: "Coastal walk, Tanglewood, QPWS alerts.", category: "Destination" },
  { title: "Hinterland (Pomona, Cooran, Kin Kin, Cooroy)", href: "/things-to-do", description: "Inland villages; markets, walks, waterfalls.", category: "Destination" },

  // Surf & weather
  { title: "Surf & weather", href: "/surf-and-weather", description: "Today's swell, wind, tide, UV — BOM + Open-Meteo.", category: "Surf & weather" },
  { title: "Surf breaks", href: "/surf-and-weather/breaks", description: "First Bay, Noosa Main Beach, Sunshine Beach.", category: "Surf & weather" },

  // Stay
  { title: "Accommodation", href: "/accommodation", description: "Hotels, apartments, holiday houses. 9 regional sub-pages.", category: "Stay" },
  { title: "Hastings Street accommodation", href: "/accommodation/hastings-street", description: "Premium central, walkable end of town.", category: "Stay" },
  { title: "Noosaville accommodation", href: "/accommodation/noosaville", description: "Riverfront, family-friendly, ferry at the door.", category: "Stay" },
  { title: "Sunshine Beach accommodation", href: "/accommodation/sunshine-beach", description: "Surf village, southern access to the park.", category: "Stay" },
  { title: "Tewantin accommodation", href: "/accommodation/tewantin", description: "On the river; houseboats and quiet blocks.", category: "Stay" },
  { title: "Peregian accommodation", href: "/accommodation/peregian", description: "Quiet village; dog-friendly options.", category: "Stay" },
  { title: "Pet-friendly stays", href: "/accommodation/pet-friendly", description: "Verified pet-friendly accommodation.", category: "Stay" },
  { title: "Family stays", href: "/accommodation/family", description: "Apartments, holiday houses, family facilities.", category: "Stay" },
  { title: "Accessible stays", href: "/accommodation/accessible", description: "Step-free, wheelchair-accessible.", category: "Stay" },
  { title: "Hinterland stays", href: "/accommodation/hinterland", description: "Pomona, Cooran, Kin Kin, Cooroy.", category: "Stay" },

  // See & do
  { title: "Things to do", href: "/things-to-do", description: "Day-by-day ideas across the shire.", category: "See & do" },
  { title: "Fishing reports", href: "/fishing-reports", description: "Weekly insight, tide tables, solunar times.", category: "See & do" },
  { title: "Boats & watercraft", href: "/boats-and-watercraft", description: "Hire, the Noosa River bar, public ramps.", category: "See & do" },
  { title: "Webcams", href: "/webcams", description: "Council + SLSQ cams. We don't scrape; we link.", category: "See & do" },
  { title: "Eat & drink", href: "/things-to-do#eat-and-drink", description: "Restaurants, cafés, and where the table is set.", category: "See & do" },

  // Plan
  { title: "Plan your trip", href: "/plan", description: "School holidays, accessibility, dog rules, emergencies.", category: "Plan" },
  { title: "Travel & transport", href: "/travel-and-transport", description: "Bruce Highway, Sunshine Coast Airport, ferry.", category: "Plan" },
  { title: "Getting here", href: "/travel-and-transport", description: "Drive times, ferry, bus.", category: "Plan" },

  // What's on
  { title: "Events", href: "/things-to-do#events", description: "Curated weekly, manually.", category: "What's on" },
  { title: "Markets", href: "/things-to-do#markets", description: "Noosa Junction, Eumundi, hinterland.", category: "What's on" },
  { title: "Festivals", href: "/things-to-do#festivals", description: "Annual Noosa festivals, community events.", category: "What's on" },
  { title: "Live music", href: "/things-to-do#live-music", description: "Pubs, breweries, the Heads.", category: "What's on" },
  { title: "Exhibitions", href: "/things-to-do#exhibitions", description: "Galleries and pop-ups.", category: "What's on" },

  // Editorial
  { title: "About MyNoosaHeads", href: "/about", description: "An honest, sourced guide to Noosa Heads.", category: "Editorial" },
  { title: "Contact", href: "/contact", description: "Corrections, tips, and editorial contact.", category: "Editorial" },
  { title: "Image credits", href: "/image-credits", description: "Every photo and its source.", category: "Editorial" },
  { title: "Hello Noosa", href: "/hello-noosa", description: "Our first editorial post.", category: "Editorial" },

  // Legal
  { title: "Privacy", href: "/privacy", description: "Privacy Act 1988 (Cth) + Spam Act 2003.", category: "Legal" },
  { title: "Terms", href: "/terms", description: "Terms of use.", category: "Legal" },
] as const;

/* ----------------------------------------------------------------------
 * EAT_AND_DRINK (S7) — 9 venue tiles (v6.2 Phase 3 substitution).
 *
 * Per Albert's v2 photo manifest (2026-10-14), Wikimedia Commons
 * returns open-licence photos for nine real Noosa venues (Season,
 * Bang Bang, Zibros, Gusto, Heads of Noosa Brewing, Noosa Boathouse,
 * Royal Mail, Bistro C, Locale). The v6.1.1 list of six named venues
 * (Wasabi, Sails, Berardo's, Sum Yung Guys, Bistro C, Locale) was
 * paired with venue-typology SVG illustrations because Commons had
 * zero photos of those four venues.
 *
 * v6.2 substitution (Dexter, 2026-10-14): ship the nine Albert-verified
 * venue photos. Editorial honest > venue-typology illustration. The
 * six venue-typology SVGs (Wasabi, Sails, Berardo's, Sum Yung Guys,
 * plus Bistro C and Locale which now have photos too) remain in the
 * fallback library for any future use (deeper pages, social tiles).
 *
 * Each entry: name, cuisine, area, price, image index (into
 * HOMEPAGE_SECTIONS.eatAndDrink), CTA href. No commission or partner
 * relationship is implied by inclusion; per v5/ACC the affiliate
 * pill is shown only on monetised links.
 * -------------------------------------------------------------------- */

export const EAT_AND_DRINK = [
  {
    name: "Season",
    cuisine: "Modern Australian · Hastings Street",
    area: "Hastings Street",
    price: "$$$",
    imageIndex: 0,
    href: "/things-to-do#eat-and-drink",
  },
  {
    name: "Bang Bang",
    cuisine: "Pan-Asian · Noosa Heads",
    area: "Noosa Heads",
    price: "$$",
    imageIndex: 1,
    href: "/things-to-do#eat-and-drink",
  },
  {
    name: "Zibros",
    cuisine: "Italian · Noosa Heads",
    area: "Noosa Heads",
    price: "$$",
    imageIndex: 2,
    href: "/things-to-do#eat-and-drink",
  },
  {
    name: "Gusto",
    cuisine: "Crudo & cocktails · Noosaville",
    area: "Noosaville",
    price: "$$$",
    imageIndex: 3,
    href: "/things-to-do#eat-and-drink",
  },
  {
    name: "Heads of Noosa Brewing Co.",
    cuisine: "Craft brewery · Noosa Heads",
    area: "Noosa Heads",
    price: "$$",
    imageIndex: 4,
    href: "/things-to-do#eat-and-drink",
  },
  {
    name: "Noosa Boathouse",
    cuisine: "Floating seafood · Noosaville",
    area: "Noosaville",
    price: "$$$",
    imageIndex: 5,
    href: "/things-to-do#eat-and-drink",
  },
  {
    name: "Royal Mail Hotel",
    cuisine: "Heritage pub · Tewantin",
    area: "Tewantin",
    price: "$$",
    imageIndex: 6,
    href: "/things-to-do#eat-and-drink",
  },
  {
    name: "Bistro C",
    cuisine: "Seafood · Hastings Street",
    area: "Hastings Street",
    price: "$$$",
    imageIndex: 7,
    href: "/things-to-do#eat-and-drink",
  },
  {
    name: "Locale",
    cuisine: "Italian · Hastings Street",
    area: "Hastings Street",
    price: "$$$",
    imageIndex: 8,
    href: "/things-to-do#eat-and-drink",
  },
] as const;

/* ----------------------------------------------------------------------
 * NOOSA_RIGHT_NOW (S8) — editorial rail of "what the shire is up to".
 *
 * Curated weekly. Each card carries a small scene icon + 1-line sub
 * + a "Read more" CTA. The data is intentionally hand-edited; a
 * live feed is a v6.2+ item per Albert's v6 spec §9 Q4.
 * -------------------------------------------------------------------- */

export const NOOSA_RIGHT_NOW = [
  {
    eyebrow: "This weekend",
    title: "Noosa Junction farmers market",
    sub: "Sundays from 7am — produce, flowers, street food on the laneway.",
    href: "/things-to-do#markets",
    scene: "market",
  },
  {
    eyebrow: "Alerts",
    title: "Park alert: Tanglewood track partial closure",
    sub: "QPWS has a 1.2 km section closed for boardwalk repair. Check before you go.",
    href: "/noosa-national-park",
    scene: "alert",
  },
  {
    eyebrow: "This week",
    title: "Waxing gibbous moon — good for evening fish",
    sub: "The next 4 nights are a solid tide-bite window. Read the almanac.",
    href: "/fishing-reports",
    scene: "moon",
  },
  {
    eyebrow: "School holidays",
    title: "QLD school holidays start in 3 weeks",
    sub: "Plan accommodation early. The shire fills from mid-morning on Saturday.",
    href: "/plan#school-holidays",
    scene: "calendar",
  },
] as const;

/* ----------------------------------------------------------------------
 * WHATS_ON_THIS_WEEK (S13) — 6 events.
 *
 * Each event: date (ISO), day, month, title, venue, category tag.
 * Manual curation; weekly edit by Sally/Dexter per Albert's spec §9 Q4.
 * Date strings are display-only; the homepage renders them as
 * <time dateTime="..."> elements.
 * -------------------------------------------------------------------- */

export type WhatsOnEvent = {
  /** ISO 8601 date (start of day, AEST). */
  date: string;
  /** Display day of month (e.g. "12"). */
  day: string;
  /** Display month (e.g. "Oct"). */
  month: string;
  title: string;
  venue: string;
  category: "MARKET" | "LIVE MUSIC" | "FESTIVAL" | "EXHIBITION" | "FAMILY" | "COMMUNITY";
  href: string;
};

export const WHATS_ON_THIS_WEEK: readonly WhatsOnEvent[] = [
  {
    date: "2026-10-12",
    day: "12",
    month: "Oct",
    title: "Noosa Junction farmers market",
    venue: "Lomandra Lane, Noosa Junction",
    category: "MARKET",
    href: "/things-to-do#markets",
  },
  {
    date: "2026-10-14",
    day: "14",
    month: "Oct",
    title: "Eumundi markets",
    venue: "Memorial Drive, Eumundi",
    category: "MARKET",
    href: "/things-to-do#markets",
  },
  {
    date: "2026-10-15",
    day: "15",
    month: "Oct",
    title: "Open mic at the Imperial Hotel",
    venue: "Peregian Beach",
    category: "LIVE MUSIC",
    href: "/things-to-do#live-music",
  },
  {
    date: "2026-10-17",
    day: "17",
    month: "Oct",
    title: "Noosa alive — community concert",
    venue: "The J Theatre, Noosa Junction",
    category: "FESTIVAL",
    href: "/things-to-do#festivals",
  },
  {
    date: "2026-10-18",
    day: "18",
    month: "Oct",
    title: "Noosa Regional Gallery — opening",
    venue: "Riverside, Noosaville",
    category: "EXHIBITION",
    href: "/things-to-do#exhibitions",
  },
  {
    date: "2026-10-19",
    day: "19",
    month: "Oct",
    title: "Sunshine Coast running festival",
    venue: "Cotton Tree, Maroochydore",
    category: "COMMUNITY",
    href: "/things-to-do#events",
  },
] as const;

/* ----------------------------------------------------------------------
 * FAQ (S15) — 8 common visitor questions.
 *
 * Each question has a small icon (from the v6 icon set), a 2-4
 * sentence answer, and a CTA back to the canonical v5/v6 page.
 * All answers are sourced (council, QPWS, BOM); no new content
 * authored in v6.1, only consolidated.
 * -------------------------------------------------------------------- */

export const FAQ_ITEMS = [
  {
    question: "Where can I park at Main Beach?",
    iconKey: "Pin",
    answer: (
      <>
        <p>
          The closest car park to Main Beach is the{" "}
          <a
            href="https://www.noosa.qld.gov.au/Services-and-Facilities/Parks-and-Facilities"
            target="_blank"
            rel="noopener noreferrer"
            className="link text-ocean-700"
          >
            Hastings Street / Main Beach car park
          </a>{" "}
          (Noosa Council). It is paid parking; rates and the time-of-day
          fee schedule sit on the council site. After 9am in summer it
          fills quickly — the alternative is to take the ferry from
          Noosaville.
        </p>
        <p className="mt-3">
          See <a href="/travel-and-transport" className="link text-ocean-700">travel & transport</a>{" "}
          for the ferry timetable and bus stops.
        </p>
      </>
    ),
  },
  {
    question: "Are dogs allowed on the beach?",
    iconKey: "Pets",
    answer: (
      <>
        <p>
          Noosa Heads and Main Beach are{" "}
          <strong>dog-prohibited at all times</strong> (Noosa Council
          local law). Dogs are allowed on-leash on the southern stretch
          of Sunrise Beach, and on-leash or off-leash at certain times
          on Peregian Beach. Verify each beach on the{" "}
          <a
            href="https://www.noosa.qld.gov.au/Community/Pets-and-animals"
            target="_blank"
            rel="noopener noreferrer"
            className="link text-ocean-700"
          >
            council pets page
          </a>{" "}
          before relying on it.
        </p>
        <p className="mt-3">
          See <a href="/plan#pet-friendly" className="link text-ocean-700">pet-friendly plan</a>{" "}
          for verified pet-friendly accommodation.
        </p>
      </>
    ),
  },
  {
    question: "When are the next QLD school holidays?",
    iconKey: "CalendarEvent",
    answer: (
      <p>
        QLD school holidays run four times a year. The next block is
        published on the{" "}
        <a
          href="https://education.qld.gov.au/parents-and-carers/school-information/school-terms"
          target="_blank"
          rel="noopener noreferrer"
          className="link text-ocean-700"
        >
          Department of Education term dates page
        </a>
        . Plan accommodation early — the shire fills from mid-morning
        on the first Saturday of any holiday block.{" "}
        <a href="/plan#school-holidays" className="link text-ocean-700">
          Plan around the holidays →
        </a>
      </p>
    ),
  },
  {
    question: "What's the emergency number?",
    iconKey: "Phone",
    answer: (
      <>
        <p>
          Dial <strong>000</strong> for police, fire, or ambulance. For
          non-urgent medical care, the Noosa Hospital 24-hour
          emergency department is at 111 Goodchap Street, Noosaville.
        </p>
        <p className="mt-3">
          For marine emergencies on the bar, VHF Channel 16 reaches
          Marine Safety Queensland, and the Coast Guard Noosa can be
          raised on VHF Channel 73.
        </p>
        <p className="mt-3">
          See <a href="/plan#emergencies" className="link text-ocean-700">emergencies</a>{" "}
          for the full list.
        </p>
      </>
    ),
  },
  {
    question: "Is Noosa accessible?",
    iconKey: "Wheelchair",
    answer: (
      <p>
        The Hastings Street precinct is step-free with kerb ramps at
        most intersections. The Noosa Council publishes a{" "}
        <a
          href="https://www.noosa.qld.gov.au/Community/Disability-access-and-inclusion"
          target="_blank"
          rel="noopener noreferrer"
          className="link text-ocean-700"
        >
          disability access and inclusion plan
        </a>
        . Beach matting is deployed on Main Beach during patrol hours
        in summer. The accessible accommodation sub-page lists
        verified step-free properties.{" "}
        <a href="/accommodation/accessible" className="link text-ocean-700">
          Accessible stays →
        </a>
      </p>
    ),
  },
  {
    question: "Where can I learn to surf?",
    iconKey: "Wave",
    answer: (
      <p>
        First Bay (south of the headland) and the beach south of
        Sunshine Beach are the two beginner-friendly breaks in the
        shire. Several operators run 2-hour beginner lessons daily in
        summer. Look for ISA- or ASI-certified instructors and ask
        about conditions before booking.{" "}
        <a href="/things-to-do#learn-to-surf" className="link text-ocean-700">
          See things to do →
        </a>
      </p>
    ),
  },
  {
    question: "Can I take a boat across the Noosa bar?",
    iconKey: "Boat",
    answer: (
      <p>
        Only if conditions allow. The Noosa bar is governed by{" "}
        <a
          href="https://www.msq.qld.gov.au/Safety/Bar-crossings-and-coastal-conditions"
          target="_blank"
          rel="noopener noreferrer"
          className="link text-ocean-700"
        >
          Marine Safety Queensland
        </a>{" "}
        — read the daily bar bulletin before you cross. The bar
        generally opens on an outgoing tide with a south-east wind
        under 15 km/h and a swell under 1.5 m. See{" "}
        <a href="/boats-and-watercraft" className="link text-ocean-700">
          boats & watercraft
        </a>{" "}
        for the full decision matrix.
      </p>
    ),
  },
  {
    question: "Where's the closest dump point for my caravan?",
    iconKey: "Pin",
    answer: (
      <p>
        The Noosa Council maintains a free dump point at the
        Noosaville showgrounds. There is also a dump point at the
        Boreen Point campground on the North Shore (ferry required to
        access).{" "}
        <a
          href="https://www.noosa.qld.gov.au/Services-and-Facilities/Waste-and-recycling/Public-toilets"
          target="_blank"
          rel="noopener noreferrer"
          className="link text-ocean-700"
        >
          Council dump-point map →
        </a>
      </p>
    ),
  },
] as const;
