import { pgTable, foreignKey, unique, uuid, text, check, timestamp, varchar, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: uuid().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	teamId: uuid("team_id"),
}, (table) => [
	foreignKey({
			columns: [table.id],
			foreignColumns: [table.id],
			name: "users_id_fkey"
		}),
	foreignKey({
			columns: [table.teamId],
			foreignColumns: [teams.id],
			name: "users_team_id_fkey"
		}).onUpdate("cascade").onDelete("set null"),
	unique("users_email_key").on(table.email),
]);

export const teams = pgTable("teams", {
	id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	name: varchar().notNull(),
	joinCode: text("join_code"),
}, (table) => [
	check("teams_join_code_check", sql`length(join_code) = 6`),
]);
