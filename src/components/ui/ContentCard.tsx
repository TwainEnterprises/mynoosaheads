"use client";

/**
 * ContentCard — shared card primitive for the v6 homepage sections.
 *
 * Per Albert's v6 spec §4.5: every content card across S3, S4, S5, S7,
 * S9, S11, S13 follows the same image-treatment spec. ContentCard is
 * that shared primitive, with the hover micro-interactions (card lift,
 * image scale, link underline) wired in.
 *
 * Props:
 *   - image / imageAlt / imageAspect (3/2 | 4/3 | 16/9 | 1/1)
 *   - eyebrow / title / body (any ReactNode)
 *   - cta (link target + label)
 *   - meta (small secondary line; e.g. price-from, duration)
 *   - disclosure (optional ACCC pill)
 *   - tag (optional area / category tag, e.g. "Hastings Street")
 *   - imagePriority (for above-the-fold cards)
 *
 * The component is a client component so the hover micro-interactions
 * render consistently. The image uses next/image via a regular <img>
 * wrapper to keep the API simple; for next/image benefits, pass
 * `useNextImage` and the component will use the next/image element.
 *
 * v6 design tokens (globals.css):
 *   - .hover-lift         — card lift on hover
 *   - .hover-scale-img    — child image scale 1.0 → 1.05
 *   - .hover-underline    — link underline reveal
 */

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export type ContentCardAspect = "3/2" | "4/3" | "16/9" | "1/1";

const ASPECT_CLASS: Record<ContentCardAspect, string> = {
  "3/2": "aspect-[3/2]",
  "4/3": "aspect-[4/3]",
  "16/9": "aspect-video",
  "1/1": "aspect-square",
};

export type ContentCardProps = {
  image: string;
  imageAlt: string;
  /** Optional image credit (renders as <figcaption> on hover). */
  imageCredit?: string;
  imageAspect?: ContentCardAspect;
  /** Render the image with `loading="eager"` (use for above-the-fold). */
  imagePriority?: boolean;
  eyebrow?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  /** Small secondary line; e.g. "from $245 / night" or "2 hrs". */
  meta?: ReactNode;
  /** Optional area / category tag rendered as a chip. */
  tag?: ReactNode;
  /** ACCC disclosure pill. */
  disclosure?: ReactNode;
  /** CTA target. When provided, the whole card is clickable. */
  cta?: { label: string; href: string };
  /** When true, render as an <article> (default) or <li> (for rails). */
  as?: "article" | "li";
  /** Optional className for the outer wrapper. */
  className?: string;
};

export function ContentCard({
  image,
  imageAlt,
  imageCredit,
  imageAspect = "3/2",
  imagePriority = false,
  eyebrow,
  title,
  body,
  meta,
  tag,
  disclosure,
  cta,
  as: Tag = "article",
  className = "",
}: ContentCardProps) {
  const wrapperBase = [
    "group relative flex flex-col overflow-hidden rounded-xl border border-paper-200 bg-paper-50 shadow-sm",
    "hover-lift focus-within:ring-2 focus-within:ring-ocean-500",
    className,
  ].join(" ");

  const inner = (
    <>
      <div className={`hover-scale-img ${ASPECT_CLASS[imageAspect]} relative w-full overflow-hidden bg-paper-100`}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading={imagePriority ? "eager" : "lazy"}
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        {title ? (
          <h3 className="mt-1 font-display text-headline-lg text-ink-900 text-balance">
            {title}
          </h3>
        ) : null}
        {body ? (
          <p className="mt-2 text-body-sm text-ink-800 text-pretty flex-1">
            {body}
          </p>
        ) : null}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {tag ? <span className="chip-ocean">{tag}</span> : null}
          {meta ? (
            <span className="text-caption text-ink-700">{meta}</span>
          ) : null}
          {disclosure ? (
            <span className="pill-disclosure">{disclosure}</span>
          ) : null}
        </div>
        {cta ? (
          <div className="mt-4">
            <span className="link text-ocean-700 text-body-sm font-medium hover-underline">
              {cta.label}
            </span>
          </div>
        ) : null}
      </div>
      {imageCredit ? (
        <figcaption className="absolute bottom-2 right-2 rounded-pill bg-ink-900/70 px-2 py-0.5 text-[10px] text-paper-100 opacity-0 transition-opacity duration-base ease-out group-hover:opacity-100">
          {imageCredit}
        </figcaption>
      ) : null}
    </>
  );

  if (cta) {
    return (
      <Tag className={wrapperBase}>
        <Link
          href={cta.href}
          aria-label={
            typeof title === "string" ? `${title} — ${cta.label}` : cta.label
          }
          className="absolute inset-0 z-10 focus:outline-none"
        >
          <span className="sr-only">{cta.label}</span>
        </Link>
        <div className="pointer-events-none relative z-0 flex h-full flex-col">
          {inner}
        </div>
      </Tag>
    );
  }

  return <Tag className={wrapperBase}>{inner}</Tag>;
}
