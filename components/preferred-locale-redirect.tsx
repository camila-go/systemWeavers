"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DEFAULT_LOCALE, isLocale, localePath, stripLocale } from "@/lib/i18n/config";
import { STORAGE_KEY } from "@/lib/i18n/locale";

/**
 * Before locale lived in the URL, a visitor's language choice persisted across
 * visits via localStorage. Route-based locale would drop that — someone who
 * picked Español and later typed the bare domain would land back on English.
 *
 * This restores it: on a default-locale URL, a stored non-default preference
 * redirects to the same page in that locale. Crawlers have no storage, so they
 * always see English at the English URL.
 *
 * This can safely re-run on navigation because the toggle writes the new
 * preference synchronously on click (`rememberLocale`) before navigating — so
 * by the time this reads storage, an explicit "EN" choice is already recorded
 * and no bounce-back happens. A guard ref would NOT work here: switching locale
 * changes the `[locale]` param on the root layout, which remounts this
 * component and resets any ref.
 */
export function PreferredLocaleRedirect() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Already on a prefixed locale — the URL wins, nothing to restore.
    if (stripLocale(pathname) !== pathname) return;

    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      return; // storage blocked — stay on the requested page
    }

    if (!isLocale(stored) || stored === DEFAULT_LOCALE) return;

    router.replace(localePath(stored, pathname));
  }, [pathname, router]);

  return null;
}
