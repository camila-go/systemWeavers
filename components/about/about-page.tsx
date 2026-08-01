import Image from "next/image";
import { aboutHeroBody, services } from "@/lib/content";
import { Selvage } from "@/components/selvage";
import { ContactForm } from "@/components/contact-form";
import { Icon } from "@/components/ui/icon";
import { Reveal, RevealText } from "@/components/motion/reveal";

export function AboutPage() {
  return (
    <>
      {/* Hero */}
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
        <div className="mx-auto flex w-full max-w-[1090px] flex-col items-center gap-5 px-6 py-16 text-center md:gap-6 md:px-10 md:py-24 xl:px-0 xl:py-24">
          <h1 className="hero-enter hero-enter-1 font-[family-name:var(--font-fraunces)] text-[40px] font-bold leading-tight text-white md:text-5xl md:leading-[64px] xl:text-[64px] xl:leading-[72px]">
            About us
          </h1>
          <p className="hero-enter hero-enter-2 max-w-3xl text-base leading-7 text-[var(--navy-100)] md:text-lg md:leading-7">
            {aboutHeroBody}
          </p>
        </div>
        <Selvage />
      </section>

      {/* Our services */}
      <section className="bg-[var(--color-bg-page)] px-6 py-12 md:px-10 md:py-16 xl:px-20 xl:py-28 2xl:px-[240px]">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6">
          <RevealText>
            <h2 className="font-[family-name:var(--font-fraunces)] text-[34px] font-semibold leading-[44px] text-[var(--color-text-primary)] md:text-[40px] md:leading-[50px]">
              Our services
            </h2>
          </RevealText>

          <div className="flex w-full flex-col">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * 60}>
                <details className="service-accordion group flex flex-col gap-3 border-b border-[var(--color-border-default)] py-6">
                  <summary className="flex w-full cursor-pointer list-none items-center gap-4 text-left [&::-webkit-details-marker]:hidden">
                    <span className="text-rise flex-1 text-[22px] font-semibold leading-[30px] text-[var(--color-text-primary)] md:font-[family-name:var(--font-fraunces)]">
                      {service.title}
                    </span>
                    <Icon
                      name="Plus"
                      className="accordion-icon size-5 shrink-0 text-[var(--teal-500)] group-open:hidden"
                    />
                    <Icon
                      name="Minus"
                      className="accordion-icon accordion-icon-minus hidden size-5 shrink-0 text-[var(--teal-500)] group-open:block"
                    />
                  </summary>

                  <div className="accordion-panel text-base leading-[26px] text-[var(--color-text-muted)]">
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
        </div>
      </section>

      <ContactForm />
    </>
  );
}
