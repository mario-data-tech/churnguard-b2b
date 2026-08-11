-- Esquema inicial ChurnGuard B2B MVP

create table if not exists tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references tenants(id) on delete cascade not null,
  stripe_customer_id text unique not null,
  email text not null,
  name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id) on delete cascade not null,
  stripe_subscription_id text unique not null,
  status text not null default 'active',
  monthly_amount numeric(10, 2) not null default 0.00,
  currency text not null default 'usd',
  failed_at timestamp with time zone,
  recovered_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists recovery_logs (
  id uuid primary key default gen_random_uuid(),
  subscription_id uuid references subscriptions(id) on delete cascade not null,
  step integer not null default 0,
  status text not null default 'pending',
  update_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Datos de prueba para demostración
insert into tenants (id, name) 
values ('11111111-1111-1111-1111-111111111111', 'SaaS Demo Inc.')
on conflict do nothing;

insert into customers (id, tenant_id, stripe_customer_id, email, name)
values ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'cus_demo_123', 'cliente@ejemplo.com', 'Juan Pérez')
on conflict do nothing;

insert into subscriptions (id, customer_id, stripe_subscription_id, status, monthly_amount, currency)
values ('33333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', 'sub_demo_456', 'active', 99.00, 'usd')
on conflict do nothing;
