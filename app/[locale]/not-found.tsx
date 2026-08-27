"use client";

import Link from "next/link";
import { useContent, useLocale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n/config";

export default function NotFound() {
  const { locale } = useLocale();
  const t = useContent();

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-5 px-6 py-24 text-center">
      <p className="text-[13px] font-semibold tracking-[1.5px] text-[var(--color-text-brand)]">
        404
      </p>
      <h1 className="font-[family-name:var(--font-fraunces)] text-[34px] font-semibold leading-9 text-[var(--color-text-primary)] md:text-[40px] md:leading-[50px]">
        {t.notFound.title}
      </h1>
      <p className="max-w-md text-base leading-[26px] text-[var(--color-text-muted)]">
        {t.notFound.body}
      </p>
      <Link
        href={localePath(locale, "/")}
        className="inline-flex items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-bg-accent)] px-7 py-3.5 text-base font-semibold leading-6 text-[var(--color-text-on-accent)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-95"
      >
        {t.notFound.backHome}
      </Link>
    </section>
  );
}
