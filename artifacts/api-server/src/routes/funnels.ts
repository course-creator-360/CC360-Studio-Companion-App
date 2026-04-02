import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, funnelsTable, activityTable } from "@workspace/db";
import {
  ListFunnelsQueryParams,
  CreateFunnelBody,
  GetFunnelParams,
  UpdateFunnelParams,
  UpdateFunnelBody,
  DeleteFunnelParams,
  InitializeFunnelParams,
  ListFunnelsResponse,
  GetFunnelResponse,
  UpdateFunnelResponse,
  InitializeFunnelResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/funnels", async (req, res): Promise<void> => {
  const params = ListFunnelsQueryParams.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const conditions = [];
  if (params.data.projectId) {
    conditions.push(eq(funnelsTable.projectId, params.data.projectId));
  }

  const funnels = await db
    .select()
    .from(funnelsTable)
    .where(conditions.length > 0 ? conditions[0] : undefined)
    .orderBy(funnelsTable.createdAt);

  res.json(ListFunnelsResponse.parse(funnels));
});

router.post("/funnels", async (req, res): Promise<void> => {
  const parsed = CreateFunnelBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [funnel] = await db.insert(funnelsTable).values(parsed.data).returning();

  await db.insert(activityTable).values({
    type: "funnel_created",
    description: `Funnel strategy "${parsed.data.coreOffer}" was created`,
  });

  res.status(201).json(GetFunnelResponse.parse(funnel));
});

router.get("/funnels/:id", async (req, res): Promise<void> => {
  const params = GetFunnelParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [funnel] = await db
    .select()
    .from(funnelsTable)
    .where(eq(funnelsTable.id, params.data.id));

  if (!funnel) {
    res.status(404).json({ error: "Funnel not found" });
    return;
  }

  res.json(GetFunnelResponse.parse(funnel));
});

router.patch("/funnels/:id", async (req, res): Promise<void> => {
  const params = UpdateFunnelParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateFunnelBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [funnel] = await db
    .update(funnelsTable)
    .set(parsed.data)
    .where(eq(funnelsTable.id, params.data.id))
    .returning();

  if (!funnel) {
    res.status(404).json({ error: "Funnel not found" });
    return;
  }

  res.json(UpdateFunnelResponse.parse(funnel));
});

router.delete("/funnels/:id", async (req, res): Promise<void> => {
  const params = DeleteFunnelParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [deleted] = await db
    .delete(funnelsTable)
    .where(eq(funnelsTable.id, params.data.id))
    .returning();

  if (!deleted) {
    res.status(404).json({ error: "Funnel not found" });
    return;
  }

  res.sendStatus(204);
});

router.post("/funnels/:id/initialize", async (req, res): Promise<void> => {
  const params = InitializeFunnelParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [funnel] = await db
    .update(funnelsTable)
    .set({
      aiEngineStatus: "analyzing",
      buildProgress: 15,
    })
    .where(eq(funnelsTable.id, params.data.id))
    .returning();

  if (!funnel) {
    res.status(404).json({ error: "Funnel not found" });
    return;
  }

  await db.insert(activityTable).values({
    type: "funnel_initialized",
    description: `Market research initialized for "${funnel.coreOffer}"`,
  });

  res.json(InitializeFunnelResponse.parse(funnel));
});

export default router;
