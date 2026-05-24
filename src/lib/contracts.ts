import { type Address, createPublicClient, http } from "viem"
import { baseSepolia } from "viem/chains"

const VAULT_ADDRESS = process.env.NEXT_PUBLIC_YURIKA_VAULT_ADDRESS as Address | undefined
const SHARD_ADDRESS = process.env.NEXT_PUBLIC_SHARD_TOKEN_ADDRESS as Address | undefined

const rpcUrl =
  process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL || "https://sepolia.base.org"

export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(rpcUrl),
})

/** Minimal read-only vault status when addresses are configured. */
export async function readVaultConfigured(): Promise<{
  vault: Address | null
  shard: Address | null
  configured: boolean
}> {
  return {
    vault: VAULT_ADDRESS ?? null,
    shard: SHARD_ADDRESS ?? null,
    configured: Boolean(VAULT_ADDRESS && SHARD_ADDRESS),
  }
}

export function getContractAddresses() {
  return { vault: VAULT_ADDRESS, shard: SHARD_ADDRESS }
}
