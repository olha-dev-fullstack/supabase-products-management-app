alter table public.teams
add column join_code text null;

alter table public.teams
add constraint teams_join_code_check check ((length(join_code) = 6));