-- Grant public access to the registrations table
grant usage on schema public to anon;
grant usage on schema public to authenticated;

-- Grant specific table permissions
grant all on public.registrations to anon;
grant all on public.registrations to authenticated;

-- Grant sequence permissions for the id column
grant usage, select on all sequences in schema public to anon;
grant usage, select on all sequences in schema public to authenticated; 