# CLAUDE.md

Guidance for working in the **yurika.space** frontend repository (`yurika-extended-site` branch).

## Tech Stack

- **Framework**: Next.js 16 (App Router), `src/` directory
- **React**: 19.2.0
- **Styling**: Tailwind CSS 4 — Neon Ledger terminal theme (`src/app/globals.css`)
- **Animation**: Framer Motion
- **Data**: TanStack React Query + `src/lib/api.ts`
- **Auth**: JWT via SIWE (`POST /api/auth/wallet/verify/`) + zustand persist
- **Web3**: wagmi/viem; Dynamic.xyz when `NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID` is set
- **Waitlist**: Supabase via `src/app/api/waitlist/route.ts`

## Development Commands

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build
pnpm lint
pnpm type-check
```

## Architecture

```
src/
  app/
    (marketing)/     # Landing /
    app/               # Command Center /app
    pitch-deck/        # Investor deck
    api/waitlist/      # Supabase waitlist
  components/
    marketing/         # Hero, Problem, Solution, Features, Graph, Forge, CTA
    app/               # Vault wizard, shard config, marketplace, graph panel
    layout/            # Header, Footer
    providers/         # Web3, AuthHydrator
  hooks/               # useDomains, useCampaigns, useGraph, useAuth
  lib/                 # api, types, auth-store, wagmi-config, contracts, siwe
```

## Backend integration

Point `NEXT_PUBLIC_API_URL` at the yurika monorepo Django server (default `http://localhost:8000/api`):

- `GET/POST /domains/` — founder domains
- `POST /domains/{id}/vault/` — vault after verified
- `GET/POST /domains/campaigns/` — shard campaigns (public list)
- `GET /graph/discover/` — Neo4j discovery (auth required)

Run full stack from `~/code/yurika`: `docker compose up -d` or see that repo's README.

## Design system

- **Background**: `#0D0D0D` (The Void)
- **Primary CTA**: `#CCFF00` (Yurika Lime)
- **Shards/metrics**: `#9D00FF` (Data Purple)
- **Fonts**: Press Start 2P (display), JetBrains Mono (data), Inter (body)
- **No rounded corners** — terminal aesthetic

## Repo sync (required)

**Keep `~/code/yurika.space` and `~/code/yurika/frontend` in sync.** After frontend edits here, mirror to the monorepo (and vice versa). See [`docs/FRONTEND_SYNC.md`](docs/FRONTEND_SYNC.md).

## Branch strategy

- **`yurika-extended-site`** — active Phase 2 work (this tree)
- **`main`** — legacy landing; **do not replace** until Phase 2 is feature-complete

## Important

- Product specs live in `~/code/yurika/` (`01: Product Specification.md`, etc.)
- Do not commit `.env.local` or secrets
