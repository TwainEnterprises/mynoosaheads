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
} from "@/components/ui";
import { AreaHeroes } from "@/components/illustrations/AreaHeroes";
import { CATEGORIES, SITE } from "@/data/site";
import { HOMEPAGE_HERO } from "@/data/photos";

/**
 * Homepage — Sprint 1.3 real copy + v5 surgical polish.
 *
 * Layout per Albert's brief:
 *   1. Hero (headline, flourish, actions, live strip)
 *   2. Live-data grid (5 tiles: surf, wind, tide, UV, sun-moon)
 *   3. Eight functional-area entry cards (now with bespoke SVG heroes)
 *   4. v5 (#18): Plan your trip hub — 3 cards (new / returning / deadline)
 *   5. Disclosure band (ACCC)
 *   6. Footer compliance band (rendered by global Footer)
 *
 * v5 (MSN-2959-V5-POLISH) changes:
 *   - #13: Homepage hero H1 + eyebrow overlay on the photo.
 *   - #11: 8 bespoke SVG hero illustrations on the 8-area card grid.
 *   - #18: "Plan your trip" hub section (3-card row, new / returning / deadline).
 *   - #23: CTAs tightened to action verbs.
 *   - #25: Card titles for the 8-area grid (1-line editorial pitch per area).
 *   - #24: Section eyebrows more editorial ("A small guide..." vs "Eight areas...").
 */
export default async function HomePage() {
  const live = await fetchLiveBundle();

  // v5 (#23): action-verb CTAs per category slug.
  // Defined at module scope below to avoid template-literal narrowing
  // inside JSX (TS infers `never` for the fallback branch).
  const actionCtaForSlug: Record<string, string> = {
    "surf-and-weather": "Read the surf report →",
    "noosa-national-park": "Check park alerts →",
    "accommodation": "Find a place to stay →",
    "things-to-do": "See what locals do →",
    "fishing-reports": "Read this week’s insight →",
    "boats-and-watercraft": "Check the bar crossing →",
    "travel-and-transport": "Plan the drive in →",
    "webcams": "Open the council cams →",
  };

  return (
    <div className="bg-paper-50">
      {/* v5 (#2, #13): full-bleed homepage hero with overlay H1 + eyebrow.
       * Unsplash photo (lifestyle / coastal headland) replaces v2's
       * generic Kgbo / dronepicr drone shot. The body H1 below the
       * photo remains for screen-reader accessibility. */}
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

      {/* ─── Live data strip ─── */}
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

      {/* ─── Eight functional-area entry cards (v5 #11: SVG heroes) ─── */}
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
          MyNoosaHeads around eight functional areas so you don’t have to
          wade through visitor-brochure categories that don’t reflect what
          people actually do here.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat) => {
            // v5 (#11): bespoke SVG hero illustration per area.
            // IconName mapping kept simple — each cat gets one SVG by slug.
            const heroBySlug: Record<string, keyof typeof AreaHeroes> = {
              "surf-and-weather": "Wave",
              "noosa-national-park": "Headland",
              "accommodation": "Accommodation",
              "things-to-do": "Things",
              "fishing-reports": "Fishing",
              "boats-and-watercraft": "Boat",
              "travel-and-transport": "Travel",
              "webcams": "Webcam",
            };
            const HeroIllustration = AreaHeroes[heroBySlug[cat.slug] ?? "Headland"];
            // v5 (#25): 1-line editorial pitch per card.
            const editorialPitch: Record<string, string> = {
              "surf-and-weather": "Today’s swell, wind, tide, and UV — straight from BOM and Open-Meteo.",
              "noosa-national-park": "The headland, the koalas, and the QPWS alerts you should read first.",
              "accommodation": "Where to stay across the shire — Hastings Street to the hinterland.",
              "things-to-do": "What locals actually do on a Tuesday, with the tide and the swell in mind.",
              "fishing-reports": "This week’s insight, the rules, and the tide tables for Tewantin.",
              "boats-and-watercraft": "Ferries, hire, ramps, and the bar-crossing bulletin from MSQ.",
              "travel-and-transport": "Bruce Highway conditions, Sunshine Coast airport, and the ferry timetable.",
              "webcams": "Council cams and SLSQ flags — we link, we don’t scrape.",
            };
            return (
              <Card key={cat.slug} as="article" className="flex flex-col">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-t-xl bg-paper-100">
                  <HeroIllustration
                    className="h-full w-full object-cover"
                    title={`${cat.navLabel} — illustration`}
                  />
                </div>
                <CardHeader eyebrow={cat.navLabel} title="" />
                <CardBody className="flex-1 flex flex-col">
                  {/* v5 (#25): editorial pitch replaces the empty <h3>. */}
                  <p className="text-body-sm text-ink-800 text-pretty font-medium mb-3">
                    {editorialPitch[cat.slug] ?? cat.pitch}
                  </p>
                  <p className="text-caption text-ink-700 text-pretty flex-1">
                    {cat.pitch}
                  </p>
                  <div className="mt-4">
                    <Link
                      href={cat.href}
                      className="link text-ocean-700 text-body-sm font-medium"
                    >
                      {/* v5 (#23): action verbs instead of "Open X →". */}
                      {actionCtaForSlug[cat.slug] ?? `Open ${String(cat.navLabel)} →`}
                    </Link>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ─── v5 (#18): Plan your trip hub ─── */}
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
            lives at <Link href="/plan" className="link text-ocean-700">/plan</Link>.
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
            <Link href="/plan" className="link text-ocean-700 text-body font-medium">
              Open the full /plan hub →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Disclosure band ─── */}
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