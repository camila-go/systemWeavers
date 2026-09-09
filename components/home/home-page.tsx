"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Selvage } from "@/components/selvage";
import { ContactForm } from "@/components/contact-form";
import { GetToKnowUs } from "@/components/home/get-to-know-us";
import { Faq } from "@/components/home/faq";
import { Reveal, RevealText } from "@/components/motion/reveal";
import { useContent, useLocale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n/config";
import type { Tone } from "@/lib/i18n/types";

const toneStyles: Record<Tone, string> = {
  teal: "bg-[var(--teal-100)] text-[var(--teal-500)]",
  navy: "bg-[var(--navy-100)] text-[var(--navy-800)]",
  gold: "bg-[var(--gold-100)] text-[#c4a035]",
  green: "bg-[var(--green-100)] text-[var(--green-700)]",
};

export function HomePage() {
  const { locale } = useLocale();
  const t = useContent();

  return (
    <>
      <section className="bg-[var(--color-bg-hero)] px-6 py-12 text-center md:px-10 md:py-16 lg:px-16 lg:py-20 xl:px-20 xl:py-24">
        <div className="mx-auto flex max-w-[1088px] flex-col items-center gap-5 md:gap-6">
          <p className="hero-enter hero-enter-1 w-full text-[13px] font-semibold leading-4 tracking-[1.5px] text-[var(--color-text-brand)]">
            {t.hero.overline}
          </p>
          <p className="hero-enter hero-enter-2 w-full text-xs font-semibold tracking-[1.8px] text-[var(--color-text-brand)] md:text-sm md:tracking-[2px]">
            {t.hero.subline}
          </p>
          <h1 className="w-full font-[family-name:var(--font-fraunces)] text-[34px] font-semibold italic leading-[42px] text-[var(--color-text-primary)] md:text-5xl md:leading-[64px] xl:text-[64px] xl:leading-[72px]">
            <span className="hero-line">{t.hero.titleLead}</span>
            <span className="hero-line hero-line-2 not-italic font-bold md:font-semibold">
              {t.hero.titleRest}
            </span>
          </h1>
          <p className="hero-enter hero-enter-4 w-full max-w-3xl text-base leading-[26px] text-[var(--color-text-muted)] md:text-lg md:leading-7">
            {t.hero.body}
          </p>
          <Button href="#contact" className="hero-enter hero-enter-5 w-full justify-center md:w-auto">
            {t.hero.cta}
          </Button>
        </div>
      </section>
      <Selvage className="md:hidden" />

      <section
        id="what-we-do"
        className="scroll-mt-24 bg-white px-6 py-14 md:px-12 md:py-16 lg:px-16 lg:py-20 xl:px-20 xl:py-28"
      >
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-4 md:gap-12">
          <RevealText className="flex w-full flex-col items-center gap-4 text-center md:max-w-3xl md:gap-3">
            <h2 className="font-[family-name:var(--font-fraunces)] text-[28px] font-semibold leading-9 text-[var(--color-text-primary)] md:text-[40px] md:leading-[50px]">
              {t.whatWeDo.title}
            </h2>
            <p className="text-lg leading-7 text-[var(--color-text-muted)]">
              {t.whatWeDo.subtitle}
            </p>
          </RevealText>

          <div className="mt-2 grid w-full grid-cols-1 gap-6 md:mt-0 md:grid-cols-2 lg:grid-cols-3">
            {t.capabilities.map((cap, index) => (
              <Reveal key={cap.slug} delay={index * 80} className="h-full">
                {/* The whole card is the link — one focusable target rather than
                    a card with a separate "read more" inside it. The slug is
                    the accordion's id on About, so it opens on arrival. */}
                <Link
                  href={localePath(locale, `/about#${cap.slug}`)}
                  className="group capability-card flex h-full w-full flex-col gap-4 rounded-2xl border border-[var(--color-border-default)] bg-white p-6 transition-colors xl:p-8 hover:border-[var(--color-border-brand)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
                >
                  <span
                    className={`capability-icon inline-flex w-fit rounded-xl p-4 ${toneStyles[cap.tone]}`}
                  >
                    <Icon name={cap.icon} className="size-7" strokeWidth={1.75} />
                  </span>
                  <h3 className="text-rise text-rise-d1 font-[family-name:var(--font-fraunces)] text-[28px] font-semibold leading-9 text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-text-brand)]">
                    {cap.title}
                  </h3>
                  {/* 15/24 rather than 16/26: the descriptions run long enough
                      that at the larger setting they passed six lines in the
                      card measure, which is where the browser gives up on
                      balancing them and strands the last word. */}
                  <p className="text-rise text-rise-d2 text-balance text-[15px] leading-6 text-[var(--color-text-muted)]">
                    {cap.description}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="how-we-work"
        className="scroll-mt-24 bg-[var(--navy-800)] px-6 py-12 text-white md:px-16 md:py-[72px] xl:px-20 xl:py-28 2xl:px-[240px]"
      >
        <div className="mx-auto flex max-w-[1440px] flex-col gap-10 md:gap-12 xl:gap-16">
          <RevealText className="flex max-w-3xl flex-col gap-4">
            <h2 className="font-[family-name:var(--font-fraunces)] text-[28px] font-semibold leading-9 text-[var(--navy-100)] md:text-[34px] md:leading-[44px] xl:text-[40px] xl:leading-[50px]">
              {t.weave.title}
              {/* Marked once, on the most prominent use — the convention for a
                  trademark, and repeating it in the prose below would read as
                  legal boilerplate rather than a name. */}
              <sup className="ml-0.5 align-super text-[0.45em] font-semibold tracking-normal">
                ™
              </sup>
            </h2>
            <p className="text-emphasis font-[family-name:var(--font-fraunces)] text-xl leading-8 text-[var(--color-text-accent-on-dark)] md:text-2xl md:leading-9">
              {t.weave.tagline}
            </p>
            <p className="text-base leading-[26px] text-[var(--color-text-on-brand-soft)] md:text-lg md:leading-7">
              {t.weave.body}
            </p>
          </RevealText>

          {/* Two full-width bands rather than two half-width columns: the
              acronym five across, the practice three across by two. Both
              divide the same measure evenly, so neither outweighs the other,
              and each cell carries the same parts in the same order — a gold
              marker, then the line it labels, under a hairline.

              The acronym is five across or one down and nothing between: at
              two or three columns WEAVE stops spelling anything. Down the
              single column it still reads W-E-A-V-E. */}
          <div className="flex flex-col gap-5">
            <RevealText>
              <h3 className="text-overline text-[13px] font-semibold leading-4 tracking-[1.5px] text-[var(--color-text-accent-on-dark)]">
                {t.weave.acronymTitle.toUpperCase()}
              </h3>
            </RevealText>
            <ol className="grid grid-cols-1 gap-x-6 lg:grid-cols-5 xl:gap-x-8">
              {t.weaveLetters.map((entry, index) => (
                <li
                  key={`${entry.letter}-${index}`}
                  className="border-t border-white/15"
                >
                  {/* Stacked and centred in the five-across band, so each
                      letter sits over the middle of the line it labels and
                      every cell has the same gap between the two. Below lg
                      the acrostic runs down the left edge instead, where
                      centring would break the W-E-A-V-E alignment. */}
                  <Reveal
                    delay={index * 60}
                    className="flex items-baseline gap-4 py-4 lg:h-full lg:flex-col lg:items-center lg:gap-3 lg:py-6 lg:text-center"
                  >
                    <span
                      className="w-10 shrink-0 font-[family-name:var(--font-fraunces)] text-[40px] font-bold leading-none text-[var(--color-text-accent-on-dark)] lg:w-auto lg:text-[52px]"
                      aria-hidden
                    >
                      {entry.letter}
                    </span>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-base font-semibold uppercase leading-6 tracking-[1.5px] text-[var(--color-text-on-brand)]">
                        {entry.keyword}
                      </h4>
                      <p className="text-balance text-[15px] leading-6 text-[var(--navy-100)]">
                        {entry.detail}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col gap-5">
            <RevealText>
              <h3 className="text-overline text-[13px] font-semibold leading-4 tracking-[1.5px] text-[var(--color-text-accent-on-dark)]">
                {t.weave.practiceTitle.toUpperCase()}
              </h3>
            </RevealText>
            <ol className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
              {t.weaveSteps.map((step, index) => (
                <li key={step.step} className="border-t border-white/15">
                  <Reveal
                    delay={index * 60}
                    className="flex h-full items-baseline gap-4 py-4 md:py-6"
                  >
                    <span
                      className="w-10 shrink-0 font-[family-name:var(--font-fraunces)] text-xl font-semibold leading-7 text-[var(--color-text-accent-on-dark)]"
                      aria-hidden
                    >
                      {step.step}
                    </span>
                    <span className="text-emphasis text-balance font-[family-name:var(--font-fraunces)] text-xl font-semibold leading-7 text-[var(--navy-100)] md:text-[22px] md:leading-8">
                      {step.title}
                    </span>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          <RevealText className="max-w-3xl border-t border-white/15 pt-8">
            <p className="text-base leading-7 text-[var(--color-text-on-brand-soft)] md:text-lg">
              {t.weave.closing}
            </p>
          </RevealText>
        </div>
      </section>

      <GetToKnowUs />

      <section className="bg-white px-6 py-12 md:px-8 md:py-20 xl:px-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <RevealText>
            <h2 className="font-[family-name:var(--font-fraunces)] text-[28px] font-semibold leading-9 text-[var(--color-text-primary)] md:text-[40px]">
              {t.why.title}
            </h2>
          </RevealText>
          <RevealText className="space-y-4 text-[15px] leading-6 text-[var(--color-text-muted)] md:text-lg md:leading-7">
            {t.why.paragraphs.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </RevealText>
        </div>
      </section>

      <Faq />

      <section className="bg-[var(--green-700)] px-6 py-12 text-white md:px-8 md:py-20 xl:px-20">
        {/* Two columns only from lg. At md the split left these display-size
            statements about twenty characters to a line, which ran the mission
            to seven lines and stranded its last word; full width at that size
            gives the type a readable measure. */}
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-7 lg:grid-cols-2 lg:gap-16">
          <Reveal className="flex flex-col gap-3" delay={0}>
            <p className="text-overline text-xs font-semibold tracking-[2px] text-[var(--color-text-accent-on-dark)]">
              {t.visionMission.visionLabel}
            </p>
            <p className="text-emphasis text-balance font-[family-name:var(--font-fraunces)] text-[22px] font-semibold leading-9 sm:text-2xl md:text-[28px]">
              {t.visionMission.vision}
            </p>
          </Reveal>
          <Reveal className="flex flex-col gap-3" delay={120}>
            <p className="text-overline text-xs font-semibold tracking-[2px] text-[var(--color-text-accent-on-dark)]">
              {t.visionMission.missionLabel}
            </p>
            <p className="text-emphasis text-balance font-[family-name:var(--font-fraunces)] text-[22px] font-semibold leading-9 sm:text-2xl md:text-[28px]">
              {t.visionMission.mission}
            </p>
          </Reveal>
        </div>
      </section>

      <ContactForm />
    </>
  );
}
