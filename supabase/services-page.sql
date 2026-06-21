-- =====================================================================
-- Cornerstone — give the /services page its own service list
-- =====================================================================
-- Run AFTER schema.sql. Tags each service row with the page it belongs to
-- ('home' or 'services'), and seeds a separate 'services'-page copy of the
-- current home services so the /services page isn't empty. Safe to re-run.
-- =====================================================================

alter table public.services
  add column if not exists page text not null default 'home';

-- One-time: copy the current home services into a separate 'services' set.
insert into public.services (slug, name, icon, summary, detail, sort_order, is_published, page)
select slug || '-sp', name, icon, summary, detail, sort_order, is_published, 'services'
from public.services
where page = 'home'
  and not exists (select 1 from public.services where page = 'services');
