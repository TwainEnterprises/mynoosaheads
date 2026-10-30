/**
 * V2SourceRail — the "Primary sources" panel.
 *
 * MSN-3100. Keeps the five primary source links (with their original
 * URLs) plus the "All sources are public" note. It sits to the right of
 * the live-tile section, which is exactly where the copy says to find it.
 */

import Link from "next/link";
import { Icons } from "@/components/ui/Icon";

export type V2SourceRailProps = {
  title: string;
  sources: { label: string; href: string }[];
  /** Optional note under the list (may contain a Link). */
  note?: React.ReactNode;
  onDark?: boolean;
};

export function V2SourceRail({ title, sources, note, onDark = true }: V2SourceRailProps) {
  const railClass = onDark ? "v2-rail" : "v2-rail v2-rail--light";
  return (
    <div className={railClass}>
      <h3 className="v2-rail__title">{title}</h3>
      <ul className="v2-linklist">
        {sources.map((source) => (
          <li key={source.href} className="v2-linklist__item">
            <span className="v2-linklist__mark" aria-hidden="true">
              <Icons.Compass size={15} />
            </span>
            <a
              className="v2-linklist__link"
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {source.label}
            </a>
          </li>
        ))}
      </ul>
      {note ? <p className="v2-rail__note">{note}</p> : null}
    </div>
  );
}

/**
 * V2RelatedCard — one related-link card with a link-out.
 */
export function V2RelatedCard({
  label,
  href,
  description,
}: {
  label: string;
  href: string;
  description: string;
}) {
  return (
    <div className="v2-related__card">
      <Link className="v2-related__link" href={href}>
        {label}
      </Link>
      <p className="v2-related__desc">{description}</p>
      <span className="v2-related__cta">
        Open guide
        <span aria-hidden="true">&rarr;</span>
      </span>
    </div>
  );
}
