/**
 * Icon set — custom line icons, 1.5px stroke, 24px nominal.
 *
 * Per Albert's design brief: ~14 icons (surf wave, fish, boat, compass,
 * eucalyptus sprig, park gate, sun, moon, tide arrow, wind arrow, umbrella,
 * BBQ, camera, alert). Two weights: --ink default, --accent active. No emoji.
 *
 * Implementation notes:
 *   - All icons are pure inline SVG components (no external dep).
 *   - `currentColor` is used for the stroke so the parent's `text-*` colour
 *     class controls appearance.
 *   - `aria-hidden` is on by default; consumers should pass an aria-label
 *     on the parent if the icon carries meaning.
 *   - Each icon takes optional `size` (px) and `className` props.
 */

import type { SVGProps } from "react";

export type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  size?: number;
  strokeWidth?: number;
  title?: string;
};

const baseProps = (size: number, strokeWidth: number, title?: string) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  role: title ? "img" : "presentation",
  "aria-label": title,
  "aria-hidden": title ? undefined : true,
});

export function WaveIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M2 14c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0 3-1.5 4.5 0" />
      <path d="M2 18c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0 3-1.5 4.5 0" />
    </svg>
  );
}

export function FishIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M3 12c3-4 8-5 13-3 2 .8 3 1.5 5 3-2 1.5-3 2.2-5 3-5 2-10 1-13-3z" />
      <circle cx="16" cy="11" r="0.8" fill="currentColor" />
      <path d="M6 12l-3-2v4z" />
    </svg>
  );
}

export function BoatIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M3 17l1.5 3h15L21 17" />
      <path d="M5 17l1-8h12l1 8" />
      <path d="M12 4v9" />
      <path d="M9 7h6" />
    </svg>
  );
}

export function CompassIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <circle cx="12" cy="12" r="9" />
      <path d="M14.5 9.5l-1.8 4.2-4.2 1.8 1.8-4.2z" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="0.5" fill="currentColor" />
    </svg>
  );
}

export function EucalyptusIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M12 21V8" />
      <path d="M12 14c-3 0-5-2-5-5 3 0 5 2 5 5z" />
      <path d="M12 11c3 0 5-2 5-5-3 0-5 2-5 5z" />
      <path d="M12 18c-2 0-4-1.5-4-4 2 0 4 1.5 4 4z" />
      <path d="M12 18c2 0 4-1.5 4-4-2 0-4 1.5-4 4z" />
    </svg>
  );
}

export function ParkGateIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M4 21V8l8-3 8 3v13" />
      <path d="M4 14h16" />
      <path d="M9 14v7M15 14v7" />
    </svg>
  );
}

export function SunIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function MoonIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M21 13.5A9 9 0 1 1 10.5 3a7 7 0 0 0 10.5 10.5z" />
    </svg>
  );
}

export function TideArrowIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M3 8c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      <path d="M3 14c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      <path d="M18 5l3-1-1 3" />
    </svg>
  );
}

export function WindArrowIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M3 8h12a3 3 0 1 0-3-3" />
      <path d="M3 12h17a3 3 0 1 1-3 3" />
      <path d="M3 16h9" />
    </svg>
  );
}

export function UmbrellaIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M12 2a9 9 0 0 0-9 9h18a9 9 0 0 0-9-9z" />
      <path d="M12 11v9a2 2 0 0 1-4 0" />
    </svg>
  );
}

export function BbqIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M5 16h14l-1 4H6z" />
      <path d="M7 16c0-2 1-3 1-5M12 16c0-2 1-3 1-5M17 16c0-2 1-3 1-5" />
      <path d="M10 4l-2 2M14 4l2 2" />
    </svg>
  );
}

export function CameraIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7l2-3h4l2 3" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  );
}

export function AlertIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M12 3l10 18H2z" />
      <path d="M12 10v5" />
      <circle cx="12" cy="18" r="0.6" fill="currentColor" />
    </svg>
  );
}

/** Simple chevron-right, used in NavBar + CTAs. */
export function ChevronRightIcon({
  size = 24,
  strokeWidth = 1.75,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

/** Hamburger icon for mobile nav. */
export function MenuIcon({
  size = 24,
  strokeWidth = 1.75,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

/** Close icon for mobile nav. */
export function CloseIcon({
  size = 24,
  strokeWidth = 1.75,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

/** Search icon (used in nav). */
export function SearchIcon({
  size = 24,
  strokeWidth = 1.75,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.5-4.5" />
    </svg>
  );
}

/** Map-pin icon (used in nav + cards). */
export function PinIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

/** Calendar icon. */
export function CalendarIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </svg>
  );
}

/** External-link arrow. */
export function ExternalIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M14 4h6v6" />
      <path d="M10 14L20 4" />
      <path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

/* ================================================================
 * v6 (MSN-2960-V6) — additional icons for the new sections.
 *
 * Per Albert's v6 spec §5.2 the full set is 48 icons; v6.0 P0 ships
 * the new ones needed for S3–S5, S9, S10 + mega-menu archetypes.
 * Remaining icons land in v6.1 per the P1 backlog.
 * ================================================================ */

/** Car — for getting-here (drive modes) + stay (parking). */
export function CarIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M5 15l1.5-5a2 2 0 0 1 1.9-1.4h7.2a2 2 0 0 1 1.9 1.4L19 15" />
      <path d="M3 15h18v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1H7v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
      <circle cx="7.5" cy="17" r="1" fill="currentColor" />
      <circle cx="16.5" cy="17" r="1" fill="currentColor" />
    </svg>
  );
}

/** Plane — for getting-here (Sunshine Coast Airport). */
export function PlaneIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M3 14l8-2 4-9 2 1-2 8 6 2-1 2-7-1-3 6h-2l1-6-5-1z" />
    </svg>
  );
}

/** Bus — for getting-here (Premier Motorway). */
export function BusIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <rect x="4" y="4" width="16" height="13" rx="2" />
      <path d="M4 11h16" />
      <path d="M8 4v-2M16 4v-2" />
      <circle cx="8" cy="20" r="1.5" />
      <circle cx="16" cy="20" r="1.5" />
      <path d="M4 17h16" />
    </svg>
  );
}

/** Anchor — for boats + ferry. */
export function AnchorIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <circle cx="12" cy="5" r="1.5" />
      <path d="M12 6v14" />
      <path d="M8 10h8" />
      <path d="M5 14a7 7 0 0 0 14 0" />
    </svg>
  );
}

/** Map (folded) — for getting-here + plan hub. */
export function MapIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z" />
      <path d="M9 4v14" />
      <path d="M15 6v14" />
    </svg>
  );
}

/** Bed — for stay mega-menu archetype. */
export function BedIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M3 18v-7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h10v6" />
      <path d="M3 14h18" />
      <path d="M3 18v2" />
      <path d="M21 18v2" />
      <circle cx="7" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

/** House — for stay mega-menu (holiday houses). */
export function HouseIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />
    </svg>
  );
}

/** Building — for stay mega-menu (hotels / apartments). */
export function BuildingIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M5 8h14M5 13h14M5 18h14" />
      <path d="M9 5h2M9 10h2M9 15h2M13 5h2M13 10h2M13 15h2" />
    </svg>
  );
}

/** Wifi — for stay amenities. */
export function WifiIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M2 9a16 16 0 0 1 20 0" />
      <path d="M5 12.5a11 11 0 0 1 14 0" />
      <path d="M8.5 16a6 6 0 0 1 7 0" />
      <circle cx="12" cy="19" r="1" fill="currentColor" />
    </svg>
  );
}

/** Key — for stay mega-menu (check-in). */
export function KeyIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <circle cx="8" cy="15" r="4" />
      <path d="M10.8 12.2L21 2" />
      <path d="M17 6l3 3" />
      <path d="M14 9l2 2" />
    </svg>
  );
}

/** Calendar — for plan hub (school holidays). */
export function CalendarEventIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <path d="M8 3v4M16 3v4" />
      <rect x="6" y="13" width="3" height="3" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Phone — for plan hub (emergencies). */
export function PhoneIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M5 4h4l2 5-2 1a11 11 0 0 0 5 5l1-2 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  );
}

/** Accessibility — for plan hub. */
export function WheelchairIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <circle cx="10" cy="5" r="1.5" fill="currentColor" />
      <path d="M12 8v5h5l2 6" />
      <path d="M12 13a4 4 0 1 0 4 4" />
    </svg>
  );
}

/** Pets (paw) — for pet-friendly archetype. */
export function PetsIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <circle cx="7" cy="9" r="1.5" fill="currentColor" />
      <circle cx="12" cy="6" r="1.5" fill="currentColor" />
      <circle cx="17" cy="9" r="1.5" fill="currentColor" />
      <path d="M10 14a4 4 0 0 0-4 3 2 2 0 0 0 2 2 2 2 0 0 0 2-2 4 4 0 0 0 4-3 2 2 0 0 0-2-2 2 2 0 0 0-2 2z" />
    </svg>
  );
}

/** Family (people) — for family archetype. */
export function FamilyIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <circle cx="8" cy="7" r="2" />
      <path d="M4 19v-2a4 4 0 0 1 8 0v2" />
      <circle cx="16" cy="9" r="1.5" />
      <path d="M14 19v-1.5a3 3 0 0 1 5-2.3" />
      <circle cx="20" cy="6" r="1.2" />
    </svg>
  );
}

/** Mountain — for hinterland archetype. */
export function MountainIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M3 19l5-9 4 6 3-4 6 7z" />
      <circle cx="17" cy="6" r="2" />
    </svg>
  );
}

/** Question — for FAQ. */
export function QuestionIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 9a3 3 0 1 1 4.5 2.6c-1 .5-1.5 1-1.5 2.4" />
      <circle cx="12" cy="17" r="0.6" fill="currentColor" />
    </svg>
  );
}

/* ================================================================
 * v6.1 (MSN-2961-V6.1) — additional icons for the P1 sections.
 *
 * Per Albert's v6 spec §5.2 the full set is 48 icons. v6.0 P0
 * shipped 38. v6.1 P1 adds the 10 needed for S7 (eat & drink),
 * S8 (noosa right now), S13 (what's on), S15 (FAQ) — the 8 area
 * icons in §5.2 are the remaining 10 of the 48 budget; this build
 * ships the high-leverage ones and the rest are follow-on.
 * ================================================================ */

/** Fork-knife — for S7 (eat & drink). */
export function ForkKnifeIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M7 3v8a2 2 0 0 0 2 2v8" />
      <path d="M9 3v6" />
      <path d="M17 3c-1.5 1.5-2 3-2 5s.5 3 2 3v10" />
    </svg>
  );
}

/** Cup / mug — for S7 (cafés, brunch). */
export function CupIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M5 9h12v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z" />
      <path d="M17 11h2a2 2 0 0 1 0 4h-2" />
      <path d="M8 5c0 1 1 1 1 2s-1 1-1 2" />
      <path d="M12 5c0 1 1 1 1 2s-1 1-1 2" />
    </svg>
  );
}

/** Music note — for S13 (live music). */
export function MusicIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

/** Market stall / awning — for S13 (markets). */
export function MarketIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M3 9l2-5h14l2 5" />
      <path d="M3 9h18" />
      <path d="M5 9v11M19 9v11M9 9v11M15 9v11" />
      <path d="M3 9c0 1.5 1 2 2 2s2-.5 2-2" />
      <path d="M7 9c0 1.5 1 2 2 2s2-.5 2-2" />
      <path d="M11 9c0 1.5 1 2 2 2s2-.5 2-2" />
      <path d="M15 9c0 1.5 1 2 2 2s2-.5 2-2" />
    </svg>
  );
}

/** Sparkle / festival — for S13 (festivals). */
export function SparkleIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z" />
      <path d="M19 16l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" />
    </svg>
  );
}

/** Image / art frame — for S13 (exhibitions). */
export function FrameIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="M3 16l4-4 3 3 4-5 7 6" />
      <circle cx="9" cy="9" r="1" fill="currentColor" />
    </svg>
  );
}

/** Heart hands / community — for S13 (community events). */
export function CommunityIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <circle cx="9" cy="8" r="2" />
      <circle cx="15" cy="8" r="2" />
      <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5" />
      <path d="M11 19c0-3 2.7-5 6-5s4 2 4 5" />
    </svg>
  );
}

/** Tent — for camping / hinterland. */
export function TentIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M3 20L12 4l9 16" />
      <path d="M12 4v16" />
      <path d="M8 20h8" />
    </svg>
  );
}

/** Tree — for Noosa National Park scenes. */
export function TreeIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M12 3l-4 6h2l-3 4h3l-3 5h10l-3-5h3l-3-4h2z" />
      <path d="M12 18v3" />
    </svg>
  );
}

/** Headland — for the noosa right now rail. */
export function HeadlandIcon({
  size = 24,
  strokeWidth = 1.5,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M3 18c2-3 4-3 6 0s4 3 6 0 4-3 6 0" />
      <path d="M6 14l3-5 4 3 3-4 3 5" />
      <circle cx="17" cy="6" r="2" />
    </svg>
  );
}

/** Chevron-down — for the FAQ chevron alt + accordions. */
export function ChevronDownIcon({
  size = 24,
  strokeWidth = 1.75,
  title,
  ...rest
}: IconProps) {
  return (
    <svg {...baseProps(size, strokeWidth, title)} {...rest}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

/**
 * IconRegistry — single import surface for the style guide.
 * Keeps `import { Icons } from "@/components/ui/Icon"` working as a bag.
 *
 * v6 additions: Car, Plane, Bus, Anchor, Map, Bed, House, Building, Wifi,
 * Key, CalendarEvent, Phone, Wheelchair, Pets, Family, Mountain, Question.
 */
export const Icons = {
  Wave: WaveIcon,
  Fish: FishIcon,
  Boat: BoatIcon,
  Compass: CompassIcon,
  Eucalyptus: EucalyptusIcon,
  ParkGate: ParkGateIcon,
  Sun: SunIcon,
  Moon: MoonIcon,
  TideArrow: TideArrowIcon,
  WindArrow: WindArrowIcon,
  Umbrella: UmbrellaIcon,
  Bbq: BbqIcon,
  Camera: CameraIcon,
  Alert: AlertIcon,
  ChevronRight: ChevronRightIcon,
  Menu: MenuIcon,
  Close: CloseIcon,
  Search: SearchIcon,
  Pin: PinIcon,
  Calendar: CalendarIcon,
  External: ExternalIcon,
  // v6 additions
  Car: CarIcon,
  Plane: PlaneIcon,
  Bus: BusIcon,
  Anchor: AnchorIcon,
  Map: MapIcon,
  Bed: BedIcon,
  House: HouseIcon,
  Building: BuildingIcon,
  Wifi: WifiIcon,
  Key: KeyIcon,
  CalendarEvent: CalendarEventIcon,
  Phone: PhoneIcon,
  Wheelchair: WheelchairIcon,
  Pets: PetsIcon,
  Family: FamilyIcon,
  Mountain: MountainIcon,
  Question: QuestionIcon,
  // v6.1 P1 additions
  ForkKnife: ForkKnifeIcon,
  Cup: CupIcon,
  Music: MusicIcon,
  Market: MarketIcon,
  Sparkle: SparkleIcon,
  Frame: FrameIcon,
  Community: CommunityIcon,
  Tent: TentIcon,
  Tree: TreeIcon,
  Headland: HeadlandIcon,
  ChevronDown: ChevronDownIcon,
} as const;

export type IconName = keyof typeof Icons;
