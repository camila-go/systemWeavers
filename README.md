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
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Project URL |
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
