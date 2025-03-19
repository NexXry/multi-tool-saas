import {
  mysqlTable,
  serial,
  text,
  varchar,
  datetime,
  int,
} from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

export const users = mysqlTable("User", {
  id: serial("id").primaryKey(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
});

export const tools = mysqlTable("Tool", {
  id: serial("id").primaryKey(),
  name: varchar({ length: 255 }).notNull(),
});

export const feedbacks = mysqlTable("FeedBack", {
  id: serial("id").primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  content: text("content").notNull(),
  createdAt: datetime("createdAt").default(new Date()).notNull(),
  userId: int("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  toolId: int("toolId")
    .notNull()
    .references(() => tools.id, { onDelete: "cascade" }),
});

export const usersRelations = relations(users, ({ many }) => ({
  feedbacks: many(feedbacks),
}));

export const toolsRelations = relations(tools, ({ many }) => ({
  feedbacks: many(feedbacks),
}));

export const feedbacksRelations = relations(feedbacks, ({ one }) => ({
  user: one(users, {
    fields: [feedbacks.userId],
    references: [users.id],
  }),
  tool: one(tools, {
    fields: [feedbacks.toolId],
    references: [tools.id],
  }),
}));

export type users = typeof users;
export type tools = typeof tools;
export type feedbacks = typeof feedbacks;
