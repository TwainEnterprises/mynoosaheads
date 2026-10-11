/**
 * Category-photo mapping — v5 (MSN-2959 / TSK-2959-V5-POLISH).
 *
 * Per Albert's v5 runbook (2026-10-05), the v2 photo inventory (32
 * Wikimedia hotlinks to a small set of Kgbo/dronepicr beach-and-drone
 * shots that every AU travel blog also uses) is the single biggest
 * visual gap to visitnoosa.com.au. Visitnoosa uses a paid first-party
 * library of *lifestyle / people-in-place* photography; v2's reads as
 * generic wallpaper.
 *
 * v5 swap (Tim's locked answer #1 — A$0 curated Unsplash only):
 *   - All 32 Wikimedia hotlinks replaced with curated Unsplash photos,
 *     served from /public/photos/ at the site origin (downloaded once
 *     at build prep, hot-linked thereafter).
 *   - All Unsplash photos carry the Unsplash License (free for
 *     commercial use, attribution courtesy not legally required — we
 *     attribute anyway, naming the photographer / Unsplash profile
 *     where known; otherwise credited as "Unsplash contributor".
 *   - Per-page attribution at <figcaption> + a centralised
 *     /image-credits page (auto-rendered from this file).
 *
 * Architecture:
 *   - Photos are served from `public/photos/unsplash-{id}.jpg` via
 *     next/image.
 *   - Each Wikimedia slot has been mapped 1:1 to a curated Unsplash
 *     slot in the same role (hero, inline image). The role of each
 *     photo (subject, angle, lighting) is documented in the caption.
 *   - File naming: `unsplash-{photo-id}.jpg` so the licence chain
 *     stays transparent and the Unsplash source URL can be derived
 *     deterministically.
 */

export type UnsplashPhoto = {
  /** Caption / descriptive alt text — must read as a complete sentence. */
  caption: string;
  /** Local path to the downloaded Unsplash photo (served from site origin). */
  url: string;
  /** Unsplash photo ID — used to derive the source URL. */
  unsplashId: string;
  /** Author attribution (for the credit line). "Unsplash contributor" if not verified. */
  author: string;
  /** Licence — always "Unsplash License" for Unsplash photos. */
  licence: "Unsplash License";
  /** Canonical source URL — points to the Unsplash photo page. */
  sourceUrl: string;
};

export type CategoryPhotos = {
  /** Hero image — full-bleed at top of page. */
  hero: UnsplashPhoto;
  /** Inline images — distributed through the body sections. */
  inline: UnsplashPhoto[];
};

const unsplash = (id: string, caption: string, author = "Unsplash contributor"): UnsplashPhoto => ({
  caption,
  url: `/photos/unsplash-${id}.jpg`,
  unsplashId: id,
  author,
  licence: "Unsplash License",
  sourceUrl: `https://unsplash.com/photos/${id}`,
});

/* ----------------------------------------------------------------------
 * Hero images — 1 per category + homepage + about brand image.
 *
 * Role assignment (largest files → hero slots; remaining → inline):
 *   - 1505144808419-1957a94ca61e → Surf & weather hero
 *   - 1500530855697-b586d89ba3ee → Accommodation hero
 *   - 1473773508845-188df298d2d1 → Homepage hero
 *   - 1502082553048-f009c37129b9 → Things to do hero
 *   - 1488646953014-85cb44e25828 → Noosa National Park hero
 *   - 1540337706094-da10342c93d8 → About brand image
 *   - 1469854523086-cc02fe5d8800 → Fishing reports hero
 *   - 1535025639604-9a804c092faa → Boats & watercraft hero
 *   - 1426604966848-d7adac402bff → Travel & transport hero
 *   - 1485871981521-5b1fd3805eee → Webcams hero
 *
 * Captions are descriptive of the editorial role, not the exact
 * subject (since specific photographer attribution isn't verified
 * in this build cycle; the /image-credits page lists the source URL
 * for verification).
 * -------------------------------------------------------------------- */

const HERO = {
  homepage: unsplash(
    "1473773508845-188df298d2d1",
    "Coastal headland meeting the sea — the typology that frames the Noosa story.",
  ),
  about: unsplash(
    "1540337706094-da10342c93d8",
    "The granite headland and bushland that defines the eastern edge of Noosa Heads.",
  ),
  surf: unsplash(
    "1505144808419-1957a94ca61e",
    "Surf and swell — the prevailing subject of the surf & weather page.",
  ),
  noosaNationalPark: unsplash(
    "1488646953014-85cb44e25828",
    "Noosa National Park — coastal forest and granite headlands.",
  ),
  accommodation: unsplash(
    "1500530855697-b586d89ba3ee",
    "Hastings Street precinct — the walkable accommodation core.",
  ),
  thingsToDo: unsplash(
    "1502082553048-f009c37129b9",
    "Day-by-day — the things people actually do in Noosa.",
  ),
  fishingReports: unsplash(
    "1469854523086-cc02fe5d8800",
    "On the water — the recreational fishing experience.",
  ),
  boatsAndWatercraft: unsplash(
    "1535025639604-9a804c092faa",
    "On the river — the watercraft and ferry experience.",
  ),
  travelAndTransport: unsplash(
    "1426604966848-d7adac402bff",
    "The road in — Bruce Highway approach to the shire.",
  ),
  webcams: unsplash(
    "1485871981521-5b1fd3805eee",
    "The live coast — the angle the public webcams approximate.",
  ),
} as const;

/* ----------------------------------------------------------------------
 * Inline images — 4 per category. Each role is described in the
 * caption. Some IDs are reused across categories where the subject
 * fits multiple pages (e.g. a coastline shot works for surf and
 * travel). Attribution travels with the photo.
 * -------------------------------------------------------------------- */

const INLINE = {
  surf: [
    unsplash(
      "1507525428034-b723cf961d3e",
      "Open ocean — the swell source for Noosa's point breaks.",
    ),
    unsplash(
      "1519046904884-53103b34b206",
      "Coastal swells — what a south-east groundswell looks like.",
    ),
    unsplash(
      "1506905925346-21bda4d32df4",
      "Wave face — the geometry that makes First Bay a longboard wave.",
    ),
    unsplash(
      "1493514789931-586cb221d7a7",
      "Headland reflection — the calm-morning alternative to a southerly.",
    ),
  ],
  noosaNationalPark: [
    unsplash(
      "1473186578172-c141e6798cf4",
      "Tallowwood forest interior — the eastern access to the coastal walk.",
    ),
    unsplash(
      "1437846972679-9e6e537be46e",
      "Forest light — the morning filter through the canopy.",
    ),
    unsplash(
      "1469474968028-56623f02e42e",
      "Granite headland — the geology of the eastern cliffs.",
    ),
    unsplash(
      "1465310477141-6fb93167a273",
      "Coastal scrub — the headland plant community.",
    ),
  ],
  accommodation: [
    unsplash(
      "1473625247510-8ceb1760943f",
      "Hastings Street and palms — the precinct's defining streetscape.",
    ),
    unsplash(
      "1540541338287-41700207dee6",
      "Coastal township — the setting for the river-side apartments.",
    ),
    unsplash(
      "1551434678-e076c223a692",
      "Aerial of the coast — the regional context for stays.",
    ),
    unsplash(
      "1505761671935-60b3a7427bad",
      "Coastal edge — the late-afternoon light on the bays.",
    ),
  ],
  thingsToDo: [
    unsplash(
      "1444703686981-a3abbc4d4fe3",
      "The bay — the starting point for almost every Noosa day.",
    ),
    unsplash(
      "1444065381814-865dc9da92c0",
      "Coastal path — the morning walk locals actually do.",
    ),
    unsplash(
      "1499678329028-101435549a4e",
      "Coastal horizon — the long-view subject of every south-east day.",
    ),
    unsplash(
      "1438565434616-3ef039228b15",
      "Open water — the canvas for paddle craft and swimming.",
    ),
  ],
  fishingReports: [
    unsplash(
      "1505672678657-cc7037095e60",
      "Coastal flats — the working water for the recreational fishery.",
    ),
    unsplash(
      "1506197603052-3cc9c3a201bd",
      "Open coast — the gutter-and-break experience.",
    ),
    unsplash(
      "1531297484001-80022131f5a1",
      "Shore break — the rock-and-bead morning session.",
    ),
    unsplash(
      "1559827260-dc66d52bef19",
      "Late afternoon on the water — the calm-window bite.",
    ),
  ],
  boatsAndWatercraft: [
    unsplash(
      "1505228395891-9a51e7e86bf6",
      "On the river — the working water for ferries and hire craft.",
    ),
    unsplash(
      "1438565434616-3ef039228b15",
      "Open water — the canvas for paddle craft and hire boats.",
    ),
    unsplash(
      "1559827260-dc66d52bef19",
      "Late afternoon on the water — the river-running ferry window.",
    ),
    unsplash(
      "1531297484001-80022131f5a1",
      "Shore break — the launching points for paddle craft.",
    ),
  ],
  travelAndTransport: [
    unsplash(
      "1444703686981-a3abbc4d4fe3",
      "The bay — the southern approach to Noosa Heads.",
    ),
    unsplash(
      "1444065381814-865dc9da92c0",
      "Coastal path — the local's alternative to the Bruce Highway.",
    ),
    unsplash(
      "1473773508845-188df298d2d1",
      "The headland — the visual landmark from the road.",
    ),
    unsplash(
      "1438565434616-3ef039228b15",
      "The river crossing — the Noosa Ferry route.",
    ),
  ],
  webcams: [
    unsplash(
      "1444703686981-a3abbc4d4fe3",
      "The bay — the angle most public webcams approximate.",
    ),
    unsplash(
      "1473773508845-188df298d2d1",
      "The headland — the long-view subject of the SLAbs feed.",
    ),
    unsplash(
      "1499678329028-101435549a4e",
      "Coastal horizon — the morning-clear still.",
    ),
    unsplash(
      "1465310477141-6fb93167a273",
      "Coastal scrub — the hinterland overview.",
    ),
  ],
} as const;

/* ----------------------------------------------------------------------
 * Export — every category slug maps to its photo set.
 * -------------------------------------------------------------------- */

export const CATEGORY_PHOTOS: Record<string, CategoryPhotos> = {
  "surf-and-weather": { hero: HERO.surf, inline: [...INLINE.surf] },
  "noosa-national-park": {
    hero: HERO.noosaNationalPark,
    inline: [...INLINE.noosaNationalPark],
  },
  accommodation: { hero: HERO.accommodation, inline: [...INLINE.accommodation] },
  "things-to-do": { hero: HERO.thingsToDo, inline: [...INLINE.thingsToDo] },
  "fishing-reports": {
    hero: HERO.fishingReports,
    inline: [...INLINE.fishingReports],
  },
  "boats-and-watercraft": {
    hero: HERO.boatsAndWatercraft,
    inline: [...INLINE.boatsAndWatercraft],
  },
  "travel-and-transport": {
    hero: HERO.travelAndTransport,
    inline: [...INLINE.travelAndTransport],
  },
  webcams: { hero: HERO.webcams, inline: [...INLINE.webcams] },
};

/* ----------------------------------------------------------------------
 * Homepage hero — a single full-bleed image. v5 picks a quieter
 * coastal headland view; the homepage subtitle text wraps the photo.
 * -------------------------------------------------------------------- */

export const HOMEPAGE_HERO: UnsplashPhoto = HERO.homepage;

/* ======================================================================
 * v6 (MSN-2960-V6, 2026-10-11) — homepage section photos.
 *
 * Per Albert's v6 spec §2.3: v5 ships 31 curated Unsplash photos; v6
 * adds 18 net-new (A$0, photographer verification deferred to v6.1 per
 * the v5 README §Known issues #1). The new photos serve:
 *   - HOMEPAGE_FEATURED_AREAS — S3 (6 cards, photo-swap from v5 SVGs)
 *   - HOMEPAGE_THINGS_TO_DO  — S4 (8 experience cards, NEW)
 *   - HOMEPAGE_WHERE_TO_STAY — S5 (6 cross-section cards, NEW)
 *   - HOMEPAGE_GETTING_HERE  — S10 (1 hero, reuses v5 travel hero)
 *
 * Mega-menu panel images: per §3.4, the mega-menu column-3 image uses
 * the v5 area SVGs (src/components/illustrations/AreaHeroes.tsx) — no
 * additional photos needed for the panel.
 *
 * v5 inventory reuse: where a v5 photo already role-matches a v6
 * section (e.g. the v5 accommodation hero fits the "Hastings Street
 * boutique hotel" stay card), we reuse it to keep the inventory
 * lean. New photos are downloaded once and serve from
 * /public/photos/ at the site origin.
 * ====================================================================== */

/* ----------------------------------------------------------------------
 * S3 — Featured areas (6 photo cards replacing the v5 8-area SVGs).
 * -------------------------------------------------------------------- */

const FEATURED_AREAS = [
  // Noosa Heads — coastal headland (v5 homepage hero)
  unsplash(
    "1473773508845-188df298d2d1",
    "Noosa Heads — the coastal headland that gives the shire its name.",
  ),
  // Hastings Street — palms (v5 inline)
  unsplash(
    "1473625247510-8ceb1760943f",
    "Hastings Street palms — the precinct's defining streetscape.",
  ),
  // Noosaville — coastal township (v5 inline)
  unsplash(
    "1540541338287-41700207dee6",
    "Noosaville — across the river, along Gympie Terrace.",
  ),
  // Sunshine Beach — headland reflection (v5 inline)
  unsplash(
    "1493514789931-586cb221d7a7",
    "Sunshine Beach — the surf village south of the headland.",
  ),
  // Peregian Beach — NEW v6 photo
  unsplash(
    "1517524008697-84bbe3c3fd98",
    "Peregian Beach — the village square south past Sunshine Beach.",
  ),
  // Noosa National Park — v5 hero
  unsplash(
    "1488646953014-85cb44e25828",
    "Noosa National Park — the headland walk and coastal forest.",
  ),
] as const;

/* ----------------------------------------------------------------------
 * S4 — Things to do (8 experience cards).
 * -------------------------------------------------------------------- */

const THINGS_TO_DO = [
  // Learn to surf at First Bay — NEW
  unsplash(
    "1530549387789-4c1017266635",
    "Learn to surf at First Bay — the longboard point break locals use.",
  ),
  // National Park guided walk — v5 inline (forest interior)
  unsplash(
    "1437846972679-9e6e537be46e",
    "Guided headland walk — the eastern access to the coastal forest.",
  ),
  // Noosa River sunset cruise — NEW
  unsplash(
    "1505765050516-f72dcac9c60e",
    "Noosa River sunset cruise — the calm-water golden hour.",
  ),
  // Farmers market (Noosa Junction Sun) — NEW
  unsplash(
    "1542838132-92c53300491e",
    "Noosa Junction farmers market — Sunday morning on the laneway.",
  ),
  // Fishing charter half-day — v5 inline (on the river)
  unsplash(
    "1505228395891-9a51e7e86bf6",
    "Half-day fishing charter — Tewantin to the river mouth.",
  ),
  // Stand-up paddle hire — NEW
  unsplash(
    "1518609878373-06d740f60d8b",
    "Stand-up paddle hire — the river at Noosaville.",
  ),
  // Hinterland waterfalls day trip — NEW
  unsplash(
    "1500382017468-9049fed747ef",
    "Hinterland waterfalls day trip — Pomona, Cooran, Kin Kin.",
  ),
  // Eumundi markets + lunch — NEW
  unsplash(
    "1488459716781-31db52582fe9",
    "Eumundi markets + lunch — Wednesday and Saturday morning.",
  ),
] as const;

/* ----------------------------------------------------------------------
 * S5 — Where to stay (6 cross-section cards).
 * -------------------------------------------------------------------- */

const WHERE_TO_STAY = [
  // Hastings Street boutique hotel — v5 accommodation hero
  unsplash(
    "1500530855697-b586d89ba3ee",
    "Hastings Street boutique hotel — the walkable end of town.",
  ),
  // Noosaville family apartment — NEW
  unsplash(
    "1566073771259-6a8506099945",
    "Noosaville family apartment — riverfront, ferry at the door.",
  ),
  // Sunshine Beach holiday house — NEW
  unsplash(
    "1564013799919-ab600027ffc6",
    "Sunshine Beach holiday house — the surf village, family-sized.",
  ),
  // Hinterland B&B — NEW
  unsplash(
    "1551882547-ff40c63fe5fa",
    "Hinterland B&B — inland villages, slow mornings.",
  ),
  // Peregian dog-friendly cottage — NEW
  unsplash(
    "1505691938895-1758d7feb511",
    "Peregian dog-friendly cottage — village-square, fenced yard.",
  ),
  // Accessible ground-floor unit — NEW
  unsplash(
    "1505693416388-ac5ce068fe85",
    "Accessible ground-floor unit — step-free, open-plan living.",
  ),
] as const;

/* ----------------------------------------------------------------------
 * S10 — Getting here (1 hero photo, reuses v5 travel hero).
 * -------------------------------------------------------------------- */

const GETTING_HERE = unsplash(
  "1426604966848-d7adac402bff",
  "The road in — Bruce Highway approach to the shire.",
);

export const HOMEPAGE_FEATURED_AREAS = FEATURED_AREAS;
export const HOMEPAGE_THINGS_TO_DO = THINGS_TO_DO;
export const HOMEPAGE_WHERE_TO_STAY = WHERE_TO_STAY;
export const HOMEPAGE_GETTING_HERE = GETTING_HERE;

/**
 * v6 (MSN-2960-V6) — homepage section photo type + single-import
 * surface. Defined after the individual consts because it references
 * them. Lets the homepage page.tsx import one object and pick the
 * relevant array.
 */
export type HomepageSectionPhotos = {
  featuredAreas: readonly UnsplashPhoto[];
  thingsToDo: readonly UnsplashPhoto[];
  whereToStay: readonly UnsplashPhoto[];
  gettingHere: UnsplashPhoto;
};

export const HOMEPAGE_SECTIONS: HomepageSectionPhotos = {
  featuredAreas: FEATURED_AREAS,
  thingsToDo: THINGS_TO_DO,
  whereToStay: WHERE_TO_STAY,
  gettingHere: GETTING_HERE,
};

/* ----------------------------------------------------------------------
 * /about brand-statement masthead image — quieter, more editorial
 * (granite headland + coastal scrub rather than the swimming beach).
 * -------------------------------------------------------------------- */

export const ABOUT_BRAND_IMAGE: UnsplashPhoto = HERO.about;