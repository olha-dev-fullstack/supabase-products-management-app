set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_my_team_id()
 RETURNS uuid
 LANGUAGE sql
 STABLE SECURITY DEFINER
AS $function$
  select team_id from public.users where id = auth.uid()
$function$
;

create policy "user can see users from their team"
on "public"."users"
as permissive
for select
to authenticated
using ((team_id = get_my_team_id()));



