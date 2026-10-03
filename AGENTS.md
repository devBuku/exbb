# exbb

Turborepo monorepo (Yarn 1 workspaces) for an app that is currently being split into services. Node >= 24 required (`engines` + `devEngines` enforce yarn 1.22.22).

## Commands

Run from repo root unless noted:

- `yarn build` / `yarn dev` / `yarn lint` / `yarn check-types` — turbo tasks across all workspaces (`turbo run <task>`)
- `yarn format` — prettier write over `**/*.{ts,tsx,md}`; no prettier config file, defaults apply
- Single package: `yarn workspace <name> <script>`, or `turbo <task> --filter=<name>`
- No tests exist anywhere; there is no `test` script or CI workflow. Verification = `yarn lint`, `yarn check-types`, `yarn build`.

## Layout / entrypoints

- `apps/http-server` — Express 5 API on port **3000**. Entry `src/index.ts`; routes in `src/routes/`, handlers in `src/controllers/`. `src/middlewares/auth.middlewares.ts` is an empty file.
- `apps/ws-server` — `ws` WebSocket echo server on port **3001**. Entry `src/index.ts`.
- `apps/web` — Next.js 16 (app router) UI. Entry `app/`. Typecheck is `next typegen && tsc --noEmit` (typegen must run first).
- `packages/validation` — zod schemas + jsonwebtoken; consumed as **raw TS source** (`exports: { "./*": "./*.ts" }`), never built.
- `packages/ui` — React components consumed as raw `.tsx` source (`exports: { "./*": "./src/*.tsx" }`). Add components with `yarn workspace @repo/ui generate:component`.
- `packages/eslint-config`, `packages/typescript-config` — shared configs.

## Gotchas

- `yarn dev` starts **both** `http-server` and `web` on port 3000 — they conflict. Run one at a time with `--filter`.
- `http-server` and `ws-server` have **no `lint`/`check-types` scripts**, so `yarn lint` / `yarn check-types` silently skip them. Verify them manually (`yarn workspace http-server build`).
- `http-server`/`ws-server` ship no tsconfig `include`/`references`; builds are plain `tsc -b` from `src/` to `dist/`.
- Runtime of the built servers relies on Node 24's default TypeScript type-stripping (`require("@repo/validation/user")` resolves to a `.ts` file). Running an older Node fails.
- Auth is a stub: JWT secret is hardcoded `"123123"` and `userId` is hardcoded `123` in `auth.controllers.ts`; `@repo/validation` has a `main: index.js` that does not exist. Don't treat any of it as production auth.
- TypeScript is pinned to `7.0.2`; Turborepo config has managed agent-guidance blocks — read the installed package's bundled docs before changing `turbo.json` (see block below).

<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": false` in the root `turbo.json` or `turbo.jsonc` to opt out; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.
<!-- END:turborepo-agent-rules -->
