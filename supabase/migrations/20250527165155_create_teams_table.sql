-- Create teams table
create table public.teams (
  id uuid not null default uuid_generate_v4(),
  created_at timestamp with time zone not null default now(),
  name character varying not null,
  constraint teams_pkey primary key (id)
) tablespace pg_default;

-- Add column to users
alter table public.users 
add column team_id uuid;

-- Add foreign key constraint
alter table public.users
add constraint users_team_id_fkey
foreign key (team_id) references teams (id)
on update cascade on delete set null;
