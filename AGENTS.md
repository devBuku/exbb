# exbb

Turborepo monorepo (Yarn 4.18.1 workspaces, `nodeLinker: node-modules`). Node >= 24 required (`engines` + `devEngines` enforce yarn 4.18.1).

## Commands

Run from repo root unless noted:

- `yarn build` / `yarn dev` / `yarn lint` / `yarn check-types` — turbo tasks across all workspaces
- `yarn format` — prettier write over `**/*.{ts,tsx,md}`; no prettier config file, defaults apply
- Single package: `yarn workspace <name> <script>`, or `turbo <task> --filter=<name>`
- No tests and no CI. Verification = `yarn lint`, `yarn check-types`, `yarn build`.
- `yarn docker:up` / `docker:down` / `docker:logs` — Postgres (pgvector/pgvector:pg18) via docker-compose, bound to 127.0.0.1:5432, user/pass/db all `postgres`/`postgres`/`exbb`

## Layout / entrypoints

- `apps/http-server` — Express 5 API on port **3002**. Entry `src/index.ts`; routes in `src/routes/`, handlers in `src/controllers/`, auth middleware in `src/middlewares/`. No `lint`/`check-types` scripts.
- `apps/ws-server` — `ws` server on port **3001**. Entry `src/index.ts`. Auth via the `token` JWT cookie, then an in-memory `users` array tracks rooms; `chat` messages are persisted via `@repo/database` and broadcast. No `lint`/`check-types` scripts.
- `apps/web` — Next.js 16 (app router) UI, entry `app/`, default port 3000. Typecheck is `next typegen && tsc --noEmit` (typegen must run first).
- `packages/validation` (`@repo/validation`) — zod schemas, raw TS source, import as `@repo/validation/user`, never built.
- `packages/backend-common` (`@repo/backend-common`) — raw TS source. `src/env.ts` exports `JWT_SECRET` (env var falling back to `"123123"`).
- `packages/database` (`@repo/database`) — Prisma 7 client (`src/prisma.ts`), schema `prisma/schema.prisma`, models User/Room/Chat. Raw TS source, import as `@repo/database/prisma`.
- `packages/ui` — React components as raw `.tsx` source; add via `yarn workspace @repo/ui generate:component`.
- `packages/eslint-config`, `packages/typescript-config` — shared configs, no scripts of their own.

## Database / env

- Postgres must be running (`yarn docker:up`) and `DATABASE_URL` must be set (e.g. `postgresql://postgres:postgres@localhost:5432/exbb`); `@repo/database` loads it via `dotenv/config` and throws at import time if missing.
- The `.env` files in `apps/http-server/` and `apps/ws-server/` are **empty placeholders** (as are their `.env.example` counterparts) — fill in `DATABASE_URL` yourself. `dotenv/config` reads the cwd's `.env`, so dev servers started inside an app pick up `apps/<app>/.env`, but the Prisma CLI (run from `packages/database`) does not.
- `packages/database` has no scripts; run the CLI as `yarn prisma <cmd>` from `packages/database`. Prisma 7 auto-loads `prisma7.config.ts` (schema path + `dotenv/config`, which reads `packages/database/.env` — not present). Export `DATABASE_URL` yourself when running Prisma.
- The generated Prisma client (`packages/database/src/generated/`) is **not committed**; run `yarn prisma generate` from `packages/database` after install/schema changes. Migrations: `yarn prisma migrate deploy` (or `dev`) from there.
- README.md is the stale create-turbo template (mentions a `docs` app that doesn't exist) — trust the code, not it.

## Gotchas

- `http-server` and `ws-server` have no `lint`/`check-types` scripts, so `yarn lint`/`yarn check-types` silently skip them. Verify with `yarn workspace http-server build` / `yarn workspace ws-server build`.
- Server builds are plain `tsc -b` from `src/` to `dist/`; runtime relies on Node 24's type-stripping for raw TS imports from `@repo/*` packages. Older Node fails. (`tsconfig.tsbuildinfo` is committed in both server apps — build-cache artifact, leave it alone.)
- `ws-server` imports `jsonwebtoken` but doesn't declare it in its `package.json` (resolves only via hoisting — root `package.json` also depends on it; breaks under strict package managers).
- `authMiddleware` (`apps/http-server/src/middlewares/auth.middlewares.ts`) calls `jwt.verify` without try/catch — a missing/invalid token yields a 500, not the intended 403. `req.userId` assignment uses `// @ts-ignore`.
- Only `POST /api/room/create` is behind `authMiddleware`; `GET /api/room/:slug` and `GET /api/chat/:roomId` are unprotected — anyone can read any room's chat history. Add auth before exposing it.
- Auth is still dev-grade: JWT secret falls back to `"123123"`, passwords stored in plaintext. Don't treat it as production auth.
- `apps/web` hardcodes `BACKEND_URL` (http://localhost:3002) and `WS_URL` (ws://localhost:3001) in `app/room/[slug]/config.ts` — no env plumbing; changing a server port means editing that file.
- TypeScript is pinned to `7.0.2`; `turbo.json` carries a managed agent-guidance block — read the installed turbo package's bundled `docs/` before changing turbo config.

<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": false` in the root `turbo.json` or `turbo.jsonc` to opt out; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.
<!-- END:turborepo-agent-rules -->