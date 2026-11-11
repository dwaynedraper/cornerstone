-- =====================================================================
-- Cornerstone — image storage (Phase 1)
-- =====================================================================
-- Run AFTER schema.sql. Supabase dashboard → SQL Editor → paste → Run.
-- Creates a public image bucket + a table of named image "slots" (hero, …).
-- Uploads are admin-only (logged-in); the images themselves are public.
-- =====================================================================

-- Public bucket that holds admin-uploaded images.
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- Anyone can READ objects in this bucket (it's a public bucket);
-- only logged-in admins can upload / replace / remove.
create policy "media public read"
  on storage.objects for select
  using (bucket_id = 'media');

create policy "media admin insert"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'media');

create policy "media admin update"
  on storage.objects for update to authenticated
  using (bucket_id = 'media');

create policy "media admin delete"
  on storage.objects for delete to authenticated
  using (bucket_id = 'media');

-- Named image slots used by the site (e.g. 'hero'). One row per slot.
create table if not exists public.media (
  slot       text primary key,
  image_url  text not null,
  updated_at timestamptz not null default now()
);

alter table public.media enable row level security;

create policy "media slots read"
  on public.media for select using (true);

create policy "media slots write"
  on public.media for all
  using ((select auth.uid()) is not null)
  with check ((select auth.uid()) is not null);

create trigger t_media
  before update on public.media
  for each row execute function public.set_updated_at();
