/**
 * V2LiveTiles — the five live conditions tiles.
 *
 * MSN-3100. The tiles are the hero data feature of the page. They consume
 * the EXISTING server-side bundle from lib/live-data.ts — no new API calls,
 * no hardcoded values, no mocks. The upstream 6-second budget and the
 * "Unavailable" fallback are untouched: when lib/live-data.ts cannot reach
 * an upstream inside its budget it hands us a tile whose state is
 * "unavailable" and whose value is the literal string "unavailable", and we
 * render exactly that.
 *
 * Per-tile source attribution and the refresh timestamp are preserved.
 */

import type { ReactNode } from "react";
import type { LiveDataState, LiveTile } from "@/lib/live-data";

export type V2LiveTileSpec = {
  /** Short label for the tile ("Surf — Noosa Heads"). */
  label: string;
  /** Icon element. */
  icon: ReactNode;
  tile: LiveTile;
};

export type V2LiveTilesProps = {
  specs: V2LiveTileSpec[];
  /** ISO timestamp of the bundle refresh — rendered per tile. */
  asOf: string;
  /** Footnote under the band (the bundle's own source note). */
  note?: ReactNode;
};

const STATE_TEXT: Record<LiveDataState, string> = {
  fresh: "Live",
  stale: "Stale",
  unavailable: "Unavailable",
};

const STATE_CLASS: Record<LiveDataState, string> = {
  fresh: "v2-tile__state--fresh",
  stale: "v2-tile__state--stale",
  unavailable: "v2-tile__state--unavailable",
};

/** Brisbane-local, human-readable refresh stamp. */
function formatStamp(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Brisbane",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);
}

export function V2LiveTiles({ specs, asOf, note }: V2LiveTilesProps) {
  const stamp = formatStamp(asOf);

  return (
    <div>
      <ul
        className="v2-tiles v2-list-reset"
        aria-label="Live surf, wind, tide and UV conditions"
      >
        {specs.map((spec) => {
          const state = spec.tile.state;
          const unavailable = state === "unavailable";
          const valueClass = unavailable
            ? "v2-tile__value v2-tile__value--unavailable"
            : "v2-tile__value";
          return (
            <li key={spec.label} className="v2-tile">
              <div className="v2-tile__head">
                <span className="v2-tile__kind">
                  <span className="v2-tile__icon" aria-hidden="true">
                    {spec.icon}
                  </span>
                  {spec.label}
                </span>
                <span className={"v2-tile__state " + STATE_CLASS[state]}>
                  <span className="v2-dot" aria-hidden="true" />
                  {STATE_TEXT[state]}
                </span>
              </div>

              <p className={valueClass}>{spec.tile.value}</p>

              {spec.tile.secondary ? (
                <p className="v2-tile__detail">{spec.tile.secondary}</p>
              ) : null}

              <div className="v2-tile__foot">
                <span className="v2-tile__source">{spec.tile.source}</span>
                <time className="v2-tile__stamp" dateTime={asOf}>
                  {stamp} AEST
                </time>
              </div>
            </li>
          );
        })}
      </ul>
      {note ? <p className="v2-band__note">{note}</p> : null}
    </div>
  );
}
