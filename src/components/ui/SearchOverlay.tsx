"use client";

/**
 * SearchOverlay — global search modal (deferred from v6 P0 to v6.1 per Tim's call #2).
 *
 * Behaviour:
 *   - Triggered by the search button in MegaMenu (or Cmd/Ctrl-K).
 *   - Opens an overlay with a single text input + a results list.
 *   - Index is a static array of { title, href, category } built
 *     at build time from NAV + MEGA_NAV + the named routes.
 *   - Empty / no results show a service-register message ("No
 *     matches. Try a destination, a page, or a section name.").
 *   - Results keyboard: ArrowUp/Down to move, Enter to open, Escape
 *     to close. Focus moves into the input on open; returns to
 *     the trigger on close.
 *   - Respects prefers-reduced-motion (no fade-in).
 *
 * Compliance:
 *   - No search query is stored, logged, or sent to a backend.
 *   - All processing is in-memory; a Privacy Act 1988 (Cth)
 *     disclosure sits at the foot of the modal.
 */

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { Icons } from "./Icon";
import { SEARCH_INDEX } from "@/data/site";

export type SearchOverlayProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SearchOverlay({ open, onOpenChange }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previousActiveRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const labelId = useId();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return SEARCH_INDEX.slice(0, 8);
    return SEARCH_INDEX.filter((entry) => {
      return (
        entry.title.toLowerCase().includes(q) ||
        (entry.description?.toLowerCase().includes(q) ?? false) ||
        entry.category.toLowerCase().includes(q)
      );
    }).slice(0, 12);
  }, [query]);

  // Sync active index when results change
  useEffect(() => {
    setActiveIndex(0);
  }, [results.length, open]);

  // Focus management
  useEffect(() => {
    if (open) {
      previousActiveRef.current = document.activeElement as HTMLElement;
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const id = window.setTimeout(() => inputRef.current?.focus(), 0);
      return () => {
        window.clearTimeout(id);
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [open]);

  // Restore focus on close
  useEffect(() => {
    if (!open && previousActiveRef.current) {
      previousActiveRef.current.focus();
      previousActiveRef.current = null;
    }
  }, [open]);

  // Keyboard handling
  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onOpenChange(false);
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, Math.max(0, results.length - 1)));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(0, i - 1));
      } else if (e.key === "Enter") {
        const target = results[activeIndex];
        if (target) {
          e.preventDefault();
          onOpenChange(false);
          // Use a real link click — but since we're in a portal,
          // navigation will happen via the href. We rely on the
          // Link's default behavior via window.location. The link
          // is rendered below; for keyboard activation, the user
          // can press Enter on the focused <a> as well.
          if (typeof window !== "undefined") {
            window.location.assign(target.href);
          }
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, results, activeIndex, onOpenChange]);

  // Focus trap
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = dialog.querySelectorAll<HTMLElement>(
        'a, button, input, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const onBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onOpenChange(false);
      }
    },
    [onOpenChange],
  );

  if (!open || typeof document === "undefined") return null;

  const modal = (
    <div
      role="presentation"
      onClick={onBackdropClick}
      className="fixed inset-0 z-[70] flex items-start justify-center bg-ink-950/70 p-4 pt-[10vh] backdrop-blur-sm sm:pt-[15vh]"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-paper-50 shadow-2xl"
      >
        <h2 id={titleId} className="sr-only">
          Search MyNoosaHeads
        </h2>
        <div className="flex items-center gap-2 border-b border-paper-200 px-4 py-3">
          <Icons.Search size={18} className="shrink-0 text-ink-700" />
          <label htmlFor={labelId} className="sr-only">
            Search
          </label>
          <input
            ref={inputRef}
            id={labelId}
            type="search"
            value={query}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            placeholder="Search pages, areas, and topics…"
            className="w-full bg-transparent text-body-md text-ink-900 outline-none placeholder:text-ink-500"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
              // Pass arrow + enter up to the global handler
              if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter") {
                e.preventDefault();
                const evt = new KeyboardEvent("keydown", {
                  key: e.key,
                  bubbles: true,
                });
                document.dispatchEvent(evt);
              }
            }}
          />
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="btn-ghost btn-sm"
            aria-label="Close search"
          >
            <Icons.Close size={18} />
          </button>
        </div>
        <div className="max-h-[55vh] overflow-y-auto" role="listbox" aria-label="Search results">
          {results.length === 0 ? (
            <p className="p-6 text-body-sm text-ink-700">
              No matches. Try a destination, a page, or a section name
              (e.g. “Hastings Street”, “surf report”, “FAQ”).
            </p>
          ) : (
            <ul className="divide-y divide-paper-200">
              {results.map((r, i) => (
                <li key={r.href + i} role="option" aria-selected={i === activeIndex}>
                  <Link
                    href={r.href}
                    onClick={() => onOpenChange(false)}
                    onMouseEnter={() => setActiveIndex(i)}
                    onFocus={() => setActiveIndex(i)}
                    className={[
                      "flex items-start gap-3 px-4 py-3 outline-none",
                      i === activeIndex
                        ? "bg-eucalyptus-50 text-ink-900"
                        : "text-ink-800 hover:bg-paper-50",
                    ].join(" ")}
                  >
                    <span className="mt-0.5 shrink-0 text-ink-600">
                      <Icons.Pin size={16} />
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-body-sm font-medium text-ink-900">
                        {r.title}
                      </span>
                      {r.description ? (
                        <span className="mt-0.5 block text-caption text-ink-700">
                          {r.description}
                        </span>
                      ) : null}
                      <span className="mt-1 block text-[10px] uppercase tracking-[0.16em] text-ink-600">
                        {r.category}
                      </span>
                    </span>
                    <Icons.ChevronRight
                      size={16}
                      className="mt-1 shrink-0 text-ink-600"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="border-t border-paper-200 bg-paper-50 px-4 py-2 text-caption text-ink-600">
          Search is local — nothing is sent to a server.{" "}
          <Link
            href="/privacy"
            onClick={() => onOpenChange(false)}
            className="link text-ocean-700"
          >
            Privacy Act 1988 (Cth)
          </Link>
          .
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
