-- Run in Supabase SQL editor if MCP migration cannot connect.
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  message text not null,
  consent boolean not null default false,
  source text default 'website',
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

comment on table public.leads is 'Website contact form leads';
