ALTER TABLE "products" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "authenticated can view products from their team" ON "products" AS PERMISSIVE FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
		FROM users
	   WHERE (users.team_id = products.team_id))));