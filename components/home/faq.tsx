"use client";

import { Icon } from "@/components/ui/icon";
import { keepSummaryInPlace } from "@/components/ui/accordion-anchor";
import { Reveal, RevealText } from "@/components/motion/reveal";
import { useContent } from "@/lib/i18n";

/**
 * Homepage FAQ. The same copy is emitted as FAQPage JSON-LD in `app/page.tsx`
 * — keep the two in sync by editing `faq` in the locale dictionaries only.
 */
export function Faq() {
  const t = useContent();

  return (
    <section
      id="faq"
      className="scroll-mt-24 bg-white px-6 py-12 md:px-10 md:py-16 xl:px-20 xl:py-20 2xl:px-[240px]"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <RevealText>
          <h2 className="font-[family-name:var(--font-fraunces)] text-[28px] font-semibold leading-9 text-[var(--color-text-primary)] md:text-[34px] md:leading-[44px]">
            {t.faq.title}
          </h2>
        </RevealText>

        <div className="flex w-full flex-col">
          {t.faq.items.map((item, index) => (
            <Reveal key={item.question} delay={index * 60}>
              {/* `name` makes the group exclusive natively — opening one closes
                  the last, no JavaScript. A separate group name from the About
                  services so the two lists never affect each other. */}
              <details
                name="faq"
                className="service-accordion group flex flex-col gap-3 border-b border-[var(--color-border-default)] py-5"
              >
                <summary
                  onClick={keepSummaryInPlace}
                  className="flex w-full cursor-pointer list-none items-center gap-4 text-left [&::-webkit-details-marker]:hidden">
                  <span className="accordion-title text-rise flex-1 text-base font-semibold leading-[26px] md:text-[17px]">
                    {item.question}
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

                <p className="accordion-panel text-base leading-[26px] text-[var(--color-text-muted)]">
                  {item.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
