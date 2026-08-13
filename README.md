# System Weavers

Production marketing site for System Weavers Collaborative Consulting — Home and About pages from the Figma Direction A design, with a contact form that stores leads in Supabase and emails via Resend.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Supabase (`leads` table)
- Resend (optional until credentials are provided)

## Setup

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local`:

| Variable | Required | Notes |
|----------|----------|--------|
| `SUPABASE_URL` | Yes | Project URL. `NEXT_PUBLIC_SUPABASE_URL` is still accepted as a legacy alias, but this value is server-only, so it should not carry the browser-facing `NEXT_PUBLIC_` prefix |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Server-only; never expose to the client |
| `RESEND_API_KEY` | Later | Optional until you provide keys |
| `RESEND_FROM_EMAIL` | Later | Verified sender |
| `LEAD_TO_EMAIL` | Later | Inbox for lead notifications |

Apply the leads schema in the Supabase SQL editor:

[`supabase/migrations/20260731_create_leads.sql`](supabase/migrations/20260731_create_leads.sql)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

- `/` — Home
- `/about` — About / services
- `POST /api/leads` — contact form handler

Until Resend env vars are set, the API still saves leads to Supabase and skips email.

## Troubleshooting

**The contact form says it couldn't send your message.** `POST /api/leads`
returns 503 when the Supabase credentials are missing and 500 when the insert
itself fails. Check the hosting provider's runtime logs — on 503 the handler
names exactly which env vars it could not find. Set them on the **Production**
environment (not just Preview/Development) and redeploy.

Note that leads only reach the database when a deploy actually succeeds. If
`next build` is failing, production keeps serving the last good build, so newly
added env vars and fixes never go live — run `npm run build` locally before
assuming a config change took effect.
