import type { Metadata } from "next";
import { LOCALES, localePath, type Locale } from "./i18n/config";
import { getDictionary } from "./i18n/dictionaries";

/** Canonical origin. Single source for metadata, sitemap, robots and JSON-LD. */
export const SITE_URL = "https://www.system-weavers.com";

/**
 * Organization + WebSite structured data — the "entity clarity" layer that
 * tells search and AI engines what System Weavers is, in one machine-readable
 * place, rather than leaving them to infer it from prose.
 *
 * Deliberately omits `telephone` and a street `address`: the values currently
 * in the dictionary are placeholders (a reserved 555 number, and a Washington
 * D.C. address that contradicts the footer's "Based in Chicago"). Publishing
 * unverified contact details as structured data is worse than publishing none
 * — search engines treat them as authoritative. Add them here once confirmed.
 */
export function organizationSchema(locale: Locale) {
  const t = getDictionary(locale);

  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "System Weavers Collaborative Consulting",
    alternateName: t.site.name,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/logo-color.png`,
      width: 900,
      height: 287,
    },
    image: `${SITE_URL}/images/logo-color.png`,
    description: t.meta.description,
    email: t.site.email,
    // Locality only — asserted by the footer, unlike the placeholder street address.
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chicago",
      addressRegion: "IL",
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Place", name: "The Caribbean" },
      { "@type": "Place", name: "Latin America" },
    ],
    knowsLanguage: ["en", "es"],
    founder: t.founders.map((person) => ({
      "@type": "Person",
      name: person.name,
      jobTitle: person.role,
    })),
  };
}

/**
 * The six services as first-class `Service` entities, each tied back to the
 * organization. Without this the services exist only as prose inside collapsed
 * accordions, which search and answer engines have little reason to surface
 * for a query like "grants management consulting".
 */
export function servicesSchema(locale: Locale) {
  const t = getDictionary(locale);
  const aboutUrl = `${SITE_URL}${localePath(locale, "/about")}`;

  return {
    "@type": "ItemList",
    "@id": `${aboutUrl}#services`,
    name: t.about.servicesTitle,
    inLanguage: locale,
    itemListElement: t.services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        "@id": `${aboutUrl}#service-${index + 1}`,
        name: service.title,
        // The bullets carry the specifics an answer engine can actually cite.
        // An intro like "We…" is a lead-in to the list, so its trailing
        // ellipsis becomes a colon rather than running into the first bullet.
        description: [
          service.intro?.replace(/\s*(?:…|\.\.\.)\s*$/, ":"),
          service.items.join("; "),
        ]
          .filter(Boolean)
          .join(" "),
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: [
          { "@type": "Country", name: "United States" },
          { "@type": "Place", name: "The Caribbean" },
          { "@type": "Place", name: "Latin America" },
        ],
      },
    })),
  };
}

/**
 * Breadcrumb trail so a page is indexed in context, not orphaned. Home is
 * prepended for you; pass the rest of the trail in order, so a nested page can
 * declare its parent (`/about` → `/about/values`) rather than appearing to
 * hang directly off the root.
 */
export function breadcrumbSchema(
  locale: Locale,
  trail: Array<{ name: string; path: string }>,
) {
  const crumbs = [
    { name: getDictionary(locale).nav.home, path: "/" },
    ...trail,
  ];

  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${localePath(locale, crumb.path)}`,
    })),
  };
}

export function websiteSchema(locale: Locale) {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "System Weavers Collaborative Consulting",
    inLanguage: locale,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

/**
 * Canonical + hreflang for one route.
 *
 * `languages` tells Google the locale variants are translations of each other
 * rather than duplicate content, and `x-default` points at English as the
 * fallback for visitors whose language we don't publish.
 */
export function alternatesFor(locale: Locale, path: string): Metadata["alternates"] {
  const languages = Object.fromEntries(
    LOCALES.map((code) => [code, localePath(code, path)]),
  );

  return {
    canonical: localePath(locale, path),
    languages: {
      ...languages,
      "x-default": localePath("en", path),
    },
  };
}
