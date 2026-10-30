/**
 * V2PointCards — the four Noosa break points as premium cards.
 *
 * MSN-3100. The four bullets from the "Surf — what the points need"
 * section are rendered as a semantic list of cards: gold icon chip, point
 * name, then the bullet text verbatim. The list semantics are preserved
 * (ul > li) while the presentation moves from a plain bullet list to the
 * card treatment used on the quality bar.
 */

import type { ReactNode } from "react";

export type V2PointCard = {
  /** Short point name, e.g. "First Bay". */
  name: string;
  /** Icon element for the chip. */
  icon: ReactNode;
  /** The bullet text, verbatim. */
  body: string;
};

export type V2PointCardsProps = {
  points: V2PointCard[];
};

export function V2PointCards({ points }: V2PointCardsProps) {
  return (
    <ul className="v2-grid v2-grid--4 v2-list-reset" aria-label="Noosa surf breaks">
      {points.map((point) => (
        <li key={point.name} className="v2-card">
          <span className="v2-card__icon" aria-hidden="true">
            {point.icon}
          </span>
          <h3 className="v2-card__title">{point.name}</h3>
          <p className="v2-card__body">{point.body}</p>
        </li>
      ))}
    </ul>
  );
}
