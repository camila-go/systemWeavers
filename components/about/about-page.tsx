"use client";

import Image from "next/image";
import Link from "next/link";
import { Selvage } from "@/components/selvage";
import { ContactForm } from "@/components/contact-form";
import { Icon } from "@/components/ui/icon";
import { keepSummaryInPlace } from "@/components/ui/accordion-anchor";
import { Reveal } from "@/components/motion/reveal";
import { useContent, useLocale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n/config";

export function AboutPage() {
  const { locale } = useLocale();
  const t = useContent();

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[var(--navy-800)]">
          <Image
            src="/images/about-hero.png"
            alt=""
            fill
            priority
            className="object-cover opacity-[0.12] transition-opacity duration-700"
            sizes="100vw"
          />
        </div>
        <div className="mx-auto flex w-full max-w-[1088px] flex-col items-center gap-5 px-6 py-16 text-center md:gap-6 md:px-10 md:py-24 xl:px-0 xl:py-24">
          <h1 className="hero-enter hero-enter-1 font-[family-name:var(--font-fraunces)] text-[40px] font-bold leading-tight text-white md:text-5xl md:leading-[64px] xl:text-[64px] xl:leading-[72px]">
            {t.about.title}
          </h1>
          <p className="hero-enter hero-enter-2 max-w-3xl text-base leading-7 text-[var(--navy-100)] md:text-lg md:leading-7">
            {t.about.heroBody}
          </p>
        </div>
        <Selvage />
      </section>

      <section
        id="our-services"
        className="scroll-mt-24 bg-[var(--color-bg-page)] px-6 py-12 md:px-10 md:py-16 xl:px-20 xl:py-28 2xl:px-[240px]"
      >
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6">
          <div className="flex w-full flex-col">
            {t.services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 60}>
                {/* `name` makes the group exclusive natively — opening one
                    closes the last, no JavaScript. Browsers without support
                    simply allow several open, which is the old behaviour.
                    The id is the link target for the matching home card;
                    scroll-mt-24 keeps it clear of the sticky header. */}
                <details
                  id={service.slug}
                  name="services"
                  className="service-accordion group flex scroll-mt-24 flex-col gap-3 border-b border-[var(--color-border-default)]"
                >
                  {/* Padding on the summary, not the wrapper — the row you tap
                      should be the row you see. */}
                  <summary
                    onClick={keepSummaryInPlace}
                    className="flex w-full cursor-pointer list-none items-center gap-4 py-6 text-left [&::-webkit-details-marker]:hidden"
                  >
                    {/* A real heading, not a styled span: these are the terms
                        people actually search for, and as a <span> they were
                        absent from the page's heading outline entirely. */}
                    <h3 className="accordion-title text-rise flex-1 text-[22px] font-semibold leading-[30px] md:font-[family-name:var(--font-fraunces)]">
                      {service.title}
                    </h3>
                    <Icon
                      name="Plus"
                      className="accordion-icon size-5 shrink-0 text-[var(--teal-500)] group-open:hidden"
                    />
                    <Icon
                      name="Minus"
                      className="accordion-icon accordion-icon-minus hidden size-5 shrink-0 text-[var(--teal-500)] group-open:block"
                    />
                  </summary>

                  <div className="accordion-panel pb-6 text-base leading-[26px] text-[var(--color-text-muted)]">
                    {service.intro ? <p className="mb-2">{service.intro}</p> : null}
                    <ul className="list-disc space-y-0 pl-6">
                      {service.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>

          {/* The values page has no other route in — it is not in the header —
              so this is the link that makes it reachable for readers and
              crawlers alike. */}
          <Reveal delay={120} className="pt-4">
            <Link
              href={localePath(locale, "/about/values")}
              className="group flex w-full flex-col gap-2 rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-bg-hero)] p-6 transition-colors hover:border-[var(--color-border-brand)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)] md:p-8"
            >
              <span className="flex items-center gap-2 font-[family-name:var(--font-fraunces)] text-[24px] font-semibold leading-8 text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-text-brand)] md:text-[28px] md:leading-9">
                {t.about.valuesLinkTitle}
                <Icon
                  name="ArrowUpRight"
                  className="size-6 shrink-0 text-[var(--teal-500)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
              <span className="text-pretty text-base leading-[26px] text-[var(--color-text-muted)]">
                {t.about.valuesLinkBody}
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <ContactForm />
    </>
  );
}
