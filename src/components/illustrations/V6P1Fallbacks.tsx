/**
 * V6P1Fallbacks — bespoke SVG illustrations for the v6.1.1 photo
 * integration gaps.
 *
 * Per Albert's photo manifest (2026-10-12) and the v6.1.1 brief, the
 * following locations have no open-licence Wikimedia Commons photo of
 * acceptable resolution or location-specificity. This file supplies
 * bespoke SVG illustrations consistent with the v5 AreaHeroes style
 * (1.5px stroke, sea-glass palette, 480×360 viewBox, 4:3 editorial
 * ratio) so the v6.1.1 ship is not blocked on commissioned photography
 * or paid stock.
 *
 * Coverage map (per Albert's coverage_matrix):
 *
 *   GAPS (no open-licence photo):
 *     - Sunshine Beach                         (accommodation/sunshine-beach, WHERE_TO_STAY[2])
 *     - Eat & drink — Wasabi                   (Noosaville, Japanese, riverside)
 *     - Eat & drink — Sails                    (Hastings Street, beachfront seafood)
 *     - Eat & drink — Berardo's                (Hastings Street, Italian)
 *     - Eat & drink — Sum Yung Guys            (Noosa Junction, SE Asian)
 *     - Eat & drink — Bistro C                 (Hastings Street, seafood)
 *     - Eat & drink — Locale                   (Noosaville, Italian)
 *     - Pet-friendly accommodation             (accommodation/pet-friendly)
 *     - Family accommodation                   (accommodation/family)
 *     - Accessible accommodation               (accommodation/accessible)
 *
 *   ILLUSTRATIONS ARE NOT BRANDED IMITATIONS — they depict the venue
 *   type or the area's defining typology (e.g. a generic Japanese
 *   riverside restaurant, not a recreation of Wasabi's logo or
 *   interior). v6.2 follow-up: Sally to lead direct outreach to each
 *   named venue for a CC-BY photo; failing that, OGL stock with
 *   explicit captions.
 *
 *   Design intent (matches AreaHeroes):
 *     - 1.5px stroke (matches the v2 Icon set's strokeWidth).
 *     - sea-glass (#5BA89B) primary stroke, ink (#0A1F1B) detail.
 *     - 480×360 viewBox (4:3 editorial ratio).
 *     - Soft paper-100 wash background so they read as a hero card.
 *     - Subject references the page's editorial content.
 *     - role="img" + aria-label for a11y.
 *
 * Reuse surface: `FALLBACK_SVGS` const at the bottom — keyed by
 * `FallbackSvgKey` and consumed by the `LocationPhoto` component.
 */

import type { SVGProps } from "react";

type FallbackSvgProps = SVGProps<SVGSVGElement> & { title?: string };

const baseProps: Omit<SVGProps<SVGSVGElement>, "children"> = {
  width: 480,
  height: 360,
  viewBox: "0 0 480 360",
  fill: "none",
  role: "img",
  xmlns: "http://www.w3.org/2000/svg",
};

const STROKE = "#2F8074"; // ocean-700
const STROKE_DK = "#0E4A41"; // ocean-900
const INK = "#0A1F1B";
const AMBER = "#B8742A";
const WASH = "#F4F8F7"; // paper-100

/* ====================================================================
 * 1. SunshineBeachHero — the surf village south of the headland.
 *    Used: accommodation/sunshine-beach (Hero), WHERE_TO_STAY[2]
 * ==================================================================== */

export function SunshineBeachHero({
  title = "Sunshine Beach — the surf village",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      {/* Sky */}
      <rect x="0" y="0" width="480" height="200" fill="#E0EFEC" />
      {/* Sun */}
      <circle cx="380" cy="70" r="30" fill={WASH} stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Distant headland (Noosa Heads silhouette to the north) */}
      <path
        d="M0 200 Q40 175 80 185 Q120 195 160 180 L160 200 Z"
        fill="#A8D4CA"
        opacity="0.6"
      />
      {/* Surf line / horizon */}
      <line x1="0" y1="200" x2="480" y2="200" stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Beach */}
      <path
        d="M0 230 Q120 220 240 230 Q360 240 480 230 L480 280 L0 280 Z"
        fill="#D9C9A6"
        opacity="0.5"
      />
      {/* Surf break */}
      <g stroke={STROKE} strokeWidth="1.5" fill="none" opacity="0.7">
        <path d="M0 250 Q60 245 120 250 T240 250 T360 250 T480 250" />
        <path d="M0 270 Q60 265 120 270 T240 270 T360 270 T480 270" />
      </g>
      {/* Foreground headland (the southern bluff) */}
      <path
        d="M0 360 L0 280 Q60 260 120 270 Q200 285 280 270 Q380 250 480 270 L480 360 Z"
        fill="#5BA89B"
        opacity="0.85"
      />
      {/* Village buildings (small, generic — village square) */}
      <g stroke={INK} strokeWidth="1.5" fill="#A8D4CA">
        <rect x="180" y="290" width="40" height="35" />
        <polygon points="180,290 200,278 220,290" />
        <rect x="225" y="295" width="35" height="30" />
        <polygon points="225,295 242.5,283 260,295" />
        <rect x="265" y="288" width="38" height="37" />
        <polygon points="265,288 284,275 303,288" />
      </g>
      {/* Palm trees */}
      <g stroke={INK} strokeWidth="1.5" strokeLinecap="round" fill="none">
        <path d="M40 360 q-2 -100 -8 -160" />
        <path d="M32 200 q-20 -10 -28 -22" />
        <path d="M32 200 q20 -8 30 -20" />
        <path d="M32 200 q-12 -16 -16 -30" />
        <path d="M32 200 q14 -14 22 -28" />
        <path d="M450 360 q4 -110 10 -170" />
        <path d="M460 190 q20 -10 28 -22" />
        <path d="M460 190 q-20 -8 -30 -20" />
        <path d="M460 190 q12 -16 16 -30" />
        <path d="M460 190 q-14 -14 -22 -28" />
      </g>
    </svg>
  );
}

/* ====================================================================
 * Eat & drink venue-type illustrations.
 * Generic, not branded. Depict the venue typology.
 * ==================================================================== */

/* 2. JapaneseRiversideSvg — for Wasabi. Riverside, low building,
 *    shoji-screen facade, lantern. */
export function JapaneseRiversideSvg({
  title = "Riverside Japanese — a low-slung timber building on the river",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      {/* Sky */}
      <rect x="0" y="0" width="480" height="160" fill="#E0EFEC" />
      {/* Distant headland */}
      <path
        d="M0 160 Q60 130 120 145 Q200 165 280 138 Q360 115 480 150 L480 200 L0 200 Z"
        fill="#A8D4CA"
        opacity="0.6"
      />
      {/* River */}
      <rect x="0" y="200" width="480" height="160" fill="#5BA89B" opacity="0.45" />
      {/* Water ripples */}
      <g stroke={STROKE} strokeWidth="1.5" fill="none" opacity="0.6">
        <path d="M0 240 Q40 235 80 240 T160 240 T240 240 T320 240 T400 240 T480 240" />
        <path d="M0 280 Q40 275 80 280 T160 280 T240 280 T320 280 T400 280 T480 280" />
        <path d="M0 320 Q40 315 80 320 T160 320 T240 320 T320 320 T400 320 T480 320" />
      </g>
      {/* Building (low, timber, on pylons over water) */}
      <g stroke={STROKE_DK} strokeWidth="2" fill="#A8D4CA" fillOpacity="0.85">
        <rect x="100" y="190" width="280" height="80" />
        {/* Roof — gently sloped */}
        <polygon points="100,190 240,160 380,190" />
        {/* Shoji-screen facade (panels) */}
      </g>
      <g stroke={STROKE_DK} strokeWidth="1.5" fill={WASH}>
        <rect x="120" y="210" width="30" height="50" />
        <rect x="155" y="210" width="30" height="50" />
        <rect x="190" y="210" width="30" height="50" />
        <rect x="225" y="210" width="30" height="50" />
        <rect x="260" y="210" width="30" height="50" />
        <rect x="295" y="210" width="30" height="50" />
        <rect x="330" y="210" width="30" height="50" />
      </g>
      {/* Pylons */}
      <g stroke={INK} strokeWidth="1.5">
        <line x1="120" y1="270" x2="120" y2="340" />
        <line x1="180" y1="270" x2="180" y2="340" />
        <line x1="240" y1="270" x2="240" y2="340" />
        <line x1="300" y1="270" x2="300" y2="340" />
        <line x1="360" y1="270" x2="360" y2="340" />
      </g>
      {/* Hanging lantern */}
      <g stroke={AMBER} strokeWidth="1.5" fill={AMBER} fillOpacity="0.4">
        <line x1="80" y1="170" x2="80" y2="200" />
        <rect x="74" y="200" width="12" height="14" />
      </g>
      {/* Moon */}
      <circle cx="400" cy="60" r="22" fill={WASH} stroke={STROKE_DK} strokeWidth="1.5" />
    </svg>
  );
}

/* 3. BeachfrontSeafoodSvg — for Sails. Open-sided restaurant on the
 *    sand, parasols, beach. */
export function BeachfrontSeafoodSvg({
  title = "Beachfront restaurant — open-sided dining on the sand",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="180" fill="#E0EFEC" />
      {/* Sun */}
      <circle cx="100" cy="60" r="22" fill={WASH} stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Ocean */}
      <rect x="0" y="180" width="480" height="120" fill="#5BA89B" opacity="0.45" />
      <g stroke={STROKE} strokeWidth="1.5" fill="none" opacity="0.7">
        <path d="M0 200 Q60 195 120 200 T240 200 T360 200 T480 200" />
        <path d="M0 230 Q60 225 120 230 T240 230 T360 230 T480 230" />
        <path d="M0 260 Q60 255 120 260 T240 260 T360 260 T480 260" />
      </g>
      {/* Beach */}
      <rect x="0" y="300" width="480" height="60" fill="#D9C9A6" opacity="0.5" />
      {/* Restaurant structure — open, timber deck */}
      <g stroke={STROKE_DK} strokeWidth="2" fill="#A8D4CA" fillOpacity="0.85">
        <rect x="80" y="240" width="320" height="60" />
        {/* Pergola roof */}
        <line x1="60" y1="240" x2="60" y2="220" />
        <line x1="140" y1="240" x2="140" y2="220" />
        <line x1="220" y1="240" x2="220" y2="220" />
        <line x1="300" y1="240" x2="300" y2="220" />
        <line x1="380" y1="240" x2="380" y2="220" />
        <line x1="60" y1="220" x2="400" y2="220" strokeWidth="1.5" />
      </g>
      {/* Parasols */}
      <g stroke={INK} strokeWidth="1.5" fill={WASH}>
        <path d="M120 240 Q120 220 140 220 Q160 220 160 240 Z" fill="#5BA89B" fillOpacity="0.5" />
        <line x1="140" y1="240" x2="140" y2="260" />
        <path d="M260 240 Q260 215 285 215 Q310 215 310 240 Z" fill="#5BA89B" fillOpacity="0.5" />
        <line x1="285" y1="240" x2="285" y2="260" />
        <path d="M340 240 Q340 220 360 220 Q380 220 380 240 Z" fill="#5BA89B" fillOpacity="0.5" />
        <line x1="360" y1="240" x2="360" y2="260" />
      </g>
      {/* Table / chair silhouettes */}
      <g stroke={INK} strokeWidth="1.5">
        <circle cx="140" cy="280" r="6" fill={WASH} />
        <line x1="138" y1="285" x2="138" y2="295" />
        <line x1="142" y1="285" x2="142" y2="295" />
        <circle cx="285" cy="280" r="6" fill={WASH} />
        <line x1="283" y1="285" x2="283" y2="295" />
        <line x1="287" y1="285" x2="287" y2="295" />
      </g>
    </svg>
  );
}

/* 4. ItalianHastingsSvg — for Berardo's. Awning, shopfront, table on
 *    the footpath. */
export function ItalianHastingsSvg({
  title = "Italian restaurant — awning and footpath tables on the street",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="200" fill="#E0EFEC" />
      {/* Building line */}
      <rect x="60" y="180" width="360" height="120" fill="#A8D4CA" fillOpacity="0.6" />
      <line x1="60" y1="180" x2="420" y2="180" stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Awning (striped) */}
      <g>
        <rect x="60" y="180" width="360" height="20" fill="#5BA89B" />
        <g stroke={WASH} strokeWidth="2">
          <line x1="100" y1="180" x2="100" y2="200" />
          <line x1="140" y1="180" x2="140" y2="200" />
          <line x1="180" y1="180" x2="180" y2="200" />
          <line x1="220" y1="180" x2="220" y2="200" />
          <line x1="260" y1="180" x2="260" y2="200" />
          <line x1="300" y1="180" x2="300" y2="200" />
          <line x1="340" y1="180" x2="340" y2="200" />
          <line x1="380" y1="180" x2="380" y2="200" />
        </g>
      </g>
      {/* Shopfront windows */}
      <g stroke={STROKE_DK} strokeWidth="1.5" fill={WASH}>
        <rect x="80" y="220" width="80" height="60" />
        <rect x="200" y="220" width="80" height="60" />
        <rect x="320" y="220" width="80" height="60" />
      </g>
      {/* Footpath tables */}
      <g stroke={INK} strokeWidth="1.5" fill={WASH}>
        <circle cx="120" cy="310" r="10" />
        <circle cx="360" cy="310" r="10" />
        {/* Chairs */}
        <rect x="105" y="318" width="30" height="20" />
        <rect x="345" y="318" width="30" height="20" />
      </g>
      {/* Lamp post */}
      <g stroke={INK} strokeWidth="1.5" fill="none">
        <line x1="40" y1="360" x2="40" y2="200" />
        <circle cx="40" cy="200" r="4" fill={AMBER} />
      </g>
    </svg>
  );
}

/* 5. AsianJunctionSvg — for Sum Yung Guys. Casual, laneway, lanterns. */
export function AsianJunctionSvg({
  title = "Laneway restaurant — casual South-east Asian on a Junction lane",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="120" fill="#E0EFEC" />
      {/* Buildings either side of a narrow laneway */}
      <rect x="0" y="120" width="160" height="240" fill="#A8D4CA" fillOpacity="0.6" />
      <rect x="320" y="120" width="160" height="240" fill="#A8D4CA" fillOpacity="0.6" />
      <line x1="160" y1="120" x2="160" y2="360" stroke={STROKE_DK} strokeWidth="1.5" />
      <line x1="320" y1="120" x2="320" y2="360" stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Laneway ground */}
      <path d="M160 360 L320 360 L300 200 L180 200 Z" fill="#D9C9A6" fillOpacity="0.5" />
      {/* Windows on buildings */}
      <g stroke={STROKE_DK} strokeWidth="1.5" fill={WASH}>
        <rect x="20" y="160" width="20" height="20" />
        <rect x="60" y="160" width="20" height="20" />
        <rect x="100" y="160" width="20" height="20" />
        <rect x="20" y="200" width="20" height="20" />
        <rect x="60" y="200" width="20" height="20" />
        <rect x="100" y="200" width="20" height="20" />
        <rect x="20" y="240" width="20" height="20" />
        <rect x="60" y="240" width="20" height="20" />
        <rect x="100" y="240" width="20" height="20" />
        <rect x="340" y="160" width="20" height="20" />
        <rect x="380" y="160" width="20" height="20" />
        <rect x="420" y="160" width="20" height="20" />
        <rect x="340" y="200" width="20" height="20" />
        <rect x="380" y="200" width="20" height="20" />
        <rect x="420" y="200" width="20" height="20" />
      </g>
      {/* Hanging lanterns — strung across the laneway */}
      <g stroke={AMBER} strokeWidth="1.5" fill={AMBER} fillOpacity="0.5">
        <line x1="160" y1="140" x2="320" y2="140" />
        <circle cx="200" cy="160" r="6" />
        <circle cx="240" cy="160" r="6" />
        <circle cx="280" cy="160" r="6" />
      </g>
      {/* Entrance arch with signage */}
      <g stroke={INK} strokeWidth="1.5" fill="none">
        <path d="M180 200 L300 200 L300 180 L180 180 Z" fill="#5BA89B" fillOpacity="0.7" />
      </g>
      {/* Person silhouette */}
      <g stroke={INK} strokeWidth="1.5" fill={INK}>
        <circle cx="240" cy="260" r="6" />
        <line x1="240" y1="266" x2="240" y2="290" strokeLinecap="round" />
        <line x1="240" y1="275" x2="232" y2="285" />
        <line x1="240" y1="275" x2="248" y2="285" />
        <line x1="240" y1="290" x2="234" y2="320" />
        <line x1="240" y1="290" x2="246" y2="320" />
      </g>
    </svg>
  );
}

/* 6. SeafoodHastingsSvg — for Bistro C. Modern beachfront, white,
 *    curved, ocean view. */
export function SeafoodHastingsSvg({
  title = "Modern seafood — white beachfront dining looking out to sea",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="180" fill="#E0EFEC" />
      {/* Distant horizon */}
      <line x1="0" y1="180" x2="480" y2="180" stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Ocean */}
      <rect x="0" y="180" width="480" height="100" fill="#5BA89B" opacity="0.45" />
      <g stroke={STROKE} strokeWidth="1.5" fill="none" opacity="0.6">
        <path d="M0 200 Q60 195 120 200 T240 200 T360 200 T480 200" />
        <path d="M0 230 Q60 225 120 230 T240 230 T360 230 T480 230" />
        <path d="M0 260 Q60 255 120 260 T240 260 T360 260 T480 260" />
      </g>
      {/* Beach */}
      <rect x="0" y="280" width="480" height="80" fill="#D9C9A6" fillOpacity="0.5" />
      {/* Modern white building */}
      <g stroke={STROKE_DK} strokeWidth="2" fill={WASH}>
        <path d="M40 280 L40 160 Q40 130 80 130 L320 130 Q360 130 360 160 L360 280 Z" />
      </g>
      {/* Curved roofline (modern, sail-like) */}
      <g stroke={STROKE_DK} strokeWidth="1.5" fill="none">
        <path d="M40 160 Q200 100 360 160" />
      </g>
      {/* Floor-to-ceiling glass */}
      <g stroke={STROKE_DK} strokeWidth="1.5" fill="#5BA89B" fillOpacity="0.2">
        <rect x="60" y="190" width="280" height="90" />
      </g>
      <g stroke={STROKE_DK} strokeWidth="1.5">
        <line x1="100" y1="190" x2="100" y2="280" />
        <line x1="140" y1="190" x2="140" y2="280" />
        <line x1="180" y1="190" x2="180" y2="280" />
        <line x1="220" y1="190" x2="220" y2="280" />
        <line x1="260" y1="190" x2="260" y2="280" />
        <line x1="300" y1="190" x2="300" y2="280" />
      </g>
      {/* Sun */}
      <circle cx="400" cy="60" r="20" fill={WASH} stroke={STROKE_DK} strokeWidth="1.5" />
    </svg>
  );
}

/* 7. ItalianNoosavilleSvg — for Locale. Riverside Italian, terracotta
 *    awning, outdoor tables. */
export function ItalianNoosavilleSvg({
  title = "Riverside Italian — terracotta awning over outdoor tables",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="160" fill="#E0EFEC" />
      {/* River */}
      <rect x="0" y="240" width="480" height="120" fill="#5BA89B" opacity="0.4" />
      <g stroke={STROKE} strokeWidth="1.5" fill="none" opacity="0.6">
        <path d="M0 280 Q40 275 80 280 T160 280 T240 280 T320 280 T400 280 T480 280" />
        <path d="M0 320 Q40 315 80 320 T160 320 T240 320 T320 320 T400 320 T480 320" />
      </g>
      {/* Riverside building */}
      <rect x="60" y="180" width="360" height="100" fill="#A8D4CA" fillOpacity="0.7" />
      <line x1="60" y1="180" x2="420" y2="180" stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Terracotta awning */}
      <rect x="60" y="180" width="360" height="16" fill="#C97B4A" />
      <g stroke={STROKE_DK} strokeWidth="1.5" fill="none">
        <line x1="120" y1="180" x2="120" y2="196" />
        <line x1="180" y1="180" x2="180" y2="196" />
        <line x1="240" y1="180" x2="240" y2="196" />
        <line x1="300" y1="180" x2="300" y2="196" />
        <line x1="360" y1="180" x2="360" y2="196" />
      </g>
      {/* Windows */}
      <g stroke={STROKE_DK} strokeWidth="1.5" fill={WASH}>
        <rect x="80" y="210" width="60" height="60" />
        <rect x="160" y="210" width="60" height="60" />
        <rect x="240" y="210" width="60" height="60" />
        <rect x="320" y="210" width="60" height="60" />
      </g>
      {/* Outdoor tables */}
      <g stroke={INK} strokeWidth="1.5" fill={WASH}>
        <circle cx="100" cy="310" r="8" />
        <circle cx="180" cy="320" r="8" />
        <circle cx="260" cy="310" r="8" />
        <circle cx="340" cy="320" r="8" />
      </g>
    </svg>
  );
}

/* ====================================================================
 * Cross-section accommodation filters (pet-friendly, family,
 * accessible). Generic Noosa scenes with explicit context for the
 * use case. Not branded.
 * ==================================================================== */

/* 8. PetFriendlyHero — a small dog on the beach, off-leash hours
 *    context. Generic Noosa Main Beach. */
export function PetFriendlyHero({
  title = "Pet-friendly — a dog on the beach at the off-leash hours",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="180" fill="#E0EFEC" />
      <line x1="0" y1="180" x2="480" y2="180" stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Ocean */}
      <rect x="0" y="180" width="480" height="80" fill="#5BA89B" opacity="0.45" />
      <g stroke={STROKE} strokeWidth="1.5" fill="none" opacity="0.6">
        <path d="M0 200 Q60 195 120 200 T240 200 T360 200 T480 200" />
        <path d="M0 230 Q60 225 120 230 T240 230 T360 230 T480 230" />
      </g>
      {/* Beach */}
      <rect x="0" y="260" width="480" height="100" fill="#D9C9A6" fillOpacity="0.6" />
      {/* Headland silhouette */}
      <path
        d="M0 180 Q60 150 120 165 Q200 185 280 158 Q360 135 480 170 L480 200 L0 200 Z"
        fill="#A8D4CA"
        opacity="0.6"
      />
      {/* Person silhouette */}
      <g stroke={INK} strokeWidth="2" strokeLinecap="round" fill={INK}>
        <circle cx="160" cy="285" r="8" />
        <line x1="160" y1="293" x2="160" y2="330" />
        <line x1="160" y1="305" x2="148" y2="320" />
        <line x1="160" y1="305" x2="172" y2="320" />
        <line x1="160" y1="330" x2="152" y2="358" />
        <line x1="160" y1="330" x2="168" y2="358" />
        {/* Leash */}
        <path d="M172 320 Q190 320 200 320" stroke={INK} strokeWidth="1.5" fill="none" />
      </g>
      {/* Dog silhouette (medium, four-legged) */}
      <g stroke={INK} strokeWidth="2" strokeLinecap="round" fill={INK}>
        <ellipse cx="220" cy="335" rx="14" ry="8" />
        <circle cx="240" cy="328" r="6" />
        <line x1="248" y1="332" x2="252" y2="330" />
        <line x1="206" y1="340" x2="206" y2="352" />
        <line x1="214" y1="340" x2="214" y2="352" />
        <line x1="226" y1="340" x2="226" y2="352" />
        <line x1="234" y1="340" x2="234" y2="352" />
        {/* Tail */}
        <path d="M206 332 Q198 325 200 318" stroke={INK} strokeWidth="1.5" fill="none" />
      </g>
      {/* Footprints */}
      <g stroke={INK} strokeWidth="1" fill={INK} opacity="0.4">
        <ellipse cx="280" cy="345" rx="2" ry="3" />
        <ellipse cx="290" cy="350" rx="2" ry="3" />
        <ellipse cx="300" cy="345" rx="2" ry="3" />
        <ellipse cx="310" cy="350" rx="2" ry="3" />
      </g>
      {/* Sun */}
      <circle cx="400" cy="60" r="20" fill={WASH} stroke={STROKE_DK} strokeWidth="1.5" />
    </svg>
  );
}

/* 9. FamilyHero — parent + child silhouette on the beach. */
export function FamilyHero({
  title = "Family stays — a parent and child on the beach",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="180" fill="#E0EFEC" />
      <line x1="0" y1="180" x2="480" y2="180" stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Ocean */}
      <rect x="0" y="180" width="480" height="80" fill="#5BA89B" opacity="0.45" />
      <g stroke={STROKE} strokeWidth="1.5" fill="none" opacity="0.6">
        <path d="M0 200 Q60 195 120 200 T240 200 T360 200 T480 200" />
        <path d="M0 230 Q60 225 120 230 T240 230 T360 230 T480 230" />
      </g>
      {/* Beach */}
      <rect x="0" y="260" width="480" height="100" fill="#D9C9A6" fillOpacity="0.6" />
      {/* Headland */}
      <path
        d="M0 180 Q60 150 120 165 Q200 185 280 158 Q360 135 480 170 L480 200 L0 200 Z"
        fill="#A8D4CA"
        opacity="0.6"
      />
      {/* Parent silhouette (taller) */}
      <g stroke={INK} strokeWidth="2" strokeLinecap="round" fill={INK}>
        <circle cx="200" cy="270" r="9" />
        <line x1="200" y1="279" x2="200" y2="325" />
        <line x1="200" y1="290" x2="186" y2="310" />
        <line x1="200" y1="290" x2="214" y2="310" />
        <line x1="200" y1="325" x2="192" y2="358" />
        <line x1="200" y1="325" x2="208" y2="358" />
        {/* Holding child's hand */}
        <path d="M214 310 Q224 320 232 330" stroke={INK} strokeWidth="1.5" fill="none" />
      </g>
      {/* Child silhouette (shorter) */}
      <g stroke={INK} strokeWidth="2" strokeLinecap="round" fill={INK}>
        <circle cx="244" cy="310" r="6" />
        <line x1="244" y1="316" x2="244" y2="345" />
        <line x1="244" y1="322" x2="236" y2="335" />
        <line x1="244" y1="322" x2="252" y2="335" />
        <line x1="244" y1="345" x2="240" y2="358" />
        <line x1="244" y1="345" x2="248" y2="358" />
      </g>
      {/* Bucket */}
      <g stroke={INK} strokeWidth="1.5" fill={AMBER} fillOpacity="0.6">
        <path d="M280 350 L300 350 L297 360 L283 360 Z" />
      </g>
      {/* Sun */}
      <circle cx="400" cy="60" r="20" fill={WASH} stroke={STROKE_DK} strokeWidth="1.5" />
    </svg>
  );
}

/* 10. AccessibleHero — step-free path to a ground-floor unit. */
export function AccessibleHero({
  title = "Accessible — step-free path to a ground-floor unit",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="180" fill="#E0EFEC" />
      <path d="M0 180 Q60 150 120 165 Q200 185 280 158 Q360 135 480 170 L480 200 L0 200 Z" fill="#A8D4CA" opacity="0.6" />
      <rect x="0" y="240" width="480" height="120" fill="#5BA89B" fillOpacity="0.3" />
      <rect x="80" y="160" width="320" height="120" fill={WASH} stroke={STROKE_DK} strokeWidth="2" />
      <rect x="200" y="200" width="80" height="80" fill="#5BA89B" fillOpacity="0.5" stroke={STROKE_DK} strokeWidth="1.5" />
      <line x1="240" y1="200" x2="240" y2="280" stroke={STROKE_DK} strokeWidth="1.5" />
      <rect x="100" y="180" width="60" height="50" fill={WASH} stroke={STROKE_DK} strokeWidth="1.5" />
      <rect x="320" y="180" width="60" height="50" fill={WASH} stroke={STROKE_DK} strokeWidth="1.5" />
      <path d="M60 280 L240 240" stroke={STROKE_DK} strokeWidth="3" fill="none" />
      <line x1="60" y1="280" x2="60" y2="265" stroke={STROKE_DK} strokeWidth="1.5" />
      <line x1="240" y1="240" x2="240" y2="225" stroke={STROKE_DK} strokeWidth="1.5" />
      <line x1="55" y1="265" x2="240" y2="222" stroke={STROKE_DK} strokeWidth="1.5" />
      <line x1="65" y1="265" x2="240" y2="232" stroke={STROKE_DK} strokeWidth="1.5" />
      <line x1="55" y1="265" x2="55" y2="260" stroke={STROKE_DK} strokeWidth="1.5" />
      <circle cx="360" cy="290" r="8" fill={INK} />
      <path d="M355 295 L360 305 L370 305" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="365" cy="320" r="14" fill="none" stroke={INK} strokeWidth="2" />
      <circle cx="400" cy="60" r="20" fill={WASH} stroke={STROKE_DK} strokeWidth="1.5" />
    </svg>
  );
}

/* ====================================================================
 * Reuse surface — keyed by FallbackSvgKey.
 * Consumed by src/components/ui/LocationPhoto.tsx.
 * ==================================================================== */

export const FALLBACK_SVGS = {
  "sunshine-beach": SunshineBeachHero,
  "japanese-riverside": JapaneseRiversideSvg,
  "beachfront-seafood": BeachfrontSeafoodSvg,
  "italian-hastings": ItalianHastingsSvg,
  "asian-junction": AsianJunctionSvg,
  "seafood-hastings": SeafoodHastingsSvg,
  "italian-noosaville": ItalianNoosavilleSvg,
  "pet-friendly": PetFriendlyHero,
  "family": FamilyHero,
  "accessible": AccessibleHero,
} as const;

export type FallbackSvgKey = keyof typeof FALLBACK_SVGS;
