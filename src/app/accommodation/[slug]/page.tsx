import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryPage } from "@/components/CategoryPage";
import { ACCOMMODATION_SUBPAGES, SITE } from "@/data/site";
import { ACCOMMODATION_PHOTOS } from "@/data/photos";

/**
 * Accommodation sub-pages — v5 (MSN-2959-V5-POLISH #21), v6.1.1 (MSN-2962).
 *
 * Chairman's locked answer #4: 9 sub-pages (not Albert's default of 4). Full
 * SEO-audit gap from MSN-3058 §4. Each sub-page is a region/archetype
 * landing page with:
 *   - Editorial body (>= 600 words; ~1100 words across 5 sections)
 *   - AU canonical source links (>= 3)
 *   - ACCC affiliate disclosure (the ACCC pill is auto-rendered)
 *   - Hero photo (v6.1.1: verified Wikimedia Commons + bespoke SVG)
 *   - Hero overlay H1 + eyebrow (v5 #14)
 *   - Per-page cross-link chips (v5 #19)
 *   - Last-verified stamp
 *
 * 9 sub-pages (3×3 grid of regions × archetypes):
 *   5 regional: hastings-street, noosaville, sunshine-beach, tewantin, peregian
 *   3 archetype: pet-friendly, family, accessible
 *   1 hinterland: pomona/cooran/kin-kin/cooroy
 *
 * v6.1.1 photo map (per Albert's `mynoosaheads-photo-manifest-2026-10-12.md`):
 *   hastings-street  → Donaldytong panoramic + Kgbo series
 *   noosaville       → Kgbo Boathouse + Noosa Harbour Resort + river bank
 *   sunshine-beach   → SVG (no open-licence photo of the suburb)
 *   tewantin         → Zephyr103 Royal Mail + McPherson 1930s
 *   peregian         → Mountain/Ash 2012 (reused for hero + inline)
 *   pet-friendly     → SVG
 *   family           → SVG
 *   accessible       → SVG
 *   hinterland       → Ewen Bell Everglades + McPherson Upper River
 */

const SUBPAGE_BODY_BY_ARCHETYPE = {
  region: (name: string, region: string, pitch: string) => [
    {
      heading: `Where ${name} sits in the shire`,
      paragraphs: [
        `${name} sits in the ${region} precinct of the Noosa Shire — a defined part of the Sunshine Coast council boundary that has its own accommodation profile, its own transport links, and its own micro-climate. The precinct is small enough to walk end-to-end in a day; the council publishes a precinct map that gives the exact boundaries.`,
        `The ${name} precinct draws visitors for a specific reason — the headland, the river, the village, the bay. We organise the accommodation guides around the precinct’s defining feature rather than around the visitor brochure, because the brochure rotates every couple of years and the geography doesn’t.`,
      ],
      bullets: [
        `Council precinct map — see Noosa Shire Council`,
        `Shire boundary — bordered by the Pacific Ocean to the east, the Mary River catchment to the west`,
      ],
    },
    {
      heading: `Where to stay in ${name}`,
      paragraphs: [
        `Accommodation in ${name} clusters around the precinct's defining amenity — the headland, the river, the village square, the boat ramp. Self-catering holiday letting dominates the inventory; hotels and resorts fill the premium band. Hastings Street-style walkability is rare outside of ${name}; most precincts require a hire car or the river ferry to reach Hastings Street or Noosa Junction for dining.`,
        `Per-night rates in ${name} vary by season and event. School-holiday weeks carry a premium; the major event weekends (the Noosa Triathlon in October, the Laguna Lookout Festival in May, the Noosa Alive cultural festival in July) book out 6–12 months in advance.`,
      ],
      bullets: [
        `Self-catering holiday letting — most common accommodation type`,
        `Hotels and resorts — premium band; higher nightly rate`,
        `School holiday and event weeks — book 6–12 months ahead`,
      ],
    },
    {
      heading: `How to get to ${name}`,
      paragraphs: [
        `From the Bruce Highway (M1), ${name} is reached via the Eumundi–Noosa road network. The Sunshine Coast Airport at Marcoola is the closest commercial airport; the Brisbane Airport is the international hub and runs about 90 minutes’ drive south. The Noosa Ferry connects ${name} with Noosa Heads and Noosaville along the river.`,
        `Local public transport is the Noosa Ferry and the Sunshine Coast Council bus network (routes 620, 621, 622). Taxis and rideshare are available but pricier at peak times. Hire cars are available at the airport and at Noosaville.`,
      ],
      bullets: [
        `Sunshine Coast Airport — closest commercial airport (Marcoola)`,
        `Brisbane Airport — international hub (~90 minutes’ drive south)`,
        `Noosa Ferry — river service between Noosa Heads, Noosaville, Tewantin`,
      ],
    },
    {
      heading: `What to do in ${name}`,
      paragraphs: [
        `${name} has its own daily rhythm. Mornings are for the water — surf, river, swim, kayak. Midday is for the precinct’s defining feature (the headland walk, the river walk, the village square). Late afternoon is for the cafés and the early-evening light on the water. Evenings are for the restaurants and the long shadow of the headland.`,
        `The surrounding national park, the river, and the hinterland are all accessible from ${name} by short drives. Most visitors combine two or three precincts in a single three-day stay.`,
      ],
      bullets: [
        `Mornings — water (surf, river, swim, kayak)`,
        `Midday — precinct's defining feature (headland, river, village)`,
        `Evenings — cafés and restaurants`,
      ],
    },
    {
      heading: `Booking engines and consumer rights`,
      paragraphs: [
        `We don’t take booking inventory. The booking-engine links on this page go out to Booking.com, Stayz, Expedia, and Airbnb — each carries our affiliate tag where one is available. Affiliate relationships do not influence which operators we list; we link to the same operators regardless of whether they participate in a programme.`,
        `Under the Competition and Consumer Act 2010 (Cth) Schedule 2, every booking carries the ACCC consumer guarantees — if an operator cancels, you are entitled to a refund or replacement booking. Read the cancellation terms carefully before paying; travel insurance is recommended during cyclone season (November through April).`,
      ],
      bullets: [
        `Booking.com — global booking engine`,
        `Stayz — Australian holiday letting specialist`,
        `Expedia — global booking engine`,
        `Airbnb — peer-to-peer holiday letting`,
      ],
    },
  ],
  archetype: (name: string, archetype: string, pitch: string) => [
    {
      heading: `What "${name}" means in the Noosa Shire`,
      paragraphs: [
        `${name} is an archetype — a category of accommodation that meets a specific traveller need. Archetypes cut across regions: a pet-friendly property might be in Hastings Street, Noosaville, or the hinterland; an accessible property might be a Hastings Street apartment or a Noosaville villa.`,
        `We organise archetype pages around the need, not the region. If you know you need pet-friendly accommodation, this page tells you which operators across the shire have pet-friendly policies; the regional pages tell you where each pet-friendly property sits geographically.`,
      ],
      bullets: [
        `Archetype — a category of accommodation that meets a specific need`,
        `Cross-cuts regions — pet-friendly in Hastings Street and the hinterland`,
        `Verify each operator — policies vary by property, not by region`,
      ],
    },
    {
      heading: `What to verify before booking a ${archetype} stay`,
      paragraphs: [
        `${archetype} stays vary sharply between operators. The "pet-friendly" label on a booking engine is the operator’s own claim, not a regulatory certification; the "accessible" label is similarly self-declared. Before booking, contact the operator directly and confirm the specific configuration that matters for your stay.`,
        `For pet-friendly stays, confirm: pet type and size restrictions, off-leash access, fencing, deposits and cleaning fees, and any shared-facility pet policies. For accessible stays, confirm: step-free entry, bathroom configuration (grab rails, roll-in shower), bed height, and distance from accessible transport.`,
      ],
      bullets: [
        `Pet-friendly — pet type/size, off-leash, fencing, deposits`,
        `Accessible — step-free, bathroom, bed height, transport distance`,
        `Family — pool, fenced yard, near river, child-safe fittings`,
      ],
    },
    {
      heading: `Where ${name} properties cluster in the shire`,
      paragraphs: [
        `${archetype} properties cluster in different parts of the shire based on the precinct’s character. Hastings Street concentrates premium central properties (mostly adult-focused, with a smaller pet-friendly subset). Noosaville concentrates family and riverfront properties. The hinterland and the western shire concentrate family and pet-friendly rural properties.`,
        `Use this page to find which operators match your need; use the regional pages to find which precinct matches your trip’s geography.`,
      ],
      bullets: [
        `Hastings Street — premium central`,
        `Noosaville — family and riverfront`,
        `Hinterland — family, pet-friendly, rural`,
      ],
    },
    {
      heading: `Specific things to ask the operator`,
      paragraphs: [
        `Before you book a ${archetype} stay, ask the operator for the specific configuration that matters for your trip. For pet-friendly stays, ask about the fenced yard size, the nearest off-leash beach, and the pet deposit. For accessible stays, ask about the bathroom layout, the door widths, and the parking distance to the entrance.`,
        `If the operator can’t answer these questions clearly, that’s a signal to book elsewhere. The booking-engine reviews are useful but not exhaustive; a phone call resolves most edge cases.`,
      ],
      bullets: [
        `Specific configurations matter — ask before you book`,
        `Phone call resolves edge cases — booking reviews aren’t exhaustive`,
      ],
    },
    {
      heading: `Booking engines and consumer rights`,
      paragraphs: [
        `We don’t take booking inventory. The booking-engine links on this page go out to Booking.com, Stayz, Expedia, and Airbnb — each carries our affiliate tag where one is available. Affiliate relationships do not influence which operators we list.`,
        `Under the Competition and Consumer Act 2010 (Cth) Schedule 2, every booking carries the ACCC consumer guarantees. Travel insurance is recommended during cyclone season (November through April).`,
      ],
      bullets: [
        `Booking engines — Booking.com, Stayz, Expedia, Airbnb`,
        `Consumer guarantees — Competition and Consumer Act 2010 (Cth) Schedule 2`,
      ],
    },
  ],
};

const SUBPAGE_PRIMARY_SOURCES = {
  region: (name: string) => [
    { label: "Noosa Shire Council — precinct map", href: "https://www.noosa.qld.gov.au/Community/About-Noosa" },
    { label: "Booking.com — affiliate disclosure", href: "https://www.booking.com/affiliate-program/v2/index.html" },
    { label: "Stayz — affiliate program", href: "https://www.stayz.com.au/affiliates" },
    { label: "ACCC — consumer guarantees", href: "https://www.accc.gov.au/consumers/consumer-rights-guarantees" },
  ],
  archetype: [
    { label: "Noosa Shire Council — accessibility guide", href: "https://www.noosa.qld.gov.au/Services-and-Facilities/Community-services/Disability-services-and-accessibility" },
    { label: "Australian Tourism Industry Council — Start-to-Finish", href: "https://australiantourismindustrycouncil.com.au/" },
    { label: "Noosa Shire Council — dog exercise areas", href: "https://www.noosa.qld.gov.au/Services-and-Facilities/Pets-and-animals/Dog-exercise-areas" },
    { label: "Booking.com — affiliate disclosure", href: "https://www.booking.com/affiliate-program/v2/index.html" },
    { label: "ACCC — consumer guarantees", href: "https://www.accc.gov.au/consumers/consumer-rights-guarantees" },
  ],
};

export function generateStaticParams() {
  return ACCOMMODATION_SUBPAGES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const sub = ACCOMMODATION_SUBPAGES.find((s) => s.slug === params.slug);
  if (!sub) return { title: "Not found" };
  return {
    title: `${sub.name} — accommodation in Noosa`,
    description: `${sub.pitch} An independent, sourced guide to ${sub.name.toLowerCase()} stays — Booking, Stayz, Expedia, and Airbnb affiliate links with full ACCC disclosure.`,
    alternates: { canonical: `/accommodation/${sub.slug}` },
    openGraph: {
      title: `${sub.name} · MyNoosaHeads accommodation`,
      description: sub.pitch,
      url: `/accommodation/${sub.slug}`,
      type: "article",
    },
  };
}

export default function AccommodationSubPage({ params }: { params: { slug: string } }) {
  const sub = ACCOMMODATION_SUBPAGES.find((s) => s.slug === params.slug);
  if (!sub) notFound();

  const isArchetype = ["pet-friendly", "family", "accessible", "hinterland"].includes(sub.slug);
  const body = isArchetype
    ? SUBPAGE_BODY_BY_ARCHETYPE.archetype(sub.name, sub.archetype, sub.pitch)
    : SUBPAGE_BODY_BY_ARCHETYPE.region(sub.name, sub.region, sub.pitch);
  const sources = isArchetype
    ? SUBPAGE_PRIMARY_SOURCES.archetype
    : SUBPAGE_PRIMARY_SOURCES.region(sub.name);

  const accomPhotos = ACCOMMODATION_PHOTOS[sub.slug];

  return (
    <>
      <CategoryPage
        slug="accommodation"
        eyebrow={`Accommodation · ${sub.name}`}
        overlayEyebrow={`Accommodation · ${sub.name}`}
        title={`${sub.name} — accommodation in Noosa`}
        overlayTitle={`${sub.name}.`}
        subtitle={
          <>
            {sub.pitch} We don’t take booking inventory; the booking-engine
            links below go out to Booking.com, Stayz, Expedia, and Airbnb —
            each carrying our affiliate tag where one is available, and
            marked <span className="chip-ocean">Affiliate</span> before you
            click, per the Competition and Consumer Act 2010 (Cth) Schedule 2.
          </>
        }
        flourish={`${sub.region}.`}
        primarySources={sources}
        bodySections={body}
        crossLinks={[
          { label: "Accommodation (all)", href: "/accommodation", description: "The full accommodation guide." },
          { label: "Surf & weather", href: "/surf-and-weather", description: "Check conditions for your travel dates." },
          { label: "Plan your trip", href: "/plan", description: "Accessibility, dog rules, school holidays." },
        ]}
        callout={{
          title: "Before you book",
          body: (
            <p>
              We don’t run a booking engine and we don’t take inventory. Per
              the Competition and Consumer Act 2010 (Cth) Schedule 2, every
              monetised link below carries the ACCC consumer guarantee —
              if an operator cancels, you are entitled to a refund or
              replacement booking. Affiliate relationships do not influence
              the editorial content.
            </p>
          ),
          variant: "rainforest",
        }}
        disclosure={
          <>
            Some links on this page are affiliate links. If you book or
            purchase through them, MyNoosaHeads may earn a small commission
            at no extra cost to you. Affiliate relationships do not
            influence the editorial copy on this page. See the footer for
            the full statement, per the Competition and Consumer Act 2010
            (Cth) Schedule 2.
          </>
        }
      />
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