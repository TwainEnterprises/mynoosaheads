import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

/**
 * v5 (MSN-2959-V5-POLISH #1) — typography intent documented.
 *
 * Per Albert's v5 runbook §3.1: Fraunces + Inter + Caveat is a
 * **premium-tier free pairing** and a *better fit for the editorial
 * register* than visitnoosa's paid Cocogoose + Muli. All three fonts
 * are SIL OFL 1.1 and self-hosted via next/font with display: "swap".
 *
 *   Fraunces (display serif) — variable font with optical-size axis,
 *     "ss01"/"salt" stylistic sets for italic display, used for H1–H6.
 *   Inter    (body sans)    — workhorse sans for body + nav + UI.
 *   Caveat   (accent script) — handwritten flourish, used sparingly.
 *
 * Visitnoosa uses paid Cocogoose + Muli ($30–300 one-off per desktop
 * licence per typodermic / Vernon Adams). v2's stack costs A$0, is
 * legally free for commercial use, and reads as more editorial.
 *
 * Future contributors: do NOT add Cocogoose, Muli, or any other paid
 * font here. The pairing is deliberate.
 */

/**
 * MSN-2959 (r2) — Design system tokens.
 *
 * Three-tier architecture:
 *   1. CSS custom properties (src/app/globals.css) — source of truth at runtime.
 *   2. Tailwind tokens below — bind utility classes (bg-paper-50, text-ink-900)
 *      to those CSS vars so component code stays declarative.
 *   3. Components (src/components/ui/*) — consume Tailwind utilities.
 *
 * Palette: white + single blue-green (sea-glass) ramp. The three semantic
 * brand names (eucalyptus / ocean / rainforest) all resolve to the SAME
 * sea-glass ramp so existing utility classes keep working without touching
 * every component file. 5 token groups × 11 shades (50–950) = 55 ramps.
 *
 *   sea-glass anchors:
 *     500 = #5BA89B (primary brand)
 *     700 = #2F8074 (mid)
 *     900 = #0E4A41 (heading accent)
 *
 * Typography: 3 fonts — Fraunces (display serif), Inter (body sans),
 * Caveat (accent handwritten). All SIL OFL 1.1, loaded via next/font in
 * src/app/layout.tsx. Tokens below assume the CSS variables `--font-display`,
 * `--font-body`, `--font-accent` are set globally.
 */

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ────────────────────────────────────────────────────────────
        // Paper & surface — white + sea-glass pale washes (MSN-2959 r2)
        // ────────────────────────────────────────────────────────────
        paper: {
          50: "var(--paper-50)",
          100: "var(--paper-100)",
          200: "var(--paper-200)",
          300: "var(--paper-300)",
          400: "var(--paper-400)",
          500: "var(--paper-500)",
          600: "var(--paper-600)",
          700: "var(--paper-700)",
          800: "var(--paper-800)",
          900: "var(--paper-900)",
          950: "var(--paper-950)",
        },
        // ────────────────────────────────────────────────────────────
        // Ink — body text (near-black with green tint, #0A1F1B)
        // ────────────────────────────────────────────────────────────
        ink: {
          50: "var(--ink-50)",
          100: "var(--ink-100)",
          200: "var(--ink-200)",
          300: "var(--ink-300)",
          400: "var(--ink-400)",
          500: "var(--ink-500)",
          600: "var(--ink-600)",
          700: "var(--ink-700)",
          800: "var(--ink-800)",
          900: "var(--ink-900)",
          950: "var(--ink-950)",
        },
        // ────────────────────────────────────────────────────────────
        // Eucalyptus — primary brand (sea-glass 500 = #5BA89B)
        // ────────────────────────────────────────────────────────────
        eucalyptus: {
          50: "var(--eucalyptus-50)",
          100: "var(--eucalyptus-100)",
          200: "var(--eucalyptus-200)",
          300: "var(--eucalyptus-300)",
          400: "var(--eucalyptus-400)",
          500: "var(--eucalyptus-500)",
          600: "var(--eucalyptus-600)",
          700: "var(--eucalyptus-700)",
          800: "var(--eucalyptus-800)",
          900: "var(--eucalyptus-900)",
          950: "var(--eucalyptus-950)",
        },
        // ────────────────────────────────────────────────────────────
        // Ocean — secondary brand (sea-glass ramp alias, same hex as eucalyptus)
        // ────────────────────────────────────────────────────────────
        ocean: {
          50: "var(--ocean-50)",
          100: "var(--ocean-100)",
          200: "var(--ocean-200)",
          300: "var(--ocean-300)",
          400: "var(--ocean-400)",
          500: "var(--ocean-500)",
          600: "var(--ocean-600)",
          700: "var(--ocean-700)",
          800: "var(--ocean-800)",
          900: "var(--ocean-900)",
          950: "var(--ocean-950)",
        },
        // ────────────────────────────────────────────────────────────
        // Rainforest — deep accent (sea-glass ramp alias, same hex as eucalyptus)
        // ────────────────────────────────────────────────────────────
        rainforest: {
          50: "var(--rainforest-50)",
          100: "var(--rainforest-100)",
          200: "var(--rainforest-200)",
          300: "var(--rainforest-300)",
          400: "var(--rainforest-400)",
          500: "var(--rainforest-500)",
          600: "var(--rainforest-600)",
          700: "var(--rainforest-700)",
          800: "var(--rainforest-800)",
          900: "var(--rainforest-900)",
          950: "var(--rainforest-950)",
        },
        // ────────────────────────────────────────────────────────────
        // MSN-2959 r2: coral + sand + warm-tone palettes fully removed.
        // No coral utility exists in this config. Single sea-glass brand.
        // ────────────────────────────────────────────────────────────

        // ────────────────────────────────────────────────────────────
        // MSN-2959 / TSK-2959-FIX-3: single amber accent.
        // Per Albert's spec §3.3, amber appears ONCE only — on the
        // brand-statement dot on /about. Tailwind exposes 500 (the
        // canonical token) and a 50/100 wash for any future use.
        // ────────────────────────────────────────────────────────────
        amber: {
          50: "var(--accent-amber)",
          100: "var(--accent-amber)",
          500: "var(--accent-amber)",
        },

        // ────────────────────────────────────────────────────────────
        // Backwards-compat aliases (Sprint 1.1 → Sprint 1.2 migration)
        // bg, surface, text, text-muted, ocean, rainforest keep working
        // so we don't break existing utilities during the upgrade.
        // ────────────────────────────────────────────────────────────
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        text: "var(--color-text)",
        "text-muted": "var(--color-text-muted)",
      },
      fontFamily: {
        // v6.3 (MSN-2964) — Phase A: typographic register.
        // `display` is the editorial serif (Fraunces) — used for H1-H6
        //   per the v6 spec §4.1 (Fraunces opsz 144 engaged).
        // `body` is the workhorse sans (Inter) — used for body + nav + UI.
        // `sans` mirrors `body` so utility classes like `font-sans` map
        //   to Inter (the Tailwind v4 default name, kept as alias for
        //   portability with the spec language).
        // `accent` is the handwritten note (Caveat) — use sparingly.
        display: ['var(--font-display)', "ui-serif", "Georgia", "serif"],
        body: ['var(--font-body)', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['var(--font-body)', "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ['var(--font-display)', "ui-serif", "Georgia", "serif"],
        accent: ['var(--font-accent)', "cursive"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        // Type scale — Sprint 1.5 (MSN-2958, Albert brief).
        // Chair feedback (2026-08-27 14:46 BST): font too large.
        // Composite headline drop ~18 %. Display pieces top out at 40 px
        // (down from 48 px). Body anchored at 16 px (down from 18 px).
        // The fluid clamps live in CSS custom properties (globals.css)
        // — Tailwind utilities just bind to them.
        "display-xl": [
          "var(--text-display-xl)",
          { lineHeight: "1.18", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        "display-lg": [
          "var(--text-display-lg)",
          { lineHeight: "1.18", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        "display-md": [
          "var(--text-display-md)",
          { lineHeight: "1.18", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        "display-sm": [
          "var(--text-display-sm)",
          { lineHeight: "1.28", letterSpacing: "-0.015em", fontWeight: "500" },
        ],
        "headline-lg": [
          "var(--text-headline-lg)",
          { lineHeight: "1.28", letterSpacing: "-0.012em", fontWeight: "500" },
        ],
        "headline-md": [
          "var(--text-headline-md)",
          { lineHeight: "1.28", letterSpacing: "-0.01em", fontWeight: "500" },
        ],
        "headline-sm": [
          "var(--text-headline-sm)",
          { lineHeight: "1.3", letterSpacing: "-0.008em", fontWeight: "500" },
        ],
        "body-lg": [
          "var(--text-body-lg)",
          { lineHeight: "1.6", letterSpacing: "0", fontWeight: "400" },
        ],
        body: [
          "var(--text-body-md)",
          { lineHeight: "1.6", letterSpacing: "0", fontWeight: "400" },
        ],
        "body-sm": [
          "var(--text-body-sm)",
          { lineHeight: "1.55", letterSpacing: "0", fontWeight: "400" },
        ],
        caption: [
          "var(--text-caption)",
          { lineHeight: "1.45", letterSpacing: "0.01em", fontWeight: "500" },
        ],
        eyebrow: [
          "var(--text-eyebrow)",
          // Sprint 1.5: tighter tracking on uppercase labels (0.08em → 0.12em
          // is in CSS, the Tailwind utility stays at the same base 12 px).
          { lineHeight: "1.3", letterSpacing: "0.12em", fontWeight: "600" },
        ],
        code: [
          "var(--text-code)",
          { lineHeight: "1.5", letterSpacing: "0", fontWeight: "400" },
        ],
        "accent-lg": [
          "var(--text-accent-lg)",
          { lineHeight: "1.2", letterSpacing: "0.005em", fontWeight: "500" },
        ],
        "accent-md": [
          "var(--text-accent-md)",
          { lineHeight: "1.25", letterSpacing: "0.005em", fontWeight: "500" },
        ],
        // v6 §4.1 — caption-script role (Caveat, body-sm size,
        // weight 500) for bylines and personal labels.
        "caption-script": [
          "var(--text-caption-script)",
          { lineHeight: "1.3", letterSpacing: "0", fontWeight: "500" },
        ],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "8px",
        md: "10px",
        lg: "14px",
        xl: "20px",
        "2xl": "28px",
        pill: "999px",
      },
      boxShadow: {
        // MSN-2959 r2 — cool shadows tinted toward ink (#0A1F1B), not warm
        // brown. Read as sea-glass-on-paper, not chrome-on-glass.
        sm: "0 1px 2px rgba(10, 31, 27, 0.04)",
        DEFAULT: "0 2px 6px rgba(10, 31, 27, 0.06), 0 1px 2px rgba(10, 31, 27, 0.04)",
        md: "0 6px 14px rgba(10, 31, 27, 0.07), 0 2px 4px rgba(10, 31, 27, 0.05)",
        lg: "0 14px 30px rgba(10, 31, 27, 0.10), 0 4px 8px rgba(10, 31, 27, 0.05)",
        xl: "0 24px 50px rgba(10, 31, 27, 0.14), 0 8px 16px rgba(10, 31, 27, 0.06)",
        // Glow ring (used by live-data tiles + cards with attention state).
        ring: "0 0 0 3px rgba(91, 168, 155, 0.30)",
      },
      maxWidth: {
        prose: "68ch",
        "container-7xl": "80rem",
        "container-6xl": "72rem",
      },
      spacing: {
        // v6.3 (MSN-2964) — Phase F: editorial spacing scale
        // (visitnoosa-aligned). Base 4 with 8-pt cadence for layout.
        // Values are explicit so reviewers can grep a single token list.
        //   4   8   12   16   24   32   48   64   96
        "1": "0.25rem",   //  4
        "2": "0.5rem",    //  8
        "3": "0.75rem",   // 12
        "4": "1rem",      // 16 (Tailwind default)
        "6": "1.5rem",    // 24
        "8": "2rem",      // 32
        "12": "3rem",     // 48
        "16": "4rem",     // 64
        "24": "6rem",     // 96
        // Editorial spacing scale (8-pt grid with 4-pt half-steps for fine work).
        "10": "2.5rem",
        "14": "3.5rem",
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      transitionDuration: {
        DEFAULT: "180ms",
        // v6 §4.3 — three motion durations
        snappy: "120ms",
        base: "200ms",
        slow: "400ms",
      },
      transitionTimingFunction: {
        // v6 §4.3 — three easings
        "ease-out-brand": "cubic-bezier(0.2, 0.8, 0.2, 1)",
        "ease-spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 220ms ease-out both",
      },
    },
  },
  plugins: [typography],
};

export default config;
