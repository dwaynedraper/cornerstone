-- Call-to-action tracking (Nov 12).
-- Counts the Nav Contact button, phone and email links, and successful
-- contact form sends. Same privacy rules as page_views: no cookies, no IP,
-- a visitor hash that changes daily.
-- Safe to run more than once. Run it in the Supabase SQL Editor.

create table if not exists public.cta_events (
  id            bigint generated always as identity primary key,
  day           date not null,
  cta           text not null,          -- nav_contact, phone, email, contact_form, contact_button
  placement     text not null default 'page',  -- header, footer, hero, cta-band, contact-page, form, page
  path          text not null,
  country       text,
  region        text,
  visitor_hash  text not null,
  created_at    timestamptz not null default now()
);
create index if not exists cta_events_day_idx on public.cta_events (day);
alter table public.cta_events enable row level security;

-- Signed-in admins can read. Only the server (service role) can write.
drop policy if exists "cta_events read" on public.cta_events;
create policy "cta_events read" on public.cta_events
  for select using ((select auth.uid()) is not null);

-- Everything the Actions view needs in one call.
-- p_cta filters to one call to action. Null means all of them.
-- by_cta is never filtered, so the filter buttons can show their counts.
create or replace function public.cta_summary(p_from date, p_to date, p_cta text default null)
returns json
language sql
stable
security invoker
set search_path = public
as $fn$
  with allrows as (
    select * from public.cta_events where day between p_from and p_to
  ),
  e as (
    select * from allrows where p_cta is null or cta = p_cta
  ),
  days as (
    select generate_series(p_from, p_to, interval '1 day')::date as day
  )
  select json_build_object(
    'daily', (
      select coalesce(json_agg(json_build_object('day', d.day, 'actions', coalesce(x.n, 0)) order by d.day), '[]'::json)
      from days d
      left join (select day, count(*) as n from e group by day) x on x.day = d.day
    ),
    'actions', (select count(*) from e),
    'people',  (select count(distinct (day, visitor_hash)) from e),
    'by_cta', (
      select coalesce(json_agg(t), '[]'::json) from (
        select cta, count(*) as actions from allrows group by cta order by actions desc
      ) t
    ),
    'by_place', (
      select coalesce(json_agg(t), '[]'::json) from (
        select cta, placement, path, count(*) as actions
        from e group by cta, placement, path order by actions desc limit 12
      ) t
    )
  );
$fn$;
