import { relations } from "drizzle-orm/relations";
import { usersInAuth, users, teams } from "./schema";

export const usersRelations = relations(users, ({one}) => ({
	usersInAuth: one(usersInAuth, {
		fields: [users.id],
		references: [usersInAuth.id]
	}),
	team: one(teams, {
		fields: [users.teamId],
		references: [teams.id]
	}),
}));

export const usersInAuthRelations = relations(usersInAuth, ({many}) => ({
	users: many(users),
}));

export const teamsRelations = relations(teams, ({many}) => ({
	users: many(users),
}));