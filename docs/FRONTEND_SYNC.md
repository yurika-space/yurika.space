# Frontend sync — yurika.space ↔ yurika monorepo

## Decision (2026-05-21)

| Topic | Choice |
|-------|--------|
| Source of truth | **Both in sync** — no single canonical frontend repo |
| Ship priority | **Both** — Phase 2 API/graph + waitlist/pitch-deck carryover |
| `main` branch | **Keep** legacy landing on `yurika.space` `main` until Phase 2 is feature-complete; active work stays on `yurika-extended-site` |

## Roles

| Repo | Path | Role |
|------|------|------|
| **yurika.space** | `~/code/yurika.space` | Production deploy target (`yurika.space` domain, Vercel) |
| **yurika monorepo** | `~/code/yurika/frontend` | Docker Compose stack (`localhost:3001`), full-stack local dev |

Product specs, Django API, contracts, and Neo4j live in **`~/code/yurika`** only.

## Sync workflow

After frontend changes in either repo, mirror to the other:

```bash
# yurika.space → monorepo (most common after deploy-focused work)
rsync -a --delete ~/code/yurika.space/src/ ~/code/yurika/frontend/src/
cp ~/code/yurika.space/{package.json,postcss.config.js,next.config.js,tailwind.config.ts,tsconfig.json} \
   ~/code/yurika/frontend/
rsync -a ~/code/yurika.space/e2e/ ~/code/yurika/frontend/e2e/

# monorepo → yurika.space (after full-stack work in docker)
rsync -a --delete ~/code/yurika/frontend/src/ ~/code/yurika.space/src/
cp ~/code/yurika/frontend/{package.json,postcss.config.js,next.config.js,tailwind.config.ts,tsconfig.json} \
   ~/code/yurika.space/
```

Then in **both** trees: `pnpm install && pnpm type-check && pnpm build`.

## Branch strategy (yurika.space)

- **`yurika-extended-site`** — Neon Ledger landing + `/app` Command Center + integrations (current)
- **`main`** — Legacy 12-theme marketing site; **do not replace** until Phase 2 acceptance criteria are met
- **Merge to `main`** — Only when vault wizard, campaigns, marketplace, graph, waitlist, and pitch-deck are verified against production API

## Phases A–E acceptance (Playwright)

Run automated checklist (requires Django on `:8000`, Next on `:3000`):

```bash
cd ~/code/yurika && POSTGRES_PORT=5435 docker compose up -d postgres neo4j redis django
cd ~/code/yurika.space && pnpm dev   # separate terminal
pnpm test:e2e                        # full run incl. both builds
PLAYWRIGHT_SKIP_BUILD=1 pnpm test:e2e   # skip rebuild if already green
```

Checklist (`e2e/phase2-checklist.spec.ts`):

| Test | Phase |
|------|-------|
| API health | — |
| Protocol stats (`GET /api/stats/`) | A |
| Public graph teaser (`/graph/discover/public/`) | D |
| Marketplace page (`/marketplace`) | C |
| Landing CTAs + `#graph` | A |
| Waitlist API | A (skipped if Supabase migration missing) |
| Founder: proof → verify → vault (no Docker shell) | B |
| Campaign publish (vaulted domain required) | B/C |
| Curator invest increases funding | C |
| Graph discover authenticated | D |
| `/app`, `/pitch-deck`, marketplace UI | — |

User-flow UI suite (`e2e/user-flows.spec.ts`) — API-seeded `yurika-auth` in localStorage:

| Test | Flow |
|------|------|
| Founder wizard verify → vault | B |
| Publish campaign + marketplace link | B/C |
| Marketplace row → detail | C |
| Curator invest modal | C |
| Portfolio holdings | C |
| Forge stage update | E |
| Landing `#graph` | D |

Backend gates aligned with UI:

- Campaign create requires **vaulted** domain (`ShardCampaignViewSet.perform_create`).
- Vault requires **verified** domain; verify via `POST .../verify/` (DEBUG or staff).
- Domain and campaign IDs are **UUID strings** in the API — routes use `/marketplace/[campaignId]` and `/app/domains/[id]` without numeric coercion.
- **Projects** attach to campaigns: `POST /domains/projects/` → launch with `project_id` on `POST /domains/campaigns/` (campaign still requires a **vaulted** domain).
- **App IA (2026-05 redesign):** `/app` overview; `/app/projects`, `/app/domains/vault`, `/app/launch`, `/app/campaigns/[id]`; curator `/marketplace` cards + `/marketplace/[id]/invest/success`; `/app/portfolio/holdings/[id]`. Hash redirects: `#project` → `/app/projects`, `#launch` → `/app/launch`.
- **Goal reached:** backend sets `domain.status = completed` when funding hits target; UI shows `GoalReachedBanner` on campaign dashboard, domain detail, marketplace detail.
- **SessionBar** in `/app` and marketing **Header** — wallet + SIWE without entering the vault wizard.

## Merge to `main` (deferred)

`yurika-extended-site` and `main` have **unrelated git histories**. Until product chooses a merge strategy:

- **Recommended:** keep Vercel/deploy on `yurika-extended-site`; leave `main` as legacy 12-theme landing.
- **Alternative:** `git merge --allow-unrelated-histories` or replace `main` — requires explicit sign-off (legacy site loss).

Do not merge without that decision.
