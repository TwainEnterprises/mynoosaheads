// src/app/robots.ts
// Robots.txt for mynoosaheads.com. Allows indexing on production;
// disallows /api/, /styleguide, /_next/. Sitemap declared for crawlers.
//
// v5 (MSN-2959-V5-POLISH #29) — centralised production URL. Previously
// hardcoded to "https://noosa-site-v2.vercel.app" (a sibling Vercel
// project that does not match the marketing hostname). v5 reads from
// SITE.productionUrl which is resolved from NEXT_PUBLIC_SITE_URL env
// var at build time. See sitemap.ts for the full rationale.

import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

const SITE_URL = SITE.productionUrl;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/styleguide", "/_next/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}