alter table public.leads enable row level security;

drop policy if exists "Allow authenticated read" on public.leads;
create policy "Allow authenticated read" on public.leads
  for select
  to authenticated
  using (true);
