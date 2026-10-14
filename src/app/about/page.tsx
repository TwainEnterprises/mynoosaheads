import type { Metadata } from "next";
import Link from "next/link";
import { Hero, HeroPhoto, Card, CardBody, CardHeader } from "@/components/ui";
import { ABOUT_BRAND_IMAGE } from "@/data/photos";
import type { LocationPhoto } from "@/data/photos";

export const metadata: Metadata = {
  title: "About",
  description:
    "About MyNoosaHeads — what we cover, who writes it, and how the publication is set up.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About · MyNoosaHeads",
    description: "What we cover, who writes it, and how the publication is set up.",
    url: "/about",
    type: "article",
  },
};

export default function AboutPage() {
  const brandImage: LocationPhoto = ABOUT_BRAND_IMAGE;
  const brandSrc = brandImage.kind === "commons" ? brandImage.url : "";
  const brandAlt = brandImage.kind === "commons" ? brandImage.altText : brandImage.caption;
  const brandCredit =
    brandImage.kind === "commons"
      ? `Photo: ${brandImage.author} / Wikimedia Commons · ${brandImage.licence}`
      : `Illustration: ${brandImage.author} · ${brandImage.licence}`;
  return (
    <div className="bg-paper-50">
      {/* Sprint 1.5 (MSN-2958): full-bleed masthead photo. Quiet headland
       * view rather than the swimming beach — this is the editorial
       * "figure" under which the brand statement sits.
       *
       * v6.1.1 (MSN-2962): handles the LocationPhoto union — Commons
       * photos get a real src/alt; SVG fallbacks get an empty src
       * (the HeroPhoto component renders a placeholder, not the SVG
       * itself — the SVG fallback is intended for category pages, not
       * the about brand statement). */}
      <HeroPhoto
        src={brandSrc}
        alt={brandAlt}
        caption={brandImage.caption}
        credit={brandCredit}
      />
      {/* Sprint 1.5 (MSN-2958) — brand-statement masthead.
       * Chairman's north-star quote as a `<Section>` at the top of /about,
       * styled as Fraunces italic display with an ocean accent.
       */}
      <section
        className="border-b border-paper-200 bg-paper-100"
        aria-labelledby="brand-statement-h"
      >
        <div className="container-page py-14 md:py-20">
          <p
            id="brand-statement-h"
            // MSN-2959 / TSK-2959-POLISH-C: dropped explicit `text-ocean-700`
            // override so the bumped `.eyebrow` class (text-ocean-900) wins
            // and the eyebrow contrast on white is WCAG AA-compliant.
            className="eyebrow"
          >
            Brand statement
          </p>
          <blockquote className="mt-4 max-w-4xl text-balance text-eucalyptus-700 leading-tight">
            <p className="font-display italic text-display-lg md:text-display-xl">
              By the headland, by the bar.
            </p>
            <p className="mt-5 font-display not-italic text-display-sm md:text-display-md text-ink-800 leading-snug">
              MyNoosaHeads is a slow-guide field manual for Noosa Heads —
              surf and weather, the national park, accommodation, and the
              local rules that keep everyone on the right side of a
              south-east swell.
            </p>
            <p className="mt-3 font-display not-italic text-display-sm md:text-display-md text-ink-800 leading-snug">
              Built slowly, sourced always, never fabricated
              {/*
                * MSN-2959 / TSK-2959-FIX-3: brand-statement full-stop
                * dot — the single place --accent-amber (#B8742A) appears
                * on the site. Per Albert's spec §3.3, amber is the ONE
                * warm hue; it punctuates the brand statement, not the
                * rest of the palette.
                */}
              <span
                className="ml-2 inline-block h-2.5 w-2.5 rounded-full bg-amber-500 align-middle"
                aria-hidden="true"
              />
            </p>
          </blockquote>
          <p className="mt-6 font-accent text-accent-md text-ocean-700">
            — Editorial, MyNoosaHeads
          </p>
          <p className="mt-4 text-caption text-ink-600">
            Photo above:{" "}
            <span className="font-medium text-ink-700">
              {brandImage.caption}
            </span>{" "}
            — {brandCredit}
          </p>
        </div>
      </section>
      <Hero
        eyebrow="About"
        title="MyNoosaHeads"
        subtitle="An independent, sourced, slow-guide field manual for Noosa Heads and the surrounding shire. Built slowly, on the Sunshine Coast."
        flourish="By the headland, by the bar."
      />

      <section className="container-page py-14 md:py-20" aria-labelledby="what-h">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <h2 id="what-h" className="sr-only">What we cover</h2>
            <section>
              <h3 className="font-display text-display-sm text-ink-900">What we cover</h3>
              <div className="prose-mdx mt-4">
                <p>
                  MyNoosaHeads covers Noosa Heads, Noosaville, Tewantin,
                  Sunshine Beach, Peregian, and the western shire villages
                  (Pomona, Cooran, Kin Kin, Cooroy). Eight functional areas:
                  surf and weather, the national park, accommodation, things
                  to do, fishing, boats, travel, and webcams.
                </p>
                <p>
                  We organise the guide around what locals actually do, not
                  what the visitor brochure leads with. The result is a
                  publication that opens with a surf report and ends with a
                  description of the hinterland — both honest, both useful,
                  both sourced.
                </p>
              </div>
            </section>

            <section>
              <h3 className="font-display text-display-sm text-ink-900">How we work</h3>
              <div className="prose-mdx mt-4">
                <p>
                  Every claim on this site links to a public source —
                  usually a government page (BOM, QPWS, MSQ, QLD Traffic,
                  Noosa Council), an industry body (Tourism Noosa, Visit
                  Sunshine Coast), or a third-sector service (Beachsafe,
                  SLSQ). Affiliate links are marked{" "}
                  <span className="chip-ocean">Affiliate</span>{" "}
                  before you click, and the full statement lives at{" "}
                  the footer (full disclosure).
                </p>
                <p>
                  The live data tiles on the site refresh themselves every 30
                  minutes from BOM and Open-Meteo. We do not push them by
                  hand, and we do not edit the numbers. If a tile fails,
                  it falls back to a calm Unavailable badge rather than
                  guessing.
                </p>
                <p>
                  Editorial copy is reviewed against current QPWS and
                  council sources every month. The publication has no
                  newsletter, no login, no pop-ups, no email capture, no
                  AI photography, and no fabricated reviews or stats.
                </p>
              </div>
            </section>

            <section>
              <h3 className="font-display text-display-sm text-ink-900">Who writes it</h3>
              <div className="prose-mdx mt-4">
                <p>
                  MyNoosaHeads is published by a small Sunshine Coast
                  editorial team with day-to-day ties to the Noosa shire.
                  Bylines sit at the foot of every category page. Errors
                  are corrected promptly and the correction is noted in
                  place — please{" "}
                  <Link href="/contact" className="link text-ocean-700">
                    drop us a line
                  </Link>{" "}
                  if you spot one.
                </p>
                <p className="mt-3">
                  Looking for the editorial preamble? See{" "}
                  <Link href="/hello-noosa" className="link text-ocean-700">
                    Hello, Noosa
                  </Link>{" "}
                  for the first-letter orientation to the shire.
                </p>
              </div>
            </section>

            <section>
              <h3 className="font-display text-display-sm text-ink-900">Hosting and stack</h3>
              <div className="prose-mdx mt-4">
                <p>
                  The site is a Next.js 14 application, statically rendered
                  where possible and server-rendered for the live tiles.
                  It is hosted on Vercel Hobby (free tier; we will upgrade
                  to Pro at A$30/month only when traffic warrants). All
                  source code is held in a private Git repository.
                </p>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <Card variant="surface">
              <CardHeader eyebrow="At a glance" title="" />
              <CardBody>
                <dl className="text-body-sm space-y-3 text-ink-800">
                  {/* MSN-2959 / TSK-2959-POLISH-C: explicit `text-ocean-700`
                   * dropped from each `<dt>` so the eyebrow register
                   * resolves to text-ocean-900 (#0E4A41, ~10:1 on white). */}
                  <div>
                    <dt className="text-eyebrow">Region</dt>
                    <dd>Noosa Shire, Queensland, Australia</dd>
                  </div>
                  <div>
                    <dt className="text-eyebrow">Locale</dt>
                    <dd>en-AU</dd>
                  </div>
                  <div>
                    <dt className="text-eyebrow">Established</dt>
                    <dd>2026</dd>
                  </div>
                  <div>
                    <dt className="text-eyebrow">Hosting</dt>
                    <dd>Vercel Hobby (free tier)</dd>
                  </div>
                  <div>
                    <dt className="text-eyebrow">Newsletter</dt>
                    <dd>None. Per chairman directive.</dd>
                  </div>
                </dl>
              </CardBody>
            </Card>
            <Card variant="surface">
              <CardHeader eyebrow="Legal" title="" />
              <CardBody>
                <ul className="text-body-sm space-y-2">
                  <li>
                    <Link href="/privacy" className="link text-ocean-700">Privacy policy</Link>
                  </li>
                  <li>
                    <Link href="/terms" className="link text-ocean-700">Terms of use</Link>
                  </li>
                </ul>
              </CardBody>
            </Card>
          </aside>
        </div>
      </section>
    </div>
  );
}
