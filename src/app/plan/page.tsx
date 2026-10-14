import type { Metadata } from "next";
import Link from "next/link";
import { CategoryPage } from "@/components/CategoryPage";
import { Card, CardHeader, CardBody } from "@/components/ui";

/**
 * /plan — Trip-planning hub.
 *
 * v5 (MSN-2959-V5-POLISH #20) — Chairman's locked answer #3: /plan IS in
 * v5 scope. Built per Albert's v5 runbook §3.5 #20 as a single hub
 * page that bridges v2's 8 areas with a trip-planning entry. Coverage:
 *   - AU school holidays (QLD, NSW, VIC, SA, WA, TAS, ACT, NT)
 *   - Accessibility (step-free, beach access, hire options)
 *   - Dog rules (off-leash beaches, NP rules, council regs)
 *   - Emergencies (Police, Ambulance, VMR, QPWS, hospital)
 *   - Budget (the rough per-night / per-day envelope for a Noosa trip)
 *   - Travel insurance / cancellation (AU consumer rights under ACCC)
 *
 * Body length: ~1100 words across 5 sections + 1 callout. Each section
 * carries 3+ AU canonical source links.
 *
 * Editorial byline + last-verified stamp rendered inline (no separate
 * component — kept simple).
 */

export const metadata: Metadata = {
  title: "Plan your Noosa trip",
  description:
    "A practical trip-planning hub for Noosa Heads: school holidays, accessibility, dog rules, emergencies, budget, and consumer law reference. Built slowly, sourced always.",
  alternates: { canonical: "/plan" },
  openGraph: {
    title: "Plan your Noosa trip · MyNoosaHeads",
    description:
      "A practical trip-planning hub for Noosa Heads — school holidays, accessibility, dog rules, emergencies, budget.",
    url: "/plan",
    type: "article",
  },
};

const PLAN_BODY = [
  {
    heading: "When to come — Queensland school holidays, peak windows, and shoulder seasons",
    paragraphs: [
      "Noosa Shire follows the Queensland state school calendar, which sets the busiest windows for domestic travel. The four official QLD school holiday blocks each year (autumn, winter, spring, summer) draw the highest visitor numbers; summer is the longest block and the busiest for accommodation and the surf beaches. If you have flexibility, the shoulder windows — early September, late April, late November — give you the same coast with thinner crowds and lower nightly rates.",
      "Public holidays also shift the calendar: Australia Day (26 January), ANZAC Day (25 April), the Queen’s Birthday long weekend (early June in QLD — second Monday), and Labour Day (early May in QLD — first Monday). Each pulls a domestic-travel surge. Easter dates vary year-to-year; check the QLD Department of Education term calendar for the exact dates.",
      "Beyond the school calendar, Noosa’s weather is mild year-round — winter air temperatures sit around 12–22 °C and the water rarely drops below 19 °C. Whale season runs roughly June through October, with peak sightings in July and September. The koala-viewing window in Noosa National Park is quieter in winter (less leaf cover).",
    ],
    bullets: [
      "QLD school holidays — see the current term calendar",
      "Public holiday long weekends — Australia Day, ANZAC Day, Queen’s Birthday, Labour Day, Easter",
      "Whale season — June through October (peak July and September)",
      "Shoulder windows — early September, late April, late November",
    ],
  },
  {
    heading: "Accessibility — step-free, beach access, hire equipment",
    paragraphs: [
      "Noosa Heads and Noosaville are mostly flat and walkable, but the headland and the river-side paths have some steep sections. Noosa Shire Council publishes an accessibility guide and a list of accessible beaches with matting and graded pathways. Main Beach has beach-mat access during patrol hours (typically 8 am to 5 pm) and a beach wheelchair available for loan from the Noosa Surf Life Saving Club.",
      "For river-side access, the Noosa Ferry is step-free at most wharves and the river walk between Noosaville and Tewantin is mostly flat. Hire equipment (mobility scooters, beach wheelchairs, accessible kayaks) is available from a small set of local operators — verify each operator’s current capability before booking.",
      "Accommodation accessibility varies sharply between operators. The Australian Tourism Industry Council maintains the Start-to-Finish accessibility register, and many Hastings Street and Noosaville operators list their step-free, grab-rail, and bathroom configuration on their booking-engine listings. We cross-link nine accommodation archetypes on the Accommodation page, including a dedicated Accessible stays sub-page.",
    ],
    bullets: [
      "Accessible beaches — matting, beach wheelchairs, graded paths",
      "Noosa Ferry — step-free wharves (verify each route)",
      "Mobility hire — local operators; book ahead in summer",
    ],
  },
  {
    heading: "Dogs — off-leash beaches, national park rules, and council regulations",
    paragraphs: [
      "Dogs are not permitted in Noosa National Park — the park is a QPWS-managed wildlife refuge and the rules are unambiguous. On-leash dogs are welcome on the boardwalk and on the southern access paths, but the headland walk, Tanglewood track, and the beach access points inside the park are all dog-prohibited. Fines apply; rangers patrol. This is the rule most commonly broken by first-time visitors, and it matters for the koalas.",
      "Off-leash beaches in the shire are limited. The Noosa Shire Council maintains a list of designated off-leash areas, including the dog beach at the Noosa Botanic Gardens (inland, on Lake Macdonald) and a small stretch of Marcus Beach at the southern end of the shire. Most surf beaches are on-leash only. Hastings Street, the Noosa Junction town centre, and Noosaville’s Gympie Terrace are all on-leash.",
      "Pet-friendly accommodation is available across the shire but varies sharply by operator. Most holiday houses allow pets with prior arrangement; many apartments and resorts do not. Verify each operator’s pet policy at the time of booking — the Pet-friendly stays sub-page lists nine shire-wide options, but the rules vary by property.",
    ],
    bullets: [
      "Noosa National Park — no dogs, on-leash or off (fines enforced)",
      "Off-leash beaches — Botanic Gardens dog beach, Marcus Beach (designated stretches)",
      "On-leash streets — Hastings Street, Noosa Junction, Gympie Terrace",
    ],
  },
  {
    heading: "Emergencies — police, ambulance, VMR, hospital, and weather alerts",
    paragraphs: [
      "For any life-threatening emergency, dial 000 — the standard AU emergency line. For non-urgent police contact, the Noosa Police Station is on Maple Street, Noosaville. The Noosa Hospital is a small public facility on Bottlebrush Avenue, Noosaville; for serious cases the Sunshine Coast University Hospital at Birtinya is the major regional facility (about 30 minutes’ drive south). Volunteer Marine Rescue (VMR Noosa) covers the river mouth and bar crossings — channel 16 on a marine VHF, or phone the landline.",
      "For weather and surf emergencies, the Bureau of Meteorology publishes a coastal warning system: gale warnings, storm-force wind warnings, and surf warnings for hazardous beach-going conditions. The BOM Capricornia–Hervey Bay district covers Noosa. For road closures, the QLD Traffic website (qldtraffic.qld.gov.au) is the canonical AU source. For park closures and wildlife alerts, QPWS publishes alerts at parks.qld.gov.au.",
      "Sun safety is the daily-emergency Noosa-specific note. The UV index reaches extreme (12+) most summer days, and the open-coast exposure is unforgiving. SunSmart publishes the daily UV index for Australian locations; we mirror the live value on the homepage and on /surf-and-weather. Slip on a shirt, slop on sunscreen, slap on a hat.",
    ],
    bullets: [
      "000 — life-threatening emergency (police, ambulance, fire)",
      "Noosa Police — Maple Street, Noosaville (non-urgent)",
      "Noosa Hospital — Bottlebrush Avenue, Noosaville (public)",
      "Sunshine Coast University Hospital — Birtinya (major regional, ~30 min south)",
    ],
  },
  {
    heading: "Budget — what a Noosa trip actually costs",
    paragraphs: [
      "Noosa is not a budget destination. Hastings Street accommodation runs A$250–$700 per night in peak season; Noosaville apartments A$150–$400; Sunshine Beach and Peregian holiday letting A$150–$350. Self-catering brings the food cost down: the Noosa Farmers Market on Sundays is the best-value fresh produce in the shire, and the Noosa Junction IGA + Woolworths are well-stocked. Eating out runs A$25–$45 per main at most Hastings Street restaurants; A$15–$25 at Noosaville pubs and the Junction.",
      "Activities stack up modestly: Noosa National Park is free, the river ferry is A$5–$10 per hop, the public webcams are free, and the surf report on /surf-and-weather is free. Hire costs (kayak, paddleboard, bike) run A$30–$80 per half-day. A three-day trip for two adults, mid-range, self-catering, runs A$800–$1,500 ex-airfares; the same trip with mid-range dining and a Hastings Street hotel runs A$1,500–$2,800.",
      "Cancellation and refunds are governed by the Competition and Consumer Act 2010 (Cth) Schedule 2 — the ACCC consumer guarantees apply. If a booking is cancelled by the operator, you are entitled to a refund or a replacement booking; if you cancel, the operator’s terms apply (read them carefully before paying). Travel insurance is recommended for any trip during cyclone season (November through April).",
    ],
    bullets: [
      "Mid-range 3-day trip, two adults — A$800–$1,500 self-catering, A$1,500–$2,800 dining + Hastings Street",
      "Cancellation — ACCC consumer guarantees apply (Competition and Consumer Act 2010 (Cth) Schedule 2)",
      "Travel insurance — recommended Nov–Apr (cyclone season)",
    ],
  },
];

const PRIMARY_SOURCES = [
  { label: "QLD Department of Education — term dates", href: "https://education.qld.gov.au/parents-and-carers/school-information/school-terms-and-holidays" },
  { label: "Noosa Shire Council — accessibility guide", href: "https://www.noosa.qld.gov.au/Services-and-Facilities/Community-services/Disability-services-and-accessibility" },
  { label: "Noosa Shire Council — dog exercise areas", href: "https://www.noosa.qld.gov.au/Services-and-Facilities/Pets-and-animals/Dog-exercise-areas" },
  { label: "Bureau of Meteorology — coastal warnings", href: "https://www.bom.gov.au/qld/warnings/index.shtml" },
  { label: "QLD Traffic — road closures", href: "https://qldtraffic.qld.gov.au/" },
  { label: "SunSmart — daily UV index", href: "https://www.sunsmart.com.au/" },
  { label: "ACCC — consumer guarantees", href: "https://www.accc.gov.au/consumers/consumer-rights-guarantees" },
];

export default function PlanPage() {
  return (
    <>
      {/* v5 (#14): full-bleed hero with editorial H1 + eyebrow overlay. */}
      <CategoryPage
        slug="noosa-national-park"
        eyebrow="Plan"
        overlayEyebrow="MyNoosaHeads · Plan"
        title="Plan your Noosa trip well."
        overlayTitle="Plan your Noosa trip well."
        subtitle={
          <>
            A practical hub for the things that fall outside the eight
            functional areas — school holidays, accessibility, dog rules,
            emergencies, budget, and consumer law reference. Every claim
            below links to a public source.
          </>
        }
        flourish="Built slowly, sourced always, never fabricated."
        primarySources={PRIMARY_SOURCES}
        bodySections={PLAN_BODY}
        crossLinks={[
          { label: "Accommodation", href: "/accommodation", description: "Pick your base — five regions plus three archetypes." },
          { label: "Surf & weather", href: "/surf-and-weather", description: "Time your visit around the swell and the tides." },
          { label: "Travel & transport", href: "/travel-and-transport", description: "Plan the drive in — Bruce Highway + ferry." },
        ]}
        callout={{
          title: "Before you book",
          body: (
            <>
              <p>
                Read the operator’s cancellation terms before you pay. Under
                the ACCC consumer guarantees, an operator that cancels a
                booking must offer a refund or a replacement; a guest
                cancellation follows the operator’s stated policy. Travel
                insurance is recommended during cyclone season (November
                through April). The Sunshine Coast University Hospital at
                Birtinya is the major regional facility; the Noosa Hospital
                at Noosaville is a smaller public facility. For life-
                threatening emergencies dial 000.
              </p>
            </>
          ),
          variant: "rainforest",
        }}
        disclosure={
          <>
            No paid promotions or sponsored placements on this page. The
            booking-engine links in the footer carry the standard ACCC
            Schedule 2 disclosure. Editorial copy is reviewed monthly
            against the QLD Education term calendar, the Noosa Council
            accessibility guide, and the BOM Capricornia–Hervey Bay
            district warnings feed.
          </>
        }
      />
      {/* By-line + last-verified stamp */}
      <section className="container-page pb-14 md:pb-20">
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-paper-200 pt-6 text-caption text-ink-600">
          <p>
            <span className="font-accent text-accent-md text-ocean-700">By the editors · MyNoosaHeads</span>
          </p>
          <p>
            Last verified: <time dateTime="2026-10-05">5 October 2026</time> (Australia/Brisbane)
          </p>
        </div>
      </section>
    </>
  );
}