import { NextResponse } from "next/server";
import { getLeadEmailConfig, getResend } from "@/lib/resend";
import { getServiceSupabase, missingSupabaseEnv } from "@/lib/supabase/server";
import { leadSchema } from "@/lib/validations/lead";
import type { LeadInput } from "@/lib/validations/lead";

/**
 * Cap the database attempt so a hung or unreachable Supabase can't eat the
 * whole request and take the notification email down with it. The insert may
 * still land afterwards — a late row plus a "not saved" email is a far better
 * outcome than a silently dropped lead.
 */
const STORE_TIMEOUT_MS = 8_000;

/** Writes the lead to Supabase. Returns whether the row actually landed. */
async function storeLead(lead: LeadInput): Promise<boolean> {
  const supabase = getServiceSupabase();

  if (!supabase) {
    // Config detail stays in the server logs — visitors get a generic message.
    console.error(
      `Lead storage is not configured. Missing env vars: ${missingSupabaseEnv().join(", ")}`,
    );
    return false;
  }

  const insert = supabase.from("leads").insert({
    full_name: lead.fullName,
    email: lead.email,
    message: lead.message,
    consent: lead.consent,
    source: "website",
  });

  const timeout = new Promise<"timeout">((resolve) =>
    setTimeout(() => resolve("timeout"), STORE_TIMEOUT_MS),
  );

  const outcome = await Promise.race([insert, timeout]);

  if (outcome === "timeout") {
    console.error(
      `Supabase did not respond within ${STORE_TIMEOUT_MS}ms — lead not confirmed stored; continuing so the email still sends.`,
    );
    return false;
  }

  if (outcome.error) {
    // An unreachable host (paused project, DNS failure) looks nothing like a
    // rejected query, and reads as an app bug unless it's named.
    const detail = `${outcome.error.message} ${outcome.error.details ?? ""}`;
    const unreachable = /fetch failed|ENOTFOUND|ECONNREFUSED|ETIMEDOUT|EAI_AGAIN/i.test(detail);

    console.error(
      unreachable
        ? "Supabase unreachable (is the project paused?) — lead not stored"
        : "Supabase lead insert failed",
      outcome.error,
    );
    return false;
  }

  return true;
}

/** Emails the lead to the team. Returns whether Resend accepted it. */
async function emailLead(lead: LeadInput, stored: boolean): Promise<boolean> {
  const resend = getResend();
  const { from, to } = getLeadEmailConfig();

  if (!resend || !from || to.length === 0) {
    console.info("Resend skipped: missing RESEND_API_KEY / FROM / TO env vars");
    return false;
  }

  const body = [
    `Name: ${lead.fullName}`,
    `Email: ${lead.email}`,
    `Consent: ${lead.consent}`,
    "",
    "Message:",
    lead.message,
  ];

  // When storage failed this email is the ONLY copy of the lead. Say so at the
  // top and in the subject, so it gets acted on rather than assumed to be
  // filed in the database already.
  if (!stored) {
    body.unshift(
      "WARNING: this lead could NOT be saved to the database, so this email is",
      "the only record of it. Please follow up directly and keep this message.",
      "",
    );
  }

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: lead.email,
    subject: stored
      ? `New lead from ${lead.fullName}`
      : `New lead (NOT SAVED) from ${lead.fullName}`,
    text: body.join("\n"),
  });

  if (error) {
    console.error("Resend email failed", error);
    return false;
  }

  return true;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      { error: "Please fix the highlighted fields.", fieldErrors },
      { status: 400 },
    );
  }

  const lead = parsed.data;

  // Storage and email are independent destinations: the database is the
  // record, the email is what puts the lead in front of a human. Neither is
  // allowed to block the other, and the submission counts as captured when
  // EITHER succeeds — only losing both is a failure the visitor should see.
  const stored = await storeLead(lead);
  const emailed = await emailLead(lead, stored);

  if (!stored && !emailed) {
    // Last resort: log the address so the lead is at least recoverable from
    // the logs. Kept to the reply-to address rather than the whole message,
    // since logs are a poor home for personal data.
    console.error(`Lead LOST — neither storage nor email succeeded. Reply-to: ${lead.email}`);
    return NextResponse.json(
      { error: "Could not send your message. Please try again.", code: "unavailable" },
      { status: 503 },
    );
  }

  if (!stored) {
    console.warn(`Lead emailed but NOT stored — database copy missing for ${lead.email}`);
  }
  if (!emailed) {
    console.warn(`Lead stored but NOT emailed — nobody was notified about ${lead.email}`);
  }

  return NextResponse.json({ ok: true });
}
