import Link from "next/link";
import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-[var(--color-bg-footer)] text-white">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 px-6 py-10 xl:gap-12 xl:px-16 xl:pb-10 xl:pt-16">
        {/* Mobile / tablet: centered brand only (Figma 390 + tablet) */}
        <div className="flex flex-col items-center gap-3 text-center xl:hidden">
          <p className="font-[family-name:var(--font-fraunces)] text-xl font-semibold text-[var(--color-text-on-brand)] md:text-[22px]">
            {site.name}
          </p>
          <div className="text-[15px] leading-6 text-[var(--color-text-on-brand-soft)]">
            <p>Collaborative Consulting</p>
            <p>
              Based in Chicago | Partnering with clients in the United States, the
              Caribbean, and Latin America
            </p>
          </div>
        </div>

        {/* Desktop: brand + Explore + Connect (Home Figma — no Our Team page) */}
        <div className="hidden items-start justify-between gap-10 overflow-hidden xl:flex">
          <div className="flex flex-col gap-3">
            <p className="font-[family-name:var(--font-fraunces)] text-[28px] font-semibold text-[var(--color-text-on-brand)]">
              {site.name}
            </p>
            <div className="text-[15px] leading-6 text-[var(--color-text-on-brand-soft)]">
              <p>Collaborative Consulting</p>
              <p>
                Based in Chicago | Partnering with clients in the United States, the
                Caribbean, and Latin America
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[13px] font-semibold leading-4 tracking-[1.5px] text-[var(--color-text-accent-on-dark)]">
              EXPLORE
            </p>
            <Link
              href="/#what-we-do"
              className="text-[15px] leading-6 text-[var(--color-text-on-brand-soft)] hover:underline"
            >
              What we do
            </Link>
            <Link
              href="/about"
              className="text-[15px] font-medium leading-6 text-[var(--color-text-on-brand-soft)] hover:underline"
            >
              About
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[13px] font-semibold leading-4 tracking-[1.5px] text-[var(--color-text-accent-on-dark)]">
              CONNECT
            </p>
            <Link
              href="#contact"
              className="text-[15px] font-medium leading-6 text-[var(--color-text-on-brand-soft)] hover:underline"
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="hidden overflow-hidden text-[13px] leading-5 text-[var(--color-text-on-brand-soft)] xl:block">
          <p>© 2026 System Weavers Collaborative Consulting, LLC ·</p>
        </div>
      </div>
    </footer>
  );
}
