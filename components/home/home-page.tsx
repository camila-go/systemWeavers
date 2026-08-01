import {
  capabilities,
  hero,
  mission,
  vision,
  weaveSteps,
  whyParagraphs,
} from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Selvage } from "@/components/selvage";
import { ContactForm } from "@/components/contact-form";
import { GetToKnowUs } from "@/components/home/get-to-know-us";
import { Reveal, RevealText } from "@/components/motion/reveal";

const toneStyles = {
  teal: "bg-[var(--teal-100)] text-[var(--teal-500)]",
  navy: "bg-[var(--navy-100)] text-[var(--navy-800)]",
  gold: "bg-[var(--gold-100)] text-[#c4a035]",
  green: "bg-[var(--green-100)] text-[var(--green-700)]",
} as const;

export function HomePage() {
  return (
    <>
      {/* Hero — mobile: px-6 py-12, full-width CTA, selvage below */}
      <section className="bg-[var(--color-bg-hero)] px-6 py-12 text-center md:px-10 md:py-16 lg:px-16 lg:py-20 xl:px-20 xl:py-24">
        <div className="mx-auto flex max-w-[1090px] flex-col items-center gap-5 md:gap-6">
          <p className="hero-enter hero-enter-1 w-full text-[13px] font-semibold leading-4 tracking-[1.5px] text-[var(--color-text-brand)]">
            {hero.overline}
          </p>
          <p className="hero-enter hero-enter-2 w-full text-xs font-semibold tracking-[1.8px] text-[var(--color-text-brand)] md:text-sm md:tracking-[2px]">
            {hero.subline}
          </p>
          <h1 className="w-full font-[family-name:var(--font-fraunces)] text-[34px] font-semibold italic leading-[42px] text-[var(--color-text-primary)] md:text-5xl md:leading-[64px] xl:text-[64px] xl:leading-[72px]">
            <span className="hero-line">{hero.titleLead}</span>
            <span className="hero-line hero-line-2 not-italic font-bold md:font-semibold">
              {hero.titleRest}
            </span>
          </h1>
          <p className="hero-enter hero-enter-4 w-full max-w-3xl text-base leading-[26px] text-[var(--color-text-muted)] md:text-lg md:leading-7">
            {hero.body}
          </p>
          <Button href="#contact" className="hero-enter hero-enter-5 w-full justify-center md:w-auto">
            Start A Conversation
          </Button>
        </div>
      </section>
      <Selvage className="md:hidden" />

      {/* What we do — stacked cards on mobile */}
      <section
        id="what-we-do"
        className="scroll-mt-24 bg-white px-6 py-14 md:px-12 md:py-16 lg:px-16 lg:py-20 xl:px-20 xl:py-28"
      >
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-4 md:gap-12">
          <RevealText className="flex w-full flex-col items-center gap-4 text-center md:max-w-3xl md:gap-3">
            <h2 className="font-[family-name:var(--font-fraunces)] text-[28px] font-semibold leading-9 text-[var(--color-text-primary)] md:text-[40px] md:leading-[50px]">
              What we do
            </h2>
            <p className="text-lg leading-7 text-[var(--color-text-muted)]">
              Four connected services, one collaborative approach.
            </p>
          </RevealText>

          <div className="mt-2 grid w-full grid-cols-1 gap-6 md:mt-0 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap, index) => (
              <Reveal key={cap.title} delay={index * 80} className="h-full">
                <article className="group capability-card flex h-full w-full flex-col gap-4 rounded-2xl border border-[var(--color-border-default)] bg-white p-8">
                  <span
                    className={`capability-icon inline-flex w-fit rounded-xl p-3.5 ${toneStyles[cap.tone]}`}
                  >
                    <Icon name={cap.icon} className="size-7" strokeWidth={1.75} />
                  </span>
                  <h3 className="text-rise text-rise-d1 font-[family-name:var(--font-fraunces)] text-[28px] font-semibold leading-9 text-[var(--color-text-primary)]">
                    {cap.title}
                  </h3>
                  <p className="text-rise text-rise-d2 text-base leading-[26px] text-[var(--color-text-muted)]">
                    {cap.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <Button
              href="#how-we-work"
              variant="outline"
              className="mt-2 w-full justify-center md:mt-0 md:w-auto"
            >
              See how we do it
            </Button>
          </Reveal>
        </div>
      </section>

      {/* How we co-design — mobile: stacked; tablet: 2×2; desktop: 4 flat columns */}
      <section
        id="how-we-work"
        className="scroll-mt-24 bg-[var(--navy-800)] px-6 py-12 text-white md:px-16 md:py-[72px] xl:px-20 xl:py-28 2xl:px-[240px]"
      >
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 md:gap-8 xl:gap-12">
          <RevealText className="flex flex-col gap-3 text-center">
            <h2 className="font-[family-name:var(--font-fraunces)] text-[28px] font-semibold leading-9 text-[var(--navy-100)] md:text-[34px] md:leading-[44px] xl:text-[40px] xl:leading-[50px]">
              How we co-design
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-7 text-[var(--color-text-on-brand-soft)]">
              Four steps, one collaborative method — every engagement follows the same
              thread.
            </p>
          </RevealText>

          {/* Mobile */}
          <div className="flex flex-col gap-4 md:hidden">
            {weaveSteps.map((step, index) => (
              <Reveal key={step.step} delay={index * 60}>
                <div className="flex flex-col gap-1">
                  <p className="text-overline text-[13px] font-semibold tracking-[1.5px] text-[var(--color-text-accent-on-dark)]">
                    STEP {step.step} — {step.title.toUpperCase()}
                  </p>
                  <p className="text-rise text-rise-d1 text-[15px] leading-6 text-[var(--navy-100)]">
                    {step.shortDescription}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Tablet: 2×2 grid, combined step label */}
          <div className="hidden gap-8 md:grid md:grid-cols-2 xl:hidden">
            {weaveSteps.map((step, index) => (
              <Reveal key={step.step} delay={index * 80}>
                <div className="flex flex-col gap-2.5">
                  <p className="text-overline text-[13px] font-semibold tracking-[1.5px] text-[var(--color-text-accent-on-dark)]">
                    STEP {step.step} — {step.title.toUpperCase()}
                  </p>
                  <p className="text-rise text-rise-d1 text-[15px] leading-6 text-[var(--navy-100)]">
                    {step.shortDescription}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Desktop: 4 open columns — no card boxes */}
          <div className="hidden gap-8 xl:grid xl:grid-cols-4">
            {weaveSteps.map((step, index) => (
              <Reveal key={step.step} delay={index * 90}>
                <div className="flex flex-col gap-3.5">
                  <p className="text-overline text-[13px] font-semibold tracking-[1.5px] text-[var(--color-text-accent-on-dark)]">
                    STEP {step.step}
                  </p>
                  <h3 className="text-emphasis font-[family-name:var(--font-fraunces)] text-[28px] font-semibold leading-9 text-[var(--navy-100)]">
                    {step.title}
                  </h3>
                  <p className="text-rise text-rise-d1 text-base leading-[26px] text-[var(--navy-100)]">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <GetToKnowUs />

      <section className="bg-white px-6 py-12 md:px-8 md:py-20 xl:px-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <RevealText>
            <h2 className="font-[family-name:var(--font-fraunces)] text-[28px] font-semibold leading-9 text-[var(--color-text-primary)] md:text-[40px]">
              Why System Weavers
            </h2>
          </RevealText>
          <RevealText className="space-y-4 text-[15px] leading-6 text-[var(--color-text-muted)] md:text-lg md:leading-7">
            {whyParagraphs.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </RevealText>
        </div>
      </section>

      <section className="bg-[var(--green-700)] px-6 py-12 text-white md:px-8 md:py-20 xl:px-20">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-7 md:grid-cols-2 md:gap-16">
          <Reveal className="flex flex-col gap-3" delay={0}>
            <p className="text-overline text-xs font-semibold tracking-[2px] text-[var(--color-text-accent-on-dark)]">
              OUR VISION
            </p>
            <p className="text-emphasis font-[family-name:var(--font-fraunces)] text-2xl font-semibold leading-9 md:text-[28px]">
              {vision}
            </p>
          </Reveal>
          <Reveal className="flex flex-col gap-3" delay={120}>
            <p className="text-overline text-xs font-semibold tracking-[2px] text-[var(--color-text-accent-on-dark)]">
              OUR MISSION
            </p>
            <p className="text-emphasis font-[family-name:var(--font-fraunces)] text-2xl font-semibold leading-9 md:text-[28px]">
              {mission}
            </p>
          </Reveal>
        </div>
      </section>

      <ContactForm />
    </>
  );
}
