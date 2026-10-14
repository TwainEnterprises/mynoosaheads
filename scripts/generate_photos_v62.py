#!/usr/bin/env python3
"""
Generate src/data/photos.ts for v6.2 from Albert's verified v2 manifest.

Mechanical: loads the JSON manifest, builds the new TypeScript file
with all 62 records wired into the existing exports surface so
consumers (page.tsx, image-credits, CategoryPage, etc.) continue to
work unchanged.

Layout produced:
  - VERIFIED_PHOTOS: 62 CommonsPhoto records, all 4 tests pass
  - HERO: one photo per category + homepage + about
  - INLINE: 4 inline photos per category
  - HOMEPAGE_SECTIONS: featuredAreas (6) · thingsToDo (8) · whereToStay (6)
                       eatAndDrink (9) · webcams (4) · gettingHere (1)
  - ACCOMMODATION_PHOTOS: 9 sub-pages (hastings-street, noosaville,
                       sunshine-beach, tewantin, peregian, pet-friendly,
                       family, accessible, hinterland)
"""

import json
from pathlib import Path
from textwrap import dedent

MANIFEST = Path("/Users/twain/.openclaw/agents/albert/agent/output/mynoosaheads-photo-manifest-v2-2026-10-14.json")
OUT = Path("/Users/twain/Developer/mynoosaheads/src/data/photos.ts")


def load():
    return json.loads(MANIFEST.read_text())


def by_id(photos):
    return {p["id"]: p for p in photos}


# ---------------------------------------------------------------------------
# Slot allocation — which id goes in which export position.
# ---------------------------------------------------------------------------

# Homepage + About
HOMEPAGE_HERO_ID = "noosa-noosa-heads-landing-main-beach-04-20261014"
ABOUT_BRAND_ID = "noosa-noosa-heads-general-heads-lookout-2017-20261014"

# S3 Featured areas (6)
FEATURED_AREA_IDS = [
    "noosa-noosa-heads-landing-main-beach-08-20261014",   # Noosa Heads
    "noosa-hastings-street-hastings-2023-01-20261014",    # Hastings Street
    "noosa-noosaville-river-gympie-terrace-20261014",     # Noosaville
    "noosa-sunshine-beach-sunshine-slsc-20261014",        # Sunshine Beach
    "noosa-peregian-beach-peregian-shops-20261014",       # Peregian Beach
    "noosa-noosa-national-park-np-coastal-walk-trail-20261014",  # Noosa NP
]

# S4 Things to do (8)
THINGS_TO_DO_IDS = [
    "noosa-things-to-do-todo-surf-children-20261014",     # surf
    "noosa-things-to-do-todo-hike-hells-gates-20261014",  # hike
    "noosa-noosaville-river-noosa-ferry-crossing-20261014",  # river cruise
    "noosa-things-to-do-todo-markets-farmers-20261014",   # farmers market
    "noosa-things-to-do-todo-fish-angling-20261014",      # fishing
    "noosa-things-to-do-todo-sup-board-20261014",         # SUP
    "noosa-hinterland-pomona-cooran-cooroy-hinterland-mt-cooroora-20261014",  # hinterland
    "noosa-things-to-do-todo-kayak-canoe-20261014",       # kayak
]

# S5 Where to stay (6) — SVG fallbacks where Albert returned zero photos
WHERE_TO_STAY = [
    ("noosa-where-to-stay-stay-peppers-02-20261014",      "photo"),
    ("noosa-where-to-stay-stay-islander-2024-02-20261014", "photo"),
    ("sunshine-beach",                                     "svg"),  # SVG — no holiday house photo
    ("noosa-hinterland-pomona-cooran-cooroy-hinterland-pomona-memorial-20261014", "photo"),
    ("noosa-peregian-beach-peregian-shops-20261014",       "photo"),
    ("accessible",                                         "svg"),  # SVG — accessible unit typology
]

# S7 Eat & drink (9) — Phase 3 substitution: 9 verified-venue photos
EAT_AND_DRINK_IDS = [
    "noosa-eat-drink-eat-season-20261014",
    "noosa-eat-drink-eat-bang-bang-20261014",
    "noosa-eat-drink-eat-zibros-20261014",
    "noosa-eat-drink-eat-gusto-20261014",
    "noosa-eat-drink-eat-heads-of-noosa-20261014",
    "noosa-eat-drink-eat-boathouse-20261014",
    "noosa-eat-drink-eat-royal-mail-20261014",
    "noosa-eat-drink-eat-bistro-c-bar-20261014",
    "noosa-eat-drink-eat-locale-dining-20261014",
]

# S9 Webcams (4)
WEBCAM_IDS = [
    "noosa-noosa-heads-landing-main-beach-08-20261014",   # Main Beach
    "noosa-noosaville-river-noosa-ferry-crossing-20261014",  # Noosa Bar (river-mouth)
    "noosa-sunshine-beach-sunshine-slsc-20261014",        # Sunshine Beach
    "noosa-noosa-heads-landing-main-beach-04-20261014",   # North Shore curve
]

# S10 Getting here (1)
GETTING_HERE_ID = "noosa-boats-watercraft-boats-tewantin-ferry-20261014"

# CATEGORY_PHOTOS — category page heroes + 4 inline
CATEGORY_PHOTOS = {
    "surf-and-weather": {
        "hero_id": "noosa-noosa-heads-landing-main-beach-04-20261014",
        "inline_ids": [
            "noosa-noosa-heads-landing-main-beach-08-20261014",
            "noosa-noosa-heads-landing-slsc-2024-20261014",
            "noosa-noosa-heads-landing-slsc-building-2013-20261014",
            "noosa-noosa-heads-general-heads-panoramio-1982-20261014",
        ],
    },
    "noosa-national-park": {
        "hero_id": "noosa-noosa-national-park-np-hells-gates-20261014",
        "inline_ids": [
            "noosa-noosa-national-park-np-alexandria-bay-20261014",
            "noosa-noosa-national-park-np-coastal-walk-trail-20261014",
            "noosa-noosa-national-park-np-granite-bay-20261014",
            "noosa-noosa-national-park-np-tea-tree-bay-20261014",
        ],
    },
    "accommodation": {
        "hero_id": "noosa-hastings-street-hastings-nov-2013-20261014",
        "inline_ids": [
            "noosa-where-to-stay-stay-peppers-02-20261014",
            "noosa-where-to-stay-stay-sofitel-01-20261014",
            "noosa-where-to-stay-stay-french-quarter-20261014",
            "noosa-where-to-stay-stay-maison-20261014",
        ],
    },
    "things-to-do": {
        "hero_id": "noosa-noosaville-river-noosa-ferry-crossing-20261014",
        "inline_ids": [
            "noosa-things-to-do-todo-dine-bistro-c-20261014",
            "noosa-things-to-do-todo-sup-board-20261014",
            "noosa-things-to-do-todo-markets-farmers-20261014",
            "noosa-things-to-do-todo-swim-mainbeach-20261014",
        ],
    },
    "fishing-reports": {
        "hero_id": "noosa-fishing-fishing-angling-boat-20261014",
        "inline_ids": [
            "noosa-fishing-fishing-boat-shore-20261014",
            "noosa-noosaville-river-noosa-river-upstream-boathouse-20261014",
            "noosa-things-to-do-todo-fish-angling-20261014",
            "noosa-boats-watercraft-boats-boathouse-deck-20261014",
        ],
    },
    "boats-and-watercraft": {
        "hero_id": "noosa-boats-watercraft-boats-boathouse-deck-20261014",
        "inline_ids": [
            "noosa-boats-watercraft-boats-noosa-ferry-tg-20261014",
            "noosa-boats-watercraft-boats-tewantin-ferry-20261014",
            "noosa-noosaville-river-noosa-ferry-crossing-20261014",
            "noosa-eat-drink-eat-boathouse-20261014",
        ],
    },
    "travel-and-transport": {
        "hero_id": "noosa-noosaville-river-noosa-ferry-crossing-20261014",
        "inline_ids": [
            "noosa-boats-watercraft-boats-noosa-ferry-tg-20261014",
            "noosa-boats-watercraft-boats-tewantin-ferry-20261014",
            "noosa-noosaville-river-gympie-terrace-bridge-20261014",
            "noosa-fishing-fishing-boat-shore-20261014",
        ],
    },
    "webcams": {
        "hero_id": "noosa-noosa-heads-landing-main-beach-04-20261014",
        "inline_ids": [
            "noosa-noosa-heads-landing-main-beach-08-20261014",
            "noosa-noosa-heads-landing-slsc-2024-20261014",
            "noosa-noosa-heads-general-heads-lookout-2017-20261014",
            "noosa-noosa-national-park-np-coastal-walk-trail-20261014",
        ],
    },
}

# ACCOMMODATION_PHOTOS — sub-pages
ACCOMMODATION_PHOTOS = {
    "hastings-street": {
        "hero_id": "noosa-hastings-street-hastings-2023-01-20261014",
        "inline_ids": [
            "noosa-hastings-street-hastings-2023-02-20261014",
            "noosa-hastings-street-hastings-nov-2013-20261014",
            "noosa-hastings-street-hastings-queensland-04-20261014",
            "noosa-where-to-stay-stay-halse-lodge-20261014",
        ],
    },
    "noosaville": {
        "hero_id": "noosa-noosaville-river-noosa-boathouse-20261014",
        "inline_ids": [
            "noosa-noosaville-river-gympie-terrace-20261014",
            "noosa-noosaville-river-gympie-terrace-bridge-20261014",
            "noosa-noosaville-river-noosa-river-upstream-boathouse-20261014",
            "noosa-where-to-stay-stay-islander-2024-02-20261014",
        ],
    },
    "sunshine-beach": {
        "hero_id": "noosa-sunshine-beach-sunshine-slsc-20261014",
        "inline_ids": [
            "noosa-sunshine-beach-sunshine-external-deck-20261014",
            "noosa-sunshine-beach-sunshine-from-slsc-20261014",
            ("sunshine-beach", "svg"),  # SVG fallback for hero surface decorative
        ],
    },
    "tewantin": {
        "hero_id": "noosa-tewantin-tewantin-mainstreet-20261014",
        "inline_ids": [
            "noosa-eat-drink-eat-royal-mail-20261014",
            ("tewantin", "svg"),  # SVG scene — Tewantin ferry/marina
        ],
    },
    "peregian": {
        "hero_id": "noosa-peregian-beach-peregian-shops-20261014",
        "inline_ids": [
            "noosa-peregian-beach-peregian-114059-20261014",
            ("peregian", "svg"),  # SVG scene — Peregian village
        ],
    },
    "pet-friendly": {
        "hero_id": "noosa-cross-section-filters-xs-pet-dog-20261014",
        "inline_ids": [
            ("pet-friendly", "svg"),
        ],
    },
    "family": {
        "hero_id": "noosa-cross-section-filters-xs-family-sandcastle-20261014",
        "inline_ids": [
            ("family", "svg"),
        ],
    },
    "accessible": {
        "hero_id": "noosa-cross-section-filters-xs-accessible-boardwalk-20261014",
        "inline_ids": [
            ("accessible", "svg"),
        ],
    },
    "hinterland": {
        "hero_id": "noosa-hinterland-pomona-cooran-cooroy-hinterland-mt-cooroora-20261014",
        "inline_ids": [
            "noosa-hinterland-pomona-cooran-cooroy-hinterland-majestic-20261014",
            "noosa-hinterland-pomona-cooran-cooroy-hinterland-pomona-railway-20261014",
            "noosa-hinterland-pomona-cooran-cooroy-hinterland-pomona-memorial-20261014",
            ("hinterland", "svg"),
        ],
    },
}


# ---------------------------------------------------------------------------
# Code generation.
# ---------------------------------------------------------------------------

HEADER = '''/**
 * Location-photo mapping — v6.2 (MSN-2963-V6.2-PHOTOS-ILLUSTRATIONS,
 * 2026-10-14).
 *
 * v6.2 swaps the v6.1.1 curated inventory for **62 verified location-
 * specific open-licence photographs from Wikimedia Commons**, all
 * passing Albert's 4-test verification suite (visible Noosa landmark ·
 * EXIF GPS in the Noosa box · author caption matches file description ·
 * visible-content cross-check). Every record is sourced from Albert's
 * v2 photo manifest dated 2026-10-14. Zero commercial stock, zero
 * Unsplash, zero AI.
 *
 * Photo URL pattern: `https://upload.wikimedia.org/wikipedia/commons/...`
 *   - The next/image optimizer follows the upload.wikimedia.org hot-link
 *     (already allow-listed in next.config.mjs).
 *   - next/image handles width/height via the standard `sizes` slot.
 *
 * SVG fallbacks:
 *   - 33 illustrations in `src/components/illustrations/V6P1Fallbacks.tsx`,
 *     styled in editorial register (1.5px stroke, sea-glass palette,
 *     480×360 viewBox, 4:3). Each is a small scene, not a flat icon.
 *
 * Coverage map (per Albert v2 manifest, 2026-10-14):
 *   - FULL: noosa-heads-landing ×4 · noosa-heads-general ×2 ·
 *           hastings-street ×4 · noosaville-river ×5 · tewantin ×1 ·
 *           sunshine-beach ×3 · peregian-beach ×2 ·
 *           noosa-national-park ×5 · hinterland ×4 ·
 *           boats-watercraft ×3 · fishing ×2 · things-to-do ×8 ·
 *           where-to-stay ×6 · eat-drink ×9 · noosa-farmers-market ×1 ·
 *           cross-section-filters ×3 (TOTAL: 62 verified records).
 *   - GAP → SVG only: noosa-junction (Albert returned 0/1; covered by
 *           the Noosa Junction illustration in the fallback library).
 *   - GAP → SVG (typology): sunshine-beach holiday house (no
 *           open-licence holiday-house photo); accessible ground-floor
 *           unit (no open-licence accessible-accommodation photo).
 *
 * Per Albert's exclusion log: 2 dronepicr "Noosa Heads" files were
 * EXCLUDED — filename says "Noosa Heads" but EXIF GPS places them ~140
 * km north of Noosa (Test 2 fail). Filename + caption alone is not
 * enough. Pomona / Peregian perimeter-GPS records are flagged
 * 'perimeter-GPS' rather than FAIL because the visible subject is a
 * brief-listed Noosa landmark (Pomona Railway, Peregian Beach).
 *
 * Compliance: CC BY-SA 4.0 ×50 · CC BY-SA 3.0 ×6 · CC BY 4.0 ×4 ·
 *             CC BY 3.0 ×2. 0× CC-BY-NC / CC-BY-ND / commercial /
 *             Unsplash / AI.
 */

import type { FallbackSvgKey } from "@/components/illustrations/V6P1Fallbacks";

/* ----------------------------------------------------------------------
 * Photo kinds — discriminated union. Consumers use the
 * LocationPhoto wrapper component (src/components/ui/LocationPhoto.tsx)
 * to handle both kinds with a single API.
 * -------------------------------------------------------------------- */

export type CommonsPhoto = {
  /** Albert record id — stable across the v6.2 cycle. */
  id: string;
  kind: "commons";
  /** Editorial caption — rendered as figcaption / hero overlay text. */
  caption: string;
  /** Alt text for screen readers. */
  altText: string;
  /** Photographer / contributor name. */
  author: string;
  /** Licence — "CC BY-SA 4.0", "CC BY 2.0", "public domain", etc. */
  licence: string;
  /** Canonical source URL — the Wikimedia file page. */
  sourceUrl: string;
  /** Hot-link URL — upload.wikimedia.org. */
  url: string;
  /** Source resolution width in pixels. */
  width: number;
  /** Source resolution height in pixels. */
  height: number;
};

export type SvgPhoto = {
  kind: "svg";
  caption: string;
  altText: string;
  author: string;
  licence: "Bespoke SVG illustration";
  sourceUrl: string;
  svgKey: FallbackSvgKey;
  width: 480;
  height: 360;
};

export type LocationPhoto = CommonsPhoto | SvgPhoto;

/* ----------------------------------------------------------------------
 * 62 verified Commons records — Albert's v2 manifest, 2026-10-14.
 * All four tests pass (visible landmark · GPS · caption · content).
 * -------------------------------------------------------------------- */

export const VERIFIED_PHOTOS: readonly CommonsPhoto[] = [
'''


def to_record(p):
    return f'''  {{
    id: "{p["id"]}",
    kind: "commons",
    caption: {json.dumps(p["caption"])},
    altText: {json.dumps(p["altText"])},
    author: {json.dumps(p["author"])},
    licence: {json.dumps(p["licence"])},
    sourceUrl: {json.dumps(p["sourceUrl"])},
    url: {json.dumps(p["url"])},
    width: {p["width"]},
    height: {p["height"]},
  }},'''


def build_records(photos):
    return "\n".join(to_record(p) for p in photos)


def by_id_helper(photos):
    lines = []
    for p in photos:
        lines.append(f'  "{p["id"]}": {{')
        lines.append(f'    id: "{p["id"]}",')
        lines.append(f'    kind: "commons",')
        lines.append(f'    caption: {json.dumps(p["caption"])},')
        lines.append(f'    altText: {json.dumps(p["altText"])},')
        lines.append(f'    author: {json.dumps(p["author"])},')
        lines.append(f'    licence: {json.dumps(p["licence"])},')
        lines.append(f'    sourceUrl: {json.dumps(p["sourceUrl"])},')
        lines.append(f'    url: {json.dumps(p["url"])},')
        lines.append(f'    width: {p["width"]},')
        lines.append(f'    height: {p["height"]},')
        lines.append(f'  }},')
    return "\n".join(lines)


def lookup_table(photos):
    """Build a `const PHOTOS_BY_ID: Record<string, CommonsPhoto> = {…}` table.

    Each entry is keyed by the Albert record id, so consumers can use
    `PHOTOS_BY_ID[id]` to retrieve a record. The function emits the
    opening and closing braces itself, so callers only need to
    concat the entries between them.
    """
    return by_id_helper(photos)


# ---------------------------------------------------------------------------
# SVG fallback captions/alt — kept here to stay close to the data layer.
# ---------------------------------------------------------------------------

SVG_CATALOG = [
    # existing 10 — preserved
    ("sunshine-beach",
     "Sunshine Beach — the surf village south of the headland.",
     "Illustration of Sunshine Beach, the surf village south of Noosa Heads, with the headland in the background."),
    ("japanese-riverside",
     "Riverside Japanese — a low-slung timber building on the river",
     "Illustration of a riverside Japanese restaurant, low-slung timber building on pylons over the river."),
    ("beachfront-seafood",
     "Beachfront restaurant — open-sided dining on the sand",
     "Illustration of a beachfront restaurant with open-sided dining on the sand."),
    ("italian-hastings",
     "Italian restaurant — awning and footpath tables on the street",
     "Illustration of an Italian restaurant with an awning and footpath tables on the street."),
    ("asian-junction",
     "Laneway restaurant — casual South-east Asian on a Junction lane",
     "Illustration of a laneway restaurant, casual South-east Asian on a Junction lane with hanging lanterns."),
    ("seafood-hastings",
     "Modern seafood — white beachfront dining looking out to sea",
     "Illustration of a modern seafood restaurant with white beachfront dining looking out to sea."),
    ("italian-noosaville",
     "Riverside Italian — terracotta awning over outdoor tables",
     "Illustration of a riverside Italian restaurant with a terracotta awning over outdoor tables."),
    ("pet-friendly",
     "Pet-friendly — a dog on the beach at the off-leash hours",
     "Illustration of a pet-friendly Noosa beach, with a person and a dog silhouette during the off-leash hours."),
    ("family",
     "Family — a parent and child on the beach",
     "Illustration of a family-friendly Noosa beach, with a parent and child silhouette near the water."),
    ("accessible",
     "Accessible — step-free path to a ground-floor unit",
     "Illustration of an accessible ground-floor unit with a step-free ramp, wide doorway, and wheelchair access."),
    # new — 23 additions
    ("area-noosa-heads",
     "Noosa Heads — the coastal headland and surf-club arc",
     "Editorial illustration of the Noosa Heads coastal headland: the headland, Main Beach, and the surf club arc."),
    ("area-hastings-street",
     "Hastings Street — the boutique colonnade",
     "Editorial illustration of Hastings Street colonnade: parasol-lined boutique strip fronting Noosa Main Beach."),
    ("area-noosaville",
     "Noosaville — riverfront along Gympie Terrace",
     "Editorial illustration of Noosaville: the Noosa River, hire craft at the dock, and palm-fringed terrace."),
    ("area-tewantin",
     "Tewantin — the river town main street",
     "Editorial illustration of Tewantin main street: heritage pub facades, country-town awning, distant hill."),
    ("area-peregian",
     "Peregian Beach — the village square south of Sunshine",
     "Editorial illustration of Peregian Beach village square: surf-shop storefronts, pandanus, the village green."),
    ("area-noosa-national-park",
     "Noosa National Park — the headland walk",
     "Editorial illustration of the Noosa National Park headland walk: the coastal path, pandanus canopy, and rocky bays."),
    ("area-hinterland",
     "Hinterland — Mount Cooroora and the country town",
     "Editorial illustration of the Noosa hinterland: Mount Cooroora above Pomona, the timber country-town main street."),
    ("area-noosa-junction",
     "Noosa Junction — the local plaza",
     "Editorial illustration of Noosa Junction: the plaza, elm canopy, bus stop, and lane-café strip."),
    ("activity-surf",
     "Surf — longboard point break at First Bay",
     "Editorial illustration of a surfer on the longboard point break at First Bay, Noosa Main Beach."),
    ("activity-sup",
     "Stand-up paddle — calm-water hire at Noosaville",
     "Editorial illustration of a stand-up paddleboarder on the calm-water reach at Noosaville."),
    ("activity-kayak",
     "Kayak — the upper Noosa River",
     "Editorial illustration of a kayaker on the upper Noosa River, paperbark forest, glassy water."),
    ("activity-swim",
     "Swim — the lifeguard-tower bay",
     "Editorial illustration of a swimmer in the lifeguard-tower bay, Noosa Main Beach."),
    ("activity-hike",
     "Hike — the headland walk",
     "Editorial illustration of a hiker on the Noosa headland walk: coastal path, pandanus, rocky bays below."),
    ("activity-fishing",
     "Fishing — angling from a boat at the river mouth",
     "Editorial illustration of an angler fishing from a boat near the Noosa River mouth."),
    ("trip-romantic",
     "Romantic — sunset on the river",
     "Editorial illustration of a couple at sunset on the Noosa River: silhouetted jetty, golden-hour sky."),
    ("trip-budget",
     "Budget — picnic on the beach",
     "Editorial illustration of a budget Noosa day: picnic rug on the beach, hire-craft on the river in the distance."),
    ("trip-solo",
     "Solo — quiet morning on the headland",
     "Editorial illustration of a solo traveller on the Noosa headland walk at dawn."),
    ("trip-group",
     "Group — friends on a river cruise",
     "Editorial illustration of a group of friends on a Noosa River cruise, sunset over the river."),
    ("trip-business",
     "Business — Hastings Street morning meeting",
     "Editorial illustration of a business meeting at a Hastings Street café, parasol boards above."),
    ("tewantin",
     "Tewantin — river town ferry stop",
     "Editorial illustration of the Tewantin ferry landing: ferry at the marina, Noosa River upstream."),
    ("peregian",
     "Peregian — the village surf-front",
     "Editorial illustration of Peregian Beach village surf-front: shopfronts, dunes, the beach path."),
    ("hinterland",
     "Hinterland — country town beneath the volcanic peak",
     "Editorial illustration of a Noosa hinterland country town beneath the volcanic peak."),
    ("cross-section-pets",
     "Pet-friendly — verify each operator's pet policy",
     "Editorial illustration of pet-friendly accommodation: a fenced holiday yard and a coastal path."),
]


def main():
    photos = load()
    assert len(photos) == 62, f"expected 62, got {len(photos)}"

    parts = []
    parts.append(HEADER)

    # Record table
    parts.append(build_records(photos))
    parts.append("] as const;\n")

    parts.append(dedent('''
/* ----------------------------------------------------------------------
 * Lookup table — keyed by record id, for clean export wiring.
 * -------------------------------------------------------------------- */

const PHOTOS_BY_ID = {
'''))
    parts.append(lookup_table(photos))
    parts.append("} as const;\n")

    parts.append(dedent('''
/** Look up a verified Commons record by its Albert id. Throws if missing. */
const get = (id: string): CommonsPhoto => {
  const found = PHOTOS_BY_ID[id as keyof typeof PHOTOS_BY_ID];
  if (!found) throw new Error(`Missing verified photo: ${id}`);
  return found;
};

/* ----------------------------------------------------------------------
 * SVG-fallback constructor — caption + altText travel with the key.
 * Keeps the editorial copy close to the data layer.
 * -------------------------------------------------------------------- */

const SVG_CAPTIONS: Record<string, { caption: string; altText: string }> = {
'''))
    for key, cap, alt in SVG_CATALOG:
        parts.append(f'  "{key}": {{ caption: {json.dumps(cap)}, altText: {json.dumps(alt)} }},\n')
    parts.append("} as const;\n")

    parts.append(dedent('''
const svg = (key: FallbackSvgKey): SvgPhoto => {
  const meta = SVG_CAPTIONS[key];
  if (!meta) throw new Error(`Missing SVG fallback: ${key}`);
  return {
    kind: "svg",
    caption: meta.caption,
    altText: meta.altText,
    author: "MyNoosaHeads editorial illustration",
    licence: "Bespoke SVG illustration",
    sourceUrl: "/image-credits#fallbacks",
    svgKey: key,
    width: 480,
    height: 360,
  };
};

/* ----------------------------------------------------------------------
 * HERO + INLINE exports — same surface as v6.1.1 so consumers don't
 * change. Roles are described in the caption; reuse is intentional.
 * -------------------------------------------------------------------- */

const HERO = {
  homepage: get("''' + HOMEPAGE_HERO_ID + '''"),
  about: get("''' + ABOUT_BRAND_ID + '''"),
  surf: get("noosa-noosa-heads-landing-main-beach-04-20261014"),
  noosaNationalPark: get("noosa-noosa-national-park-np-hells-gates-20261014"),
  accommodation: get("noosa-hastings-street-hastings-nov-2013-20261014"),
  thingsToDo: get("noosa-noosaville-river-noosa-ferry-crossing-20261014"),
  fishingReports: get("noosa-fishing-fishing-angling-boat-20261014"),
  boatsAndWatercraft: get("noosa-boats-watercraft-boats-boathouse-deck-20261014"),
  travelAndTransport: get("noosa-noosaville-river-noosa-ferry-crossing-20261014"),
  webcams: get("noosa-noosa-heads-landing-main-beach-04-20261014"),
} as const;
'''))

    # CATEGORY_PHOTOS
    parts.append(dedent('''
/* ----------------------------------------------------------------------
 * Category page photos — one hero + four inline per category.
 * -------------------------------------------------------------------- */

export const CATEGORY_PHOTOS: Record<string, { hero: LocationPhoto; inline: LocationPhoto[] }> = {
'''))
    for slug, slot in CATEGORY_PHOTOS.items():
        parts.append(f'  "{slug}": {{\n')
        parts.append(f'    hero: get("{slot["hero_id"]}"),\n')
        parts.append(f'    inline: [\n')
        for pid in slot["inline_ids"]:
            parts.append(f'      get("{pid}"),\n')
        parts.append(f'    ],\n')
        parts.append(f'  }},\n')
    parts.append("};\n")

    # HOMEPAGE_HERO and HOMEPAGE_SECTIONS
    parts.append(dedent(f'''
/* ----------------------------------------------------------------------
 * Homepage hero + section photos.
 * -------------------------------------------------------------------- */

export const HOMEPAGE_HERO: LocationPhoto = HERO.homepage;

const FEATURED_AREAS: LocationPhoto[] = [
'''))
    for pid in FEATURED_AREA_IDS:
        parts.append(f'  get("{pid}"),\n')
    parts.append("];\n\n")

    parts.append("const THINGS_TO_DO_RAIL: LocationPhoto[] = [\n")
    for pid in THINGS_TO_DO_IDS:
        parts.append(f'  get("{pid}"),\n')
    parts.append("];\n\n")

    parts.append("const WHERE_TO_STAY_RAIL: LocationPhoto[] = [\n")
    for item, kind in WHERE_TO_STAY:
        if kind == "svg":
            parts.append(f'  svg("{item}"),\n')
        else:
            parts.append(f'  get("{item}"),\n')
    parts.append("];\n\n")

    parts.append("const EAT_AND_DRINK_RAIL: LocationPhoto[] = [\n")
    for pid in EAT_AND_DRINK_IDS:
        parts.append(f'  get("{pid}"),\n')
    parts.append("];\n\n")

    parts.append("const WEBCAM_TILES: LocationPhoto[] = [\n")
    for pid in WEBCAM_IDS:
        parts.append(f'  get("{pid}"),\n')
    parts.append("];\n\n")

    parts.append(f'const GETTING_HERE: LocationPhoto = get("{GETTING_HERE_ID}");\n')

    parts.append(dedent('''
export const HOMEPAGE_FEATURED_AREAS = FEATURED_AREAS;
export const HOMEPAGE_THINGS_TO_DO = THINGS_TO_DO_RAIL;
export const HOMEPAGE_WHERE_TO_STAY = WHERE_TO_STAY_RAIL;
export const HOMEPAGE_EAT_AND_DRINK = EAT_AND_DRINK_RAIL;
export const HOMEPAGE_WEBCAM_TILES = WEBCAM_TILES;

export type HomepageSectionPhotos = {
  featuredAreas: readonly LocationPhoto[];
  thingsToDo: readonly LocationPhoto[];
  whereToStay: readonly LocationPhoto[];
  eatAndDrink: readonly LocationPhoto[];
  webcams: readonly LocationPhoto[];
  gettingHere: LocationPhoto;
};

export const HOMEPAGE_SECTIONS: HomepageSectionPhotos = {
  featuredAreas: FEATURED_AREAS,
  thingsToDo: THINGS_TO_DO_RAIL,
  whereToStay: WHERE_TO_STAY_RAIL,
  eatAndDrink: EAT_AND_DRINK_RAIL,
  webcams: WEBCAM_TILES,
  gettingHere: GETTING_HERE,
};

/* ----------------------------------------------------------------------
 * About brand image — quieter than the homepage hero.
 * -------------------------------------------------------------------- */

export const ABOUT_BRAND_IMAGE: LocationPhoto = HERO.about;

/* ----------------------------------------------------------------------
 * Accommodation sub-page photos.
 * -------------------------------------------------------------------- */

export const ACCOMMODATION_PHOTOS: Record<
  string,
  { hero: LocationPhoto; inline: LocationPhoto[] }
> = {
'''))

    for slug, slot in ACCOMMODATION_PHOTOS.items():
        parts.append(f'  "{slug}": {{\n')
        parts.append(f'    hero: get("{slot["hero_id"]}"),\n')
        parts.append(f'    inline: [\n')
        for item in slot["inline_ids"]:
            if isinstance(item, tuple):
                key, _ = item
                parts.append(f'      svg("{key}"),\n')
            else:
                parts.append(f'      get("{item}"),\n')
        parts.append(f'    ],\n')
        parts.append(f'  }},\n')
    parts.append("};\n")

    parts.append(dedent('''
/* ----------------------------------------------------------------------
 * Re-exports for backwards compatibility — v6.1.1 callers.
 * -------------------------------------------------------------------- */

export const HOMEPAGE_GETTING_HERE = GETTING_HERE;
'''))

    OUT.write_text("".join(parts))
    print(f"Wrote {OUT} ({OUT.stat().st_size} bytes, {len(photos)} verified records)")


if __name__ == "__main__":
    main()