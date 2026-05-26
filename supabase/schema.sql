-- Supabase schema for DealFlow
-- Table: leads

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  name text not null,
  company text,
  email text,
  phone text,
  source text,
  status text not null,
  deal_value numeric,
  next_follow_up_date date,
  last_contacted_date date,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists leads_user_idx on public.leads(user_id);
create index if not exists leads_status_idx on public.leads(status);

-- Row level security: users can only manage their rows
alter table public.leads enable row level security;

create policy "users_can_manage_own_leads" on public.leads
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Helper: simple status counts (rpc)
create or replace function public.leads_count_by_status()
returns table(status text, count int)
language sql stable as $$
  select status, count(*) from public.leads group by status order by count desc;
$$;
