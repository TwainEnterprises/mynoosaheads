/**
 * LocationPhoto — unified image renderer for the v6.1.1 photo
 * integration.
 *
 * Handles two photo kinds declared in src/data/photos.ts:
 *
 *   - "commons" — a remote Wikimedia Commons photo (next/image with
 *     the upload.wikimedia.org URL, optimizer-on).
 *   - "svg"     — a bespoke SVG illustration fallback for locations
 *     with no open-licence photo (Sunshine Beach, the named eat &
 *     drink venues, pet-friendly / family / accessible). The SVG is
 *     inlined into the DOM via the V6P1Fallbacks component map.
 *
 * Why a wrapper rather than calling next/image directly at each
 * consumer: the four ESLint-flagged <img> call sites
 * (ContentCard, Lightbox, MegaMenu, page.tsx) all share the same
 * discriminated union. Threading a `kind` switch through each call
 * site would duplicate the code; this wrapper keeps the
 * consumer-facing surface minimal (a single <LocationPhoto photo={p}
 * />) and consolidates the image-treatment policy in one place.
 *
 * v6.1.1 release note: hot-linking Wikimedia Commons (rather than
 * mirroring the 42 files to /public/photos/) is intentional. The
 * v2 pattern of Wikimedia hotlinks was criticised in v5 for
 * producing a "small set of Kgbo/dronepicr beach shots"; v6.1.1
 * uses 42 verified location-specific photos across the shire, so
 * the photographic diversity concern doesn't apply. The
 * upload.wikimedia.org pattern is already whitelisted in
 * next.config.mjs.
 *
 * Performance: next/image with `sizes` per the layout context
 * (hero = 100vw, grid card = 33vw / 50vw, inline = full). SVGs
 * inline directly into the DOM (no HTTP round-trip) and are
 * therefore optimal.
 */

import Image from "next/image";
import type { CSSProperties } from "react";
import type { LocationPhoto as LocationPhotoData } from "@/data/photos";
import { FALLBACK_SVGS } from "@/components/illustrations/V6P1Fallbacks";

export type LocationPhotoProps = {
  photo: LocationPhotoData;
  /** next/image `sizes` attribute. */
  sizes?: string;
  /** next/image `priority` flag — set true for above-the-fold images. */
  priority?: boolean;
  /** Optional className applied to the rendered element. */
  className?: string;
  /** Optional object-position (used for crops with a single photo,
   * e.g. Peregian Beach hero + inline via the same file with
   * different crops). */
  objectPosition?: string;
  /** Optional object-fit (default: "cover"). */
  objectFit?: CSSProperties["objectFit"];
};

/**
 * Default `sizes` per layout role. Consumers should override when
 * the layout demands a different breakpoint split.
 */
export const DEFAULT_SIZES = {
  hero: "100vw",
  inline: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  card: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  avatar: "48px",
} as const;

export function LocationPhoto({
  photo,
  sizes,
  priority,
  className,
  objectPosition,
  objectFit = "cover",
}: LocationPhotoProps) {
  if (photo.kind === "svg") {
    const SvgComponent = FALLBACK_SVGS[photo.svgKey];
    return (
      <div
        className={className}
        style={
          objectPosition
            ? { objectPosition, objectFit }
            : { objectFit }
        }
        role="img"
        aria-label={photo.altText}
      >
        <SvgComponent
          title={photo.caption}
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <Image
      src={photo.url}
      alt={photo.altText}
      width={photo.width}
      height={photo.height}
      sizes={sizes}
      priority={priority}
      className={className}
      style={{
        objectFit,
        ...(objectPosition ? { objectPosition } : {}),
      }}
    />
  );
}
