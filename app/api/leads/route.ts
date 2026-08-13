import { NextResponse } from "next/server";
import { getLeadEmailConfig, getResend } from "@/lib/resend";
import { getServiceSupabase, missingSupabaseEnv } from "@/lib/supabase/server";
import { leadSchema } from "@/lib/validations/lead";

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

  const { fullName, email, message, consent } = parsed.data;
  const supabase = getServiceSupabase();

  if (!supabase) {
    // Config detail stays in the server logs — visitors get a generic message.
    console.error(
      `Lead storage is not configured. Missing env vars: ${missingSupabaseEnv().join(", ")}`,
    );
    return NextResponse.json(
      { error: "Could not send your message. Please try again.", code: "unavailable" },
      { status: 503 },
    );
  }

  const { error: dbError } = await supabase.from("leads").insert({
    full_name: fullName,
    email,
    message,
    consent,
    source: "website",
  });

  if (dbError) {
    console.error("Supabase lead insert failed", dbError);
    return NextResponse.json(
      { error: "Could not save your message. Please try again.", code: "unavailable" },
      { status: 500 },
    );
  }

  const resend = getResend();
  const { from, to } = getLeadEmailConfig();

  if (resend && from && to.length > 0) {
    const { error: emailError } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New lead from ${fullName}`,
      text: [
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Consent: ${consent}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    if (emailError) {
      console.error("Resend email failed", emailError);
      // Lead already saved — still return success
    }
  } else {
    console.info("Resend skipped: missing RESEND_API_KEY / FROM / TO env vars");
  }

  return NextResponse.json({ ok: true });
}
