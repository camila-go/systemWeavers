"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useContent, useLocale, type Locale } from "@/lib/i18n";
import { localePath, stripLocale } from "@/lib/i18n/config";
import { rememberLocale } from "@/lib/i18n/locale";
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

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Locale lives in the URL, so switching language is navigation, not state:
 * each option links to the current page's counterpart (`/about` ↔ `/es/about`),
 * which keeps the reader in place and gives crawlers a real link to follow.
 */
function LanguageToggle() {
  const { locale } = useLocale();
  const pathname = usePathname();
  const t = useContent();
  const basePath = stripLocale(pathname);

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
      <Link
        href={localePath("en", basePath)}
        className={optionClass("en")}
        hrefLang="en"
        aria-label="English"
        aria-current={locale === "en" ? "true" : undefined}
        onClick={() => rememberLocale("en")}
      >
        EN
      </Link>
      <span className="text-[var(--color-text-muted)]" aria-hidden>
        ·
      </span>
      <Link
        href={localePath("es", basePath)}
        className={optionClass("es")}
        hrefLang="es"
        aria-label="Español"
        aria-current={locale === "es" ? "true" : undefined}
        onClick={() => rememberLocale("es")}
      >
        ES
      </Link>
    </div>
  );
}

/**
 * Brand lockup, linked home. The artwork already contains the wordmark and
 * both taglines, so no text accompanies it — `alt` carries the name and names
 * the link for assistive tech.
 */
function LogoLink({ large = false }: { large?: boolean }) {
  const { locale } = useLocale();
  const t = useContent();

  return (
    <Link
      href={localePath(locale, "/")}
      className="min-w-0 shrink transition-opacity duration-200 hover:opacity-80"
    >
      <Image
        src="/images/logo-color.png"
        alt={t.nav.homeLink}
        width={900}
        height={287}
        priority
        // Displays ~115-180px wide; without this Next would ship the 1920px
        // variant for a logo that never renders larger than a thumbnail.
        sizes="180px"
        className={`w-auto ${large ? "h-12 xl:h-14" : "h-9"}`}
      />
    </Link>
  );
}

function PrimaryNavLinks({ aboutActive }: { aboutActive: boolean }) {
  const { locale } = useLocale();
  const t = useContent();

  return (
    <>
      <Link
        href={localePath(locale, "/#what-we-do")}
        className="nav-link text-base font-bold text-[var(--color-text-primary)]"
      >
        {t.nav.whatWeDo}
      </Link>
      <Link
        href={localePath(locale, "/about")}
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
  const { locale } = useLocale();
  const t = useContent();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // Compare against the locale-independent route so /es/about is "about" too.
  const basePath = stripLocale(pathname);
  const aboutActive = basePath.startsWith("/about");
  const homeActive = basePath === "/";

  // Close on navigation, so the panel never stays open over the new page.
  // Adjusted during render rather than in an effect — React's documented
  // pattern for state that derives from a changing value, and it avoids the
  // cascading re-render that setState-in-an-effect causes. Covers routes the
  // menu's own links don't trigger, e.g. browser back/forward.
  const [menuPathname, setMenuPathname] = useState(pathname);
  if (menuPathname !== pathname) {
    setMenuPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the menu — expected of any overlay, and the only way out for
  // keyboard users who opened it without reaching for the toggle again.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const mobileLinkClass = (active: boolean) =>
    `nav-link text-base text-[var(--color-text-primary)] ${
      active ? "nav-link-active font-bold" : "font-medium"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm transition-shadow duration-300 ${
        menuOpen
          ? "shadow-[0_12px_28px_rgba(40,62,107,0.18)]"
          : scrolled
            ? "header-scrolled"
            : ""
      }`}
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 py-4 md:px-8 md:py-5 xl:px-16">
        <div className="relative z-10 md:hidden">
          <div className="flex items-center justify-between gap-2">
            <LogoLink />
            <LanguageToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              className={`inline-flex size-11 shrink-0 touch-manipulation items-center justify-center rounded-md transition-colors duration-200 hover:bg-[var(--green-50)] active:scale-95 ${
                menuOpen ? "bg-[var(--green-50)]" : ""
              }`}
            >
              {menuOpen ? (
                <CloseIcon className="size-7 text-[var(--color-text-primary)]" />
              ) : (
                <MenuIcon className="size-7 text-[var(--color-text-primary)]" />
              )}
            </button>
          </div>

          {menuOpen ? (
            <nav
              id="mobile-nav"
              className="mt-4 flex flex-col gap-1 border-t border-[var(--color-border-default)] pt-2"
              aria-label={t.nav.mobileNavLabel}
            >
              <Link
                href={localePath(locale, "/")}
                onClick={closeMenu}
                className={`${mobileLinkClass(homeActive)} py-2.5`}
              >
                {t.nav.home}
              </Link>
              <Link
                href={localePath(locale, "/about")}
                onClick={closeMenu}
                className={`${mobileLinkClass(aboutActive)} py-2.5`}
              >
                {t.nav.about}
              </Link>
              <Button href="#contact" className="mt-4 w-full" onClick={closeMenu}>
                {t.nav.contactUs}
              </Button>
            </nav>
          ) : null}
        </div>

        <div className="hidden items-center justify-between gap-4 md:flex">
          <LogoLink large />
          <div className="flex items-center gap-7 lg:gap-9">
            <nav className="flex items-center gap-7 lg:gap-9" aria-label="Primary">
              <PrimaryNavLinks aboutActive={aboutActive} />
            </nav>
            <LanguageToggle />
            <Button href="#contact">{t.nav.contactUs}</Button>
          </div>
        </div>
      </div>

      {/* Dims the page beneath the open menu. `top-full` anchors it to the
          bottom of the (expanded) header, so the header itself stays crisp
          while everything below recedes. Tapping it closes the menu. */}
      {menuOpen ? (
        <div
          className="absolute inset-x-0 top-full h-screen bg-[rgba(14,63,68,0.35)] md:hidden"
          onClick={closeMenu}
          aria-hidden
        />
      ) : null}

      <Selvage className="hidden md:flex" />
    </header>
  );
}
