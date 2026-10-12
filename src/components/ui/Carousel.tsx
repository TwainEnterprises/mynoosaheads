"use client";

/**
 * Carousel — horizontal scroll-snap rail with optional nav arrows.
 *
 * Per Albert's v6 spec §4.4: pure CSS `scroll-snap-x` with nav
 * arrows (v6.1 P1: arrows are enabled by default). The rail is a
 * single horizontal flex container; each child snaps to the start.
 * Touch, mouse wheel, and keyboard (Tab + arrow keys) all work
 * natively.
 *
 * v6 design tokens (globals.css):
 *   - .scroll-snap-rail  — the rail surface
 *
 * The component renders a `role="region" aria-roledescription="carousel"`
 * wrapper with an optional `aria-label`. Children get
 * `role="group" aria-roledescription="slide"` via CarouselSlide.
 *
 * v6.1 additions:
 *   - Optional nav arrows (showArrows prop, default true).
 *   - Smooth scroll on arrow click; loop wraps.
 *   - Snap behaviour preserved; arrows are a11y-labelled.
 */

import type { ReactNode } from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Icons } from "./Icon";

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
  /** Show nav arrow buttons (default true in v6.1). */
  showArrows?: boolean;
};

export function Carousel({
  ariaLabel,
  slideCount,
  currentIndex,
  children,
  className = "",
  showArrows = true,
}: CarouselProps) {
  const labelId = useId();
  const railRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Track the active slide based on scroll position
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const onScroll = () => {
      const slides = Array.from(rail.children) as HTMLElement[];
      if (slides.length === 0) return;
      const railLeft = rail.getBoundingClientRect().left;
      let closest = 0;
      let closestDist = Number.POSITIVE_INFINITY;
      slides.forEach((slide, i) => {
        const dist = Math.abs(slide.getBoundingClientRect().left - railLeft);
        if (dist < closestDist) {
          closest = i;
          closestDist = dist;
        }
      });
      setActiveIndex(closest);
    };
    rail.addEventListener("scroll", onScroll, { passive: true });
    return () => rail.removeEventListener("scroll", onScroll);
  }, []);

  const scrollBySlide = useCallback((dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const slides = Array.from(rail.children) as HTMLElement[];
    if (slides.length === 0) return;
    const target = (activeIndex + dir + slides.length) % slides.length;
    const slide = slides[target];
    if (slide) {
      rail.scrollTo({ left: slide.offsetLeft - rail.offsetLeft, behavior: "smooth" });
    }
  }, [activeIndex]);

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
      <div className={`scroll-snap-rail ${className}`.trim()} ref={railRef}>
        {Array.isArray(children)
          ? children.map((child, i) => (
              <CarouselSlide
                key={i}
                index={i}
                total={slideCount}
                isCurrent={(currentIndex ?? activeIndex) === i}
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
      {showArrows ? (
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden md:flex items-center justify-between">
          <button
            type="button"
            onClick={() => scrollBySlide(-1)}
            className="pointer-events-auto -ml-3 flex h-10 w-10 items-center justify-center rounded-full bg-paper-50/95 text-ink-900 shadow hover:bg-paper-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean-500"
            aria-label="Previous slide"
          >
            <Icons.ChevronRight size={20} className="rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => scrollBySlide(1)}
            className="pointer-events-auto -mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-paper-50/95 text-ink-900 shadow hover:bg-paper-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean-500"
            aria-label="Next slide"
          >
            <Icons.ChevronRight size={20} />
          </button>
        </div>
      ) : null}
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
