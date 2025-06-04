import {
  pgTable,
  foreignKey,
  unique,
  uuid,
  text,
  check,
  timestamp,
  varchar,
  pgEnum,
  pgPolicy,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { authenticatedRole } from "drizzle-orm/supabase";

export const users = pgTable(
  "users",
  {
    id: uuid().primaryKey().notNull(),
    name: text().notNull(),
    email: text().notNull(),
    teamId: uuid("team_id"),
  },
  (table) => [
    foreignKey({
      columns: [table.id],
      foreignColumns: [table.id],
      name: "users_id_fkey",
    }),
    foreignKey({
      columns: [table.teamId],
      foreignColumns: [teams.id],
      name: "users_team_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("set null"),
    unique("users_email_key").on(table.email),
  ]
);

export const teams = pgTable(
  "teams",
  {
    id: uuid()
      .default(sql`uuid_generate_v4()`)
      .primaryKey()
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    name: varchar().notNull(),
    joinCode: text("join_code"),
  },
  (table) => [check("teams_join_code_check", sql`length(join_code) = 6`)]
);

export const authUsers = pgTable("auth.users", {
  id: uuid("id").notNull().primaryKey(),
});

export const productStatus = pgEnum("product_status", [
  "Draft",
  "Active",
  "Deleted",
]);

export const products = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    description: text("description"),
    imageUrl: text("image_url"),
    status: productStatus("status").notNull().default("Draft"),
    teamId: uuid("team_id")
      .notNull()
      .references(() => teams.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    pgPolicy("authenticated can view products from their team", {
      for: "all",
      // using predefined role from Supabase
      to: authenticatedRole,
      using: sql`(EXISTS ( SELECT 1
		FROM users
	   WHERE ((users.id = auth.uid()) AND (users.team_id = products.team_id))))`,
      withCheck: sql`(EXISTS ( SELECT 1
		FROM users
	   WHERE ((users.id = auth.uid()) AND (users.team_id = products.team_id))))`,
    }),
  ]
);
