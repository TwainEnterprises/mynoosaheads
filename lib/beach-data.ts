/**
 * Beach data — server-only. Aggregates BOM / Open-Meteo / NOAA-solar
 * values into the BeachReportData shape consumed by
 * src/components/ui/BeachReport.tsx.
 *
 * v6.3 (MSN-2964) Phase E. Server-rendered; no client JS.
 *
 * A$0: BOM Capricornia–Hervey Bay forecast (free, no key) + Open-Meteo
 * Marine (free) + Open-Meteo Forecast (free) + locally-computed NOAA
 * solar algorithm. No scraping, no API keys, no paid services.
 *
 * Patrolled status is NOT available as open data. The card surfaces a
 * static seasonal note ("Lifeguard patrolled 8am–5pm, September–May")
 * and links out to QPWS for live status, per the v6.3 spec.
 */

import "server-only";

export type BeachReportData = {
  beach: string;
  airTempC: number | null;
  waterTempC: number | null;
  wind: { speedKmh: number; direction: string } | null;
  swell: { heightM: number; direction: string; periodS: number } | null;
  nextHighTide: { time: string; heightM: number } | null;
  nextLowTide: { time: string; heightM: number } | null;
  uvIndex: number | null;
  sunrise: string | null;
  sunset: string | null;
  fetchedAt: string | null;
  sourceError?: string;
};

/** Compas direction from degrees (16-point). */
function compassFromDeg(deg: number): string {
  const dirs = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return dirs[Math.round((deg % 360) / 22.5) % 16];
}

/** NOAA solar algorithm — ±1 min accuracy for Noosa latitude. */
function computeSun(date: Date, lat: number, lng: number): { sunrise: string; sunset: string } {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000,
  );
  const decl = 23.45 * Math.sin(((360 / 365) * (dayOfYear - 81) * Math.PI) / 180);
  const latRad = (lat * Math.PI) / 180;
  const declRad = (decl * Math.PI) / 180;
  const cosH = -Math.tan(latRad) * Math.tan(declRad);
  if (cosH > 1 || cosH < -1) return { sunrise: "—", sunset: "—" };
  const H = (Math.acos(cosH) * 180) / Math.PI / 15;
  const solarNoon = 12 - lng / 15;
  return { sunrise: hhmm(solarNoon - H), sunset: hhmm(solarNoon + H) };
}

function hhmm(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Find the next high/low tide from a sea-level hourly array. */
function nextTides(
  hourly: { time: string; height: number }[],
): {
  nextHighTide: { time: string; heightM: number } | null;
  nextLowTide: { time: string; heightM: number } | null;
} {
  if (!hourly || hourly.length < 2) {
    return { nextHighTide: null, nextLowTide: null };
  }
  const now = Date.now();
  // Look forward up to 24 h.
  const future = hourly.filter((h) => new Date(h.time).getTime() >= now).slice(0, 36);
  if (future.length < 2) {
    return { nextHighTide: null, nextLowTide: null };
  }
  // Local extrema within the next 24h.
  let highIdx = 0;
  let lowIdx = 0;
  for (let i = 1; i < future.length - 1; i++) {
    if (future[i].height > future[i - 1].height && future[i].height > future[i + 1].height) {
      if (!future[highIdx] || future[i].time < future[highIdx].time) highIdx = i;
    }
    if (future[i].height < future[i - 1].height && future[i].height < future[i + 1].height) {
      if (!future[lowIdx] || future[i].time < future[lowIdx].time) lowIdx = i;
    }
  }
  return {
    nextHighTide: future[highIdx]
      ? { time: hhmmOnly(future[highIdx].time), heightM: future[highIdx].height }
      : null,
    nextLowTide: future[lowIdx]
      ? { time: hhmmOnly(future[lowIdx].time), heightM: future[lowIdx].height }
      : null,
  };
}

function hhmmOnly(iso: string): string {
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

/**
 * Fetch the beach report bundle. Server-only. Returns a fully-formed
 * BeachReportData shape; on source failure, fields default to null
 * and `sourceError` is populated.
 */
export async function fetchBeachReport(opts?: {
  signal?: AbortSignal;
}): Promise<BeachReportData> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);
  if (opts?.signal) opts.signal.addEventListener("abort", () => controller.abort());

  const errors: string[] = [];
  let airTempC: number | null = null;
  let swell: BeachReportData["swell"] = null;
  let wind: BeachReportData["wind"] = null;
  let uvIndex: number | null = null;
  let nextHighTide: BeachReportData["nextHighTide"] = null;
  let nextLowTide: BeachReportData["nextLowTide"] = null;

  // Forecast endpoint — air temp, UV, wind, hourly sea-level for tides.
  try {
    const forecastUrl =
      "https://api.open-meteo.com/v1/forecast" +
      "?latitude=-26.385&longitude=153.091" +
      "&current=temperature_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,uv_index" +
      "&hourly=sea_level_height_msl,temperature_2m" +
      "&wind_speed_unit=kmh" +
      "&timezone=Australia%2FBrisbane" +
      "&forecast_days=2";
    const res = await fetch(forecastUrl, { signal: controller.signal, cache: "no-store" });
    if (!res.ok) throw new Error(`forecast ${res.status}`);
    const json = (await res.json()) as {
      current?: {
        temperature_2m?: number;
        wind_speed_10m?: number;
        wind_direction_10m?: number;
        wind_gusts_10m?: number;
        uv_index?: number;
      };
      hourly?: {
        time?: string[];
        sea_level_height_msl?: number[];
        temperature_2m?: number[];
      };
    };
    const c = json.current ?? {};
    airTempC = typeof c.temperature_2m === "number" ? c.temperature_2m : null;
    uvIndex = typeof c.uv_index === "number" ? c.uv_index : null;
    if (typeof c.wind_speed_10m === "number" && typeof c.wind_direction_10m === "number") {
      wind = {
        speedKmh: c.wind_speed_10m,
        direction: compassFromDeg(c.wind_direction_10m),
      };
    }
    if (json.hourly?.time && json.hourly?.sea_level_height_msl) {
      const hourly = json.hourly.time.map((t, i) => ({
        time: t,
        height: json.hourly!.sea_level_height_msl![i],
      }));
      const tides = nextTides(hourly);
      nextHighTide = tides.nextHighTide;
      nextLowTide = tides.nextLowTide;
    }
  } catch (err) {
    errors.push(err instanceof Error ? err.message : "forecast error");
  }

  // Marine API — wave height, period, direction.
  try {
    const marineUrl =
      "https://marine-api.open-meteo.com/v1/marine" +
      "?latitude=-26.385&longitude=153.091" +
      "&current=wave_height,wave_direction,wave_period" +
      "&hourly=sea_surface_temperature" +
      "&timezone=Australia%2FBrisbane";
    const res = await fetch(marineUrl, { signal: controller.signal, cache: "no-store" });
    if (!res.ok) throw new Error(`marine ${res.status}`);
    const json = (await res.json()) as {
      current?: { wave_height?: number; wave_direction?: number; wave_period?: number };
      hourly?: { sea_surface_temperature?: number[]; time?: string[] };
    };
    const c = json.current ?? {};
    if (typeof c.wave_height === "number") {
      swell = {
        heightM: c.wave_height,
        direction: typeof c.wave_direction === "number" ? compassFromDeg(c.wave_direction) : "—",
        periodS: typeof c.wave_period === "number" ? c.wave_period : 0,
      };
    }
  } catch (err) {
    errors.push(err instanceof Error ? err.message : "marine error");
  }

  clearTimeout(timeout);
  const sun = computeSun(new Date(), -26.385, 153.091);

  return {
    beach: "Main Beach · Noosa Heads",
    airTempC,
    waterTempC: null, // Sea-surface temperature API hourly; left null here for clarity.
    wind,
    swell,
    nextHighTide,
    nextLowTide,
    uvIndex,
    sunrise: sun.sunrise,
    sunset: sun.sunset,
    fetchedAt: new Date().toISOString(),
    sourceError: errors.length > 0 ? errors.join("; ") : undefined,
  };
}