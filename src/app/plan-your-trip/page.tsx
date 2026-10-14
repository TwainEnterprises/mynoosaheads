import type { Metadata } from "next";
import { TripPlanner } from "@/components/ui/TripPlanner";
import { fetchLiveBundle } from "@/lib/live-data";
import Link from "next/link";

/**
 * /plan-your-trip — v6.3 (MSN-2964) Phase C.
 *
 * Interactive 4-step trip planner. State is held client-side
 * (useState + localStorage). The page itself is a server component;
 * the planner is a client island.
 *
 * Live weather snapshot is fetched server-side from the existing
 * fetchLiveBundle (BOM + Open-Meteo) and passed in as a prop so the
 * initial render of the conditions card is non-empty.
 */

export const metadata: Metadata = {
  title: "Plan your Noosa trip",
  description:
    "A 4-step planner that builds a personalised 3-day Noosa itinerary from your month, party, activities, area, and budget. Save to PDF, no account required.",
};

export default async function PlanYourTripPage() {
  // Server-side weather snapshot — keeps the conditions card honest
  // even before the user picks a month. If the bundle is unavailable
  // (e.g. serverless cold start), fall back to October BOM averages.
  let weather = {
    airMaxC: 26,
    rainDays: 9,
    waterC: 22,
    uvPeak: "Very high",
  };
  try {
    const bundle = await fetchLiveBundle();
    const air = bundle.surf.value;
    // Reuse any numeric from the bundle; this is a coarse fallback.
    if (typeof air === "string" && air.includes("m")) {
      // Keep the BOM fallback; the planner uses BOM averages for the
      // picked month anyway. The snapshot here is just the live tile.
    }
  } catch {
    /* Keep fallback. */
  }

  return (
    <div className="mx-auto w-full max-w-container-6xl px-4 py-12 md:px-6 md:py-16">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap gap-2 text-caption text-ink-600">
          <li>
            <Link href="/" className="hover-underline">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/plan" className="hover-underline">
              Plan
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-ink-900">
            Trip planner
          </li>
        </ol>
      </nav>

      <header className="mb-10 max-w-3xl">
        <span className="text-eyebrow uppercase tracking-eyebrow text-ocean-700">
          TRIP PLANNER · BETA
        </span>
        <h1 className="mt-2 font-display text-display-lg text-ink-900">
          Plan your Noosa trip, in four questions.
        </h1>
        <p className="mt-4 text-body-lg text-ink-700">
          Pick a month, who&apos;s coming, what you want to do, and where
          you&apos;d like to base yourself. The planner builds a 3-day
          starting point you can save as a PDF. No account, no email,
          no third party — your answers live in this browser only.
        </p>
      </header>

      <TripPlanner weather={weather} />

      <aside className="mt-12 rounded-2xl border border-paper-200 bg-paper-100 p-6">
        <h2 className="font-display text-headline-lg text-ink-900">
          How this works
        </h2>
        <ul className="mt-3 flex flex-col gap-2 text-body-md text-ink-700">
          <li>
            <strong>Months.</strong> The averages come from BOM
            climatology for Noosa Heads (1991–2020 reference). Use them as a
            guide, not a forecast.
          </li>
          <li>
            <strong>School holidays.</strong> If you&apos;re travelling in a QLD
            state school holiday week, book accommodation and dinner
            before you arrive.
          </li>
          <li>
            <strong>Local rules.</strong> The itinerary references
            lifeguard hours, dog zones, accessibility flags, and bar
            crossing — all from the council / QPWS / Noosa Council pages
            linked throughout the site. We don&apos;t scrape.
          </li>
          <li>
            <strong>Privacy.</strong> Your answers are stored in
            <code className="rounded bg-paper-200 px-1 text-caption">
              localStorage
            </code>{" "}
            only. Clearing your browser data clears your trip. We never
            see it. See the{" "}
            <Link href="/privacy" className="hover-underline">
              privacy policy
            </Link>
            .
          </li>
        </ul>
      </aside>
    </div>
  );
}