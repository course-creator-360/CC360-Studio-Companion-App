# Creator 360

## Overview

Creator 360 is a command center for digital course creators and online educators. It helps users architect conversion funnels, manage course curricula, and deploy digital products.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite + Tailwind CSS (dark theme with white sidebar)
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Font**: Manrope (Google Fonts)
- **Icons**: Lucide React

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Database Schema

- **projects** — name, status (draft/published/archived), description
- **funnels** — projectId, targetAudience, coreOffer, conversionGoal, trafficSource, buildProgress, aiEngineStatus
- **activity** — type, description, timestamp (activity feed)

## API Endpoints

- `GET/POST /api/projects` — List/create projects
- `GET/PATCH/DELETE /api/projects/:id` — Get/update/delete project
- `GET/POST /api/funnels` — List/create funnels
- `GET/PATCH/DELETE /api/funnels/:id` — Get/update/delete funnel
- `POST /api/funnels/:id/initialize` — Initialize market research
- `GET /api/dashboard/summary` — Dashboard stats
- `GET /api/dashboard/recent-activity` — Activity feed

## Pages

- `/` — Dashboard with project stats, activity feed, system status
- `/curriculum` — Course Architect with funnel strategy form
- `/analytics` — Performance Intelligence
- `/community` — Community management
- `/settings` — App settings

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
