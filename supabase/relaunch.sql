-- =====================================================================
-- Cornerstone relaunch migration (November 2026)
--
-- Run ONCE in the Supabase SQL Editor, after schema.sql, storage.sql,
-- projects.sql and services-page.sql. Safe to re-run: the content reset
-- only happens the first time.
--
-- What it does:
--   1. Turns every item written for the June redesign into a hidden
--      "suggested" draft. Nothing is deleted. Mitch can publish any of
--      them later from the admin with one click.
--   2. Restores the wording that is live on the site today.
--   3. Syncs the team roster (Brad West in, Tj Gonzales and Jeremy Barnes out).
--   4. Adds private, cookie-free visitor analytics.
--   5. Adds per-person admin settings (weekly email on/off).
-- =====================================================================

-- Tracks one-time steps so re-running never overwrites later edits.
create table if not exists public.app_migrations (
  id     text primary key,
  ran_at timestamptz not null default now()
);
alter table public.app_migrations enable row level security;

-- "Suggested" flag on every list the admin edits.
alter table public.services   add column if not exists is_suggestion boolean not null default false;
alter table public.why_points add column if not exists is_suggestion boolean not null default false;
alter table public.faqs       add column if not exists is_suggestion boolean not null default false;
alter table public.projects   add column if not exists is_suggestion boolean not null default false;

do $migration$
begin
  if exists (select 1 from public.app_migrations where id = 'relaunch-content-2026-11') then
    raise notice 'Content reset already ran. Skipping.';
    return;
  end if;

  -- 1. Everything that exists today came from the June redesign. Park it.
  update public.services
     set is_suggestion = true, is_published = false,
         slug = case when slug like 'suggested-%' then slug else 'suggested-' || slug end;
  update public.why_points
     set is_suggestion = true, is_published = false,
         slug = case when slug like 'suggested-%' then slug else 'suggested-' || slug end;
  update public.faqs     set is_suggestion = true, is_published = false;
  update public.projects set is_suggestion = true, is_published = false;

  -- 2. Approved live wording (generated from src/lib/settings-fields.ts and src/data/*).
  -- Page text back to the approved live wording (blank = hidden)
  insert into public.site_settings (key, value) values
    ($q$hero_eyebrow$q$, $q$Welcome to$q$),
    ($q$hero_headline$q$, $q$Cornerstone Engineering & Surveying$q$),
    ($q$hero_subhead$q$, $q$$q$),
    ($q$hero_cta_label$q$, $q$$q$),
    ($q$services_intro$q$, $q$Our founder and CEO brings more than 25 years of engineering experience to every project. At Cornerstone Engineering & Surveying, we pair modern design techniques with time-tested principles, and our licensed professional engineers and registered professional land surveyors are dedicated to delivering innovative, sustainable, and cost-effective solutions for our clients.$q$),
    ($q$stat_years$q$, $q$25+$q$),
    ($q$stat_states$q$, $q$15+$q$),
    ($q$why_closing$q$, $q$Whether you're planning a small residential development or a large-scale infrastructure project, Cornerstone Engineering & Surveying has the knowledge, skills, and dedication to bring your vision to life. Contact us today to discuss how we can help you achieve your project goals.$q$),
    ($q$cta_heading$q$, $q$$q$),
    ($q$cta_body$q$, $q$$q$),
    ($q$about_heading$q$, $q$About Us$q$),
    ($q$about_subhead$q$, $q$At the heart of our success lies a diverse and talented group of professionals dedicated to excellence in civil engineering and surveying. Our team brings together a wealth of experience, innovative thinking, and a commitment to precision that sets us apart in the industry.$q$),
    ($q$about_intro_1$q$, $q$From seasoned engineers with decades of expertise to bright young talents bringing fresh perspectives, each member of our team plays a crucial role in delivering outstanding results for our clients. We pride ourselves on our collaborative approach, combining our individual strengths to tackle complex challenges and drive projects to successful completion.$q$),
    ($q$about_intro_2$q$, $q$Our engineers and surveyors are not just technically proficient; they are passionate problem-solvers who thrive on turning vision into reality. Whether it's designing sustainable infrastructure, conducting precise land surveys, or developing cutting-edge solutions for urban development, our team approaches each project with enthusiasm and meticulous attention to detail.$q$),
    ($q$about_intro_3$q$, $q$We believe in continuous learning and stay at the forefront of industry advancements, ensuring that we bring the latest technologies and methodologies to every project. Our commitment to professional development means that when you work with us, you're partnering with a team that's always evolving and improving.$q$),
    ($q$about_callout$q$, $q$Get to know the individuals who make our company a leader in civil engineering and surveying. Each team member below brings unique skills and experiences that contribute to our collective success and your project's triumph.$q$),
    ($q$founder_name$q$, $q$Mitchell Lenamond$q$),
    ($q$founder_title$q$, $q$Licensed Professional Engineer$q$),
    ($q$founder_bio_1$q$, $q$Mitchell K. Lenamond, P.E., is a highly experienced professional engineer with over two decades of expertise in structural and civil engineering. His experience includes roles such as Vice President of Engineering, where he oversaw a team of 180+ professionals across multiple office locations, managing engineering, surveying, and architectural projects. His leadership extends to client relations, project planning, budgeting, and regulatory compliance, ensuring that each project meets the highest standards of quality and efficiency.$q$),
    ($q$founder_bio_2$q$, $q$Mitchell's extensive engineering background includes designing commercial and residential structures, specializing in foundation and framing systems, wind load analysis, and infrastructure projects such as highway bridges and culverts. His civil engineering expertise encompasses site feasibility studies, zoning coordination, grading, drainage, and utility planning. Additionally, he is well-versed in forensic inspections, providing structural assessments, foundation deflection analysis, and expert witness testimony.$q$),
    ($q$founder_quote$q$, $q$With a reputation for precision and excellence, Mitchell remains dedicated to delivering innovative, reliable engineering solutions that drive success for clients and communities alike.$q$),
    ($q$services_page_heading$q$, $q$Comprehensive Civil Engineering and Surveying Services$q$),
    ($q$services_page_intro$q$, $q$From precise land surveys to complex infrastructure design, our team of experienced professionals delivers innovative solutions tailored to your project's unique needs. We combine cutting-edge technology with decades of expertise to ensure your project's success.$q$),
    ($q$contact_intro$q$, $q$Reach out to a member of our team for information, quotes, or to learn more about our services.$q$),
    ($q$contact_phone_display$q$, $q$+1 817-940-6027$q$),
    ($q$contact_phone$q$, $q$+18179406027$q$),
    ($q$contact_email$q$, $q$info@cesinbox.com$q$),
    ($q$address_street$q$, $q$5000 S Collins St, Suite 209$q$),
    ($q$address_city$q$, $q$Arlington$q$),
    ($q$address_state$q$, $q$TX$q$),
    ($q$address_zip$q$, $q$76018$q$),
    ($q$footer_tagline$q$, $q$$q$)
  on conflict (key) do update set value = excluded.value;

  -- Approved services (home list and /services list)
  insert into public.services (slug, name, icon, summary, detail, sort_order, is_published, is_suggestion, page) values
    ($q$civil-engineering$q$, $q$Civil Engineering$q$, $q$civil$q$, $q$From site development and infrastructure design to environmental compliance, we handle projects of all scales with precision and care$q$, '', 1, true, false, $q$home$q$),
    ($q$land-surveying$q$, $q$Land Surveying$q$, $q$survey$q$, $q$Utilizing state-of-the-art equipment and techniques, we provide accurate and reliable surveying services for boundary determination, topographic mapping, and construction layout.$q$, '', 2, true, false, $q$home$q$),
    ($q$project-management$q$, $q$Project Management$q$, $q$management$q$, $q$We oversee your project from concept to completion, ensuring seamless coordination and timely delivery$q$, '', 3, true, false, $q$home$q$),
    ($q$sustainable-design$q$, $q$Sustainable Design$q$, $q$sustainable$q$, $q$Our commitment to environmental stewardship is reflected in our sustainable development practices.$q$, '', 4, true, false, $q$home$q$),
    ($q$civil-engineering-sp$q$, $q$Civil Engineering$q$, $q$civil$q$, $q$From site development and infrastructure design to environmental compliance, we handle projects of all scales with precision and care.$q$, '', 1, true, false, $q$services$q$),
    ($q$land-surveying-sp$q$, $q$Land Surveying$q$, $q$survey$q$, $q$Utilizing state-of-the-art equipment and techniques, we provide accurate and reliable surveying services for boundary determination, topographic mapping, and construction layout.$q$, '', 2, true, false, $q$services$q$),
    ($q$project-management-sp$q$, $q$Project Management$q$, $q$management$q$, $q$We oversee your project from concept to completion, ensuring seamless coordination and timely delivery.$q$, '', 3, true, false, $q$services$q$),
    ($q$sustainable-design-sp$q$, $q$Sustainable Design$q$, $q$sustainable$q$, $q$Our commitment to environmental stewardship is reflected in our sustainable development practices.$q$, '', 4, true, false, $q$services$q$)
  on conflict (slug) do nothing;

  -- Approved Why Choose Us points
  insert into public.why_points (slug, icon, title, description, sort_order, is_published, is_suggestion) values
    ($q$expertise$q$, $q$expertise$q$, $q$Expertise$q$, $q$Our team's diverse skill set allows us to tackle complex challenges across various sectors.$q$, 1, true, false),
    ($q$innovation$q$, $q$innovation$q$, $q$Innovation$q$, $q$Utilizing state-of-the-art equipment and techniques, we provide accurate and reliable surveying services for boundary determination, topographic mapping, and construction layout.$q$, 2, true, false),
    ($q$client-centric$q$, $q$client$q$, $q$Client-Centric Approach$q$, $q$We prioritize clear communication and collaboration, tailoring our services to meet your specific needs.$q$, 3, true, false),
    ($q$sustainable-design$q$, $q$sustainable$q$, $q$Sustainable Design$q$, $q$Our commitment to environmental stewardship is reflected in our sustainable development practices.$q$, 4, true, false)
  on conflict (slug) do nothing;

  insert into public.app_migrations (id) values ('relaunch-content-2026-11');
end
$migration$;

-- 3. Team roster, matching the live site (Nov 11, 2026). Idempotent.
delete from public.team_members where name in ('Tj Gonzales', 'Jeremy Barnes');
insert into public.team_members (group_id, name, role, sort_order)
select g.id, 'Brad West', 'Senior Structural Designer', 2
from public.team_groups g
where g.slug = 'structural-team'
  and not exists (select 1 from public.team_members where name = 'Brad West');

-- 4. Visitor analytics ------------------------------------------------------
-- One row per page view. No IP addresses, no cookies, no names. The visitor
-- hash rotates daily, so a person can't be followed from one day to the next.
create table if not exists public.page_views (
  id            bigint generated always as identity primary key,
  day           date not null,
  path          text not null,
  country       text,
  region        text,
  referrer_host text,
  visitor_hash  text not null,
  created_at    timestamptz not null default now()
);
create index if not exists page_views_day_idx on public.page_views (day);
alter table public.page_views enable row level security;

-- Signed-in admins can read. Only the server (service role) can write.
drop policy if exists "page_views read" on public.page_views;
create policy "page_views read" on public.page_views
  for select using ((select auth.uid()) is not null);

-- One call returns everything the dashboard and weekly email need.
create or replace function public.analytics_summary(p_from date, p_to date)
returns json
language sql
stable
security invoker
set search_path = public
as $fn$
  with v as (
    select * from public.page_views where day between p_from and p_to
  ),
  uniques as (
    select day, visitor_hash, max(country) as country, max(region) as region
    from v group by day, visitor_hash
  ),
  days as (
    select generate_series(p_from, p_to, interval '1 day')::date as day
  )
  select json_build_object(
    'daily', (
      select coalesce(json_agg(json_build_object(
               'day', d.day,
               'visitors', coalesce(u.n, 0),
               'pageviews', coalesce(p.n, 0)) order by d.day), '[]'::json)
      from days d
      left join (select day, count(*) as n from uniques group by day) u on u.day = d.day
      left join (select day, count(*) as n from v group by day) p on p.day = d.day
    ),
    'visitors',  (select count(*) from uniques),
    'pageviews', (select count(*) from v),
    'texas',     (select count(*) from uniques where country = 'US' and region = 'TX'),
    'usa',       (select count(*) from uniques where country = 'US'),
    'top_pages', (
      select coalesce(json_agg(t), '[]'::json) from (
        select path, count(*) as views from v group by path order by views desc limit 5
      ) t
    ),
    'top_sources', (
      select coalesce(json_agg(t), '[]'::json) from (
        select coalesce(referrer_host, 'Direct or unknown') as source,
               count(distinct (day, visitor_hash)) as visitors
        from v group by 1 order by visitors desc limit 5
      ) t
    )
  );
$fn$;

-- 5. Admin settings per person ------------------------------------------------
create table if not exists public.admin_profiles (
  user_id       uuid primary key references auth.users (id) on delete cascade,
  email         text not null,
  weekly_report boolean not null default true,
  created_at    timestamptz not null default now()
);
alter table public.admin_profiles enable row level security;

drop policy if exists "admin_profiles own read"   on public.admin_profiles;
drop policy if exists "admin_profiles own insert" on public.admin_profiles;
drop policy if exists "admin_profiles own update" on public.admin_profiles;
create policy "admin_profiles own read"   on public.admin_profiles for select using (user_id = (select auth.uid()));
create policy "admin_profiles own insert" on public.admin_profiles for insert with check (user_id = (select auth.uid()));
create policy "admin_profiles own update" on public.admin_profiles for update using (user_id = (select auth.uid()));
