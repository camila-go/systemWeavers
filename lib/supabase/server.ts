import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Prefer `SUPABASE_URL`. The `NEXT_PUBLIC_` prefix marks a value as safe to ship
 * to the browser, which is misleading here — this URL is only ever read on the
 * server, next to the service-role key. The legacy name still works so existing
 * deployments keep running; `SUPABASE_URL` wins when both are set.
 */
function readUrl(): string | undefined {
  return process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
}

/** Names of the required env vars that are missing, for server-side logging. */
export function missingSupabaseEnv(): string[] {
  const missing: string[] = [];
  if (!readUrl()) missing.push("SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL)");
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    missing.push("SUPABASE_SERVICE_ROLE_KEY");
  }
  return missing;
}

export function getServiceSupabase(): SupabaseClient | null {
  const url = readUrl();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
