import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { projectsTable } from "./projects";

export const funnelsTable = pgTable("funnels", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projectsTable.id, { onDelete: "cascade" }),
  targetAudience: text("target_audience").notNull(),
  coreOffer: text("core_offer").notNull(),
  conversionGoal: text("conversion_goal", {
    enum: ["automated_webinar", "lead_magnet", "direct_sales", "free_consultation", "high_ticket_application"]
  }).notNull(),
  trafficSource: text("traffic_source", {
    enum: ["meta_ads", "organic_seo", "youtube", "linkedin"]
  }).notNull(),
  buildProgress: integer("build_progress").notNull().default(0),
  aiEngineStatus: text("ai_engine_status", {
    enum: ["ready", "analyzing", "complete"]
  }).notNull().default("ready"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertFunnelSchema = createInsertSchema(funnelsTable).omit({ id: true, createdAt: true, updatedAt: true, buildProgress: true, aiEngineStatus: true });
export type InsertFunnel = z.infer<typeof insertFunnelSchema>;
export type Funnel = typeof funnelsTable.$inferSelect;
