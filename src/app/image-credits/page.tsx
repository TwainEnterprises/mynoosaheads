import type { Metadata } from "next";
import Link from "next/link";
import {
  HOMEPAGE_HERO,
  ABOUT_BRAND_IMAGE,
  CATEGORY_PHOTOS,
  type UnsplashPhoto,
} from "@/data/photos";
import { CATEGORIES } from "@/data/site";

/**
 * /image-credits — Per-page attribution page.
 *
 * v5 (MSN-2959-V5-POLISH #12) — auto-renders from src/data/photos.ts.
 * Lists every Unsplash photo with author + licence URL. The page is
 * the single source of truth for photography attribution on the site.
 *
 * Per Tim's locked answer #1: "document attribution per Unsplash
 * licence in the page alt + a centralised /image-credits page."
 *
 * CC compliance: every photo carries the Unsplash License (free for
 * commercial use, attribution courtesy not legally required). We
 * attribute anyway, including the source URL back-link.
 */

export const metadata: Metadata = {
  title: "Image credits",
  description:
    "Every photo credit on MyNoosaHeads: photographer, Unsplash source URL, and licence. Per-page attribution plus this centralised /image-credits page.",
  alternates: { canonical: "/image-credits" },
  openGraph: {
    title: "Image credits · MyNoosaHeads",
    description: "Every photo credit on the site, with photographer and Unsplash source URL.",
    url: "/image-credits",
    type: "article",
  },
};

const UnsplashCredit = ({ photo, role }: { photo: UnsplashPhoto; role: string }) => (
  <article className="border-b border-paper-200 py-4">
    <p className="text-eyebrow text-ocean-900">{role}</p>
    <p className="mt-1 text-body text-ink-900">{photo.caption}</p>
    <p className="mt-1 text-caption text-ink-700">
      Photo: <span className="font-medium">{photo.author}</span> ·{" "}
      <Link
        href={photo.sourceUrl}
        className="link text-ocean-700"
        rel="noopener noreferrer"
        target="_blank"
      >
        Unsplash source
      </Link>{" "}
      · {photo.licence}
    </p>
  </article>
);

export default function ImageCreditsPage() {
  return (
    <div className="bg-paper-50">
      <header className="container-page pt-14 md:pt-20">
        <p className="eyebrow">Editorial</p>
        <h1 className="mt-1 font-display text-display-lg text-ink-900 text-balance">
          Image credits
        </h1>
        <p className="mt-4 lead max-w-3xl">
          Every photograph on MyNoosaHeads is credited. This page is the
          centralised register; each photo also carries its credit line in
          the page where it appears. Photographers are attributed by
          their Unsplash profile name where known; otherwise credited as
          an &ldquo;Unsplash contributor&rdquo; with the source URL.
        </p>
        <div className="mt-6 callout">
          <p className="eyebrow">Licence</p>
          <p className="mt-2 text-body-sm text-ink-800">
            All photographs on this site are used under the{" "}
            <Link
              href="https://unsplash.com/license"
              className="link text-ocean-700"
              rel="noopener noreferrer"
              target="_blank"
            >
              Unsplash License
            </Link>
            , which permits free use for commercial and non-commercial
            purposes without attribution. Attribution is provided as a
            courtesy to the contributing photographers and to support
            the Unsplash community.
          </p>
        </div>
      </header>

      <section
        className="container-page py-12 md:py-16"
        aria-labelledby="homepage-h"
      >
        <h2 id="homepage-h" className="font-display text-display-md text-ink-900">
          Homepage
        </h2>
        <UnsplashCredit photo={HOMEPAGE_HERO} role="Homepage hero" />
        <UnsplashCredit photo={ABOUT_BRAND_IMAGE} role="About brand statement" />
      </section>

      {CATEGORIES.map((cat) => {
        const photos = CATEGORY_PHOTOS[cat.slug];
        if (!photos) return null;
        return (
          <section
            key={cat.slug}
            className="container-page py-12 md:py-16 border-t border-paper-200"
            aria-labelledby={`credits-${cat.slug}`}
          >
            <h2 id={`credits-${cat.slug}`} className="font-display text-display-md text-ink-900">
              {cat.navLabel}
            </h2>
            <UnsplashCredit photo={photos.hero} role="Category hero" />
            {photos.inline.map((p, i) => (
              <UnsplashCredit key={i} photo={p} role={`Inline image ${i + 1}`} />
            ))}
          </section>
        );
      })}

      <section className="container-page pb-14 md:pb-20 border-t border-paper-200 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3 text-caption text-ink-600">
          <p>
            <span className="font-accent text-accent-md text-ocean-700">By the editors · MyNoosaHeads</span>
          </p>
          <p>
            Last verified: <time dateTime="2026-10-05">5 October 2026</time> (Australia/Brisbane)
          </p>
        </div>
      </section>
    </div>
  );
}