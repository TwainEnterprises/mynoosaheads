import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Itinerary } from "@/data/itineraries";

/**
 * ItineraryPage — v6.3 (MSN-2964) Phase D.
 *
 * Shared renderer for the 4 themed 3-day itineraries at
 * /itineraries/[slug]. Each page imports this component and
 * passes the data + hero photo. Editorial register, anonymised.
 */

export type ItineraryPageProps = {
  data: Itinerary;
};

export function ItineraryPage({ data }: ItineraryPageProps) {
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
            <Link href="/things-to-do" className="hover-underline">
              Things to do
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
            {data.title}
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <header className="mb-12">
        <span className="text-eyebrow uppercase tracking-eyebrow text-ocean-700">
          {data.eyebrow}
        </span>
        <h1 className="mt-2 font-display text-display-lg text-ink-900">
          {data.title}
        </h1>
        <p className="mt-4 max-w-3xl text-body-lg text-ink-700">
          {data.intro}
        </p>
      </header>

      <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-2xl bg-paper-100">
        <Image
          src={data.hero.src}
          alt={data.hero.alt}
          width={data.hero.width}
          height={data.hero.height}
          sizes="(min-width: 1024px) 70vw, 100vw"
          priority
          className="h-full w-full object-cover"
        />
        {data.hero.credit && (
          <span className="absolute bottom-2 right-3 rounded bg-surface-overlay-strong px-2 py-1 text-caption text-paper-50">
            {data.hero.credit}
          </span>
        )}
      </div>

      {/* Editorial route map (inline SVG of Noosa shire with 3-day overlay) */}
      <MapSection slug={data.slug} />

      {/* Day-by-day */}
      <ol className="flex flex-col gap-10">
        {data.days.map((day, i) => (
          <li key={i}>
            <h2 className="font-display text-display-sm text-ink-900 md:text-display-md">
              {day.title}
            </h2>
            <p className="mt-2 max-w-3xl text-body-md text-ink-700">
              {day.intro}
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {day.bullets.map((b, j) => (
                <li
                  key={j}
                  className="grid grid-cols-[5rem_1fr] gap-4 rounded-xl border border-paper-200 bg-surface-elevated p-4"
                >
                  <span className="font-display text-body-md font-medium text-ocean-700">
                    {b.time}
                  </span>
                  <span className="text-body-md text-ink-900">{b.text}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      {/* Photo gallery */}
      <section className="mt-16">
        <h2 className="font-display text-display-sm text-ink-900 md:text-display-md">
          The route, in pictures
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {data.gallery.map((g, i) => (
            <figure
              key={i}
              className="overflow-hidden rounded-xl border border-paper-200 bg-paper-100"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={g.src}
                  alt={g.alt}
                  width={800}
                  height={600}
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="p-3 text-caption text-ink-700">
                {g.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Booking CTAs */}
      <section className="mt-16 rounded-2xl border border-paper-200 bg-paper-100 p-6 md:p-8">
        <h2 className="font-display text-headline-lg text-ink-900">
          Make it real
        </h2>
        <p className="mt-2 text-body-md text-ink-700">
          The itinerary is the editorial; these are the cross-links to the
          practical bits.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {data.bookingCtas.map((cta, i) => (
            <Link
              key={i}
              href={cta.href}
              className="flex flex-col gap-2 rounded-xl border border-paper-200 bg-surface-elevated p-4 hover-lift"
            >
              <span className="font-display text-headline-md text-ink-900">
                {cta.label}
              </span>
              <span className="text-body-sm text-ink-700">
                {cta.description}
              </span>
              <span className="mt-auto inline-flex items-center gap-1 text-body-sm font-medium text-ocean-700">
                Open →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Tags + cross-link to planner */}
      <section className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-paper-200 pt-6">
        <div className="flex flex-wrap gap-2">
          {data.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-paper-300 bg-paper-100 px-3 py-1 text-caption text-ink-700"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href="/plan-your-trip"
          className="inline-flex items-center gap-1 text-body-md font-medium text-ocean-700 hover-underline"
        >
          Build your own itinerary →
        </Link>
      </section>
    </div>
  );
}

/**
 * Static SVG map of Noosa Shire with a 3-day route overlay. Different
 * overlay per itinerary slug (focuses on the relevant region).
 */
function MapSection({ slug }: { slug: string }) {
  const variant = slug;
  return (
    <section
      aria-label="Itinerary route map"
      className="mb-12 overflow-hidden rounded-2xl border border-paper-200 bg-paper-100"
    >
      <svg
        viewBox="0 0 800 400"
        role="img"
        aria-labelledby="map-title"
        className="h-auto w-full"
      >
        <title id="map-title">Noosa Shire map with 3-day route</title>
        {/* Land base */}
        <rect x="0" y="0" width="800" height="400" fill="#E0EFEC" />
        {/* Sea */}
        <path
          d="M0,0 L800,0 L800,150 Q700,200 600,180 Q500,160 400,200 Q300,240 200,220 Q100,200 0,250 Z"
          fill="#A8D4CA"
        />
        {/* River */}
        <path
          d="M400,200 Q420,260 460,290 Q500,310 540,330 Q580,350 620,360"
          fill="none"
          stroke="#5BA89B"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.5"
        />
        {/* Hinterland */}
        <ellipse cx="200" cy="320" rx="120" ry="60" fill="#C3DCD7" />
        {/* Headland highlight */}
        <path
          d="M380,170 Q400,140 430,150 Q450,160 460,180"
          fill="#2F8074"
          opacity="0.7"
        />
        {/* Route per variant */}
        {variant === "family-fun" && (
          <g>
            <path
              d="M450,170 L450,210 L380,280 L250,310"
              fill="none"
              stroke="#0E4A41"
              strokeWidth="3"
              strokeDasharray="6 6"
              strokeLinecap="round"
            />
            <circle cx="450" cy="170" r="6" fill="#0E4A41" />
            <circle cx="450" cy="210" r="6" fill="#0E4A41" />
            <circle cx="380" cy="280" r="6" fill="#0E4A41" />
            <circle cx="250" cy="310" r="6" fill="#0E4A41" />
          </g>
        )}
        {variant === "beach-lover" && (
          <g>
            <path
              d="M430,160 Q450,150 470,160 Q490,170 480,180"
              fill="none"
              stroke="#0E4A41"
              strokeWidth="3"
              strokeDasharray="6 6"
              strokeLinecap="round"
            />
            <path
              d="M480,180 Q500,200 520,210 Q560,220 600,230"
              fill="none"
              stroke="#0E4A41"
              strokeWidth="3"
              strokeDasharray="6 6"
              strokeLinecap="round"
            />
            <circle cx="430" cy="160" r="6" fill="#0E4A41" />
            <circle cx="480" cy="180" r="6" fill="#0E4A41" />
            <circle cx="600" cy="230" r="6" fill="#0E4A41" />
          </g>
        )}
        {variant === "hinterland-wander" && (
          <g>
            <path
              d="M450,170 L350,240 L250,310 L150,330"
              fill="none"
              stroke="#0E4A41"
              strokeWidth="3"
              strokeDasharray="6 6"
              strokeLinecap="round"
            />
            <circle cx="450" cy="170" r="6" fill="#0E4A41" />
            <circle cx="250" cy="310" r="6" fill="#0E4A41" />
            <circle cx="150" cy="330" r="6" fill="#0E4A41" />
          </g>
        )}
        {variant === "foodie" && (
          <g>
            <path
              d="M460,170 L460,210 L420,260 L380,290"
              fill="none"
              stroke="#0E4A41"
              strokeWidth="3"
              strokeDasharray="6 6"
              strokeLinecap="round"
            />
            <circle cx="460" cy="170" r="6" fill="#0E4A41" />
            <circle cx="460" cy="210" r="6" fill="#0E4A41" />
            <circle cx="420" cy="260" r="6" fill="#0E4A41" />
            <circle cx="380" cy="290" r="6" fill="#0E4A41" />
          </g>
        )}
        {/* Labels */}
        <text x="430" y="135" fontFamily="serif" fontSize="14" fill="#0E4A41">
          Noosa Heads
        </text>
        <text x="450" y="295" fontFamily="serif" fontSize="14" fill="#0E4A41">
          Noosaville
        </text>
        <text x="600" y="380" fontFamily="serif" fontSize="14" fill="#0E4A41">
          Tewantin
        </text>
        <text x="200" y="335" fontFamily="serif" fontSize="14" fill="#0E4A41">
          Hinterland
        </text>
        <text x="700" y="40" fontFamily="serif" fontSize="14" fill="#0E4A41">
          Coral Sea
        </text>
        <text x="540" y="350" fontFamily="serif" fontSize="14" fill="#0E4A41">
          Noosa River
        </text>
      </svg>
      <p className="border-t border-paper-200 p-3 text-caption text-ink-700">
        Static SVG map of Noosa Shire with the 3-day route overlay.
        Not to navigation scale; for orientation only.
      </p>
    </section>
  );
}

export default ItineraryPage;