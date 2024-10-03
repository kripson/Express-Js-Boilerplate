import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const schemas = {
  users: pgTable("users", {
    id: serial("id").primaryKey(),
    email: text("email"),
    name: text("name"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  }),
};
