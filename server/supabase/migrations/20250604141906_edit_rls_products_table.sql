DROP POLICY "authenticated can view products from their team" ON "products" CASCADE;--> statement-breakpoint
CREATE POLICY "authenticated can view products from their team" ON "products" AS PERMISSIVE FOR ALL TO "authenticated" USING ((EXISTS ( SELECT 1
		FROM users
	   WHERE ((users.id = auth.uid()) AND (users.team_id = products.team_id))))) WITH CHECK ((EXISTS ( SELECT 1
		FROM users
	   WHERE ((users.id = auth.uid()) AND (users.team_id = products.team_id)))));