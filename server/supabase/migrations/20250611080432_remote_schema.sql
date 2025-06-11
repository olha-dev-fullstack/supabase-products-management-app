create policy "Enable insert for authenticated users 1ffg0oo_0"
on "storage"."objects"
as permissive
for select
to authenticated
using ((bucket_id = 'images'::text));


create policy "Enable insert for authenticated users 1ffg0oo_2"
on "storage"."objects"
as permissive
for delete
to authenticated
using ((bucket_id = 'images'::text));


create policy "Enable insert2 for authenticated users 1ffg0oo_0"
on "storage"."objects"
as permissive
for insert
to authenticated
with check ((bucket_id = 'images'::text));



