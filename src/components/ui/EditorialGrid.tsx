import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import type { LocationPhoto } from "@/data/photos";
import { LocationPhoto as LocationPhotoView } from "@/components/ui/LocationPhoto";

/**
 * EditorialGrid — v6.3 (MSN-2964) Phase B.
 *
 * Editorial 2×2 / asymmetric grid treatment for the homepage rails,
 * matching visitnoosa.com.au's visual register (hero strip + 2-column
 * main + 1-column accent). Replaces v6.2's uniform 3-column card layout
 * with an asymmetric layout that reads as "editorial" rather than
 * "product grid".
 *
 * Three layouts:
 *   - "feature"    : 1 hero tile (2× width) + 1 standard tile (1×)
 *                    (visitnoosa homepage S3 pattern)
 *   - "asymmetric" : 3-up on lg with 1st card 2-row span, others 1-row
 *   - "stagger"    : 4-up on lg with alternating image heights
 *
 * Accessibility:
 *   - 1:1 visual-to-DOM: every visible card is a single <article>
 *   - No orphan decorative elements
 *   - Alt text preserved from the LocationPhoto wrapper
 *   - Keyboard navigable (links are real <Link> components)
 */

export type EditorialGridItem = {
  /** Stable id (used as React key + scroll-anchor). */
  id: string;
  /** Card heading. */
  title: string;
  /** Short tagline shown under the title (1 line, ≤80 chars). */
  tagline: string;
  /** Destination href (real route, internal). */
  href: string;
  /** CTA label. Default: "Read more →". */
  ctaLabel?: string;
  /** Eyebrow above the title (e.g. "Hastings Street"). */
  eyebrow?: string;
  /** Photo source (LocationPhoto wrapper accepts CommonsPhoto | FallbackSvgPhoto). */
  photo: LocationPhoto;
  /** "primary" cards render larger; "secondary" cards smaller. */
  size?: "primary" | "secondary" | "accent";
};

export type EditorialGridLayout = "feature" | "asymmetric" | "stagger";

export type EditorialGridProps = {
  /** Section heading — appears above the grid. */
  heading: string;
  /** Optional eyebrow (e.g. "FEATURED AREAS"). */
  eyebrow?: string;
  /** Optional short intro paragraph. */
  intro?: string;
  /** Items to render. 4-6 recommended for feature, 5-6 for asymmetric, 6-8 for stagger. */
  items: EditorialGridItem[];
  /** Grid variant. Default "feature". */
  layout?: EditorialGridLayout;
  /** Optional href for the section-level "See all →" CTA. */
  seeAllHref?: string;
  /** Optional label for the section-level CTA. Default "See all →". */
  seeAllLabel?: string;
};

/**
 * Renders one card. The card is a single <article> with a real <Link>
 * so the entire card is keyboard-focusable.
 */
function GridCard({
  item,
  variant,
}: {
  item: EditorialGridItem;
  variant: "hero" | "tall" | "wide" | "standard" | "accent";
}) {
  const isHero = variant === "hero";
  const isTall = variant === "tall";
  const isWide = variant === "wide";
  const isAccent = variant === "accent";

  // Aspect ratio per variant.
  const aspectClass =
    isHero ? "aspect-[16/10]"
    : isTall ? "aspect-[3/4]"
    : isWide ? "aspect-[16/9]"
    : isAccent ? "aspect-[4/5]"
    : "aspect-[4/3]";

  return (
    <article
      className={[
        "group relative flex flex-col overflow-hidden rounded-2xl border border-paper-200 bg-surface-elevated",
        "hover-lift transition-shadow duration-base ease-out-brand",
      ].join(" ")}
    >
      <Link
        href={item.href}
        className="flex h-full flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean-600 focus-visible:outline-offset-2"
        aria-label={`${item.title} — ${item.tagline}`}
      >
        <div className={`relative overflow-hidden ${aspectClass} bg-paper-100`}>
          <div className="hover-scale-img absolute inset-0">
            <LocationPhotoView
              photo={item.photo}
              sizes={
                isHero
                  ? "(min-width: 1024px) 66vw, 100vw"
                  : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              }
              className="h-full w-full object-cover"
              priority={isHero}
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-5">
          {item.eyebrow && (
            <span className="text-eyebrow uppercase tracking-eyebrow text-ocean-700">
              {item.eyebrow}
            </span>
          )}
          <h3
            className={[
              "font-display text-ink-900",
              isHero ? "text-display-sm md:text-display-md" : "text-headline-lg",
            ].join(" ")}
          >
            {item.title}
          </h3>
          <p className="text-body-sm text-ink-700 line-clamp-2">{item.tagline}</p>
          <span className="mt-auto inline-flex items-center gap-1 text-body-sm font-medium text-ocean-700 hover-underline pt-2">
            {item.ctaLabel ?? "Read more →"}
          </span>
        </div>
      </Link>
    </article>
  );
}

/**
 * Layout resolver. Maps items to grid slots based on the variant.
 */
function renderLayout(
  layout: EditorialGridLayout,
  items: EditorialGridItem[],
): React.ReactNode {
  if (layout === "feature" && items.length >= 2) {
    // Hero tile + standard tile + 3-up remainder.
    const hero = items[0];
    const standard = items[1];
    const remainder = items.slice(2);
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2 lg:col-span-2 lg:row-span-1">
          <GridCard item={hero} variant="hero" />
        </div>
        <div>
          <GridCard item={standard} variant="wide" />
        </div>
        {remainder.map((item) => (
          <GridCard key={item.id} item={item} variant="standard" />
        ))}
      </div>
    );
  }
  if (layout === "asymmetric" && items.length >= 4) {
    // 1 tall hero + 3 standard.
    const [tall, s1, s2, s3] = items;
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:row-span-2 lg:row-span-2">
          <GridCard item={tall} variant="tall" />
        </div>
        <GridCard item={s1} variant="wide" />
        <GridCard item={s2} variant="wide" />
        <div className="md:col-span-2 lg:col-span-2">
          <GridCard item={s3} variant="wide" />
        </div>
      </div>
    );
  }
  // "stagger" or fallback: 2x2 with alternating aspects.
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => {
        const variant =
          i === 0 ? "tall"
          : i === 1 ? "wide"
          : i === items.length - 1 ? "accent"
          : "standard";
        return <GridCard key={item.id} item={item} variant={variant as "tall" | "wide" | "accent" | "standard"} />;
      })}
    </div>
  );
}

export function EditorialGrid({
  heading,
  eyebrow,
  intro,
  items,
  layout = "feature",
  seeAllHref,
  seeAllLabel,
}: EditorialGridProps) {
  return (
    <section className="mx-auto w-full max-w-container-7xl px-4 py-12 md:px-6 md:py-16">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-12">
        <div>
          {eyebrow && (
            <span className="text-eyebrow uppercase tracking-eyebrow text-ocean-700">
              {eyebrow}
            </span>
          )}
          <h2 className="mt-2 font-display text-display-md text-ink-900 md:text-display-lg">
            {heading}
          </h2>
          {intro && (
            <p className="mt-3 max-w-2xl text-body-md text-ink-700">{intro}</p>
          )}
        </div>
        {seeAllHref && (
          <Link
            href={seeAllHref}
            className="inline-flex items-center gap-1 text-body-md font-medium text-ocean-700 hover-underline"
          >
            {seeAllLabel ?? "See all →"}
          </Link>
        )}
      </header>
      {renderLayout(layout, items)}
    </section>
  );
}

export default EditorialGrid;