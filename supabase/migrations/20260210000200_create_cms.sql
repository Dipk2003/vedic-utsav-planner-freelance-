create extension if not exists "pgcrypto";

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  title text not null,
  slug text not null,
  excerpt text,
  content text,
  cover_image text,
  status text not null default 'draft',
  lang text not null default 'en',
  seo_title text,
  seo_description text
);

create unique index if not exists blog_posts_slug_lang_idx on public.blog_posts (slug, lang);
create index if not exists blog_posts_status_idx on public.blog_posts (status);

create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  key text not null,
  lang text not null default 'en',
  value text not null
);

create unique index if not exists site_content_key_lang_idx on public.site_content (key, lang);

create table if not exists public.seo_pages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  page text not null,
  lang text not null default 'en',
  title text not null,
  description text not null
);

create unique index if not exists seo_pages_page_lang_idx on public.seo_pages (page, lang);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_blog_posts_updated_at on public.blog_posts;
create trigger set_blog_posts_updated_at
before update on public.blog_posts
for each row execute function public.set_updated_at();

drop trigger if exists set_site_content_updated_at on public.site_content;
create trigger set_site_content_updated_at
before update on public.site_content
for each row execute function public.set_updated_at();

drop trigger if exists set_seo_pages_updated_at on public.seo_pages;
create trigger set_seo_pages_updated_at
before update on public.seo_pages
for each row execute function public.set_updated_at();

alter table public.blog_posts enable row level security;
alter table public.site_content enable row level security;
alter table public.seo_pages enable row level security;

drop policy if exists "Public read published posts" on public.blog_posts;
create policy "Public read published posts" on public.blog_posts
  for select
  to anon
  using (status = 'published');

drop policy if exists "Admin manage posts" on public.blog_posts;
create policy "Admin manage posts" on public.blog_posts
  for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Public read content" on public.site_content;
create policy "Public read content" on public.site_content
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Admin manage content" on public.site_content;
create policy "Admin manage content" on public.site_content
  for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Public read seo" on public.seo_pages;
create policy "Public read seo" on public.seo_pages
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Admin manage seo" on public.seo_pages;
create policy "Admin manage seo" on public.seo_pages
  for all
  to authenticated
  using (true)
  with check (true);
