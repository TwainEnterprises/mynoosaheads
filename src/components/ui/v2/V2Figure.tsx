/**
 * V2Figure — captioned, credited photograph.
 *
 * MSN-3100. Every image on the page keeps its caption and its Wikimedia
 * Commons attribution line (CC BY-SA / CC BY require the credit). Alt text
 * is the caption.
 *
 * MSN-3100 rework (Victor QA round 1, F1): the component used to hard-code
 * a 1280x720 intrinsic box for every photograph. The four surf images have
 * three different ratios, so the reserved box was wrong: the page shifted
 * 102-419 px when a lazy image arrived, and a full-page capture that never
 * scrolled showed a flat navy block instead of the photograph.
 *
 * The intrinsic width/height are now supplied per photograph from
 * photoDimensions.ts (measured from the real files), so the reserved box
 * matches the loaded image exactly and there is zero shift.
 */

import Image from "next/image";

export type V2FigureProps = {
  src: string;
  /** True intrinsic width in pixels. */
  width: number;
  /** True intrinsic height in pixels. */
  height: number;
  /** Caption text — doubles as the alt text. */
  caption: string;
  /** Attribution line, e.g. "Photo: Kgbo / Wikimedia Commons · CC BY-SA 4.0". */
  credit: string;
  /** Optional layout modifier: "inset" | "offset". */
  variant?: "inset" | "offset";
  sizes?: string;
  /** Load immediately instead of lazily. There are only four figures. */
  eager?: boolean;
  /** Above-the-fold image priority (also implies eager loading). */
  priority?: boolean;
};

export function V2Figure({
  src,
  width,
  height,
  caption,
  credit,
  variant,
  sizes = "(min-width: 1024px) 560px, (min-width: 640px) 90vw, 100vw",
  eager = false,
  priority = false,
}: V2FigureProps) {
  const cls = variant ? "v2-figure v2-figure--" + variant : "v2-figure";
  return (
    <figure className={cls}>
      <div className="v2-figure__frame">
        <Image
          src={src}
          alt={caption}
          width={width}
          height={height}
          sizes={sizes}
          className="v2-figure__img"
          // Pin the box to the SOURCE ratio. The Next.js optimiser serves
          // integer-rounded dimensions (e.g. 559x419 for a 1280x959 source),
          // so without this the intrinsic ratio shifts by ~0.1% on load.
          // An explicit aspect-ratio wins over the intrinsic one, so the
          // reserved box and the loaded box are bit-identical.
          style={{ aspectRatio: width + " / " + height }}
          priority={priority}
          loading={eager ? "eager" : undefined}
        />
      </div>
      <figcaption className="v2-figure__caption">
        <span className="v2-figure__caption-text">{caption}</span>
        <span className="v2-figure__credit">{credit}</span>
      </figcaption>
    </figure>
  );
}
