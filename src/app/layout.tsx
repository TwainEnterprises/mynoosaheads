import type { Metadata } from "next";
import { Fraunces, Inter, Caveat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE, FOOTER_DISCLOSURE } from "@/data/site";

/**
 * Root layout — Sprint 1.3.
 *
 * Typography stack: Fraunces (display), Inter (body), Caveat (accent).
 * Each font is configured with display: "swap" so the page never FOITs.
 * All fonts are SIL OFL 1.1 and loaded via next/font (self-hosted at
 * build time).
 *
 * Locale is en-AU. Robots are index/follow on the production hostname —
 * Sprint 1.3 is content-complete enough to be indexed; we let the
 * Search Console verification sit under TSK-2957-04.
 */

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-accent",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.productionUrl),
  title: {
    default: `${SITE.brand} — ${SITE.tagline}`,
    template: `%s · ${SITE.brand}`,
  },
  description:
    "An independent, sourced, slow-guide field manual for Noosa Heads — surf, weather, the national park, accommodation, fishing, boats, travel and webcams. Built slowly on the Sunshine Coast.",
  applicationName: SITE.brand,
  authors: [{ name: SITE.brand }],
  generator: "Next.js",
  keywords: [
    "Noosa",
    "Noosa Heads",
    "Queensland",
    "Sunshine Coast",
    "Australia",
    "surf report Noosa",
    "Noosa National Park",
    "Noosa travel guide",
  ],
  openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: SITE.brand,
    title: `${SITE.brand} — ${SITE.tagline}`,
    description:
      "An independent, sourced, slow-guide field manual for Noosa Heads.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.brand} — ${SITE.tagline}`,
    description: "An independent, sourced, slow-guide field manual for Noosa Heads.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  // MSN-2959 r2 — pure white surface (was #FBF6E9 warm parchment).
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-AU"
      className={`${fraunces.variable} ${inter.variable} ${caveat.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
          <Analytics />
        </main>
        {/*
         * MSN-2959 / TSK-2959-FIX-3: explicitly wire FOOTER_DISCLOSURE
         * into <SiteFooter /> at the root-layout layer. This is the
         * single source of truth — any edit to `src/data/site.ts`
         * FOOTER_DISCLOSURE re-flows through here to the rendered
         * footer on every page. Prior to r2, hardcoded DEFAULT_COLUMNS
         * inside Footer.tsx won at runtime; this fix removes that bug.
         */}
        <SiteFooter
          columns={FOOTER_DISCLOSURE.columns.map((col) => ({
            heading: col.heading,
            links: [...col.links],
          }))}
          region={FOOTER_DISCLOSURE.region}
          copyrightYear={FOOTER_DISCLOSURE.copyrightYear}
          complianceBand={FOOTER_DISCLOSURE.complianceBand}
        />
      </body>
    </html>
  );
}
