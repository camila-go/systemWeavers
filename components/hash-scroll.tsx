"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll to hash targets after client navigations (e.g. /about#contact), and
 * expand the target if it is collapsed — a link to `/about#grants-management`
 * should reveal that service, not drop the reader on a closed row.
 */
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash || hash.length < 2) return;
      const el = document.getElementById(hash.slice(1));
      if (!el) return;

      // Open before measuring: expanding changes the target's position, so
      // scrolling first would land in the wrong place. `closest` covers both
      // the <details> itself and anything nested inside one.
      const details = el.closest("details");
      if (details && !details.open) details.open = true;

      // Wait a tick for layout/sticky header to settle.
      window.requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, [pathname]);

  return null;
}
