-- =====================================================================
-- Cornerstone Engineering & Surveying — admin/CMS database
-- =====================================================================
-- WHAT THIS DOES
--   Creates the tables the website content will live in, locks them down
--   with Row-Level Security (anyone can READ, only logged-in admins can
--   WRITE), and seeds them with the exact content that's on the site today.
--
-- HOW TO RUN
--   Supabase dashboard → SQL Editor → New query → paste this whole file → Run.
--   Safe to re-run: it drops and recreates the content tables each time.
--   (It never touches Supabase's auth/users — your logins are safe.)
--
-- SECURITY MODEL
--   Writes require a logged-in user (auth.uid() is not null). Keep email
--   signups DISABLED in Authentication → Providers, so the only accounts
--   that exist are the ones Mitch invites. Invite-only = approved-only.
-- =====================================================================

create extension if not exists "pgcrypto";  -- for gen_random_uuid()

-- Auto-stamp updated_at on every write -----------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql
set search_path = ''   -- pin search_path (clears the "mutable" advisor warning)
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Re-runnable: clear the content tables (auth.users is never touched) ------
drop table if exists public.team_members cascade;
drop table if exists public.team_groups  cascade;
drop table if exists public.services     cascade;
drop table if exists public.why_points   cascade;
drop table if exists public.faqs         cascade;
drop table if exists public.site_settings cascade;


-- =====================================================================
-- TABLES
-- =====================================================================

-- Services (home page "Our services") ------------------------------------
create table public.services (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  name         text not null,
  icon         text not null,   -- civil | structural | survey | management | sustainable
  summary      text not null,   -- always-visible line
  detail       text not null,   -- "Read more" copy
  sort_order   int  not null default 0,
  is_published boolean not null default true,
  updated_at   timestamptz not null default now()
);

-- Team: groups (About page sections) -------------------------------------
create table public.team_groups (
  id         uuid primary key default gen_random_uuid(),
  slug       text unique not null,
  name       text not null,    -- e.g. "Civil Team"
  sort_order int  not null default 0,
  updated_at timestamptz not null default now()
);

-- Team: members ----------------------------------------------------------
create table public.team_members (
  id         uuid primary key default gen_random_uuid(),
  group_id   uuid not null references public.team_groups(id) on delete cascade,
  name       text not null,
  role       text not null,
  image_url  text,             -- optional headshot (falls back to initials)
  bio        text,             -- optional
  sort_order int  not null default 0,
  updated_at timestamptz not null default now()
);
create index team_members_group_id_idx on public.team_members(group_id);

-- Why choose us ----------------------------------------------------------
create table public.why_points (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  icon         text not null,  -- builders | oneFirm | local | national
  title        text not null,
  description  text not null,
  sort_order   int  not null default 0,
  is_published boolean not null default true,
  updated_at   timestamptz not null default now()
);

-- FAQ (also feeds the FAQ rich-results schema) ---------------------------
create table public.faqs (
  id           uuid primary key default gen_random_uuid(),
  question     text not null,
  answer       text not null,
  sort_order   int  not null default 0,
  is_published boolean not null default true,
  updated_at   timestamptz not null default now()
);

-- Editable copy + contact info (simple key/value) ------------------------
create table public.site_settings (
  key        text primary key,
  value      text not null default '',
  updated_at timestamptz not null default now()
);

-- updated_at triggers ----------------------------------------------------
create trigger t_services      before update on public.services      for each row execute function public.set_updated_at();
create trigger t_team_groups   before update on public.team_groups   for each row execute function public.set_updated_at();
create trigger t_team_members  before update on public.team_members  for each row execute function public.set_updated_at();
create trigger t_why_points    before update on public.why_points    for each row execute function public.set_updated_at();
create trigger t_faqs          before update on public.faqs          for each row execute function public.set_updated_at();
create trigger t_site_settings before update on public.site_settings for each row execute function public.set_updated_at();


-- =====================================================================
-- ROW-LEVEL SECURITY  (read = public, write = logged-in admin)
-- =====================================================================
alter table public.services      enable row level security;
alter table public.team_groups   enable row level security;
alter table public.team_members  enable row level security;
alter table public.why_points    enable row level security;
alter table public.faqs          enable row level security;
alter table public.site_settings enable row level security;

-- Published content is world-readable; logged-in admins see everything.
create policy "services read"  on public.services  for select using (is_published or (select auth.uid()) is not null);
create policy "why read"       on public.why_points for select using (is_published or (select auth.uid()) is not null);
create policy "faqs read"      on public.faqs      for select using (is_published or (select auth.uid()) is not null);
create policy "groups read"    on public.team_groups   for select using (true);
create policy "members read"   on public.team_members  for select using (true);
create policy "settings read"  on public.site_settings for select using (true);

-- Only logged-in users may insert/update/delete.
create policy "services write"  on public.services      for all using ((select auth.uid()) is not null) with check ((select auth.uid()) is not null);
create policy "why write"       on public.why_points    for all using ((select auth.uid()) is not null) with check ((select auth.uid()) is not null);
create policy "faqs write"      on public.faqs          for all using ((select auth.uid()) is not null) with check ((select auth.uid()) is not null);
create policy "groups write"    on public.team_groups   for all using ((select auth.uid()) is not null) with check ((select auth.uid()) is not null);
create policy "members write"   on public.team_members  for all using ((select auth.uid()) is not null) with check ((select auth.uid()) is not null);
create policy "settings write"  on public.site_settings for all using ((select auth.uid()) is not null) with check ((select auth.uid()) is not null);


-- =====================================================================
-- SEED — current live content
-- =====================================================================

-- Services ---------------------------------------------------------------
insert into public.services (slug, name, icon, summary, detail, sort_order) values
('civil-engineering', $c$Civil Engineering$c$, 'civil',
 $c$Site and subdivision design that turns raw North Texas acreage into build-ready residential lots.$c$,
 $c$Our civil engineers handle the full scope of residential land development — grading and drainage, water and sanitary sewer design, paving and street layout, stormwater management, and full construction plans. We design subdivisions that move smoothly from concept through city and county approval to a build-ready site, so your homebuilders can start vertical construction on schedule.$c$, 1),
('structural-engineering', $c$Structural Engineering$c$, 'structural',
 $c$Foundation, framing, and load design that keeps what you build standing strong — across Texas and beyond.$c$,
 $c$Our structural engineers handle the systems that hold a project up — foundations and slabs, wood and steel framing, and wind and load analysis designed and stamped to code. From single homes to larger structures, and licensed in 15+ states, we back builders and developers well beyond North Texas.$c$, 2),
('land-surveying', $c$Land Surveying$c$, 'survey',
 $c$Accurate boundary, topographic, and construction surveys — plus the platting that gets your lots recorded.$c$,
 $c$Using current GPS and robotic equipment, our registered professional land surveyors deliver boundary surveys, topographic surveys, ALTA/NSPS land title surveys, and construction staking. We also prepare and process the subdivision plats that turn a tract of land into recorded, sellable residential lots.$c$, 3),
('project-management', $c$Project Management$c$, 'management',
 $c$One team guiding your project from raw land through entitlements to a finished, recorded subdivision.$c$,
 $c$We manage the moving parts most developers would rather not chase — coordinating with city and county jurisdictions, navigating entitlements and permitting, and keeping engineering, surveying, and construction in step. The result is fewer surprises, predictable timelines, and lots delivered when your builders need them.$c$, 4),
('sustainable-design', $c$Sustainable Design$c$, 'sustainable',
 $c$Responsible drainage, grading, and land-use practices that protect the site and satisfy reviewers.$c$,
 $c$Smart, sustainable site design is more than good stewardship — it clears reviews faster and protects your investment. We design for effective stormwater management, erosion control, and responsible land use that meets current regulatory standards across the jurisdictions where we work.$c$, 5);

-- Team groups ------------------------------------------------------------
insert into public.team_groups (slug, name, sort_order) values
('executive-leadership', $c$Executive Leadership$c$, 1),
('administration',       $c$Administration$c$,       2),
('civil-team',           $c$Civil Team$c$,           3),
('structural-team',      $c$Structural Team$c$,      4),
('survey-team',          $c$Survey Team$c$,          5);

-- Team members (joined to their group by slug) ---------------------------
insert into public.team_members (group_id, name, role, sort_order)
select id, $c$Mitch Lenamond, P.E.$c$, $c$Founder and CEO$c$, 1 from public.team_groups where slug='executive-leadership'
union all select id, $c$Bailey Lenamond$c$, $c$Chief Operating Officer$c$, 2 from public.team_groups where slug='executive-leadership'
union all select id, $c$Mallory Draper$c$, $c$Operations Manager$c$, 1 from public.team_groups where slug='administration'
union all select id, $c$Katie Holmes$c$, $c$Coordinator$c$, 2 from public.team_groups where slug='administration'
union all select id, $c$Jason Lenamond$c$, $c$P.E.$c$, 1 from public.team_groups where slug='civil-team'
union all select id, $c$Eric Chavez$c$, $c$E.I.T.$c$, 2 from public.team_groups where slug='civil-team'
union all select id, $c$Tj Gonzales$c$, $c$E.I.T.$c$, 3 from public.team_groups where slug='civil-team'
union all select id, $c$Chris Poole$c$, $c$Regional Structural Manager$c$, 1 from public.team_groups where slug='structural-team'
union all select id, $c$Jeremy Barnes$c$, $c$Senior Structural Designer$c$, 2 from public.team_groups where slug='structural-team'
union all select id, $c$Jacob Holmes$c$, $c$R.P.L.S.$c$, 1 from public.team_groups where slug='survey-team'
union all select id, $c$Dayhibe Montilva$c$, $c$Senior Survey Technician$c$, 2 from public.team_groups where slug='survey-team'
union all select id, $c$Eddie Okala$c$, $c$Party Chief$c$, 3 from public.team_groups where slug='survey-team'
union all select id, $c$Ryan Korinek$c$, $c$Party Chief$c$, 4 from public.team_groups where slug='survey-team';

-- Why choose us ----------------------------------------------------------
insert into public.why_points (slug, icon, title, description, sort_order) values
('built-for-builders', 'builders', $c$Built for builders$c$,
 $c$We understand production schedules. We deliver lots that are ready when your crews are, and we keep the pipeline moving.$c$, 1),
('one-firm', 'oneFirm', $c$Two disciplines, one firm$c$,
 $c$Engineering and surveying under one roof means tighter coordination, fewer handoffs, and one point of accountability.$c$, 2),
('north-texas', 'local', $c$North Texas know-how$c$,
 $c$We know the jurisdictions, reviewers, and requirements across North Texas — so plats and permits move faster.$c$, 3),
('licensed-nationwide', 'national', $c$Licensed nationwide$c$,
 $c$Most of our work is North Texas, but we're licensed in 15+ states for builders and developers who need us beyond the metroplex.$c$, 4);

-- FAQ --------------------------------------------------------------------
insert into public.faqs (question, answer, sort_order) values
($c$Do you work with production and volume homebuilders?$c$,
 $c$Yes. A large share of our work is residential land development for production homebuilders — designing and surveying subdivisions and delivering build-ready lots on the schedules builders run on.$c$, 1),
($c$What areas do you serve?$c$,
 $c$We're based in North Texas and do most of our work across the region. We're also licensed in more than 15 states and take on residential and development projects nationwide.$c$, 2),
($c$Can you take a project from raw land all the way to recorded lots?$c$,
 $c$Yes. We handle the full path — civil engineering, surveying, platting, and coordination with city and county jurisdictions — so a raw tract becomes recorded, build-ready residential lots.$c$, 3),
($c$Do you handle one-off lots for custom builders, or only large subdivisions?$c$,
 $c$Both. Subdivisions are our focus, but we regularly handle one-off engineering and survey work for individual builders and lots.$c$, 4),
($c$How do I get started or request a quote?$c$,
 $c$Call us at (817) 940-6027 or send a note through our contact page with a little about your site or project. We'll get back to you to talk scope and timeline.$c$, 5);

-- Editable copy + contact info ------------------------------------------
insert into public.site_settings (key, value) values
('contact_phone',         $c$+18179406027$c$),
('contact_phone_display', $c$(817) 940-6027$c$),
('contact_email',         $c$info@cesinbox.com$c$),
('address_street',        $c$5000 S Collins St, Suite 209$c$),
('address_city',          $c$Arlington$c$),
('address_state',         $c$TX$c$),
('address_zip',           $c$76018$c$),
('stat_years',            $c$25+$c$),
('stat_states',           $c$15+$c$),
('hero_eyebrow',          $c$Civil Engineering + Land Surveying · North Texas$c$),
('hero_headline',         $c$Cornerstone Engineering & Surveying$c$),
('hero_subhead',          $c$We take raw land to recorded, build-ready lots — and keep your pipeline moving for the next phase.$c$),
('services_intro',        $c$For more than 25 years, Cornerstone has helped North Texas developers and homebuilders turn raw land into build-ready residential lots — engineering and surveying, under one roof.$c$),
('about_heading',         $c$The people behind your projects$c$),
('about_subhead',         $c$A licensed, hands-on team of engineers and surveyors who know North Texas land development — and how to keep a builder's pipeline moving.$c$),
('about_intro_1',         $c$From seasoned engineers with decades of expertise to sharp young talent bringing fresh perspective, every member of our team plays a role in delivering build-ready results. We pride ourselves on a collaborative approach — combining individual strengths to tackle complex sites and drive projects to completion.$c$),
('about_intro_2',         $c$Our engineers and surveyors aren't just technically proficient; they're problem-solvers who thrive on turning raw land into reality. Whether it's designing infrastructure, running precise surveys, or shepherding a plat through approval, the team brings precision and attention to every project.$c$),
('founder_name',          $c$Mitchell Lenamond$c$),
('founder_title',         $c$Licensed Professional Engineer$c$),
('founder_bio_1',         $c$Mitchell K. Lenamond, P.E., is a highly experienced professional engineer with over two decades of expertise in structural and civil engineering. His experience includes roles such as Vice President of Engineering, where he oversaw a team of 180+ professionals across multiple office locations, managing engineering, surveying, and architectural projects. His leadership extends to client relations, project planning, budgeting, and regulatory compliance, ensuring that each project meets the highest standards of quality and efficiency.$c$),
('founder_bio_2',         $c$Mitchell's extensive engineering background includes designing commercial and residential structures, specializing in foundation and framing systems, wind load analysis, and infrastructure projects such as highway bridges and culverts. His civil engineering expertise encompasses site feasibility studies, zoning coordination, grading, drainage, and utility planning. Additionally, he is well-versed in forensic inspections, providing structural assessments, foundation deflection analysis, and expert witness testimony.$c$),
('founder_quote',         $c$With a reputation for precision and excellence, Mitchell remains dedicated to delivering innovative, reliable engineering solutions that drive success for clients and communities alike.$c$);
