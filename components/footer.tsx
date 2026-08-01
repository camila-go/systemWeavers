"use client";

import Link from "next/link";
import { useContent } from "@/lib/i18n";

export function Footer() {
  const t = useContent();

  return (
    <footer className="bg-[var(--color-bg-footer)] text-white">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 px-6 py-10 xl:gap-12 xl:px-16 xl:pb-10 xl:pt-16">
        <div className="flex flex-col items-center gap-3 text-center xl:hidden">
          <p className="font-[family-name:var(--font-fraunces)] text-xl font-semibold text-[var(--color-text-on-brand)] md:text-[22px]">
            {t.site.name}
          </p>
          <div className="text-[15px] leading-6 text-[var(--color-text-on-brand-soft)]">
            <p>{t.footer.collaborativeConsulting}</p>
            <p>{t.footer.locationLine}</p>
          </div>
        </div>

        <div className="hidden items-start justify-between gap-10 overflow-hidden xl:flex">
          <div className="flex flex-col gap-3">
            <p className="font-[family-name:var(--font-fraunces)] text-[28px] font-semibold text-[var(--color-text-on-brand)]">
              {t.site.name}
            </p>
            <div className="text-[15px] leading-6 text-[var(--color-text-on-brand-soft)]">
              <p>{t.footer.collaborativeConsulting}</p>
              <p>{t.footer.locationLine}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[13px] font-semibold leading-4 tracking-[1.5px] text-[var(--color-text-accent-on-dark)]">
              {t.footer.explore}
            </p>
            <Link
              href="/#what-we-do"
              className="link-hover text-[15px] leading-6 text-[var(--color-text-on-brand-soft)] hover:underline"
            >
              {t.nav.whatWeDo}
            </Link>
            <Link
              href="/about"
              className="link-hover text-[15px] font-medium leading-6 text-[var(--color-text-on-brand-soft)] hover:underline"
            >
              {t.nav.about}
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[13px] font-semibold leading-4 tracking-[1.5px] text-[var(--color-text-accent-on-dark)]">
              {t.footer.connect}
            </p>
            <Link
              href="#contact"
              className="link-hover text-[15px] font-medium leading-6 text-[var(--color-text-on-brand-soft)] hover:underline"
            >
              {t.footer.contact}
            </Link>
          </div>
        </div>

        <div className="hidden overflow-hidden text-[13px] leading-5 text-[var(--color-text-on-brand-soft)] xl:block">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
