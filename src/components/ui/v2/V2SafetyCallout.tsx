/**
 * V2SafetyCallout — the bar-crossing safety warning.
 *
 * MSN-3100. Rendered on a dark band as a premium panel with a gold rail and
 * a warning chip, so it reads as a genuine safety callout rather than a
 * beige box. The copy (including the MSQ link) is carried verbatim from
 * the page it replaces.
 */

import type { ReactNode } from "react";
import { Icons } from "@/components/ui/Icon";

export type V2SafetyCalloutProps = {
  title: string;
  body: ReactNode;
};

export function V2SafetyCallout({ title, body }: V2SafetyCalloutProps) {
  return (
    <aside className="v2-safety" role="note" aria-labelledby="v2-safety-heading">
      <div className="v2-safety__head">
        <span className="v2-safety__icon" aria-hidden="true">
          <Icons.Alert size={22} />
        </span>
        <h3 id="v2-safety-heading" className="v2-safety__title">
          {title}
        </h3>
      </div>
      <p className="v2-safety__body">{body}</p>
    </aside>
  );
}
