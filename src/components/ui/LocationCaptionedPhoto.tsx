/**
 * LocationCaptionedPhoto — figcaption'd image renderer for the
 * v6.1.1 photo integration. Like CaptionedPhoto, but takes a
 * `photo: LocationPhoto` (the discriminated union from
 * `src/data/photos.ts`) so the same component handles both
 * Wikimedia Commons URLs (via next/image) and bespoke SVG
 * illustrations (via the V6P1Fallbacks map).
 *
 * Used by CategoryPage for inline body photos.
 */

import Image from "next/image";
import { FALLBACK_SVGS } from "@/components/illustrations/V6P1Fallbacks";
import type { LocationPhoto } from "@/data/photos";

export type LocationCaptionedPhotoProps = {
  photo: LocationPhoto;
  /** Default 1280 wide. Used for the next/image width attribute. */
  width?: number;
  /** next/image `sizes` attribute. */
  sizes?: string;
  /** Image priority (above-the-fold LCP). Default false. */
  priority?: boolean;
};

function creditFor(photo: LocationPhoto): string {
  if (photo.kind === "svg") {
    return `Illustration: ${photo.author} · ${photo.licence}`;
  }
  return `Photo: ${photo.author} / Wikimedia Commons · ${photo.licence}`;
}

export function LocationCaptionedPhoto({
  photo,
  width = 1280,
  sizes = "(min-width: 1024px) 720px, 100vw",
  priority = false,
}: LocationCaptionedPhotoProps) {
  const credit = creditFor(photo);

  if (photo.kind === "svg") {
    const SvgComponent = FALLBACK_SVGS[photo.svgKey];
    return (
      <figure className="my-8 md:my-10">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-paper-200 bg-paper-100">
          <SvgComponent
            title={photo.caption}
            className="h-full w-full"
          />
        </div>
        <figcaption className="mt-3 flex flex-col gap-1 text-caption text-ink-600 sm:flex-row sm:items-baseline sm:justify-between">
          <span className="font-medium text-ink-700">{photo.caption}</span>
          <span className="text-ink-600">{credit}</span>
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="my-8 md:my-10">
      <div className="relative w-full overflow-hidden rounded-2xl border border-paper-200 bg-paper-100">
        <Image
          src={photo.url}
          alt={photo.altText}
          width={width}
          height={Math.round((width * photo.height) / photo.width)}
          sizes={sizes}
          className="w-full h-auto"
          priority={priority}
        />
      </div>
      <figcaption className="mt-3 flex flex-col gap-1 text-caption text-ink-600 sm:flex-row sm:items-baseline sm:justify-between">
        <span className="font-medium text-ink-700">{photo.caption}</span>
        <span className="text-ink-600">{credit}</span>
      </figcaption>
    </figure>
  );
}
