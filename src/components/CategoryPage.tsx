/**
 * CategoryPage — shared layout for the 8 functional-area landing
 * pages (Sprint 1.3). Each route renders the same chrome — Hero,
 * editorial body, sources footer — but injects unique copy, sources,
 * and disclosure pills.
 *
 * v5 (MSN-2959-V5-POLISH) updates:
 *   - §3.3 #14: Category hero now takes an `overlayEyebrow` and
 *     `overlayTitle` prop; the editorial H1 sits on the photo
 *     (HeroPhoto with overlayStrong gradient). The body H1 below the
 *     photo remains for screen-reader accessibility.
 *   - §3.5 #19: Per-page cross-link chips added at the bottom of
 *     the body (after body sections, before the disclosure band).
 *   - §3.13 #29: `overlayTitle` defaults to the page's main `title`.
 *
 * Server-rendered.
 */

import type { ReactNode } from "react";
import Link from "next/link";
import {
  Hero,
  HeroPhoto,
  CaptionedPhoto,
  Card,
  CardBody,
  CardHeader,
  Button,
  Icons,
} from "@/components/ui";
import { CATEGORY_PHOTOS, type UnsplashPhoto } from "@/data/photos";
import { RELATED_LINKS } from "@/data/site";

export type CategoryPageProps = {
  eyebrow: string;
  title: ReactNode;
  subtitle: ReactNode;
  flourish?: ReactNode;
  /** Category slug — drives which photos render. Optional; if absent,
   * no photos are rendered (legacy mode). */
  slug?: string;
  /** v5 (#14): eyebrow rendered ABOVE the H1 on the photo. Falls
   * back to `eyebrow` (the body's eyebrow) when omitted. */
  overlayEyebrow?: string;
  /** v5 (#14): H1 rendered ON the photo (overlaid). Falls back to
   * `title` (the body's H1) when omitted. */
  overlayTitle?: ReactNode;
  primarySources: { label: string; href: string }[];
  bodySections: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
  disclosure?: ReactNode;
  callout?: {
    title: string;
    body: ReactNode;
    variant?: "rainforest" | "ocean";
  };
  relatedLinks?: { label: string; href: string; description: string }[];
  /** v5 (#19): override the default cross-link chips (which come
   * from RELATED_LINKS[slug]). Pass `null` to suppress. */
  crossLinks?: { label: string; href: string; description: string }[] | null;
};

const calloutClass: Record<NonNullable<CategoryPageProps["callout"]>["variant"] & string, string> = {
  rainforest: "callout-rainforest",
  ocean: "callout",
};

export async function CategoryPage({
  eyebrow,
  title,
  subtitle,
  flourish,
  slug,
  overlayEyebrow,
  overlayTitle,
  primarySources,
  bodySections,
  disclosure,
  callout,
  relatedLinks,
  crossLinks,
}: CategoryPageProps) {
  const photos = slug ? CATEGORY_PHOTOS[slug] : undefined;

  const creditLine = (p: UnsplashPhoto) => `Photo: ${p.author} / Unsplash · ${p.licence}`;

  // v5 (#19): default cross-link chips come from RELATED_LINKS[slug].
  // RELATED_LINKS is `as const` so each entry is readonly; cast through
  // unknown to drop the readonly flag without losing the per-key
  // shape narrowing.
  const defaultCrossLinks =
    slug && slug in RELATED_LINKS
      ? ((RELATED_LINKS as unknown) as Record<
          string,
          { label: string; href: string; description: string }[]
        >)[slug]
      : undefined;
  const crossChips = crossLinks === null ? null : (crossLinks ?? defaultCrossLinks);

  return (
    <div className="bg-paper-50">
      {/* v5 (#13, #14): full-bleed hero photo with editorial H1 + eyebrow
       * overlay. The body H1 below remains for accessibility — the
       * photo overlay is decorative. */}
      {photos?.hero ? (
        <HeroPhoto
          src={photos.hero.url}
          alt={photos.hero.caption}
          credit={creditLine(photos.hero)}
          eyebrow={overlayEyebrow ?? (typeof eyebrow === "string" ? eyebrow : undefined)}
          overlayTitle={overlayTitle ?? title}
          caption={photos.hero.caption}
        />
      ) : null}
      <Hero
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        flourish={flourish}
      />

      {/* ─── Editorial body ─── */}
      <section
        className="container-page py-14 md:py-20"
        aria-labelledby="cat-body-heading"
      >
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <h2 id="cat-body-heading" className="sr-only">
              Editorial body
            </h2>
            {bodySections.map((section, i) => (
              <section key={i} aria-labelledby={`section-${i}-h`}>
                <h3
                  id={`section-${i}-h`}
                  className="font-display text-display-sm text-ink-900 text-balance"
                >
                  {section.heading}
                </h3>
                <div className="prose-mdx mt-4">
                  {section.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                  {section.bullets && section.bullets.length > 0 ? (
                    <ul>
                      {section.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                {photos?.inline?.[i % photos.inline.length] ? (
                  <CaptionedPhoto
                    src={photos.inline[i % photos.inline.length].url}
                    alt={photos.inline[i % photos.inline.length].caption}
                    credit={creditLine(photos.inline[i % photos.inline.length])}
                    caption={photos.inline[i % photos.inline.length].caption}
                  />
                ) : null}
              </section>
            ))}
            {callout ? (
              <aside
                className={calloutClass[callout.variant ?? "ocean"]}
                role="note"
              >
                <p className="eyebrow">{callout.title}</p>
                <div className="mt-2 text-body-sm text-ink-800">{callout.body}</div>
              </aside>
            ) : null}
            {disclosure ? (
              <aside className="callout" role="note">
                <p className="eyebrow">Disclosure</p>
                <div className="mt-2 text-body-sm text-ink-800">{disclosure}</div>
              </aside>
            ) : null}

            {/* v5 (#19): per-page cross-link chips. Horizontal strip
             * at the bottom of the body for in-content discoverability. */}
            {crossChips && crossChips.length > 0 ? (
              <section
                aria-labelledby="cross-links-h"
                className="border-t border-paper-200 pt-6"
              >
                <h3
                  id="cross-links-h"
                  className="text-eyebrow text-ocean-900"
                >
                  Keep reading
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {crossChips.map((c) => (
                    <li key={c.href}>
                      <Link
                        href={c.href}
                        className="chip-ocean hover:bg-ocean-100 transition"
                      >
                        {c.label} <Icons.ChevronRight size={12} className="inline-block ml-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-caption text-ink-600 max-w-2xl">
                  Each chip links to the most relevant adjacent page. The
                  deeper context lives in the destination.
                </p>
              </section>
            ) : null}
          </div>

          {/* ─── Sidebar ─── */}
          <aside className="space-y-6">
            <Card variant="surface">
              <CardHeader eyebrow="Primary sources" title="" />
              <CardBody>
                <ul className="space-y-2 text-body-sm">
                  {primarySources.map((s) => (
                    <li key={s.href} className="flex items-start gap-2">
                      <span
                        className="text-eucalyptus-700 mt-1 shrink-0"
                        aria-hidden="true"
                      >
                        <Icons.Compass size={14} />
                      </span>
                      <Link
                        href={s.href}
                        className="link text-ocean-700"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-caption text-ink-600">
                  All sources are public. If a link breaks, please{" "}
                  <Link href="/contact" className="link text-ocean-700">
                    let us know
                  </Link>
                  .
                </p>
              </CardBody>
            </Card>
            {relatedLinks && relatedLinks.length > 0 ? (
              <Card variant="surface">
                <CardHeader eyebrow="Related" title="" />
                <CardBody>
                  <ul className="space-y-3 text-body-sm">
                    {relatedLinks.map((r) => (
                      <li key={r.href}>
                        <Link href={r.href} className="link text-ocean-700 font-medium">
                          {r.label}
                        </Link>
                        <p className="text-caption text-ink-700 mt-0.5">{r.description}</p>
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            ) : null}
            <Card variant="surface">
              <CardHeader eyebrow="Editorial" title="" />
              <CardBody>
                <p className="text-body-sm text-ink-800">
                  Live tiles refresh every 30 minutes from BOM and Open-Meteo.
                  Editorial copy is reviewed monthly against current QPWS and
                  council sources.
                </p>
                <div className="mt-4">
                  <Button href="/contact" size="sm" variant="outline">
                    Report an error
                  </Button>
                </div>
              </CardBody>
            </Card>
          </aside>
        </div>
      </section>
    </div>
  );
}