create extension if not exists pgcrypto;

create table if not exists public.crm_leads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lead_key text not null,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint crm_leads_user_lead_key_unique unique (user_id, lead_key)
);

create index if not exists crm_leads_user_id_idx
  on public.crm_leads (user_id);

create index if not exists crm_leads_user_updated_at_idx
  on public.crm_leads (user_id, updated_at desc);

create or replace function public.set_crm_leads_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_crm_leads_updated_at on public.crm_leads;

create trigger set_crm_leads_updated_at
before update on public.crm_leads
for each row
execute function public.set_crm_leads_updated_at();

alter table public.crm_leads enable row level security;
alter table public.crm_leads force row level security;

grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on public.crm_leads to authenticated;

drop policy if exists crm_leads_select_own on public.crm_leads;
drop policy if exists crm_leads_insert_own on public.crm_leads;
drop policy if exists crm_leads_update_own on public.crm_leads;
drop policy if exists crm_leads_delete_own on public.crm_leads;

create policy crm_leads_select_own
on public.crm_leads
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy crm_leads_insert_own
on public.crm_leads
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy crm_leads_update_own
on public.crm_leads
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy crm_leads_delete_own
on public.crm_leads
for delete
to authenticated
using ((select auth.uid()) = user_id);
