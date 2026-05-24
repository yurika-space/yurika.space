# yurika.space

Liquid Domains. Accelerated Founders.

Next.js 16 frontend for the Yurika platform — marketing landing, Command Center (`/app`), and investor pitch deck (`/pitch-deck`).

## Prerequisites

- Node.js 20+
- pnpm (`npm i -g pnpm`)
- [yurika monorepo](~/code/yurika) backend for API features (`http://localhost:8000/api`)

## Quick start

```bash
cp .env.example .env.local
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Route | Description |
|-------|-------------|
| `/` | Marketing landing (Vault, Shards, Graph, Forge) |
| `/app` | Founder Command Center — vault wizard, shard config, marketplace |
| `/pitch-deck` | Investor deck (9 slides) |

## Environment

See [`.env.example`](.env.example). Required for full functionality:

- `NEXT_PUBLIC_API_URL` — Django backend
- `NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID` — optional wallet UI (falls back to injected wagmi)
- Supabase keys — waitlist (`/api/waitlist`)
- Contract addresses — after Base Sepolia deploy

## Scripts

```bash
pnpm dev          # development server
pnpm build        # production build
pnpm start        # production server
pnpm lint         # ESLint
pnpm type-check   # TypeScript
```

## Docker

```bash
pnpm install
pnpm build
docker build -t yurika-space .
docker run -p 3000:3000 yurika-space
```

## Related repos

- **`~/code/yurika`** — Django API, contracts, Neo4j graph, product specs (`frontend/` must stay in sync — see [`docs/FRONTEND_SYNC.md`](docs/FRONTEND_SYNC.md))
- Product direction: `01: Product Specification.md`, `02:Creative Direction.md`

## Branch strategy

- **`yurika-extended-site`** — active Phase 2 terminal UI (this branch)
- **`main`** — legacy landing; retained until Phase 2 is feature-complete, then merge extended-site

## Deploy (Vercel)

1. Link project; set env vars from `.env.example`
2. `NEXT_PUBLIC_API_URL` → production Django URL
3. `CORS_ALLOWED_ORIGINS` on backend must include `https://yurika.space`
