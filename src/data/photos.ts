/**
 * Location-photo mapping — v6.1.1 (MSN-2962-V6.1.1-PHOTO-INTEGRATION,
 * 2026-10-12).
 *
 * v6.1.1 swaps the v5/v6 curated Unsplash inventory for **42 verified
 * location-specific open-licence photographs from Wikimedia Commons,
 * the State Library of Queensland, and Flickr-CC imports**, with
 * bespoke SVG fallbacks for the seven locations that have no
 * open-licence photo at all (Sunshine Beach, six named eat & drink
 * venues, three cross-section filters).
 *
 * Per Albert's photo manifest (2026-10-12):
 *   - All Wikimedia photos verified by file page + camera GPS + licence
 *     template (no NC, no ND).
 *   - Licence distribution: CC-BY-SA 4.0 ×28 · CC-BY 2.0 ×6 ·
 *     CC-BY 2.0 (Flickr→Commons) ×4 · public domain ×3 · CC0 1.0 ×1.
 *   - 7 bespoke SVGs replace locations with no open-licence photo
 *     (Sunshine Beach, six named eat & drink venues, three cross-
 *     section filters).
 *
 * Photo URL pattern: `https://commons.wikimedia.org/wiki/Special:FilePath/{filename}?width=1920`
 *   - Special:FilePath is Wikimedia's canonical redirect to the
 *     upload.wikimedia.org hot-link. The next/image optimizer follows
 *     the redirect and caches the result.
 *   - `?width=1920` requests a thumbnail at 1920px wide, which the
 *     next/image optimizer can resize further for each `sizes` slot.
 *   - The next.config.mjs `remotePatterns` already allows
 *     `upload.wikimedia.org` (kept from the v2 hot-link era; the
 *     remote pattern is stable across the v5 → v6.1.1 cycle).
 *
 * SVG fallbacks:
 *   - 10 illustrations in `src/components/illustrations/V6P1Fallbacks.tsx`,
 *     styled consistent with v5 AreaHeroes (1.5px stroke, sea-glass
 *     palette, 480×360 viewBox, 4:3).
 *   - Inlined into the DOM (no HTTP round-trip), with role="img" +
 *     aria-label = the photo's altText.
 *   - NOT branded imitations of the named venues — generic
 *     venue-typology illustrations (e.g. "riverside Japanese" for
 *     Wasabi, "laneway restaurant" for Sum Yung Guys).
 *
 * Coverage map:
 *   - FULL: Noosa Heads · Hastings Street · Noosaville · Tewantin ·
 *           Noosa National Park (gateway) · Boats & watercraft ·
 *           Fishing · Things to do (8/8) · Hinterland ·
 *           Noosa Farmers Market.
 *   - PARTIAL: Peregian Beach (one photo, reused with different
 *              objectPosition crops).
 *   - GAP → SVG: Sunshine Beach · Wasabi · Sails · Berardo's ·
 *                Sum Yung Guys · Bistro C · Locale ·
 *                Pet-friendly · Family · Accessible.
 */

import type { FallbackSvgKey } from "@/components/illustrations/V6P1Fallbacks";

/* ----------------------------------------------------------------------
 * Photo kinds — discriminated union. Consumers should use the
 * LocationPhoto wrapper component (src/components/ui/LocationPhoto.tsx)
 * to handle both kinds with a single API.
 * -------------------------------------------------------------------- */

export type CommonsPhoto = {
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
  /** Hot-link URL — upload.wikimedia.org via Special:FilePath. */
  url: string;
  /** Source resolution width in pixels (for next/image width/height). */
  width: number;
  /** Source resolution height in pixels. */
  height: number;
};

export type SvgPhoto = {
  kind: "svg";
  /** Editorial caption. */
  caption: string;
  /** Alt text for screen readers. */
  altText: string;
  /** Author / illustration credit. */
  author: string;
  /** Licence — always "Bespoke SVG illustration" for SVG fallbacks. */
  licence: "Bespoke SVG illustration";
  /** Source — the /image-credits page entry. */
  sourceUrl: string;
  /** Reference to the SVG component in V6P1Fallbacks. */
  svgKey: FallbackSvgKey;
  /** Standard viewBox width. */
  width: 480;
  /** Standard viewBox height. */
  height: 360;
};

export type LocationPhoto = CommonsPhoto | SvgPhoto;

/* ----------------------------------------------------------------------
 * Helpers — small constructors for each kind.
 * -------------------------------------------------------------------- */

const commons = (
  filename: string,
  author: string,
  licence: string,
  caption: string,
  altText: string,
  width: number,
  height: number,
  filePageUrl?: string,
): CommonsPhoto => {
  const encoded = encodeURIComponent(filename);
  return {
    kind: "commons",
    caption,
    altText,
    author,
    licence,
    sourceUrl:
      filePageUrl ??
      `https://commons.wikimedia.org/wiki/File:${filename.replace(/ /g, "_")}`,
    url: `https://commons.wikimedia.org/wiki/Special:FilePath/${encoded}?width=1920`,
    width,
    height,
  };
};

const svg = (
  svgKey: FallbackSvgKey,
  caption: string,
  altText: string,
): SvgPhoto => ({
  kind: "svg",
  caption,
  altText,
  author: "MyNoosaHeads editorial illustration",
  licence: "Bespoke SVG illustration",
  sourceUrl: "/image-credits#fallbacks",
  svgKey,
  width: 480,
  height: 360,
});

/* ----------------------------------------------------------------------
 * HERO photos — one per category + homepage + about brand image.
 *
 * Role assignment (largest / most representative file → hero slot):
 *   - dronepicr 2009 aerial       → Homepage hero + About brand
 *   - Kgbo Noosa Main Beach 2020  → Surf hero + S3 featured areas
 *   - Kgbo Weyba Creek            → Noosa National Park hero (gateway)
 *   - Donaldytong Hastings Street → Accommodation hero
 *   - Noosa River / North Shore   → Things to do hero
 *   - Kgbo Noosa River boating    → Fishing hero
 *   - Kgbo Noosa Ferry            → Boats & watercraft hero
 *   - Kgbo North Shore Ferry      → Travel & transport hero
 *   - Kgbo Main Beach 2020-02     → Webcams hero
 * -------------------------------------------------------------------- */

const HERO = {
  homepage: commons(
    "Noosa_Heads_(23720155369).jpg",
    "dronepicr",
    "CC BY 2.0",
    "Aerial of Noosa Heads — the headland, Laguna Bay, and the river mouth.",
    "Aerial photograph of Noosa Heads township showing the headland, Laguna Bay, and the Noosa River mouth.",
    2133,
    1600,
    "https://commons.wikimedia.org/wiki/File:Noosa_Heads_(23720155369).jpg",
  ),
  about: commons(
    "Noosa_Heads_(23720155369).jpg",
    "dronepicr",
    "CC BY 2.0",
    "The aerial of Noosa Heads that defines the shire's eastern edge.",
    "Aerial photograph of Noosa Heads with the headland, Laguna Bay, and the river mouth.",
    2133,
    1600,
    "https://commons.wikimedia.org/wiki/File:Noosa_Heads_(23720155369).jpg",
  ),
  surf: commons(
    "Noosa_Beach,_Noosa_Heads,_Queensland,_2020,_01.jpg",
    "Kgbo",
    "CC BY-SA 4.0",
    "Noosa Main Beach — the longboard point break at First Bay.",
    "Noosa Main Beach at Noosa Heads, Queensland, with the headland at First Point.",
    4032,
    3024,
    "https://commons.wikimedia.org/wiki/File:Noosa_Beach,_Noosa_Heads,_Queensland,_2020,_01.jpg",
  ),
  noosaNationalPark: commons(
    "Noosa_Heads_and_Weyba_Creek.JPG",
    "Kgbo",
    "CC BY-SA 4.0",
    "Noosa Heads from the bridge over Weyba Creek — the western approach to the National Park.",
    "Noosa Heads seen from the bridge over Weyba Creek on the western approach to the National Park.",
    3264,
    2448,
    "https://commons.wikimedia.org/wiki/File:Noosa_Heads_and_Weyba_Creek.JPG",
  ),
  accommodation: commons(
    "Hastings_Street,_Noosa_Heads_QLD_Nov_2013.JPG",
    "Donaldytong",
    "CC BY-SA 4.0",
    "Hastings Street — the boutique shopping and dining strip fronting Noosa Main Beach.",
    "Panoramic view of Hastings Street, a boutique shopping street in Noosa Heads, Queensland.",
    5551,
    3570,
    "https://commons.wikimedia.org/wiki/File:Hastings_Street,_Noosa_Heads_QLD_Nov_2013.JPG",
  ),
  thingsToDo: commons(
    "Noosa_Ferry_on_Noosa_River_approching_Noosaville,_Queensland_01.jpg",
    "Kgbo",
    "CC BY-SA 4.0",
    "Noosa Ferry crossing the Noosa River toward Noosaville — the calm-water golden-hour canvas.",
    "Noosa Ferry crossing the Noosa River toward Noosaville, Queensland.",
    4032,
    3024,
    "https://commons.wikimedia.org/wiki/File:Noosa_Ferry_on_Noosa_River_approching_Noosaville,_Queensland_01.jpg",
  ),
  fishingReports: commons(
    "Boating_at_Noosa_River,_Noosa_North_Shore,_Queensland,_03.jpg",
    "Kgbo",
    "CC BY-SA 4.0",
    "Boating on the Noosa River — the working water above the ferry crossing.",
    "A boat on the Noosa River at Noosa North Shore, Queensland.",
    4032,
    3024,
    "https://commons.wikimedia.org/wiki/File:Boating_at_Noosa_River,_Noosa_North_Shore,_Queensland,_03.jpg",
  ),
  boatsAndWatercraft: commons(
    "Noosa_Ferry_outside_Sofitel_Noosa_Pacific_Resort,_Noosa_Heads,_Queensland.jpg",
    "Kgbo",
    "CC BY-SA 4.0",
    "Noosa Ferry at its stop outside the Sofitel Noosa Pacific Resort — the river-to-Hastings route.",
    "Noosa Ferry at its stop outside the Sofitel Noosa Pacific Resort, Hastings Street, Noosa Heads.",
    4032,
    3024,
    "https://commons.wikimedia.org/wiki/File:Noosa_Ferry_outside_Sofitel_Noosa_Pacific_Resort,_Noosa_Heads,_Queensland.jpg",
  ),
  travelAndTransport: commons(
    "Noosa_North_Shore_Ferries,_Queensland,_2024,_02.jpg",
    "Kgbo",
    "CC BY-SA 4.0",
    "Noosa North Shore Ferries on the Noosa River — the river crossing as transport mode.",
    "Noosa North Shore Ferries on the Noosa River, Queensland, 2024.",
    4032,
    3024,
    "https://commons.wikimedia.org/wiki/File:Noosa_North_Shore_Ferries,_Queensland,_2024,_02.jpg",
  ),
  webcams: commons(
    "Noosa_Beach,_Noosa_Heads,_Queensland,_2020,_02.jpg",
    "Kgbo",
    "CC BY-SA 4.0",
    "Noosa Main Beach — the long, north-facing curve that the headland protects.",
    "Noosa Main Beach, Noosa Heads, Queensland, 2020, afternoon view.",
    3971,
    2978,
    "https://commons.wikimedia.org/wiki/File:Noosa_Beach,_Noosa_Heads,_Queensland,_2020,_02.jpg",
  ),
} as const;

/* ----------------------------------------------------------------------
 * INLINE photos — per category. Each role is described in the
 * caption. Some photos are reused across categories where the
 * subject fits multiple pages (e.g. a beach shot works for surf and
 * webcams). Attribution travels with the photo.
 * -------------------------------------------------------------------- */

const INLINE = {
  surf: [
    commons(
      "Noosa_Heads_beach_in_January_2015.JPG",
      "Kgbo",
      "CC BY-SA 4.0",
      "Late afternoon at Noosa Main Beach — the soft-light window between southerly and seabreeze.",
      "Late afternoon view of Noosa Heads beach with the headland visible in the distance.",
      3264,
      2448,
      "https://commons.wikimedia.org/wiki/File:Noosa_Heads_beach_in_January_2015.JPG",
    ),
    commons(
      "Boardwalk_along_Noosa_Heads%E2%80%99_main_beach,_Queensland.jpg",
      "Kgbo",
      "CC BY-SA 4.0",
      "Boardwalk along Noosa Main Beach — the morning walk from Hastings Street to First Point.",
      "Boardwalk along Noosa Main Beach at Noosa Heads, Queensland.",
      3870,
      2900,
      "https://commons.wikimedia.org/wiki/File:Boardwalk_along_Noosa_Heads%E2%80%99_main_beach,_Queensland.jpg",
    ),
    commons(
      "Noosa_Heads_beach_on_Christmas_Day_2015_01.jpeg",
      "Kgbo",
      "CC BY-SA 4.0",
      "Noosa Main Beach on Christmas Day — peak-season crowds.",
      "Noosa Main Beach on Christmas Day 2015, with the beach and people in view.",
      3264,
      2448,
      "https://commons.wikimedia.org/wiki/File:Noosa_Heads_beach_on_Christmas_Day_2015_01.jpeg",
    ),
    commons(
      "Noosa_Beach,_Noosa_Heads,_Queensland,_2020,_02.jpg",
      "Kgbo",
      "CC BY-SA 4.0",
      "Noosa Main Beach — the long, north-facing curve that the headland protects.",
      "Noosa Main Beach, Noosa Heads, Queensland, 2020.",
      3971,
      2978,
      "https://commons.wikimedia.org/wiki/File:Noosa_Beach,_Noosa_Heads,_Queensland,_2020,_02.jpg",
    ),
  ],
  noosaNationalPark: [
    commons(
      "Noosa_Heads_and_Weyba_Creek.JPG",
      "Kgbo",
      "CC BY-SA 4.0",
      "Noosa Heads from the bridge over Weyba Creek — the western approach.",
      "Noosa Heads seen from the bridge over Weyba Creek, Noosa Heads, Queensland.",
      3264,
      2448,
      "https://commons.wikimedia.org/wiki/File:Noosa_Heads_and_Weyba_Creek.JPG",
    ),
    commons(
      "Noosa_Beach,_Noosa_Heads,_Queensland,_2020,_02.jpg",
      "Kgbo",
      "CC BY-SA 4.0",
      "Noosa Main Beach — looking north from the headland approach.",
      "Noosa Main Beach, Noosa Heads, Queensland, 2020.",
      3971,
      2978,
      "https://commons.wikimedia.org/wiki/File:Noosa_Beach,_Noosa_Heads,_Queensland,_2020,_02.jpg",
    ),
    commons(
      "Noosa_Beach,_Noosa_Heads,_Queensland,_2020,_05.jpg",
      "Kgbo",
      "CC BY-SA 4.0",
      "Noosa Main Beach — looking north from the boardwalk (vertical view).",
      "Noosa Main Beach, Noosa Heads, Queensland, 2020, vertical view.",
      3024,
      4032,
      "https://commons.wikimedia.org/wiki/File:Noosa_Beach,_Noosa_Heads,_Queensland,_2020,_05.jpg",
    ),
    commons(
      "Noosa_Beach,_Noosa_Heads,_Queensland,_2022.jpg",
      "Kgbo",
      "CC BY-SA 4.0",
      "Noosa Main Beach — the sheltered north-facing beach.",
      "Noosa Beach, Noosa Heads, Queensland, 2022.",
      4000,
      3000,
      "https://commons.wikimedia.org/wiki/File:Noosa_Beach,_Noosa_Heads,_Queensland,_2022.jpg",
    ),
  ],
  accommodation: [
    commons(
      "Hastings_Street,_Noosa_Heads,_Queensland_03.jpg",
      "Kgbo",
      "CC BY-SA 4.0",
      "Hastings Street — the boutique retail strip on a quiet morning.",
      "Hastings Street, Noosa Heads, Queensland, with the boutique retail strip visible.",
      4032,
      3024,
      "https://commons.wikimedia.org/wiki/File:Hastings_Street,_Noosa_Heads,_Queensland_03.jpg",
    ),
    commons(
      "Hastings_Street,_Noosa_Heads,_Queensland_04.jpg",
      "Kgbo",
      "CC BY-SA 4.0",
      "Hastings Street — the hospitality and shopping strip fronting Noosa Main Beach.",
      "Hastings Street, Noosa Heads, Queensland, looking along the boutique shopping strip.",
      4032,
      3024,
      "https://commons.wikimedia.org/wiki/File:Hastings_Street,_Noosa_Heads,_Queensland_04.jpg",
    ),
    commons(
      "Noosa_Boathouse,_Noosaville,_Queensland.jpg",
      "Kgbo",
      "CC BY-SA 4.0",
      "Noosa Boathouse — the riverfront dining landmark on the Noosa River.",
      "Noosa Boathouse on the Noosa River, Noosaville, Queensland.",
      4032,
      3024,
      "https://commons.wikimedia.org/wiki/File:Noosa_Boathouse,_Noosaville,_Queensland.jpg",
    ),
    commons(
      "Noosa_River_bank_at_Noosaville,_Queensland,_2024.jpg",
      "Kgbo",
      "CC BY-SA 4.0",
      "The Noosa River bank at Noosaville — the calm-water hire-craft zone.",
      "The Noosa River bank at Noosaville, Queensland, 2024.",
      6048,
      6048,
      "https://commons.wikimedia.org/wiki/File:Noosa_River_bank_at_Noosaville,_Queensland,_2024.jpg",
    ),
  ],
  thingsToDo: [
    commons(
      "Boardwalk_along_Noosa_Heads%E2%80%99_main_beach,_Queensland.jpg",
      "Kgbo",
      "CC BY-SA 4.0",
      "Boardwalk along Noosa Main Beach — the morning walk from Hastings Street to First Point.",
      "Boardwalk along Noosa Main Beach at Noosa Heads, Queensland.",
      3870,
      2900,
      "https://commons.wikimedia.org/wiki/File:Boardwalk_along_Noosa_Heads%E2%80%99_main_beach,_Queensland.jpg",
    ),
    commons(
      "Noosa_Beach,_Noosa_Heads,_Queensland,_2022.jpg",
      "Kgbo",
      "CC BY-SA 4.0",
      "Noosa Main Beach — the sheltered north-facing beach, the starting point for every Noosa day.",
      "Noosa Beach, Noosa Heads, Queensland, 2022.",
      4000,
      3000,
      "https://commons.wikimedia.org/wiki/File:Noosa_Beach,_Noosa_Heads,_Queensland,_2022.jpg",
    ),
    commons(
      "Noosa_Ferry_on_Noosa_River_approching_Noosaville,_Queensland_01.jpg",
      "Kgbo",
      "CC BY-SA 4.0",
      "Noosa Ferry on the Noosa River — the calm-water cruise.",
      "Noosa Ferry crossing the Noosa River toward Noosaville, Queensland.",
      4032,
      3024,
      "https://commons.wikimedia.org/wiki/File:Noosa_Ferry_on_Noosa_River_approching_Noosaville,_Queensland_01.jpg",
    ),
    commons(
      "Noosa_farmers_market.jpg",
      "Misaochan2",
      "CC BY-SA 4.0",
      "Noosa Farmers Market — the Sunday-morning community market.",
      "Noosa Farmers Market stallholders and produce, 2020.",
      4032,
      3024,
      "https://commons.wikimedia.org/wiki/File:Noosa_farmers_market.jpg",
    ),
  ],
  fishingReports: [
    commons(
      "Noosa_River_seen_upstream_from_Noosa_Boathouse,_Noosaville,_Queensland.jpg",
      "Kgbo",
      "CC BY-SA 4.0",
      "The Noosa River upstream from the Boathouse — the upper-river direction toward Tewantin.",
      "The Noosa River seen upstream from the Noosa Boathouse, Noosaville, Queensland.",
      4032,
      3024,
      "https://commons.wikimedia.org/wiki/File:Noosa_River_seen_upstream_from_Noosa_Boathouse,_Noosaville,_Queensland.jpg",
    ),
    commons(
      "Boat_fishing_at_Noosa_River,_Noosa_North_Shore,_Queensland,_02.jpg",
      "Kgbo",
      "CC BY-SA 4.0",
      "Boat fishing on the Noosa River, Noosa North Shore.",
      "A fishing boat on the Noosa River, Noosa North Shore, Queensland.",
      4032,
      3024,
      "https://commons.wikimedia.org/wiki/File:Boat_fishing_at_Noosa_River,_Noosa_North_Shore,_Queensland,_02.jpg",
    ),
    commons(
      "Angling_from_a_boat_at_Noosa_River,_Noosa_North_Shore,_Queensland,_2019.jpg",
      "Kgbo",
      "CC BY-SA 4.0",
      "Angling from a boat on the Noosa River, 2019.",
      "A person angling from a boat on the Noosa River, Noosa North Shore, Queensland.",
      3911,
      2933,
      "https://commons.wikimedia.org/wiki/File:Angling_from_a_boat_at_Noosa_River,_Noosa_North_Shore,_Queensland,_2019.jpg",
    ),
    commons(
      "Noosa_River_at_Tewantin_1930s_01.jpg",
      "John Robert McPherson",
      "CC0 1.0",
      "The Noosa River at Tewantin, 1930s — the river town in the timber-rafting era (historical context).",
      "Historical photo of the Noosa River at Tewantin, ca. 1930s.",
      1958,
      1294,
      "https://commons.wikimedia.org/wiki/File:Noosa_River_at_Tewantin_1930s_01.jpg",
    ),
  ],
  boatsAndWatercraft: [
    commons(
      "Noosa_Boathouse,_Noosaville,_Queensland.jpg",
      "Kgbo",
      "CC BY-SA 4.0",
      "Noosa Boathouse — the riverfront dining landmark, on the Noosa River.",
      "Noosa Boathouse on the Noosa River, Noosaville, Queensland.",
      4032,
      3024,
      "https://commons.wikimedia.org/wiki/File:Noosa_Boathouse,_Noosaville,_Queensland.jpg",
    ),
    commons(
      "Noosa_River_downstream_seen_from_Noosa_Boathouse,_Noosaville,_Queensland.jpg",
      "Kgbo",
      "CC BY-SA 4.0",
      "The Noosa River downstream from the Boathouse — the working water for ferries and hire craft.",
      "The Noosa River seen downstream from the Noosa Boathouse, Noosaville, Queensland.",
      4032,
      3024,
      "https://commons.wikimedia.org/wiki/File:Noosa_River_downstream_seen_from_Noosa_Boathouse,_Noosaville,_Queensland.jpg",
    ),
    commons(
      "Noosa_North_Shore_Ferries,_Queensland,_2024,_01.jpg",
      "Kgbo",
      "CC BY-SA 4.0",
      "Noosa North Shore Ferry crossing the Noosa River.",
      "Noosa North Shore Ferry on the Noosa River, Queensland, 2024.",
      4032,
      3024,
      "https://commons.wikimedia.org/wiki/File:Noosa_North_Shore_Ferries,_Queensland,_2024,_01.jpg",
    ),
    commons(
      "Noosa_Ferry_outside_Sofitel_Noosa_Pacific_Resort,_Noosa_Heads,_Queensland.jpg",
      "Kgbo",
      "CC BY-SA 4.0",
      "Noosa Ferry at the Sofitel stop — the river-to-Hastings ferry route.",
      "Noosa Ferry at its stop outside the Sofitel Noosa Pacific Resort, Hastings Street, Noosa Heads.",
      4032,
      3024,
      "https://commons.wikimedia.org/wiki/File:Noosa_Ferry_outside_Sofitel_Noosa_Pacific_Resort,_Noosa_Heads,_Queensland.jpg",
    ),
  ],
  travelAndTransport: [
    commons(
      "Noosa_North_Shore_Ferries,_Queensland,_2024,_01.jpg",
      "Kgbo",
      "CC BY-SA 4.0",
      "Noosa North Shore Ferry — the river crossing as transport mode.",
      "Noosa North Shore Ferry on the Noosa River, Queensland, 2024.",
      4032,
      3024,
      "https://commons.wikimedia.org/wiki/File:Noosa_North_Shore_Ferries,_Queensland,_2024,_01.jpg",
    ),
    commons(
      "Noosa_North_Shore_Ferries,_Queensland,_2024,_02.jpg",
      "Kgbo",
      "CC BY-SA 4.0",
      "Noosa North Shore Ferries on the Noosa River, 2024.",
      "Noosa North Shore Ferries on the Noosa River, Queensland, 2024.",
      4032,
      3024,
      "https://commons.wikimedia.org/wiki/File:Noosa_North_Shore_Ferries,_Queensland,_2024,_02.jpg",
    ),
    commons(
      "Noosa_River_at_the_ferry_crossing,_Maximillian_Road,_Noosa_North_Shore,_Queensland.jpg",
      "Kgbo",
      "CC BY-SA 4.0",
      "The Noosa River at the Maximillian Road ferry crossing — the gateway to the North Shore.",
      "The Noosa River at the Maximillian Road ferry crossing, Noosa North Shore, Queensland.",
      3955,
      2966,
      "https://commons.wikimedia.org/wiki/File:Noosa_River_at_the_ferry_crossing,_Maximillian_Road,_Noosa_North_Shore,_Queensland.jpg",
    ),
    commons(
      "Noosa_River_bank_at_Noosaville,_Queensland,_2024.jpg",
      "Kgbo",
      "CC BY-SA 4.0",
      "The Noosa River bank at Noosaville — the river-based transport access.",
      "The Noosa River bank at Noosaville, Queensland, 2024.",
      6048,
      6048,
      "https://commons.wikimedia.org/wiki/File:Noosa_River_bank_at_Noosaville,_Queensland,_2024.jpg",
    ),
  ],
  webcams: [
    commons(
      "Noosa_Beach,_Noosa_Heads,_Queensland,_2020,_02.jpg",
      "Kgbo",
      "CC BY-SA 4.0",
      "Noosa Main Beach, 2020 — the long, north-facing curve the public webcams approximate.",
      "Noosa Main Beach, Noosa Heads, Queensland, 2020.",
      3971,
      2978,
      "https://commons.wikimedia.org/wiki/File:Noosa_Beach,_Noosa_Heads,_Queensland,_2020,_02.jpg",
    ),
    commons(
      "Noosa_Heads_beach_on_Christmas_Day_2015_01.jpeg",
      "Kgbo",
      "CC BY-SA 4.0",
      "Noosa Main Beach on Christmas Day 2015 — peak season for the public cams.",
      "Noosa Main Beach on Christmas Day 2015, with the beach and people in view.",
      3264,
      2448,
      "https://commons.wikimedia.org/wiki/File:Noosa_Heads_beach_on_Christmas_Day_2015_01.jpeg",
    ),
    commons(
      "Noosa_Heads_(23720155369).jpg",
      "dronepicr",
      "CC BY 2.0",
      "Aerial of Noosa Heads — the long-view subject of the regional webcam feed.",
      "Aerial of Noosa Heads township, Laguna Bay, and the headland.",
      2133,
      1600,
      "https://commons.wikimedia.org/wiki/File:Noosa_Heads_(23720155369).jpg",
    ),
    commons(
      "Noosa_Heads_beach_in_January_2015.JPG",
      "Kgbo",
      "CC BY-SA 4.0",
      "Late afternoon at Noosa Main Beach — the soft-light webcam window.",
      "Late afternoon view of Noosa Heads beach, Queensland.",
      3264,
      2448,
      "https://commons.wikimedia.org/wiki/File:Noosa_Heads_beach_in_January_2015.JPG",
    ),
  ],
} as const;

/* ----------------------------------------------------------------------
 * Export — every category slug maps to its photo set.
 * -------------------------------------------------------------------- */

export const CATEGORY_PHOTOS: Record<string, { hero: LocationPhoto; inline: LocationPhoto[] }> = {
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
 * Homepage hero — a single full-bleed image.
 * -------------------------------------------------------------------- */

export const HOMEPAGE_HERO: LocationPhoto = HERO.homepage;

/* ======================================================================
 * v6.1.1 — homepage section photos.
 *
 * Per Albert's photo manifest, the S3 / S4 / S5 / S7 / S9 / S10
 * homepage sections are swapped from the v6 generic Unsplash photos to
 * the 42 verified location-specific Commons photos. Gaps are filled
 * with bespoke SVG illustrations (sunshine-beach, six named eat &
 * drink venues, three cross-section filters).
 * ====================================================================== */

/* ----------------------------------------------------------------------
 * S3 — Featured areas (6 photo cards).
 *   - Noosa Heads      → noosa-main-beach-01
 *   - Hastings Street  → hastings-street-hero-01 (Donaldytong)
 *   - Noosaville       → noosa-boathouse-01
 *   - Sunshine Beach   → SVG illustration (no open-licence photo)
 *   - Peregian Beach   → peregian-beach-2012 (Mountain/Ash)
 *   - Noosa National Park → noosa-heads-weyba-creek (gateway)
 * -------------------------------------------------------------------- */

const FEATURED_AREAS: LocationPhoto[] = [
  commons(
    "Noosa_Beach,_Noosa_Heads,_Queensland,_2020,_01.jpg",
    "Kgbo",
    "CC BY-SA 4.0",
    "Noosa Heads — the coastal headland that gives the shire its name.",
    "Noosa Main Beach at Noosa Heads, Queensland.",
    4032,
    3024,
    "https://commons.wikimedia.org/wiki/File:Noosa_Beach,_Noosa_Heads,_Queensland,_2020,_01.jpg",
  ),
  commons(
    "Hastings_Street,_Noosa_Heads_QLD_Nov_2013.JPG",
    "Donaldytong",
    "CC BY-SA 4.0",
    "Hastings Street — the boutique shopping and dining strip.",
    "Panoramic view of Hastings Street, Noosa Heads, Queensland.",
    5551,
    3570,
    "https://commons.wikimedia.org/wiki/File:Hastings_Street,_Noosa_Heads_QLD_Nov_2013.JPG",
  ),
  commons(
    "Noosa_Boathouse,_Noosaville,_Queensland_01.jpg",
    "Kgbo",
    "CC BY-SA 4.0",
    "Noosaville — across the river, along Gympie Terrace.",
    "Noosa Boathouse restaurant on the Noosa River, Noosaville, Queensland.",
    4032,
    3024,
    "https://commons.wikimedia.org/wiki/File:Noosa_Boathouse,_Noosaville,_Queensland_01.jpg",
  ),
  svg(
    "sunshine-beach",
    "Sunshine Beach — the surf village south of the headland.",
    "Illustration of Sunshine Beach, the surf village south of Noosa Heads, with the headland in the background.",
  ),
  commons(
    "Peregian_Beach,_2012.jpg",
    "Mountain/Ash",
    "CC BY 2.0",
    "Peregian Beach — the village square south past Sunshine Beach.",
    "Peregian Beach, Queensland, 2012.",
    4000,
    3000,
    "https://commons.wikimedia.org/wiki/File:Peregian_Beach,_2012.jpg",
  ),
  commons(
    "Noosa_Heads_and_Weyba_Creek.JPG",
    "Kgbo",
    "CC BY-SA 4.0",
    "Noosa National Park — the gateway via Weyba Creek.",
    "Noosa Heads seen from the bridge over Weyba Creek, Noosa Heads, Queensland.",
    3264,
    2448,
    "https://commons.wikimedia.org/wiki/File:Noosa_Heads_and_Weyba_Creek.JPG",
  ),
];

/* ----------------------------------------------------------------------
 * S4 — Things to do (8 experience cards).
 *
 *   1. Learn to surf at First Bay     → noosa-main-beach-01
 *   2. National Park guided walk      → noosa-heads-beach-2022
 *   3. Noosa River sunset cruise      → noosa-ferry-noosaville-01
 *   4. Noosa Farmers Market           → noosa-farmers-market-2020
 *   5. Fishing charter half-day       → noosa-fishing-river-2019
 *   6. Stand-up paddle hire           → noosa-river-bank-noosaville
 *   7. Hinterland day trip            → noosa-everglades-2013
 *   8. Kayak the Noosa Everglades     → noosa-upper-river-canoe-2022
 * -------------------------------------------------------------------- */

const THINGS_TO_DO: LocationPhoto[] = [
  commons(
    "Noosa_Beach,_Noosa_Heads,_Queensland,_2020,_01.jpg",
    "Kgbo",
    "CC BY-SA 4.0",
    "Learn to surf at First Bay — the longboard point break locals use.",
    "Noosa Main Beach at Noosa Heads, Queensland, with the headland at First Point.",
    4032,
    3024,
    "https://commons.wikimedia.org/wiki/File:Noosa_Beach,_Noosa_Heads,_Queensland,_2020,_01.jpg",
  ),
  commons(
    "Noosa_Beach,_Noosa_Heads,_Queensland,_2022.jpg",
    "Kgbo",
    "CC BY-SA 4.0",
    "Guided headland walk — the eastern access to the coastal forest.",
    "Noosa Beach, Noosa Heads, Queensland, 2022, the sheltered north-facing beach near the headland.",
    4000,
    3000,
    "https://commons.wikimedia.org/wiki/File:Noosa_Beach,_Noosa_Heads,_Queensland,_2022.jpg",
  ),
  commons(
    "Noosa_Ferry_on_Noosa_River_approching_Noosaville,_Queensland_01.jpg",
    "Kgbo",
    "CC BY-SA 4.0",
    "Noosa River sunset cruise — the calm-water golden hour.",
    "Noosa Ferry crossing the Noosa River toward Noosaville, Queensland.",
    4032,
    3024,
    "https://commons.wikimedia.org/wiki/File:Noosa_Ferry_on_Noosa_River_approching_Noosaville,_Queensland_01.jpg",
  ),
  commons(
    "Noosa_farmers_market.jpg",
    "Misaochan2",
    "CC BY-SA 4.0",
    "Noosa Farmers Market — the Sunday-morning community market.",
    "Noosa Farmers Market stallholders and produce, 2020.",
    4032,
    3024,
    "https://commons.wikimedia.org/wiki/File:Noosa_farmers_market.jpg",
  ),
  commons(
    "Boat_fishing_at_Noosa_River,_Noosa_North_Shore,_Queensland,_02.jpg",
    "Kgbo",
    "CC BY-SA 4.0",
    "Half-day fishing charter — Tewantin to the river mouth.",
    "A fishing boat on the Noosa River, Noosa North Shore, Queensland.",
    4032,
    3024,
    "https://commons.wikimedia.org/wiki/File:Boat_fishing_at_Noosa_River,_Noosa_North_Shore,_Queensland,_02.jpg",
  ),
  commons(
    "Noosa_River_bank_at_Noosaville,_Queensland,_2024.jpg",
    "Kgbo",
    "CC BY-SA 4.0",
    "Stand-up paddle hire — the river at Noosaville.",
    "The Noosa River bank at Noosaville, Queensland, 2024, the calm-water paddle zone.",
    6048,
    6048,
    "https://commons.wikimedia.org/wiki/File:Noosa_River_bank_at_Noosaville,_Queensland,_2024.jpg",
  ),
  commons(
    "Noosa_Everglades_Australia._(12046547304).jpg",
    "Ewen Bell",
    "CC BY 2.0",
    "Hinterland day trip — the Noosa Everglades, Cooran / upper Noosa River.",
    "The Noosa Everglades, the upper reach of the Noosa River.",
    2400,
    1430,
    "https://commons.wikimedia.org/wiki/File:Noosa_Everglades_Australia._(12046547304).jpg",
  ),
  commons(
    "Lazing_about_on_Upper_Noosa_River_in_a_canoe,_2022.jpg",
    "John Robert McPherson",
    "CC BY-SA 4.0",
    "Kayak the Noosa Everglades — canoeing on the upper Noosa River.",
    "A canoe on the Upper Noosa River, 2022.",
    900,
    675,
    "https://commons.wikimedia.org/wiki/File:Lazing_about_on_Upper_Noosa_River_in_a_canoe,_2022.jpg",
  ),
];

/* ----------------------------------------------------------------------
 * S5 — Where to stay (6 cross-section cards).
 *   1. Hastings Street boutique hotel  → hastings-street-peppers-resort
 *   2. Noosaville family apartment     → noosa-harbour-resort
 *   3. Sunshine Beach holiday house    → SVG (no photo)
 *   4. Hinterland B&B                  → noosa-everglades-2013
 *   5. Peregian dog-friendly cottage   → peregian-beach-2012
 *   6. Accessible ground-floor unit    → SVG (no photo)
 * -------------------------------------------------------------------- */

const WHERE_TO_STAY: LocationPhoto[] = [
  commons(
    "Christmas_decorations_in_Peppers_Noosa_Resort,_Noosa_Heads,_Queensland.jpg",
    "Kgbo",
    "CC BY-SA 4.0",
    "Hastings Street boutique hotel — the walkable end of town.",
    "Peppers Noosa Resort with Christmas decorations, Hastings Street, Noosa Heads.",
    1535,
    2048,
    "https://commons.wikimedia.org/wiki/File:Christmas_decorations_in_Peppers_Noosa_Resort,_Noosa_Heads,_Queensland.jpg",
  ),
  commons(
    "Noosa_Harbour_Resort.jpg",
    "Kgbo",
    "CC BY-SA 4.0",
    "Noosaville family apartment — riverfront, ferry at the door.",
    "Noosa Harbour Resort on the Noosa River, Noosaville.",
    3264,
    2448,
    "https://commons.wikimedia.org/wiki/File:Noosa_Harbour_Resort.jpg",
  ),
  svg(
    "sunshine-beach",
    "Sunshine Beach holiday house — the surf village, family-sized.",
    "Illustration of Sunshine Beach, the surf village south of Noosa Heads.",
  ),
  commons(
    "Noosa_Everglades_Australia._(12046547304).jpg",
    "Ewen Bell",
    "CC BY 2.0",
    "Hinterland B&B — inland villages, slow mornings.",
    "The Noosa Everglades, the upper reach of the Noosa River.",
    2400,
    1430,
    "https://commons.wikimedia.org/wiki/File:Noosa_Everglades_Australia._(12046547304).jpg",
  ),
  commons(
    "Peregian_Beach,_2012.jpg",
    "Mountain/Ash",
    "CC BY 2.0",
    "Peregian dog-friendly cottage — village-square, fenced yard.",
    "Peregian Beach, Queensland, 2012.",
    4000,
    3000,
    "https://commons.wikimedia.org/wiki/File:Peregian_Beach,_2012.jpg",
  ),
  svg(
    "accessible",
    "Accessible ground-floor unit — step-free, open-plan living.",
    "Illustration of an accessible ground-floor unit with a step-free ramp and wheelchair access.",
  ),
];

/* ----------------------------------------------------------------------
 * S7 — Eat & drink (6 venue tiles).
 * No named-restaurant photos on Commons; bespoke SVG illustrations
 * (NOT branded imitations) per the v6.1.1 brief.
 * -------------------------------------------------------------------- */

const EAT_AND_DRINK_SVGS: LocationPhoto[] = [
  svg(
    "japanese-riverside",
    "Wasabi — modern Japanese, riverside.",
    "Illustration of a riverside Japanese restaurant, low-slung timber building on pylons over the river.",
  ),
  svg(
    "beachfront-seafood",
    "Sails — modern Australian, beachfront.",
    "Illustration of a beachfront restaurant with open-sided dining on the sand.",
  ),
  svg(
    "italian-hastings",
    "Berardo's — Italian, Hastings Street.",
    "Illustration of an Italian restaurant with an awning and footpath tables on the street.",
  ),
  svg(
    "asian-junction",
    "Sum Yung Guys — South-east Asian, Noosa Junction.",
    "Illustration of a laneway restaurant, casual South-east Asian on a Junction lane with hanging lanterns.",
  ),
  svg(
    "seafood-hastings",
    "Bistro C — seafood, Hastings Street.",
    "Illustration of a modern seafood restaurant with white beachfront dining looking out to sea.",
  ),
  svg(
    "italian-noosaville",
    "Locale — Italian, Noosaville.",
    "Illustration of a riverside Italian restaurant with a terracotta awning over outdoor tables.",
  ),
];

/* ----------------------------------------------------------------------
 * S9 — Webcams strip (4 tiles, 1:1 aspect). v6.1.1 uses 4 distinct
 * beach/webcam angles per Victor's P2-3 (was: same hero photo on all
 * 4 tiles in v6.1).
 * -------------------------------------------------------------------- */

const WEBCAM_TILES: LocationPhoto[] = [
  commons(
    "Noosa_Beach,_Noosa_Heads,_Queensland,_2020,_01.jpg",
    "Kgbo",
    "CC BY-SA 4.0",
    "Main Beach — the longboard point break at First Bay.",
    "Noosa Main Beach at Noosa Heads, Queensland, 2020.",
    4032,
    3024,
    "https://commons.wikimedia.org/wiki/File:Noosa_Beach,_Noosa_Heads,_Queensland,_2020,_01.jpg",
  ),
  commons(
    "Noosa_River_downstream_seen_from_Noosa_Boathouse,_Noosaville,_Queensland.jpg",
    "Kgbo",
    "CC BY-SA 4.0",
    "Noosa Bar — the river-mouth bar crossing.",
    "The Noosa River seen downstream from the Noosa Boathouse, Noosaville, Queensland.",
    4032,
    3024,
    "https://commons.wikimedia.org/wiki/File:Noosa_River_downstream_seen_from_Noosa_Boathouse,_Noosaville,_Queensland.jpg",
  ),
  svg(
    "sunshine-beach",
    "Sunshine Beach — the surf village south of the headland.",
    "Illustration of Sunshine Beach, the surf village south of Noosa Heads.",
  ),
  commons(
    "Noosa_Beach,_Noosa_Heads,_Queensland,_2020,_02.jpg",
    "Kgbo",
    "CC BY-SA 4.0",
    "Maroochydore — the next-shire beach, with a similar curve to Noosa Main Beach.",
    "Noosa Main Beach, Noosa Heads, Queensland, 2020.",
    3971,
    2978,
    "https://commons.wikimedia.org/wiki/File:Noosa_Beach,_Noosa_Heads,_Queensland,_2020,_02.jpg",
  ),
];

/* ----------------------------------------------------------------------
 * S10 — Getting here (1 hero photo). River-crossing ferry, the
 * transport mode that fits the "Getting here" page.
 * -------------------------------------------------------------------- */

const GETTING_HERE: LocationPhoto = commons(
  "Noosa_North_Shore_Ferries,_Queensland,_2024,_02.jpg",
  "Kgbo",
  "CC BY-SA 4.0",
  "The Noosa River ferry crossing — one of the ways in to the shire.",
  "Noosa North Shore Ferries on the Noosa River, Queensland, 2024.",
  4032,
  3024,
  "https://commons.wikimedia.org/wiki/File:Noosa_North_Shore_Ferries,_Queensland,_2024,_02.jpg",
);

/* ----------------------------------------------------------------------
 * Public exports — single-import surface for consumers.
 * -------------------------------------------------------------------- */

export const HOMEPAGE_FEATURED_AREAS = FEATURED_AREAS;
export const HOMEPAGE_THINGS_TO_DO = THINGS_TO_DO;
export const HOMEPAGE_WHERE_TO_STAY = WHERE_TO_STAY;
export const HOMEPAGE_EAT_AND_DRINK = EAT_AND_DRINK_SVGS;
export const HOMEPAGE_WEBCAM_TILES = WEBCAM_TILES;
export const HOMEPAGE_GETTING_HERE = GETTING_HERE;

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
  thingsToDo: THINGS_TO_DO,
  whereToStay: WHERE_TO_STAY,
  eatAndDrink: EAT_AND_DRINK_SVGS,
  webcams: WEBCAM_TILES,
  gettingHere: GETTING_HERE,
};

/* ----------------------------------------------------------------------
 * About brand image — quieter aerial of the headland, used on /about.
 * -------------------------------------------------------------------- */

export const ABOUT_BRAND_IMAGE: LocationPhoto = HERO.about;

/* ----------------------------------------------------------------------
 * Accommodation sub-page photos — one hero + one inline per sub-page.
 *
 *   hastings-street  → Hero: Donaldytong panoramic · Inline: Kgbo 03 + 04
 *   noosaville       → Hero: Kgbo Boathouse ·     Inline: Boathouse 02 + river bank
 *   sunshine-beach   → Hero: SVG ·                Inline: SVG (no open-licence photo)
 *   tewantin         → Hero: Zephyr103 Royal Mail · Inline: McPherson 1930s
 *   peregian         → Hero: Mountain/Ash 2012 (also inline, different crop)
 *   pet-friendly     → Hero: SVG (no Noosa-specific pet photo)
 *   family           → Hero: SVG (no Noosa-specific family photo)
 *   accessible       → Hero: SVG (no Noosa-specific accessible-property photo)
 *   hinterland       → Hero: Ewen Bell Everglades · Inline: McPherson Upper River
 * -------------------------------------------------------------------- */

export const ACCOMMODATION_PHOTOS: Record<
  string,
  { hero: LocationPhoto; inline: LocationPhoto[] }
> = {
  "hastings-street": {
    hero: commons(
      "Hastings_Street,_Noosa_Heads_QLD_Nov_2013.JPG",
      "Donaldytong",
      "CC BY-SA 4.0",
      "Hastings Street — the boutique shopping strip fronting Noosa Main Beach.",
      "Panoramic view of Hastings Street, Noosa Heads, Queensland.",
      5551,
      3570,
      "https://commons.wikimedia.org/wiki/File:Hastings_Street,_Noosa_Heads_QLD_Nov_2013.JPG",
    ),
    inline: [
      commons(
        "Hastings_Street,_Noosa_Heads,_Queensland_03.jpg",
        "Kgbo",
        "CC BY-SA 4.0",
        "Hastings Street — the boutique retail strip on a quiet morning.",
        "Hastings Street, Noosa Heads, Queensland.",
        4032,
        3024,
        "https://commons.wikimedia.org/wiki/File:Hastings_Street,_Noosa_Heads,_Queensland_03.jpg",
      ),
      commons(
        "Hastings_Street,_Noosa_Heads,_Queensland_04.jpg",
        "Kgbo",
        "CC BY-SA 4.0",
        "Hastings Street — the hospitality and shopping strip fronting Noosa Main Beach.",
        "Hastings Street, Noosa Heads, Queensland.",
        4032,
        3024,
        "https://commons.wikimedia.org/wiki/File:Hastings_Street,_Noosa_Heads,_Queensland_04.jpg",
      ),
      commons(
        "Christmas_decorations_in_Peppers_Noosa_Resort,_Noosa_Heads,_Queensland.jpg",
        "Kgbo",
        "CC BY-SA 4.0",
        "Peppers Noosa Resort — the Hastings Street flagship stay.",
        "Peppers Noosa Resort with Christmas decorations, Hastings Street, Noosa Heads.",
        1535,
        2048,
        "https://commons.wikimedia.org/wiki/File:Christmas_decorations_in_Peppers_Noosa_Resort,_Noosa_Heads,_Queensland.jpg",
      ),
      commons(
        "Interior_of_Aromas_Noosa_Heads,_Queensland.jpg",
        "Kgbo",
        "CC BY-SA 4.0",
        "Aromas Noosa — the Hastings Street café.",
        "Interior of Aromas Noosa, Hastings Street, Noosa Heads.",
        3939,
        2954,
        "https://commons.wikimedia.org/wiki/File:Interior_of_Aromas_Noosa_Heads,_Queensland.jpg",
      ),
    ],
  },
  noosaville: {
    hero: commons(
      "Noosa_Boathouse,_Noosaville,_Queensland_01.jpg",
      "Kgbo",
      "CC BY-SA 4.0",
      "Noosa Boathouse on the Noosa River, Noosaville.",
      "Noosa Boathouse restaurant on the Noosa River, Noosaville, Queensland.",
      4032,
      3024,
      "https://commons.wikimedia.org/wiki/File:Noosa_Boathouse,_Noosaville,_Queensland_01.jpg",
    ),
    inline: [
      commons(
        "Noosa_Boathouse,_Noosaville,_Queensland.jpg",
        "Kgbo",
        "CC BY-SA 4.0",
        "Noosa Boathouse — the riverfront dining landmark.",
        "Noosa Boathouse on the Noosa River, Noosaville, Queensland.",
        4032,
        3024,
        "https://commons.wikimedia.org/wiki/File:Noosa_Boathouse,_Noosaville,_Queensland.jpg",
      ),
      commons(
        "Noosa_River_bank_at_Noosaville,_Queensland,_2024.jpg",
        "Kgbo",
        "CC BY-SA 4.0",
        "The Noosa River bank at Noosaville — the calm-water hire-craft zone.",
        "The Noosa River bank at Noosaville, Queensland, 2024.",
        6048,
        6048,
        "https://commons.wikimedia.org/wiki/File:Noosa_River_bank_at_Noosaville,_Queensland,_2024.jpg",
      ),
      commons(
        "Noosa_Harbour_Resort.jpg",
        "Kgbo",
        "CC BY-SA 4.0",
        "Noosa Harbour Resort — the Noosaville riverfront apartments.",
        "Noosa Harbour Resort on the Noosa River, Noosaville.",
        3264,
        2448,
        "https://commons.wikimedia.org/wiki/File:Noosa_Harbour_Resort.jpg",
      ),
      commons(
        "Noosa_Ferry_on_Noosa_River_approching_Noosaville,_Queensland_01.jpg",
        "Kgbo",
        "CC BY-SA 4.0",
        "Noosa Ferry crossing the Noosa River toward Noosaville.",
        "Noosa Ferry crossing the Noosa River toward Noosaville, Queensland.",
        4032,
        3024,
        "https://commons.wikimedia.org/wiki/File:Noosa_Ferry_on_Noosa_River_approching_Noosaville,_Queensland_01.jpg",
      ),
    ],
  },
  "sunshine-beach": {
    hero: svg(
      "sunshine-beach",
      "Sunshine Beach — the surf village south of the headland.",
      "Illustration of Sunshine Beach, the surf village south of Noosa Heads, with the headland in the background.",
    ),
    inline: [
      svg(
        "sunshine-beach",
        "Sunshine Beach — the surf village south of the headland.",
        "Illustration of Sunshine Beach, the surf village south of Noosa Heads.",
      ),
    ],
  },
  tewantin: {
    hero: commons(
      "Tewantin-royalmail.jpg",
      "Zephyr103",
      "public domain",
      "Tewantin Royal Mail Hotel — the town's heritage pub landmark.",
      "The Royal Mail Hotel in Tewantin, Queensland.",
      2304,
      1728,
      "https://commons.wikimedia.org/wiki/File:Tewantin-royalmail.jpg",
    ),
    inline: [
      commons(
        "Noosa_River_at_Tewantin_1930s_01.jpg",
        "John Robert McPherson",
        "CC0 1.0",
        "The Noosa River at Tewantin, 1930s — the river town in the timber-rafting era.",
        "Historical photo of the Noosa River at Tewantin, ca. 1930s.",
        1958,
        1294,
        "https://commons.wikimedia.org/wiki/File:Noosa_River_at_Tewantin_1930s_01.jpg",
      ),
    ],
  },
  peregian: {
    hero: commons(
      "Peregian_Beach,_2012.jpg",
      "Mountain/Ash",
      "CC BY 2.0",
      "Peregian Beach, Queensland, 2012 — the village south of Sunshine Beach.",
      "Peregian Beach, Queensland, 2012.",
      4000,
      3000,
      "https://commons.wikimedia.org/wiki/File:Peregian_Beach,_2012.jpg",
    ),
    inline: [
      commons(
        "Peregian_Beach,_2012.jpg",
        "Mountain/Ash",
        "CC BY 2.0",
        "Peregian Beach, Queensland, 2012 — the village beach, dog-friendly precinct.",
        "Peregian Beach, Queensland, 2012.",
        4000,
        3000,
        "https://commons.wikimedia.org/wiki/File:Peregian_Beach,_2012.jpg",
      ),
    ],
  },
  "pet-friendly": {
    hero: svg(
      "pet-friendly",
      "Pet-friendly — a dog on the beach at the off-leash hours.",
      "Illustration of a pet-friendly Noosa beach, with a person and a dog silhouette during the off-leash hours.",
    ),
    inline: [
      svg(
        "pet-friendly",
        "Pet-friendly — verify each operator's pet policy before booking.",
        "Illustration of a pet-friendly Noosa beach.",
      ),
    ],
  },
  family: {
    hero: svg(
      "family",
      "Family — a parent and child on the beach.",
      "Illustration of a family-friendly Noosa beach, with a parent and child silhouette near the water.",
    ),
    inline: [
      svg(
        "family",
        "Family — pools, fenced yards, near the river.",
        "Illustration of a family-friendly Noosa beach.",
      ),
    ],
  },
  accessible: {
    hero: svg(
      "accessible",
      "Accessible — step-free path to a ground-floor unit.",
      "Illustration of an accessible ground-floor unit with a step-free ramp, wide doorway, and wheelchair access.",
    ),
    inline: [
      svg(
        "accessible",
        "Accessible — step-free, wheelchair-friendly accommodation.",
        "Illustration of an accessible ground-floor unit.",
      ),
    ],
  },
  hinterland: {
    hero: commons(
      "Noosa_Everglades_Australia._(12046547304).jpg",
      "Ewen Bell",
      "CC BY 2.0",
      "Noosa Everglades — the upper-Noosa kayak-and-canoe day-trip water.",
      "The Noosa Everglades, the upper reach of the Noosa River.",
      2400,
      1430,
      "https://commons.wikimedia.org/wiki/File:Noosa_Everglades_Australia._(12046547304).jpg",
    ),
    inline: [
      commons(
        "Lazing_about_on_the_Upper_Noosa_River,_2022.jpg",
        "John Robert McPherson",
        "CC BY-SA 4.0",
        "Upper Noosa River — the calm-water reach.",
        "The upper reach of the Noosa River, 2022.",
        900,
        425,
        "https://commons.wikimedia.org/wiki/File:Lazing_about_on_the_Upper_Noosa_River,_2022.jpg",
      ),
    ],
  },
};
