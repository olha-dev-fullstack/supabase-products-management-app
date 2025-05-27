drop function if exists "public"."create_new_user"();

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_name text;
begin
  v_name := coalesce(
    new.raw_user_meta_data->>'full_name',
    'Anonymous'
  );

  insert into public.users (id, name, email)
  values (new.id, v_name, new.email);

  return new;
end;
$function$
;


