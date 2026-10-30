/**
 * V2Figure — captioned, credited photograph.
 *
 * MSN-3100. Every image on the page keeps its caption and its Wikimedia
 * Commons attribution line (CC BY-SA / CC BY require the credit). Alt text
 * is the caption.
 */

import Image from "next/image";

export type V2FigureProps = {
  src: string;
  /** Caption text — doubles as the alt text. */
  caption: string;
  /** Attribution line, e.g. "Photo: Kgbo / Wikimedia Commons · CC BY-SA 4.0". */
  credit: string;
  /** Optional layout modifier: "inset" | "offset". */
  variant?: "inset" | "offset";
  sizes?: string;
  priority?: boolean;
};

export function V2Figure({
  src,
  caption,
  credit,
  variant,
  sizes = "(min-width: 1024px) 720px, 100vw",
  priority = false,
}: V2FigureProps) {
  const cls = variant ? "v2-figure v2-figure--" + variant : "v2-figure";
  return (
    <figure className={cls}>
      <div className="v2-figure__frame">
        <Image
          src={src}
          alt={caption}
          width={1280}
          height={720}
          sizes={sizes}
          className="v2-figure__img"
          priority={priority}
        />
      </div>
      <figcaption className="v2-figure__caption">
        <span className="v2-figure__caption-text">{caption}</span>
        <span className="v2-figure__credit">{credit}</span>
      </figcaption>
    </figure>
  );
}
