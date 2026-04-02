import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod/v4";
import { createInsertSchema } from "drizzle-zod";

export const activityTable = pgTable("activity", {
  id: serial("id").primaryKey(),
  type: text("type", {
    enum: ["project_created", "funnel_created", "funnel_initialized", "project_published"]
  }).notNull(),
  description: text("description").notNull(),
  timestamp: timestamp("timestamp", { withTimezone: true }).notNull().defaultNow(),
});

export const insertActivitySchema = createInsertSchema(activityTable).omit({ id: true, timestamp: true });
export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type ActivityItem = typeof activityTable.$inferSelect;
