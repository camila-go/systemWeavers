"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { DEFAULT_LOCALE, type Locale } from "./config";

export type { Locale };

const STORAGE_KEY = "sw-locale";

type LocaleContextValue = {
  locale: Locale;
};

/** Non-null default so /_not-found prerender never throws when provider is missing. */
const LocaleContext = createContext<LocaleContextValue>({ locale: DEFAULT_LOCALE });

/**
 * Persist an explicit language choice. Only the language toggle calls this —
 * merely visiting a shared `/es` link shouldn't silently rewrite someone's
 * preference, and writing on render would race `PreferredLocaleRedirect`.
 */
export function rememberLocale(locale: Locale) {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* ignore storage errors */
  }
}

/**
 * The route is the source of truth for locale — `/es/*` renders Spanish, every
 * other path renders English — so this provider takes `locale` as a prop from
 * the layout rather than holding state.
 */
export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const value = useMemo(() => ({ locale }), [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}

export { STORAGE_KEY };
