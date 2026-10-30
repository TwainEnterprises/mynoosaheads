/**
 * V2Hero — full-bleed dark hero for the Surf & Weather v2 page.
 *
 * MSN-3100. Structure borrowed from the quality bar (peoplesreserve.com):
 * photo + navy gradient scrim, oversized two-tone display headline, an
 * eyebrow chip, a one-line subhead and two pill CTAs. Nothing is copied
 * from the reference site — the palette, type and imagery are Noosa's.
 *
 * The page's single <h1> lives here and nowhere else.
 */

import Image from "next/image";
import type { ReactNode } from "react";

export type V2HeroProps = {
  imageSrc: string;
  imageAlt: string;
  /** Small uppercase chip above the headline (the live-source eyebrow). */
  eyebrow: ReactNode;
  /** First line of the headline. */
  titleLine: string;
  /** Second line of the headline — rendered in the gold accent colour. */
  titleLineAccent: string;
  subtitle: ReactNode;
  flourish?: ReactNode;
  /** Photo caption + Wikimedia credit line (attribution is mandatory). */
  credit: ReactNode;
  /** Two pill CTAs. */
  actions: ReactNode;
};

export function V2Hero({
  imageSrc,
  imageAlt,
  eyebrow,
  titleLine,
  titleLineAccent,
  subtitle,
  flourish,
  credit,
  actions,
}: V2HeroProps) {
  return (
    <section className="v2-hero" aria-label="Surf and weather introduction">
      <div className="v2-hero__media">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="v2-hero__img"
        />
      </div>
      <div className="v2-hero__scrim" aria-hidden="true" />
      <div className="v2-container v2-hero__inner">
        <p className="v2-eyebrow-pill v2-eyebrow-pill--on-dark">
          <span className="v2-dot" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1 className="v2-hero__title">
          <span className="v2-hero__title-line">{titleLine}</span>
          <span className="v2-hero__title-line v2-hero__title-gold">
            {titleLineAccent}
          </span>
        </h1>
        <p className="v2-hero__sub">{subtitle}</p>
        {flourish ? <p className="v2-hero__flourish">{flourish}</p> : null}
        <div className="v2-hero__actions">{actions}</div>
        <p className="v2-hero__credit">{credit}</p>
      </div>
      <span className="v2-hero__scroll" aria-hidden="true" />
    </section>
  );
}
