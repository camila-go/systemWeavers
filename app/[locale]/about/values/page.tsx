import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ValuesPage } from "@/components/about/values-page";
import { isLocale, localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import {
  SITE_URL,
  alternatesFor,
  breadcrumbSchema,
  organizationSchema,
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
    title: t.meta.valuesTitle,
    description: t.meta.valuesDescription,
    alternates: alternatesFor(locale, "/about/values"),
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
  const pageUrl = `${SITE_URL}${localePath(locale, "/about/values")}`;

  // The values themselves go in as a DefinedTermSet: they are named concepts
  // with definitions, which is exactly what an answer engine needs to quote
  // one back ("what are System Weavers' values?") rather than paraphrasing
  // the whole page.
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(locale),
      {
        "@type": "AboutPage",
        "@id": pageUrl,
        name: t.values.title,
        description: t.meta.valuesDescription,
        inLanguage: locale,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        mainEntity: { "@id": `${pageUrl}#core-values` },
      },
      {
        "@type": "DefinedTermSet",
        "@id": `${pageUrl}#core-values`,
        name: t.values.coreValuesTitle,
        description: t.values.coreValuesIntro,
        inLanguage: locale,
        hasDefinedTerm: t.values.items.map((value) => ({
          "@type": "DefinedTerm",
          name: value.title,
          description: value.body,
          inDefinedTermSet: { "@id": `${pageUrl}#core-values` },
        })),
      },
      breadcrumbSchema(locale, [
        { name: t.about.title, path: "/about" },
        { name: t.values.title, path: "/about/values" },
      ]),
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
      <ValuesPage />
    </>
  );
}
