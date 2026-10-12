import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Hero,
  HeroPhoto,
  Card,
  CardBody,
  CardHeader,
  Button,
  Icons,
} from "@/components/ui";
import { FALLBACK_SVGS } from "@/components/illustrations/V6P1Fallbacks";
import { CATEGORY_PHOTOS } from "@/data/photos";

export const metadata: Metadata = {
  title: "Webcams",
  description:
    "Live coastal webcams around Noosa — Council, SLSQ, and other public feeds. We don’t scrape; we link.",
  alternates: { canonical: "/webcams" },
  openGraph: {
    title: "Webcams · MyNoosaHeads",
    description: "Coastal webcams we link to, with attribution.",
    url: "/webcams",
    type: "article",
  },
};

const CAMS = [
  {
    name: "Noosa Main Beach",
    operator: "Sunshine Coast Council",
    description:
      "The flagship Noosa Heads beach cam. Look north-west to see the surf club and the flags. Useful for the morning check before the walk down Hastings Street.",
    href: "https://www.sunshinecoast.qld.gov.au/Environment/Rivers-and-coast",
    embed: false,
  },
  {
    name: "Coolum Beach",
    operator: "Sunshine Coast Council",
    description:
      "About 25 minutes south of Noosa Heads. Useful when the south-east is running and you want a longer-period look at the swell.",
    href: "https://www.sunshinecoast.qld.gov.au/Environment/Rivers-and-coast",
    embed: false,
  },
  {
    name: "Mooloolaba Beach",
    operator: "Sunshine Coast Council",
    description:
      "Mooloolaba is 40 minutes north. A different angle on the same marine district — useful if you’re deciding between the two ends of the coast.",
    href: "https://www.sunshinecoast.qld.gov.au/Environment/Rivers-and-coast",
    embed: false,
  },
  {
    name: "SLSQ patrol flags",
    operator: "Surf Life Saving Queensland",
    description:
      "SLSQ publishes patrol flags and webcam stills for the patrolled beaches. Use this to confirm which flags are up before you set up at the beach.",
    href: "https://www.lifesaving.com.au/",
    embed: false,
  },
  {
    name: "Beachsafe beach pages",
    operator: "Beachsafe.org.au",
    description:
      "Beachsafe lists every patrolled beach in Australia with hazards, facilities, and the current patrol status. Noosa Main Beach and Sunshine Beach are both covered.",
    href: "https://beachsafe.org.au/",
    embed: false,
  },
  {
    name: "QLD rainfall + river heights",
    operator: "Bureau of Meteorology",
    description:
      "The BOM rainfall and river-height pages are the quickest way to see whether the Noosa River is up after a heavy shower. Useful before any river crossing.",
    href: "https://www.bom.gov.au/qld/flood/",
    embed: false,
  },
];

export default function WebcamsPage() {
  const photos = CATEGORY_PHOTOS["webcams"];
  const heroCredit = photos
    ? photos.hero.kind === "svg"
      ? `Illustration: ${photos.hero.author} · ${photos.hero.licence}`
      : `Photo: ${photos.hero.author} / Wikimedia Commons · ${photos.hero.licence}`
    : "";
  const heroSrc = photos?.hero?.kind === "commons" ? photos.hero.url : "";
  const heroAlt = photos?.hero?.kind === "commons" ? photos.hero.altText : (photos?.hero?.caption ?? "");

  return (
    <div className="bg-paper-50">
      {/* Sprint 1.5: full-bleed hero photo (drone view)
       * v6.1.1 (MSN-2962): handles the LocationPhoto union — SVG kind
       * gets an empty src (HeroPhoto skips the image render; the SVG
       * fallback isn't used for the webcams category hero, which uses
       * a real Commons photo). */}
      {photos?.hero ? (
        <HeroPhoto
          src={heroSrc}
          alt={heroAlt}
          credit={heroCredit}
          caption={photos.hero.caption}
        />
      ) : null}
      <Hero
        eyebrow="Public feeds · we link, we don’t scrape"
        title="Webcams"
        subtitle="A short, honest list of public coastal webcams around Noosa. Where the operator allows embedding with attribution, we link; where the feed requires a link-out, we link."
        flourish="Check the cam before you check the car keys."
      />

      {/* Sprint 1.5: inline images after the gallery
       * v6.1.1 (MSN-2962): handles LocationPhoto union for inline. */}
      {photos?.inline?.length ? (
        <section className="container-page pb-14 md:pb-20" aria-label="Webcam subject photos">
          <div className="grid gap-8 md:grid-cols-2">
            {photos.inline.slice(0, 4).map((p, i) => (
              <figure key={i} className="relative w-full overflow-hidden rounded-2xl border border-paper-200 bg-paper-100">
                {p.kind === "svg" ? (
                  <div className="aspect-[16/9] w-full" role="img" aria-label={p.altText}>
                    {(() => {
                      const SvgComp = FALLBACK_SVGS[p.svgKey];
                      return <SvgComp className="h-full w-full" />;
                    })()}
                  </div>
                ) : (
                  <Image
                    src={p.url}
                    alt={p.altText}
                    width={p.width}
                    height={p.height}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    // MSN-2959 / TSK-2959-POLISH-B: Vercel image opt (AVIF/WebP).
                  />
                )}
                <figcaption className="px-4 py-3 text-caption text-ink-700 bg-paper-100 border-t border-paper-200">
                  <span className="font-medium text-ink-800">{p.caption}</span>
                  <br />
                  <span className="text-ink-600">Photo: {p.author} / Wikimedia Commons · {p.licence}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      <section
        className="container-page py-14 md:py-20"
        aria-labelledby="cams-h"
      >
        <p className="eyebrow">Six public feeds</p>
        <h2 id="cams-h" className="mt-1 font-display text-display-md text-ink-900 text-balance">
          Live webcam gallery
        </h2>
        <p className="mt-3 lead max-w-3xl">
          Sprint 1.3 ships the editorial shell; Sprint 2 will wire live
          embeds where the operators permit it. Until then, every tile
          links out to the operator’s own page so you’re not seeing a stale
          thumbnail pretending to be live.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CAMS.map((cam) => (
            <Card key={cam.name} as="article">
              <CardHeader eyebrow={cam.operator} title={cam.name} />
              <CardBody>
                {/* Empty-state tile — live embed arrives when the operator
                    permits it. Uses paper-100 to make the empty state honest. */}
                <div
                  className="aspect-video w-full rounded-lg bg-paper-200 border border-paper-300 flex items-center justify-center text-ink-500"
                  role="img"
                  aria-label={`${cam.name} — live embed coming soon`}
                >
                  <Icons.Camera size={32} />
                </div>
                <p className="mt-4 text-body-sm text-ink-800">{cam.description}</p>
                <div className="mt-4">
                  <Button
                    href={cam.href}
                    external
                    size="sm"
                    trailingIcon={<Icons.External size={12} />}
                  >
                    Open {cam.operator}
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        <aside className="callout mt-10">
          <p className="eyebrow">Attribution</p>
          <p className="mt-2 text-body-sm text-ink-800">
            All webcams listed on this page are public feeds operated by
            Sunshine Coast Council, Surf Life Saving Queensland, Beachsafe,
            or the Bureau of Meteorology. We don’t scrape or re-host. If
            you operate a public coastal webcam that should be listed here,{" "}
            <Link href="/contact" className="link text-ocean-700">
              drop us a line
            </Link>
            .
          </p>
        </aside>
      </section>
    </div>
  );
}
