-- =====================================================================
-- Cornerstone — projects / portfolio (Phase 2)
-- =====================================================================
-- Run AFTER schema.sql and storage.sql.
-- Cards now; the extra columns (scope, key_stats, body) + project_images
-- gallery are filled in by the Phase 3 full project pages.
-- =====================================================================

create table if not exists public.projects (
  id              uuid primary key default gen_random_uuid(),
  slug            text unique not null,
  name            text not null default '',   -- full project title (detail-page H1)
  category        text not null default '',   -- card label / page eyebrow
  summary         text not null default '',    -- card caption / page lead
  location        text not null default '',
  scope           text not null default '',    -- (Phase 3)
  cover_image_url text,
  key_stats       jsonb not null default '[]'::jsonb,  -- (Phase 3)
  body            text not null default '',    -- (Phase 3)
  is_published    boolean not null default false,      -- new projects start as drafts
  sort_order      int not null default 0,
  updated_at      timestamptz not null default now()
);

-- Safe if you ran an earlier version of this file without the name column.
alter table public.projects add column if not exists name text not null default '';

create table if not exists public.project_images (
  id         uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  image_url  text not null,
  alt        text not null default '',
  sort_order int  not null default 0,
  updated_at timestamptz not null default now()
);
create index if not exists project_images_project_id_idx
  on public.project_images(project_id);

-- RLS: published projects are public; logged-in admins see/write everything.
alter table public.projects       enable row level security;
alter table public.project_images enable row level security;

create policy "projects read"  on public.projects
  for select using (is_published or (select auth.uid()) is not null);
create policy "projects write" on public.projects
  for all using ((select auth.uid()) is not null)
  with check ((select auth.uid()) is not null);

create policy "project_images read"  on public.project_images
  for select using (true);
create policy "project_images write" on public.project_images
  for all using ((select auth.uid()) is not null)
  with check ((select auth.uid()) is not null);

create trigger t_projects
  before update on public.projects
  for each row execute function public.set_updated_at();
create trigger t_project_images
  before update on public.project_images
  for each row execute function public.set_updated_at();

-- Seed the current three demo cards (published) so Selected Work isn't empty.
insert into public.projects (slug, category, summary, cover_image_url, sort_order, is_published) values
('residential-subdivision', 'Residential Subdivision', 'Site design through build-ready lots', '/subdivision.jpg', 1, true),
('civil-site-design',       'Civil & Site Design',     'Grading, drainage, and construction plans', '/engineer.jpg', 2, true),
('land-boundary-survey',    'Land & Boundary Survey',  'Boundary, topographic, and platting', '/IMG_0854.jpg', 3, true)
on conflict (slug) do nothing;
