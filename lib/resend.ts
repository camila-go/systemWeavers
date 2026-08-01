import { Resend } from "resend";

export function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export function getLeadEmailConfig() {
  return {
    from: process.env.RESEND_FROM_EMAIL,
    to: process.env.LEAD_TO_EMAIL,
  };
}
