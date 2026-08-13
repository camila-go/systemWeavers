"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { TextInput, TextTextarea } from "@/components/ui/input";
import { Reveal, RevealText } from "@/components/motion/reveal";
import { useContent } from "@/lib/i18n";

type FieldErrors = Partial<
  Record<"fullName" | "email" | "message" | "form", string>
>;

export function ContactForm() {
  const t = useContent();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const [statusMessage, setStatusMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setStatus("loading");
    setStatusMessage(t.contact.sending);

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      fullName: String(data.get("fullName") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      consent: true,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as {
        ok?: boolean;
        error?: string;
        code?: string;
        fieldErrors?: FieldErrors;
      };

      if (!res.ok) {
        // Server-side failures get localized copy that points at a fallback
        // channel; only validation errors surface the server's own text.
        if (json.code === "unavailable") {
          const message = t.contact.serverError.replace("{email}", t.site.email);
          setErrors({ form: message });
          setStatus("error");
          setStatusMessage(message);
          return;
        }

        setErrors(
          json.fieldErrors ?? { form: json.error ?? t.contact.somethingWrong },
        );
        setStatus("error");
        setStatusMessage(json.error ?? t.contact.fixFields);
        return;
      }

      form.reset();
      setStatus("success");
      setStatusMessage(t.contact.success);
    } catch {
      setStatus("error");
      setStatusMessage(t.contact.networkError);
      setErrors({ form: t.contact.networkError });
    }
  }

  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-[var(--color-bg-page)] px-6 py-12 md:px-10 md:py-16 xl:px-20 xl:py-28 2xl:px-[240px]"
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-8 xl:grid-cols-[1fr_560px] xl:items-start xl:gap-20">
        <RevealText className="flex flex-col gap-5">
          <h2 className="font-[family-name:var(--font-fraunces)] text-[28px] font-semibold leading-9 text-[var(--color-text-primary)] md:text-[34px] md:leading-[44px] xl:text-[40px] xl:leading-[50px]">
            {t.contact.title}
          </h2>
          <div className="text-[15px] leading-6 text-[var(--color-text-muted)] md:text-lg md:leading-7">
            <p className="lg:hidden">{t.contact.introMobile}</p>
            <p className="hidden lg:block">{t.contact.introDesktop}</p>
            <p className="lg:hidden">
              <a
                className="link-hover transition-colors hover:underline"
                href={`tel:${t.site.phone.replace(/\D/g, "")}`}
              >
                {t.site.phone}
              </a>
              {" · "}
              <a
                className="link-hover transition-colors hover:underline"
                href={`mailto:${t.site.email}`}
              >
                {t.site.email}
              </a>
            </p>
          </div>
        </RevealText>

        <Reveal delay={120}>
          <form
            onSubmit={onSubmit}
            noValidate
            className="form-card flex w-full flex-col gap-4 rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-bg-page)] p-6 md:gap-5 md:p-10 xl:w-[560px] xl:shrink-0 xl:justify-self-end"
            aria-busy={status === "loading"}
          >
            <TextInput
              id="fullName"
              name="fullName"
              label={t.contact.fullName}
              placeholder={t.contact.placeholderName}
              autoComplete="name"
              required
              error={errors.fullName}
              disabled={status === "loading"}
            />
            <TextInput
              id="email"
              name="email"
              type="email"
              label={t.contact.email}
              placeholder={t.contact.placeholderEmail}
              autoComplete="email"
              required
              error={errors.email}
              disabled={status === "loading"}
            />
            <TextTextarea
              id="message"
              name="message"
              label={t.contact.message}
              placeholder={t.contact.placeholderMessage}
              required
              rows={4}
              error={errors.message}
              disabled={status === "loading"}
            />
            <p className="text-sm leading-[22px] text-[var(--color-text-primary)]">
              {t.contact.consent}
            </p>
            <Button
              type="submit"
              className="w-full justify-center"
              disabled={status === "loading"}
              aria-busy={status === "loading"}
            >
              {status === "loading" ? t.contact.sending : t.contact.submit}
            </Button>
            <p
              className={`min-h-5 text-sm ${
                status === "success"
                  ? "text-[var(--color-text-brand)]"
                  : status === "error"
                    ? "text-[var(--color-error)]"
                    : "text-[var(--color-text-muted)]"
              }`}
              role="status"
              aria-live="polite"
            >
              {statusMessage}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
