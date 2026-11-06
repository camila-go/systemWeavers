import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BrandPage } from "@/components/brand/brand-page";
import { isLocale } from "@/lib/i18n/config";

/**
 * Internal logo library, reachable only by typing the address. It is absent
 * from the header, the footer and `app/sitemap.ts`, disallowed in robots.txt,
 * and marked noindex here as well — the sitemap lists routes by hand, so the
 * only thing keeping this page out of search is these three in agreement.
 *
 * No `alternates`: canonical and hreflang are for pages we want indexed.
 */
export const metadata: Metadata = {
  title: "Logo library · Internal",
  description: "Internal reference for the System Weavers logo files.",
  robots: { index: false, follow: false, nocache: true },
};

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <BrandPage />;
}
