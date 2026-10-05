import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardBody,
  CardHeader,
  Hero,
  HeroPhoto,
  Button,
  Icons,
  AffiliateBadge,
} from "@/components/ui";
import { fetchLiveBundle } from "@/lib/live-data";
import { CATEGORY_PHOTOS, HOMEPAGE_HERO } from "@/data/photos";
import { ACCOMMODATION_SUBPAGES, SITE } from "@/data/site";

/**
 * Accommodation parent page — Sprint 1.5 + v5 surgical polish.
 *
 * v5 (MSN-2959-V5-POLISH) updates:
 *   - #13/#14: editorial H1 + eyebrow overlay on the hero photo.
 *   - #21: 9 accommodation sub-pages linked via the regions/archetypes
 *     grid (Tim's locked answer #4 — full SEO-audit gap from MSN-3058 §4).
 *   - #23: CTAs tightened to action verbs.
 *   - #24: Section eyebrows more editorial ("Where to base yourself" vs "Five places...").
 *
 * The 9 sub-pages live at /accommodation/[slug] and are auto-generated
 * from ACCOMMODATION_SUBPAGES in src/data/site.ts.
 */

export const metadata: Metadata = {
  title: "Accommodation",
  description:
    "Where to stay in Noosa: 9 sub-pages across 5 regions and 3 archetypes plus a hinterland page. Booking, Stayz, Expedia, and Airbnb affiliate links with full ACCC disclosure.",
  alternates: { canonical: "/accommodation" },
  openGraph: {
    title: "Accommodation · MyNoosaHeads",
    description:
      "Independent guide to staying in Noosa. 9 sub-pages across 5 regions + 3 archetypes + hinterland. Affiliate links with full ACCC disclosure.",
    url: "/accommodation",
    type: "article",
  },
};

export default async function AccommodationPage() {
  const live = await fetchLiveBundle();
  const photos = CATEGORY_PHOTOS["accommodation"];
  const heroCredit = photos
    ? `Photo: ${photos.hero.author} / Unsplash · ${photos.hero.licence}`
    : "";
  return (
    <div className="bg-paper-50">
      {/* v5 (#14): full-bleed hero with editorial H1 + eyebrow overlay. */}
      {photos?.hero ? (
        <HeroPhoto
          src={photos.hero.url}
          alt={photos.hero.caption}
          credit={heroCredit}
          eyebrow="Accommodation · ACCC Sch 2"
          overlayTitle="Accommodation in Noosa."
          caption={photos.hero.caption}
        />
      ) : null}
      <Hero
        eyebrow="Accommodation"
        title="Accommodation in Noosa"
        subtitle={
          <>
            We don’t run a booking engine and we don’t take inventory. The
            listings on this page link out to Booking.com, Stayz, Expedia, or
            Airbnb — with our affiliate tag, where we have one. Every monetised
            link is marked <span className="chip-ocean">Affiliate</span>{" "}
            before you click, per the Competition and Consumer Act 2010 (Cth)
            Schedule 2. The full statement is in the footer.
          </>
        }
        flourish="Right town, right price, right block."
      />

      {/* ─── v5 (#21): Nine sub-pages — regions + archetypes + hinterland ─── */}
      <section className="container-page py-14 md:py-20" aria-labelledby="regions-h">
        <p className="eyebrow">Which part of town fits the trip?</p>
        <h2 id="regions-h" className="mt-1 font-display text-display-md text-ink-900 text-balance">
          Nine places to base yourself
        </h2>
        <p className="mt-3 lead max-w-3xl">
          Five regions and three archetypes, plus a hinterland page for the
          western shire. Each opens its own page with a full editorial body,
          per-page source links, and the ACCC affiliate framework slot.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ACCOMMODATION_SUBPAGES.map((sub) => (
            <Card key={sub.slug} as="article">
              <CardHeader eyebrow={sub.archetype} title={sub.name} />
              <CardBody>
                <p className="text-body-sm text-ink-800">{sub.pitch}</p>
                <p className="mt-3 text-caption text-ink-700">
                  <span className="font-semibold">Region: </span>
                  {sub.region}
                </p>
                <div className="mt-4">
                  <Link
                    href={`/accommodation/${sub.slug}`}
                    className="link text-ocean-700 text-body-sm font-medium"
                  >
                    Open {sub.name} →
                  </Link>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* ─── Inline photo gallery (kept from v2/v5) ─── */}
      {photos?.inline?.length ? (
        <section className="container-page py-14 md:py-20 border-t border-paper-200" aria-label="Accommodation photo gallery">
          <p className="eyebrow">A few of the properties</p>
          <h2 className="mt-1 font-display text-display-md text-ink-900 text-balance">
            Hastings Street, Main Beach, Noosaville
          </h2>
          <p className="mt-3 lead max-w-3xl">
            We don’t take inventory. We don’t list every property in the
            shire. The photo set below is the editorial cross-section we
            use as the basis for the booking-engine links further down —
            all photographs from Unsplash contributors who shoot Noosa
            specifically.
          </p>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {photos.inline.slice(0, 4).map((p, i) => (
              <figure key={i}>
                <div className="relative w-full overflow-hidden rounded-2xl border border-paper-200 bg-paper-100">
                  <Image
                    src={p.url}
                    alt={p.caption}
                    width={1280}
                    height={720}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <figcaption className="mt-3 text-caption text-ink-600">
                  <span className="font-medium text-ink-700">{p.caption}</span>
                  <br />
                  <span className="text-ink-600">Photo: {p.author} / Unsplash · {p.licence}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      {/* ─── Disclosure band ─── */}
      <section className="border-t border-paper-200 bg-paper-100" aria-labelledby="accc-disclosure-heading">
        <div className="container-page py-10 md:py-14">
          <p className="eyebrow">Disclosure (ACCC Sch 2)</p>
          <h2 id="accc-disclosure-heading" className="mt-1 font-display text-display-sm text-ink-900 text-balance max-w-3xl">
            Affiliate links earn us a small commission — at no cost to you.
          </h2>
          <div className="mt-5 grid gap-6 md:grid-cols-2 max-w-4xl">
            <p className="text-body text-ink-800">
              Some links on this page are affiliate links. If you book or
              purchase through them, MyNoosaHeads may earn a small commission
              at no extra cost to you. Affiliate relationships do not influence
              the editorial copy on this page — we link to the same operators
              regardless of whether they participate.
            </p>
            <p className="text-body text-ink-800">
              Our position is operator-agnostic: we list the booking engines we
              trust (Booking.com, Stayz, Expedia, Airbnb), not the operators
              that pay the highest commission. We do not run a comparison
              engine, we do not have access to your search criteria, and we
              do not see or store your booking details.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Booking engine shortcuts ─── */}
      <section className="container-page py-14 md:py-20" aria-labelledby="booking-h">
        <p className="eyebrow">Or pick a booking engine</p>
        <h2 id="booking-h" className="mt-1 font-display text-display-md text-ink-900 text-balance">
          Search Noosa Heads, QLD 4567
        </h2>
        <p className="mt-3 lead max-w-3xl">
          If you know where you want to stay and just need a booking engine,
          these four cover the AU + global inventory. Each carries our
          affiliate tag where one is available; each is marked{" "}
          <span className="chip-ocean">Affiliate</span> per ACCC Sch 2.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card as="article">
            <CardBody>
              <p className="eyebrow">Booking.com</p>
              <p className="mt-1 text-body-sm text-ink-800">
                Global booking engine. Largest inventory; strong cancellation policies on most listings.
              </p>
              <div className="mt-4">
                <Button
                  href="https://www.booking.com/searchresults.html?ss=Noosa+Heads"
                  external
                  size="sm"
                  trailingIcon={<Icons.External size={12} />}
                >
                  Search Booking.com
                  <AffiliateBadge programme="Booking.com" mode="compact" />
                </Button>
              </div>
            </CardBody>
          </Card>
          <Card as="article">
            <CardBody>
              <p className="eyebrow">Stayz</p>
              <p className="mt-1 text-body-sm text-ink-800">
                Australian holiday letting specialist. Holiday houses, apartments, pet-friendly properties.
              </p>
              <div className="mt-4">
                <Button
                  href="https://www.stayz.com.au/holiday-rental-search?query=Noosa+Heads"
                  external
                  size="sm"
                  variant="outline"
                  trailingIcon={<Icons.External size={12} />}
                >
                  Search Stayz
                  <AffiliateBadge programme="Stayz" mode="compact" />
                </Button>
              </div>
            </CardBody>
          </Card>
          <Card as="article">
            <CardBody>
              <p className="eyebrow">Airbnb</p>
              <p className="mt-1 text-body-sm text-ink-800">
                Peer-to-peer holiday letting. Hosts set their own policies; check before booking.
              </p>
              <div className="mt-4">
                <Button
                  href="https://www.airbnb.com.au/s/Noosa-Heads--Australia/homes"
                  external
                  size="sm"
                  variant="outline"
                  trailingIcon={<Icons.External size={12} />}
                >
                  Search Airbnb
                  <AffiliateBadge programme="Airbnb" mode="compact" />
                </Button>
              </div>
            </CardBody>
          </Card>
          <Card as="article">
            <CardBody>
              <p className="eyebrow">Expedia</p>
              <p className="mt-1 text-body-sm text-ink-800">
                Global booking engine. Bundle deals with flights; competitive on multi-night stays.
              </p>
              <div className="mt-4">
                <Button
                  href="https://www.expedia.com.au/Hotels?destination=Noosa+Heads"
                  external
                  size="sm"
                  variant="outline"
                  trailingIcon={<Icons.External size={12} />}
                >
                  Search Expedia
                  <AffiliateBadge programme="Expedia" mode="compact" />
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* ─── Inline weather tile (kept from v2/v5) ─── */}
      <section className="border-t border-paper-200 bg-paper-100" aria-labelledby="weather-h">
        <div className="container-page py-12">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <p className="eyebrow">Today’s conditions</p>
              <h2 id="weather-h" className="mt-1 font-display text-display-sm text-ink-900">
                Useful if you’re checking in late
              </h2>
            </div>
            <p className="text-caption text-ink-600">
              as of{" "}
              <time dateTime={live.asOf}>
                {new Date(live.asOf).toLocaleString("en-AU", {
                  timeZone: "Australia/Brisbane",
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "short",
                })}
              </time>{" "}
              AEST
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card variant="surface" as="article">
              <CardHeader eyebrow="Surf" title="" />
              <CardBody>
                <p className="font-display text-display-sm text-ink-900">{live.surf.value}</p>
                <p className="mt-1 text-caption text-ink-700">{live.surf.secondary}</p>
              </CardBody>
            </Card>
            <Card variant="surface" as="article">
              <CardHeader eyebrow="Wind" title="" />
              <CardBody>
                <p className="font-display text-display-sm text-ink-900">{live.wind.value}</p>
                <p className="mt-1 text-caption text-ink-700">{live.wind.secondary}</p>
              </CardBody>
            </Card>
            <Card variant="surface" as="article">
              <CardHeader eyebrow="Tide" title="" />
              <CardBody>
                <p className="font-display text-display-sm text-ink-900">{live.tide.value}</p>
                <p className="mt-1 text-caption text-ink-700">{live.tide.secondary}</p>
              </CardBody>
            </Card>
            <Card variant="surface" as="article">
              <CardHeader eyebrow="UV" title="" />
              <CardBody>
                <p className="font-display text-display-sm text-ink-900">{live.uv.value}</p>
                <p className="mt-1 text-caption text-ink-700">{live.uv.secondary}</p>
              </CardBody>
            </Card>
          </div>
          <p className="mt-4 text-caption text-ink-600">
            Tiles from BOM Capricornia–Hervey Bay + Open-Meteo. {live.sourceNote}
          </p>
        </div>
      </section>
    </div>
  );
}