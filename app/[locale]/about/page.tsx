import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutPage } from "@/components/about/about-page";
import { isLocale, localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import {
  SITE_URL,
  alternatesFor,
  breadcrumbSchema,
  organizationSchema,
  servicesSchema,
} from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return {
    title: t.meta.aboutTitle,
    description: t.meta.aboutDescription,
    alternates: alternatesFor(locale, "/about"),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  // Organization is repeated here rather than only on the home page so this
  // page stands on its own as an entity source — the services reference it by
  // @id, and a crawler landing here shouldn't have to resolve that elsewhere.
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(locale),
      {
        "@type": "AboutPage",
        "@id": `${SITE_URL}${localePath(locale, "/about")}`,
        name: t.about.title,
        description: t.meta.aboutDescription,
        inLanguage: locale,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        mainEntity: { "@id": `${SITE_URL}${localePath(locale, "/about")}#services` },
      },
      servicesSchema(locale),
      breadcrumbSchema(locale, t.about.title, "/about"),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Escape `<` so a stray "</script>" in copy can't close the tag early.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <AboutPage />
    </>
  );
}
