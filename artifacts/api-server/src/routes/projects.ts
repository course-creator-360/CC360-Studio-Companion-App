import { Router, type IRouter } from "express";
import { eq, sql, count } from "drizzle-orm";
import { db, projectsTable, funnelsTable, activityTable } from "@workspace/db";
import {
  ListProjectsQueryParams,
  CreateProjectBody,
  GetProjectParams,
  UpdateProjectParams,
  UpdateProjectBody,
  DeleteProjectParams,
  ListProjectsResponse,
  GetProjectResponse,
  UpdateProjectResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/projects", async (req, res): Promise<void> => {
  const params = ListProjectsQueryParams.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const conditions = [];
  if (params.data.status) {
    conditions.push(eq(projectsTable.status, params.data.status));
  }

  const projects = await db
    .select({
      id: projectsTable.id,
      name: projectsTable.name,
      status: projectsTable.status,
      description: projectsTable.description,
      funnelCount: sql<number>`coalesce(${count(funnelsTable.id)}, 0)`.as("funnel_count"),
      createdAt: projectsTable.createdAt,
      updatedAt: projectsTable.updatedAt,
    })
    .from(projectsTable)
    .leftJoin(funnelsTable, eq(projectsTable.id, funnelsTable.projectId))
    .where(conditions.length > 0 ? conditions[0] : undefined)
    .groupBy(projectsTable.id)
    .orderBy(projectsTable.createdAt);

  res.json(ListProjectsResponse.parse(projects));
});

router.post("/projects", async (req, res): Promise<void> => {
  const parsed = CreateProjectBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [project] = await db.insert(projectsTable).values(parsed.data).returning();

  await db.insert(activityTable).values({
    type: "project_created",
    description: `Project "${project.name}" was created`,
  });

  res.status(201).json(GetProjectResponse.parse({ ...project, funnelCount: 0 }));
});

router.get("/projects/:id", async (req, res): Promise<void> => {
  const params = GetProjectParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [project] = await db
    .select({
      id: projectsTable.id,
      name: projectsTable.name,
      status: projectsTable.status,
      description: projectsTable.description,
      funnelCount: sql<number>`coalesce(${count(funnelsTable.id)}, 0)`.as("funnel_count"),
      createdAt: projectsTable.createdAt,
      updatedAt: projectsTable.updatedAt,
    })
    .from(projectsTable)
    .leftJoin(funnelsTable, eq(projectsTable.id, funnelsTable.projectId))
    .where(eq(projectsTable.id, params.data.id))
    .groupBy(projectsTable.id);

  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  res.json(GetProjectResponse.parse(project));
});

router.patch("/projects/:id", async (req, res): Promise<void> => {
  const params = UpdateProjectParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateProjectBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [updated] = await db
    .update(projectsTable)
    .set(parsed.data)
    .where(eq(projectsTable.id, params.data.id))
    .returning();

  if (!updated) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  if (parsed.data.status === "published") {
    await db.insert(activityTable).values({
      type: "project_published",
      description: `Project "${updated.name}" was published`,
    });
  }

  const [project] = await db
    .select({
      id: projectsTable.id,
      name: projectsTable.name,
      status: projectsTable.status,
      description: projectsTable.description,
      funnelCount: sql<number>`coalesce(${count(funnelsTable.id)}, 0)`.as("funnel_count"),
      createdAt: projectsTable.createdAt,
      updatedAt: projectsTable.updatedAt,
    })
    .from(projectsTable)
    .leftJoin(funnelsTable, eq(projectsTable.id, funnelsTable.projectId))
    .where(eq(projectsTable.id, params.data.id))
    .groupBy(projectsTable.id);

  res.json(UpdateProjectResponse.parse(project));
});

router.delete("/projects/:id", async (req, res): Promise<void> => {
  const params = DeleteProjectParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [deleted] = await db
    .delete(projectsTable)
    .where(eq(projectsTable.id, params.data.id))
    .returning();

  if (!deleted) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
