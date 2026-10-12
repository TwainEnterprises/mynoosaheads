"use client";

/**
 * Lightbox — fullscreen image modal with focus trap.
 *
 * Per Albert's v6 spec §4.4: click an image to open fullscreen.
 * Used on editorial stories (P2) and the things-to-do rail (P1).
 *
 * Behaviour:
 *   - Opens via the useLightbox() hook (returns { open, close }).
 *   - Click backdrop, click X, or press Escape to close.
 *   - Focus is trapped inside the modal while open.
 *   - Restores focus to the trigger on close.
 *   - Body scroll locked while open.
 *   - Reduced motion: instant show/hide, no fade.
 *
 * The trigger is a thin client wrapper (LightboxTrigger) that
 * accepts a `src` and `alt`; clicking it opens the modal.
 *
 * The modal is a portal'd <div role="dialog" aria-modal="true">;
 * the same Root component renders both pieces so consumers can
 * drop one element in and get the trigger + modal pair.
 */

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { Icons } from "./Icon";

export type LightboxItem = {
  src: string;
  alt: string;
  /** Optional caption shown below the image. */
  caption?: ReactNode;
  /** Optional credit line (e.g. "Photo: Author / Unsplash"). */
  credit?: string;
};

export type LightboxRootProps = {
  children: ReactNode;
  /** Items to display (gallery mode) or single item. */
  items: LightboxItem[];
  /** Initial index to open. Default 0. */
  initialIndex?: number;
  /** Open state (controlled). */
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function LightboxRoot({
  children,
  items,
  initialIndex = 0,
  open,
  onOpenChange,
}: LightboxRootProps) {
  const [index, setIndex] = useState(initialIndex);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousActiveRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  // Sync index when opening
  useEffect(() => {
    if (open) {
      setIndex(initialIndex);
      previousActiveRef.current = document.activeElement as HTMLElement;
      // Lock scroll
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [open, initialIndex]);

  // Focus management
  useEffect(() => {
    if (!open) return;
    // Move focus into the dialog
    const id = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);
    return () => window.clearTimeout(id);
  }, [open]);

  // Restore focus on close
  useEffect(() => {
    if (!open && previousActiveRef.current) {
      previousActiveRef.current.focus();
      previousActiveRef.current = null;
    }
  }, [open]);

  // Keyboard: Escape to close, Arrow keys for gallery
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onOpenChange(false);
        return;
      }
      if (items.length > 1) {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          setIndex((i) => (i + 1) % items.length);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          setIndex((i) => (i - 1 + items.length) % items.length);
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, items.length, onOpenChange]);

  // Focus trap: cycle Tab through focusable elements inside the dialog
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = dialog.querySelectorAll<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"]), input, textarea, select',
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

  const current = items[index];

  const onBackdropClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onOpenChange(false);
      }
    },
    [onOpenChange],
  );

  if (!open || !current) {
    return <>{children}</>;
  }

  const modal = (
    <div
      role="presentation"
      onClick={onBackdropClick}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/85 p-4 sm:p-6"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-paper-50 shadow-2xl"
      >
        <h2 id={titleId} className="sr-only">
          {current.alt}
        </h2>
        <div className="flex items-center justify-between border-b border-paper-200 px-4 py-2">
          <span className="text-caption text-ink-700">
            {items.length > 1 ? `${index + 1} / ${items.length}` : null}
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => onOpenChange(false)}
            className="btn-ghost btn-sm"
            aria-label="Close"
          >
            <Icons.Close size={18} />
            <span className="sr-only">Close</span>
          </button>
        </div>
        <div className="relative flex-1 overflow-auto bg-ink-900">
          <img
            src={current.src}
            alt={current.alt}
            className="mx-auto max-h-[80vh] w-full object-contain"
          />
        </div>
        {(current.caption || current.credit) && (
          <div className="flex flex-col gap-1 border-t border-paper-200 px-4 py-3 text-caption text-ink-700">
            {current.caption ? (
              <div className="text-body-sm text-ink-800">{current.caption}</div>
            ) : null}
            {current.credit ? <div>{current.credit}</div> : null}
          </div>
        )}
        {items.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() =>
                setIndex((i) => (i - 1 + items.length) % items.length)
              }
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-paper-50/90 p-2 text-ink-900 shadow hover:bg-paper-50"
              aria-label="Previous image"
            >
              <Icons.ChevronRight
                size={20}
                className="rotate-180"
              />
            </button>
            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % items.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-paper-50/90 p-2 text-ink-900 shadow hover:bg-paper-50"
              aria-label="Next image"
            >
              <Icons.ChevronRight size={20} />
            </button>
          </>
        ) : null}
      </div>
    </div>
  );

  if (typeof document === "undefined") {
    return <>{children}</>;
  }
  return (
    <>
      {children}
      {createPortal(modal, document.body)}
    </>
  );
}

/**
 * LightboxTrigger — a client wrapper that opens a lightbox on click.
 * Use inside a <LightboxRoot> parent.
 */
export type LightboxTriggerProps = {
  item: LightboxItem;
  openIndex: number;
  onOpen: (index: number) => void;
  children: ReactNode;
  className?: string;
};

export function LightboxTrigger({
  item,
  openIndex,
  onOpen,
  children,
  className,
}: LightboxTriggerProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(openIndex)}
      className={className}
      aria-label={`Open larger view of ${item.alt}`}
    >
      {children}
    </button>
  );
}
