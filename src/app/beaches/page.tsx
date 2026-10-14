import type { Metadata } from "next";
import Link from "next/link";
import { fetchBeachReport } from "@/lib/beach-data";
import { BeachReport } from "@/components/ui/BeachReport";
import { HOMEPAGE_SECTIONS } from "@/data/photos";

/**
 * /beaches — v6.3 (MSN-2964) Phase E.
 *
 * Dedicated beaches page with the live BeachReport full variant.
 * Server-rendered; the report data is fetched server-side from
 * Open-Meteo + NOAA solar (no client JS, A$0).
 */

export const metadata: Metadata = {
  title: "Beaches",
  description:
    "Live beach conditions for Main Beach Noosa Heads: air, water, wind, swell, tide, UV, and sunrise/sunset. BOM + Open-Meteo, free open data.",
};

export const revalidate = 1800; // 30-min cache

export default async function BeachesPage() {
  const report = await fetchBeachReport();

  // Find a Main Beach photo (open Commons, no-surfclub). Falls back to the
  // hero photo if Main Beach photos are empty.
  const mainBeachPhotos = HOMEPAGE_SECTIONS.featuredAreas ?? [];
  const heroPhoto = mainBeachPhotos[0]
    ? {
        src: (mainBeachPhotos[0] as { url?: string }).url ?? "/og-image.jpg",
        alt: "Main Beach, Noosa Heads",
        width: 1280,
        height: 720,
      }
    : { src: "/og-image.jpg", alt: "Noosa Heads beach", width: 1200, height: 630 };

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
          <li aria-current="page" className="text-ink-900">
            Beaches
          </li>
        </ol>
      </nav>

      <header className="mb-10 max-w-3xl">
        <span className="text-eyebrow uppercase tracking-eyebrow text-ocean-700">
          BEACH REPORT
        </span>
        <h1 className="mt-2 font-display text-display-lg text-ink-900">
          Noosa Heads beach conditions
        </h1>
        <p className="mt-4 text-body-lg text-ink-700">
          Live conditions for Main Beach Noosa Heads. Data comes from
          the Bureau of Meteorology (BOM) Capricornia–Hervey Bay coastal
          forecast and Open-Meteo&apos;s free marine + forecast APIs — both
          free, no key, no scraping.
        </p>
      </header>

      <BeachReport data={report} variant="full" heroPhoto={heroPhoto} />

      <section className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-paper-200 bg-surface-elevated p-6">
          <h2 className="font-display text-headline-lg text-ink-900">
                About patrolled status
              </h2>
          <p className="mt-3 text-body-md text-ink-700">
                Noosa Heads Main Beach is lifeguard-patrolled 8 am to 5 pm
                between September and May. Outside those hours, the beach
                is unpatrolled — swim between the red-and-yellow flags,
                and don&apos;t swim alone. For live status updates outside
                patrol hours, check the QPWS coastal safety page.
              </p>
          <Link
            href="https://www.qld.gov.au/environment/parks"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-body-md font-medium text-ocean-700 hover-underline"
          >
            QPWS coastal safety →
          </Link>
        </div>

        <div className="rounded-2xl border border-paper-200 bg-surface-elevated p-6">
          <h2 className="font-display text-headline-lg text-ink-900">
                Cross-check before bar crossing
              </h2>
          <p className="mt-3 text-body-md text-ink-700">
                If you&apos;re heading across the Noosa Bar (boat access to
                North Shore), this widget&apos;s tide + swell numbers are
                indicative — always cross-check the BOM Tewantin
                harmonic and the Coastwatch bar report before committing.
                The swell direction (SE) and tide state matter more than
                absolute height.
              </p>
          <Link
            href="https://www.bom.gov.au/qld/forecasts/coastal.shtml"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-body-md font-medium text-ocean-700 hover-underline"
          >
            BOM Capricornia–Hervey Bay →
          </Link>
        </div>
      </section>
    </div>
  );
}