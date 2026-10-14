// src/app/sitemap.ts
// Auto-generated sitemap for mynoosaheads.com. Next.js 14 App Router
// serves this at /sitemap.xml.
//
// v5 (MSN-2959-V5-POLISH #29) — centralised production URL. Previously
// hardcoded to "https://noosa-site-v2.vercel.app" (a sibling Vercel
// project that does not match the marketing hostname). v5 reads from
// SITE.productionUrl which is resolved from NEXT_PUBLIC_SITE_URL env
// var at build time, defaulting to "https://mynoosaheads.vercel.app"
// for the dormant production hostname. When the chairman provides the GoDaddy
// creds for the mynoosaheads.com DNS flip, the env var updates and
// every canonical URL, sitemap entry, and robots.txt entry changes
// without touching this file.

import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

const SITE_URL = SITE.productionUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const lastModified = now.toISOString();

  return [
    // Homepage — daily update
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "daily", priority: 1.0 },
    // Category pages — weekly update
    { url: `${SITE_URL}/surf-and-weather`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/surf-and-weather/breaks`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/noosa-national-park`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/accommodation`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    // v5 (MSN-2959-V5-POLISH #21) — nine accommodation sub-pages.
    // Chairman's locked answer #4 (not Albert's default of 4).
    { url: `${SITE_URL}/accommodation/hastings-street`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/accommodation/noosaville`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/accommodation/sunshine-beach`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/accommodation/tewantin`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/accommodation/peregian`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/accommodation/pet-friendly`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/accommodation/family`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/accommodation/accessible`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/accommodation/hinterland`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/things-to-do`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/fishing-reports`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/boats-and-watercraft`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/travel-and-transport`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/webcams`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    // v5 (MSN-2959-V5-POLISH #20) — /plan page (trip planning hub).
    { url: `${SITE_URL}/plan`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    // Editorial / legal — yearly
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/image-credits`, lastModified, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}