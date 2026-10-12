// next.config.mjs
// Next.js config — wraps with @sentry/nextjs when SENTRY_DSN is set.

import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Sprint 1.5 (MSN-2958 / TSK-2958-02): photo wire-up via next/image.
    // Wikimedia Commons is the source of truth for category-page imagery
    // (per Albert's `photo_inventory.md`). Allow `upload.wikimedia.org`
    // thumbnails at known widths.
    //
    // We do NOT set `unoptimized: true` anymore — next/image's optimizer
    // is now in play, so the remotePatterns allowlist is required for
    // every external host we pull from.
    remotePatterns: [
      // v5 (MSN-2959-V5-POLISH) — Unsplash added as a fallback remote
      // pattern. v5 ships Unsplash photos from public/photos/ at the
      // site origin (downloaded once via the v5 build prep), but the
      // remotePatterns allowlist is kept so a future hot-link fallback
      // (e.g. /image-credits back-link) works without a config edit.
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      // v6.1.1 (MSN-2962) — Wikimedia Commons hot-link patterns.
      // `upload.wikimedia.org` is the canonical direct-image host; we
      // hot-link via Special:FilePath which redirects to upload URLs.
      // The next/image optimizer follows the redirect; the optimizer
      // sees the redirect target's hostname and only allows it if that
      // hostname is on the allowlist. We allow both:
      //   - upload.wikimedia.org (direct image hot-links, legacy)
      //   - commons.wikimedia.org (Special:FilePath redirect target)
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
        pathname: "/wikipedia/commons/**",
      },
      {
        protocol: "https",
        hostname: "commons.wikimedia.org",
        port: "",
        pathname: "/wiki/Special:FilePath/**",
      },
    ],
  },
  trailingSlash: false,
  poweredByHeader: false,
};

// Sentry build-time config is only applied when SENTRY_DSN is set; this
// keeps dev builds fast and avoids prompt-blocking Sentry CLI auth in
// local dev. See: https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
const sentryBuildOptions = {
  // Suppresses the Sentry CLI upload during build. Source maps still get
  // generated locally (for debugging), but we don't push them to Sentry
  // on every preview deploy — production-only push is controlled via
  // SENTRY_AUTH_TOKEN env var on Vercel.
  dryRun: !process.env.SENTRY_AUTH_TOKEN,
  // Hide Sentry's internal build logs by default.
  silent: !process.env.SENTRY_DEBUG,
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
};

const exported = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN
  ? withSentryConfig(nextConfig, sentryBuildOptions)
  : nextConfig;

export default exported;
