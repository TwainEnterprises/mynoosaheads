/**
 * /styleguide — interior documentation page for the design system.
 *
 * Per the task brief, the option was Storybook OR a /styleguide route.
 * We picked the /styleguide route because:
 *   1. Storybook 7 + Next.js introduces a parallel build pipeline (~30+ min
 *      to set up) and complicates the Vercel build (Storybook static output
 *      needs a separate publish step).
 *   2. The /styleguide route lives in the same Next.js app — every component
 *      shipped to /styleguide is automatically wired into the production build.
 *   3. Designers/editors can preview the design system on the live URL.
 *
 * Structure:
 *   - Hero
 *   - Colour scales (7 ramps × 11 shades)
 *   - Typography (Fraunces/Inter/Caveat + type scale)
 *   - Buttons × variants × sizes
 *   - Cards + cards with header/disclosure
 *   - Hero component
 *   - LiveDataWidget × kinds × states
 *   - Form primitives
 *   - NavBar + Footer
 *   - LogoCompare (the 3 candidates reviewed)
 *   - Icons
 *   - Accessibility audit checklist
 */

import type { Metadata } from "next";
import Image from "next/image";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Hero,
  LiveDataWidget,
  LiveDataGrid,
  FormField,
  TextInput,
  TextArea,
  Select,
  Checkbox,
  Label,
  LogoCompare,
  Icons,
  type IconName,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Style guide",
  description:
    "MyNoosaHeads design system — colours, typography, components, accessibility.",
  robots: { index: false, follow: false },
};

const COLOUR_RAMPS = [
  { name: "Paper", prefix: "paper", shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
  { name: "Ink", prefix: "ink", shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
  { name: "Eucalyptus", prefix: "eucalyptus", shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
  { name: "Ocean", prefix: "ocean", shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
  { name: "Rainforest", prefix: "rainforest", shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] },
] as const;

const TYPOGRAPHY_SAMPLES = [
  { token: "display-xl", label: "Display XL", desc: "Hero H0 — Fraunces 600" },
  { token: "display-lg", label: "Display LG", desc: "Page H1 — Fraunces 600" },
  { token: "display-md", label: "Display MD", desc: "Section H2 — Fraunces 600" },
  { token: "display-sm", label: "Display SM", desc: "Sub H3 — Fraunces 500" },
  { token: "headline-lg", label: "Headline LG", desc: "Card H4 — Fraunces 500" },
  { token: "headline-md", label: "Headline MD", desc: "H5 — Fraunces 500" },
  { token: "headline-sm", label: "Headline SM", desc: "H6 — Fraunces 500" },
  { token: "body-lg", label: "Body LG", desc: "Lead — Inter 400" },
  { token: "body", label: "Body MD", desc: "Body — Inter 400" },
  { token: "body-sm", label: "Body SM", desc: "Small — Inter 400" },
  { token: "caption", label: "Caption", desc: "Meta — Inter 500" },
  { token: "eyebrow", label: "Eyebrow", desc: "Small caps — Inter 600" },
  { token: "accent-lg", label: "Accent LG", desc: "Handwritten flourish — Caveat 500" },
  { token: "accent-md", label: "Accent MD", desc: "Byline accent — Caveat 500" },
] as const;

const ICON_LIST: IconName[] = [
  "Wave",
  "Fish",
  "Boat",
  "Compass",
  "Eucalyptus",
  "ParkGate",
  "Sun",
  "Moon",
  "TideArrow",
  "WindArrow",
  "Umbrella",
  "Bbq",
  "Camera",
  "Alert",
  "ChevronRight",
  "Menu",
  "Close",
  "Search",
  "Pin",
  "Calendar",
  "External",
];

export default function StyleGuidePage() {
  return (
    <div className="bg-paper-50">
      <Hero
        eyebrow="Sprint 1.2"
        title="MyNoosaHeads design system"
        subtitle="Colours, typography, components, icons, accessibility — every token that ships to production, on one page."
        flourish="Built slowly, on paper."
      />

      <Section
        id="logo"
        eyebrow="Brand"
        title="Logo candidates"
        subtitle="Three SVG mocks per the design brief. Final pick by the team lead."
      >
        <LogoCompare />
        <p className="mt-6 text-body-sm text-ink-700 max-w-3xl">
          Files at <code className="bg-paper-100 px-1.5 py-0.5 rounded">/public/brand/logo-1.svg</code>,{" "}
          <code className="bg-paper-100 px-1.5 py-0.5 rounded">logo-2.svg</code>,{" "}
          <code className="bg-paper-100 px-1.5 py-0.5 rounded">logo-3.svg</code>. Each is a single
          self-contained SVG; consumer component is{" "}
          <code className="bg-paper-100 px-1.5 py-0.5 rounded">{"<Logo mark=\"2\" />"}</code>{" "}
          from <code className="bg-paper-100 px-1.5 py-0.5 rounded">@/components/ui/Logo</code>.
        </p>
      </Section>

      <Section
        id="colour"
        eyebrow="Tokens"
        title="Colour ramps"
        subtitle="7 palettes × 11 shades (50–950). All values defined as CSS custom properties in globals.css; Tailwind utility classes bind to them."
        background="surface"
      >
        <div className="space-y-10">
          {COLOUR_RAMPS.map((ramp) => (
            <div key={ramp.prefix}>
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-headline-lg text-ink-900">{ramp.name}</h3>
                <code className="text-caption text-ink-600">
                  --{ramp.prefix}-50 → --{ramp.prefix}-950
                </code>
              </div>
              <div className="mt-3 grid grid-cols-11 gap-1">
                {ramp.shades.map((s) => (
                  <div key={s} className="text-caption">
                    <div
                      className={`h-14 w-full rounded bg-${ramp.prefix}-${s} border border-paper-300`}
                      role="img"
                      aria-label={`${ramp.prefix} ${s}`}
                    />
                    <p className="mt-1 text-ink-700 font-mono text-[10px]">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="typography"
        eyebrow="Typography"
        title="Type scale"
        subtitle="Fraunces (display), Inter (body), Caveat (accent). Fluid clamp between mobile and desktop."
      >
        <div className="space-y-6">
          {TYPOGRAPHY_SAMPLES.map((t) => (
            <div
              key={t.token}
              className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 border-b border-paper-200 pb-5"
            >
              <div className="md:w-48 shrink-0">
                <p className="font-mono text-caption text-ocean-700">{t.token}</p>
                <p className="text-caption text-ink-600">{t.desc}</p>
              </div>
              <p
                className={`text-${t.token} text-ink-900 text-balance flex-1 min-w-0`}
              >
                {t.token === "accent-lg" || t.token === "accent-md"
                  ? "by the headland, by the bar"
                  : t.token === "eyebrow" || t.token === "caption"
                    ? "Small caps sample — Sprint 1.2"
                    : "Plan your Noosa trip well."}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="buttons"
        eyebrow="Components"
        title="Buttons"
        subtitle="6 variants × 4 sizes. Polymorphic — renders <button> by default, <Link> when href is set, <a target=_blank> when external is set."
        background="surface"
      >
        <SubHeading>Variants</SubHeading>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
        <SubHeading>Sizes</SubHeading>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">X-Large</Button>
        </div>
        <SubHeading>With icons</SubHeading>
        <div className="flex flex-wrap gap-3">
          <Button leadingIcon={<Icons.Wave size={16} />}>Surf report</Button>
          <Button variant="secondary" trailingIcon={<Icons.ChevronRight size={16} />}>
            Read more
          </Button>
          <Button variant="outline" leadingIcon={<Icons.Search size={16} />}>
            Search Noosa
          </Button>
        </div>
        <SubHeading>States</SubHeading>
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button disabled>Disabled</Button>
          <Button fullWidth={false}>Full width on</Button>
        </div>
        <SubHeading>As link</SubHeading>
        <div className="flex flex-wrap gap-3">
          <Button href="/">Internal link</Button>
          <Button href="https://www.bom.gov.au/" external variant="secondary">
            External BOM
          </Button>
        </div>
      </Section>

      <Section id="cards" eyebrow="Components" title="Cards">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card>
            <Image
              src="/styleguide/sample-card-image.svg"
              alt=""
              width={320}
              height={180}
              className="aspect-[16/9] w-full object-cover"
              unoptimized
            />
            <CardHeader
              eyebrow="Where to stay"
              title="A pocket guide to Noosa's accommodation"
              disclosure="Affiliate"
            />
            <CardBody>
              <p className="text-body-sm text-ink-700">
                From rainforest shacks to Hastings Street hotels — find the right base for your
                trip.
              </p>
            </CardBody>
            <CardFooter>
              <Button variant="ghost" size="sm" trailingIcon={<Icons.ChevronRight size={14} />}>
                Read the guide
              </Button>
            </CardFooter>
          </Card>
          <Card variant="surface">
            <CardBody>
              <p className="eyebrow">Editorial</p>
              <h3 className="mt-1 font-display text-headline-lg text-ink-900">
                Slow guides for Noosa locals
              </h3>
              <p className="mt-3 text-body-sm text-ink-700">
                Card variant &ldquo;surface&rdquo; &mdash; used when stacking editorial cards in a tinted band so the
                section reads as a single block.
              </p>
            </CardBody>
          </Card>
          <Card variant="flat">
            <CardBody>
              <p className="eyebrow">Editorial</p>
              <h3 className="mt-1 font-display text-headline-lg text-ink-900">
                Flat — borderless
              </h3>
              <p className="mt-3 text-body-sm text-ink-700">
                For overlays or colour-banded sections where the parent already provides separation.
              </p>
            </CardBody>
          </Card>
        </div>
      </Section>

      <Section
        id="hero"
        eyebrow="Components"
        title="Hero"
        background="surface"
      >
        <Hero
          eyebrow="Sample eyebrow"
          title="A full Noosa guide — surf, parks, places to eat."
          subtitle="Hero takes children for trailing slots. Backgrounds: paper, surface, or full-bleed image."
          flourish="by the bar, by the headland"
          actions={
            <>
              <Button leadingIcon={<Icons.Wave size={16} />}>Surf report</Button>
              <Button variant="outline" trailingIcon={<Icons.ChevronRight size={16} />}>
                Today&rsquo;s tides
              </Button>
            </>
          }
        />
      </Section>

      <Section
        id="live-data"
        eyebrow="Components"
        title="LiveDataWidget"
        subtitle="Live data widget demo — renders fresh, stale, and unavailable states."
      >
        <SubHeading>Fresh (default)</SubHeading>
        <LiveDataGrid>
          <LiveDataWidget
            kind="surf"
            title="Surf — First Bay"
            value="1.4 m"
            secondary="SSE swell, period 9 s"
            source="BOM Capricornia–Hervey Bay"
            asOf="06:40"
          />
          <LiveDataWidget
            kind="wind"
            title="Wind — Noosa Bar"
            value="14 km/h SE"
            secondary="Gusts 22 km/h"
            source="Open-Meteo"
            asOf="06:40"
          />
          <LiveDataWidget
            kind="tide"
            title="Tide — Tewantin"
            value="0.8 m ↓"
            secondary="High 11:42, low 18:09"
            source="BOM"
            asOf="06:40"
          />
          <LiveDataWidget
            kind="uv"
            title="UV index"
            value="7"
            secondary="High — sun protection recommended"
            source="BOM"
            asOf="06:40"
          />
          <LiveDataWidget
            kind="sun-moon"
            title="Sunrise / sunset"
            value="06:14 / 17:32"
            secondary="First light 05:48"
            source="BOM"
            asOf="2026-08-27"
          />
          <LiveDataWidget
            kind="alerts"
            title="Park alerts"
            value="No active closures"
            secondary="Last checked 06:00"
            source="QPWS"
            asOf="06:00"
          />
        </LiveDataGrid>

        <SubHeading>Stale + Unavailable</SubHeading>
        <LiveDataGrid>
          <LiveDataWidget
            kind="surf"
            title="Surf — First Bay"
            value="—"
            secondary="Awaiting 06:50 refresh"
            state="stale"
          />
          <LiveDataWidget
            kind="wind"
            title="Wind — Noosa Bar"
            value="Unavailable"
            secondary="Upstream feed 503 — retry in 15 min"
            state="unavailable"
          />
        </LiveDataGrid>
      </Section>

      <Section
        id="forms"
        eyebrow="Components"
        title="Form primitives"
        background="surface"
      >
        <form className="card-surface max-w-2xl space-y-5">
          <FormField label="Your name" required help="We don't store this — it's a placeholder.">
            {(p) => <TextInput {...p} placeholder="Jane Citizen" />}
          </FormField>
          <FormField label="Where in Noosa?" required error="Pick a place.">
            {(p) => (
              <Select {...p} defaultValue="">
                <option value="" disabled>
                  Choose a beach or suburb
                </option>
                <option>Main Beach</option>
                <option>First Bay</option>
                <option>Sunshine Beach</option>
                <option>Hastings Street</option>
                <option>Noosa Heads (other)</option>
              </Select>
            )}
          </FormField>
          <FormField label="Notes (optional)">
            {(p) => <TextArea {...p} rows={3} placeholder="Anything we should know?" />}
          </FormField>
          <div className="flex items-start gap-2">
            <Checkbox id="newsletter" />
            <Label htmlFor="newsletter" className="font-normal">
              Note: per chairman directive, MyNoosaHeads has no newsletter — this checkbox is
              intentionally absent from production.
            </Label>
          </div>
          <div className="flex gap-3">
            <Button type="submit">Submit</Button>
            <Button variant="ghost" type="reset">
              Reset
            </Button>
          </div>
        </form>
      </Section>

      <Section id="icons" eyebrow="Components" title="Icons">
        <p className="text-body-sm text-ink-700 max-w-2xl">
          Custom line-icon set, 1.5–1.75 px stroke, 24px nominal. Each icon takes{" "}
          <code className="bg-paper-100 px-1.5 py-0.5 rounded">currentColor</code> for the stroke, so
          wrap them in a coloured element.
        </p>
        <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4">
          {ICON_LIST.map((name) => {
            const Icon = Icons[name];
            return (
              <div
                key={name}
                className="flex flex-col items-center gap-2 p-3 rounded-lg border border-paper-200 bg-paper-50"
              >
                <Icon size={22} />
                <span className="text-[10px] uppercase tracking-wider text-ink-600">
                  {name}
                </span>
              </div>
            );
          })}
        </div>
      </Section>

      <Section
        id="a11y"
        eyebrow="Accessibility"
        title="A11y primitives"
        subtitle="Built in: skip link, focus rings, semantic landmarks, ARIA labels on icons, alt text on images, aria-current on active nav items."
        background="surface"
      >
        <ul className="card-surface space-y-2 text-body-sm text-ink-800 list-disc pl-6">
          <li>Skip link <code className="bg-paper-100 px-1 rounded">Skip to content</code> visible on first Tab.</li>
          <li>Focus rings use Ocean 600 with 2 px outline + 2 px offset, applied via <code className="bg-paper-100 px-1 rounded">:focus-visible</code>.</li>
          <li>Nav uses <code className="bg-paper-100 px-1 rounded">&lt;nav aria-label=&ldquo;Primary&rdquo;&gt;</code> and <code className="bg-paper-100 px-1 rounded">aria-current=&ldquo;page&rdquo;</code> on active link.</li>
          <li>Icons default to <code className="bg-paper-100 px-1 rounded">aria-hidden=&ldquo;true&rdquo;</code>; consumers should pass a <code className="bg-paper-100 px-1 rounded">title</code> prop for labelled icons.</li>
          <li>Forms use <code className="bg-paper-100 px-1 rounded">FormField</code> to wire <code className="bg-paper-100 px-1 rounded">htmlFor</code>, <code className="bg-paper-100 px-1 rounded">aria-describedby</code>, and <code className="bg-paper-100 px-1 rounded">aria-invalid</code>.</li>
          <li>All decorative images are <code className="bg-paper-100 px-1 rounded">aria-hidden</code> or have empty alt; content images get descriptive alt.</li>
          <li>Mobile nav uses native disclosure + ARIA <code className="bg-paper-100 px-1 rounded">aria-expanded</code> + <code className="bg-paper-100 px-1 rounded">aria-controls</code>.</li>
          <li>Colour pairs verified WCAG AA &mdash; see <code className="bg-paper-100 px-1 rounded">colour_scales.md</code> evidence file.</li>
        </ul>
      </Section>

      <div className="container-page pb-20">
        <p className="text-caption text-ink-600">
          Full inventory lives at <code className="bg-paper-100 px-1.5 py-0.5 rounded">src/components/ui/</code>.
        </p>
      </div>
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  background,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  background?: "paper" | "surface";
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={[
        "py-14 md:py-20",
        background === "surface" ? "bg-paper-100" : "bg-paper-50",
      ].join(" ")}
    >
      <div className="container-page">
        <p className="eyebrow">{eyebrow}</p>
        <h2
          id={`${id}-heading`}
          className="mt-1 font-display text-display-md text-ink-900 text-balance"
        >
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-3 lead max-w-3xl text-pretty">{subtitle}</p>
        ) : null}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    // MSN-2959 / TSK-2959-POLISH-C: dropped `text-ocean-700` override so the
    // eyebrow register now uses text-ocean-900 (#0E4A41) for WCAG AA on
    // white surfaces — see .eyebrow in src/app/globals.css.
    <h3 className="mt-6 mb-3 text-eyebrow first:mt-0">{children}</h3>
  );
}
