/**
 * HeroPhoto — full-bleed category-page hero with caption overlay.
 *
 * Sprint 1.5 (MSN-2958 / TSK-2958-02): hero ~60vh with caption + credit.
 *
 * v5 (MSN-2959-V5-POLISH): added optional eyebrow + H1 overlay text
 * rendered *on the photo* (lower-left) per Albert's v5 runbook §3.3
 * (Hero overlay typography). Visitnoosa's signature pattern: the
 * editorial headline sits on the photo, not below it. The body H1
 * below the photo remains for screen readers (text-on-image is
 * decorative; the accessible name comes from the `<h1>` rendered by
 * the <Hero> component below the photo).
 *
 * Per Albert's spec §3.3 #15: the hero-overlay gradient was
 * strengthened (10→45→75% → 0→55→88%) so a 40-px white H1 reads
 * cleanly on bright photos. The headline sits on the photo for
 * editorial punch; the body H1 (below) carries the accessible name.
 */

import Image from "next/image";
import type { ReactNode } from "react";

export type HeroPhotoProps = {
  src: string;
  alt: string;
  credit: string;
  /** Caption shown on the photo (default = alt text). */
  caption?: string;
  /** Optional aspect ratio / height override. Defaults to ~60vh on
   * desktop and ~50vh on mobile (responsive). */
  height?: {
    mobile?: string; // tailwind height class, e.g. "h-[55vh]"
    desktop?: string; // tailwind height class, e.g. "md:h-[60vh]"
  };
  /** Tiny inline base64 placeholder (1×1 or 4×4 px). */
  blurDataURL?: string;
  /** v5 (MSN-2959-V5-POLISH): editorial eyebrow rendered above the H1
   * overlay text. Typical value: "All small areas, one guide" or the
   * category's navLabel. Optional — omit to render caption only. */
  eyebrow?: ReactNode;
  /** v5 (MSN-2959-V5-POLISH): editorial H1 rendered on the photo
   * (lower-left, above the caption). Optional — omit to render
   * caption only. */
  overlayTitle?: ReactNode;
  /** v5 (MSN-2959-V5-POLISH): use the stronger gradient
   * (0→55→88%) for photos with white-on-photo overlay text.
   * Defaults to true when overlayTitle is set; false otherwise. */
  overlayStrong?: boolean;
  /** Priority load (skip lazy) — defaults to true for hero. */
  priority?: boolean;
};

export function HeroPhoto({
  src,
  alt,
  credit,
  caption,
  height = { mobile: "h-[55vh]", desktop: "md:h-[60vh]" },
  blurDataURL,
  eyebrow,
  overlayTitle,
  overlayStrong,
  priority = true,
}: HeroPhotoProps) {
  // Default: use the strong gradient when an overlay title is set.
  const strong = overlayStrong ?? Boolean(overlayTitle);
  const overlayClass = strong ? "hero-overlay-strong" : "hero-overlay";
  return (
    <figure className="relative w-full">
      <div
        className={`relative w-full overflow-hidden bg-eucalyptus-900 ${height.mobile ?? "h-[55vh]"} ${height.desktop ?? "md:h-[60vh]"}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
          placeholder={blurDataURL ? "blur" : "empty"}
          blurDataURL={blurDataURL}
          priority={priority}
        />
        {/* Overlay gradient (light or strong). */}
        <div className={`absolute inset-0 pointer-events-none ${overlayClass}`} aria-hidden="true" />
        {/* Caption + credit + (optional) overlay title on the photo. */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-10 pointer-events-auto">
            {overlayTitle ? (
              <div className="max-w-3xl">
                {eyebrow ? (
                  <p
                    className="font-body text-xs uppercase tracking-[0.18em] font-semibold text-paper-200 mb-2"
                  >
                    {eyebrow}
                  </p>
                ) : null}
                <p className="font-display text-paper-50 text-display-md md:text-display-lg text-balance">
                  {overlayTitle}
                </p>
                <p className="mt-3 text-caption text-paper-100">{credit}</p>
                {caption ? (
                  <p className="mt-1 text-caption text-paper-200/80 max-w-2xl">{caption}</p>
                ) : null}
              </div>
            ) : (
              <>
                <p className="font-display text-paper-50 text-display-sm md:text-display-md text-balance max-w-3xl">
                  {caption ?? alt}
                </p>
                <p className="mt-2 text-caption text-paper-100">{credit}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </figure>
  );
}