# yurika.space — Deploy

## Vercel

1. Import repo; branch `yurika-extended-site` (or merge to `main` first).
2. Set install/build from `vercel.json` (`pnpm install`, `pnpm build`).
3. Environment variables (Production):

| Variable | Required | Notes |
|----------|----------|-------|
| `NEXT_PUBLIC_API_URL` | Yes | e.g. `https://api.yurika.space/api` |
| `NEXT_PUBLIC_SITE_URL` | Yes | `https://yurika.space` |
| `NEXT_PUBLIC_SUPABASE_URL` | Waitlist | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Waitlist | Anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Waitlist | Server-only; never expose client-side |
| `NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID` | Web3 | Dynamic.xyz dashboard |
| `NEXT_PUBLIC_YURIKA_VAULT_ADDRESS` | On-chain | Post-deploy |
| `NEXT_PUBLIC_SHARD_TOKEN_ADDRESS` | On-chain | Post-deploy |
| `NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL` | On-chain | Default public RPC OK for testnet |

4. Add `https://yurika.space` to Django `CORS_ALLOWED_ORIGINS` and `ALLOWED_HOSTS`.

## Docker

```bash
pnpm install
pnpm build
docker build -t yurika-space .
docker run -p 3000:3000 --env-file .env.local yurika-space
```

## Prelaunch (full stack)

From `~/code/yurika`:

```bash
./scripts/prelaunch-smoke.sh
```

Verifies Django, frontend, Postgres, Redis, and Neo4j are healthy before traffic.

## On-chain (Base Sepolia)

V1 invest flow uses the **Django ledger** only. On-chain checkout is deferred until contracts and an indexer are wired.

1. Deploy from the monorepo contracts package:

   ```bash
   cd ~/code/yurika/contracts
   # Follow Foundry README / deploy script for Base Sepolia
   ```

2. Set addresses:

   | Where | Variable |
   |-------|----------|
   | Next.js (Vercel / `.env.local`) | `NEXT_PUBLIC_YURIKA_VAULT_ADDRESS`, `NEXT_PUBLIC_SHARD_TOKEN_ADDRESS` |
   | Django (`docker-compose` / backend `.env`) | `YURIKA_VAULT_CONTRACT_ADDRESS` — written to `domain.vault_contract_address` on vault |

3. UI: [`ContractStatus`](src/components/app/ContractStatus.tsx) and footer chain label only claim deployment when vault env is set. Do not advertise mainnet until production deploy is confirmed.
