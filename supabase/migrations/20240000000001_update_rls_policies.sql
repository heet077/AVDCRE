-- Drop existing policies
drop policy if exists "Enable insert for authenticated users only" on public.registrations;
drop policy if exists "Enable read access for authenticated users" on public.registrations;

-- Create policy to allow insert for all users (including anonymous)
create policy "Enable insert for all users"
  on public.registrations for insert
  to anon, authenticated
  with check (true);

-- Create policy to allow read for authenticated users only
create policy "Enable read access for authenticated users only"
  on public.registrations for select
  to authenticated
  using (true); 