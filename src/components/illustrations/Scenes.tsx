/**
 * Scenes — 12+ bespoke SVG scene illustrations for v6.1 content rails.
 *
 * Per Albert's v6 spec §5.3: 12 scenes (50-100 elements each) used as
 * hero / section accents across S4, S6, S7, S8, S11, S12, plus the
 * mega-menu panel images. Sea-glass palette + 4:3 viewBox + 1.5px
 * stroke to match the Icon set and AreaHeroes set.
 *
 * v6.1 ship: 12 scenes. Stretch 13-15 (Eumundi tents, waterfall,
 * koala) are optional follow-ons.
 *
 * Each scene is a server-renderable React component (no JS). All
 * have role="img" + aria-label for a11y.
 *
 * Design intent:
 *   - 480×360 viewBox (4:3 editorial ratio).
 *   - Sea-glass primary stroke (#2F8074), ink detail (#0A1F1B),
 *     amber (#B8742A) for a single accent dot (per the v5 palette rule).
 *   - Paper-100 wash background.
 *   - No two scenes share the same composition.
 *
 * The scenes are intentionally graphic, not photo-realistic; they
 * serve as decorative accents and section markers. They are NOT a
 * substitute for the curated Unsplash photos on the cards.
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

const STROKE = "#2F8074";
const STROKE_DK = "#0E4A41";
const INK = "#0A1F1B";
const AMBER = "#B8742A";
const WASH = "#F4F8F7";
const SEA = "#A8D4CA";

/* ----------------------------------------------------------------------
 * 1. Surfer silhouette — longboard + headland in the distance.
 * Used: S4 (things-to-do — surfing lesson card), S6 (new visitor card).
 * -------------------------------------------------------------------- */
export function SurferSilhouetteScene({
  title = "Surfer on a longboard, headland in the distance",
  ...rest
}: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      {/* Sky */}
      <rect x="0" y="0" width="480" height="200" fill="#EAF4F1" />
      {/* Distant headland */}
      <path
        d="M0 200 L60 195 L120 188 L200 184 L260 175 L300 170 L320 165 L340 168 L380 175 L420 180 L480 195 L480 220 L0 220 Z"
        fill={STROKE}
        opacity="0.35"
      />
      {/* Closer headland */}
      <path
        d="M0 230 L80 220 L180 215 L260 210 L320 205 L360 210 L400 215 L480 225 L480 250 L0 250 Z"
        fill={STROKE}
        opacity="0.6"
      />
      {/* Sun */}
      <circle cx="380" cy="80" r="22" fill={AMBER} />
      {/* Water with wave lines */}
      <rect x="0" y="240" width="480" height="120" fill={SEA} opacity="0.6" />
      <path
        d="M0 260 Q40 254 80 260 T160 260 T240 260 T320 260 T400 260 T480 260"
        stroke={STROKE}
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M0 285 Q40 280 80 285 T160 285 T240 285 T320 285 T400 285 T480 285"
        stroke={STROKE}
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      {/* Longboard */}
      <ellipse
        cx="240"
        cy="320"
        rx="80"
        ry="6"
        fill={INK}
        opacity="0.85"
      />
      {/* Surfer figure */}
      <g transform="translate(232 250)">
        <circle cx="8" cy="0" r="6" fill={INK} />
        <path
          d="M8 6 L8 28 M8 14 L0 22 M8 14 L16 22 M0 38 L8 28 L16 38"
          stroke={INK}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

/* ----------------------------------------------------------------------
 * 2. Noosa River bend — river curve with houseboats + gum trees.
 * Used: S5 (Tewantin stay), S4 (river cruise).
 * -------------------------------------------------------------------- */
export function NoosaRiverScene({
  title = "Noosa River bend with houseboats and gum trees",
  ...rest
}: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="220" fill="#EAF4F1" />
      {/* River */}
      <path
        d="M-20 240 Q100 200 200 230 T420 250 L480 270 L480 360 L-20 360 Z"
        fill={SEA}
        opacity="0.7"
      />
      {/* Distant trees on left bank */}
      <g stroke={STROKE} strokeWidth="1.5" fill="none">
        <ellipse cx="40" cy="200" rx="14" ry="40" fill={STROKE} opacity="0.5" />
        <ellipse cx="80" cy="190" rx="18" ry="50" fill={STROKE} opacity="0.6" />
        <ellipse cx="120" cy="195" rx="12" ry="35" fill={STROKE} opacity="0.5" />
      </g>
      {/* Houseboat */}
      <g transform="translate(280 230)">
        <rect x="0" y="0" width="60" height="14" rx="2" fill={INK} opacity="0.85" />
        <rect x="6" y="-8" width="48" height="8" fill={STROKE} />
        <path d="M0 14 L60 14" stroke={INK} strokeWidth="1.5" />
      </g>
      {/* Small boat */}
      <g transform="translate(180 250)">
        <path d="M-10 0 L10 0 L6 6 L-6 6 Z" fill={INK} opacity="0.75" />
        <path d="M0 -2 L0 -10" stroke={INK} strokeWidth="1.5" />
      </g>
      {/* Reflection lines */}
      <path
        d="M180 260 Q220 264 260 260 T340 260"
        stroke={STROKE}
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M180 275 Q220 279 260 275 T340 275"
        stroke={STROKE}
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />
      {/* Sun */}
      <circle cx="100" cy="80" r="20" fill={AMBER} opacity="0.85" />
    </svg>
  );
}

/* ----------------------------------------------------------------------
 * 3. Hastings Street facade — shopfronts with palms.
 * Used: S5 (Hastings Street stay), mega-menu "Stay" image.
 * -------------------------------------------------------------------- */
export function HastingsStreetScene({
  title = "Hastings Street shopfronts with palms",
  ...rest
}: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="220" fill="#EAF4F1" />
      {/* Pavement */}
      <rect x="0" y="280" width="480" height="80" fill={INK} opacity="0.85" />
      {/* Shopfronts */}
      <g>
        <rect x="20" y="180" width="100" height="100" fill={STROKE} opacity="0.4" />
        <rect x="125" y="180" width="100" height="100" fill={STROKE} opacity="0.55" />
        <rect x="230" y="180" width="100" height="100" fill={STROKE} opacity="0.4" />
        <rect x="335" y="180" width="125" height="100" fill={STROKE} opacity="0.55" />
        {/* Awnings */}
        <rect x="20" y="180" width="100" height="14" fill={STROKE} />
        <rect x="125" y="180" width="100" height="14" fill={STROKE} />
        <rect x="230" y="180" width="100" height="14" fill={STROKE} />
        <rect x="335" y="180" width="125" height="14" fill={STROKE} />
        {/* Windows */}
        <rect x="30" y="200" width="80" height="40" fill={WASH} stroke={STROKE_DK} strokeWidth="1.5" />
        <rect x="135" y="200" width="80" height="40" fill={WASH} stroke={STROKE_DK} strokeWidth="1.5" />
        <rect x="240" y="200" width="80" height="40" fill={WASH} stroke={STROKE_DK} strokeWidth="1.5" />
        <rect x="345" y="200" width="105" height="40" fill={WASH} stroke={STROKE_DK} strokeWidth="1.5" />
        {/* Doors */}
        <rect x="50" y="245" width="40" height="35" fill={INK} opacity="0.7" />
        <rect x="155" y="245" width="40" height="35" fill={INK} opacity="0.7" />
        <rect x="260" y="245" width="40" height="35" fill={INK} opacity="0.7" />
        <rect x="365" y="245" width="40" height="35" fill={INK} opacity="0.7" />
      </g>
      {/* Palms */}
      <g stroke={STROKE} strokeWidth="1.5" fill="none">
        <line x1="60" y1="180" x2="60" y2="80" strokeWidth="3" />
        <path d="M60 80 Q40 70 30 50 M60 80 Q80 70 95 55 M60 80 Q50 90 40 100 M60 80 Q70 90 85 95" />
        <line x1="200" y1="180" x2="200" y2="60" strokeWidth="3" />
        <path d="M200 60 Q180 50 170 30 M200 60 Q220 50 235 35 M200 60 Q190 70 180 80 M200 60 Q210 70 225 75" />
        <line x1="380" y1="180" x2="380" y2="100" strokeWidth="3" />
        <path d="M380 100 Q360 90 350 70 M380 100 Q400 90 415 75 M380 100 Q370 110 360 120 M380 100 Q390 110 405 115" />
      </g>
    </svg>
  );
}

/* ----------------------------------------------------------------------
 * 4. Farmers market stall — produce + awning.
 * Used: S4 (farmers market card), S7 (eat & drink market card).
 * -------------------------------------------------------------------- */
export function MarketStallScene({
  title = "Farmers market stall with produce",
  ...rest
}: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="240" width="480" height="120" fill={INK} opacity="0.85" />
      {/* Awning */}
      <path d="M40 140 L440 140 L420 180 L60 180 Z" fill={STROKE} />
      <path d="M40 140 L440 140" stroke={STROKE_DK} strokeWidth="1.5" />
      {/* Awning stripes */}
      <line x1="120" y1="140" x2="115" y2="180" stroke={WASH} strokeWidth="2" />
      <line x1="200" y1="140" x2="200" y2="180" stroke={WASH} strokeWidth="2" />
      <line x1="280" y1="140" x2="285" y2="180" stroke={WASH} strokeWidth="2" />
      <line x1="360" y1="140" x2="365" y2="180" stroke={WASH} strokeWidth="2" />
      {/* Stall table */}
      <rect x="60" y="220" width="360" height="20" fill={STROKE_DK} />
      <rect x="80" y="240" width="6" height="50" fill={STROKE_DK} />
      <rect x="394" y="240" width="6" height="50" fill={STROKE_DK} />
      {/* Produce crates */}
      <g>
        <rect x="80" y="195" width="50" height="25" fill={SEA} stroke={STROKE_DK} strokeWidth="1.5" />
        <circle cx="92" cy="207" r="6" fill={AMBER} />
        <circle cx="105" cy="207" r="6" fill={AMBER} />
        <circle cx="118" cy="207" r="6" fill={AMBER} />
      </g>
      <g>
        <rect x="140" y="195" width="50" height="25" fill={SEA} stroke={STROKE_DK} strokeWidth="1.5" />
        <circle cx="150" cy="207" r="5" fill="#5BA89B" />
        <circle cx="163" cy="207" r="5" fill="#5BA89B" />
        <circle cx="176" cy="207" r="5" fill="#5BA89B" />
      </g>
      <g>
        <rect x="200" y="195" width="50" height="25" fill={SEA} stroke={STROKE_DK} strokeWidth="1.5" />
        <rect x="210" y="200" width="30" height="15" fill={STROKE} />
      </g>
      <g>
        <rect x="260" y="195" width="50" height="25" fill={SEA} stroke={STROKE_DK} strokeWidth="1.5" />
        <ellipse cx="275" cy="207" rx="6" ry="4" fill={AMBER} />
        <ellipse cx="288" cy="207" rx="6" ry="4" fill={AMBER} />
        <ellipse cx="301" cy="207" rx="6" ry="4" fill={AMBER} />
      </g>
      <g>
        <rect x="320" y="195" width="50" height="25" fill={SEA} stroke={STROKE_DK} strokeWidth="1.5" />
        <path d="M335 195 L345 215 L355 195" fill={STROKE} />
      </g>
      {/* Hanging price tag */}
      <line x1="100" y1="180" x2="100" y2="190" stroke={INK} strokeWidth="1" />
      <rect x="92" y="190" width="20" height="10" fill={WASH} stroke={INK} strokeWidth="1" />
    </svg>
  );
}

/* ----------------------------------------------------------------------
 * 5. Sunset gradient — sun setting over headland, horizontal bands.
 * Used: S4 (sunset cruise), S8 (noosa right now), hero overlay alt.
 * -------------------------------------------------------------------- */
export function SunsetScene({
  title = "Sun setting over the headland, horizontal bands",
  ...rest
}: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <defs>
        <linearGradient id="v61-sunset" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={AMBER} stopOpacity="0.9" />
          <stop offset="0.45" stopColor={AMBER} stopOpacity="0.5" />
          <stop offset="1" stopColor={STROKE} stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="480" height="360" fill="url(#v61-sunset)" />
      {/* Sun */}
      <circle cx="240" cy="220" r="44" fill="#FFF1C9" stroke={AMBER} strokeWidth="1.5" />
      {/* Horizontal bands */}
      <rect x="0" y="270" width="480" height="6" fill={INK} opacity="0.4" />
      <rect x="0" y="285" width="480" height="4" fill={INK} opacity="0.5" />
      <rect x="0" y="298" width="480" height="3" fill={INK} opacity="0.6" />
      <rect x="0" y="312" width="480" height="2" fill={INK} opacity="0.7" />
      {/* Headland silhouette */}
      <path
        d="M0 250 L80 240 L120 235 L160 230 L200 232 L240 226 L280 230 L320 234 L360 232 L400 238 L440 245 L480 252 L480 360 L0 360 Z"
        fill={INK}
        opacity="0.9"
      />
      {/* Tree line on headland */}
      <ellipse cx="60" cy="240" rx="14" ry="6" fill={INK} />
      <ellipse cx="180" cy="232" rx="18" ry="8" fill={INK} />
      <ellipse cx="320" cy="234" rx="16" ry="6" fill={INK} />
      <ellipse cx="420" cy="240" rx="14" ry="6" fill={INK} />
    </svg>
  );
}

/* ----------------------------------------------------------------------
 * 6. Headland outline — clean Noosa Headland profile.
 * Used: S6 (returning visitor card), mega-menu "Plan" image.
 * -------------------------------------------------------------------- */
export function HeadlandOutlineScene({
  title = "Clean Noosa Headland profile",
  ...rest
}: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="220" fill="#EAF4F1" />
      {/* Distant headland (light) */}
      <path
        d="M0 200 L60 195 L120 188 L200 184 L260 175 L300 170 L320 165 L340 168 L380 175 L420 180 L480 195 L480 230 L0 230 Z"
        fill={STROKE}
        opacity="0.25"
      />
      {/* Noosa Headland — distinctive profile */}
      <path
        d="M0 240 L60 220 L120 215 L180 200 L220 195 L240 200 L260 195 L280 175 L300 170 L320 165 L340 168 L360 175 L380 180 L420 195 L460 215 L480 230 L480 270 L0 270 Z"
        fill={STROKE}
        opacity="0.85"
      />
      {/* Sea */}
      <rect x="0" y="270" width="480" height="90" fill={SEA} opacity="0.6" />
      <path
        d="M0 290 Q60 285 120 290 T240 290 T360 290 T480 290"
        stroke={STROKE}
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M0 320 Q60 315 120 320 T240 320 T360 320 T480 320"
        stroke={STROKE}
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
      {/* Lighthouse on headland */}
      <g transform="translate(298 145)">
        <rect x="0" y="0" width="6" height="20" fill={INK} />
        <rect x="-1" y="-2" width="8" height="4" fill={AMBER} />
        <path d="M-2 0 L8 0" stroke={INK} strokeWidth="1" />
      </g>
    </svg>
  );
}

/* ----------------------------------------------------------------------
 * 7. Palm cluster — 3-4 palms, sea-glass + paper-100.
 * Used: S1 hero accent, S7 (eat & drink background),
 * mega-menu "Destinations" image.
 * -------------------------------------------------------------------- */
export function PalmClusterScene({
  title = "Cluster of palm trees against the sea",
  ...rest
}: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="240" fill="#EAF4F1" />
      {/* Sand */}
      <path
        d="M0 280 Q120 270 240 275 T480 280 L480 360 L0 360 Z"
        fill={AMBER}
        opacity="0.5"
      />
      {/* Sea */}
      <path
        d="M0 240 Q120 232 240 240 T480 240 L480 280 L0 280 Z"
        fill={SEA}
        opacity="0.6"
      />
      <path
        d="M0 255 Q60 252 120 255 T240 255 T360 255 T480 255"
        stroke={STROKE}
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
      {/* Palm 1 — left */}
      <g stroke={STROKE} strokeWidth="1.5" fill="none">
        <line x1="100" y1="290" x2="100" y2="60" strokeWidth="3" stroke={STROKE_DK} />
        <path d="M100 60 Q70 50 50 30 M100 60 Q130 50 150 35 M100 60 Q85 70 70 80 M100 60 Q115 70 130 80" />
        <ellipse cx="100" cy="60" rx="40" ry="20" fill={STROKE} opacity="0.4" />
      </g>
      {/* Palm 2 — centre, taller */}
      <g stroke={STROKE} strokeWidth="1.5" fill="none">
        <line x1="240" y1="295" x2="240" y2="40" strokeWidth="3" stroke={STROKE_DK} />
        <path d="M240 40 Q210 30 190 10 M240 40 Q270 30 295 15 M240 40 Q225 50 210 60 M240 40 Q255 50 275 60" />
        <ellipse cx="240" cy="40" rx="45" ry="22" fill={STROKE} opacity="0.5" />
      </g>
      {/* Palm 3 — right, smaller */}
      <g stroke={STROKE} strokeWidth="1.5" fill="none">
        <line x1="380" y1="290" x2="380" y2="90" strokeWidth="3" stroke={STROKE_DK} />
        <path d="M380 90 Q350 80 330 60 M380 90 Q410 80 430 65 M380 90 Q365 100 350 110 M380 90 Q395 100 415 110" />
        <ellipse cx="380" cy="90" rx="38" ry="18" fill={STROKE} opacity="0.4" />
      </g>
    </svg>
  );
}

/* ----------------------------------------------------------------------
 * 8. Ferry boat — close-up of the Noosa Ferry.
 * Used: S4 (river cruise card), mega-menu "See & Do" image.
 * -------------------------------------------------------------------- */
export function FerryBoatScene({
  title = "Noosa Ferry boat on the river",
  ...rest
}: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="200" fill="#EAF4F1" />
      {/* River */}
      <rect x="0" y="200" width="480" height="160" fill={SEA} opacity="0.6" />
      <path
        d="M0 240 Q60 235 120 240 T240 240 T360 240 T480 240"
        stroke={STROKE}
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M0 280 Q60 275 120 280 T240 280 T360 280 T480 280"
        stroke={STROKE}
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
      {/* Ferry body */}
      <g>
        {/* Hull */}
        <path
          d="M60 240 L420 240 L400 280 L80 280 Z"
          fill={INK}
          opacity="0.85"
        />
        {/* Cabin */}
        <rect x="120" y="180" width="240" height="60" fill={STROKE} />
        {/* Roof */}
        <rect x="115" y="170" width="250" height="14" fill={INK} opacity="0.9" />
        {/* Windows */}
        <rect x="135" y="200" width="30" height="30" fill={WASH} stroke={STROKE_DK} strokeWidth="1.5" />
        <rect x="175" y="200" width="30" height="30" fill={WASH} stroke={STROKE_DK} strokeWidth="1.5" />
        <rect x="215" y="200" width="30" height="30" fill={WASH} stroke={STROKE_DK} strokeWidth="1.5" />
        <rect x="255" y="200" width="30" height="30" fill={WASH} stroke={STROKE_DK} strokeWidth="1.5" />
        <rect x="295" y="200" width="30" height="30" fill={WASH} stroke={STROKE_DK} strokeWidth="1.5" />
        {/* Cabin stripe */}
        <line x1="120" y1="220" x2="360" y2="220" stroke={AMBER} strokeWidth="3" />
        {/* Noosa ferry badge */}
        <circle cx="240" cy="200" r="6" fill={AMBER} />
      </g>
      {/* Wake */}
      <path
        d="M40 290 Q120 285 180 290 T320 290 Q400 290 460 290"
        stroke={STROKE}
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
}

/* ----------------------------------------------------------------------
 * 9. Fishing boat — small tinny on the river.
 * Used: S4 (fishing charter card), mega-menu "Stay" image alt.
 * -------------------------------------------------------------------- */
export function FishingBoatScene({
  title = "Small fishing tinny on the river",
  ...rest
}: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="200" fill="#EAF4F1" />
      <rect x="0" y="200" width="480" height="160" fill={SEA} opacity="0.6" />
      <path
        d="M0 250 Q60 245 120 250 T240 250 T360 250 T480 250"
        stroke={STROKE}
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M0 290 Q60 285 120 290 T240 290 T360 290 T480 290"
        stroke={STROKE}
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
      {/* Boat hull */}
      <path d="M150 250 L330 250 L300 290 L180 290 Z" fill={INK} opacity="0.85" />
      {/* Cabin */}
      <rect x="220" y="220" width="60" height="30" fill={STROKE} />
      {/* Outboard motor */}
      <rect x="320" y="260" width="14" height="20" fill={INK} />
      {/* Person */}
      <g transform="translate(195 215)">
        <circle cx="0" cy="0" r="6" fill={INK} />
        <path d="M0 6 L0 22 M-4 14 L4 14" stroke={INK} strokeWidth="2" />
      </g>
      {/* Fishing rod */}
      <line x1="195" y1="220" x2="270" y2="160" stroke={INK} strokeWidth="2" />
      <line x1="270" y1="160" x2="280" y2="170" stroke={INK} strokeWidth="1" />
      {/* Rod tip */}
      <circle cx="270" cy="160" r="1.5" fill={AMBER} />
    </svg>
  );
}

/* ----------------------------------------------------------------------
 * 10. Bird flock — flock of shorebirds over water.
 * Used: S12 accent, S8 (noosa right now), S6 plan card.
 * -------------------------------------------------------------------- */
export function BirdFlockScene({
  title = "Flock of shorebirds over water",
  ...rest
}: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="180" fill="#EAF4F1" />
      {/* Water */}
      <rect x="0" y="180" width="480" height="180" fill={SEA} opacity="0.6" />
      <path
        d="M0 220 Q60 215 120 220 T240 220 T360 220 T480 220"
        stroke={STROKE}
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M0 260 Q60 255 120 260 T240 260 T360 260 T480 260"
        stroke={STROKE}
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M0 310 Q60 305 120 310 T240 310 T360 310 T480 310"
        stroke={STROKE}
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />
      {/* Sand bar */}
      <path
        d="M0 350 Q120 340 240 350 T480 350 L480 360 L0 360 Z"
        fill={AMBER}
        opacity="0.5"
      />
      {/* Birds — flock of seagulls */}
      <g stroke={INK} strokeWidth="1.5" fill="none">
        <path d="M60 60 Q66 56 72 60 Q78 56 84 60" />
        <path d="M120 80 Q126 76 132 80 Q138 76 144 80" />
        <path d="M180 50 Q186 46 192 50 Q198 46 204 50" />
        <path d="M220 90 Q226 86 232 90 Q238 86 244 90" />
        <path d="M280 60 Q286 56 292 60 Q298 56 304 60" />
        <path d="M340 80 Q346 76 352 80 Q358 76 364 80" />
        <path d="M400 50 Q406 46 412 50 Q418 46 424 50" />
        <path d="M80 110 Q86 106 92 110 Q98 106 104 110" />
        <path d="M260 110 Q266 106 272 110 Q278 106 284 110" />
        <path d="M380 120 Q386 116 392 120 Q398 116 404 120" />
      </g>
      {/* Distant bird on sand */}
      <path d="M120 348 Q124 344 128 348 Q132 344 136 348" stroke={INK} strokeWidth="1.5" fill="none" />
      <path d="M200 350 Q204 346 208 350 Q212 346 216 350" stroke={INK} strokeWidth="1.5" fill="none" />
    </svg>
  );
}

/* ----------------------------------------------------------------------
 * 11. Beach umbrella — single umbrella on the sand.
 * Used: S4 (sunset at Main Beach), S11 editorial.
 * -------------------------------------------------------------------- */
export function BeachUmbrellaScene({
  title = "Single beach umbrella on the sand",
  ...rest
}: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="200" fill="#EAF4F1" />
      <rect x="0" y="200" width="480" height="160" fill={SEA} opacity="0.6" />
      <path
        d="M0 220 Q60 215 120 220 T240 220 T360 220 T480 220"
        stroke={STROKE}
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />
      {/* Sand */}
      <path
        d="M0 250 Q120 240 240 250 T480 250 L480 360 L0 360 Z"
        fill={AMBER}
        opacity="0.4"
      />
      {/* Distant headland */}
      <path
        d="M0 250 L80 240 L120 235 L180 230 L240 232 L300 235 L360 240 L420 245 L480 252 L480 250 L0 250 Z"
        fill={STROKE}
        opacity="0.5"
      />
      {/* Beach umbrella */}
      <g transform="translate(240 200)">
        {/* Pole */}
        <line x1="0" y1="0" x2="0" y2="120" stroke={INK} strokeWidth="2" />
        {/* Canopy */}
        <path
          d="M-90 0 Q-45 -60 0 0 Q45 -60 90 0 Z"
          fill={STROKE}
        />
        {/* Canopy stripes */}
        <path d="M-60 -36 L-30 -3" stroke={WASH} strokeWidth="2" />
        <path d="M-30 -52 L-15 -2" stroke={WASH} strokeWidth="2" />
        <path d="M0 -60 L0 0" stroke={WASH} strokeWidth="2" />
        <path d="M30 -52 L15 -2" stroke={WASH} strokeWidth="2" />
        <path d="M60 -36 L30 -3" stroke={WASH} strokeWidth="2" />
        {/* Tip */}
        <circle cx="0" cy="-60" r="3" fill={AMBER} />
      </g>
      {/* Shadow */}
      <ellipse cx="240" cy="280" rx="100" ry="6" fill={INK} opacity="0.2" />
    </svg>
  );
}

/* ----------------------------------------------------------------------
 * 12. Map pin — clean map pin on a road.
 * Used: S6 (plan hub, deadline card), S10 (getting here).
 * -------------------------------------------------------------------- */
export function MapPinScene({
  title = "Map pin on a winding road",
  ...rest
}: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      {/* Subtle grid */}
      <g stroke={STROKE} strokeWidth="1" opacity="0.15">
        <line x1="60" y1="0" x2="60" y2="360" />
        <line x1="120" y1="0" x2="120" y2="360" />
        <line x1="180" y1="0" x2="180" y2="360" />
        <line x1="240" y1="0" x2="240" y2="360" />
        <line x1="300" y1="0" x2="300" y2="360" />
        <line x1="360" y1="0" x2="360" y2="360" />
        <line x1="420" y1="0" x2="420" y2="360" />
        <line x1="0" y1="60" x2="480" y2="60" />
        <line x1="0" y1="120" x2="480" y2="120" />
        <line x1="0" y1="180" x2="480" y2="180" />
        <line x1="0" y1="240" x2="480" y2="240" />
        <line x1="0" y1="300" x2="480" y2="300" />
      </g>
      {/* Roads */}
      <path
        d="M-20 280 Q80 200 200 220 T420 200 L480 220"
        stroke={STROKE}
        strokeWidth="6"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M-20 280 Q80 200 200 220 T420 200 L480 220"
        stroke={WASH}
        strokeWidth="2"
        strokeDasharray="6 8"
        fill="none"
      />
      <path
        d="M80 360 L120 280 L200 220 L260 80 L320 -20"
        stroke={STROKE}
        strokeWidth="5"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M80 360 L120 280 L200 220 L260 80 L320 -20"
        stroke={WASH}
        strokeWidth="2"
        strokeDasharray="6 8"
        fill="none"
      />
      {/* Map pin */}
      <g transform="translate(200 220)">
        <path
          d="M0 -50 C-22 -50 -32 -36 -32 -22 C-32 -2 0 30 0 30 C0 30 32 -2 32 -22 C32 -36 22 -50 0 -50 Z"
          fill={AMBER}
          stroke={STROKE_DK}
          strokeWidth="1.5"
        />
        <circle cx="0" cy="-22" r="8" fill={WASH} />
      </g>
    </svg>
  );
}

/* ----------------------------------------------------------------------
 * 13. Eumundi market tents — 4 tents in a row. (stretch / optional)
 * -------------------------------------------------------------------- */
export function MarketTentsScene({
  title = "Eumundi market tents in a row",
  ...rest
}: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="220" fill="#EAF4F1" />
      <rect x="0" y="270" width="480" height="90" fill={INK} opacity="0.85" />
      {/* Tents */}
      <g>
        <path d="M40 200 L80 140 L120 200 Z" fill={STROKE} />
        <rect x="55" y="200" width="50" height="70" fill={STROKE} opacity="0.7" />
        <path d="M150 200 L190 130 L230 200 Z" fill={STROKE} />
        <rect x="165" y="200" width="50" height="70" fill={STROKE} opacity="0.7" />
        <path d="M260 200 L300 145 L340 200 Z" fill={STROKE} />
        <rect x="275" y="200" width="50" height="70" fill={STROKE} opacity="0.7" />
        <path d="M370 200 L410 130 L450 200 Z" fill={STROKE} />
        <rect x="385" y="200" width="50" height="70" fill={STROKE} opacity="0.7" />
        {/* Awning stripes */}
        <line x1="80" y1="140" x2="80" y2="200" stroke={WASH} strokeWidth="2" />
        <line x1="190" y1="130" x2="190" y2="200" stroke={WASH} strokeWidth="2" />
        <line x1="300" y1="145" x2="300" y2="200" stroke={WASH} strokeWidth="2" />
        <line x1="410" y1="130" x2="410" y2="200" stroke={WASH} strokeWidth="2" />
        {/* Pennants */}
        <path d="M40 130 L460 130 L450 138 L450 142 L460 150 Z" fill={AMBER} />
      </g>
    </svg>
  );
}

/* ----------------------------------------------------------------------
 * 14. Hinterland waterfall — waterfall into a pool. (stretch)
 * -------------------------------------------------------------------- */
export function WaterfallScene({
  title = "Hinterland waterfall into a pool",
  ...rest
}: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="200" fill="#EAF4F1" />
      {/* Cliff */}
      <path
        d="M0 200 L120 100 L200 80 L240 80 L300 100 L360 200 L480 200 L480 360 L0 360 Z"
        fill={STROKE}
        opacity="0.4"
      />
      {/* Waterfall */}
      <rect x="200" y="80" width="80" height="160" fill={SEA} opacity="0.85" />
      {/* Waterfall lines */}
      <line x1="220" y1="80" x2="220" y2="240" stroke={WASH} strokeWidth="1" opacity="0.7" />
      <line x1="240" y1="80" x2="240" y2="240" stroke={WASH} strokeWidth="1" opacity="0.7" />
      <line x1="260" y1="80" x2="260" y2="240" stroke={WASH} strokeWidth="1" opacity="0.7" />
      {/* Pool */}
      <ellipse cx="240" cy="260" rx="120" ry="20" fill={SEA} />
      <ellipse cx="240" cy="258" rx="100" ry="14" fill={WASH} opacity="0.4" />
      {/* Mist */}
      <ellipse cx="240" cy="244" rx="60" ry="6" fill={WASH} opacity="0.6" />
      {/* Foreground rocks */}
      <ellipse cx="80" cy="320" rx="50" ry="14" fill={INK} opacity="0.6" />
      <ellipse cx="400" cy="320" rx="50" ry="14" fill={INK} opacity="0.6" />
    </svg>
  );
}

/* ----------------------------------------------------------------------
 * 15. Koala silhouette — on a eucalyptus branch. (stretch)
 * -------------------------------------------------------------------- */
export function KoalaScene({
  title = "Koala silhouette on a eucalyptus branch",
  ...rest
}: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg {...baseProps} aria-label={title} {...rest}>
      <title>{title}</title>
      <rect x="0" y="0" width="480" height="360" fill={WASH} />
      <rect x="0" y="0" width="480" height="220" fill="#EAF4F1" />
      {/* Tree trunk */}
      <rect x="220" y="100" width="40" height="220" fill={STROKE_DK} />
      <line x1="240" y1="100" x2="240" y2="320" stroke={INK} strokeWidth="1" />
      {/* Branches */}
      <path d="M240 160 L160 140 L100 145" stroke={STROKE_DK} strokeWidth="6" fill="none" />
      <path d="M240 200 L320 180 L380 185" stroke={STROKE_DK} strokeWidth="6" fill="none" />
      {/* Leaves on branches */}
      <g fill={STROKE} opacity="0.7">
        <ellipse cx="100" cy="140" rx="20" ry="8" />
        <ellipse cx="80" cy="155" rx="18" ry="7" />
        <ellipse cx="380" cy="180" rx="20" ry="8" />
        <ellipse cx="400" cy="195" rx="18" ry="7" />
      </g>
      {/* Koala silhouette */}
      <g transform="translate(140 100)" fill={INK}>
        <ellipse cx="0" cy="40" rx="22" ry="28" />
        <circle cx="-14" cy="20" r="10" />
        <circle cx="14" cy="20" r="10" />
        <circle cx="-12" cy="22" r="3" fill={WASH} />
        <circle cx="16" cy="22" r="3" fill={WASH} />
        {/* Arms gripping branch */}
        <ellipse cx="-10" cy="55" rx="6" ry="14" />
        <ellipse cx="10" cy="55" rx="6" ry="14" />
        <path d="M-12 25 Q-8 35 0 35" stroke={WASH} strokeWidth="1.5" fill="none" />
      </g>
      {/* AMBER dot — single warm accent, per the palette rule */}
      <circle cx="240" cy="60" r="3" fill={AMBER} />
    </svg>
  );
}

/* ----------------------------------------------------------------------
 * Scenes — barrel export for the `import { Scenes } from ...` pattern.
 * -------------------------------------------------------------------- */
export const Scenes = {
  SurferSilhouette: SurferSilhouetteScene,
  NoosaRiver: NoosaRiverScene,
  HastingsStreet: HastingsStreetScene,
  MarketStall: MarketStallScene,
  Sunset: SunsetScene,
  HeadlandOutline: HeadlandOutlineScene,
  PalmCluster: PalmClusterScene,
  FerryBoat: FerryBoatScene,
  FishingBoat: FishingBoatScene,
  BirdFlock: BirdFlockScene,
  BeachUmbrella: BeachUmbrellaScene,
  MapPin: MapPinScene,
  MarketTents: MarketTentsScene,
  Waterfall: WaterfallScene,
  Koala: KoalaScene,
} as const;

export type SceneName = keyof typeof Scenes;
