"use client";

import Link from "next/link";
import Image from "next/image";
import { useContent, useLocale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n/config";

/**
 * White brand lockup for the dark footer, linked home. The artwork carries the
 * wordmark and "Collaborative Consulting", so that line is no longer repeated
 * as text beneath it.
 */
function FooterLogo({ large = false }: { large?: boolean }) {
  const { locale } = useLocale();
  const t = useContent();

  return (
    <Link
      href={localePath(locale, "/")}
      className="inline-block transition-opacity duration-200 hover:opacity-80"
    >
      <Image
        src="/images/logo-white.png"
        alt={t.nav.homeLink}
        width={900}
        height={291}
        sizes="250px"
        className={`w-auto ${large ? "h-20" : "h-16"}`}
      />
    </Link>
  );
}

export function Footer() {
  const { locale } = useLocale();
  const t = useContent();

  return (
    <footer className="bg-[var(--color-bg-footer)] text-white">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 px-6 py-10 xl:gap-12 xl:px-16 xl:pb-10 xl:pt-16">
        <div className="flex flex-col items-center gap-4 text-center xl:hidden">
          <FooterLogo />
          <div className="text-[15px] leading-6 text-[var(--color-text-on-brand-soft)]">
            <p>{t.footer.locationLine}</p>
          </div>
        </div>

        <div className="hidden items-start justify-between gap-10 overflow-hidden xl:flex">
          <div className="flex flex-col gap-4">
            <FooterLogo large />
            <div className="text-[15px] leading-6 text-[var(--color-text-on-brand-soft)]">
              <p>{t.footer.locationLine}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[13px] font-semibold leading-4 tracking-[1.5px] text-[var(--color-text-accent-on-dark)]">
              {t.footer.explore}
            </p>
            <Link
              href={localePath(locale, "/#what-we-do")}
              className="link-hover text-[15px] leading-6 text-[var(--color-text-on-brand-soft)] hover:underline"
            >
              {t.nav.whatWeDo}
            </Link>
            <Link
              href={localePath(locale, "/about")}
              className="link-hover text-[15px] font-medium leading-6 text-[var(--color-text-on-brand-soft)] hover:underline"
            >
              {t.nav.about}
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[13px] font-semibold leading-4 tracking-[1.5px] text-[var(--color-text-accent-on-dark)]">
              {t.footer.connect}
            </p>
            <a
              href="#contact"
              className="link-hover text-[15px] font-medium leading-6 text-[var(--color-text-on-brand-soft)] hover:underline"
            >
              {t.footer.contact}
            </a>
          </div>
        </div>

        <div className="hidden overflow-hidden text-[13px] leading-5 text-[var(--color-text-on-brand-soft)] xl:block">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
