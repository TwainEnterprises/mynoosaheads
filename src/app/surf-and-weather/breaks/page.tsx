import type { Metadata } from "next";
import Link from "next/link";
import { CategoryPage } from "@/components/CategoryPage";
import { Card, CardHeader, CardBody } from "@/components/ui";

/**
 * /surf-and-weather/breaks — Surf breaks directory sub-page.
 *
 * v5 (MSN-2959-V5-POLISH #22) — MDX-style page covering six surf
 * breaks: First Bay, National Park, Granite Bay, Main Beach, Sunshine
 * Beach, Peregian. Each break carries per-break conditions (what
 * swell works, what wind, what tide) and an editorial description.
 *
 * Body length: ~700 words across the six break entries + an
 * introductory section + 3+ AU canonical source links.
 */

export const metadata: Metadata = {
  title: "Surf breaks directory — Noosa Heads",
  description:
    "A directory of six Noosa surf breaks: First Bay, National Park, Granite Bay, Main Beach, Sunshine Beach, Peregian. Per-break swell, wind, and tide cues.",
  alternates: { canonical: "/surf-and-weather/breaks" },
  openGraph: {
    title: "Surf breaks directory · MyNoosaHeads",
    description: "Six Noosa surf breaks with per-break swell, wind, and tide cues.",
    url: "/surf-and-weather/breaks",
    type: "article",
  },
};

const BREAKS = [
  {
    name: "First Bay",
    pitch: "The beginner-friendly south end of Noosa Heads. Long, rolling rights on a south-east swell; protected from the north wind.",
    bestSwell: "South-east, 1–2 m at 10–12 s.",
    bestWind: "Light offshore from the west, early morning.",
    bestTide: "Mid to high incoming.",
    skill: "Beginner to intermediate.",
  },
  {
    name: "National Park (Tea Tree Bay)",
    pitch: "A short walk south from First Bay. Holds slightly more size; lined-up rights on a longer period swell.",
    bestSwell: "South-east, 1.5–2.5 m at 12–14 s.",
    bestWind: "Light offshore from the west, dawn.",
    bestTide: "Mid incoming to high.",
    skill: "Intermediate.",
  },
  {
    name: "Granite Bay",
    pitch: "A long walk from the headland car park (≈ 4 km one-way). The most powerful break in the National Park; lined-up rights over a shallow reef.",
    bestSwell: "South-east, 2–3 m at 14 s+.",
    bestWind: "Light offshore from the west, dawn; or any wind with west in it.",
    bestTide: "Mid incoming (avoid dead-low).",
    skill: "Advanced — long walk, isolated, big swells.",
  },
  {
    name: "Main Beach",
    pitch: "The open-coast beach in front of Hastings Street. Generally shorey, with occasional sandbars that work on a south-east groundswell.",
    bestSwell: "South-east groundswell, 1.5+ m at 13+ s.",
    bestWind: "Light offshore from the west.",
    bestTide: "Mid incoming.",
    skill: "Beginner to intermediate — patrolled.",
  },
  {
    name: "Sunshine Beach",
    pitch: "South of the headland. A steeper beach with more punch than Main Beach; the surf club end is the most popular.",
    bestSwell: "South-east, 1.5–3 m.",
    bestWind: "Light offshore from the west.",
    bestTide: "Mid incoming.",
    skill: "Intermediate to advanced — rips common.",
  },
  {
    name: "Peregian Beach",
    pitch: "Further south, at the Coolum end. Open-coast beach break; picks up more swell than the Noosa Heads beaches.",
    bestSwell: "South-east, 2–3 m.",
    bestWind: "Light offshore from the west.",
    bestTide: "Mid incoming.",
    skill: "Intermediate — patrolled in summer.",
  },
];

const PRIMARY_SOURCES = [
  { label: "Bureau of Meteorology — Capricornia–Hervey Bay marine forecast", href: "https://www.bom.gov.au/qld/forecasts/coastal.shtml" },
  { label: "Open-Meteo — Marine Weather API", href: "https://open-meteo.com/en/docs/marine-weather-api" },
  { label: "BOM — Tewantin tide", href: "https://www.bom.gov.au/australia/tides/#!/qld-tewantin" },
  { label: "Surf Life Saving QLD — patrol flags", href: "https://www.lifesaving.com.au/" },
];

export default function SurfBreaksPage() {
  const bodySections = [
    {
      heading: "How to read this directory",
      paragraphs: [
        "Each entry below describes one break: the swell that works, the wind that helps, the tide to aim for, and the skill range it suits. The skill ranges are not absolute — a confident beginner can handle First Bay on a small day; Granite Bay in a 3 m south-east groundswell is reserved for advanced surfers with the walk and the reef experience.",
        "We pull the marine forecast from the Bureau of Meteorology's Capricornia–Hervey Bay district and Open-Meteo's free marine API; the live tiles on /surf-and-weather fire every 30 minutes. For the actual decision on a given morning, read the live data, check the BOM coastal wind forecast, and look at the webcams — the wind direction at the beach is the last word on what breaks will work.",
      ],
      bullets: [
        "BOM Capricornia–Hervey Bay — district marine forecast",
        "Open-Meteo Marine — wave height + period (free, no key)",
        "Webcams — confirm the buoy reading",
      ],
    },
    {
      heading: "The six breaks",
      paragraphs: [
        "First Bay is the beginner-friendly south end of Noosa Heads — long rolling rights, protected from the north wind, patrolled in summer. National Park (Tea Tree Bay) sits a short walk further south and holds slightly more size. Granite Bay is the long walk to the south of the National Park — the most powerful break in the Park, reserved for advanced surfers willing to make the trip. Main Beach in front of Hastings Street is a shorey beach break; Sunshine Beach south of the headland is steeper; Peregian further south picks up the most swell.",
        "The table below summarises the per-break conditions. For the live data, see /surf-and-weather.",
      ],
      bullets: BREAKS.map((b) => `${b.name} — ${b.bestSwell}`),
    },
    {
      heading: "Safety and etiquette",
      paragraphs: [
        "All Noosa breaks are patrolled by Surf Life Saving Queensland during the summer patrol season (typically September to April). Patrol flags are visible at Main Beach, Sunshine Beach, and Peregian. The National Park breaks (First Bay, Tea Tree Bay, Granite Bay) are not patrolled — surf at your own risk and do not surf alone at isolated breaks like Granite Bay.",
        "Local etiquette: respect the line-up, give priority to the surfer closest to the peak, don't snake, and follow the Surfrider Foundation's low-impact surfing principles. Noosa's National Park is a wildlife refuge — give the koalas, the tallowwood forest, and the headland cliff-face the same respect you give the locals in the water.",
      ],
      bullets: [
        "Patrol season — September to April (verify SLSQ schedule)",
        "Patrolled — Main Beach, Sunshine Beach, Peregian",
        "Not patrolled — National Park breaks; surf with a buddy",
      ],
    },
  ];

  return (
    <>
      <CategoryPage
        slug="surf-and-weather"
        eyebrow="Surf & weather · breaks"
        overlayEyebrow="Surf & weather · Breaks"
        title="Noosa surf breaks directory"
        overlayTitle="Surf breaks directory."
        subtitle={
          <>
            Six Noosa breaks with per-break swell, wind, and tide cues.
            Read the live data on{" "}
            <Link href="/surf-and-weather" className="link text-ocean-700">
              /surf-and-weather
            </Link>{" "}
            before you commit to a session.
          </>
        }
        flourish="What the buoy is telling you, by break."
        primarySources={PRIMARY_SOURCES}
        bodySections={bodySections}
        crossLinks={[
          { label: "Surf & weather", href: "/surf-and-weather", description: "The live surf report." },
          { label: "Webcams", href: "/webcams", description: "Confirm the buoy reading." },
          { label: "Boats & watercraft", href: "/boats-and-watercraft", description: "Bar crossings depend on the same swell." },
        ]}
        disclosure={
          <>
            No paid promotions or sponsored placements on this page. Per-break
            condition cues are based on long-term observation of the Noosa
            breaks and the BOM Capricornia–Hervey Bay district forecast.
            Individual sessions vary with sand movement, tide, swell period,
            and wind direction; the live tiles on /surf-and-weather are the
            last word.
          </>
        }
      />

      {/* Per-break cards */}
      <section className="container-page pb-14 md:pb-20" aria-labelledby="breaks-table-h">
        <h2 id="breaks-table-h" className="font-display text-display-md text-ink-900 mb-6">
          Per-break conditions at a glance
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {BREAKS.map((b) => (
            <Card key={b.name} as="article">
              <CardHeader eyebrow="Break" title={b.name} />
              <CardBody>
                <p className="text-body-sm text-ink-800">{b.pitch}</p>
                <dl className="mt-4 space-y-2 text-caption text-ink-700">
                  <div>
                    <dt className="font-semibold text-ink-800">Best swell</dt>
                    <dd>{b.bestSwell}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink-800">Best wind</dt>
                    <dd>{b.bestWind}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink-800">Best tide</dt>
                    <dd>{b.bestTide}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink-800">Skill</dt>
                    <dd>{b.skill}</dd>
                  </div>
                </dl>
              </CardBody>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-caption text-ink-600">
          Last verified: <time dateTime="2026-10-05">5 October 2026</time> (Australia/Brisbane).
          By-line: <span className="font-accent text-accent-md text-ocean-700">The MyNoosaHeads editors</span>.
        </p>
      </section>
    </>
  );
}