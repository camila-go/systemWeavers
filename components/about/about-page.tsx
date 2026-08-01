"use client";

import Image from "next/image";
import { useState } from "react";
import { aboutHeroBody, services } from "@/lib/content";
import { Selvage } from "@/components/selvage";
import { ContactForm } from "@/components/contact-form";
import { Icon } from "@/components/ui/icon";

export function AboutPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/about-hero.png"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[var(--navy-900)]/75" />
        </div>
        <div className="mx-auto flex w-full max-w-[1090px] flex-col items-center gap-6 px-4 py-16 text-center md:px-8 md:py-24 xl:px-0">
          <h1 className="font-[family-name:var(--font-fraunces)] text-4xl font-bold leading-tight text-white md:text-5xl md:leading-[64px] xl:text-6xl xl:leading-[72px]">
            About us
          </h1>
          <p className="max-w-3xl text-base leading-7 text-[var(--navy-100)] md:text-lg">
            {aboutHeroBody}
          </p>
        </div>
        <Selvage equal />
      </section>

      <section className="bg-[var(--color-bg-page)] px-4 py-14 sm:px-6 md:px-10 md:py-16 lg:px-16 lg:py-20 xl:px-20 xl:py-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-10 xl:max-w-[1440px] xl:flex-row xl:gap-16">
          <div className="flex min-w-0 w-full flex-1 flex-col gap-6">
            <h2 className="font-[family-name:var(--font-fraunces)] text-3xl font-semibold leading-tight text-[var(--color-text-primary)] md:text-4xl md:leading-[50px]">
              Our services
            </h2>

            <div className="flex w-full flex-col">
              {services.map((service, index) => {
                const open = openIndex === index;
                const panelId = `service-panel-${index}`;
                const buttonId = `service-button-${index}`;

                return (
                  <div
                    key={service.title}
                    className="flex flex-col gap-3 border-b border-[var(--color-border-default)] py-6"
                  >
                    <button
                      type="button"
                      id={buttonId}
                      className="flex w-full items-center gap-4 text-left"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(open ? -1 : index)}
                    >
                      <span className="flex-1 text-lg font-semibold leading-8 text-[var(--color-text-primary)] sm:text-xl">
                        {service.title}
                      </span>
                      <Icon
                        name={open ? "Minus" : "Plus"}
                        className="size-5 shrink-0 text-[#0e7490]"
                      />
                    </button>

                    {open ? (
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        className="text-base font-normal leading-6 text-[var(--color-text-muted)]"
                      >
                        {service.intro ? (
                          <>
                            <span>{service.intro}</span>
                            <br />
                          </>
                        ) : null}
                        {service.items.map((item, i) => (
                          <span key={item}>
                            {item}
                            {i < service.items.length - 1 ? <br /> : null}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="flex w-full shrink-0 flex-col gap-5 rounded-2xl bg-[var(--color-bg-tint)] p-6 md:p-8 xl:w-96">
            <h3 className="font-[family-name:var(--font-fraunces)] text-xl font-semibold leading-8 text-[var(--color-text-primary)]">
              At a glance
            </h3>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-base font-semibold leading-5 text-[var(--color-text-primary)] hover:underline"
              onClick={(e) => e.preventDefault()}
            >
              Download capability statement (PDF)
              <Icon name="ArrowUpRight" className="size-4 text-[#0e7490]" />
            </a>
          </aside>
        </div>
      </section>

      <ContactForm />
    </>
  );
}
