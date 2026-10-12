import type { Metadata } from "next";
import Link from "next/link";
import {
  HOMEPAGE_HERO,
  ABOUT_BRAND_IMAGE,
  CATEGORY_PHOTOS,
  HOMEPAGE_SECTIONS,
  ACCOMMODATION_PHOTOS,
  type LocationPhoto,
} from "@/data/photos";
import { CATEGORIES } from "@/data/site";

/**
 * /image-credits — Per-page attribution page (v6.1.1).
 *
 * Auto-renders from src/data/photos.ts. Lists every photo with author
 * + licence + source URL. The page is the single source of truth for
 * photography attribution on the site.
 *
 * v6.1.1 (MSN-2962) — swapped from curated Unsplash to verified
 * location-specific Wikimedia Commons photos + bespoke SVG
 * illustrations. The 49 Unsplash photos are removed; the new
 * inventory is 42 Commons photos + 10 SVG fallbacks (the SVG
 * fallbacks cover Sunshine Beach, six named eat-and-drink venues,
 * and three cross-section accommodation filters).
 *
 * Compliance summary:
 *   - 28 photos under CC BY-SA 4.0 (Kgbo, Donaldytong, Misaochan2,
 *     John Robert McPherson) — derivative works must carry the
 *     same licence. MyNoosaHeads is not a derivative work.
 *   - 6 photos under CC BY 2.0 (dronepicr, Ewen Bell, Mountain/Ash)
 *     — free for commercial use with attribution.
 *   - 4 photos under CC BY 2.0 (Flickr→Commons import) — attribution
 *     preserved at transfer time.
 *   - 1 photo under CC0 1.0 (John Robert McPherson, Tewantin 1930s).
 *   - 1 photo released to public domain by author (Zephyr103).
 *   - 1 unattributed historical photo (ca. 1920) — public domain via
 *     State Library of Queensland.
 *   - 10 bespoke SVG illustrations, MyNoosaHeads editorial.
 *
 * Every photo carries a credit line in the page where it appears
 * AND a row in the table below.
 */

export const metadata: Metadata = {
  title: "Image credits",
  description:
    "Every photo credit on MyNoosaHeads: photographer, Wikimedia Commons source URL, and licence. v6.1.1 — 42 open-licence photos + 10 SVG fallbacks.",
  alternates: { canonical: "/image-credits" },
  openGraph: {
    title: "Image credits · MyNoosaHeads",
    description:
      "Every photo credit on the site, with photographer and Wikimedia Commons source URL.",
    url: "/image-credits",
    type: "article",
  },
};

const PhotoRow = ({
  photo,
  role,
  sourceLabel = "Wikimedia Commons",
}: {
  photo: LocationPhoto;
  role: string;
  sourceLabel?: string;
}) => {
  const isSvg = photo.kind === "svg";
  return (
    <article className="border-b border-paper-200 py-4">
      <p className="text-eyebrow text-ocean-900">{role}</p>
      <p className="mt-1 text-body text-ink-900">{photo.caption}</p>
      <p className="mt-1 text-caption text-ink-700">
        {isSvg ? (
          <>
            <span className="font-medium">{photo.author}</span> · {photo.licence}
          </>
        ) : (
          <>
            Photo:{" "}
            <span className="font-medium">{photo.author}</span> ·{" "}
            <Link
              href={photo.sourceUrl}
              className="link text-ocean-700"
              rel="noopener noreferrer"
              target="_blank"
            >
              {sourceLabel}
            </Link>{" "}
            · {photo.licence}
          </>
        )}
      </p>
    </article>
  );
};

const FallbackSection = () => (
  <section
    id="fallbacks"
    className="container-page py-12 md:py-16 border-t border-paper-200"
    aria-labelledby="fallbacks-h"
  >
    <h2 id="fallbacks-h" className="font-display text-display-md text-ink-900">
      Bespoke SVG illustrations
    </h2>
    <p className="mt-2 lead max-w-3xl">
      For the locations with no open-licence photo at the time of
      v6.1.1 ship, we commissioned bespoke SVG illustrations consistent
      with the v5 AreaHeroes style (1.5px stroke, sea-glass palette,
      4:3 viewBox). These are <em>not</em> branded imitations of any
      named venue — they depict the venue typology (e.g.&nbsp;&ldquo;riverside
      Japanese&rdquo; for Wasabi, &ldquo;laneway restaurant&rdquo; for Sum Yung Guys).
      v6.2 follow-up: direct outreach to each named venue for a
      CC-BY photo, per Albert&rsquo;s recommendation.
    </p>
    <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-body-sm">
      {[
        ["sunshine-beach", "Sunshine Beach — the surf village south of the headland"],
        ["japanese-riverside", "Wasabi — modern Japanese, riverside"],
        ["beachfront-seafood", "Sails — modern Australian, beachfront"],
        ["italian-hastings", "Berardo's — Italian, Hastings Street"],
        ["asian-junction", "Sum Yung Guys — South-east Asian, Noosa Junction"],
        ["seafood-hastings", "Bistro C — seafood, Hastings Street"],
        ["italian-noosaville", "Locale — Italian, Noosaville"],
        ["pet-friendly", "Pet-friendly — off-leash hours at a Noosa beach"],
        ["family", "Family — a parent and child on the beach"],
        ["accessible", "Accessible — step-free path to a ground-floor unit"],
      ].map(([key, label]) => (
        <li key={key} className="rounded-lg border border-paper-200 p-3">
          <p className="text-caption text-ink-600">SVG · {key}</p>
          <p className="text-ink-900">{label}</p>
        </li>
      ))}
    </ul>
  </section>
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
          centralised register; each photo also carries its credit line
          in the page where it appears. v6.1.1 ships 42 verified
          location-specific open-licence photos from Wikimedia Commons,
          the State Library of Queensland, and Flickr-CC imports — plus
          10 bespoke SVG illustrations for the locations with no
          open-licence photo at the time of ship.
        </p>
        <div className="mt-6 callout">
          <p className="eyebrow">Licence</p>
          <p className="mt-2 text-body-sm text-ink-800">
            Photographs are used under{" "}
            <Link
              href="https://creativecommons.org/licenses/"
              className="link text-ocean-700"
              rel="noopener noreferrer"
              target="_blank"
            >
              Creative Commons
            </Link>{" "}
            (CC BY-SA 4.0, CC BY 2.0, CC0 1.0) or as public-domain
            releases. We do not use Unsplash, generic stock, or
            AI-generated imagery. If you reuse any of these images,
            please retain the photographer and licence attribution.
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
        <PhotoRow photo={HOMEPAGE_HERO} role="Homepage hero" />
        <PhotoRow photo={ABOUT_BRAND_IMAGE} role="About brand statement" />
      </section>

      <section
        className="container-page py-12 md:py-16 border-t border-paper-200"
        aria-labelledby="homepage-sections-h"
      >
        <h2
          id="homepage-sections-h"
          className="font-display text-display-md text-ink-900"
        >
          Homepage sections (S3 / S4 / S5 / S7 / S9 / S10)
        </h2>
        <h3 className="mt-6 font-display text-headline-lg text-ink-900">
          S3 Featured areas
        </h3>
        {HOMEPAGE_SECTIONS.featuredAreas.map((p, i) => (
          <PhotoRow key={`fa-${i}`} photo={p} role={`S3 featured area ${i + 1}`} />
        ))}
        <h3 className="mt-8 font-display text-headline-lg text-ink-900">
          S4 Things to do
        </h3>
        {HOMEPAGE_SECTIONS.thingsToDo.map((p, i) => (
          <PhotoRow key={`ttd-${i}`} photo={p} role={`S4 experience ${i + 1}`} />
        ))}
        <h3 className="mt-8 font-display text-headline-lg text-ink-900">
          S5 Where to stay
        </h3>
        {HOMEPAGE_SECTIONS.whereToStay.map((p, i) => (
          <PhotoRow key={`wts-${i}`} photo={p} role={`S5 stay card ${i + 1}`} />
        ))}
        <h3 className="mt-8 font-display text-headline-lg text-ink-900">
          S7 Eat & drink
        </h3>
        {HOMEPAGE_SECTIONS.eatAndDrink.map((p, i) => (
          <PhotoRow key={`ead-${i}`} photo={p} role={`S7 venue ${i + 1}`} />
        ))}
        <h3 className="mt-8 font-display text-headline-lg text-ink-900">
          S9 Webcams strip
        </h3>
        {HOMEPAGE_SECTIONS.webcams.map((p, i) => (
          <PhotoRow key={`wb-${i}`} photo={p} role={`S9 webcam tile ${i + 1}`} />
        ))}
        <h3 className="mt-8 font-display text-headline-lg text-ink-900">
          S10 Getting here
        </h3>
        <PhotoRow photo={HOMEPAGE_SECTIONS.gettingHere} role="S10 hero" />
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
              {cat.navLabel} (category page)
            </h2>
            <PhotoRow photo={photos.hero} role="Category hero" />
            {photos.inline.map((p, i) => (
              <PhotoRow key={i} photo={p} role={`Inline image ${i + 1}`} />
            ))}
          </section>
        );
      })}

      <section
        className="container-page py-12 md:py-16 border-t border-paper-200"
        aria-labelledby="accommodation-subpages-h"
      >
        <h2
          id="accommodation-subpages-h"
          className="font-display text-display-md text-ink-900"
        >
          Accommodation sub-pages
        </h2>
        {Object.entries(ACCOMMODATION_PHOTOS).map(([slug, photos]) => (
          <div key={slug} className="mt-6 first:mt-0">
            <h3 className="font-display text-headline-lg text-ink-900">
              /accommodation/{slug}
            </h3>
            <PhotoRow photo={photos.hero} role="Sub-page hero" />
            {photos.inline.map((p, i) => (
              <PhotoRow key={i} photo={p} role={`Inline image ${i + 1}`} />
            ))}
          </div>
        ))}
      </section>

      <FallbackSection />

      <section className="container-page pb-14 md:pb-20 border-t border-paper-200 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3 text-caption text-ink-600">
          <p>
            <span className="font-accent text-accent-md text-ocean-700">By the editors · MyNoosaHeads</span>
          </p>
          <p>
            Last verified: <time dateTime="2026-10-12">12 October 2026</time> (Australia/Brisbane)
          </p>
        </div>
      </section>
    </div>
  );
}
