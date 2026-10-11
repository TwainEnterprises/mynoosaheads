"use client";

/**
 * Carousel — horizontal scroll-snap rail.
 *
 * Per Albert's v6 spec §4.4: pure CSS `scroll-snap-x` with optional
 * nav arrows (P0: scroll-snap only; P1 adds arrow buttons). The rail
 * is a single horizontal flex container; each child snaps to the
 * start. Touch, mouse wheel, and keyboard (Tab + arrow keys) all
 * work natively.
 *
 * v6 design tokens (globals.css):
 *   - .scroll-snap-rail  — the rail surface
 *
 * The component renders a `role="region" aria-roledescription="carousel"`
 * wrapper with an optional `aria-label`. Children get
 * `role="group" aria-roledescription="slide"` via CarouselSlide.
 */

import type { ReactNode } from "react";
import { useId } from "react";

export type CarouselProps = {
  /** Accessible label for the rail (e.g. "Things to do"). */
  ariaLabel: string;
  /** Total number of slides — required for slide aria-labels. */
  slideCount: number;
  /** Current slide index (0-based). Defaults to undefined. */
  currentIndex?: number;
  children: ReactNode;
  /** Optional className for the rail container. */
  className?: string;
};

export function Carousel({
  ariaLabel,
  slideCount,
  currentIndex,
  children,
  className = "",
}: CarouselProps) {
  const labelId = useId();
  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      aria-labelledby={labelId}
      className="relative"
    >
      <h3 id={labelId} className="sr-only">
        {ariaLabel}
      </h3>
      <div className={`scroll-snap-rail ${className}`.trim()}>
        {Array.isArray(children)
          ? children.map((child, i) => (
              <CarouselSlide
                key={i}
                index={i}
                total={slideCount}
                isCurrent={currentIndex === i}
              >
                {child}
              </CarouselSlide>
            ))
          : (
            <CarouselSlide index={0} total={1} isCurrent>
              {children}
            </CarouselSlide>
          )}
      </div>
    </section>
  );
}

export type CarouselSlideProps = {
  index: number;
  total: number;
  isCurrent?: boolean;
  children: ReactNode;
};

export function CarouselSlide({
  index,
  total,
  isCurrent,
  children,
}: CarouselSlideProps) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}`}
      aria-current={isCurrent ? "true" : undefined}
      className="w-[280px] sm:w-[320px] md:w-[360px] shrink-0"
    >
      {children}
    </div>
  );
}
