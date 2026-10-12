-- Execute no SQL Editor do Supabase para criar as tabelas do site.
create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name varchar(160) not null,
  email varchar(254) not null,
  phone varchar(40) not null,
  company_type varchar(80) not null,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title varchar(220) not null,
  slug varchar(240) not null unique,
  excerpt text not null,
  category varchar(80) not null,
  content text not null,
  cover_image text,
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists articles_published_at_idx on public.articles (published_at desc);

alter table public.leads enable row level security;
alter table public.articles enable row level security;

-- O site é estático (GitHub Pages): o formulário grava direto do navegador com a chave pública
-- (anon/publishable). Esta política só aceita inserções com dados válidos, e visitantes não podem ler os contatos.
drop policy if exists "Public can submit valid leads" on public.leads;
create policy "Public can submit valid leads"
  on public.leads for insert to anon, authenticated
  with check (
    length(btrim(name)) between 2 and 160
    and length(email) between 5 and 254
    and position('@' in email) > 1
    and length(btrim(phone)) between 8 and 40
    and length(btrim(company_type)) between 2 and 80
    and length(btrim(message)) between 10 and 3000
  );

drop policy if exists "Public can read published articles" on public.articles;
create policy "Public can read published articles"
  on public.articles for select to anon, authenticated
  using (published_at is not null and published_at <= now());

grant insert on public.leads to anon, authenticated;
grant select on public.articles to anon, authenticated;
