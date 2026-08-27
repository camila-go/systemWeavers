"use client";

import type { ReactNode } from "react";
import { LocaleProvider } from "@/lib/i18n/locale";
import type { Locale } from "@/lib/i18n/config";
import { HashScroll } from "@/components/hash-scroll";
import { PreferredLocaleRedirect } from "@/components/preferred-locale-redirect";

export function Providers({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <LocaleProvider locale={locale}>
      <HashScroll />
      <PreferredLocaleRedirect />
      {children}
    </LocaleProvider>
  );
}
