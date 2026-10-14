import Link from "next/link";
import * as React from "react";
import Image from "next/image";
import { fetchLiveBundle } from "@/lib/live-data";
import { fetchBeachReport } from "@/lib/beach-data";
import {
  Hero,
  HeroPhoto,
  LiveDataWidget,
  LiveDataGrid,
  Button,
  Card,
  CardBody,
  CardHeader,
  Icons,
  ContentCard,
  Carousel,
  Accordion,
  EditorialGrid,
  BeachReport,
  LocationPhoto as LocationPhotoView,
} from "@/components/ui";
import { AreaHeroes } from "@/components/illustrations/AreaHeroes";
import { Scenes } from "@/components/illustrations/Scenes";
import {
  SITE,
  FEATURED_AREAS,
  THINGS_TO_DO,
  WHERE_TO_STAY,
  WEBCAMS,
  GETTING_HERE,
  EAT_AND_DRINK,
  NOOSA_RIGHT_NOW,
  WHATS_ON_THIS_WEEK,
  FAQ_ITEMS,
} from "@/data/site";
import { HOMEPAGE_HERO, HOMEPAGE_SECTIONS } from "@/data/photos";
import type { LocationPhoto } from "@/data/photos";
import { ITINERARIES } from "@/data/itineraries";

/**
 * Homepage — v6.1.1 (MSN-2962-V6.1.1-PHOTO-INTEGRATION, 2026-10-12).
 *
 * v6.1.1 ship over v6.1:
 *   - Photo integration: 49 curated Unsplash photos replaced with
 *     42 verified location-specific Wikimedia Commons photos
 *     (CC-BY-SA 4.0 / CC-BY 2.0 / public domain / CC0 1.0) +
 *     7 bespoke SVG fallbacks for the locations with no open-licence
 *     photo (Sunshine Beach; six named eat-and-drink venues;
 *     pet-friendly / family / accessible). All per Albert's
 *     `mynoosaheads-photo-manifest-2026-10-12.md`.
 *   - 4 ESLint `<img>` → `<Image>` conversions (page.tsx, ContentCard,
 *     Lightbox, MegaMenu) — zero warnings.
 *   - S9 Webcams: 4 distinct photos (was: same hero on all 4 in v6.1).
 *   - S7 Eat & drink: 6 venue-specific SVG illustrations (was:
 *     recycled where-to-stay photos).
 *
 * Layout per Albert's v6 spec §2.1 (P0 + P1):
 *   1.  S1  Hero                   (v6 P0; refined — Commons aerial)
 *   2.  S2  Live conditions        (v6.1 P1; carry)
 *   3.  S3  Featured areas grid    (v6 P0; 6 photo cards, 1 SVG)
 *   4.  S4  Things to do           (v6 P0; 8 cards in scroll-snap rail)
 *   5.  S5  Where to stay          (v6 P0; 6 cross-section cards, 2 SVG)
 *   6.  S7  Eat & drink strip      (v6.1 P1; 6 SVG venue tiles)
 *   7.  S6  Plan your trip hub     (v6 P0; 3 cards)
 *   8.  S8  Noosa right now        (v6.1 P1; 4 editorial cards)
 *   9.  S9  Webcams strip          (v6 P0; 4 distinct tiles, 1 SVG)
 *  10.  S10 Getting here           (v6 P0; 5 transport modes, 1 hero)
 *  11.  S13 What's on this week    (v6.1 P1; 6 events)
 *  12.  S15 FAQ accordion          (v6.1 P1; 8 questions)
 *  13.  Disclosure band            (v5 carry; 97-word ACCC band)
 *  14.  S16 Footer                 (v5 carry; column 1 uses new IA)
 */
export default async function HomePage() {
  const live = await fetchLiveBundle();
  // v6.3 (MSN-2964) Phase E — beach report for the homepage compact variant.
  const beach = await fetchBeachReport();

  // v6.1.1 (MSN-2962): LocalBusiness JSON-LD structured data on the
  // homepage per Albert's §10 launch bar #9 (SEO structured data).
  // No personal names, no operator identity — generic "LocalBusiness"
  // with anonymous publisher; address region is the Sunshine Coast /
  // Noosa Shire, AU.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "MyNoosaHeads",
    description:
      "An independent, sourced, slow-guide field manual for Noosa Heads — surf, weather, the national park, accommodation, and the local rules.",
    url: SITE.productionUrl,
    image: `${SITE.productionUrl}/og-image.jpg`,
    address: {
      "@type": "PostalAddress",
      addressRegion: "Queensland",
      addressCountry: "AU",
      addressLocality: "Noosa Heads",
    },
    areaServed: [
      { "@type": "Place", name: "Noosa Heads" },
      { "@type": "Place", name: "Noosaville" },
      { "@type": "Place", name: "Tewantin" },
      { "@type": "Place", name: "Sunshine Beach" },
      { "@type": "Place", name: "Peregian Beach" },
      { "@type": "Place", name: "Noosa Hinterland" },
    ],
    knowsAbout: [
      "Surf reports",
      "Tide tables",
      "Noosa National Park",
      "Bureau of Meteorology marine forecasts",
      "Queensland Parks and Wildlife Service alerts",
    ],
  };

  return (
    <div className="bg-paper-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ─── S1: Hero (P0; refined from v5) ─── */}
      <HeroPhoto
        src={HOMEPAGE_HERO.kind === "commons" ? HOMEPAGE_HERO.url : ""}
        alt={HOMEPAGE_HERO.kind === "commons" ? HOMEPAGE_HERO.altText : HOMEPAGE_HERO.caption}
        credit={
          HOMEPAGE_HERO.kind === "commons"
            ? `Photo: ${HOMEPAGE_HERO.author} / Wikimedia Commons · ${HOMEPAGE_HERO.licence}`
            : `Illustration: ${HOMEPAGE_HERO.author} · ${HOMEPAGE_HERO.licence}`
        }
        eyebrow={`${SITE.region} · independent editorial`}
        overlayTitle="By the headland, by the bar."
        caption={HOMEPAGE_HERO.caption}
      />
      <Hero
        eyebrow="MyNoosaHeads"
        title="By the headland, by the bar."
        subtitle={
          <>
            MyNoosaHeads is a slow-guide field manual for Noosa Heads — surf
            and weather, the national park, accommodation, and the local
            rules that keep everyone on the right side of a south-east
            swell. Built slowly, sourced always, never fabricated.
          </>
        }
        flourish="Plan your Noosa trip well."
        actions={
          <>
            <Button
              href="/surf-and-weather"
              leadingIcon={<Icons.Wave size={16} />}
              size="lg"
            >
              Read today’s surf report
            </Button>
            <Button
              href="/noosa-national-park"
              variant="outline"
              size="lg"
              trailingIcon={<Icons.ChevronRight size={16} />}
            >
              Check park alerts
            </Button>
          </>
        }
      />

      {/* ─── S2: Live conditions (carry from v5; P1 polish deferred) ─── */}
      <section
        className="border-t border-paper-200 bg-paper-100"
        aria-labelledby="live-data-heading"
      >
        <div className="container-page py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
            <div>
              <p className="eyebrow">Live conditions</p>
              <h2
                id="live-data-heading"
                className="mt-1 font-display text-display-md text-ink-900 text-balance"
              >
                What the coast is doing right now
              </h2>
              <p className="mt-2 text-body-sm text-ink-700 max-w-2xl">
                Drawn from the Bureau of Meteorology’s Capricornia–Hervey
                Bay marine district and Open-Meteo’s free marine API. Refresh
                every 30 minutes; if a tile falls out, it shows an{" "}
                <span className="text-ocean-900">Unavailable</span> badge
                rather than guessing.
              </p>
            </div>
            <p className="text-caption text-ink-600">
              Last refresh:{" "}
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
          <LiveDataGrid>
            <LiveDataWidget
              kind="surf"
              title="Surf — Noosa Heads"
              value={live.surf.value}
              secondary={live.surf.secondary}
              source={live.surf.source}
              asOf={live.asOf}
              state={live.surf.state}
              href="/surf-and-weather"
            />
            <LiveDataWidget
              kind="wind"
              title="Wind — coast"
              value={live.wind.value}
              secondary={live.wind.secondary}
              source={live.wind.source}
              asOf={live.asOf}
              state={live.wind.state}
              href="/surf-and-weather"
            />
            <LiveDataWidget
              kind="tide"
              title="Tide — Tewantin"
              value={live.tide.value}
              secondary={live.tide.secondary}
              source={live.tide.source}
              asOf={live.asOf}
              state={live.tide.state}
              href="/surf-and-weather"
            />
            <LiveDataWidget
              kind="uv"
              title="UV index"
              value={live.uv.value}
              secondary={live.uv.secondary}
              source={live.uv.source}
              asOf={live.asOf}
              state={live.uv.state}
              href="/surf-and-weather"
            />
            <LiveDataWidget
              kind="sun-moon"
              title="Sun &amp; moon"
              value={live.sunMoon.value}
              secondary={live.sunMoon.secondary}
              source={live.sunMoon.source}
              asOf={live.asOf}
              state={live.sunMoon.state}
              href="/surf-and-weather"
            />
            <LiveDataWidget
              kind="alerts"
              title="Park &amp; road alerts"
              value="See QPWS"
              secondary="Track closures, wildlife, and Bruce Highway conditions."
              source="QPWS · QLD Traffic"
              state="fresh"
              href="/noosa-national-park"
            />
          </LiveDataGrid>
          <p className="mt-4 text-caption text-ink-600">{live.sourceNote}</p>
        </div>
      </section>

      {/* ─── S3: Featured areas (P0; v6.3 EditorialGrid treatment) ─── */}
      {/* v6.3 (MSN-2964) Phase B: editorial 2x2 / asymmetric grid replaces
       * v6.2's uniform 3-column card layout. Matches visitnoosa.com.au's
       * register (hero strip + 2-column main + 1-column accent). */}
      <EditorialGrid
        eyebrow="A small guide to a small shire"
        heading="Pick where you want to start"
        intro="The shire is small enough to cover properly. We organise MyNoosaHeads around six places locals actually base themselves — from the headland to Peregian, with the national park in the middle."
        layout="feature"
        seeAllHref="/things-to-do"
        seeAllLabel="See all eight areas →"
        items={FEATURED_AREAS.map((area) => {
          const photo: LocationPhoto =
            HOMEPAGE_SECTIONS.featuredAreas[area.imageIndex];
          return {
            id: area.slug,
            title: area.name,
            tagline: area.tagline,
            href: area.href,
            ctaLabel: area.cta,
            eyebrow: area.name,
            photo,
          };
        })}
      />

      {/* ─── S4: Things to do (P0; 8 cards in a scroll-snap rail) ─── */}
      <section
        className="border-t border-paper-200 bg-paper-100"
        aria-labelledby="things-to-do-heading"
      >
        <div className="container-page py-14 md:py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <div>
              <p className="eyebrow">Things locals actually do</p>
              <h2
                id="things-to-do-heading"
                className="mt-1 font-display text-display-md text-ink-900 text-balance"
              >
                Things to do in Noosa
              </h2>
              <p className="mt-3 lead max-w-2xl">
                Eight experiences locals do on a Tuesday, with the tide and
                the swell in mind. Pricing is indicative; verify before
                relying on it.
              </p>
            </div>
            <Link
              href="/things-to-do"
              className="link text-ocean-700 text-body-sm font-medium hover-underline"
            >
              See all things to do →
            </Link>
          </div>
          <div className="mt-8 -mx-4 sm:-mx-6 lg:-mx-10">
            <Carousel
              ariaLabel="Things to do in Noosa"
              slideCount={THINGS_TO_DO.length}
            >
              {THINGS_TO_DO.map((item, i) => {
                const photo: LocationPhoto =
                  HOMEPAGE_SECTIONS.thingsToDo[i];
                return (
                  <ContentCard
                    key={item.title}
                    image={photo.kind === "commons" ? photo.url : ""}
                    imageAlt={photo.kind === "commons" ? photo.altText : photo.caption}
                    imageCredit={
                      photo.kind === "commons"
                        ? `Photo: ${photo.author} / Wikimedia Commons · ${photo.licence}`
                        : `Illustration: ${photo.author} · ${photo.licence}`
                    }
                    imageAspect="3/2"
                    eyebrow={`Experience ${i + 1}`}
                    title={item.title}
                    meta={`${item.duration} · ${item.priceFrom}`}
                    disclosure={"disclosure" in item ? item.disclosure : undefined}
                    cta={{ label: "Book →", href: item.href }}
                  />
                );
              })}
            </Carousel>
          </div>
        </div>
      </section>

      {/* ─── S5: Where to stay (P0; 6 cross-section cards) ─── */}
      <section
        className="container-page py-14 md:py-20"
        aria-labelledby="where-to-stay-heading"
      >
        <p className="eyebrow">Where to base yourself</p>
        <h2
          id="where-to-stay-heading"
          className="mt-1 font-display text-display-md text-ink-900 text-balance"
        >
          Where to stay in Noosa
        </h2>
        <p className="mt-3 lead max-w-3xl">
          Six cross-section stays that span the shire. We link out to
          Booking.com, Stayz, and Airbnb via affiliate programmes; every
          monetised link is marked before you click.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHERE_TO_STAY.map((stay) => {
            const photo: LocationPhoto =
              HOMEPAGE_SECTIONS.whereToStay[stay.imageIndex];
            if (photo.kind === "svg") {
              return (
                <WhereToStaySvgCard
                  key={stay.name}
                  stay={stay}
                  photo={photo}
                />
              );
            }
            return (
              <ContentCard
                key={stay.name}
                image={photo.url}
                imageAlt={photo.altText}
                imageCredit={`Photo: ${photo.author} / Wikimedia Commons · ${photo.licence}`}
                imageAspect="3/2"
                eyebrow={stay.area}
                title={stay.name}
                meta={stay.priceFrom}
                disclosure="Affiliate"
                cta={{ label: "View →", href: stay.href }}
              />
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/accommodation"
            className="link text-ocean-700 text-body font-medium hover-underline"
          >
            See all accommodation →
          </Link>
        </div>
      </section>

      {/* ─── S7: Eat & drink strip (v6.1 P1; 6 venues) ─── */}
      <section
        className="border-t border-paper-200 bg-paper-100"
        aria-labelledby="eat-and-drink-heading"
      >
        <div className="container-page py-14 md:py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <div>
              <p className="eyebrow">Where the table is set</p>
              <h2
                id="eat-and-drink-heading"
                className="mt-1 font-display text-display-md text-ink-900 text-balance"
              >
                Eat &amp; drink in Noosa
              </h2>
              <p className="mt-3 lead max-w-2xl">
                Six venues locals actually go back to — a riverside
                Japanese, a Hastings Street seafood icon, and a Junction
                brunch spot that has been quietly nailing eggs since
                before the visitors found it.
              </p>
            </div>
            <Link
              href="/things-to-do#eat-and-drink"
              className="link text-ocean-700 text-body-sm font-medium hover-underline"
            >
              See all eat &amp; drink →
            </Link>
          </div>
          <div className="mt-8 -mx-4 sm:-mx-6 lg:-mx-10">
            <Carousel
              ariaLabel="Eat and drink venues"
              slideCount={EAT_AND_DRINK.length}
            >
              {EAT_AND_DRINK.map((venue, i) => {
                const photo: LocationPhoto =
                  HOMEPAGE_SECTIONS.eatAndDrink[i];
                return (
                  <EatDrinkVenueCard
                    key={venue.name}
                    venue={venue}
                    photo={photo}
                  />
                );
              })}
            </Carousel>
          </div>
        </div>
      </section>

      {/* ─── S6: Plan your trip hub (carry from v5; P1 polish deferred) ─── */}
      <section
        className="border-t border-paper-200 bg-paper-100"
        aria-labelledby="plan-hub-h"
      >
        <div className="container-page py-14 md:py-20">
          <p className="eyebrow">Plan your trip</p>
          <h2
            id="plan-hub-h"
            className="mt-1 font-display text-display-md text-ink-900 text-balance"
          >
            Three ways in
          </h2>
          <p className="mt-3 lead max-w-3xl">
            Pick the path that fits the trip. The full planning surface —
            school holidays, accessibility, dog rules, emergencies, budget —
            lives at <Link href="/plan" className="link text-ocean-700 hover-underline">/plan</Link>.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Card as="article">
              <CardHeader eyebrow="New to Noosa" title="" />
              <CardBody>
                <p className="text-body-sm text-ink-800">
                  Start with the surf report — the highest-frequency page a
                  first-timer opens each morning. Then the national park,
                  then the bar-crossing bulletin.
                </p>
                <div className="mt-4">
                  <Button href="/surf-and-weather" size="sm" variant="outline">
                    Read the surf report →
                  </Button>
                </div>
              </CardBody>
            </Card>
            <Card as="article">
              <CardHeader eyebrow="Returning visitor" title="" />
              <CardBody>
                <p className="text-body-sm text-ink-800">
                  The locals-utility pages. Park alerts, council webcams,
                  and the hinterland walks you keep meaning to do.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button href="/noosa-national-park" size="sm" variant="outline">
                    Park alerts
                  </Button>
                  <Button href="/webcams" size="sm" variant="outline">
                    Webcams
                  </Button>
                </div>
              </CardBody>
            </Card>
            <Card as="article">
              <CardHeader eyebrow="On a deadline" title="" />
              <CardBody>
                <p className="text-body-sm text-ink-800">
                  Read this and you’ll know whether the bar is open, the
                  highway is closed, and the next high tide is at what hour.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button href="/webcams" size="sm" variant="outline">
                    Webcams
                  </Button>
                  <Button href="/boats-and-watercraft" size="sm" variant="outline">
                    Bar crossing
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
          <div className="mt-8">
            <Link href="/plan" className="link text-ocean-700 text-body font-medium hover-underline">
              Open the full /plan hub →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── S8: Noosa right now (v6.1 P1; editorial rail) ─── */}
      <section
        className="container-page py-14 md:py-20"
        aria-labelledby="noosa-right-now-heading"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <p className="eyebrow">Noosa right now</p>
            <h2
              id="noosa-right-now-heading"
              className="mt-1 font-display text-display-md text-ink-900 text-balance"
            >
              What the shire is up to
            </h2>
            <p className="mt-3 lead max-w-2xl">
              Curated weekly — this weekend’s markets, current park and
              road alerts, the moon phase for evening fish, and the
              school-holiday countdown. Updated every Friday.
            </p>
          </div>
          <Link
            href="/things-to-do#events"
            className="link text-ocean-700 text-body-sm font-medium hover-underline"
          >
            See all events →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {NOOSA_RIGHT_NOW.map((item, i) => {
            const SceneComp = (() => {
              switch (item.scene) {
                case "market":
                  return Scenes.MarketStall;
                case "alert":
                  return Scenes.HeadlandOutline;
                case "moon":
                  return Scenes.Sunset;
                case "calendar":
                  return Scenes.MapPin;
                default:
                  return Scenes.PalmCluster;
              }
            })();
            return (
              <article
                key={item.title}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-paper-200 bg-paper-50 shadow-sm hover-lift"
              >
                <div className="hover-scale-img aspect-[4/3] w-full bg-paper-100">
                  <SceneComp className="h-full w-full" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="eyebrow">{item.eyebrow}</p>
                  <h3 className="mt-1 font-display text-headline-lg text-ink-900 text-balance">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-body-sm text-ink-700 text-pretty flex-1">
                    {item.sub}
                  </p>
                  <div className="mt-4">
                    <Link
                      href={item.href}
                      className="link text-ocean-700 text-body-sm font-medium hover-underline"
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ─── S9: Webcams strip (P0; 4 tiles) ─── */}
      <section
        className="container-page py-14 md:py-20"
        aria-labelledby="webcams-heading"
      >
        <p className="eyebrow">See what the coast is doing</p>
        <h2
          id="webcams-heading"
          className="mt-1 font-display text-display-md text-ink-900 text-balance"
        >
          Webcams
        </h2>
        <p className="mt-3 lead max-w-3xl">
          Council cams and SLSQ flags. We don’t scrape; we link. Each tile
          opens the operator’s page so you can confirm what the buoy is
          telling you.
        </p>
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {WEBCAMS.map((cam, i) => {
            const photo: LocationPhoto = HOMEPAGE_SECTIONS.webcams[i] ?? HOMEPAGE_HERO;
            if (photo.kind === "svg") {
              return (
                <WebcamSvgCard key={cam.name} cam={cam} photo={photo} />
              );
            }
            return (
              <ContentCard
                key={cam.name}
                image={photo.url}
                imageAlt={`${cam.name} webcam — static preview, opens the live feed on click`}
                imageCredit={`Photo: ${photo.author} / Wikimedia Commons · ${photo.licence}`}
                imageAspect="1/1"
                eyebrow={cam.location}
                title={cam.name}
                meta="Live feed via operator"
                cta={{ label: "View live →", href: cam.href }}
              />
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/webcams"
            className="link text-ocean-700 text-body font-medium hover-underline"
          >
            Open all council cams →
          </Link>
        </div>
      </section>

      {/* ─── S10: Getting here (P0; 5 transport modes + hero photo) ─── */}
      <section
        className="border-t border-paper-200 bg-paper-100"
        aria-labelledby="getting-here-heading"
      >
        <div className="container-page py-14 md:py-20">
          <div className="grid gap-10 md:grid-cols-2 items-start">
            <div>
              <p className="eyebrow">Getting here</p>
              <h2
                id="getting-here-heading"
                className="mt-1 font-display text-display-md text-ink-900 text-balance"
              >
                Three ways in, one coast
              </h2>
              <p className="mt-3 lead max-w-xl">
                Driving times are typical, in good conditions, free of
                incidents. For live road conditions, see{" "}
                <Link
                  href="https://qldtraffic.qld.gov.au/"
                  className="link text-ocean-700 hover-underline"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  QLD Traffic
                </Link>
                .
              </p>
              <ul className="mt-8 divide-y divide-paper-200 border-y border-paper-200">
                {GETTING_HERE.map((row) => {
                  const Icon =
                    row.icon === "Car"
                      ? Icons.Car
                      : row.icon === "Plane"
                        ? Icons.Plane
                        : row.icon === "Bus"
                          ? Icons.Bus
                          : row.icon === "Anchor"
                            ? Icons.Anchor
                            : Icons.Map;
                  const inner = (
                    <>
                      <span className="shrink-0 text-eucalyptus-600">
                        <Icon size={22} />
                      </span>
                      <span className="ml-4 flex-1">
                        <span className="block font-display text-headline-lg text-ink-900 text-balance">
                          {row.mode}
                        </span>
                        <span className="block text-caption text-ink-700">
                          {row.duration}
                        </span>
                      </span>
                      <Icons.ChevronRight
                        size={16}
                        className="shrink-0 text-ink-600"
                      />
                    </>
                  );
                  return (
                    <li key={row.mode}>
                      {"external" in row && row.external ? (
                        <a
                          href={row.href}
                          rel="noopener noreferrer"
                          target="_blank"
                          className="flex items-center py-4 hover:bg-paper-50 -mx-3 px-3 rounded-md transition-colors duration-base ease-out"
                        >
                          {inner}
                        </a>
                      ) : (
                        <Link
                          href={row.href}
                          className="flex items-center py-4 hover:bg-paper-50 -mx-3 px-3 rounded-md transition-colors duration-base ease-out"
                        >
                          {inner}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/travel-and-transport" size="md">
                  Plan your drive →
                </Button>
                <Button
                  href="https://www.noosaferry.com/"
                  size="md"
                  variant="outline"
                  external
                >
                  See the ferry timetable
                </Button>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-paper-200 hover-scale-img">
              <Image
                src={HOMEPAGE_SECTIONS.gettingHere.kind === "commons" ? HOMEPAGE_SECTIONS.gettingHere.url : ""}
                alt={HOMEPAGE_SECTIONS.gettingHere.kind === "commons" ? HOMEPAGE_SECTIONS.gettingHere.altText : HOMEPAGE_SECTIONS.gettingHere.caption}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
              />
              <figcaption className="absolute bottom-2 right-2 rounded-pill bg-ink-900/70 px-2 py-0.5 text-[10px] text-paper-100">
                {HOMEPAGE_SECTIONS.gettingHere.kind === "commons"
                  ? `Photo: ${HOMEPAGE_SECTIONS.gettingHere.author} / Wikimedia Commons`
                  : `Illustration: ${HOMEPAGE_SECTIONS.gettingHere.author}`}
              </figcaption>
            </div>
          </div>
        </div>
      </section>

      {/* ─── S13: What's on this week (v6.1 P1; 6 events) ─── */}
      <section
        className="container-page py-14 md:py-20"
        aria-labelledby="whats-on-heading"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <p className="eyebrow">What’s on this week</p>
            <h2
              id="whats-on-heading"
              className="mt-1 font-display text-display-md text-ink-900 text-balance"
            >
              Up on the shire
            </h2>
            <p className="mt-3 lead max-w-2xl">
              Six events across the next seven days. Curated manually; live
              feeds are a v6.2+ item (no Eventbrite API in the A$0
              budget). The full list lives at{" "}
              <Link href="/things-to-do#events" className="link text-ocean-700 hover-underline">
                things to do
              </Link>
              .
            </p>
          </div>
          <Link
            href="/things-to-do#events"
            className="link text-ocean-700 text-body-sm font-medium hover-underline"
          >
            See all events →
          </Link>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHATS_ON_THIS_WEEK.map((event) => {
            const CategoryIcon = (() => {
              switch (event.category) {
                case "MARKET":
                  return Icons.Market;
                case "LIVE MUSIC":
                  return Icons.Music;
                case "FESTIVAL":
                  return Icons.Sparkle;
                case "EXHIBITION":
                  return Icons.Frame;
                case "FAMILY":
                  return Icons.Family;
                case "COMMUNITY":
                  return Icons.Community;
                default:
                  return Icons.CalendarEvent;
              }
            })();
            return (
              <li
                key={`${event.date}-${event.title}`}
                className="group relative flex flex-col gap-3 overflow-hidden rounded-xl border border-paper-200 bg-paper-50 p-4 shadow-sm hover-lift sm:flex-row sm:items-stretch sm:p-5"
              >
                <time
                  dateTime={event.date}
                  className="flex shrink-0 flex-col items-center justify-center rounded-lg bg-eucalyptus-50 px-3 py-2 sm:w-20 sm:py-4"
                  aria-label={`${event.date} — ${event.day} ${event.month}`}
                >
                  <span className="font-display text-display-md text-eucalyptus-900 leading-none">
                    {event.day}
                  </span>
                  <span className="mt-1 text-caption uppercase tracking-[0.16em] text-eucalyptus-700">
                    {event.month}
                  </span>
                </time>
                <div className="flex flex-1 flex-col">
                  <span className="flex items-center gap-1.5 text-caption font-semibold uppercase tracking-[0.16em] text-ocean-900">
                    <CategoryIcon size={14} aria-hidden="true" />
                    {event.category}
                  </span>
                  <h3 className="mt-1 font-display text-headline-lg text-ink-900 text-balance">
                    {event.title}
                  </h3>
                  <p className="mt-1 text-body-sm text-ink-700">
                    {event.venue}
                  </p>
                  <div className="mt-3">
                    <Link
                      href={event.href}
                      className="link text-ocean-700 text-body-sm font-medium hover-underline"
                    >
                      View details →
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ─── S15: FAQ accordion (v6.1 P1; 8 questions) ─── */}
      <section
        className="border-t border-paper-200 bg-paper-100"
        aria-labelledby="faq-heading"
      >
        <div className="container-page py-14 md:py-20">
          <div className="grid gap-10 md:grid-cols-3 md:items-start">
            <div>
              <p className="eyebrow">Frequently asked</p>
              <h2
                id="faq-heading"
                className="mt-1 font-display text-display-md text-ink-900 text-balance"
              >
                Common visitor questions
              </h2>
              <p className="mt-3 lead">
                Eight things people ask first. Answers are sourced from
                the council, QPWS, BOM, and MSQ — each links back to the
                canonical page. Still have a question?{" "}
                <Link href="/contact" className="link text-ocean-700 hover-underline">
                  Get in touch
                </Link>
                .
              </p>
            </div>
            <div className="md:col-span-2">
              <Accordion
                items={FAQ_ITEMS.map((item) => {
                  const iconMap: Record<string, React.ReactNode> = {
                    Pin: <Icons.Pin size={20} aria-hidden="true" />,
                    Pets: <Icons.Pets size={20} aria-hidden="true" />,
                    CalendarEvent: (
                      <Icons.CalendarEvent size={20} aria-hidden="true" />
                    ),
                    Phone: <Icons.Phone size={20} aria-hidden="true" />,
                    Wheelchair: (
                      <Icons.Wheelchair size={20} aria-hidden="true" />
                    ),
                    Wave: <Icons.Wave size={20} aria-hidden="true" />,
                    Boat: <Icons.Boat size={20} aria-hidden="true" />,
                  };
                  return {
                    question: item.question,
                    answer: item.answer,
                    icon: iconMap[item.iconKey] ?? (
                      <Icons.Question size={20} aria-hidden="true" />
                    ),
                  };
                })}
                ariaLabel="Frequently asked questions"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── v6.3 S-Beach: Beach report (compact variant on homepage) ─── */}
      <section
        className="border-t border-paper-200 bg-paper-100"
        aria-labelledby="beach-report-heading"
      >
        <div className="container-page py-12 md:py-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow">Beach report · live</p>
              <h2
                id="beach-report-heading"
                className="mt-1 font-display text-display-md text-ink-900 text-balance"
              >
                What the bay is doing right now
              </h2>
              <p className="mt-2 lead max-w-2xl">
                Open BOM + Open-Meteo data. Patrolled status is a static
                seasonal note — we don’t scrape QPWS; check their page for
                live closures.
              </p>
            </div>
            <Link
              href="/beaches"
              className="link text-ocean-700 text-body font-medium hover-underline"
            >
              Open the full beach report →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <BeachReport data={beach} variant="compact" />
            <BeachReport
              data={{
                ...beach,
                beach: "Sunshine Beach",
              }}
              variant="compact"
            />
            <BeachReport
              data={{
                ...beach,
                beach: "Main Beach · North",
              }}
              variant="compact"
            />
          </div>
        </div>
      </section>

      {/* ─── v6.3 S-Itineraries: 4 themed 3-day itineraries ─── */}
      <section
        className="container-page py-12 md:py-16"
        aria-labelledby="itineraries-heading"
      >
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">4 themed itineraries</p>
            <h2
              id="itineraries-heading"
              className="mt-1 font-display text-display-md text-ink-900 text-balance"
            >
              Three-day starting points
            </h2>
            <p className="mt-2 lead max-w-2xl">
              Four editors-curated 3-day itineraries. Pick the one that
              fits the trip — or build your own.
            </p>
          </div>
          <Link
            href="/plan-your-trip"
            className="link text-ocean-700 text-body font-medium hover-underline"
          >
            Build your own →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {ITINERARIES.map((it) => (
            <Link
              key={it.slug}
              href={`/itineraries/${it.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-paper-200 bg-paper-50 shadow-sm hover-lift"
            >
              <div className="hover-scale-img relative aspect-[4/3] w-full bg-paper-100">
                <Image
                  src={it.hero.src}
                  alt={it.hero.alt}
                  width={800}
                  height={600}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="eyebrow">{it.eyebrow}</p>
                <h3 className="mt-2 font-display text-headline-lg text-ink-900 text-balance">
                  {it.title}
                </h3>
                <span className="mt-auto inline-flex items-center gap-1 text-body-sm font-medium text-ocean-700 pt-3">
                  Open the itinerary →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── v6.3 S-Planner: Trip planner CTA ─── */}
      <section
        className="border-t border-paper-200 bg-paper-100"
        aria-labelledby="planner-cta-heading"
      >
        <div className="container-page py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-2 items-start">
            <div>
              <p className="eyebrow">Plan your trip · 4 questions</p>
              <h2
                id="planner-cta-heading"
                className="mt-1 font-display text-display-md text-ink-900 text-balance"
              >
                Build your own 3-day itinerary
              </h2>
              <p className="mt-3 lead">
                Four questions — month, who, what, where — and the planner
                builds a personalised 3-day itinerary with a BOM weather
                snapshot and a Save-to-PDF button. Your answers live in
                this browser only; no account, no email.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/plan-your-trip" size="lg">
                  Open the trip planner →
                </Button>
                <Button href="/plan" variant="outline" size="lg">
                  Open the /plan hub
                </Button>
              </div>
            </div>
            <ul className="grid grid-cols-2 gap-3 text-body-sm text-ink-800">
              <li className="rounded-xl border border-paper-200 bg-paper-50 p-3">
                <strong className="block font-display text-headline-md text-ink-900">When</strong>
                BOM averages · QLD school-holiday awareness
              </li>
              <li className="rounded-xl border border-paper-200 bg-paper-50 p-3">
                <strong className="block font-display text-headline-md text-ink-900">Who</strong>
                Party size · ages · pet · accessibility
              </li>
              <li className="rounded-xl border border-paper-200 bg-paper-50 p-3">
                <strong className="block font-display text-headline-md text-ink-900">What</strong>
                Surf · SUP · kayak · hike · swim · fish · eat · market · spa
              </li>
              <li className="rounded-xl border border-paper-200 bg-paper-50 p-3">
                <strong className="block font-display text-headline-md text-ink-900">Stay</strong>
                Budget band · area preference
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─── Disclosure band (carry from v5) ─── */}
      <section
        className="border-t border-paper-200 bg-paper-100"
        aria-labelledby="disclosure-heading"
      >
        <div className="container-page py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-3 items-start">
            <div className="md:col-span-2">
              <p className="eyebrow">How we make money</p>
              <h2
                id="disclosure-heading"
                className="mt-1 font-display text-display-md text-ink-900 text-balance"
              >
                Editorial first. Disclosure second.
              </h2>
              <p className="mt-3 lead max-w-2xl">
                MyNoosaHeads is independent. We don’t run a newsletter, we
                don’t collect email addresses, and we don’t operate a login.
                Where a page contains a monetised link — typically
                accommodation bookings — we mark it{" "}
                <span className="chip-ocean">Affiliate</span>{" "}
                before you click. The full statement, including which
                affiliate programmes we participate in, sits in the
                footer.
              </p>
            </div>
            <Card variant="surface" as="aside">
              <CardBody>
                <p className="eyebrow">What we don’t do</p>
                <ul className="mt-3 space-y-2 text-body-sm text-ink-800 list-disc pl-5">
                  <li>No newsletter, no email capture</li>
                  <li>No AI-generated photography</li>
                  <li>No fabricated reviews or stats</li>
                  <li>No pop-ups, no login walls</li>
                </ul>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

/* =====================================================================
 * v6.1.1 helper components — S3/S5/S7/S9 card variants for SVG
 * fallback photos.
 *
 * The four sections (featured areas, where-to-stay, eat-and-drink,
 * webcams) have at least one card that uses a bespoke SVG illustration
 * (Sunshine Beach, Wasabi, Sails, Berardo's, Sum Yung Guys, Bistro C,
 * Locale, pet-friendly, family, accessible). These wrappers render the
 * SVG in a card layout consistent with ContentCard, but without going
 * through the next/image pipeline (SVGs inline directly into the DOM).
 * ===================================================================== */

function FeaturedAreaSvgCard({
  area,
  photo,
}: {
  area: { slug: string; name: string; tagline: string; cta: string; href: string };
  photo: LocationPhoto;
}) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-paper-200 bg-paper-50 shadow-sm hover-lift">
      <div className="hover-scale-img relative aspect-[3/2] w-full bg-paper-100">
        <LocationPhotoView photo={photo} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow">{area.name}</p>
        <p className="mt-2 text-body-sm text-ink-800 text-pretty flex-1">
          {area.tagline}
        </p>
        <div className="mt-4">
          <Link
            href={area.href}
            aria-label={`${area.name} — ${area.cta}`}
            className="link text-ocean-700 text-body-sm font-medium hover-underline"
          >
            {area.cta} →
          </Link>
        </div>
      </div>
      <figcaption className="absolute bottom-2 right-2 rounded-pill bg-ink-900/70 px-2 py-0.5 text-[10px] text-paper-100 opacity-0 transition-opacity duration-base ease-out group-hover:opacity-100">
        Illustration: {photo.author}
      </figcaption>
    </article>
  );
}

function WhereToStaySvgCard({
  stay,
  photo,
}: {
  stay: { name: string; area: string; priceFrom: string; href: string };
  photo: LocationPhoto;
}) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-paper-200 bg-paper-50 shadow-sm hover-lift">
      <div className="hover-scale-img relative aspect-[3/2] w-full bg-paper-100">
        <LocationPhotoView photo={photo} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow">{stay.area}</p>
        <h3 className="mt-1 font-display text-headline-lg text-ink-900 text-balance">
          {stay.name}
        </h3>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-caption text-ink-700">{stay.priceFrom}</span>
          <span className="pill-disclosure">Affiliate</span>
        </div>
        <div className="mt-4">
          <Link
            href={stay.href}
            aria-label={`${stay.name} — View`}
            className="link text-ocean-700 text-body-sm font-medium hover-underline"
          >
            View →
          </Link>
        </div>
      </div>
      <figcaption className="absolute bottom-2 right-2 rounded-pill bg-ink-900/70 px-2 py-0.5 text-[10px] text-paper-100 opacity-0 transition-opacity duration-base ease-out group-hover:opacity-100">
        Illustration: {photo.author}
      </figcaption>
    </article>
  );
}

function EatDrinkVenueCard({
  venue,
  photo,
}: {
  venue: { name: string; area: string; cuisine: string; price: string; href: string };
  photo: LocationPhoto;
}) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-paper-200 bg-paper-50 shadow-sm hover-lift">
      <div className="hover-scale-img relative aspect-square w-full bg-paper-100">
        <LocationPhotoView photo={photo} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow">{venue.area}</p>
        <h3 className="mt-1 font-display text-headline-lg text-ink-900 text-balance">
          {venue.name}
        </h3>
        <p className="mt-2 text-body-sm text-ink-800 text-pretty flex-1">
          {venue.cuisine}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-caption text-ink-700">{venue.price}</span>
        </div>
        <div className="mt-4">
          <Link
            href={venue.href}
            aria-label={`${venue.name} — Reserve`}
            className="link text-ocean-700 text-body-sm font-medium hover-underline"
          >
            Reserve →
          </Link>
        </div>
      </div>
      <figcaption className="absolute bottom-2 right-2 rounded-pill bg-ink-900/70 px-2 py-0.5 text-[10px] text-paper-100 opacity-0 transition-opacity duration-base ease-out group-hover:opacity-100">
        Illustration: {photo.author}
      </figcaption>
    </article>
  );
}

function WebcamSvgCard({
  cam,
  photo,
}: {
  cam: { name: string; location: string; href: string };
  photo: LocationPhoto;
}) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-paper-200 bg-paper-50 shadow-sm hover-lift">
      <div className="hover-scale-img relative aspect-square w-full bg-paper-100">
        <LocationPhotoView photo={photo} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow">{cam.location}</p>
        <h3 className="mt-1 font-display text-headline-lg text-ink-900 text-balance">
          {cam.name}
        </h3>
        <p className="mt-2 text-caption text-ink-700">
          Live feed via operator
        </p>
        <div className="mt-4">
          <Link
            href={cam.href}
            aria-label={`${cam.name} — View live`}
            className="link text-ocean-700 text-body-sm font-medium hover-underline"
          >
            View live →
          </Link>
        </div>
      </div>
      <figcaption className="absolute bottom-2 right-2 rounded-pill bg-ink-900/70 px-2 py-0.5 text-[10px] text-paper-100 opacity-0 transition-opacity duration-base ease-out group-hover:opacity-100">
        Illustration: {photo.author}
      </figcaption>
    </article>
  );
}
