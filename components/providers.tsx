"use client";

import type { ReactNode } from "react";
import { LocaleProvider } from "@/lib/i18n/locale";
import { HashScroll } from "@/components/hash-scroll";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider>
      <HashScroll />
      {children}
    </LocaleProvider>
  );
}
