"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Reveal, RevealText } from "@/components/motion/reveal";
import { useContent } from "@/lib/i18n";

export function GetToKnowUs() {
  const t = useContent();

  return (
    <section
      id="get-to-know-us"
      className="scroll-mt-24 bg-[var(--color-bg-cream)] px-6 py-12 md:px-10 md:py-16 lg:px-16 lg:py-20 xl:px-20 xl:py-24 2xl:px-[120px] 2xl:py-28"
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-4 lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-16">
        <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-6 lg:gap-8">
          {t.founders.map((person, index) => (
            <Reveal key={person.name} delay={index * 100}>
              <figure className="flex flex-col gap-6 xl:gap-8">
                <div className="portrait-zoom relative aspect-[312/353] w-full overflow-hidden rounded-2xl bg-[var(--color-bg-tint)] md:aspect-[3/4] lg:aspect-auto lg:h-[380px] xl:h-[420px] 2xl:h-[472px]">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    // Both portraits are landscape in a portrait frame, so the
                    // horizontal position is what does the cropping. Grisel's
                    // frame sits slightly left of centre to keep her hair
                    // inside the crop rather than clipping it.
                    className={
                      index === 1
                        ? "object-cover object-[30%_top]"
                        : "object-cover object-top"
                    }
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 45vw, 360px"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl bg-[rgba(25,100,107,0.15)]"
                    aria-hidden
                  />
                </div>
                <figcaption className="flex flex-col gap-2 px-1 md:px-4">
                  {/* A name is display text, not prose: balance it so it never
                      leaves a surname stranded on its own line. */}
                  <p className="text-rise text-rise-d1 text-balance font-[family-name:var(--font-fraunces)] text-[28px] font-semibold leading-9 text-[var(--green-900)]">
                    {person.name}
                  </p>
                  <p className="text-overline text-[13px] font-semibold leading-4 tracking-[1.5px] text-[var(--color-text-on-accent)]">
                    {person.role}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <RevealText className="flex flex-col items-start gap-4 md:gap-5" delay={120}>
          <h2 className="font-[family-name:var(--font-fraunces)] text-[28px] font-semibold leading-9 text-[var(--color-text-primary)] md:text-[34px] md:leading-[44px] xl:text-[40px] xl:leading-[50px]">
            {t.getToKnowUs.title}
          </h2>
          <div className="space-y-6 text-base leading-[26px] text-[var(--color-text-muted)] md:text-sm md:leading-[22px]">
            {t.aboutCopy.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
          <Button href="#contact" variant="brand" className="w-full justify-center md:w-auto">
            {t.getToKnowUs.cta}
          </Button>
        </RevealText>
      </div>
    </section>
  );
}
