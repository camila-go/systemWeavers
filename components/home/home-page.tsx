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

const toneStyles = {
  teal: "bg-[var(--teal-100)] text-[var(--teal-500)]",
  navy: "bg-[var(--navy-100)] text-[var(--navy-800)]",
  gold: "bg-[var(--gold-100)] text-[#c4a035]",
  green: "bg-[var(--green-100)] text-[var(--green-700)]",
} as const;

const weaveIconTone = {
  "01": "teal",
  "02": "navy",
  "03": "green",
  "04": "gold",
} as const;

export function HomePage() {
  return (
    <>
      {/* Hero — mobile: px-6 py-12, full-width CTA, selvage below */}
      <section className="bg-[var(--color-bg-hero)] px-6 py-12 text-center md:px-10 md:py-16 lg:px-16 lg:py-20 xl:px-20 xl:py-24">
        <div className="mx-auto flex max-w-[1090px] flex-col items-center gap-5 md:gap-6">
          <p className="w-full text-[13px] font-semibold leading-4 tracking-[1.5px] text-[var(--color-text-brand)]">
            {hero.overline}
          </p>
          <p className="w-full text-xs font-semibold tracking-[1.8px] text-[var(--color-text-brand)] md:text-sm md:tracking-[2px]">
            {hero.subline}
          </p>
          <h1 className="w-full font-[family-name:var(--font-fraunces)] text-[34px] font-semibold italic leading-[42px] text-[var(--color-text-primary)] md:text-5xl md:leading-[64px] xl:text-[64px] xl:leading-[72px]">
            <span>{hero.titleLead}</span>
            <span className="not-italic font-bold md:font-semibold">{hero.titleRest}</span>
          </h1>
          <p className="w-full max-w-3xl text-base leading-[26px] text-[var(--color-text-muted)] md:text-lg md:leading-7">
            {hero.body}
          </p>
          <Button href="#contact" className="w-full justify-center md:w-auto">
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
          <div className="flex w-full flex-col items-center gap-4 text-center md:max-w-3xl md:gap-3">
            <h2 className="font-[family-name:var(--font-fraunces)] text-[28px] font-semibold leading-9 text-[var(--color-text-primary)] md:text-[40px] md:leading-[50px]">
              What we do
            </h2>
            <p className="text-lg leading-7 text-[var(--color-text-muted)]">
              Four connected services, one collaborative approach.
            </p>
          </div>

          <div className="mt-2 grid w-full grid-cols-1 gap-6 md:mt-0 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap) => (
              <article
                key={cap.title}
                className="flex w-full flex-col gap-4 rounded-2xl border border-[var(--color-border-default)] bg-white p-8"
              >
                <span
                  className={`inline-flex w-fit rounded-xl p-3.5 ${toneStyles[cap.tone]}`}
                >
                  <Icon name={cap.icon} className="size-7" strokeWidth={1.75} />
                </span>
                <h3 className="font-[family-name:var(--font-fraunces)] text-[28px] font-semibold leading-9 text-[var(--color-text-primary)]">
                  {cap.title}
                </h3>
                <p className="text-base leading-[26px] text-[var(--color-text-muted)]">
                  {cap.description}
                </p>
              </article>
            ))}
          </div>

          <Button
            href="#how-we-work"
            variant="outline"
            className="mt-2 w-full justify-center md:mt-0 md:w-auto"
          >
            See how we do it
          </Button>
        </div>
      </section>

      {/* How we co-design — mobile: icon + text rows; desktop: cards */}
      <section
        id="how-we-work"
        className="scroll-mt-24 bg-[var(--navy-800)] px-6 py-12 text-white md:px-8 md:py-20 xl:px-20 xl:py-24"
      >
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 md:gap-10">
          <div className="text-center md:text-left">
            <h2 className="font-[family-name:var(--font-fraunces)] text-[28px] font-semibold leading-9 text-[var(--navy-100)] md:text-[40px] md:leading-[50px] md:text-white">
              How we co-design
            </h2>
            <p className="mt-4 text-lg leading-7 text-[var(--color-text-on-brand-soft)] md:mt-3 md:max-w-2xl md:text-base md:text-white/80 xl:text-lg">
              Four steps, one collaborative method — every engagement follows the same
              thread.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:hidden">
            {weaveSteps.map((step) => (
              <div key={step.step} className="flex items-start gap-4">
                <span
                  className={`inline-flex shrink-0 rounded-xl p-3 ${toneStyles[weaveIconTone[step.step as keyof typeof weaveIconTone]]}`}
                >
                  <Icon name={step.icon} className="size-6" />
                </span>
                <div className="flex min-w-0 flex-col gap-1">
                  <p className="text-[13px] font-semibold tracking-[1.5px] text-[var(--color-text-accent-on-dark)]">
                    STEP {step.step} — {step.title.toUpperCase()}
                  </p>
                  <p className="text-[15px] leading-6 text-[var(--navy-100)]">
                    {step.shortDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden gap-6 sm:grid-cols-2 md:grid xl:grid-cols-4">
            {weaveSteps.map((step) => (
              <article
                key={step.step}
                className="rounded-[var(--radius-lg)] border border-white/15 bg-white/5 p-6"
              >
                <span
                  className={`mb-4 inline-flex rounded-[14px] p-4 ${toneStyles[weaveIconTone[step.step as keyof typeof weaveIconTone]]}`}
                >
                  <Icon name={step.icon} className="size-6" />
                </span>
                <p className="text-xs font-semibold tracking-[1.5px] text-[var(--color-text-accent-on-dark)]">
                  STEP {step.step}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-fraunces)] text-2xl font-semibold">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/80">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <GetToKnowUs />

      <section className="bg-white px-6 py-12 md:px-8 md:py-20 xl:px-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <h2 className="font-[family-name:var(--font-fraunces)] text-[28px] font-semibold leading-9 text-[var(--color-text-primary)] md:text-[40px]">
            Why System Weavers
          </h2>
          <div className="space-y-4 text-[15px] leading-6 text-[var(--color-text-muted)] md:text-lg md:leading-7">
            {whyParagraphs.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--green-700)] px-6 py-12 text-white md:px-8 md:py-20 xl:px-20">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-7 md:grid md:grid-cols-2 md:gap-16">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold tracking-[2px] text-[var(--color-text-accent-on-dark)]">
              OUR VISION
            </p>
            <p className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold leading-9 md:text-[28px]">
              {vision}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold tracking-[2px] text-[var(--color-text-accent-on-dark)]">
              OUR MISSION
            </p>
            <p className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold leading-9 md:text-[28px]">
              {mission}
            </p>
          </div>
        </div>
      </section>

      <ContactForm />
    </>
  );
}
