/**
 * AreaHeroes — bespoke 8 SVG hero illustrations for the homepage's
 * 8-area card grid.
 *
 * v5 (MSN-2959-V5-POLISH #11) — Tim's locked answer #2: custom SVG
 * area hero illustrations are IN SCOPE. Eight bespoke SVGs, one per
 * functional area, inline-rendered. Per Albert's v5 runbook §3.2:
 * "clean line art, consistent stroke weight, palette-aligned, no twee /
 * clipart feel."
 *
 * Design intent:
 *   - 1.5px stroke (matches the v2 Icon set's strokeWidth).
 *   - sea-glass (#2F8074) primary stroke, ink (#0A1F1B) detail.
 *   - 480×360 viewBox (4:3 editorial ratio).
 *   - Soft paper-100 wash background so they read as a hero card.
 *   - Subject references the page's editorial content.
 *
 * Each illustration is a server-renderable React component (no JS),
 * with role="img" + aria-label for a11y.
 */

import type { SVGProps } from "react";

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

/** 1. HeadlandHero — Noosa coastal silhouette + sun. Used for the
 * Noosa National Park card (the eastern cliff the county is named for). */
export function HeadlandHero({
  title = "Noosa National Park — the headland",
  ...rest
}: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      {/* Sky to sea gradient */}
      <defs>
        <linearGradient id="hh-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={WASH} />
          <stop offset="100%" stopColor="#E0EFEC" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="480" height="200" fill="url(#hh-sky)" />
      {/* Sun */}
      <circle cx="380" cy="80" r="34" fill={WASH} stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Distant headland */}
      <path
        d="M0 220 Q60 180 120 195 Q200 215 280 188 Q360 165 480 200 L480 360 L0 360 Z"
        fill="#A8D4CA"
        opacity="0.6"
      />
      {/* Foreground headland */}
      <path
        d="M0 260 Q80 220 160 245 Q220 260 280 235 Q360 215 480 245 L480 360 L0 360 Z"
        fill="#5BA89B"
        opacity="0.85"
      />
      {/* Coastal walk path */}
      <path
        d="M40 320 Q140 290 240 300 Q340 310 440 295"
        stroke={INK}
        strokeWidth="1.5"
        strokeDasharray="4 4"
        opacity="0.5"
        fill="none"
      />
      {/* Trees on headland */}
      <g stroke={INK} strokeWidth="1.5" strokeLinecap="round" fill="none">
        <path d="M120 240 q-2 -8 -6 -10 q4 -2 6 -10 q2 8 6 10 q-4 2 -6 10 z" fill={INK} />
        <path d="M180 235 q-2 -8 -6 -8 q4 -2 6 -10 q2 8 6 10 q-4 2 -6 8 z" fill={INK} />
        <path d="M260 245 q-2 -8 -6 -10 q4 -2 6 -10 q2 8 6 10 q-4 2 -6 10 z" fill={INK} />
        <path d="M340 230 q-2 -8 -6 -10 q4 -2 6 -10 q2 8 6 10 q-4 2 -6 10 z" fill={INK} />
      </g>
    </svg>
  );
}

/** 2. WaveHero — Swell + surf horizon. Surf & weather card. */
export function WaveHero({
  title = "Surf & weather — today's swell",
  ...rest
}: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <defs>
        <linearGradient id="wh-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={WASH} />
          <stop offset="100%" stopColor="#E0EFEC" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="480" height="180" fill="url(#wh-sky)" />
      {/* Horizon */}
      <line x1="0" y1="180" x2="480" y2="180" stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Distant waves */}
      <path
        d="M0 200 Q40 195 80 200 T160 200 T240 200 T320 200 T400 200 T480 200"
        stroke={STROKE}
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M0 215 Q40 210 80 215 T160 215 T240 215 T320 215 T400 215 T480 215"
        stroke={STROKE}
        strokeWidth="1.5"
        fill="none"
      />
      {/* Mid-wave with curl */}
      <path
        d="M0 250 Q60 220 140 245 Q200 260 260 240 Q320 225 380 250 Q430 265 480 250"
        stroke={STROKE_DK}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M260 240 Q280 250 300 240"
        stroke={STROKE_DK}
        strokeWidth="1.5"
        fill="none"
      />
      {/* Foreground wave */}
      <path
        d="M0 310 Q60 285 140 305 Q220 325 300 305 Q380 285 480 305 L480 360 L0 360 Z"
        fill="#5BA89B"
        opacity="0.7"
      />
      {/* Foam */}
      <path
        d="M60 310 q10 -8 20 0 q10 -8 20 0 q10 -8 20 0"
        stroke={WASH}
        strokeWidth="1.5"
        fill="none"
      />
      {/* Sun */}
      <circle cx="80" cy="60" r="20" fill={WASH} stroke={STROKE_DK} strokeWidth="1.5" />
    </svg>
  );
}

/** 3. AccommodationHero — Hastings Street palms + door. Accommodation card. */
export function AccommodationHero({
  title = "Accommodation — Hastings Street",
  ...rest
}: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      {/* Sky */}
      <rect x="0" y="0" width="480" height="200" fill="#E0EFEC" />
      {/* Distant roofline */}
      <path
        d="M0 200 L40 180 L80 200 L120 170 L160 200 L200 175 L240 200 L280 165 L320 200 L360 175 L400 200 L440 180 L480 200"
        stroke={STROKE_DK}
        strokeWidth="1.5"
        fill="#A8D4CA"
      />
      {/* Building line — storefront */}
      <rect x="60" y="200" width="360" height="120" fill="#5BA89B" opacity="0.4" />
      <line x1="60" y1="200" x2="420" y2="200" stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Doors */}
      <g stroke={STROKE_DK} strokeWidth="1.5" fill="none">
        <rect x="100" y="240" width="40" height="80" />
        <rect x="180" y="240" width="40" height="80" />
        <rect x="260" y="240" width="40" height="80" />
        <rect x="340" y="240" width="40" height="80" />
        <circle cx="135" cy="280" r="1.5" fill={INK} />
        <circle cx="215" cy="280" r="1.5" fill={INK} />
        <circle cx="295" cy="280" r="1.5" fill={INK} />
        <circle cx="375" cy="280" r="1.5" fill={INK} />
      </g>
      {/* Foreground palms */}
      <g stroke={INK} strokeWidth="1.5" strokeLinecap="round" fill="none">
        <path d="M40 360 q-2 -120 -8 -180" />
        <path d="M32 180 q-20 -10 -28 -22" />
        <path d="M32 180 q20 -8 30 -20" />
        <path d="M32 180 q-12 -16 -16 -30" />
        <path d="M32 180 q14 -14 22 -28" />
        <path d="M448 360 q4 -120 8 -180" />
        <path d="M456 180 q20 -10 28 -22" />
        <path d="M456 180 q-20 -8 -30 -20" />
        <path d="M456 180 q12 -16 16 -30" />
        <path d="M456 180 q-14 -14 -22 -28" />
      </g>
    </svg>
  );
}

/** 4. ThingsHero — Market / café table / cup. Things to do card. */
export function ThingsHero({
  title = "Things to do — what locals do",
  ...rest
}: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      {/* Sky */}
      <rect x="0" y="0" width="480" height="240" fill="#E0EFEC" />
      {/* Sun */}
      <circle cx="380" cy="60" r="20" fill={WASH} stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Stall canopy */}
      <path d="M120 200 L240 160 L360 200 L360 220 L120 220 Z" fill="#5BA89B" opacity="0.7" />
      <line x1="120" y1="220" x2="360" y2="220" stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Stall pole */}
      <line x1="240" y1="160" x2="240" y2="280" stroke={INK} strokeWidth="2" />
      {/* Table */}
      <rect x="160" y="280" width="160" height="6" fill={STROKE_DK} />
      <line x1="180" y1="286" x2="180" y2="320" stroke={INK} strokeWidth="1.5" />
      <line x1="300" y1="286" x2="300" y2="320" stroke={INK} strokeWidth="1.5" />
      {/* Cup */}
      <g stroke={STROKE_DK} strokeWidth="1.5" fill="none">
        <path d="M210 240 L210 270 Q210 280 220 280 L260 280 Q270 280 270 270 L270 240 Z" />
        <path d="M270 250 q12 0 12 12 q0 12 -12 12" />
        <path d="M220 220 q-2 -10 4 -14" stroke={AMBER} />
        <path d="M232 218 q-2 -10 4 -14" stroke={AMBER} />
        <path d="M244 220 q-2 -10 4 -14" stroke={AMBER} />
      </g>
      {/* Market produce (round) */}
      <circle cx="290" cy="262" r="14" fill="#A8D4CA" stroke={STROKE_DK} strokeWidth="1.5" />
      <circle cx="305" cy="266" r="12" fill="#82BFB1" stroke={STROKE_DK} strokeWidth="1.5" />
    </svg>
  );
}

/** 5. FishingHero — Rod + water. Fishing card. */
export function FishingHero({
  title = "Fishing — the river mouth",
  ...rest
}: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="200" fill="#E0EFEC" />
      {/* Horizon */}
      <line x1="0" y1="200" x2="480" y2="200" stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Water waves */}
      <g stroke={STROKE} strokeWidth="1.5" fill="none">
        <path d="M0 240 Q40 235 80 240 T160 240 T240 240 T320 240 T400 240 T480 240" />
        <path d="M0 270 Q40 265 80 270 T160 270 T240 270 T320 270 T400 270 T480 270" />
        <path d="M0 300 Q40 295 80 300 T160 300 T240 300 T320 300 T400 300 T480 300" />
        <path d="M0 330 Q40 325 80 330 T160 330 T240 330 T320 330 T400 330 T480 330" />
      </g>
      {/* Fishing rod */}
      <g stroke={INK} strokeWidth="2" strokeLinecap="round" fill="none">
        <path d="M60 340 L300 80" />
        <circle cx="60" cy="340" r="6" fill={INK} />
        {/* Line */}
        <path d="M300 80 Q360 200 380 260" stroke={STROKE_DK} strokeWidth="1" />
        {/* Reel */}
        <circle cx="80" cy="290" r="12" stroke={STROKE_DK} strokeWidth="1.5" />
        <line x1="80" y1="290" x2="90" y2="285" />
      </g>
      {/* Splash at line */}
      <g stroke={STROKE_DK} strokeWidth="1.5" fill="none" opacity="0.8">
        <path d="M376 255 q4 -8 8 -2" />
        <path d="M384 258 q-4 -8 -8 -2" />
      </g>
      {/* Sun */}
      <circle cx="100" cy="80" r="22" fill={WASH} stroke={STROKE_DK} strokeWidth="1.5" />
    </svg>
  );
}

/** 6. BoatHero — Ferry + river. Boats & watercraft card. */
export function BoatHero({
  title = "Boats & watercraft — the ferry",
  ...rest
}: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="200" fill="#E0EFEC" />
      <line x1="0" y1="200" x2="480" y2="200" stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Far shore */}
      <path d="M0 200 Q60 180 120 195 Q200 215 280 188 Q360 165 480 200 L480 200 Z" fill="#A8D4CA" opacity="0.7" />
      {/* Water waves */}
      <g stroke={STROKE} strokeWidth="1.5" fill="none">
        <path d="M0 240 Q40 235 80 240 T160 240 T240 240 T320 240 T400 240 T480 240" />
        <path d="M0 270 Q40 265 80 270 T160 270 T240 270 T320 270 T400 270 T480 270" />
        <path d="M0 320 Q40 315 80 320 T160 320 T240 320 T320 320 T400 320 T480 320" />
      </g>
      {/* Ferry hull */}
      <g stroke={STROKE_DK} strokeWidth="2" strokeLinecap="round" fill="#5BA89B" fillOpacity="0.85">
        <path d="M150 290 L330 290 L310 320 L170 320 Z" />
        {/* Cabin */}
        <rect x="180" y="240" width="120" height="50" fill="#82BFB1" />
        {/* Windows */}
        <g fill={WASH} stroke={STROKE_DK} strokeWidth="1.5">
          <rect x="190" y="252" width="14" height="14" />
          <rect x="212" y="252" width="14" height="14" />
          <rect x="234" y="252" width="14" height="14" />
          <rect x="256" y="252" width="14" height="14" />
          <rect x="278" y="252" width="14" height="14" />
        </g>
        {/* Mast */}
        <line x1="240" y1="240" x2="240" y2="200" stroke={INK} strokeWidth="1.5" />
        <circle cx="240" cy="200" r="2" fill={AMBER} />
        {/* Wake */}
        <path d="M150 305 Q120 310 100 318" stroke={WASH} strokeWidth="2" fill="none" opacity="0.8" />
        <path d="M330 305 Q360 310 380 318" stroke={WASH} strokeWidth="2" fill="none" opacity="0.8" />
      </g>
    </svg>
  );
}

/** 7. TravelHero — Bruce Highway curve + signpost. Travel & transport card. */
export function TravelHero({
  title = "Travel & transport — the road in",
  ...rest
}: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      {/* Sky */}
      <rect x="0" y="0" width="480" height="220" fill="#E0EFEC" />
      {/* Distant mountains */}
      <path d="M0 220 L80 160 L140 180 L200 140 L260 175 L320 150 L400 180 L480 165 L480 220 Z" fill="#A8D4CA" opacity="0.6" />
      {/* Closer hills */}
      <path d="M0 240 L100 200 L180 230 L260 210 L340 235 L420 215 L480 240 L480 360 L0 360 Z" fill="#82BFB1" opacity="0.7" />
      {/* Road */}
      <path d="M0 360 Q120 280 240 290 Q360 300 480 270 L480 360 Z" fill={INK} opacity="0.7" />
      {/* Lane lines */}
      <g stroke={WASH} strokeWidth="2" strokeDasharray="20 20" fill="none">
        <path d="M120 320 Q200 300 280 305 Q360 310 420 290" />
      </g>
      {/* Signpost */}
      <g stroke={INK} strokeWidth="1.5" strokeLinecap="round" fill="none">
        <line x1="80" y1="280" x2="80" y2="240" />
        <path d="M60 250 L100 250 L100 245 L60 245 Z" fill="#5BA89B" />
        <line x1="60" y1="247.5" x2="100" y2="247.5" />
        <text x="80" y="252" textAnchor="middle" fontSize="9" fill={INK} fontFamily="ui-sans-serif">NOOSA</text>
      </g>
      {/* Sun */}
      <circle cx="400" cy="60" r="20" fill={WASH} stroke={STROKE_DK} strokeWidth="1.5" />
    </svg>
  );
}

/** 8. WebcamHero — Camera on tripod + coastline. Webcams card. */
export function WebcamHero({
  title = "Webcams — the public cams",
  ...rest
}: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      {/* Sky */}
      <rect x="0" y="0" width="480" height="240" fill="#E0EFEC" />
      {/* Coastline in viewfinder */}
      <line x1="0" y1="180" x2="480" y2="180" stroke={STROKE_DK} strokeWidth="1.5" />
      <path
        d="M0 220 Q60 200 120 215 Q200 230 280 205 Q360 185 480 215 L480 280 L0 280 Z"
        fill="#5BA89B"
        opacity="0.85"
      />
      <path
        d="M0 245 Q40 240 80 245 T160 245 T240 245 T320 245 T400 245 T480 245"
        stroke={WASH}
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="380" cy="60" r="20" fill={WASH} stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Camera body */}
      <g stroke={INK} strokeWidth="1.5" strokeLinecap="round">
        <rect x="200" y="240" width="80" height="50" fill="#0E4A41" rx="2" />
        {/* Lens */}
        <circle cx="240" cy="265" r="14" fill="#5BA89B" stroke={INK} strokeWidth="1.5" />
        <circle cx="240" cy="265" r="6" fill={INK} />
        {/* Tripod */}
        <line x1="220" y1="290" x2="200" y2="350" stroke={INK} strokeWidth="1.5" />
        <line x1="260" y1="290" x2="280" y2="350" stroke={INK} strokeWidth="1.5" />
        <line x1="240" y1="290" x2="240" y2="350" stroke={INK} strokeWidth="1.5" />
        {/* Recording dot */}
        <circle cx="270" cy="248" r="2" fill={AMBER} />
      </g>
      {/* LIVE label */}
      <g>
        <rect x="208" y="216" width="36" height="14" fill={AMBER} rx="1" />
        <text x="226" y="226" textAnchor="middle" fontSize="9" fill={WASH} fontFamily="ui-sans-serif" fontWeight="600">LIVE</text>
      </g>
    </svg>
  );
}

/**
 * AreaHeroes — single import surface for the homepage's 8-area card
 * grid. Each entry pairs with a category from src/data/site.ts.
 */
export const AreaHeroes = {
  Headland: HeadlandHero,
  Wave: WaveHero,
  Accommodation: AccommodationHero,
  Things: ThingsHero,
  Fishing: FishingHero,
  Boat: BoatHero,
  Travel: TravelHero,
  Webcam: WebcamHero,
} as const;

export type AreaHeroName = keyof typeof AreaHeroes;