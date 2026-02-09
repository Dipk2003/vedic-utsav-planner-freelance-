create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  email text not null,
  event_type text not null,
  event_date date,
  guest_count text,
  city text not null,
  message text,
  source text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;

drop policy if exists "Allow public insert" on public.leads;
create policy "Allow public insert" on public.leads
  for insert
  to anon, authenticated
  with check (true);
