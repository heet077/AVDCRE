create table public.registrations (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  mobile_number text not null,
  room_number text not null,
  group_name text not null,
  interests text[] not null default '{}',
  custom_interest text,
  software text[] not null default '{}',
  custom_software text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes
create index registrations_group_name_idx on public.registrations(group_name);
create index registrations_created_at_idx on public.registrations(created_at);

-- Enable Row Level Security (RLS)
alter table public.registrations enable row level security;

-- Create policy to allow insert for authenticated users
create policy "Enable insert for authenticated users only"
  on public.registrations for insert
  to authenticated
  with check (true);

-- Create policy to allow read for authenticated users
create policy "Enable read access for authenticated users"
  on public.registrations for select
  to authenticated
  using (true); 