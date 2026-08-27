import type { MetadataRoute } from "next";
import { LOCALES, localePath } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/seo";

/** Locale-independent routes; each is emitted once per locale. */
const ROUTES = ["/", "/about"] as const;

/**
 * Served at /sitemap.xml — submit this URL to Google Search Console and Bing
 * Webmaster Tools. Each entry declares its locale alternates so the two
 * language versions are indexed as translations rather than duplicates.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.flatMap((route) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}${localePath(locale, route)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: route === "/" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((code) => [code, `${SITE_URL}${localePath(code, route)}`]),
        ),
      },
    })),
  );
}
