/**
 * V2Section + V2SectionHeading — section rhythm primitives.
 *
 * MSN-3100. Light sections run on ivory/platinum; dark sections run on
 * marine navy with a whisper-fine grid overlay, matching the alternating
 * rhythm of the quality bar.
 */

import type { ReactNode } from "react";

export type V2SectionTone = "light" | "platinum" | "dark" | "deep";

export type V2SectionProps = {
  tone: V2SectionTone;
  /** Used to build the accessible name of the section landmark. */
  labelId: string;
  /** Heading text for the section landmark. */
  label: string;
  /** Visually hide the heading (when the section leads with something else). */
  hideLabel?: boolean;
  tight?: boolean;
  className?: string;
  children: ReactNode;
};

export function V2Section({
  tone,
  labelId,
  label,
  hideLabel = false,
  tight = false,
  className,
  children,
}: V2SectionProps) {
  const toneClass =
    tone === "dark"
      ? "v2-band--dark"
      : tone === "deep"
        ? "v2-band--deep"
        : tone === "platinum"
          ? "v2-band--platinum"
          : "v2-band--light";
  const cls = [
    "v2-band",
    toneClass,
    tight ? "v2-band--tight" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={cls} aria-labelledby={labelId}>
      <div className="v2-container">
        {hideLabel ? (
          <h2 id={labelId} className="sr-only">
            {label}
          </h2>
        ) : (
          <h2 id={labelId} className="v2-h2">
            {label}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}

export type V2SectionHeadingProps = {
  /** Small uppercase gold label above the heading. */
  eyebrow?: ReactNode;
  title: ReactNode;
  /** Optional second half of the heading, rendered in gold. */
  titleAccent?: ReactNode;
  /** Optional supporting sentence under the heading. */
  body?: ReactNode;
  headingId?: string;
  /** true when the section sits on a dark surface. */
  onDark?: boolean;
  align?: "left" | "center";
  className?: string;
};

export function V2SectionHeading({
  eyebrow,
  title,
  titleAccent,
  body,
  headingId,
  onDark = false,
  align = "left",
  className,
}: V2SectionHeadingProps) {
  const style = align === "center" ? { textAlign: "center" as const } : undefined;
  return (
    <div className={className} style={style}>
      {eyebrow ? (
        <p
          className={
            onDark ? "v2-eyebrow v2-eyebrow--on-dark" : "v2-eyebrow v2-eyebrow--gold"
          }
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 id={headingId} className="v2-h2" style={style}>
        {title}
        {titleAccent ? <span className="v2-h2--gold"> {titleAccent}</span> : null}
      </h2>
      {body ? (
        <p className="v2-lead" style={{ marginTop: "1rem" }}>
          {body}
        </p>
      ) : null}
    </div>
  );
}
