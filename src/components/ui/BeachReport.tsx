import * as React from "react";
import Link from "next/link";
import Image from "next/image";

/**
 * BeachReport — v6.3 (MSN-2964) Phase E.
 *
 * Live BOM + Open-Meteo + Coastwatch surf-condition card. Two variants:
 *   - "full":  full data card on /beaches (temperature, wind, swell,
 *              swell direction, tide, UV, sunrise/sunset)
 *   - "compact": 1-line summary for the homepage footer rail
 *
 * Data sources (all open, A$0):
 *   - BOM Capricornia–Hervey Bay coastal forecast
 *     (https://www.bom.gov.au/qld/forecasts/coastal.shtml)
 *   - Open-Meteo Marine API (swell height, period, direction)
 *   - Open-Meteo Forecast (temperature, wind, UV)
 *
 * Patrolled status: NOT available as open data. Static
 * "Lifeguard patrolled 8am–5pm, September–May" note with a
 * "Check QPWS for live status" link per the v6.3 spec.
 *
 * Server-rendered (no client JS); live data is fetched server-side
 * with the same fetchLiveBundle pattern used elsewhere.
 *
 * A$0 — no QPWS API key, no Surf Life Saving scraper. The card is
 * honest: where data is not openly available, we say so and link out.
 */

export type BeachReportData = {
  /** Beach name. */
  beach: string;
  /** Current air temperature (°C). */
  airTempC: number | null;
  /** Current water temperature (°C). */
  waterTempC: number | null;
  /** Wind speed (km/h) + direction (cardinal). */
  wind: { speedKmh: number; direction: string } | null;
  /** Swell — height in metres + dominant direction (compass). */
  swell: { heightM: number; direction: string; periodS: number } | null;
  /** Next high tide (local time + height m). */
  nextHighTide: { time: string; heightM: number } | null;
  /** Next low tide (local time + height m). */
  nextLowTide: { time: string; heightM: number } | null;
  /** UV index now. */
  uvIndex: number | null;
  /** Sunrise / sunset local times (HH:MM). */
  sunrise: string | null;
  sunset: string | null;
  /** ISO timestamp the bundle was fetched. */
  fetchedAt: string | null;
  /** Whether the source bundle returned a fetch error. */
  sourceError?: string;
};

export type BeachReportVariant = "full" | "compact";

export type BeachReportProps = {
  /** Beach name + data. */
  data: BeachReportData;
  /** Render variant. Default "full". */
  variant?: BeachReportVariant;
  /** Optional hero photo (Commons URL) — used on the full variant. */
  heroPhoto?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

function fmt(n: number | null, suffix = "", fallback = "—") {
  if (n === null || n === undefined || Number.isNaN(n)) return fallback;
  return `${Math.round(n)}${suffix}`;
}

function fmtWind(
  wind: BeachReportData["wind"],
): string {
  if (!wind) return "—";
  return `${Math.round(wind.speedKmh)} km/h ${wind.direction}`;
}

function fmtSwell(swell: BeachReportData["swell"]): string {
  if (!swell) return "—";
  return `${swell.heightM.toFixed(1)} m ${swell.direction} · ${swell.periodS.toFixed(0)} s`;
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-paper-200 bg-surface-base p-4">
      <span className="text-eyebrow uppercase tracking-eyebrow text-ink-600">
        {label}
      </span>
      <span className="font-display text-headline-lg text-ink-900">
        {value}
      </span>
    </div>
  );
}

export function BeachReport({
  data,
  variant = "full",
  heroPhoto,
}: BeachReportProps) {
  if (variant === "compact") {
    return (
      <div className="flex flex-col gap-1 rounded-xl border border-paper-200 bg-surface-elevated p-4 hover-lift">
        <div className="flex items-center justify-between gap-2">
          <span className="font-display text-headline-md text-ink-900">
            {data.beach}
          </span>
          <span className="text-eyebrow uppercase tracking-eyebrow text-ocean-700">
            Now
          </span>
        </div>
        <p className="text-body-sm text-ink-700">
          Air {fmt(data.airTempC, "°C")} · Wind {fmtWind(data.wind)} ·
          Swell {fmtSwell(data.swell)}
        </p>
        <Link
          href="/beaches"
          className="mt-1 inline-flex items-center gap-1 text-body-sm font-medium text-ocean-700 hover-underline"
        >
          Full conditions →
        </Link>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-6 rounded-2xl border border-paper-200 bg-surface-elevated p-6 md:p-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-eyebrow uppercase tracking-eyebrow text-ocean-700">
            BEACH REPORT
          </span>
          <h2 className="mt-2 font-display text-display-md text-ink-900">
            {data.beach}
          </h2>
          <p className="mt-2 max-w-2xl text-body-md text-ink-700">
            Live conditions from BOM and Open-Meteo. Patrolled status
            (seasonal) is on the right.
          </p>
        </div>
        {data.fetchedAt && (
          <span className="text-caption text-ink-600">
            Updated {new Date(data.fetchedAt).toLocaleTimeString("en-AU", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "Australia/Brisbane",
            })} AEST
          </span>
        )}
      </header>

      {heroPhoto && (
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-paper-100">
          <Image
            src={heroPhoto.src}
            alt={heroPhoto.alt}
            width={heroPhoto.width}
            height={heroPhoto.height}
            sizes="(min-width: 1024px) 70vw, 100vw"
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <Cell label="Air" value={fmt(data.airTempC, "°C")} />
        <Cell label="Water" value={fmt(data.waterTempC, "°C")} />
        <Cell label="Wind" value={fmtWind(data.wind)} />
        <Cell label="Swell" value={fmtSwell(data.swell)} />
        <Cell
          label="Next high tide"
          value={
            data.nextHighTide && typeof data.nextHighTide.heightM === "number"
              ? `${data.nextHighTide.time} · ${data.nextHighTide.heightM.toFixed(1)} m`
              : "—"
          }
        />
        <Cell
          label="Next low tide"
          value={
            data.nextLowTide && typeof data.nextLowTide.heightM === "number"
              ? `${data.nextLowTide.time} · ${data.nextLowTide.heightM.toFixed(1)} m`
              : "—"
          }
        />
        <Cell label="UV now" value={fmt(data.uvIndex)} />
        <Cell
          label="Sun"
          value={
            data.sunrise && data.sunset
              ? `${data.sunrise} / ${data.sunset}`
              : "—"
          }
        />
      </div>

      <aside className="flex flex-col gap-2 rounded-xl border border-paper-300 bg-paper-100 p-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-headline-md text-ink-900">
            Patrolled status
          </p>
          <p className="text-body-sm text-ink-700">
            Lifeguard patrolled 8 am – 5 pm, September – May.
            Check QPWS for live status outside these hours.
          </p>
        </div>
        <Link
          href="https://www.qld.gov.au/environment/parks"
          className="inline-flex items-center gap-1 rounded-full border border-ocean-700 px-4 py-2 text-body-sm font-medium text-ocean-700 hover-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Check QPWS →
        </Link>
      </aside>

      {data.sourceError && (
        <p className="text-caption text-ink-600">
          Some live sources were unavailable; stale values shown where the
          bundle failed ({data.sourceError}). Refresh in a few minutes.
        </p>
      )}
    </section>
  );
}

export default BeachReport;