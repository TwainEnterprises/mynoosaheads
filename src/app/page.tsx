import Link from "next/link";
import { fetchLiveBundle } from "@/lib/live-data";
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
} from "@/components/ui";
import { AreaHeroes } from "@/components/illustrations/AreaHeroes";
import {
  SITE,
  FEATURED_AREAS,
  THINGS_TO_DO,
  WHERE_TO_STAY,
  WEBCAMS,
  GETTING_HERE,
} from "@/data/site";
import { HOMEPAGE_HERO, HOMEPAGE_SECTIONS } from "@/data/photos";
import type { UnsplashPhoto } from "@/data/photos";

/**
 * Homepage — v6 (MSN-2960-V6, 2026-10-11).
 *
 * Layout per Albert's v6 spec §2.1 (7 P0 sections + v5 carry):
 *   1. S1  Hero                 (refined; carries v5 overlay)
 *   2. S2  Live conditions      (carry from v5; P1 polish deferred)
 *   3. S3  Featured areas grid  (P0; 6 photo cards, replaces 8 SVGs)
 *   4. S4  Things to do         (P0; 8 cards in a scroll-snap rail)
 *   5. S5  Where to stay        (P0; 6 cross-section cards)
 *   6. S6  Plan your trip hub   (carry from v5; P1 polish deferred)
 *   7. S9  Webcams strip        (P0; 4 tiles)
 *   8. S10 Getting here         (P0; 5 transport modes)
 *   9. Disclosure band          (carry from v5)
 *  10. S16 Footer               (carry from v5; column 1 uses new IA)
 *
 * v6 changes vs v5:
 *   - #P0-1: Mega menu in SiteHeader (6 categories, ~55 sub-links).
 *   - #P0-2: Hero overlay refined; S1 unchanged structurally.
 *   - #P0-3: Featured areas grid (S3) — 6 photo cards; v5's 8
 *     area SVGs are demoted to mega-menu use.
 *   - #P0-4: Things to do carousel (S4) — new scroll-snap rail.
 *   - #P0-5: Where to stay grid (S5) — 6 cross-section cards.
 *   - #P0-6: Webcams strip (S9) — 4 tiles.
 *   - #P0-7: Getting here section (S10) — 5 transport modes.
 *   - #P0-8: Footer (S16) — column 1 uses new IA.
 *   - #P0-9: Design system polish (globals.css, tailwind.config.ts).
 *   - #P0-10: Micro-interaction library (card lift, image scale,
 *     link underline, button press; globals.css utilities).
 */
export default async function HomePage() {
  const live = await fetchLiveBundle();

  return (
    <div className="bg-paper-50">
      {/* ─── S1: Hero (P0; refined from v5) ─── */}
      <HeroPhoto
        src={HOMEPAGE_HERO.url}
        alt={HOMEPAGE_HERO.caption}
        credit={`Photo: ${HOMEPAGE_HERO.author} / Unsplash · ${HOMEPAGE_HERO.licence}`}
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

      {/* ─── S3: Featured areas (P0; 6 photo cards) ─── */}
      <section
        className="container-page py-14 md:py-20"
        aria-labelledby="areas-heading"
      >
        <p className="eyebrow">A small guide to a small shire</p>
        <h2
          id="areas-heading"
          className="mt-1 font-display text-display-md text-ink-900 text-balance"
        >
          Pick where you want to start
        </h2>
        <p className="mt-3 lead max-w-3xl">
          The shire is small enough to cover properly. We organise
          MyNoosaHeads around six places locals actually base themselves —
          from the headland to Peregian, with the national park in the
          middle.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_AREAS.map((area) => {
            const photo: UnsplashPhoto =
              HOMEPAGE_SECTIONS.featuredAreas[area.imageIndex];
            return (
              <ContentCard
                key={area.slug}
                image={photo.url}
                imageAlt={photo.caption}
                imageCredit={`Photo: ${photo.author} / Unsplash`}
                imageAspect="3/2"
                imagePriority={area.imageIndex === 0}
                eyebrow={area.name}
                title=""
                body={area.tagline}
                cta={{ label: area.cta, href: area.href }}
              />
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/things-to-do"
            className="link text-ocean-700 text-body font-medium hover-underline"
          >
            See all eight areas →
          </Link>
        </div>
      </section>

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
                const photo: UnsplashPhoto =
                  HOMEPAGE_SECTIONS.thingsToDo[i];
                return (
                  <ContentCard
                    key={item.title}
                    image={photo.url}
                    imageAlt={photo.caption}
                    imageCredit={`Photo: ${photo.author} / Unsplash`}
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
            const photo: UnsplashPhoto =
              HOMEPAGE_SECTIONS.whereToStay[stay.imageIndex];
            return (
              <ContentCard
                key={stay.name}
                image={photo.url}
                imageAlt={photo.caption}
                imageCredit={`Photo: ${photo.author} / Unsplash`}
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
          {WEBCAMS.map((cam) => (
            <ContentCard
              key={cam.name}
              image={HOMEPAGE_HERO.url}
              imageAlt={`${cam.name} webcam — static placeholder, opens the live feed on click`}
              imageCredit="Photo: Unsplash"
              imageAspect="1/1"
              eyebrow={cam.location}
              title={cam.name}
              meta="Live feed via operator"
              cta={{ label: "View live →", href: cam.href }}
            />
          ))}
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
              <img
                src={HOMEPAGE_SECTIONS.gettingHere.url}
                alt={HOMEPAGE_SECTIONS.gettingHere.caption}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <figcaption className="absolute bottom-2 right-2 rounded-pill bg-ink-900/70 px-2 py-0.5 text-[10px] text-paper-100">
                Photo: {HOMEPAGE_SECTIONS.gettingHere.author} / Unsplash
              </figcaption>
            </div>
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
