"use client";

import { FormEvent, useState } from "react";
import { site } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { TextInput, TextTextarea } from "@/components/ui/input";

type FieldErrors = Partial<
  Record<"fullName" | "email" | "message" | "form", string>
>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const [statusMessage, setStatusMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setStatus("loading");
    setStatusMessage("Sending…");

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
        fieldErrors?: FieldErrors;
      };

      if (!res.ok) {
        setErrors(json.fieldErrors ?? { form: json.error ?? "Something went wrong." });
        setStatus("error");
        setStatusMessage(json.error ?? "Please fix the highlighted fields.");
        return;
      }

      form.reset();
      setStatus("success");
      setStatusMessage("Thank you — we’ll respond within two business days.");
    } catch {
      setStatus("error");
      setStatusMessage("Network error. Please try again.");
      setErrors({ form: "Network error. Please try again." });
    }
  }

  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-[var(--color-bg-page)] px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20 xl:px-20 xl:py-24 2xl:px-[120px] 2xl:py-28"
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-5 lg:grid-cols-2 lg:items-start lg:gap-16 2xl:gap-20">
        <div className="flex flex-col gap-5">
          <h2 className="font-[family-name:var(--font-fraunces)] text-[28px] font-semibold leading-9 text-[var(--color-text-primary)] md:text-[34px] md:leading-[44px] xl:text-[40px] xl:leading-[50px]">
            Start a conversation
          </h2>
          <div className="text-[15px] leading-6 text-[var(--color-text-muted)] md:text-lg md:leading-7">
            <p className="lg:hidden">We’ll respond within two business days.</p>
            <p className="hidden lg:block">
              Tell us about your goals and we’ll respond within two business days.
            </p>
            <p className="lg:hidden">
              <a className="hover:underline" href={`tel:${site.phone.replace(/\D/g, "")}`}>
                {site.phone}
              </a>
              {" · "}
              <a className="hover:underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </p>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          noValidate
          className="flex w-full flex-col gap-4 rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-bg-page)] px-5 py-6 md:gap-5 md:p-10 lg:max-w-[560px] lg:justify-self-end"
          aria-busy={status === "loading"}
        >
          <TextInput
            id="fullName"
            name="fullName"
            label="Full name (required)"
            placeholder="Jane Rivera"
            autoComplete="name"
            required
            error={errors.fullName}
            disabled={status === "loading"}
          />
          <TextInput
            id="email"
            name="email"
            type="email"
            label="Email address (required)"
            placeholder="jane@organization.org"
            autoComplete="email"
            required
            error={errors.email}
            disabled={status === "loading"}
          />
          <TextTextarea
            id="message"
            name="message"
            label="How can we help? (required)"
            placeholder="Tell us about your goal…"
            required
            rows={4}
            error={errors.message}
            disabled={status === "loading"}
          />
          <p className="text-sm leading-[22px] text-[var(--color-text-primary)]">
            By providing your information, you consent to receive messages by email,
            from System Weavers.
          </p>
          <Button
            type="submit"
            className="w-full justify-center"
            disabled={status === "loading"}
            aria-busy={status === "loading"}
          >
            {status === "loading"
              ? "Sending…"
              : "I accept, connect with the Weavers"}
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
      </div>
    </section>
  );
}
