-- Nov 12: the 25 years of experience belongs to Mitch, not the firm.
-- Safe to run more than once. Run it in the Supabase SQL Editor.
--
-- 1. Intro paragraph above Our Services: new approved wording.
-- 2. Stats bar: approved by Dean, shows 25+ years and 15+ states.

update public.site_settings
set value = $q$Our founder and CEO brings more than 25 years of engineering experience to every project. At Cornerstone Engineering & Surveying, we pair modern design techniques with time-tested principles, and our licensed professional engineers and registered professional land surveyors are dedicated to delivering innovative, sustainable, and cost-effective solutions for our clients.$q$
where key = 'services_intro';

insert into public.site_settings (key, value) values
  ('stat_years', '25+'),
  ('stat_states', '15+')
on conflict (key) do update set value = excluded.value;

-- Check the result
select key, left(value, 80) as value
from public.site_settings
where key in ('services_intro', 'stat_years', 'stat_states');
