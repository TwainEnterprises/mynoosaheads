/**
 * MSN-3100 — Surf & Weather v2 design system (isolated module).
 *
 * Every component here is scoped to the .v2-root namespace and renders
 * only on /surf-and-weather. The rest of the site keeps using the
 * existing src/components/ui design system untouched.
 *
 * Design reference: www.peoplesreserve.com (quality/craft bar only — no
 * branding, copy, imagery or palette copied). Identity re-keyed to deep
 * marine navy + warm sun gold, with the existing sea-glass teal retained
 * for live-data states.
 */

export { V2Hero } from "./V2Hero";
export type { V2HeroProps } from "./V2Hero";

export { V2TrustRow } from "./V2TrustRow";
export type { V2TrustRowProps } from "./V2TrustRow";

export { V2LiveTiles } from "./V2LiveTiles";
export type { V2LiveTilesProps, V2LiveTileSpec } from "./V2LiveTiles";

export { V2Section, V2SectionHeading } from "./V2Section";
export type {
  V2SectionProps,
  V2SectionHeadingProps,
  V2SectionTone,
} from "./V2Section";

export { V2PointCards } from "./V2PointCards";
export type { V2PointCardsProps, V2PointCard } from "./V2PointCards";

export { V2SafetyCallout } from "./V2SafetyCallout";
export type { V2SafetyCalloutProps } from "./V2SafetyCallout";

export { V2Figure } from "./V2Figure";
export type { V2FigureProps } from "./V2Figure";

export { V2SourceRail, V2RelatedCard } from "./V2SourceRail";
export type { V2SourceRailProps } from "./V2SourceRail";
