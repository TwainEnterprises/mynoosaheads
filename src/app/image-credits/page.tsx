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
 * /image-credits — Per-page attribution page (v6.2).
 *
 * Auto-renders from src/data/photos.ts. Lists every photo with author
 * + licence + source URL. The page is the single source of truth for
 * photography attribution on the site.
 *
 * v6.2 (MSN-2963) — 62 verified location-specific open-licence photos
 * from Wikimedia Commons + 33 bespoke SVG illustrations. The 62 photos
 * are all from Albert's v2 manifest (2026-10-14) and pass all four
 * verification tests (visible Noosa landmark · EXIF GPS in the Noosa
 * box · caption match · visible-content cross-check). The 33 SVG
 * illustrations cover gaps (Sunshine Beach holiday house, accessible
 * unit, Noosa Junction, plus 7 area scenes + 6 activity scenes + 5
 * trip-theme scenes + venue typologies + miscellaneous).
 *
 * Compliance summary:
 *   - 50 photos under CC BY-SA 4.0 (Kgbo, Donaldytong, Misaochan2,
 *     John Robert McPherson, Pezoporus wallicus, et al.) — derivative
 *     works must carry the same licence. MyNoosaHeads is not a
 *     derivative work.
 *   - 6 photos under CC BY-SA 3.0 — alphabetical successor of 4.0;
 *     same attribution requirements.
 *   - 4 photos under CC BY 4.0 — attribution only.
 *   - 2 photos under CC BY 3.0 — attribution only.
 *   - 33 bespoke SVG illustrations, MyNoosaHeads editorial.
 *   - Zero CC-BY-NC, CC-BY-ND, commercial stock, Unsplash, or AI.
 *
 * Every photo carries a credit line in the page where it appears
 * AND a row in the table below.
 */

export const metadata: Metadata = {
  title: "Image credits",
  description:
    "Every photo credit on MyNoosaHeads: photographer, Wikimedia Commons source URL, and licence. v6.2 — 62 verified open-licence photos + 33 SVG illustrations.",
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
      v6.2 ships <strong>33 bespoke editorial illustrations</strong> in
      the same sea-glass palette (1.5px stroke, 480×360 viewBox, 4:3
      ratio). They cover three categories:
    </p>
    <ul className="mt-3 list-disc pl-6 text-body-sm text-ink-800 space-y-1">
      <li>
        <strong>Gaps where the v2 manifest returned 0 photos</strong>
        {" "}— Noosa Junction (0/1), Sunshine Beach holiday house (no
        open-licence image), accessible ground-floor unit (no
        open-licence image).
      </li>
      <li>
        <strong>Venue typologies</strong> — generic, not branded
        imitations of named venues (e.g.&nbsp;&ldquo;riverside Japanese&rdquo;
        as a typology, not a recreation of any specific venue&rsquo;s
        facade or branding).
      </li>
      <li>
        <strong>Editorial scene library</strong> — 7 area scenes (Noosa
        Heads, Hastings Street, Noosaville, Tewantin, Peregian, Noosa
        National Park, Hinterland), 6 activity scenes (surf, SUP,
        kayak, swim, hike, fishing), 5 trip-theme scenes (romantic,
        budget, solo, group, business) — for future use on sub-pages,
        social tiles, and editorial cards.
      </li>
    </ul>
    <p className="mt-3 text-body-sm text-ink-800">
      The 4 named-venue typology SVGs from v6.1.1 (Wasabi, Sails,
      Berardo&rsquo;s, Sum Yung Guys) are retained in the fallback
      library because v6.2 ships real open-licence photos for 9 other
      venues (Season, Bang Bang, Zibros, Gusto, Heads of Noosa Brewing,
      Noosa Boathouse, Royal Mail, Bistro C, Locale) — see the S7
      venue list above. Editorial honest &gt; venue-typology
      illustration when a real photo exists.
    </p>
    <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-body-sm">
      {[
        // Gap fillers (3)
        ["sunshine-beach", "Sunshine Beach — the surf village south of the headland"],
        ["accessible", "Accessible — step-free path to a ground-floor unit"],
        ["area-noosa-junction", "Noosa Junction — the local plaza (gap, 0/1 in v2)"],
        // Venue typologies (6 — historical; v6.2 ships photos for Bistro C + Locale)
        ["japanese-riverside", "Wasabi — modern Japanese, riverside (typology)"],
        ["beachfront-seafood", "Sails — modern Australian, beachfront (typology)"],
        ["italian-hastings", "Berardo's — Italian, Hastings Street (typology)"],
        ["asian-junction", "Sum Yung Guys — South-east Asian, Noosa Junction (typology)"],
        ["seafood-hastings", "Bistro C — seafood, Hastings Street (typology; v6.2 also has a photo)"],
        ["italian-noosaville", "Locale — Italian, Noosaville (typology; v6.2 also has a photo)"],
        // Trip themes (3 — plus pet-friendly + family which already cover gaps)
        ["pet-friendly", "Pet-friendly — off-leash hours at a Noosa beach"],
        ["family", "Family — a parent and child on the beach"],
        ["trip-romantic", "Trip theme: romantic — sunset on the river"],
        ["trip-budget", "Trip theme: budget — picnic on the beach"],
        ["trip-solo", "Trip theme: solo — quiet morning on the headland"],
        // Area scenes (7)
        ["area-noosa-heads", "Area scene: Noosa Heads — headland + surf-club arc"],
        ["area-hastings-street", "Area scene: Hastings Street — boutique colonnade"],
        ["area-noosaville", "Area scene: Noosaville — riverfront along Gympie Terrace"],
        ["area-tewantin", "Area scene: Tewantin — river town main street"],
        ["area-peregian", "Area scene: Peregian Beach — village square"],
        ["area-noosa-national-park", "Area scene: Noosa National Park — headland walk"],
        ["area-hinterland", "Area scene: Hinterland — Mount Cooroora + country town"],
        // Activity scenes (6)
        ["activity-surf", "Activity: surf — longboard point break at First Bay"],
        ["activity-sup", "Activity: stand-up paddle — calm-water hire at Noosaville"],
        ["activity-kayak", "Activity: kayak — the upper Noosa River"],
        ["activity-swim", "Activity: swim — the lifeguard-tower bay"],
        ["activity-hike", "Activity: hike — the headland walk"],
        ["activity-fishing", "Activity: fishing — angling from a boat at the river mouth"],
        // Trip themes — extra
        ["trip-group", "Trip theme: group — friends on a river cruise"],
        ["trip-business", "Trip theme: business — Hastings Street morning meeting"],
        // Sub-page decorative (4)
        ["tewantin", "Tewantin — river town ferry stop (decorative)"],
        ["peregian", "Peregian — the village surf-front (decorative)"],
        ["hinterland", "Hinterland — country town beneath the volcanic peak (decorative)"],
        ["cross-section-pets", "Cross-section: pets — verify each operator's pet policy"],
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
          in the page where it appears. v6.2 ships <strong>62 verified
          location-specific open-licence photos</strong> from Wikimedia
          Commons — all passing the 4-test verification
          (visible Noosa landmark · EXIF GPS in the Noosa box · caption
          match · visible-content cross-check) — plus <strong>33 bespoke
          SVG illustrations</strong> in editorial register for the gaps
          and venue typologies where no open-licence photo exists.
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
            Last verified: <time dateTime="2026-10-14">14 October 2026</time> (Australia/Brisbane)
          </p>
        </div>
      </section>
    </div>
  );
}
