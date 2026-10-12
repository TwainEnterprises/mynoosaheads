"use client";

/**
 * Tabs — accessible tab list with arrow-key navigation.
 *
 * Per Albert's v6 spec §4.4 / §4.6. Used to filter S5 (where to
 * stay) and S7 (eat & drink) by archetype (Hotels, Apartments,
 * Houses, Pet-friendly, etc.).
 *
 * Keyboard pattern (WAI-ARIA Authoring Practices):
 *   - ArrowLeft / ArrowRight: move focus and selection between tabs
 *   - Home / End: focus first / last tab
 *   - Space / Enter: activate tab (default behavior)
 *   - Tab: leave the tab list
 *
 * Roving tabindex: only the active tab has tabindex=0; the rest
 * are tabindex=-1. Focus is set on click (mouse) and on arrow-key.
 *
 * Visual treatment: underline on the active tab; the tab list is
 * a horizontal scroll-snap row on mobile.
 */

import { useId, useRef, useState, type ReactNode, type KeyboardEvent } from "react";

export type TabItem = {
  id: string;
  label: ReactNode;
  /** Optional small count badge (e.g. "12"). */
  count?: number;
  /** The panel content. */
  content: ReactNode;
};

export type TabsProps = {
  items: TabItem[];
  /** Accessible label for the tab list. */
  ariaLabel: string;
  /** Default active tab id. */
  defaultId?: string;
  /** Layout: "underline" (default) or "pill". */
  variant?: "underline" | "pill";
};

export function Tabs({
  items,
  ariaLabel,
  defaultId,
  variant = "underline",
}: TabsProps) {
  const baseId = useId();
  const initialId = defaultId ?? items[0]?.id;
  const [activeId, setActiveId] = useState<string | undefined>(initialId);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const focusTab = (id: string) => {
    const el = tabRefs.current.get(id);
    el?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (e.key) {
      case "ArrowRight": {
        e.preventDefault();
        const next = items[(index + 1) % items.length];
        if (next) {
          setActiveId(next.id);
          focusTab(next.id);
        }
        break;
      }
      case "ArrowLeft": {
        e.preventDefault();
        const prev = items[(index - 1 + items.length) % items.length];
        if (prev) {
          setActiveId(prev.id);
          focusTab(prev.id);
        }
        break;
      }
      case "Home": {
        e.preventDefault();
        const first = items[0];
        if (first) {
          setActiveId(first.id);
          focusTab(first.id);
        }
        break;
      }
      case "End": {
        e.preventDefault();
        const last = items[items.length - 1];
        if (last) {
          setActiveId(last.id);
          focusTab(last.id);
        }
        break;
      }
      default:
        break;
    }
  };

  const listClasses =
    variant === "pill"
      ? "flex flex-wrap gap-2"
      : "flex gap-1 overflow-x-auto border-b border-paper-200";

  const triggerBase =
    variant === "pill"
      ? "rounded-pill border px-4 py-2 text-body-sm font-medium"
      : "rounded-t-md border-b-2 px-3 py-2.5 text-body-sm font-medium -mb-px";

  return (
    <div>
      <div role="tablist" aria-label={ariaLabel} className={listClasses}>
        {items.map((item, i) => {
          const isActive = activeId === item.id;
          const tabId = `${baseId}-tab-${item.id}`;
          const panelId = `${baseId}-panel-${item.id}`;
          return (
            <button
              key={item.id}
              ref={(el) => {
                if (el) tabRefs.current.set(item.id, el);
                else tabRefs.current.delete(item.id);
              }}
              id={tabId}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveId(item.id)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className={[
                triggerBase,
                variant === "pill"
                  ? isActive
                    ? "border-eucalyptus-500 bg-eucalyptus-50 text-eucalyptus-900"
                    : "border-paper-200 bg-paper-50 text-ink-700 hover:bg-paper-100"
                  : isActive
                    ? "border-eucalyptus-600 text-eucalyptus-900"
                    : "border-transparent text-ink-700 hover:text-ink-900",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean-500",
                "transition-colors duration-base ease-out",
              ].join(" ")}
            >
              {item.label}
              {item.count !== undefined ? (
                <span className="ml-1.5 inline-flex items-center justify-center rounded-full bg-paper-200 px-2 py-0.5 text-[10px] font-semibold text-ink-700">
                  {item.count}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
      {items.map((item) => {
        const isActive = activeId === item.id;
        const tabId = `${baseId}-tab-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;
        return (
          <div
            key={item.id}
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabId}
            tabIndex={0}
            hidden={!isActive}
            className="pt-6 focus:outline-none"
          >
            {isActive ? item.content : null}
          </div>
        );
      })}
    </div>
  );
}
