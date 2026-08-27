import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALES } from "@/lib/i18n/config";

const PREFIXED = LOCALES.filter((locale) => locale !== DEFAULT_LOCALE);

/**
 * Routes live under `app/[locale]/`, but English is published unprefixed so the
 * URLs already indexed for this site keep working. That means:
 *
 *   /            → rewrite to /en            (URL stays "/")
 *   /about       → rewrite to /en/about      (URL stays "/about")
 *   /es, /es/... → pass through
 *   /en, /en/... → redirect to the unprefixed URL, so no page is reachable at
 *                  two addresses and Google never sees duplicates
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === `/${DEFAULT_LOCALE}` || pathname.startsWith(`/${DEFAULT_LOCALE}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (PREFIXED.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip API routes, Next internals, and anything with a file extension
  // (favicon.ico, icon.svg, /images/*) — those are served as-is.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
