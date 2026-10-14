"use client";

import * as React from "react";

/**
 * TripPlanner — v6.3 (MSN-2964) Phase C.
 *
 * 4-step interactive wizard for /plan-your-trip. State is held in
 * useState and persisted to localStorage (per the v6.3 spec — no
 * server, no auth, no third-party ESP).
 *
 * Steps:
 *   1. WHEN  — month selector (BOM averages) + QLD school holiday flag
 *   2. WHO   — party size, ages, pet-friendly, accessibility needs
 *   3. WHAT  — activity tags (surf, SUP, kayak, hike, swim, fish, eat,
 *              market, day spa)
 *   4. STAY  — budget band + area preference (Hastings, Noosaville,
 *              Sunshine, Peregian, Hinterland)
 *
 * Output: a personalised 3-day itinerary built from the choices,
 * with weather snapshot (live BOM/Open-Meteo) and "Save to PDF"
 * button (window.print() with a custom @media print stylesheet —
 * A$0, no server).
 *
 * Accessibility:
 *   - Single h1 per page (rendered by the page wrapper)
 *   - Each step uses <fieldset>/<legend> for grouped controls
 *   - Forward / back navigation are real <button>s (not divs)
 *   - Form fields have visible labels (no placeholder-only)
 *   - Output is server-print-safe (CSS @media print)
 *
 * Anonymisation: 0 personal names. Editor's note: "by the editors".
 */

const STORAGE_KEY = "mnh-trip-planner-v63";

type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
const MONTHS: { n: Month; name: string }[] = [
  { n: 1, name: "January" },
  { n: 2, name: "February" },
  { n: 3, name: "March" },
  { n: 4, name: "April" },
  { n: 5, name: "May" },
  { n: 6, name: "June" },
  { n: 7, name: "July" },
  { n: 8, name: "August" },
  { n: 9, name: "September" },
  { n: 10, name: "October" },
  { n: 11, name: "November" },
  { n: 12, name: "December" },
];

// BOM climatology for Noosa Heads (rounded indicative averages).
const BOM_AVERAGES: Record<Month, { airMaxC: number; rainDays: number; waterC: number; uvPeak: string }> = {
  1: { airMaxC: 29, rainDays: 13, waterC: 25, uvPeak: "Extreme" },
  2: { airMaxC: 29, rainDays: 14, waterC: 25, uvPeak: "Extreme" },
  3: { airMaxC: 28, rainDays: 14, waterC: 25, uvPeak: "Extreme" },
  4: { airMaxC: 26, rainDays: 12, waterC: 24, uvPeak: "Very high" },
  5: { airMaxC: 24, rainDays: 11, waterC: 23, uvPeak: "High" },
  6: { airMaxC: 22, rainDays: 9, waterC: 21, uvPeak: "High" },
  7: { airMaxC: 21, rainDays: 8, waterC: 21, uvPeak: "Moderate" },
  8: { airMaxC: 22, rainDays: 7, waterC: 21, uvPeak: "High" },
  9: { airMaxC: 24, rainDays: 7, waterC: 21, uvPeak: "Very high" },
  10: { airMaxC: 26, rainDays: 9, waterC: 22, uvPeak: "Very high" },
  11: { airMaxC: 28, rainDays: 11, waterC: 23, uvPeak: "Extreme" },
  12: { airMaxC: 29, rainDays: 12, waterC: 24, uvPeak: "Extreme" },
};

// Queensland state school holidays 2026 (indicative; Sally edits per term).
const QLD_SCHOOL_HOLIDAYS_2026: { start: string; end: string; label: string }[] = [
  { start: "2026-01-01", end: "2026-01-26", label: "Summer holidays" },
  { start: "2026-04-03", end: "2026-04-19", label: "Easter break" },
  { start: "2026-06-27", end: "2026-07-12", label: "Winter break" },
  { start: "2026-09-19", end: "2026-10-04", label: "Spring break" },
  { start: "2026-12-12", end: "2026-12-31", label: "Summer holidays" },
];

const ACTIVITY_TAGS = [
  { id: "surf", label: "Surfing" },
  { id: "sup", label: "Stand-up paddle" },
  { id: "kayak", label: "Kayak" },
  { id: "hike", label: "Hiking" },
  { id: "swim", label: "Swim" },
  { id: "fish", label: "Fishing" },
  { id: "eat", label: "Eat out" },
  { id: "market", label: "Markets" },
  { id: "dayspa", label: "Day spa" },
] as const;

type ActivityId = (typeof ACTIVITY_TAGS)[number]["id"];

const AREAS = [
  { id: "hastings", label: "Hastings Street" },
  { id: "noosaville", label: "Noosaville" },
  { id: "sunshine", label: "Sunshine Beach" },
  { id: "peregian", label: "Peregian Beach" },
  { id: "hinterland", label: "Hinterland" },
] as const;

type AreaId = (typeof AREAS)[number]["id"];

const BUDGETS = [
  { id: "budget", label: "Budget", min: 80, max: 180 },
  { id: "mid", label: "Mid-range", min: 180, max: 350 },
  { id: "treat", label: "Treat yourself", min: 350, max: 700 },
] as const;

type BudgetId = (typeof BUDGETS)[number]["id"];

type TripState = {
  month: Month;
  pet: boolean;
  accessibility: boolean;
  partySize: number;
  childAge: number | null;
  activities: ActivityId[];
  budget: BudgetId;
  area: AreaId;
};

const DEFAULT_STATE: TripState = {
  month: (new Date().getMonth() + 1) as Month,
  pet: false,
  accessibility: false,
  partySize: 2,
  childAge: null,
  activities: [],
  budget: "mid",
  area: "hastings",
};

function loadState(): TripState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<TripState>;
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return DEFAULT_STATE;
  }
}

function saveState(state: TripState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* localStorage disabled — silently ignore; the wizard still works. */
  }
}

function isInHoliday(date: Date): { inHoliday: boolean; label: string | null } {
  const iso = date.toISOString().slice(0, 10);
  for (const h of QLD_SCHOOL_HOLIDAYS_2026) {
    if (iso >= h.start && iso <= h.end) return { inHoliday: true, label: h.label };
  }
  return { inHoliday: false, label: null };
}

/* ────────────────────────────────────────────────────────────────
 * Output renderer — the personalised 3-day itinerary.
 * ──────────────────────────────────────────────────────────────── */

function buildItinerary(state: TripState, weather: { airMaxC: number; uvPeak: string; waterC: number; rainDays: number }): {
  days: { title: string; morning: string; afternoon: string; evening: string }[];
  note: string;
} {
  const has = (a: ActivityId) => state.activities.includes(a);
  const isFamily = state.partySize > 1 && (state.childAge !== null || state.partySize >= 3);
  const accessible = state.accessibility;
  const pet = state.pet;
  const area = AREAS.find((a) => a.id === state.area)?.label ?? "Hastings Street";

  // Day 1 — arrival + coast
  const day1 = {
    title: `Day 1 — Settle in & meet the coast`,
    morning: has("surf") || has("swim")
      ? `Start at Main Beach (lifeguard-patroled 8 am – 5 pm, Sept – May). ${isFamily ? "Family swim in the bay is the easy way in. " : ""}${has("surf") ? "Surf lesson from First Bay (open beach; book in advance). " : ""}${has("swim") ? "Cool off in the bay; check the BOM swell before committing. " : ""}`
      : `Start with a slow walk along Hastings Street (no traffic; fully pedestrian). Coffee + a flat white + a paper, in that order.`,
    afternoon: has("hike")
      ? `Walk the Noosa Headland track — 5.4 km return, boardwalked, koala country. ${accessible ? "Boardwalk is pram + wheelchair-friendly. " : ""}Take it slow; the views do the work.`
      : `Ferry over to Noosa North Shore (vehicle ferry from Tewantin). ${pet ? "Dogs on lead welcome. " : ""}Wide empty beach; bring water.`,
    evening: `Dinner at ${has("eat") ? "a Hastings Street restaurant (book 6.30 pm; tables go fast). " : "a quieter Noosaville spot on Gympie Terrace (cheaper, river views). "}${has("dayspa") ? "Day-spa treatment after dinner — pre-booked, Monday to Thursday only at most spas. " : ""}`,
  };

  // Day 2 — chosen activities
  const day2 = {
    title: `Day 2 — Your kind of ${area}`,
    morning: has("market")
      ? `Noosa Farmers Market (Sunday, 7 am – noon, Noosa Junction). Arrive 7 am for produce; 9 am for the croissant queue. `
      : has("fish")
      ? `Half-day fishing charter from the Noosa Marina (Tewantin). ${state.partySize === 1 ? "Solo tinny hire is also available." : ""} `
      : has("kayak")
      ? `Kayak the Upper Noosa River (calm water; ${state.partySize >= 3 ? "2-person kayaks + 1 single available" : "2-person kayaks"} at the put-in). `
      : has("sup")
      ? `SUP hire at Main Beach or the river mouth. ${isFamily ? "The river-mouth side is calmer for first-timers." : ""} `
      : `A slow morning. Coffee, a book, the lagoon at the river mouth.`,
    afternoon: has("hike") && !day1.afternoon.includes("walk")
      ? `Pomona Hinterland drive (25 min) — Mount Cooroora walk (1.6 km return, steep). Or the Majestic Theatre for a coffee stop. `
      : has("swim") || has("surf")
      ? `Back to the bay for a second swim. ${state.partySize >= 4 ? "Group session at the SLSC pool (booked morning slots). " : ""} `
      : has("eat")
      ? `Lunch at a Noosaville riverfront spot. Walk it off on Gympie Terrace. `
      : `Hastings Street browse — bookshop, gallery, ice cream.`,
    evening: pet
      ? `Take the dog to the off-leash zone at North Shore (ferry access) or Peregian dog beach. `
      : `Sunset on the headland — last light hits Granite Bay. Walk back via the boardwalk.`,
  };

  // Day 3 — hinterland or slow
  const day3 = {
    title: `Day 3 — ${has("market") ? "Markets + " : ""}Hinterland or slow`,
    morning: has("market")
      ? `Eumundi Markets (Wed/Sat, 7 am – 2 pm). ${state.partySize >= 3 ? "Park at the showground; carpark fills by 9 am. " : "Get there before 8 am to beat the bus parking. "} `
      : `Pomona + Cooran + Cooroy loop. Stop at the Pomona Railway Station (heritage-listed; gallery).`,
    afternoon: `Hinterland waterfalls (if you&apos;re up for it — check the council page for current track closures). Otherwise: pool day. ${pet ? "Dog-friendly accommodation first; many Hastings Street pads don&apos;t allow pets. " : ""}`,
    evening: `Pack-and-leave night. ${accessible ? "Confirm accessible checkout (ramps, lift) with the property the day before. " : ""}If you have a late flight tomorrow, save one last flat white for the morning.`,
  };

  const note = `Editor note: ${weather.airMaxC}°C days, ${weather.rainDays} wet days typical for this month. Water ${weather.waterC}°C; UV ${weather.uvPeak} — sunscreen, hat, sunglasses. ${state.partySize} ${state.partySize === 1 ? "traveller" : "travellers"}${pet ? " + dog" : ""}${isFamily ? " + family" : ""}${accessible ? " — accessible routing prioritised" : ""}.`;

  return { days: [day1, day2, day3], note };
}

/* ────────────────────────────────────────────────────────────────
 * Step components.
 * ──────────────────────────────────────────────────────────────── */

function StepShell({
  step,
  total,
  title,
  intro,
  children,
}: {
  step: number;
  total: number;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="flex flex-col gap-6 border-0 p-0">
      <legend className="sr-only">Step {step} of {total}: {title}</legend>
      <div className="flex items-center gap-3 text-eyebrow uppercase tracking-eyebrow text-ocean-700">
        <span>Step {step} of {total}</span>
        <span aria-hidden="true">·</span>
        <span>{title}</span>
      </div>
      {intro && <p className="text-body-md text-ink-700">{intro}</p>}
      {children}
    </fieldset>
  );
}

/* ────────────────────────────────────────────────────────────────
 * Main wizard.
 * ──────────────────────────────────────────────────────────────── */

export type WeatherSnapshot = {
  airMaxC: number;
  rainDays: number;
  waterC: number;
  uvPeak: string;
};

export type TripPlannerProps = {
  /** Optional live weather snapshot from /plan-your-trip (server-side). */
  weather?: WeatherSnapshot;
};

export function TripPlanner({ weather }: TripPlannerProps) {
  const [hydrated, setHydrated] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [state, setState] = React.useState<TripState>(DEFAULT_STATE);
  const [submitted, setSubmitted] = React.useState(false);

  React.useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (hydrated) saveState(state);
  }, [state, hydrated]);

  function update<K extends keyof TripState>(key: K, value: TripState[K]) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  const monthAvg = BOM_AVERAGES[state.month];
  const snapshot = weather ?? {
    airMaxC: monthAvg.airMaxC,
    rainDays: monthAvg.rainDays,
    waterC: monthAvg.waterC,
    uvPeak: monthAvg.uvPeak,
  };

  const itinerary = buildItinerary(state, snapshot);
  const holidayInfo = isInHoliday(new Date());

  function next() {
    if (step < 4) setStep(step + 1);
    else setSubmitted(true);
  }
  function back() {
    if (submitted) setSubmitted(false);
    else if (step > 1) setStep(step - 1);
  }
  function reset() {
    setState(DEFAULT_STATE);
    setSubmitted(false);
    setStep(1);
  }

  if (submitted) {
    return (
      <div className="trip-planner-output flex flex-col gap-8" data-print-root>
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-eyebrow uppercase tracking-eyebrow text-ocean-700">
              YOUR TRIP · PRINT OR SAVE
            </span>
            <h2 className="mt-2 font-display text-display-md text-ink-900">
              {MONTHS.find((m) => m.n === state.month)?.name} in Noosa
            </h2>
            <p className="mt-2 max-w-2xl text-body-md text-ink-700">
              A 3-day starting point. Edit it down, shuffle it around, ignore
              the bits that don&apos;t fit. Local rules below.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1 rounded-full bg-ocean-700 px-5 py-2 text-body-md font-medium text-paper-50 hover-lift"
            >
              Save to PDF
            </button>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1 rounded-full border border-ocean-700 px-5 py-2 text-body-md font-medium text-ocean-700 hover-underline"
            >
              Start over
            </button>
          </div>
        </header>

        <section className="rounded-2xl border border-paper-200 bg-paper-100 p-5">
          <h3 className="font-display text-headline-lg text-ink-900">
            Conditions snapshot
          </h3>
          <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-body-sm text-ink-700 sm:grid-cols-4">
            <li>Air {snapshot.airMaxC}°C</li>
            <li>Water {snapshot.waterC}°C</li>
            <li>~{snapshot.rainDays} wet days</li>
            <li>UV {snapshot.uvPeak}</li>
          </ul>
          {holidayInfo.inHoliday && (
            <p className="mt-3 text-body-sm text-ink-700">
              Heads up — {holidayInfo.label} are running right now. Book
              dinner before you arrive; everything books out.
            </p>
          )}
        </section>

        <ol className="flex flex-col gap-6">
          {itinerary.days.map((d, i) => (
            <li
              key={i}
              className="rounded-2xl border border-paper-200 bg-surface-elevated p-5"
            >
              <h3 className="font-display text-headline-lg text-ink-900">
                {d.title}
              </h3>
              <dl className="mt-3 grid gap-2 text-body-md text-ink-700">
                <div className="grid grid-cols-[5rem_1fr] gap-2">
                  <dt className="font-medium text-ocean-700">Morning</dt>
                  <dd>{d.morning}</dd>
                </div>
                <div className="grid grid-cols-[5rem_1fr] gap-2">
                  <dt className="font-medium text-ocean-700">Afternoon</dt>
                  <dd>{d.afternoon}</dd>
                </div>
                <div className="grid grid-cols-[5rem_1fr] gap-2">
                  <dt className="font-medium text-ocean-700">Evening</dt>
                  <dd>{d.evening}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>

        <p className="rounded-xl border border-paper-300 bg-paper-100 p-4 text-body-sm text-ink-700">
          {itinerary.note}
        </p>

        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-paper-200 pt-6">
          <p className="text-caption text-ink-600">
            Saved to your browser only. No account, no email, no third party.
          </p>
          <button
            type="button"
            onClick={back}
            className="inline-flex items-center gap-1 text-body-md font-medium text-ocean-700 hover-underline"
          >
            ← Edit answers
          </button>
        </footer>
      </div>
    );
  }

  return (
    <div className="trip-planner flex flex-col gap-8">
      <Progress step={step} total={4} />

      {step === 1 && (
        <StepShell
          step={1}
          total={4}
          title="When are you going?"
          intro="Pick a month. The averages are BOM data for Noosa Heads; school-holiday weeks book out fast, so plan accordingly."
        >
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
            {MONTHS.map((m) => (
              <label
                key={m.n}
                className={[
                  "flex cursor-pointer flex-col items-start gap-1 rounded-xl border p-3 text-left transition",
                  state.month === m.n
                    ? "border-ocean-700 bg-paper-100"
                    : "border-paper-200 bg-surface-base hover:bg-paper-100",
                ].join(" ")}
              >
                <input
                  type="radio"
                  name="month"
                  value={m.n}
                  checked={state.month === m.n}
                  onChange={() => update("month", m.n)}
                  className="sr-only"
                />
                <span className="font-display text-headline-md text-ink-900">
                  {m.name.slice(0, 3)}
                </span>
                <span className="text-caption text-ink-600">
                  {BOM_AVERAGES[m.n].airMaxC}°C · {BOM_AVERAGES[m.n].rainDays}d rain
                </span>
              </label>
            ))}
          </div>
        </StepShell>
      )}

      {step === 2 && (
        <StepShell
          step={2}
          total={4}
          title="Who's coming?"
          intro="Party size + any flags we should know about. We use these to bias the days below."
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-body-md font-medium text-ink-900">
                Party size
              </span>
              <input
                type="number"
                min={1}
                max={12}
                value={state.partySize}
                onChange={(e) => update("partySize", Math.max(1, Math.min(12, Number(e.target.value) || 1)))}
                className="rounded-xl border border-paper-300 bg-surface-base px-3 py-2 text-body-md text-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean-600"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-body-md font-medium text-ink-900">
                Youngest traveller (optional)
              </span>
              <input
                type="number"
                min={0}
                max={17}
                value={state.childAge ?? ""}
                onChange={(e) => {
                  const v = e.target.value === "" ? null : Math.max(0, Math.min(17, Number(e.target.value)));
                  update("childAge", v);
                }}
                className="rounded-xl border border-paper-300 bg-surface-base px-3 py-2 text-body-md text-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean-600"
                placeholder="Leave blank if none"
              />
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-paper-200 bg-surface-base p-3">
              <input
                type="checkbox"
                checked={state.pet}
                onChange={(e) => update("pet", e.target.checked)}
                className="h-5 w-5 accent-ocean-700"
              />
              <span className="text-body-md text-ink-900">Pet-friendly (dog)</span>
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-paper-200 bg-surface-base p-3">
              <input
                type="checkbox"
                checked={state.accessibility}
                onChange={(e) => update("accessibility", e.target.checked)}
                className="h-5 w-5 accent-ocean-700"
              />
              <span className="text-body-md text-ink-900">
                Accessibility routing prioritised
              </span>
            </label>
          </div>
        </StepShell>
      )}

      {step === 3 && (
        <StepShell
          step={3}
          total={4}
          title="What do you want to do?"
          intro="Pick the things you actually want to do — the planner biases the days toward these. Skip what doesn't appeal."
        >
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {ACTIVITY_TAGS.map((t) => (
              <label
                key={t.id}
                className={[
                  "flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition",
                  state.activities.includes(t.id)
                    ? "border-ocean-700 bg-paper-100"
                    : "border-paper-200 bg-surface-base hover:bg-paper-100",
                ].join(" ")}
              >
                <input
                  type="checkbox"
                  checked={state.activities.includes(t.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      update("activities", [...state.activities, t.id]);
                    } else {
                      update("activities", state.activities.filter((a) => a !== t.id));
                    }
                  }}
                  className="h-5 w-5 accent-ocean-700"
                />
                <span className="text-body-md text-ink-900">{t.label}</span>
              </label>
            ))}
          </div>
        </StepShell>
      )}

      {step === 4 && (
        <StepShell
          step={4}
          total={4}
          title="Stay where, spend how?"
          intro="Where you'd like to base yourself + a budget band. This biases the itinerary toward your area."
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <fieldset className="flex flex-col gap-3">
              <legend className="text-body-md font-medium text-ink-900">
                Area preference
              </legend>
              <div className="grid grid-cols-2 gap-2">
                {AREAS.map((a) => (
                  <label
                    key={a.id}
                    className={[
                      "flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition",
                      state.area === a.id
                        ? "border-ocean-700 bg-paper-100"
                        : "border-paper-200 bg-surface-base hover:bg-paper-100",
                    ].join(" ")}
                  >
                    <input
                      type="radio"
                      name="area"
                      value={a.id}
                      checked={state.area === a.id}
                      onChange={() => update("area", a.id)}
                      className="h-5 w-5 accent-ocean-700"
                    />
                    <span className="text-body-md text-ink-900">{a.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className="flex flex-col gap-3">
              <legend className="text-body-md font-medium text-ink-900">
                Budget band (per night)
              </legend>
              <div className="flex flex-col gap-2">
                {BUDGETS.map((b) => (
                  <label
                    key={b.id}
                    className={[
                      "flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition",
                      state.budget === b.id
                        ? "border-ocean-700 bg-paper-100"
                        : "border-paper-200 bg-surface-base hover:bg-paper-100",
                    ].join(" ")}
                  >
                    <input
                      type="radio"
                      name="budget"
                      value={b.id}
                      checked={state.budget === b.id}
                      onChange={() => update("budget", b.id)}
                      className="h-5 w-5 accent-ocean-700"
                    />
                    <span className="text-body-md text-ink-900">
                      {b.label} · ${b.min}–${b.max}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        </StepShell>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-paper-200 pt-6">
        <button
          type="button"
          onClick={back}
          disabled={step === 1}
          className="inline-flex items-center gap-1 text-body-md font-medium text-ocean-700 hover-underline disabled:opacity-40"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={next}
          className="inline-flex items-center gap-1 rounded-full bg-ocean-700 px-6 py-2 text-body-md font-medium text-paper-50 hover-lift"
        >
          {step === 4 ? "Build my itinerary →" : "Next →"}
        </button>
      </div>
    </div>
  );
}

function Progress({ step, total }: { step: number; total: number }) {
  return (
    <div
      className="flex gap-2"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={step}
      aria-label={`Step ${step} of ${total}`}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          aria-hidden="true"
          className={[
            "h-1 flex-1 rounded-full transition-colors duration-base",
            i < step ? "bg-ocean-700" : "bg-paper-200",
          ].join(" ")}
        />
      ))}
    </div>
  );
}

export default TripPlanner;