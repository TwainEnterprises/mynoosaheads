/**
 * V6P2Fallbacks — bespoke editorial illustration library (v6.2,
 * MSN-2963-V6.2-PHOTOS-ILLUSTRATIONS, 2026-10-14).
 *
 * 33 illustrations covering gaps + venue typologies + editorial
 * scene library. Style: 1.5px stroke, sea-glass palette, 480×360
 * viewBox, 4:3, layered foreground/midground/background, inlined
 * into the DOM (no HTTP round-trip).
 *
 * Coverage:
 *   - 3 gap fillers
 *       sunshine-beach · accessible · area-noosa-junction
 *   - 6 venue typologies (carry-over from v6.1.1 — historical, kept
 *     for future use)
 *       japanese-riverside (Wasabi) · beachfront-seafood (Sails) ·
 *       italian-hastings (Berardo's) · asian-junction (Sum Yung Guys) ·
 *       seafood-hastings (Bistro C) · italian-noosaville (Locale)
 *   - 7 area scenes
 *       area-noosa-heads · area-hastings-street · area-noosaville ·
 *       area-tewantin · area-peregian · area-noosa-national-park ·
 *       area-hinterland
 *   - 6 activity scenes
 *       activity-surf · activity-sup · activity-kayak ·
 *       activity-swim · activity-hike · activity-fishing
 *   - 5 trip-theme scenes (plus 2 from gap fillers: pet-friendly, family)
 *       trip-romantic · trip-budget · trip-solo · trip-group ·
 *       trip-business
 *   - 4 decorative for sub-pages
 *       tewantin · peregian · hinterland · cross-section-pets
 *
 * Design intent (matches the v6 AreaHeroes):
 *   - 1.5px stroke, sea-glass (#2F8074 / #0E4A41), ink (#0A1F1B) detail.
 *   - 480×360 viewBox (4:3 editorial ratio).
 *   - Soft paper-100 wash background so the illustration reads as a
 *     hero card.
 *   - Subject references the page's editorial content.
 *   - role="img" + aria-label for a11y.
 *   - Layered foreground / midground / background (NOT flat icons).
 *
 * Reuse surface: `FALLBACK_SVGS` const at the bottom — keyed by
 * `FallbackSvgKey` and consumed by the `LocationPhoto` and
 * `LocationCaptionedPhoto` components.
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

// Sea-glass palette (v6). Stay on-palette.
const STROKE = "#2F8074";       // ocean-700
const STROKE_DK = "#0E4A41";    // ocean-900
const STROKE_LT = "#5BA89B";    // ocean-500
const INK = "#0A1F1B";          // ink-900
const AMBER = "#B8742A";        // accent amber
const SAND = "#D9C9A6";        // beach sand
const WASH = "#F4F8F7";        // paper-100
const SKY = "#E0EFEC";         // sky wash
const SUN = "#F4D9A0";         // warm wash
const SUNSET_1 = "#F2A66E";    // sunset peach
const SUNSET_2 = "#D77757";    // sunset coral
const PAPER_200 = "#E2EBE7";   // paper-200
const PAPER_300 = "#CCD9D2";   // paper-300

/* ====================================================================
 * 1. SunshineBeachHero — the surf village south of the headland.
 *    Gap filler for accommodation/sunshine-beach (no open-licence
 *    holiday-house photo). Editorial scene with SLSC + village.
 * ==================================================================== */

export function SunshineBeachHero({
  title = "Sunshine Beach — the surf village south of the headland",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="200" fill={SKY} />
      <circle cx="380" cy="60" r="22" fill={SUN} stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Distant Noosa Heads (north) */}
      <path
        d="M0 200 Q40 175 80 185 Q120 195 160 180 L160 200 Z"
        fill={STROKE_LT}
        opacity="0.55"
      />
      {/* Surf line / horizon */}
      <line x1="0" y1="200" x2="480" y2="200" stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Beach sand */}
      <path
        d="M0 230 Q120 220 240 230 Q360 240 480 230 L480 280 L0 280 Z"
        fill={SAND}
        opacity="0.6"
      />
      {/* Surf break */}
      <g stroke={STROKE} strokeWidth="1.5" fill="none" opacity="0.7">
        <path d="M0 250 Q60 245 120 250 T240 250 T360 250 T480 250" />
        <path d="M0 270 Q60 265 120 270 T240 270 T360 270 T480 270" />
      </g>
      {/* Foreground headland (southern bluff) */}
      <path
        d="M0 360 L0 280 Q60 260 120 270 Q200 285 280 270 Q380 250 480 270 L480 360 Z"
        fill={STROKE_LT}
        opacity="0.85"
      />
      {/* Village buildings (small, generic — village square) */}
      <g stroke={INK} strokeWidth="1.5" fill={STROKE_LT} fillOpacity="0.85">
        <rect x="180" y="290" width="40" height="35" />
        <polygon points="180,290 200,278 220,290" />
        <rect x="225" y="295" width="35" height="30" />
        <polygon points="225,295 242.5,283 260,295" />
        <rect x="265" y="288" width="38" height="37" />
        <polygon points="265,288 284,275 303,288" />
      </g>
      {/* Foreground palms */}
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
 * 2-7. Eat & drink venue-type illustrations (carry-over from v6.1.1).
 * Generic typologies, not branded imitations.
 * ==================================================================== */

/* 2. JapaneseRiversideSvg — for Wasabi typology. */
export function JapaneseRiversideSvg({
  title = "Riverside Japanese — a low-slung timber building on the river",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="160" fill={SKY} />
      <path
        d="M0 160 Q60 130 120 145 Q200 165 280 138 Q360 115 480 150 L480 200 L0 200 Z"
        fill={STROKE_LT}
        opacity="0.6"
      />
      <rect x="0" y="200" width="480" height="160" fill={STROKE_LT} opacity="0.45" />
      <g stroke={STROKE} strokeWidth="1.5" fill="none" opacity="0.6">
        <path d="M0 240 Q40 235 80 240 T160 240 T240 240 T320 240 T400 240 T480 240" />
        <path d="M0 280 Q40 275 80 280 T160 280 T240 280 T320 280 T400 280 T480 280" />
        <path d="M0 320 Q40 315 80 320 T160 320 T240 320 T320 320 T400 320 T480 320" />
      </g>
      <g stroke={STROKE_DK} strokeWidth="2" fill={STROKE_LT} fillOpacity="0.85">
        <rect x="100" y="190" width="280" height="80" />
        <polygon points="100,190 240,160 380,190" />
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
      <g stroke={INK} strokeWidth="1.5">
        <line x1="120" y1="270" x2="120" y2="340" />
        <line x1="180" y1="270" x2="180" y2="340" />
        <line x1="240" y1="270" x2="240" y2="340" />
        <line x1="300" y1="270" x2="300" y2="340" />
        <line x1="360" y1="270" x2="360" y2="340" />
      </g>
      <g stroke={AMBER} strokeWidth="1.5" fill={AMBER} fillOpacity="0.4">
        <line x1="80" y1="170" x2="80" y2="200" />
        <rect x="74" y="200" width="12" height="14" />
      </g>
      <circle cx="400" cy="60" r="22" fill={WASH} stroke={STROKE_DK} strokeWidth="1.5" />
    </svg>
  );
}

/* 3. BeachfrontSeafoodSvg — for Sails typology. */
export function BeachfrontSeafoodSvg({
  title = "Beachfront restaurant — open-sided dining on the sand",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="180" fill={SKY} />
      <circle cx="100" cy="60" r="22" fill={SUN} stroke={STROKE_DK} strokeWidth="1.5" />
      <rect x="0" y="180" width="480" height="120" fill={STROKE_LT} opacity="0.45" />
      <g stroke={STROKE} strokeWidth="1.5" fill="none" opacity="0.7">
        <path d="M0 200 Q60 195 120 200 T240 200 T360 200 T480 200" />
        <path d="M0 230 Q60 225 120 230 T240 230 T360 230 T480 230" />
        <path d="M0 260 Q60 255 120 260 T240 260 T360 260 T480 260" />
      </g>
      <rect x="0" y="300" width="480" height="60" fill={SAND} opacity="0.5" />
      <g stroke={STROKE_DK} strokeWidth="2" fill={STROKE_LT} fillOpacity="0.85">
        <rect x="80" y="240" width="320" height="60" />
        <line x1="60" y1="240" x2="60" y2="220" />
        <line x1="140" y1="240" x2="140" y2="220" />
        <line x1="220" y1="240" x2="220" y2="220" />
        <line x1="300" y1="240" x2="300" y2="220" />
        <line x1="380" y1="240" x2="380" y2="220" />
        <line x1="60" y1="220" x2="400" y2="220" strokeWidth="1.5" />
      </g>
      <g stroke={INK} strokeWidth="1.5" fill={WASH}>
        <path d="M120 240 Q120 220 140 220 Q160 220 160 240 Z" fill={STROKE_LT} fillOpacity="0.5" />
        <line x1="140" y1="240" x2="140" y2="260" />
        <path d="M260 240 Q260 215 285 215 Q310 215 310 240 Z" fill={STROKE_LT} fillOpacity="0.5" />
        <line x1="285" y1="240" x2="285" y2="260" />
        <path d="M340 240 Q340 220 360 220 Q380 220 380 240 Z" fill={STROKE_LT} fillOpacity="0.5" />
        <line x1="360" y1="240" x2="360" y2="260" />
      </g>
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

/* 4. ItalianHastingsSvg — for Berardo's typology. */
export function ItalianHastingsSvg({
  title = "Italian restaurant — awning and footpath tables on the street",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="200" fill={SKY} />
      <rect x="60" y="180" width="360" height="120" fill={STROKE_LT} fillOpacity="0.6" />
      <line x1="60" y1="180" x2="420" y2="180" stroke={STROKE_DK} strokeWidth="1.5" />
      <g>
        <rect x="60" y="180" width="360" height="20" fill={STROKE} />
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
      <g stroke={STROKE_DK} strokeWidth="1.5" fill={WASH}>
        <rect x="80" y="220" width="80" height="60" />
        <rect x="200" y="220" width="80" height="60" />
        <rect x="320" y="220" width="80" height="60" />
      </g>
      <g stroke={INK} strokeWidth="1.5" fill={WASH}>
        <circle cx="120" cy="310" r="10" />
        <circle cx="360" cy="310" r="10" />
        <rect x="105" y="318" width="30" height="20" />
        <rect x="345" y="318" width="30" height="20" />
      </g>
      <g stroke={INK} strokeWidth="1.5" fill="none">
        <line x1="40" y1="360" x2="40" y2="200" />
        <circle cx="40" cy="200" r="4" fill={AMBER} />
      </g>
    </svg>
  );
}

/* 5. AsianJunctionSvg — for Sum Yung Guys typology. */
export function AsianJunctionSvg({
  title = "Laneway restaurant — casual South-east Asian on a Junction lane",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="120" fill={SKY} />
      <rect x="0" y="120" width="160" height="240" fill={STROKE_LT} fillOpacity="0.6" />
      <rect x="320" y="120" width="160" height="240" fill={STROKE_LT} fillOpacity="0.6" />
      <line x1="160" y1="120" x2="160" y2="360" stroke={STROKE_DK} strokeWidth="1.5" />
      <line x1="320" y1="120" x2="320" y2="360" stroke={STROKE_DK} strokeWidth="1.5" />
      <path d="M160 360 L320 360 L300 200 L180 200 Z" fill={SAND} fillOpacity="0.5" />
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
      <g stroke={AMBER} strokeWidth="1.5" fill={AMBER} fillOpacity="0.5">
        <line x1="160" y1="140" x2="320" y2="140" />
        <circle cx="200" cy="160" r="6" />
        <circle cx="240" cy="160" r="6" />
        <circle cx="280" cy="160" r="6" />
      </g>
      <g stroke={INK} strokeWidth="1.5" fill="none">
        <path d="M180 200 L300 200 L300 180 L180 180 Z" fill={STROKE} fillOpacity="0.7" />
      </g>
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

/* 6. SeafoodHastingsSvg — for Bistro C typology. */
export function SeafoodHastingsSvg({
  title = "Modern seafood — white beachfront dining looking out to sea",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="180" fill={SKY} />
      <line x1="0" y1="180" x2="480" y2="180" stroke={STROKE_DK} strokeWidth="1.5" />
      <rect x="0" y="180" width="480" height="100" fill={STROKE_LT} opacity="0.45" />
      <g stroke={STROKE} strokeWidth="1.5" fill="none" opacity="0.6">
        <path d="M0 200 Q60 195 120 200 T240 200 T360 200 T480 200" />
        <path d="M0 230 Q60 225 120 230 T240 230 T360 230 T480 230" />
        <path d="M0 260 Q60 255 120 260 T240 260 T360 260 T480 260" />
      </g>
      <rect x="0" y="280" width="480" height="80" fill={SAND} fillOpacity="0.5" />
      <g stroke={STROKE_DK} strokeWidth="2" fill={WASH}>
        <path d="M40 280 L40 160 Q40 130 80 130 L320 130 Q360 130 360 160 L360 280 Z" />
      </g>
      <g stroke={STROKE_DK} strokeWidth="1.5" fill="none">
        <path d="M40 160 Q200 100 360 160" />
      </g>
      <g stroke={STROKE_DK} strokeWidth="1.5" fill={STROKE_LT} fillOpacity="0.2">
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
      <circle cx="400" cy="60" r="20" fill={SUN} stroke={STROKE_DK} strokeWidth="1.5" />
    </svg>
  );
}

/* 7. ItalianNoosavilleSvg — for Locale typology. */
export function ItalianNoosavilleSvg({
  title = "Riverside Italian — terracotta awning over outdoor tables",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="160" fill={SKY} />
      <rect x="0" y="240" width="480" height="120" fill={STROKE_LT} opacity="0.4" />
      <g stroke={STROKE} strokeWidth="1.5" fill="none" opacity="0.6">
        <path d="M0 280 Q40 275 80 280 T160 280 T240 280 T320 280 T400 280 T480 280" />
        <path d="M0 320 Q40 315 80 320 T160 320 T240 320 T320 320 T400 320 T480 320" />
      </g>
      <rect x="60" y="180" width="360" height="100" fill={STROKE_LT} fillOpacity="0.7" />
      <line x1="60" y1="180" x2="420" y2="180" stroke={STROKE_DK} strokeWidth="1.5" />
      <rect x="60" y="180" width="360" height="16" fill="#C97B4A" />
      <g stroke={STROKE_DK} strokeWidth="1.5" fill="none">
        <line x1="120" y1="180" x2="120" y2="196" />
        <line x1="180" y1="180" x2="180" y2="196" />
        <line x1="240" y1="180" x2="240" y2="196" />
        <line x1="300" y1="180" x2="300" y2="196" />
        <line x1="360" y1="180" x2="360" y2="196" />
      </g>
      <g stroke={STROKE_DK} strokeWidth="1.5" fill={WASH}>
        <rect x="80" y="210" width="60" height="60" />
        <rect x="160" y="210" width="60" height="60" />
        <rect x="240" y="210" width="60" height="60" />
        <rect x="320" y="210" width="60" height="60" />
      </g>
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
 * 8-10. Cross-section accommodation filters (gap fillers).
 * Generic Noosa scenes with explicit context for the use case.
 * ==================================================================== */

/* 8. PetFriendlyHero — small dog on the beach. */
export function PetFriendlyHero({
  title = "Pet-friendly — a dog on the beach at the off-leash hours",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="180" fill={SKY} />
      <line x1="0" y1="180" x2="480" y2="180" stroke={STROKE_DK} strokeWidth="1.5" />
      <rect x="0" y="180" width="480" height="80" fill={STROKE_LT} opacity="0.45" />
      <g stroke={STROKE} strokeWidth="1.5" fill="none" opacity="0.6">
        <path d="M0 200 Q60 195 120 200 T240 200 T360 200 T480 200" />
        <path d="M0 230 Q60 225 120 230 T240 230 T360 230 T480 230" />
      </g>
      <rect x="0" y="260" width="480" height="100" fill={SAND} fillOpacity="0.6" />
      <path
        d="M0 180 Q60 150 120 165 Q200 185 280 158 Q360 135 480 170 L480 200 L0 200 Z"
        fill={STROKE_LT}
        opacity="0.6"
      />
      <g stroke={INK} strokeWidth="2" strokeLinecap="round" fill={INK}>
        <circle cx="160" cy="285" r="8" />
        <line x1="160" y1="293" x2="160" y2="330" />
        <line x1="160" y1="305" x2="148" y2="320" />
        <line x1="160" y1="305" x2="172" y2="320" />
        <line x1="160" y1="330" x2="152" y2="358" />
        <line x1="160" y1="330" x2="168" y2="358" />
        <path d="M172 320 Q190 320 200 320" stroke={INK} strokeWidth="1.5" fill="none" />
      </g>
      <g stroke={INK} strokeWidth="2" strokeLinecap="round" fill={INK}>
        <ellipse cx="220" cy="335" rx="14" ry="8" />
        <circle cx="240" cy="328" r="6" />
        <line x1="248" y1="332" x2="252" y2="330" />
        <line x1="206" y1="340" x2="206" y2="352" />
        <line x1="214" y1="340" x2="214" y2="352" />
        <line x1="226" y1="340" x2="226" y2="352" />
        <line x1="234" y1="340" x2="234" y2="352" />
        <path d="M206 332 Q198 325 200 318" stroke={INK} strokeWidth="1.5" fill="none" />
      </g>
      <g stroke={INK} strokeWidth="1" fill={INK} opacity="0.4">
        <ellipse cx="280" cy="345" rx="2" ry="3" />
        <ellipse cx="290" cy="350" rx="2" ry="3" />
        <ellipse cx="300" cy="345" rx="2" ry="3" />
        <ellipse cx="310" cy="350" rx="2" ry="3" />
      </g>
      <circle cx="400" cy="60" r="20" fill={SUN} stroke={STROKE_DK} strokeWidth="1.5" />
    </svg>
  );
}

/* 9. FamilyHero — parent + child silhouette. */
export function FamilyHero({
  title = "Family stays — a parent and child on the beach",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="180" fill={SKY} />
      <line x1="0" y1="180" x2="480" y2="180" stroke={STROKE_DK} strokeWidth="1.5" />
      <rect x="0" y="180" width="480" height="80" fill={STROKE_LT} opacity="0.45" />
      <g stroke={STROKE} strokeWidth="1.5" fill="none" opacity="0.6">
        <path d="M0 200 Q60 195 120 200 T240 200 T360 200 T480 200" />
        <path d="M0 230 Q60 225 120 230 T240 230 T360 230 T480 230" />
      </g>
      <rect x="0" y="260" width="480" height="100" fill={SAND} fillOpacity="0.6" />
      <path
        d="M0 180 Q60 150 120 165 Q200 185 280 158 Q360 135 480 170 L480 200 L0 200 Z"
        fill={STROKE_LT}
        opacity="0.6"
      />
      <g stroke={INK} strokeWidth="2" strokeLinecap="round" fill={INK}>
        <circle cx="200" cy="270" r="9" />
        <line x1="200" y1="279" x2="200" y2="325" />
        <line x1="200" y1="290" x2="186" y2="310" />
        <line x1="200" y1="290" x2="214" y2="310" />
        <line x1="200" y1="325" x2="192" y2="358" />
        <line x1="200" y1="325" x2="208" y2="358" />
        <path d="M214 310 Q224 320 232 330" stroke={INK} strokeWidth="1.5" fill="none" />
      </g>
      <g stroke={INK} strokeWidth="2" strokeLinecap="round" fill={INK}>
        <circle cx="244" cy="310" r="6" />
        <line x1="244" y1="316" x2="244" y2="345" />
        <line x1="244" y1="322" x2="236" y2="335" />
        <line x1="244" y1="322" x2="252" y2="335" />
        <line x1="244" y1="345" x2="240" y2="358" />
        <line x1="244" y1="345" x2="248" y2="358" />
      </g>
      <g stroke={INK} strokeWidth="1.5" fill={AMBER} fillOpacity="0.6">
        <path d="M280 350 L300 350 L297 360 L283 360 Z" />
      </g>
      <circle cx="400" cy="60" r="20" fill={SUN} stroke={STROKE_DK} strokeWidth="1.5" />
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
      <rect x="0" y="0" width="480" height="180" fill={SKY} />
      <path d="M0 180 Q60 150 120 165 Q200 185 280 158 Q360 135 480 170 L480 200 L0 200 Z" fill={STROKE_LT} opacity="0.6" />
      <rect x="0" y="240" width="480" height="120" fill={STROKE_LT} fillOpacity="0.3" />
      <rect x="80" y="160" width="320" height="120" fill={WASH} stroke={STROKE_DK} strokeWidth="2" />
      <rect x="200" y="200" width="80" height="80" fill={STROKE_LT} fillOpacity="0.5" stroke={STROKE_DK} strokeWidth="1.5" />
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
      <circle cx="400" cy="60" r="20" fill={SUN} stroke={STROKE_DK} strokeWidth="1.5" />
    </svg>
  );
}

/* ====================================================================
 * 11-17. AREA SCENES — small editorial scenes for the seven regions
 * that have photos, but also benefit from a typology illustration
 * for sub-pages and future use.
 * ==================================================================== */

/* 11. AreaNoosaHeads — headland + surf-club arc. */
export function AreaNoosaHeads({
  title = "Noosa Heads — the coastal headland and surf-club arc",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="170" fill={SKY} />
      <circle cx="380" cy="50" r="22" fill={SUN} stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Distant headland (left, north shore) */}
      <path
        d="M0 170 Q40 145 100 160 Q160 175 220 150 L220 170 Z"
        fill={STROKE_LT}
        opacity="0.55"
      />
      {/* Surf line */}
      <line x1="0" y1="170" x2="480" y2="170" stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Ocean */}
      <rect x="0" y="170" width="480" height="120" fill={STROKE_LT} opacity="0.45" />
      <g stroke={STROKE} strokeWidth="1.5" fill="none" opacity="0.6">
        <path d="M0 190 Q60 185 120 190 T240 190 T360 190 T480 190" />
        <path d="M0 220 Q60 215 120 220 T240 220 T360 220 T480 220" />
        <path d="M0 250 Q60 245 120 250 T240 250 T360 250 T480 250" />
      </g>
      {/* Beach */}
      <rect x="0" y="290" width="480" height="70" fill={SAND} fillOpacity="0.55" />
      {/* Foreground headland (right, First Point) */}
      <path
        d="M280 360 L0 290 Q120 280 240 290 Q360 295 480 285 L480 360 Z"
        fill={STROKE_LT}
        opacity="0.85"
      />
      {/* Surf club building (mid-right) */}
      <g stroke={INK} strokeWidth="1.5" fill={WASH}>
        <rect x="320" y="295" width="80" height="40" />
        <rect x="328" y="305" width="14" height="14" />
        <rect x="346" y="305" width="14" height="14" />
        <rect x="364" y="305" width="14" height="14" />
        <rect x="382" y="305" width="14" height="14" />
        {/* Roof slope */}
        <polygon points="320,295 360,283 400,295" fill={AMBER} fillOpacity="0.4" />
      </g>
      {/* Lifeguad tower silhouette */}
      <g stroke={INK} strokeWidth="1.5" fill="none">
        <line x1="350" y1="295" x2="350" y2="275" />
        <rect x="345" y="265" width="14" height="10" />
      </g>
      {/* Foreground pandanus */}
      <g stroke={INK} strokeWidth="1.5" strokeLinecap="round" fill="none">
        <line x1="30" y1="360" x2="35" y2="290" />
        <path d="M35 290 L20 280" />
        <path d="M35 290 L50 280" />
        <path d="M35 290 L25 270" />
        <path d="M35 290 L48 272" />
      </g>
    </svg>
  );
}

/* 12. AreaHastingsStreet — boutique colonnade. */
export function AreaHastingsStreet({
  title = "Hastings Street — the boutique colonnade",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="180" fill={SKY} />
      {/* Distant ocean hint (north end of Hastings) */}
      <line x1="0" y1="180" x2="120" y2="180" stroke={STROKE_DK} strokeWidth="1.5" />
      <rect x="0" y="180" width="120" height="30" fill={STROKE_LT} opacity="0.4" />
      {/* Far headland */}
      <path d="M120 180 Q140 160 160 180 L160 200 L120 200 Z" fill={STROKE_LT} opacity="0.5" />
      {/* Building line — colonnade */}
      <rect x="0" y="160" width="480" height="100" fill={STROKE_LT} fillOpacity="0.7" />
      <line x1="0" y1="160" x2="480" y2="160" stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Veranda colonnade posts */}
      <g stroke={STROKE_DK} strokeWidth="1.5">
        <line x1="40" y1="160" x2="40" y2="240" />
        <line x1="100" y1="160" x2="100" y2="240" />
        <line x1="160" y1="160" x2="160" y2="240" />
        <line x1="220" y1="160" x2="220" y2="240" />
        <line x1="280" y1="160" x2="280" y2="240" />
        <line x1="340" y1="160" x2="340" y2="240" />
        <line x1="400" y1="160" x2="400" y2="240" />
        <line x1="460" y1="160" x2="460" y2="240" />
      </g>
      {/* Shopfront windows */}
      <g stroke={STROKE_DK} strokeWidth="1.5" fill={WASH}>
        <rect x="50" y="180" width="40" height="50" />
        <rect x="110" y="180" width="40" height="50" />
        <rect x="170" y="180" width="40" height="50" />
        <rect x="230" y="180" width="40" height="50" />
        <rect x="290" y="180" width="40" height="50" />
        <rect x="350" y="180" width="40" height="50" />
        <rect x="410" y="180" width="40" height="50" />
      </g>
      {/* Awning (band) */}
      <rect x="0" y="240" width="480" height="14" fill={STROKE} />
      <g stroke={WASH} strokeWidth="2">
        <line x1="60" y1="240" x2="60" y2="254" />
        <line x1="120" y1="240" x2="120" y2="254" />
        <line x1="180" y1="240" x2="180" y2="254" />
        <line x1="240" y1="240" x2="240" y2="254" />
        <line x1="300" y1="240" x2="300" y2="254" />
        <line x1="360" y1="240" x2="360" y2="254" />
        <line x1="420" y1="240" x2="420" y2="254" />
      </g>
      {/* Footpath tables / parasols */}
      <g stroke={INK} strokeWidth="1.5" fill={WASH}>
        <circle cx="80" cy="290" r="10" />
        <circle cx="200" cy="290" r="10" />
        <circle cx="320" cy="290" r="10" />
        <circle cx="440" cy="290" r="10" />
        {/* Parasols */}
        <path d="M80 270 Q80 250 100 250 Q120 250 120 270 Z" fill={STROKE_LT} fillOpacity="0.6" />
        <line x1="100" y1="270" x2="100" y2="280" />
        <path d="M320 270 Q320 250 340 250 Q360 250 360 270 Z" fill={STROKE_LT} fillOpacity="0.6" />
        <line x1="340" y1="270" x2="340" y2="280" />
      </g>
      {/* Distant palms */}
      <g stroke={INK} strokeWidth="1.5" strokeLinecap="round" fill="none">
        <line x1="460" y1="160" x2="465" y2="120" />
        <path d="M465 120 q-12 -4 -16 -10" />
        <path d="M465 120 q12 -4 16 -10" />
      </g>
    </svg>
  );
}

/* 13. AreaNoosaville — riverfront along Gympie Terrace. */
export function AreaNoosaville({
  title = "Noosaville — riverfront along Gympie Terrace",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="160" fill={SKY} />
      <circle cx="100" cy="50" r="22" fill={SUN} stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Distant headland (south) */}
      <path
        d="M0 160 Q60 140 120 150 Q200 165 280 145 Q360 125 480 155 L480 200 L0 200 Z"
        fill={STROKE_LT}
        opacity="0.5"
      />
      {/* River */}
      <rect x="0" y="200" width="480" height="100" fill={STROKE_LT} opacity="0.45" />
      <g stroke={STROKE} strokeWidth="1.5" fill="none" opacity="0.6">
        <path d="M0 220 Q40 215 80 220 T160 220 T240 220 T320 220 T400 220 T480 220" />
        <path d="M0 250 Q40 245 80 250 T160 250 T240 250 T320 250 T400 250 T480 250" />
        <path d="M0 280 Q40 275 80 280 T160 280 T240 280 T320 280 T400 280 T480 280" />
      </g>
      {/* Hire craft on river */}
      <g stroke={INK} strokeWidth="1.5" fill={WASH}>
        <path d="M120 250 q12 -6 24 0 l-3 8 l-18 0 z" />
        <line x1="132" y1="245" x2="132" y2="232" />
        <path d="M120 232 q12 -3 24 0" fill="none" />
        <path d="M280 260 q14 -7 28 0 l-3 9 l-22 0 z" />
      </g>
      {/* Riverside palms — left and right */}
      <g stroke={INK} strokeWidth="1.5" strokeLinecap="round" fill="none">
        <path d="M30 200 q-3 -100 -10 -160" />
        <path d="M20 40 q-22 -10 -30 -22" />
        <path d="M20 40 q22 -8 32 -20" />
        <path d="M20 40 q-14 -16 -18 -30" />
        <path d="M20 40 q16 -14 24 -28" />
        <path d="M450 200 q4 -100 10 -160" />
        <path d="M460 40 q22 -10 30 -22" />
        <path d="M460 40 q-22 -8 -32 -20" />
        <path d="M460 40 q14 -16 18 -30" />
        <path d="M460 40 q-16 -14 -24 -28" />
      </g>
      {/* Foreground promenade */}
      <path d="M0 300 L480 300 L480 360 L0 360 Z" fill={SAND} fillOpacity="0.55" />
      <line x1="0" y1="300" x2="480" y2="300" stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Bike path detail */}
      <g stroke={INK} strokeWidth="1" fill="none" opacity="0.5">
        <line x1="60" y1="320" x2="420" y2="320" strokeDasharray="6 8" />
      </g>
      {/* Picnic table */}
      <g stroke={INK} strokeWidth="1.5" fill={WASH}>
        <rect x="200" y="325" width="80" height="6" />
        <line x1="210" y1="331" x2="210" y2="350" />
        <line x1="270" y1="331" x2="270" y2="350" />
      </g>
    </svg>
  );
}

/* 14. AreaTewantin — river town main street. */
export function AreaTewantin({
  title = "Tewantin — the river town main street",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="160" fill={SKY} />
      {/* Distant hill (Noosa hinterland hint) */}
      <path
        d="M0 160 Q60 130 120 145 Q200 165 280 140 Q360 120 480 150 L480 200 L0 200 Z"
        fill={STROKE_LT}
        opacity="0.5"
      />
      {/* Heritage pub facades */}
      <rect x="40" y="180" width="400" height="100" fill={STROKE_LT} fillOpacity="0.7" />
      <line x1="40" y1="180" x2="440" y2="180" stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Awning (typical country-town) */}
      <rect x="40" y="180" width="400" height="14" fill="#C97B4A" />
      <g stroke={STROKE_DK} strokeWidth="1.5" fill="none">
        <line x1="100" y1="180" x2="100" y2="194" />
        <line x1="160" y1="180" x2="160" y2="194" />
        <line x1="220" y1="180" x2="220" y2="194" />
        <line x1="280" y1="180" x2="280" y2="194" />
        <line x1="340" y1="180" x2="340" y2="194" />
        <line x1="400" y1="180" x2="400" y2="194" />
      </g>
      {/* Heritage windows / doors */}
      <g stroke={STROKE_DK} strokeWidth="1.5" fill={WASH}>
        <rect x="60" y="210" width="50" height="60" />
        <rect x="120" y="210" width="50" height="60" />
        <rect x="180" y="210" width="50" height="60" />
        <rect x="240" y="210" width="50" height="60" />
        <rect x="300" y="210" width="50" height="60" />
        <rect x="360" y="210" width="50" height="60" />
      </g>
      {/* Pub sign */}
      <g stroke={INK} strokeWidth="1.5" fill={WASH}>
        <rect x="180" y="195" width="80" height="14" />
      </g>
      <text x="220" y="206" fontSize="9" textAnchor="middle" fill={INK} fontFamily="serif">HOTEL</text>
      {/* Footpath */}
      <rect x="0" y="280" width="480" height="80" fill={SAND} fillOpacity="0.55" />
      <line x1="0" y1="280" x2="480" y2="280" stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Parked cars (silhouette) */}
      <g stroke={INK} strokeWidth="1.5" fill={PAPER_300}>
        <rect x="60" y="305" width="60" height="20" rx="4" />
        <rect x="340" y="305" width="60" height="20" rx="4" />
      </g>
      {/* Foreground person */}
      <g stroke={INK} strokeWidth="1.5" fill={INK}>
        <circle cx="240" cy="310" r="6" />
        <line x1="240" y1="316" x2="240" y2="345" />
        <line x1="240" y1="325" x2="232" y2="338" />
        <line x1="240" y1="325" x2="248" y2="338" />
        <line x1="240" y1="345" x2="234" y2="360" />
        <line x1="240" y1="345" x2="246" y2="360" />
      </g>
    </svg>
  );
}

/* 15. AreaPeregian — village square. */
export function AreaPeregian({
  title = "Peregian Beach — the village square south of Sunshine",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="170" fill={SKY} />
      {/* Distant dunes */}
      <path
        d="M0 170 Q60 150 120 165 Q200 180 280 155 Q360 135 480 170 L480 200 L0 200 Z"
        fill={SAND}
        opacity="0.5"
      />
      {/* Village storefronts */}
      <rect x="20" y="180" width="440" height="100" fill={STROKE_LT} fillOpacity="0.7" />
      <line x1="20" y1="180" x2="460" y2="180" stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Shop awnings (varied colors) */}
      <rect x="20" y="180" width="100" height="14" fill={AMBER} fillOpacity="0.7" />
      <rect x="120" y="180" width="100" height="14" fill={STROKE} />
      <rect x="220" y="180" width="100" height="14" fill="#C97B4A" />
      <rect x="320" y="180" width="140" height="14" fill={AMBER} fillOpacity="0.7" />
      {/* Shopfront windows */}
      <g stroke={STROKE_DK} strokeWidth="1.5" fill={WASH}>
        <rect x="40" y="200" width="60" height="60" />
        <rect x="140" y="200" width="60" height="60" />
        <rect x="240" y="200" width="60" height="60" />
        <rect x="340" y="200" width="100" height="60" />
      </g>
      {/* Foreground village green */}
      <rect x="0" y="280" width="480" height="80" fill={STROKE_LT} fillOpacity="0.3" />
      <line x1="0" y1="280" x2="480" y2="280" stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Picnic table */}
      <g stroke={INK} strokeWidth="1.5" fill={WASH}>
        <rect x="60" y="305" width="80" height="6" />
        <line x1="70" y1="311" x2="70" y2="335" />
        <line x1="130" y1="311" x2="130" y2="335" />
      </g>
      {/* Bike silhouette */}
      <g stroke={INK} strokeWidth="1.5" fill="none">
        <circle cx="260" cy="320" r="10" />
        <circle cx="290" cy="320" r="10" />
        <line x1="260" y1="320" x2="275" y2="305" />
        <line x1="275" y1="305" x2="290" y2="320" />
        <line x1="270" y1="320" x2="275" y2="305" />
      </g>
      {/* Pandanus tree */}
      <g stroke={INK} strokeWidth="1.5" strokeLinecap="round" fill="none">
        <line x1="400" y1="280" x2="405" y2="220" />
        <path d="M405 220 L390 210" />
        <path d="M405 220 L420 210" />
        <path d="M405 220 L395 200" />
        <path d="M405 220 L415 200" />
      </g>
    </svg>
  );
}

/* 16. AreaNoosaNationalPark — headland walk. */
export function AreaNoosaNationalPark({
  title = "Noosa National Park — the headland walk",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="180" fill={SKY} />
      <circle cx="100" cy="50" r="20" fill={SUN} stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Distant ocean */}
      <line x1="0" y1="180" x2="480" y2="180" stroke={STROKE_DK} strokeWidth="1.5" />
      <rect x="0" y="180" width="480" height="60" fill={STROKE_LT} opacity="0.4" />
      <g stroke={STROKE} strokeWidth="1.5" fill="none" opacity="0.6">
        <path d="M0 200 Q60 195 120 200 T240 200 T360 200 T480 200" />
        <path d="M0 220 Q60 215 120 220 T240 220 T360 220 T480 220" />
      </g>
      {/* Rocky headland midground */}
      <path
        d="M0 240 Q60 230 120 245 Q200 260 280 240 Q360 220 480 245 L480 280 L0 280 Z"
        fill={STROKE_LT}
        opacity="0.7"
      />
      {/* Coastal path (foreground) */}
      <path
        d="M0 280 Q60 270 120 280 Q200 295 280 280 Q360 268 480 285 L480 320 L0 320 Z"
        fill={SAND}
        opacity="0.7"
      />
      <path
        d="M40 295 Q120 285 200 295 Q280 305 360 290 Q420 280 460 295"
        stroke={STROKE_DK}
        strokeWidth="1.5"
        fill="none"
      />
      {/* Pandanus canopy (top of frame) */}
      <g stroke={INK} strokeWidth="1.5" strokeLinecap="round" fill="none">
        <line x1="60" y1="180" x2="65" y2="100" />
        <path d="M65 100 L45 90" />
        <path d="M65 100 L85 88" />
        <path d="M65 100 L40 70" />
        <path d="M65 100 L90 75" />
        <path d="M65 100 L60 65" />
        <line x1="160" y1="180" x2="170" y2="80" />
        <path d="M170 80 L150 70" />
        <path d="M170 80 L190 68" />
        <path d="M170 80 L155 50" />
        <path d="M170 80 L185 55" />
        <line x1="380" y1="180" x2="385" y2="95" />
        <path d="M385 95 L365 85" />
        <path d="M385 95 L405 83" />
        <path d="M385 95 L370 65" />
        <path d="M385 95 L400 70" />
      </g>
      {/* Hiker silhouette on path */}
      <g stroke={INK} strokeWidth="2" strokeLinecap="round" fill={INK}>
        <circle cx="240" cy="270" r="5" />
        <line x1="240" y1="275" x2="240" y2="298" />
        <line x1="240" y1="282" x2="232" y2="293" />
        <line x1="240" y1="282" x2="248" y2="293" />
        <line x1="240" y1="298" x2="234" y2="318" />
        <line x1="240" y1="298" x2="246" y2="318" />
        {/* Walking pole */}
        <line x1="232" y1="293" x2="225" y2="318" stroke={INK} strokeWidth="1" />
      </g>
    </svg>
  );
}

/* 17. AreaHinterland — Mount Cooroora + country town. */
export function AreaHinterland({
  title = "Hinterland — Mount Cooroora and the country town",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="200" fill={SKY} />
      <circle cx="380" cy="60" r="22" fill={SUN} stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Mount Cooroora — volcanic peak */}
      <path
        d="M180 200 L240 60 L260 100 L290 50 L320 200 Z"
        fill={STROKE_LT}
        opacity="0.85"
        stroke={STROKE_DK}
        strokeWidth="1.5"
      />
      {/* Tree line at the base */}
      <g stroke={INK} strokeWidth="1.5" strokeLinecap="round" fill="none">
        <line x1="80" y1="200" x2="85" y2="170" />
        <path d="M85 170 L75 162" />
        <path d="M85 170 L95 162" />
        <line x1="120" y1="200" x2="125" y2="160" />
        <path d="M125 160 L115 152" />
        <path d="M125 160 L135 152" />
        <line x1="380" y1="200" x2="385" y2="170" />
        <path d="M385 170 L375 162" />
        <path d="M385 170 L395 162" />
        <line x1="420" y1="200" x2="425" y2="160" />
        <path d="M425 160 L415 152" />
        <path d="M425 160 L435 152" />
      </g>
      {/* Country town main street */}
      <rect x="40" y="220" width="400" height="80" fill={STROKE_LT} fillOpacity="0.7" />
      <line x1="40" y1="220" x2="440" y2="220" stroke={STROKE_DK} strokeWidth="1.5" />
      <rect x="40" y="220" width="400" height="12" fill="#C97B4A" />
      <g stroke={STROKE_DK} strokeWidth="1.5" fill={WASH}>
        <rect x="60" y="240" width="50" height="50" />
        <rect x="120" y="240" width="50" height="50" />
        <rect x="180" y="240" width="50" height="50" />
        <rect x="240" y="240" width="50" height="50" />
        <rect x="300" y="240" width="50" height="50" />
        <rect x="360" y="240" width="50" height="50" />
      </g>
      {/* Foreground footpath + ute */}
      <rect x="0" y="300" width="480" height="60" fill={SAND} fillOpacity="0.55" />
      <line x1="0" y1="300" x2="480" y2="300" stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Ute silhouette */}
      <g stroke={INK} strokeWidth="1.5" fill={PAPER_300}>
        <rect x="160" y="320" width="100" height="24" rx="4" />
        <circle cx="180" cy="348" r="8" />
        <circle cx="240" cy="348" r="8" />
      </g>
    </svg>
  );
}

/* 18. AreaNoosaJunction — the local plaza. Gap filler (Albert
 * returned 0/1 for Noosa Junction). */
export function AreaNoosaJunction({
  title = "Noosa Junction — the local plaza",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="160" fill={SKY} />
      {/* Building line — Junction shops */}
      <rect x="0" y="160" width="480" height="100" fill={STROKE_LT} fillOpacity="0.7" />
      <line x1="0" y1="160" x2="480" y2="160" stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Shop awnings */}
      <rect x="0" y="160" width="120" height="12" fill={STROKE} />
      <rect x="120" y="160" width="120" height="12" fill={AMBER} fillOpacity="0.7" />
      <rect x="240" y="160" width="120" height="12" fill="#C97B4A" />
      <rect x="360" y="160" width="120" height="12" fill={STROKE} />
      <g stroke={STROKE_DK} strokeWidth="1.5" fill={WASH}>
        <rect x="20" y="180" width="80" height="60" />
        <rect x="140" y="180" width="80" height="60" />
        <rect x="260" y="180" width="80" height="60" />
        <rect x="380" y="180" width="80" height="60" />
      </g>
      {/* Plaza foreground */}
      <rect x="0" y="260" width="480" height="100" fill={SAND} fillOpacity="0.55" />
      <line x1="0" y1="260" x2="480" y2="260" stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Elm canopy (foreground left) */}
      <g stroke={INK} strokeWidth="1.5" strokeLinecap="round" fill="none">
        <line x1="60" y1="360" x2="65" y2="240" />
        <ellipse cx="65" cy="230" rx="40" ry="14" fill={STROKE_LT} fillOpacity="0.7" />
        <line x1="60" y1="240" x2="50" y2="225" />
        <line x1="65" y1="240" x2="65" y2="218" />
        <line x1="70" y1="240" x2="80" y2="222" />
      </g>
      {/* Bus stop shelter */}
      <g stroke={INK} strokeWidth="1.5" fill={WASH}>
        <rect x="180" y="295" width="80" height="40" />
        <rect x="180" y="295" width="80" height="6" fill={STROKE} />
        <line x1="180" y1="295" x2="180" y2="335" />
        <line x1="260" y1="295" x2="260" y2="335" />
        <rect x="195" y="310" width="50" height="20" />
      </g>
      {/* Park bench */}
      <g stroke={INK} strokeWidth="1.5" fill={WASH}>
        <rect x="320" y="320" width="80" height="6" />
        <line x1="328" y1="326" x2="328" y2="350" />
        <line x1="392" y1="326" x2="392" y2="350" />
      </g>
      {/* Person waiting */}
      <g stroke={INK} strokeWidth="1.5" fill={INK}>
        <circle cx="220" cy="305" r="5" />
        <line x1="220" y1="310" x2="220" y2="335" />
        <line x1="220" y1="318" x2="213" y2="328" />
        <line x1="220" y1="318" x2="227" y2="328" />
        <line x1="220" y1="335" x2="215" y2="355" />
        <line x1="220" y1="335" x2="225" y2="355" />
      </g>
    </svg>
  );
}

/* ====================================================================
 * 19-24. ACTIVITY SCENES — small editorial scenes of the eight
 * primary activities.
 * ==================================================================== */

/* 19. ActivitySurf — longboard point break at First Bay. */
export function ActivitySurf({
  title = "Surf — longboard point break at First Bay",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="160" fill={SKY} />
      <circle cx="380" cy="60" r="22" fill={SUN} stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Distant headland (Noosa Heads silhouette) */}
      <path
        d="M0 160 Q60 140 120 155 Q200 175 280 145 Q360 120 480 155 L480 200 L0 200 Z"
        fill={STROKE_LT}
        opacity="0.6"
      />
      {/* Ocean */}
      <rect x="0" y="160" width="480" height="120" fill={STROKE_LT} opacity="0.45" />
      <g stroke={STROKE} strokeWidth="1.5" fill="none" opacity="0.6">
        <path d="M0 180 Q60 175 120 180 T240 180 T360 180 T480 180" />
        <path d="M0 220 Q60 215 120 220 T240 220 T360 220 T480 220" />
      </g>
      {/* Curling wave (point break) */}
      <path
        d="M0 250 Q120 220 240 230 Q360 240 480 250"
        stroke={STROKE_DK}
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M60 252 Q140 232 220 240 Q260 245 280 252"
        stroke={STROKE_DK}
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M70 254 Q150 245 220 250"
        stroke={STROKE_DK}
        strokeWidth="1.5"
        fill="none"
      />
      {/* Surfer (longboard) */}
      <g stroke={INK} strokeWidth="2" strokeLinecap="round" fill={INK}>
        {/* Board */}
        <line x1="160" y1="252" x2="220" y2="252" strokeWidth="3" />
        {/* Body */}
        <line x1="190" y1="252" x2="190" y2="232" />
        <circle cx="190" cy="225" r="5" />
        <line x1="190" y1="240" x2="200" y2="248" />
        <line x1="190" y1="240" x2="180" y2="248" />
        <line x1="190" y1="232" x2="198" y2="226" />
      </g>
      {/* Beach */}
      <rect x="0" y="280" width="480" height="80" fill={SAND} fillOpacity="0.55" />
    </svg>
  );
}

/* 20. ActivitySup — paddleboarder on the calm river. */
export function ActivitySup({
  title = "Stand-up paddle — calm-water hire at Noosaville",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="140" fill={SKY} />
      <circle cx="100" cy="50" r="20" fill={SUN} stroke={STROKE_DK} strokeWidth="1.5" />
      <path
        d="M0 140 Q60 120 120 135 Q200 155 280 130 Q360 110 480 140 L480 180 L0 180 Z"
        fill={STROKE_LT}
        opacity="0.5"
      />
      {/* River surface */}
      <rect x="0" y="140" width="480" height="220" fill={STROKE_LT} opacity="0.4" />
      <g stroke={STROKE} strokeWidth="1.5" fill="none" opacity="0.5">
        <path d="M0 170 Q40 165 80 170 T160 170 T240 170 T320 170 T400 170 T480 170" />
        <path d="M0 200 Q40 195 80 200 T160 200 T240 200 T320 200 T400 200 T480 200" />
        <path d="M0 240 Q40 235 80 240 T160 240 T240 240 T320 240 T400 240 T480 240" />
        <path d="M0 280 Q40 275 80 280 T160 280 T240 280 T320 280 T400 280 T480 280" />
        <path d="M0 320 Q40 315 80 320 T160 320 T240 320 T320 320 T400 320 T480 320" />
      </g>
      {/* SUP board + paddler */}
      <g stroke={INK} strokeWidth="2" strokeLinecap="round" fill={INK}>
        {/* Board */}
        <line x1="220" y1="220" x2="320" y2="220" strokeWidth="4" />
        {/* Paddler */}
        <circle cx="270" cy="195" r="6" />
        <line x1="270" y1="201" x2="270" y2="220" />
        {/* Paddle */}
        <line x1="270" y1="195" x2="265" y2="160" strokeWidth="2" />
        <line x1="268" y1="170" x2="262" y2="172" strokeWidth="2" />
        {/* Reflection */}
        <line x1="220" y1="226" x2="320" y2="226" strokeWidth="1" opacity="0.4" />
        <line x1="270" y1="222" x2="270" y2="240" strokeWidth="1" opacity="0.4" />
      </g>
      {/* Distant palms */}
      <g stroke={INK} strokeWidth="1.5" strokeLinecap="round" fill="none">
        <line x1="40" y1="140" x2="45" y2="80" />
        <path d="M45 80 L25 70" />
        <path d="M45 80 L65 68" />
        <line x1="440" y1="140" x2="445" y2="80" />
        <path d="M445 80 L425 70" />
        <path d="M445 80 L465 68" />
      </g>
    </svg>
  );
}

/* 21. ActivityKayak — kayaker on the upper Noosa River. */
export function ActivityKayak({
  title = "Kayak — the upper Noosa River",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="120" fill={SKY} />
      {/* Paperbark canopy (mid-frame) */}
      <g stroke={INK} strokeWidth="1.5" strokeLinecap="round" fill="none">
        <line x1="20" y1="180" x2="25" y2="100" />
        <path d="M25 100 q-15 -10 -25 -20" />
        <path d="M25 100 q15 -8 25 -18" />
        <line x1="60" y1="180" x2="65" y2="80" />
        <path d="M65 80 q-15 -10 -25 -20" />
        <path d="M65 80 q15 -8 25 -18" />
        <line x1="100" y1="180" x2="105" y2="100" />
        <path d="M105 100 q-15 -10 -25 -20" />
        <path d="M105 100 q15 -8 25 -18" />
        <line x1="380" y1="180" x2="385" y2="100" />
        <path d="M385 100 q-15 -10 -25 -20" />
        <path d="M385 100 q15 -8 25 -18" />
        <line x1="420" y1="180" x2="425" y2="80" />
        <path d="M425 80 q-15 -10 -25 -20" />
        <path d="M425 80 q15 -8 25 -18" />
        <line x1="460" y1="180" x2="465" y2="100" />
        <path d="M465 100 q-15 -10 -25 -20" />
        <path d="M465 100 q15 -8 25 -18" />
      </g>
      {/* Glassy water */}
      <rect x="0" y="180" width="480" height="180" fill={STROKE_LT} opacity="0.35" />
      <g stroke={STROKE} strokeWidth="1" fill="none" opacity="0.4">
        <path d="M0 220 Q40 218 80 220 T160 220 T240 220 T320 220 T400 220 T480 220" />
        <path d="M0 250 Q40 248 80 250 T160 250 T240 250 T320 250 T400 250 T480 250" />
        <path d="M0 290 Q40 288 80 290 T160 290 T240 290 T320 290 T400 290 T480 290" />
        <path d="M0 330 Q40 328 80 330 T160 330 T240 330 T320 330 T400 330 T480 330" />
      </g>
      {/* Kayak + paddler */}
      <g stroke={INK} strokeWidth="2" strokeLinecap="round" fill={INK}>
        {/* Hull */}
        <path d="M180 250 q60 -10 120 0 l-5 8 l-110 0 z" fill={WASH} />
        {/* Paddler */}
        <circle cx="240" cy="235" r="5" />
        <line x1="240" y1="240" x2="240" y2="250" />
        {/* Double-bladed paddle */}
        <line x1="240" y1="240" x2="220" y2="225" strokeWidth="1.5" />
        <line x1="220" y1="225" x2="218" y2="223" strokeWidth="2" />
        <line x1="260" y1="240" x2="280" y2="225" strokeWidth="1.5" />
        <line x1="280" y1="225" x2="282" y2="223" strokeWidth="2" />
      </g>
    </svg>
  );
}

/* 22. ActivitySwim — swimmer in the lifeguard-tower bay. */
export function ActivitySwim({
  title = "Swim — the lifeguard-tower bay",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="160" fill={SKY} />
      <circle cx="380" cy="50" r="22" fill={SUN} stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Distant headland */}
      <path
        d="M0 160 Q60 140 120 155 Q200 175 280 145 Q360 120 480 155 L480 200 L0 200 Z"
        fill={STROKE_LT}
        opacity="0.55"
      />
      {/* Surf line */}
      <line x1="0" y1="160" x2="480" y2="160" stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Calm bay water */}
      <rect x="0" y="160" width="480" height="180" fill={STROKE_LT} opacity="0.4" />
      <g stroke={STROKE} strokeWidth="1.5" fill="none" opacity="0.6">
        <path d="M0 200 Q60 195 120 200 T240 200 T360 200 T480 200" />
        <path d="M0 230 Q60 225 120 230 T240 230 T360 230 T480 230" />
        <path d="M0 260 Q60 255 120 260 T240 260 T360 260 T480 260" />
        <path d="M0 290 Q60 285 120 290 T240 290 T360 290 T480 290" />
      </g>
      {/* Lifeguard tower (mid-right) */}
      <g stroke={INK} strokeWidth="1.5" fill={WASH}>
        <rect x="350" y="180" width="40" height="80" />
        <rect x="358" y="190" width="24" height="20" />
        <rect x="358" y="220" width="24" height="20" />
        <rect x="345" y="260" width="50" height="8" fill={AMBER} />
        <polygon points="345,180 362,168 395,180" fill={AMBER} fillOpacity="0.5" />
      </g>
      {/* Swimmer silhouette */}
      <g stroke={INK} strokeWidth="2" strokeLinecap="round" fill={INK}>
        <circle cx="180" cy="220" r="6" />
        <line x1="180" y1="226" x2="180" y2="240" />
        {/* Arms in stroke */}
        <path d="M180 232 Q170 235 165 230" strokeWidth="2" fill="none" />
        <path d="M180 232 Q190 235 195 230" strokeWidth="2" fill="none" />
        {/* Water displacement */}
        <path d="M160 245 Q180 250 200 245" stroke={INK} strokeWidth="1" fill="none" />
      </g>
      {/* Beach */}
      <rect x="0" y="320" width="480" height="40" fill={SAND} fillOpacity="0.55" />
    </svg>
  );
}

/* 23. ActivityHike — hiker on the headland walk. */
export function ActivityHike({
  title = "Hike — the headland walk",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="160" fill={SKY} />
      <circle cx="100" cy="50" r="22" fill={SUN} stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Distant ocean */}
      <line x1="0" y1="160" x2="480" y2="160" stroke={STROKE_DK} strokeWidth="1.5" />
      <rect x="0" y="160" width="480" height="60" fill={STROKE_LT} opacity="0.4" />
      <g stroke={STROKE} strokeWidth="1.5" fill="none" opacity="0.6">
        <path d="M0 180 Q60 175 120 180 T240 180 T360 180 T480 180" />
        <path d="M0 200 Q60 195 120 200 T240 200 T360 200 T480 200" />
      </g>
      {/* Pandanus canopy top */}
      <g stroke={INK} strokeWidth="1.5" strokeLinecap="round" fill="none">
        <line x1="80" y1="160" x2="85" y2="80" />
        <path d="M85 80 L65 70" />
        <path d="M85 80 L105 68" />
        <path d="M85 80 L75 55" />
        <path d="M85 80 L100 60" />
        <line x1="160" y1="160" x2="165" y2="60" />
        <path d="M165 60 L145 50" />
        <path d="M165 60 L185 48" />
        <path d="M165 60 L155 35" />
        <path d="M165 60 L180 40" />
        <line x1="380" y1="160" x2="385" y2="80" />
        <path d="M385 80 L365 70" />
        <path d="M385 80 L405 68" />
        <path d="M385 80 L375 55" />
        <path d="M385 80 L400 60" />
      </g>
      {/* Coastal path winding */}
      <path
        d="M0 240 Q120 230 240 245 Q360 260 480 240 L480 290 L0 290 Z"
        fill={SAND}
        opacity="0.7"
      />
      <path
        d="M20 255 Q120 245 220 260 Q320 275 420 250"
        stroke={STROKE_DK}
        strokeWidth="1.5"
        fill="none"
      />
      {/* Hiker */}
      <g stroke={INK} strokeWidth="2" strokeLinecap="round" fill={INK}>
        <circle cx="200" cy="230" r="6" />
        {/* Body */}
        <line x1="200" y1="236" x2="200" y2="265" />
        {/* Backpack */}
        <rect x="194" y="240" width="14" height="20" fill={AMBER} fillOpacity="0.7" />
        {/* Arms */}
        <line x1="200" y1="245" x2="190" y2="258" />
        <line x1="200" y1="245" x2="210" y2="258" />
        {/* Legs */}
        <line x1="200" y1="265" x2="193" y2="290" />
        <line x1="200" y1="265" x2="207" y2="290" />
        {/* Walking poles */}
        <line x1="190" y1="258" x2="183" y2="290" stroke={INK} strokeWidth="1" />
        <line x1="210" y1="258" x2="217" y2="290" stroke={INK} strokeWidth="1" />
      </g>
    </svg>
  );
}

/* 24. ActivityFishing — angler from a boat at the river mouth. */
export function ActivityFishing({
  title = "Fishing — angling from a boat at the river mouth",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="160" fill={SKY} />
      <circle cx="380" cy="50" r="20" fill={SUN} stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Distant headland (Noosa Heads silhouette) */}
      <path
        d="M0 160 Q60 140 120 155 Q200 175 280 145 Q360 120 480 155 L480 200 L0 200 Z"
        fill={STROKE_LT}
        opacity="0.55"
      />
      {/* Water */}
      <rect x="0" y="160" width="480" height="200" fill={STROKE_LT} opacity="0.45" />
      <g stroke={STROKE} strokeWidth="1.5" fill="none" opacity="0.6">
        <path d="M0 200 Q60 195 120 200 T240 200 T360 200 T480 200" />
        <path d="M0 230 Q60 225 120 230 T240 230 T360 230 T480 230" />
        <path d="M0 260 Q60 255 120 260 T240 260 T360 260 T480 260" />
        <path d="M0 290 Q60 285 120 290 T240 290 T360 290 T480 290" />
        <path d="M0 320 Q60 315 120 320 T240 320 T360 320 T480 320" />
      </g>
      {/* Small boat */}
      <g stroke={INK} strokeWidth="2" fill={WASH}>
        <path d="M180 250 L300 250 L290 270 L190 270 Z" />
        <line x1="180" y1="250" x2="170" y2="270" />
        <line x1="300" y1="250" x2="310" y2="270" />
      </g>
      {/* Angler */}
      <g stroke={INK} strokeWidth="2" strokeLinecap="round" fill={INK}>
        <circle cx="240" cy="225" r="5" />
        <line x1="240" y1="230" x2="240" y2="250" />
        {/* Arms holding rod */}
        <line x1="240" y1="240" x2="220" y2="245" />
        {/* Fishing rod */}
        <line x1="240" y1="240" x2="320" y2="160" stroke={INK} strokeWidth="1.5" />
        {/* Fishing line */}
        <path d="M320 160 Q330 200 340 280" stroke={STROKE_DK} strokeWidth="0.8" fill="none" />
        {/* Splash */}
        <ellipse cx="340" cy="280" rx="4" ry="2" fill={INK} opacity="0.5" />
      </g>
    </svg>
  );
}

/* ====================================================================
 * 25-29. TRIP-THEME SCENES — small editorial scenes for the
 * seven trip modes.
 * ==================================================================== */

/* 25. TripRomantic — couple at sunset on the river. */
export function TripRomantic({
  title = "Romantic — sunset on the river",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      {/* Sunset gradient */}
      <rect x="0" y="0" width="480" height="180" fill={SUNSET_1} opacity="0.4" />
      <rect x="0" y="60" width="480" height="120" fill={SUNSET_2} opacity="0.3" />
      {/* Sun (large, low) */}
      <circle cx="240" cy="120" r="34" fill={SUN} stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Distant tree line */}
      <path
        d="M0 180 Q40 165 80 175 Q140 188 200 165 Q260 145 320 175 Q380 195 480 165 L480 220 L0 220 Z"
        fill={STROKE_DK}
        opacity="0.7"
      />
      {/* River reflection */}
      <rect x="0" y="180" width="480" height="180" fill={STROKE_LT} opacity="0.35" />
      <g stroke={STROKE} strokeWidth="1" fill="none" opacity="0.4">
        <path d="M0 220 Q60 215 120 220 T240 220 T360 220 T480 220" />
        <path d="M0 250 Q60 245 120 250 T240 250 T360 250 T480 250" />
      </g>
      {/* Sun reflection */}
      <ellipse cx="240" cy="200" rx="30" ry="6" fill={SUN} opacity="0.6" />
      {/* Silhouetted jetty (right) */}
      <g stroke={INK} strokeWidth="1.5" fill="none">
        <line x1="380" y1="220" x2="380" y2="290" />
        <line x1="380" y1="260" x2="480" y2="240" />
        <line x1="380" y1="240" x2="480" y2="220" />
        <line x1="380" y1="280" x2="480" y2="260" />
      </g>
      {/* Couple silhouette */}
      <g stroke={INK} strokeWidth="2" strokeLinecap="round" fill={INK}>
        <circle cx="160" cy="285" r="7" />
        <line x1="160" y1="292" x2="160" y2="320" />
        <line x1="160" y1="305" x2="148" y2="318" />
        <line x1="160" y1="305" x2="172" y2="318" />
        <line x1="160" y1="320" x2="152" y2="358" />
        <line x1="160" y1="320" x2="168" y2="358" />
        {/* Person 2 (slightly shorter) */}
        <circle cx="180" cy="290" r="6" />
        <line x1="180" y1="296" x2="180" y2="320" />
        <line x1="180" y1="305" x2="170" y2="318" />
        <line x1="180" y1="305" x2="190" y2="318" />
        <line x1="180" y1="320" x2="173" y2="358" />
        <line x1="180" y1="320" x2="187" y2="358" />
        {/* Joined hands */}
        <line x1="172" y1="318" x2="170" y2="318" />
      </g>
    </svg>
  );
}

/* 26. TripBudget — picnic on the beach. */
export function TripBudget({
  title = "Budget — picnic on the beach",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="160" fill={SKY} />
      <circle cx="100" cy="50" r="20" fill={SUN} stroke={STROKE_DK} strokeWidth="1.5" />
      <path
        d="M0 160 Q60 140 120 155 Q200 175 280 145 Q360 120 480 155 L480 200 L0 200 Z"
        fill={STROKE_LT}
        opacity="0.55"
      />
      <rect x="0" y="160" width="480" height="80" fill={STROKE_LT} opacity="0.4" />
      <g stroke={STROKE} strokeWidth="1.5" fill="none" opacity="0.6">
        <path d="M0 180 Q60 175 120 180 T240 180 T360 180 T480 180" />
        <path d="M0 210 Q60 205 120 210 T240 210 T360 210 T480 210" />
      </g>
      {/* Beach */}
      <rect x="0" y="240" width="480" height="120" fill={SAND} fillOpacity="0.7" />
      <line x1="0" y1="240" x2="480" y2="240" stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Picnic rug */}
      <rect x="180" y="290" width="160" height="50" fill={AMBER} fillOpacity="0.5" stroke={INK} strokeWidth="1.5" />
      <line x1="220" y1="290" x2="220" y2="340" stroke={INK} strokeWidth="1" />
      <line x1="260" y1="290" x2="260" y2="340" stroke={INK} strokeWidth="1" />
      <line x1="300" y1="290" x2="300" y2="340" stroke={INK} strokeWidth="1" />
      {/* Picnic items */}
      <rect x="220" y="305" width="20" height="14" fill={STROKE_LT} stroke={INK} strokeWidth="1" />
      <circle cx="280" cy="312" r="6" fill={STROKE_LT} stroke={INK} strokeWidth="1" />
      <rect x="310" y="306" width="14" height="14" fill={STROKE_LT} stroke={INK} strokeWidth="1" />
      {/* Cooler (esky) */}
      <rect x="120" y="300" width="40" height="34" fill={WASH} stroke={INK} strokeWidth="1.5" />
      <line x1="120" y1="312" x2="160" y2="312" stroke={INK} strokeWidth="1.5" />
      <rect x="135" y="306" width="10" height="6" fill={INK} />
      {/* Hire craft in distance */}
      <g stroke={INK} strokeWidth="1.5" fill={WASH}>
        <path d="M40 200 q12 -6 24 0 l-3 8 l-18 0 z" />
        <line x1="52" y1="195" x2="52" y2="182" />
      </g>
    </svg>
  );
}

/* 27. TripSolo — solo traveller on the headland at dawn. */
export function TripSolo({
  title = "Solo — quiet morning on the headland",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      {/* Dawn sky */}
      <rect x="0" y="0" width="480" height="160" fill={SKY} />
      <rect x="0" y="100" width="480" height="60" fill={SUNSET_1} opacity="0.25" />
      {/* Sun (low, dawn) */}
      <circle cx="100" cy="120" r="20" fill={SUN} stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Distant ocean (calm) */}
      <line x1="0" y1="160" x2="480" y2="160" stroke={STROKE_DK} strokeWidth="1.5" />
      <rect x="0" y="160" width="480" height="60" fill={STROKE_LT} opacity="0.4" />
      <g stroke={STROKE} strokeWidth="1.5" fill="none" opacity="0.5">
        <path d="M0 180 Q60 175 120 180 T240 180 T360 180 T480 180" />
        <path d="M0 200 Q60 195 120 200 T240 200 T360 200 T480 200" />
      </g>
      {/* Coastal headland (mid) */}
      <path
        d="M0 220 Q120 200 240 215 Q360 230 480 210 L480 280 L0 280 Z"
        fill={STROKE_LT}
        opacity="0.8"
      />
      {/* Path winding */}
      <path
        d="M0 280 Q60 270 120 280 Q200 295 280 280 Q360 268 480 285 L480 360 L0 360 Z"
        fill={SAND}
        opacity="0.7"
      />
      <path
        d="M40 295 Q120 285 200 295 Q280 305 360 290 Q420 280 460 295"
        stroke={STROKE_DK}
        strokeWidth="1.5"
        fill="none"
      />
      {/* Solo figure */}
      <g stroke={INK} strokeWidth="2" strokeLinecap="round" fill={INK}>
        <circle cx="280" cy="280" r="6" />
        <line x1="280" y1="286" x2="280" y2="310" />
        <line x1="280" y1="293" x2="270" y2="305" />
        <line x1="280" y1="293" x2="290" y2="305" />
        <line x1="280" y1="310" x2="273" y2="332" />
        <line x1="280" y1="310" x2="287" y2="332" />
        {/* Coffee cup */}
        <rect x="266" y="285" width="6" height="8" fill={WASH} />
      </g>
      {/* Pandanus silhouette */}
      <g stroke={INK} strokeWidth="1.5" strokeLinecap="round" fill="none">
        <line x1="120" y1="220" x2="125" y2="160" />
        <path d="M125 160 L105 150" />
        <path d="M125 160 L145 148" />
        <path d="M125 160 L115 135" />
        <path d="M125 160 L140 140" />
      </g>
    </svg>
  );
}

/* 28. TripGroup — friends on a river cruise. */
export function TripGroup({
  title = "Group — friends on a river cruise",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      {/* Sunset sky */}
      <rect x="0" y="0" width="480" height="180" fill={SUNSET_1} opacity="0.4" />
      <rect x="0" y="80" width="480" height="100" fill={SUNSET_2} opacity="0.3" />
      <circle cx="240" cy="100" r="30" fill={SUN} stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Distant tree line */}
      <path
        d="M0 180 Q40 165 80 175 Q140 188 200 165 Q260 145 320 175 Q380 195 480 165 L480 220 L0 220 Z"
        fill={STROKE_DK}
        opacity="0.7"
      />
      {/* River */}
      <rect x="0" y="180" width="480" height="180" fill={STROKE_LT} opacity="0.45" />
      <g stroke={STROKE} strokeWidth="1" fill="none" opacity="0.5">
        <path d="M0 220 Q60 215 120 220 T240 220 T360 220 T480 220" />
        <path d="M0 250 Q60 245 120 250 T240 250 T360 250 T480 250" />
        <path d="M0 280 Q60 275 120 280 T240 280 T360 280 T480 280" />
        <path d="M0 310 Q60 305 120 310 T240 310 T360 310 T480 310" />
      </g>
      {/* Cruise boat */}
      <g stroke={INK} strokeWidth="2" fill={WASH}>
        {/* Hull */}
        <path d="M140 270 L340 270 L320 290 L160 290 Z" />
        {/* Cabin */}
        <rect x="180" y="245" width="120" height="25" />
        {/* Windows */}
        <rect x="190" y="252" width="14" height="10" fill={STROKE_LT} />
        <rect x="208" y="252" width="14" height="10" fill={STROKE_LT} />
        <rect x="226" y="252" width="14" height="10" fill={STROKE_LT} />
        <rect x="244" y="252" width="14" height="10" fill={STROKE_LT} />
        <rect x="262" y="252" width="14" height="10" fill={STROKE_LT} />
        <rect x="280" y="252" width="14" height="10" fill={STROKE_LT} />
      </g>
      {/* Group silhouettes on top deck */}
      <g stroke={INK} strokeWidth="2" strokeLinecap="round" fill={INK}>
        <circle cx="200" cy="240" r="5" />
        <line x1="200" y1="245" x2="200" y2="245" />
        <circle cx="220" cy="238" r="5" />
        <circle cx="240" cy="240" r="5" />
        <circle cx="260" cy="238" r="5" />
        <circle cx="280" cy="240" r="5" />
      </g>
      {/* Wake */}
      <g stroke={STROKE} strokeWidth="1" fill="none" opacity="0.5">
        <path d="M120 295 Q140 300 100 305" />
        <path d="M340 295 Q360 300 400 305" />
      </g>
    </svg>
  );
}

/* 29. TripBusiness — Hastings Street morning meeting. */
export function TripBusiness({
  title = "Business — Hastings Street morning meeting",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="180" fill={SKY} />
      {/* Hastings building line */}
      <rect x="0" y="160" width="480" height="100" fill={STROKE_LT} fillOpacity="0.7" />
      <line x1="0" y1="160" x2="480" y2="160" stroke={STROKE_DK} strokeWidth="1.5" />
      <rect x="0" y="160" width="480" height="12" fill={STROKE} />
      {/* Shopfronts */}
      <g stroke={STROKE_DK} strokeWidth="1.5" fill={WASH}>
        <rect x="40" y="180" width="100" height="60" />
        <rect x="160" y="180" width="100" height="60" />
        <rect x="280" y="180" width="100" height="60" />
        <rect x="400" y="180" width="60" height="60" />
      </g>
      {/* Foreground plaza */}
      <rect x="0" y="260" width="480" height="100" fill={SAND} fillOpacity="0.55" />
      <line x1="0" y1="260" x2="480" y2="260" stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Café table */}
      <g stroke={INK} strokeWidth="1.5" fill={WASH}>
        <circle cx="200" cy="310" r="20" />
        <line x1="200" y1="330" x2="200" y2="350" />
      </g>
      {/* Parasol */}
      <g stroke={INK} strokeWidth="1.5" fill={WASH}>
        <path d="M150 285 Q150 260 200 260 Q250 260 250 285 Z" fill={STROKE_LT} fillOpacity="0.5" />
        <line x1="200" y1="285" x2="200" y2="295" />
      </g>
      {/* Two figures at table */}
      <g stroke={INK} strokeWidth="2" strokeLinecap="round" fill={INK}>
        <circle cx="170" cy="295" r="6" />
        <line x1="170" y1="301" x2="170" y2="320" />
        <line x1="170" y1="308" x2="160" y2="318" />
        <line x1="170" y1="308" x2="180" y2="318" />
        <line x1="170" y1="320" x2="165" y2="345" />
        <line x1="170" y1="320" x2="175" y2="345" />
        <circle cx="230" cy="295" r="6" />
        <line x1="230" y1="301" x2="230" y2="320" />
        <line x1="230" y1="308" x2="220" y2="318" />
        <line x1="230" y1="308" x2="240" y2="318" />
        <line x1="230" y1="320" x2="225" y2="345" />
        <line x1="230" y1="320" x2="235" y2="345" />
      </g>
      {/* Coffee cups */}
      <circle cx="190" cy="305" r="3" fill={AMBER} fillOpacity="0.7" />
      <circle cx="215" cy="305" r="3" fill={AMBER} fillOpacity="0.7" />
      {/* Laptop */}
      <rect x="195" y="298" width="14" height="6" fill={INK} />
    </svg>
  );
}

/* ====================================================================
 * 30-33. Sub-page decorative illustrations + cross-section filler.
 * ==================================================================== */

/* 30. TewantinSvg — river town ferry stop (decorative for the
 * Tewantin sub-page). */
export function TewantinSvg({
  title = "Tewantin — river town ferry stop",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="160" fill={SKY} />
      <circle cx="380" cy="60" r="20" fill={SUN} stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Distant hill */}
      <path
        d="M0 160 Q60 130 120 145 Q200 165 280 140 Q360 120 480 150 L480 200 L0 200 Z"
        fill={STROKE_LT}
        opacity="0.55"
      />
      {/* River */}
      <rect x="0" y="200" width="480" height="160" fill={STROKE_LT} opacity="0.45" />
      <g stroke={STROKE} strokeWidth="1.5" fill="none" opacity="0.6">
        <path d="M0 230 Q40 225 80 230 T160 230 T240 230 T320 230 T400 230 T480 230" />
        <path d="M0 270 Q40 265 80 270 T160 270 T240 270 T320 270 T400 270 T480 270" />
        <path d="M0 310 Q40 305 80 310 T160 310 T240 310 T320 310 T400 310 T480 310" />
      </g>
      {/* Ferry */}
      <g stroke={INK} strokeWidth="2" fill={WASH}>
        <path d="M150 260 L330 260 L320 285 L160 285 Z" />
        <rect x="200" y="240" width="80" height="20" />
        <rect x="208" y="245" width="10" height="10" fill={STROKE_LT} />
        <rect x="222" y="245" width="10" height="10" fill={STROKE_LT} />
        <rect x="236" y="245" width="10" height="10" fill={STROKE_LT} />
        <rect x="250" y="245" width="10" height="10" fill={STROKE_LT} />
        <rect x="264" y="245" width="10" height="10" fill={STROKE_LT} />
        {/* Mast */}
        <line x1="240" y1="240" x2="240" y2="220" />
        <path d="M240 220 q10 -3 12 6" fill={STROKE_LT} fillOpacity="0.5" />
      </g>
      {/* Jetty (right) */}
      <g stroke={INK} strokeWidth="1.5" fill={WASH}>
        <rect x="380" y="285" width="80" height="8" />
        <line x1="385" y1="293" x2="385" y2="320" />
        <line x1="400" y1="293" x2="400" y2="320" />
        <line x1="420" y1="293" x2="420" y2="320" />
        <line x1="445" y1="293" x2="445" y2="320" />
      </g>
    </svg>
  );
}

/* 31. PeregianSvg — village surf-front (decorative). */
export function PeregianSvg({
  title = "Peregian — the village surf-front",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="170" fill={SKY} />
      {/* Distant dunes */}
      <path
        d="M0 170 Q60 150 120 165 Q200 180 280 155 Q360 135 480 170 L480 200 L0 200 Z"
        fill={SAND}
        opacity="0.6"
      />
      {/* Surf line */}
      <line x1="0" y1="170" x2="480" y2="170" stroke={STROKE_DK} strokeWidth="1.5" />
      <rect x="0" y="170" width="480" height="50" fill={STROKE_LT} opacity="0.4" />
      <g stroke={STROKE} strokeWidth="1.5" fill="none" opacity="0.6">
        <path d="M0 190 Q60 185 120 190 T240 190 T360 190 T480 190" />
        <path d="M0 210 Q60 205 120 210 T240 210 T360 210 T480 210" />
      </g>
      {/* Beach */}
      <rect x="0" y="220" width="480" height="80" fill={SAND} fillOpacity="0.7" />
      <line x1="0" y1="220" x2="480" y2="220" stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Foreground shopfronts */}
      <rect x="0" y="300" width="480" height="60" fill={STROKE_LT} fillOpacity="0.85" />
      <line x1="0" y1="300" x2="480" y2="300" stroke={STROKE_DK} strokeWidth="1.5" />
      <rect x="0" y="300" width="480" height="8" fill={AMBER} fillOpacity="0.7" />
      <g stroke={STROKE_DK} strokeWidth="1.5" fill={WASH}>
        <rect x="20" y="312" width="100" height="40" />
        <rect x="140" y="312" width="100" height="40" />
        <rect x="260" y="312" width="100" height="40" />
        <rect x="380" y="312" width="80" height="40" />
      </g>
      {/* Bike */}
      <g stroke={INK} strokeWidth="1.5" fill="none">
        <circle cx="60" cy="270" r="8" />
        <circle cx="85" cy="270" r="8" />
        <line x1="60" y1="270" x2="73" y2="258" />
        <line x1="73" y1="258" x2="85" y2="270" />
      </g>
      {/* Pandanus */}
      <g stroke={INK} strokeWidth="1.5" strokeLinecap="round" fill="none">
        <line x1="420" y1="300" x2="425" y2="240" />
        <path d="M425 240 L405 230" />
        <path d="M425 240 L445 228" />
        <path d="M425 240 L410 215" />
        <path d="M425 240 L440 220" />
      </g>
    </svg>
  );
}

/* 32. HinterlandSvg — country town beneath volcanic peak. */
export function HinterlandSvg({
  title = "Hinterland — country town beneath the volcanic peak",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="220" fill={SKY} />
      <circle cx="380" cy="60" r="22" fill={SUN} stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Mount Cooroora peak */}
      <path
        d="M200 220 L260 50 L290 110 L310 70 L340 220 Z"
        fill={STROKE_LT}
        opacity="0.9"
        stroke={STROKE_DK}
        strokeWidth="1.5"
      />
      {/* Tree line */}
      <g stroke={INK} strokeWidth="1.5" strokeLinecap="round" fill="none">
        <line x1="60" y1="220" x2="65" y2="180" />
        <path d="M65 180 L55 172" />
        <path d="M65 180 L75 172" />
        <line x1="100" y1="220" x2="105" y2="170" />
        <path d="M105 170 L95 162" />
        <path d="M105 170 L115 162" />
        <line x1="380" y1="220" x2="385" y2="180" />
        <path d="M385 180 L375 172" />
        <path d="M385 180 L395 172" />
        <line x1="420" y1="220" x2="425" y2="170" />
        <path d="M425 170 L415 162" />
        <path d="M425 170 L435 162" />
      </g>
      {/* Country town */}
      <rect x="40" y="240" width="400" height="70" fill={STROKE_LT} fillOpacity="0.7" />
      <line x1="40" y1="240" x2="440" y2="240" stroke={STROKE_DK} strokeWidth="1.5" />
      <rect x="40" y="240" width="400" height="10" fill="#C97B4A" />
      <g stroke={STROKE_DK} strokeWidth="1.5" fill={WASH}>
        <rect x="60" y="258" width="50" height="50" />
        <rect x="120" y="258" width="50" height="50" />
        <rect x="180" y="258" width="50" height="50" />
        <rect x="240" y="258" width="50" height="50" />
        <rect x="300" y="258" width="50" height="50" />
        <rect x="360" y="258" width="50" height="50" />
      </g>
      {/* Foreground footpath + ute */}
      <rect x="0" y="310" width="480" height="50" fill={SAND} fillOpacity="0.55" />
      <line x1="0" y1="310" x2="480" y2="310" stroke={STROKE_DK} strokeWidth="1.5" />
      <g stroke={INK} strokeWidth="1.5" fill={PAPER_300}>
        <rect x="200" y="325" width="80" height="20" rx="3" />
        <circle cx="216" cy="348" r="6" />
        <circle cx="264" cy="348" r="6" />
      </g>
    </svg>
  );
}

/* 33. CrossSectionPets — pet-friendly accommodation cross-section
 * (fenced yard + coastal path). */
export function CrossSectionPets({
  title = "Pet-friendly — verify each operator's pet policy",
  ...rest
}: FallbackSvgProps) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="160" fill={SKY} />
      <circle cx="380" cy="50" r="20" fill={SUN} stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Distant headland */}
      <path
        d="M0 160 Q60 140 120 155 Q200 175 280 145 Q360 120 480 155 L480 200 L0 200 Z"
        fill={STROKE_LT}
        opacity="0.55"
      />
      {/* Distant ocean */}
      <rect x="0" y="160" width="480" height="40" fill={STROKE_LT} opacity="0.4" />
      <g stroke={STROKE} strokeWidth="1.5" fill="none" opacity="0.6">
        <path d="M0 175 Q60 170 120 175 T240 175 T360 175 T480 175" />
        <path d="M0 190 Q60 185 120 190 T240 190 T360 190 T480 190" />
      </g>
      {/* Coastal path */}
      <path
        d="M0 200 Q120 190 240 205 Q360 220 480 200 L480 240 L0 240 Z"
        fill={SAND}
        opacity="0.7"
      />
      <line x1="0" y1="200" x2="480" y2="200" stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Holiday house */}
      <rect x="120" y="240" width="200" height="80" fill={WASH} stroke={INK} strokeWidth="1.5" />
      <polygon points="120,240 220,210 320,240" fill={STROKE_LT} fillOpacity="0.7" stroke={INK} strokeWidth="1.5" />
      <rect x="140" y="260" width="30" height="30" fill={STROKE_LT} fillOpacity="0.4" stroke={INK} strokeWidth="1" />
      <rect x="270" y="260" width="30" height="30" fill={STROKE_LT} fillOpacity="0.4" stroke={INK} strokeWidth="1" />
      <rect x="205" y="280" width="30" height="40" fill={STROKE_LT} fillOpacity="0.4" stroke={INK} strokeWidth="1" />
      {/* Fenced yard */}
      <line x1="20" y1="320" x2="460" y2="320" stroke={STROKE_DK} strokeWidth="1.5" />
      <g stroke={STROKE_DK} strokeWidth="1" fill="none">
        <line x1="40" y1="320" x2="40" y2="345" />
        <line x1="60" y1="320" x2="60" y2="345" />
        <line x1="80" y1="320" x2="80" y2="345" />
        <line x1="100" y1="320" x2="100" y2="345" />
        <line x1="120" y1="320" x2="120" y2="345" />
        <line x1="350" y1="320" x2="350" y2="345" />
        <line x1="370" y1="320" x2="370" y2="345" />
        <line x1="390" y1="320" x2="390" y2="345" />
        <line x1="410" y1="320" x2="410" y2="345" />
        <line x1="430" y1="320" x2="430" y2="345" />
        <line x1="450" y1="320" x2="450" y2="345" />
        <line x1="40" y1="332" x2="460" y2="332" />
      </g>
      {/* Dog in yard */}
      <g stroke={INK} strokeWidth="2" strokeLinecap="round" fill={INK}>
        <ellipse cx="180" cy="335" rx="12" ry="6" />
        <circle cx="200" cy="328" r="5" />
        <line x1="208" y1="332" x2="212" y2="330" />
        <line x1="170" y1="340" x2="170" y2="350" />
        <line x1="178" y1="340" x2="178" y2="350" />
        <line x1="186" y1="340" x2="186" y2="350" />
        <line x1="194" y1="340" x2="194" y2="350" />
        <path d="M170 332 Q162 325 164 318" stroke={INK} strokeWidth="1.5" fill="none" />
      </g>
    </svg>
  );
}

/* ====================================================================
 * Reuse surface — keyed by FallbackSvgKey.
 * Consumed by src/components/ui/LocationPhoto.tsx and
 * src/components/ui/LocationCaptionedPhoto.tsx.
 * ==================================================================== */

export const FALLBACK_SVGS = {
  // 10 carry-over (gap fillers + venue typologies + trip themes)
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
  // 7 area scenes (incl. Noosa Junction)
  "area-noosa-heads": AreaNoosaHeads,
  "area-hastings-street": AreaHastingsStreet,
  "area-noosaville": AreaNoosaville,
  "area-tewantin": AreaTewantin,
  "area-peregian": AreaPeregian,
  "area-noosa-national-park": AreaNoosaNationalPark,
  "area-hinterland": AreaHinterland,
  "area-noosa-junction": AreaNoosaJunction,
  // 6 activity scenes
  "activity-surf": ActivitySurf,
  "activity-sup": ActivitySup,
  "activity-kayak": ActivityKayak,
  "activity-swim": ActivitySwim,
  "activity-hike": ActivityHike,
  "activity-fishing": ActivityFishing,
  // 5 trip-theme scenes
  "trip-romantic": TripRomantic,
  "trip-budget": TripBudget,
  "trip-solo": TripSolo,
  "trip-group": TripGroup,
  "trip-business": TripBusiness,
  // 4 decorative + cross-section
  "tewantin": TewantinSvg,
  "peregian": PeregianSvg,
  "hinterland": HinterlandSvg,
  "cross-section-pets": CrossSectionPets,
} as const;

export type FallbackSvgKey = keyof typeof FALLBACK_SVGS;