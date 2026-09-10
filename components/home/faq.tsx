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
      {/* Same measure as the About services accordion, so the two lists
          read as one component across the site. */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6">
        <RevealText>
          <h2 className="text-center font-[family-name:var(--font-fraunces)] text-[28px] font-semibold leading-9 text-[var(--color-text-primary)] md:text-[34px] md:leading-[44px]">
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
                className="service-accordion group flex flex-col gap-3 border-b border-[var(--color-border-default)]"
              >
                {/* The row's padding lives on the summary, not the details:
                    it is the thing you tap, and on the wrapper it left a
                    26px-tall target inside a 66px-tall row. */}
                <summary
                  onClick={keepSummaryInPlace}
                  className="flex w-full cursor-pointer list-none items-center gap-4 py-5 text-left [&::-webkit-details-marker]:hidden">
                  {/* A heading, matching the About accordions: these questions
                      are the page's third level and were absent from the
                      heading outline as spans. It also picks up the global
                      balanced wrapping, so a question no longer drops its
                      last word onto a line of its own. */}
                  <h3 className="accordion-title text-rise flex-1 text-base font-semibold leading-[26px] md:text-[17px]">
                    {item.question}
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

                {/* The row is full width, the answer is not: these are
                    paragraphs, not the short bullets the services panels
                    hold, and a 1440px line is not a readable one. */}
                <p className="accordion-panel max-w-4xl pb-5 text-base leading-[26px] text-[var(--color-text-muted)]">
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
