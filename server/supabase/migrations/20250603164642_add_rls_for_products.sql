alter policy "user_can_edit_product_as_team_member_only"


on "public"."products"


to public


using ((EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.team_id = products.team_id))))
  with check ((EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.team_id = products.team_id))))
  );