/**
 * Footer — 5 columns + ACCC disclosure slot.
 *
 * Per Albert's design brief (Live page §2 "Footer"):
 *   "5 columns: Sitemap · Live sources · Editorial (about, contact, corrections,
 *    image-credits, editorial-policy) · Legal (Privacy, Terms, Affiliate
 *    disclosure per §9.8 — each with ACCC badge) · Local partners (Noosa
 *    Council, Tourism Noosa, Sunshine Coast Council, QPWS).
 *    No newsletter field; social = plain text links."
 *
 * Sprint 1.2 ships the layout + ACCC pill placeholder. Sprint 1.3
 * (TSK-2957-03) wires real outbound links.
 *
 * MSN-2959 / TSK-2959-FIX-3:
 *   - The Legal column now carries the three mandatory AU-statute
 *     pills (Privacy Act 1988, ACCC Sch 2, Spam Act 2003).
 *   - The "Affiliate disclosure" link points at #affiliate-disclosure
 *     (the in-page anchor on the compliance band below).
 *   - The compliance band is rendered as a full-width body paragraph
 *     above the column grid (not as a flourish next to the logo) so it
 *     carries the in-page anchor and is the canonical ACCC disclosure
 *     location per Albert's spec §4.6.
 */

import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "./Logo";

export type FooterColumn = {
  heading: string;
  links: { label: string; href: string; external?: boolean; disclosure?: string }[];
};

export type FooterProps = {
  columns?: FooterColumn[];
  /** Override the legal-region text. Defaults to "AU · en-AU". */
  region?: string;
  /**
   * Compliance band paragraph (ACCC-aware monetisation summary).
   * MSN-2959: replaces the deleted /how-we-make-money route; the
   * canonical disclosure location is now the footer on every page.
   * The paragraph carries `id="affiliate-disclosure"` so the Legal
   * column's "Affiliate disclosure" link scrolls here.
   */
  complianceBand?: ReactNode;
  copyrightYear?: number;
};

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    heading: "Sitemap",
    links: [
      { label: "Surf & weather", href: "/surf-and-weather" },
      { label: "Noosa National Park", href: "/noosa-national-park" },
      { label: "Where to stay", href: "/where-to-stay" },
      { label: "Eat & drink", href: "/eat-and-drink" },
      { label: "Things to do", href: "/things-to-do" },
      { label: "Itineraries", href: "/itineraries" },
    ],
  },
  {
    heading: "Live sources",
    links: [
      { label: "BOM marine forecast", href: "https://www.bom.gov.au/", external: true },
      { label: "Open-Meteo", href: "https://open-meteo.com/", external: true },
      { label: "QPWS alerts", href: "https://www.qld.gov.au/environment/parks", external: true },
      { label: "Surf Life Saving QLD", href: "https://www.lifesaving.com.au/", external: true },
      { label: "Beachsafe.org.au", href: "https://beachsafe.org.au/", external: true },
    ],
  },
  {
    heading: "Editorial",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Corrections", href: "/corrections" },
      { label: "Image credits", href: "/image-credits" },
      { label: "Editorial policy", href: "/editorial-policy" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/privacy", disclosure: "Privacy Act 1988 (Cth)" },
      { label: "Affiliate disclosure", href: "#affiliate-disclosure", disclosure: "ACCC Sch 2" },
      { label: "Spam Act statement", href: "/privacy#spam-act-2003", disclosure: "Spam Act 2003" },
    ],
  },
  {
    heading: "Local partners",
    links: [
      { label: "Noosa Council", href: "https://www.noosa.qld.gov.au/", external: true },
      { label: "Tourism Noosa", href: "https://www.visitnoosa.com.au/", external: true },
      { label: "Sunshine Coast Council", href: "https://www.sunshinecoast.qld.gov.au/", external: true },
      { label: "QPWS", href: "https://www.qld.gov.au/environment/parks", external: true },
    ],
  },
];

export function Footer({
  columns = DEFAULT_COLUMNS,
  region = "AU · en-AU · Queensland, Australia",
  complianceBand,
  copyrightYear,
}: FooterProps) {
  const year = copyrightYear ?? new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-paper-300 bg-paper-100">
      <div className="container-page py-12 md:py-16">
        {/* MSN-2959 / TSK-2959-FIX-3: compliance band — the canonical
         * ACCC disclosure location, replacing the deleted
         * /how-we-make-money dedicated route. Renders above the column
         * grid so it carries the in-page anchor and is visible on
         * every page. Per Albert's spec §4.6. */}
        {complianceBand ? (
          <div
            id="affiliate-disclosure"
            className="mb-10 max-w-3xl border-l-2 border-ocean-300 pl-4 text-caption text-ink-700 leading-relaxed"
          >
            {complianceBand}
          </div>
        ) : null}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Logo mark="2" size="md" />
            <p className="mt-3 text-body-sm text-ink-700 max-w-xs">
              An honest, sourced guide to Noosa Heads. Built slowly, on the
              Sunshine Coast.
            </p>
          </div>
          {columns.map((col) => (
            <nav
              key={col.heading}
              aria-label={col.heading}
              className="text-body-sm"
            >
              {/* MSN-2959 / TSK-2959-POLISH-C (extended): bumped from
               * text-eucalyptus-700 (#2F8074, contrast 4.39:1 on
               * bg-paper-100 — just under WCAG AA 4.5:1) to
               * text-eucalyptus-900 (#0E4A41, contrast ~10:1). The
               * footer surface is paper-100 (#F4F8F7), not paper-50
               * (#FFFFFF), so even though the eyebrow class was
               * bumped in globals.css, the footer h3 headings
               * (which use `text-eyebrow text-eucalyptus-700`)
               * needed a direct bump too. Lighthouse color-contrast
               * audit was failing on 5 of these headings. */}
              <h3 className="text-eyebrow text-eucalyptus-900">{col.heading}</h3>
              {/* MSN-3100 rework (Victor QA round 1, F3): the two
               * widest statute pills (Privacy Act 1988 (Cth) and
               * Spam Act 2003) could not shrink, so at narrow
               * viewports the document was 435 px wide against a
               * 390 px viewport and a horizontal scrollbar appeared
               * on every route. Below the lg breakpoint the row is
               * allowed to wrap and the pill is allowed to shrink
               * (its text wraps inside the pill); from lg up the
               * original single-line behaviour is kept exactly. */}
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li
                    key={link.href}
                    className="flex flex-wrap items-start gap-2 lg:flex-nowrap"
                  >
                    <Link
                      href={link.href}
                      className="text-ink-700 hover:text-eucalyptus-700 hover:underline underline-offset-4"
                      {...(link.external
                        ? { rel: "noopener noreferrer", target: "_blank" }
                        : {})}
                    >
                      {link.label}
                    </Link>
                    {link.disclosure ? (
                      <span
                        className="pill-disclosure lg:shrink-0"
                        title={link.disclosure}
                      >
                        {link.disclosure}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <hr className="mt-10 border-paper-300" />

        <div className="mt-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="text-caption text-ink-600">
            © {year} MyNoosaHeads. {region}. All rights reserved.
          </p>
          <p className="text-caption text-ink-600">
            Built honestly. Sources linked on every page.
          </p>
        </div>
      </div>
    </footer>
  );
}
