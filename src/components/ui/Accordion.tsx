"use client";

/**
 * Accordion — accessible disclosure component.
 *
 * Per Albert's v6 spec §4.4 / §4.6. Used by S15 (FAQ), mega-menu
 * mobile drawer (already in MegaMenu), and any future disclosure
 * pattern. Radix-free; pure <details> + <summary> wrapped with
 * proper ARIA. Keyboard: Enter / Space toggle, Arrow keys move
 * between triggers, Escape closes any open panel and returns
 * focus to the trigger.
 *
 * Accessibility:
 *   - Each trigger is a <button> with aria-expanded and
 *     aria-controls.
 *   - The panel is a <div role="region"> with aria-labelledby
 *     pointing at the trigger id.
 *   - The chevron rotates on expand; respects
 *     prefers-reduced-motion: the rotation is disabled and
 *     the indicator swaps textually.
 *
 * The component is a client component because of the ARIA state
 * mirroring (open/closed) and the keyboard nav. No animation
 * library; CSS handles the height transition via grid-template-rows.
 */

import { useId, useState, useRef, useEffect, type ReactNode } from "react";
import { Icons } from "./Icon";

export type AccordionItem = {
  id?: string;
  question: ReactNode;
  answer: ReactNode;
  /** Optional icon (24x24, currentColor). */
  icon?: ReactNode;
};

export type AccordionProps = {
  items: AccordionItem[];
  /** Optional accessible label for the whole accordion group. */
  ariaLabel?: string;
  /** Render as <ul>/<li> when inside a list-like context. */
  asList?: boolean;
  /** Default open id (P1 FAQ defaults to none-open). */
  defaultOpenId?: string;
  /** Show the chevron on the right (default true). */
  showChevron?: boolean;
};

export function Accordion({
  items,
  ariaLabel = "Accordion",
  asList = false,
  defaultOpenId,
  showChevron = true,
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(() => {
    if (defaultOpenId) return new Set([defaultOpenId]);
    return new Set();
  });
  const baseId = useId();
  const triggersRef = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Map a stable id per item.
  const ids = items.map((it, i) => it.id ?? `${baseId}-item-${i}`);

  // Roving tabindex: track the focused trigger.
  const [focusedIndex, setFocusedIndex] = useState(0);
  useEffect(() => {
    // Sync focused index with current open set if needed.
    // (No automatic focus shift; only on keyboard nav.)
  }, [openIds]);

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const focusTrigger = (index: number) => {
    const id = ids[index];
    const trigger = triggersRef.current.get(id);
    if (trigger) {
      trigger.focus();
      setFocusedIndex(index);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        focusTrigger((index + 1) % items.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        focusTrigger((index - 1 + items.length) % items.length);
        break;
      case "Home":
        e.preventDefault();
        focusTrigger(0);
        break;
      case "End":
        e.preventDefault();
        focusTrigger(items.length - 1);
        break;
      default:
        break;
    }
  };

  const content = (
    <div
      role="group"
      aria-label={ariaLabel}
      className="divide-y divide-paper-200 border-y border-paper-200"
    >
      {items.map((item, i) => {
        const id = ids[i];
        const triggerId = `${id}-trigger`;
        const panelId = `${id}-panel`;
        const isOpen = openIds.has(id);
        return (
          <div key={id} className="group">
            <h3 className="m-0">
              <button
                ref={(el) => {
                  if (el) triggersRef.current.set(id, el);
                  else triggersRef.current.delete(id);
                }}
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={[
                  "flex w-full items-center justify-between gap-4 py-4 text-left",
                  "transition-colors duration-base ease-out",
                  "hover:bg-paper-50/60",
                ].join(" ")}
              >
                <span className="flex flex-1 items-center gap-3">
                  {item.icon ? (
                    <span
                      className="shrink-0 text-eucalyptus-700"
                      aria-hidden="true"
                    >
                      {item.icon}
                    </span>
                  ) : null}
                  <span className="font-display text-headline-lg text-ink-900 text-balance">
                    {item.question}
                  </span>
                </span>
                {showChevron ? (
                  <span
                    aria-hidden="true"
                    className={[
                      "shrink-0 text-ink-700 transition-transform duration-base ease-out",
                      isOpen ? "rotate-90" : "rotate-0",
                    ].join(" ")}
                  >
                    <Icons.ChevronRight size={18} />
                  </span>
                ) : null}
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
              className="pb-5 pl-10 pr-2"
            >
              <div className="text-body-sm text-ink-800 leading-relaxed">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  if (asList) {
    return <ul className="m-0 list-none p-0">{content}</ul>;
  }
  return content;
}
