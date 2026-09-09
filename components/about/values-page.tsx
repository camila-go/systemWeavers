"use client";

import Image from "next/image";
import { Selvage } from "@/components/selvage";
import { ContactForm } from "@/components/contact-form";
import { Reveal, RevealText } from "@/components/motion/reveal";
import { useContent } from "@/lib/i18n";

/**
 * The Selvage's four colours, in its order, one per value — carried by the
 * rule above each entry. The number stays a single readable colour: teal-500
 * and the gold tint measure 3.1:1 and 2.5:1 on white, under the 4.5:1 that
 * 13px text needs, and a number nobody can read is not much of a number.
 */
const valueRules = [
  "bg-[var(--green-700)]",
  "bg-[var(--teal-500)]",
  "bg-[var(--gold-500)]",
  "bg-[var(--navy-800)]",
] as const;

export function ValuesPage() {
  const t = useContent();

  return (
    <>
      {/* Deep brand green rather than About's navy: the two pages share a hero
          photo, and in navy they read as the same page. It also steps down
          into the lighter green of the vision/mission band below. */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[var(--green-900)]">
          <Image
            src="/images/about-hero.png"
            alt=""
            fill
            priority
            className="object-cover opacity-[0.12]"
            sizes="100vw"
          />
        </div>
        <div className="mx-auto flex w-full max-w-[1088px] flex-col items-center gap-5 px-6 py-16 text-center md:gap-6 md:px-10 md:py-24 xl:px-0">
          <h1 className="hero-enter hero-enter-1 font-[family-name:var(--font-fraunces)] text-[40px] font-bold leading-tight text-white md:text-5xl md:leading-[64px] xl:text-[64px] xl:leading-[72px]">
            {t.values.title}
          </h1>
          <p className="hero-enter hero-enter-2 max-w-3xl text-base leading-7 text-[var(--color-text-on-brand-soft)] md:text-lg md:leading-7">
            {t.values.heroBody}
          </p>
        </div>
        <Selvage />
      </section>

      {/* Vision and mission share the green treatment used on the home page, so
          a reader arriving from there recognises them as the same statements
          rather than a second, differently-worded pair. */}
      <section
        id="vision-mission"
        className="scroll-mt-24 bg-[var(--green-700)] px-6 py-12 text-white md:px-8 md:py-20 xl:px-20"
      >
        {/* Two columns only from lg — see the note on the home page's copy of
            this section: the md split gave these statements too tight a
            measure for display type. */}
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-7 lg:grid-cols-2 lg:gap-16">
          <Reveal className="flex flex-col gap-3" delay={0}>
            <h2 className="text-overline text-xs font-semibold tracking-[2px] text-[var(--color-text-accent-on-dark)]">
              {t.visionMission.visionLabel}
            </h2>
            {/* 22px below sm: at 360 the 24px setting ran to seven lines, past
                the point where the browser will balance them, and stranded the
                last word. */}
            <p className="text-emphasis text-balance font-[family-name:var(--font-fraunces)] text-[22px] font-semibold leading-9 sm:text-2xl md:text-[28px]">
              {t.visionMission.vision}
            </p>
          </Reveal>
          <Reveal className="flex flex-col gap-3" delay={120}>
            <h2 className="text-overline text-xs font-semibold tracking-[2px] text-[var(--color-text-accent-on-dark)]">
              {t.visionMission.missionLabel}
            </h2>
            {/* 22px below sm: at 360 the 24px setting ran to seven lines, past
                the point where the browser will balance them, and stranded the
                last word. */}
            <p className="text-emphasis text-balance font-[family-name:var(--font-fraunces)] text-[22px] font-semibold leading-9 sm:text-2xl md:text-[28px]">
              {t.visionMission.mission}
            </p>
          </Reveal>
        </div>
      </section>

      <section
        id="core-values"
        className="scroll-mt-24 bg-[var(--color-bg-page)] px-6 py-12 md:px-10 md:py-16 xl:px-20 xl:py-28 2xl:px-[240px]"
      >
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8">
          {/* From lg the heading block is held to one column of the list
              below, so the intro's last line stops where the first value's
              does instead of running on under the second column. Below lg it
              keeps the wider measure — a column there is about 450px, and the
              two-up grid has not yet split the row. */}
          <RevealText className="flex max-w-3xl flex-col gap-4 lg:max-w-[calc((100%-3rem)/2)]">
            <h2 className="font-[family-name:var(--font-fraunces)] text-[34px] font-semibold leading-[44px] text-[var(--color-text-primary)] md:text-[40px] md:leading-[50px]">
              {t.values.coreValuesTitle}
            </h2>
            <p className="text-base leading-[26px] text-[var(--color-text-muted)] md:text-lg md:leading-7">
              {t.values.coreValuesIntro}
            </p>
          </RevealText>

          {/* Deliberately not cards: a bordered, rounded, hoverable box reads
              as a link, and none of these are. This is the "How we work"
              treatment instead — a weave-coloured rule, a number, a heading,
              and prose — which carries the brand without promising a click.
              Two columns at most, since these are paragraphs, not blurbs. */}
          <ol className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2 md:gap-y-12">
            {t.values.items.map((value, index) => (
              <li key={value.title}>
                <Reveal delay={index * 70} className="flex flex-col gap-3">
                  {/* One segment of the selvage, in that value's turn of the
                      four-colour weave. */}
                  <span
                    className={`h-1 w-14 shrink-0 ${valueRules[index % valueRules.length]}`}
                    aria-hidden
                  />
                  <p
                    className="text-[13px] font-semibold leading-4 tracking-[1.5px] text-[var(--color-text-brand)]"
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-[family-name:var(--font-fraunces)] text-[24px] font-semibold leading-8 text-[var(--color-text-primary)] md:text-[28px] md:leading-9">
                    {value.title}
                  </h3>
                  <p className="text-base leading-[26px] text-[var(--color-text-muted)]">
                    {value.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ContactForm />
    </>
  );
}
