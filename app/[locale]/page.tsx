import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/home/home-page";
import { isLocale, localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import {
  SITE_URL,
  alternatesFor,
  organizationSchema,
  websiteSchema,
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
    title: t.meta.title,
    description: t.meta.description,
    alternates: alternatesFor(locale, "/"),
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

  // One @graph so the three entities cross-reference each other by @id rather
  // than sitting as unrelated islands — that's what lets a search or AI engine
  // resolve "System Weavers" to a single organization.
  //
  // FAQPage is built from the same dictionary entries the visible FAQ renders
  // from (components/home/faq.tsx) so the two cannot drift, and each locale
  // emits its own language: Google requires the markup to match the copy
  // actually served at that URL.
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(locale),
      websiteSchema(locale),
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}${localePath(locale, "/")}#faq`,
        inLanguage: locale,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: t.faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
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
      <HomePage />
    </>
  );
}
