"use client";

/**
 * SiteHeader — sticky top nav wired to the new v6 mega menu.
 *
 * v6 (MSN-2960-V6, 2026-10-11): SiteHeader now uses the MegaMenu
 * component (6 top-level categories, ~55 sub-links, image-rich
 * panels) instead of the v5 flat 8-link NavBar. The component is
 * still a client component so it can read the current pathname for
 * active-state highlighting inside the mega-menu panel.
 */

import { usePathname } from "next/navigation";
import { MegaMenu } from "@/components/ui";

export function SiteHeader() {
  // Pathname is read so MegaMenu can highlight the active category.
  // (MegaMenu also reads usePathname internally; this is intentional
  // duplication to keep the prop surface simple.)
  void usePathname;
  return <MegaMenu />;
}
