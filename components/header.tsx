"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Selvage } from "@/components/selvage";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const aboutActive = pathname.startsWith("/about");

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-3 px-5 py-4 md:gap-4 md:px-8 md:py-5 xl:px-16">
        <Link href="/" className="min-w-0 shrink" onClick={() => setOpen(false)}>
          <span className="font-[family-name:var(--font-fraunces)] text-xl font-semibold text-[var(--color-text-brand)] md:text-2xl">
            {site.name}
          </span>
          <span className="mt-0.5 hidden text-[10px] font-medium tracking-[1.8px] text-[var(--color-text-primary)] md:block md:text-[11px]">
            {site.tagline}
          </span>
        </Link>

        <div className="flex items-center gap-2.5 md:gap-4">
          <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
            <Link
              href="/#what-we-do"
              className="text-base font-bold text-[var(--color-text-primary)]"
            >
              What we do
            </Link>
            <Link
              href="/about"
              className={`text-base text-[var(--color-text-primary)] ${
                aboutActive ? "font-bold underline underline-offset-4" : "font-medium"
              }`}
            >
              About
            </Link>
          </nav>

          <div
            className="flex items-center gap-[5px] rounded-full border border-[var(--color-border-default)] px-2.5 py-[5px] text-sm"
            aria-label="Language"
          >
            <span className="font-semibold leading-[18px] text-[var(--color-text-primary)]">
              EN
            </span>
            <span className="text-[var(--color-text-muted)]" aria-hidden>
              ·
            </span>
            <span
              className="leading-[22px] text-[var(--color-text-muted)]"
              title="Spanish coming soon"
            >
              ES
            </span>
          </div>

          <Button href="#contact" className="hidden lg:inline-flex">
            Contact Us
          </Button>

          <button
            type="button"
            className="inline-flex size-7 items-center justify-center md:size-11 md:rounded-[var(--radius-md)] md:border md:border-[var(--color-border-default)] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <Menu className="size-7 text-[var(--color-text-primary)] md:size-5" aria-hidden />
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-[var(--color-border-default)] px-5 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-4">
            <Link href="/#what-we-do" onClick={() => setOpen(false)} className="font-bold">
              What we do
            </Link>
            <Link href="/about" onClick={() => setOpen(false)} className="font-medium">
              About
            </Link>
            <Button href="#contact" className="w-full" onClick={() => setOpen(false)}>
              Contact Us
            </Button>
          </div>
        </nav>
      ) : null}

      {/* Selvage sits under the sticky header from tablet up; on mobile it follows the hero */}
      <Selvage className="hidden md:flex" />
    </header>
  );
}
