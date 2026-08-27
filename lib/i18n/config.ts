/**
 * Locale identity and URL shape. Deliberately dependency-free (no dictionaries,
 * no "use client") so both server and client code can import it.
 *
 * URL scheme: English is unprefixed (`/`, `/about`) because those URLs are
 * already live and indexed; Spanish is prefixed (`/es`, `/es/about`).
 */
export const LOCALES = ["en", "es"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: unknown): value is Locale {
  return LOCALES.includes(value as Locale);
}

/**
 * Build the URL for `path` in `locale`. `path` is the locale-independent route
 * ("/", "/about", "/about#our-services") and any hash is preserved.
 */
export function localePath(locale: Locale, path: string): string {
  const [rawPath, hash] = path.split("#");
  const suffix = hash ? `#${hash}` : "";
  const base = rawPath === "/" ? "" : rawPath;

  return locale === DEFAULT_LOCALE
    ? `${base || "/"}${suffix}`
    : `/${locale}${base}${suffix}`;
}

/**
 * Inverse of `localePath`: the locale-independent route for a pathname.
 * `/es/about` → `/about`, `/es` → `/`, `/about` → `/about`.
 */
export function stripLocale(pathname: string): string {
  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) continue;
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1);
  }

  return pathname;
}
