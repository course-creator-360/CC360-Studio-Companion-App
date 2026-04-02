import { Router, type IRouter } from "express";
import { sql, count, eq, avg } from "drizzle-orm";
import { db, projectsTable, funnelsTable, activityTable } from "@workspace/db";
import {
  GetDashboardSummaryResponse,
  GetRecentActivityResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/dashboard/summary", async (_req, res): Promise<void> => {
  const [projectStats] = await db
    .select({
      totalProjects: count(projectsTable.id),
      draftProjects: sql<number>`count(case when ${projectsTable.status} = 'draft' then 1 end)`,
      publishedProjects: sql<number>`count(case when ${projectsTable.status} = 'published' then 1 end)`,
    })
    .from(projectsTable);

  const [funnelStats] = await db
    .select({
      totalFunnels: count(funnelsTable.id),
      avgProgress: avg(funnelsTable.buildProgress),
    })
    .from(funnelsTable);

  const summary = {
    totalProjects: projectStats?.totalProjects ?? 0,
    draftProjects: Number(projectStats?.draftProjects ?? 0),
    publishedProjects: Number(projectStats?.publishedProjects ?? 0),
    totalFunnels: funnelStats?.totalFunnels ?? 0,
    averageBuildProgress: Number(funnelStats?.avgProgress ?? 0),
    aiEngineReady: true,
  };

  res.json(GetDashboardSummaryResponse.parse(summary));
});

router.get("/dashboard/recent-activity", async (_req, res): Promise<void> => {
  const activity = await db
    .select()
    .from(activityTable)
    .orderBy(sql`${activityTable.timestamp} desc`)
    .limit(10);

  res.json(GetRecentActivityResponse.parse(activity));
});

export default router;
