"use client";

/**
 * MegaMenu — 6 top-level categories with image-rich hover/focus panels.
 *
 * Per Albert's v6 spec §3.3–§3.4. Replaces the v5 flat 8-link NavBar.
 *
 * Behaviour:
 *   - Hover with 200ms delay OR keyboard focus reveals the panel.
 *   - Click outside / Escape closes the panel.
 *   - ARIA: aria-haspopup="true" on trigger; aria-expanded / aria-controls.
 *   - Panel is role="region" with aria-label.
 *   - Mobile (<md): collapses to a hamburger sheet. No mega panel.
 *   - Reduced motion: panel appears instantly, no slide-in.
 *   - Book Now is a primary CTA, not a sub-link.
 *
 * Data:
 *   - MEGA_NAV array in src/data/site.ts owns the 6 categories and
 *     their sub-links + image panels.
 *
 * Limitations (P0):
 *   - No focus-trap inside the open panel (non-modal by design; the
 *     panel can be Tabbed through naturally). focus-trap-react is a
 *     P1 follow-on per the v6 backlog.
 *   - No arrow-key navigation between sub-links (Tab works).
 *   - No sub-link image preview; only the category-level image.
 */

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Icons } from "./Icon";
import { MEGA_NAV, type MegaNavCategory } from "@/data/site";

const HOVER_DELAY_MS = 200;

export type MegaMenuProps = {
  /** Show the "Live" pulse badge. */
  showLiveBadge?: boolean;
  /** Optional aria-label override for the primary nav. */
  ariaLabel?: string;
};

export function MegaMenu({
  showLiveBadge = true,
  ariaLabel = "Primary",
}: MegaMenuProps) {
  const pathname = usePathname();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpandedCategory, setMobileExpandedCategory] = useState<
    number | null
  >(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelIdBase = useId();

  // Clear close timer on unmount.
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  // Click outside closes the open panel.
  useEffect(() => {
    if (openIndex === null) return;
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openIndex]);

  // Escape closes the open panel.
  useEffect(() => {
    if (openIndex === null && !mobileOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenIndex(null);
        setMobileOpen(false);
        setMobileExpandedCategory(null);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [openIndex, mobileOpen]);

  // Lock scroll while mobile sheet is open.
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const scheduleClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setOpenIndex(null), HOVER_DELAY_MS);
  };

  const cancelClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openPanel = (i: number) => {
    cancelClose();
    setOpenIndex(i);
  };

  return (
    <header
      className="sticky top-0 z-40 bg-paper-50/85 backdrop-blur supports-[backdrop-filter]:bg-paper-50/70 border-b border-paper-200"
      ref={containerRef}
    >
      <div className="container-page">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean-500 rounded-md"
            aria-label="MyNoosaHeads home"
            onClick={() => setOpenIndex(null)}
          >
            <Logo mark="2" />
          </Link>

          <nav
            aria-label={ariaLabel}
            className="hidden md:flex items-center gap-1"
          >
            {MEGA_NAV.map((cat, i) => {
              if (cat.kind === "cta") {
                return (
                  <Link
                    key={cat.label}
                    href={cat.href}
                    className="ml-2 btn-primary btn-sm"
                    aria-label={cat.label}
                  >
                    {cat.label}
                  </Link>
                );
              }
              const isOpen = openIndex === i;
              const panelId = `${panelIdBase}-panel-${i}`;
              return (
                <div
                  key={cat.label}
                  className="relative"
                  onMouseEnter={() => openPanel(i)}
                  onMouseLeave={scheduleClose}
                  onFocus={() => openPanel(i)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                      scheduleClose();
                    }
                  }}
                >
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className={[
                      "rounded-md px-3 py-2 text-body-sm transition flex items-center gap-1.5",
                      isOpen || isCategoryActive(cat, pathname)
                        ? "text-eucalyptus-700 font-semibold"
                        : "text-ink-700 hover:bg-paper-100 hover:text-ink-900",
                    ].join(" ")}
                  >
                    {cat.label}
                    <Icons.ChevronRight
                      size={14}
                      className={
                        isOpen
                          ? "rotate-90 transition-transform duration-base"
                          : "transition-transform duration-base"
                      }
                    />
                  </button>
                  {isOpen ? (
                    <MegaPanel
                      category={cat}
                      panelId={panelId}
                      onMouseEnter={cancelClose}
                      onMouseLeave={scheduleClose}
                    />
                  ) : null}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {showLiveBadge ? (
              <span className="chip-rainforest hidden sm:inline-flex">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-rainforest-500"
                  aria-hidden="true"
                />
                Live
              </span>
            ) : null}
            <button
              type="button"
              className="btn-ghost btn-sm hidden sm:inline-flex"
              aria-label="Search (coming soon)"
              title="Search is coming soon"
            >
              <Icons.Search size={16} />
              <span className="sr-only">Search</span>
            </button>
            <button
              type="button"
              className="btn-ghost btn-sm md:hidden"
              aria-expanded={mobileOpen}
              aria-controls={`${panelIdBase}-mobile`}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <Icons.Close size={18} /> : <Icons.Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        id={`${panelIdBase}-mobile`}
        hidden={!mobileOpen}
        className="md:hidden border-t border-paper-200 bg-paper-50 max-h-[calc(100vh-4rem)] overflow-y-auto"
      >
        <nav aria-label="Mobile primary" className="container-page py-3">
          <ul className="flex flex-col">
            {MEGA_NAV.map((cat, i) => {
              if (cat.kind === "cta") {
                return (
                  <li key={cat.label} className="pt-3">
                    <Link
                      href={cat.href}
                      onClick={() => setMobileOpen(false)}
                      className="btn-primary btn-md w-full"
                    >
                      {cat.label}
                    </Link>
                  </li>
                );
              }
              const isExpanded = mobileExpandedCategory === i;
              return (
                <li
                  key={cat.label}
                  className="border-b border-paper-200 last:border-b-0"
                >
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    onClick={() =>
                      setMobileExpandedCategory(isExpanded ? null : i)
                    }
                    className="flex w-full items-center justify-between py-3 text-body-sm font-medium text-ink-800"
                  >
                    {cat.label}
                    <Icons.ChevronRight
                      size={16}
                      className={
                        isExpanded
                          ? "rotate-90 transition-transform duration-base"
                          : "transition-transform duration-base"
                      }
                    />
                  </button>
                  {isExpanded ? (
                    <ul className="pb-3 pl-2 space-y-1">
                      {cat.sub.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="block py-2 text-body-sm text-ink-700 hover:text-eucalyptus-700"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function isCategoryActive(cat: MegaNavCategory, pathname: string | null) {
  if (!pathname || cat.kind !== "category") return false;
  if (pathname === cat.href) return true;
  if (pathname.startsWith(cat.href + "/")) return true;
  for (const item of cat.sub) {
    if (item.href === pathname) return true;
  }
  return false;
}

type MegaPanelProps = {
  category: MegaNavCategory;
  panelId: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

function MegaPanel({ category, panelId, onMouseEnter, onMouseLeave }: MegaPanelProps) {
  if (category.kind !== "category") return null;
  return (
    <div
      id={panelId}
      role="region"
      aria-label={`${category.label} submenu`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute left-1/2 top-full -translate-x-1/2 pt-2 z-50"
    >
      <div className="mega-panel w-[min(96vw,1100px)] p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="eyebrow text-eucalyptus-800">{category.label}</p>
            <ul className="mt-3 space-y-1">
              {category.sub.slice(0, Math.ceil(category.sub.length / 2)).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-md px-2 py-1.5 text-body-sm text-ink-800 hover:bg-paper-100 hover:text-eucalyptus-800"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-eucalyptus-800">&nbsp;</p>
            <ul className="mt-3 space-y-1">
              {category.sub.slice(Math.ceil(category.sub.length / 2)).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-md px-2 py-1.5 text-body-sm text-ink-800 hover:bg-paper-100 hover:text-eucalyptus-800"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden md:block">
            <p className="eyebrow text-eucalyptus-800">Featured</p>
            <Link
              href={category.featured.href}
              className="mt-3 block group"
            >
              <div className="hover-scale-img aspect-video overflow-hidden rounded-lg bg-paper-100">
                {category.featured.svg ? (
                  <div className="h-full w-full">{category.featured.svg}</div>
                ) : category.featured.image ? (
                  <img
                    src={category.featured.image}
                    alt={category.featured.alt ?? category.featured.label}
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>
              <p className="mt-2 text-body-sm font-medium text-ink-900 group-hover:text-eucalyptus-800">
                {category.featured.label}
              </p>
            </Link>
          </div>
          <div>
            <p className="eyebrow text-eucalyptus-800">From the editors</p>
            <blockquote className="mt-3 border-l-2 border-eucalyptus-300 pl-3 text-body-sm italic text-ink-800">
              {category.editorial}
            </blockquote>
            <Link
              href={category.featured.href}
              className="mt-4 inline-block link text-ocean-700 text-body-sm font-medium hover-underline"
            >
              {category.featured.ctaLabel ?? "Explore →"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
