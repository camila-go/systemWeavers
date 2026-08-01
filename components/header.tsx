"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useContent, useLocale, type Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Selvage } from "@/components/selvage";

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M4 5h16M4 12h16M4 19h16" strokeLinecap="round" />
    </svg>
  );
}

function LanguageToggle() {
  const { locale, setLocale } = useLocale();
  const t = useContent();

  const optionClass = (code: Locale) =>
    `rounded-full px-1 py-0.5 transition-colors duration-200 ${
      locale === code
        ? "font-semibold leading-[18px] text-[var(--color-text-primary)]"
        : "leading-[22px] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
    }`;

  return (
    <div
      className="flex shrink-0 items-center gap-[5px] rounded-full border border-[var(--color-border-default)] px-2.5 py-[5px] text-sm transition-colors duration-200 hover:border-[var(--teal-500)]"
      role="group"
      aria-label={t.nav.language}
    >
      <button
        type="button"
        className={optionClass("en")}
        aria-pressed={locale === "en"}
        aria-label="English"
        onClick={() => setLocale("en")}
      >
        EN
      </button>
      <span className="text-[var(--color-text-muted)]" aria-hidden>
        ·
      </span>
      <button
        type="button"
        className={optionClass("es")}
        aria-pressed={locale === "es"}
        aria-label="Español"
        onClick={() => setLocale("es")}
      >
        ES
      </button>
    </div>
  );
}

function LogoLink({ showTagline = false }: { showTagline?: boolean }) {
  const t = useContent();

  return (
    <Link
      href="/"
      className="min-w-0 shrink transition-opacity duration-200 hover:opacity-80"
    >
      <span className="whitespace-nowrap font-[family-name:var(--font-fraunces)] text-xl font-semibold text-[var(--color-text-brand)] md:text-2xl">
        {t.site.name}
      </span>
      {showTagline ? (
        <span className="mt-0.5 block text-[10px] font-medium tracking-[1.8px] text-[var(--color-text-primary)] md:text-[11px]">
          {t.site.tagline}
        </span>
      ) : null}
    </Link>
  );
}

function PrimaryNavLinks({ aboutActive }: { aboutActive: boolean }) {
  const t = useContent();

  return (
    <>
      <Link
        href="/#what-we-do"
        className="nav-link text-base font-bold text-[var(--color-text-primary)]"
      >
        {t.nav.whatWeDo}
      </Link>
      <Link
        href="/about"
        className={`nav-link text-base text-[var(--color-text-primary)] ${
          aboutActive ? "nav-link-active font-bold" : "font-medium"
        }`}
      >
        {t.nav.about}
      </Link>
    </>
  );
}

export function Header() {
  const pathname = usePathname();
  const t = useContent();
  const menuToggleRef = useRef<HTMLInputElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const aboutActive = pathname.startsWith("/about");
  const homeActive = pathname === "/";

  useEffect(() => {
    if (menuToggleRef.current) {
      menuToggleRef.current.checked = false;
    }
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => {
    if (menuToggleRef.current) {
      menuToggleRef.current.checked = false;
    }
  };

  const mobileLinkClass = (active: boolean) =>
    `nav-link text-base text-[var(--color-text-primary)] ${
      active ? "nav-link-active font-bold" : "font-medium"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm transition-shadow duration-300 ${
        scrolled ? "header-scrolled" : ""
      }`}
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 py-4 md:px-8 md:py-5 xl:px-16">
        <div className="relative z-10 md:hidden">
          <input
            ref={menuToggleRef}
            id="mobile-nav-toggle"
            type="checkbox"
            className="peer sr-only"
          />

          <div className="flex items-center justify-between gap-2">
            <LogoLink />
            <LanguageToggle />
            <label
              htmlFor="mobile-nav-toggle"
              className="inline-flex size-11 shrink-0 cursor-pointer touch-manipulation items-center justify-center rounded-md transition-colors duration-200 hover:bg-[var(--green-50)] active:scale-95"
            >
              <span className="sr-only">Toggle menu</span>
              <MenuIcon className="size-7 text-[var(--color-text-primary)]" />
            </label>
          </div>

          <nav
            id="mobile-nav"
            className="mt-4 hidden flex-col gap-4 border-t border-[var(--color-border-default)] pt-4 peer-checked:flex"
            aria-label="Mobile"
          >
            <Link href="/" onClick={closeMenu} className={mobileLinkClass(homeActive)}>
              {t.nav.home}
            </Link>
            <Link
              href="/about"
              onClick={closeMenu}
              className={mobileLinkClass(aboutActive)}
            >
              {t.nav.about}
            </Link>
            <Button href="#contact" className="w-full" onClick={closeMenu}>
              {t.nav.contactUs}
            </Button>
          </nav>
        </div>

        <div className="hidden items-center justify-between gap-4 md:flex">
          <LogoLink showTagline />
          <div className="flex items-center gap-7 lg:gap-9">
            <nav className="flex items-center gap-7 lg:gap-9" aria-label="Primary">
              <PrimaryNavLinks aboutActive={aboutActive} />
            </nav>
            <LanguageToggle />
            <Button href="#contact">{t.nav.contactUs}</Button>
          </div>
        </div>
      </div>

      <Selvage className="hidden md:flex" />
    </header>
  );
}
