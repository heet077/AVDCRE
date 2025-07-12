-- Drop all existing policies
drop policy if exists "Enable insert for authenticated users only" on public.registrations;
drop policy if exists "Enable read access for authenticated users" on public.registrations;
drop policy if exists "Enable insert for all users" on public.registrations;
drop policy if exists "Enable read access for authenticated users only" on public.registrations;

-- Create a simple policy that allows all operations for both anonymous and authenticated users
create policy "Allow all operations"
  on public.registrations
  for all
  using (true)
  with check (true); 