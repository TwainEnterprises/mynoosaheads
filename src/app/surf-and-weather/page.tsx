import type { Metadata } from "next";
import Link from "next/link";
import { fetchLiveBundle } from "@/lib/live-data";
import { CATEGORY_PHOTOS } from "@/data/photos";
import { Icons } from "@/components/ui/Icon";
import {
  V2Figure,
  V2Hero,
  V2LiveTiles,
  V2PointCards,
  V2RelatedCard,
  V2SafetyCallout,
  V2SourceRail,
  V2TrustRow,
  figureDimensions,
} from "@/components/ui/v2";
import "../../components/ui/v2/v2.css";

/**
 * /surf-and-weather — MSN-3100 v2 rebuild.
 *
 * Premium rebuild of the page, using www.peoplesreserve.com as the
 * quality/craft bar only. The design system lives in the isolated
 * src/components/ui/v2 module so the other ~15 routes are untouched.
 *
 * CONTENT CONTRACT: every word of the previous page survives — title,
 * eyebrow, subtitle, flourish, all five body sections with their
 * paragraphs and all four bullets, the bar-crossing safety callout with
 * its MSQ link, all five primary source links, the three related links,
 * the editorial note, and the photo captions + Wikimedia credits.
 *
 * LIVE DATA: the tiles consume the existing server-side bundle from
 * lib/live-data.ts. No new API calls, no mocks, no hardcoded numbers.
 * The upstream 6-second budget and the "Unavailable" fallback are
 * unchanged, and each tile keeps its source attribution and timestamp.
 */

export const metadata: Metadata = {
  title: "Surf & weather",
  description:
    "Live surf, wind, tide, and UV tiles for Noosa Heads from the Bureau of Meteorology (Capricornia–Hervey Bay) and Open-Meteo. Noosa bar crossing rules, tide turns, and the BOM swell narrative.",
  alternates: { canonical: "/surf-and-weather" },
  openGraph: {
    title: "Surf & weather · MyNoosaHeads",
    description:
      "Live surf, wind, tide, and UV tiles for Noosa Heads, refreshed every 30 minutes.",
    url: "/surf-and-weather",
    type: "article",
  },
};

const PHOTOS = CATEGORY_PHOTOS["surf-and-weather"];

const creditLine = (p: { author: string; licence: string }) =>
  "Photo: " + p.author + " / Wikimedia Commons · " + p.licence;

const PRIMARY_SOURCES = [
  {
    label: "BOM — Capricornia–Hervey Bay coastal forecast",
    href: "https://www.bom.gov.au/qld/forecasts/coastal.shtml",
  },
  {
    label: "BOM — Tewantin tide",
    href: "https://www.bom.gov.au/australia/tides/#!/qld-tewantin",
  },
  {
    label: "Open-Meteo Marine Weather API (free, no key)",
    href: "https://open-meteo.com/en/docs/marine-weather-api",
  },
  {
    label: "Cancer Council SunSmart (UV thresholds)",
    href: "https://www.sunsmart.com.au/",
  },
  {
    label: "Marine Safety Queensland — bar crossings",
    href: "https://www.msq.qld.gov.au/Safety/Bar-crossings-and-coastal-conditions",
  },
];

const TRUST_ROW = [
  {
    label: "Bureau of Meteorology",
    href: "https://www.bom.gov.au/qld/forecasts/coastal.shtml",
  },
  {
    label: "Open-Meteo",
    href: "https://open-meteo.com/en/docs/marine-weather-api",
  },
  {
    label: "Marine Safety Queensland",
    href: "https://www.msq.qld.gov.au/Safety/Bar-crossings-and-coastal-conditions",
  },
  {
    label: "Cancer Council SunSmart",
    href: "https://www.sunsmart.com.au/",
  },
  {
    label: "QPWS",
    href: "https://www.qld.gov.au/environment/parks",
  },
];

const RELATED_LINKS = [
  {
    label: "Noosa National Park",
    href: "/noosa-national-park",
    description: "Coastal walk and wildlife.",
  },
  {
    label: "Boats & watercraft",
    href: "/boats-and-watercraft",
    description: "River bar, ramps, hire.",
  },
  {
    label: "Webcams",
    href: "/webcams",
    description: "Council + SLSQ cams.",
  },
];

export default async function SurfAndWeatherPage() {
  const live = await fetchLiveBundle();

  // MSN-3100 rework (Victor QA round 1, F1): each figure is reserved with
  // the photograph's MEASURED intrinsic size, so the box the browser lays
  // out before the image arrives is identical to the box after it loads.
  const inlineDims = PHOTOS.inline.map((p) => figureDimensions(p.url));

  const tileSpecs = [
    {
      label: "Surf — Noosa Heads",
      icon: <Icons.Wave size={16} />,
      tile: live.surf,
    },
    {
      label: "Wind — coast",
      icon: <Icons.WindArrow size={16} />,
      tile: live.wind,
    },
    {
      label: "Tide — Tewantin",
      icon: <Icons.TideArrow size={16} />,
      tile: live.tide,
    },
    {
      label: "UV index",
      icon: <Icons.Sun size={16} />,
      tile: live.uv,
    },
    {
      label: "Sun & moon",
      icon: <Icons.Moon size={16} />,
      tile: live.sunMoon,
    },
  ];

  return (
    <div className="v2-root">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <V2Hero
        imageSrc={PHOTOS.hero.url}
        imageAlt={PHOTOS.hero.caption}
        eyebrow="Live · BOM Capricornia–Hervey Bay + Open-Meteo Marine"
        titleLine="Surf"
        titleLineAccent="& weather"
        subtitle="The marine forecast for the Capricornia–Hervey Bay district covers Noosa Heads, Sunshine Beach, and the river bar. The tiles on this page refresh themselves every 30 minutes — we don’t push them by hand."
        flourish="When the wind turns south-east under 15, the points light up."
        credit={
          <>
            {PHOTOS.hero.caption} · {creditLine(PHOTOS.hero)}
          </>
        }
        actions={
          <>
            <a className="v2-btn v2-btn--gold" href="#live-conditions">
              See live conditions
              <span className="v2-arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a className="v2-btn v2-btn--glass" href="#bar-safety">
              Bar crossing safety
            </a>
          </>
        }
      />

      <V2TrustRow items={TRUST_ROW} />

      {/* ── Live tiles + how to read them ───────────────────────────── */}
      <section
        id="live-conditions"
        className="v2-band v2-band--dark"
        aria-labelledby="v2-live-heading"
      >
        <div className="v2-container">
          <div className="v2-split">
            <div>
              <p className="v2-eyebrow-pill v2-eyebrow-pill--on-dark">
                <span className="v2-dot" aria-hidden="true" />
                Live conditions
              </p>
              <h2
                id="v2-live-heading"
                className="v2-h2"
                style={{ marginTop: "1.25rem" }}
              >
                How to read the live tiles
              </h2>
              <div className="v2-prose" style={{ marginTop: "1.5rem" }}>
                <p>
                  The five tiles at the top of the page are pulled directly from
                  BOM and Open-Meteo. They are not forecasts of what is coming
                  — they are the most recent observation or nowcast. The
                  heading on each tile is the kind; the value is the headline
                  number; the secondary line is the supporting detail (swell
                  period, gust, tide direction); the footer is the source and
                  the timestamp.
                </p>
                <p>
                  If a tile goes Unavailable, it means the upstream API did not
                  respond within our 6-second budget. We refuse to invent a
                  number. Cross-check BOM directly via the sources list to the
                  right.
                </p>
              </div>
            </div>

            <V2SourceRail
              title="Primary sources"
              sources={PRIMARY_SOURCES}
              note={
                <>
                  All sources are public. If a link breaks, please{" "}
                  <Link href="/contact">let us know</Link>.
                </>
              }
            />
          </div>

          <V2LiveTiles
            specs={tileSpecs}
            asOf={live.asOf}
            note={live.sourceNote}
          />
        </div>
      </section>

      {/* ── Surf ─────────────────────────────────────────────────────── */}
      <section className="v2-band v2-band--light" aria-labelledby="v2-surf-heading">
        <div className="v2-container">
          <div className="v2-split v2-split--media">
            <div>
              <p className="v2-eyebrow-pill">
                <span className="v2-dot" aria-hidden="true" />
                The points
              </p>
              <h2
                id="v2-surf-heading"
                className="v2-h2"
                style={{ marginTop: "1.25rem" }}
              >
                Surf — what the points need
              </h2>
              <div className="v2-prose" style={{ marginTop: "1.5rem" }}>
                <p>
                  Noosa’s points — First Bay, National Park, and Granite Bay —
                  like a south-east groundswell with a period over 9 seconds and
                  a wind under 15 km/h from the same direction. When the wind
                  goes north or north-west, the surface glass goes off and the
                  points are at their best.
                </p>
                <p>
                  Beginners and longboarders typically work the open beach at
                  Main Beach or the south end of Sunshine Beach, where the swell
                  has sorted itself out. The lifesavers patrol Main Beach every
                  day during school holidays and on weekends year-round (see
                  Beachsafe for the current flag).
                </p>
              </div>
            </div>
            <div className="v2-split__media">
              <V2Figure
                src={PHOTOS.inline[0].url}
                width={inlineDims[0].width}
                height={inlineDims[0].height}
                caption={PHOTOS.inline[0].caption}
                credit={creditLine(PHOTOS.inline[0])}
                eager
                priority
              />
            </div>
          </div>

          <div style={{ marginTop: "var(--v2-space-2xl)" }}>
            <V2PointCards
              points={[
                {
                  name: "First Bay",
                  icon: <Icons.Wave size={20} />,
                  body: "works on south-east swell, ~1.4 m at the headland, period 9–12 s.",
                },
                {
                  name: "National Park (Lifeguard Beach)",
                  icon: <Icons.ParkGate size={20} />,
                  body: "south-east swell; respects the QPWS swimming enclosure boundary.",
                },
                {
                  name: "Granite Bay",
                  icon: <Icons.Compass size={20} />,
                  body: "walk-in access only via the coastal track; check QPWS alerts before you walk.",
                },
                {
                  name: "Main Beach",
                  icon: <Icons.Pin size={20} />,
                  body: "patrolled, the right place on a building south-easter.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── Wind ─────────────────────────────────────────────────────── */}
      <section className="v2-band v2-band--dark" aria-labelledby="v2-wind-heading">
        <div className="v2-container">
          <div className="v2-split v2-split--media">
            <div>
              <p className="v2-eyebrow-pill v2-eyebrow-pill--on-dark">
                <span className="v2-dot" aria-hidden="true" />
                The south-easterly
              </p>
              <h2
                id="v2-wind-heading"
                className="v2-h2"
                style={{ marginTop: "1.25rem" }}
              >
                Wind — the south-east is your friend
              </h2>
              <div className="v2-prose" style={{ marginTop: "1.5rem" }}>
                <p>
                  A typical winter morning runs 10–20 km/h south-east, which
                  holds the surface together and lines the swell up against the
                  points. The wind tends to clock around to the north-east by
                  mid-afternoon; that’s when the south coast beaches come into
                  their own. A westerly is rare and usually means a frontal
                  system; expect gusts and a bumpy surface.
                </p>
              </div>
            </div>
            <div className="v2-split__media v2-split__media--lead">
              <V2Figure
                src={PHOTOS.inline[1].url}
                width={inlineDims[1].width}
                height={inlineDims[1].height}
                caption={PHOTOS.inline[1].caption}
                credit={creditLine(PHOTOS.inline[1])}
                eager
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Tide ─────────────────────────────────────────────────────── */}
      <section className="v2-band v2-band--light" aria-labelledby="v2-tide-heading">
        <div className="v2-container">
          <div className="v2-split v2-split--media">
            <div>
              <p className="v2-eyebrow-pill">
                <span className="v2-dot" aria-hidden="true" />
                The bar
              </p>
              <h2
                id="v2-tide-heading"
                className="v2-h2"
                style={{ marginTop: "1.25rem" }}
              >
                Tide — and the bar
              </h2>
              <div className="v2-prose" style={{ marginTop: "1.5rem" }}>
                <p>
                  Noosa River bar is shallow and shifts. The general rule is
                  that the bar is friendliest on the slack and on the outgoing
                  tide with a light south-east wind. Crossing on an incoming
                  tide with a southerly running is the combination Marine
                  Safety Queensland warns against most directly. If you’re not
                  sure, don’t go out — phone VMR Noosa (channel 16) for a local
                  reading.
                </p>
                <p>
                  The tide tile on this page uses Open-Meteo’s sea-level figure
                  as a guide and points at the BOM Tewantin harmonic as the
                  authoritative reference. Always defer to the BOM harmonic for
                  a planned crossing.
                </p>
              </div>
            </div>
            <div className="v2-split__media">
              <V2Figure
                src={PHOTOS.inline[2].url}
                width={inlineDims[2].width}
                height={inlineDims[2].height}
                caption={PHOTOS.inline[2].caption}
                credit={creditLine(PHOTOS.inline[2])}
                eager
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Bar crossing safety ──────────────────────────────────────── */}
      <section
        id="bar-safety"
        className="v2-band v2-band--deep"
        aria-labelledby="v2-safety-heading"
      >
        <div className="v2-container">
          <V2SafetyCallout
            title="Bar crossing safety"
            body={
              <>
                The Noosa River bar is a bar — not a harbour entrance. If the
                BOM Capricornia–Hervey Bay forecast calls southerly 20+ knots,
                swells over 1.5 m, or a heavy rainfall event, defer.{" "}
                <a
                  href="https://www.msq.qld.gov.au/Safety/Bar-crossings-and-coastal-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MSQ bar crossings bulletin
                </a>
                .
              </>
            }
          />
        </div>
      </section>

      {/* ── UV ───────────────────────────────────────────────────────── */}
      <section className="v2-band v2-band--light" aria-labelledby="v2-uv-heading">
        <div className="v2-container">
          <div className="v2-split v2-split--media">
            <div>
              <p className="v2-eyebrow-pill">
                <span className="v2-dot" aria-hidden="true" />
                Protection
              </p>
              <h2
                id="v2-uv-heading"
                className="v2-h2"
                style={{ marginTop: "1.25rem" }}
              >
                UV — slip on a shirt before 9
              </h2>
              <div className="v2-prose" style={{ marginTop: "1.5rem" }}>
                <p>
                  The UV index on the Sunshine Coast reaches Extreme (&gt;11) on
                  clear summer days and rarely falls below Moderate (3–5) even
                  in winter. Cancer Council SunSmart recommends protection from
                  any UV ≥ 3, which in practice means a shirt, hat, sunscreen,
                  and shade between 10 am and 3 pm year-round.
                </p>
              </div>
            </div>
            <div className="v2-split__media">
              <V2Figure
                src={PHOTOS.inline[3].url}
                width={inlineDims[3].width}
                height={inlineDims[3].height}
                caption={PHOTOS.inline[3].caption}
                credit={creditLine(PHOTOS.inline[3])}
                eager
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Related + editorial ──────────────────────────────────────── */}
      <section
        className="v2-band v2-band--platinum"
        aria-labelledby="v2-related-heading"
      >
        <div className="v2-container">
          <p className="v2-eyebrow-pill">
            <span className="v2-dot" aria-hidden="true" />
            Related
          </p>
          <h2
            id="v2-related-heading"
            className="v2-h2"
            style={{ marginTop: "1.25rem" }}
          >
            Where to next
          </h2>
          <div
            className="v2-grid v2-grid--3"
            style={{ marginTop: "var(--v2-space-xl)" }}
          >
            {RELATED_LINKS.map((link) => (
              <V2RelatedCard
                key={link.href}
                label={link.label}
                href={link.href}
                description={link.description}
              />
            ))}
          </div>
          <div
            className="v2-rail v2-rail--light"
            style={{ marginTop: "var(--v2-space-xl)" }}
          >
            <h3 className="v2-rail__title">Editorial</h3>
            <p
              className="v2-rail__note"
              style={{ marginTop: 0, paddingTop: 0, borderTop: "none" }}
            >
              Live tiles refresh every 30 minutes from BOM and Open-Meteo.
              Editorial copy is reviewed monthly against current QPWS and
              council sources.
            </p>
            <p style={{ marginTop: "1.25rem" }}>
              <Link className="v2-btn v2-btn--outline v2-btn--sm" href="/contact">
                Report an error
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
