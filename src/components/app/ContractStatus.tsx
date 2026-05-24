"use client"

import { useEffect, useState } from "react"
import { readVaultConfigured } from "@/lib/contracts"
import { truncateAddress } from "@/lib/utils"

export function ContractStatus() {
  const [state, setState] = useState<Awaited<ReturnType<typeof readVaultConfigured>> | null>(null)

  useEffect(() => {
    readVaultConfigured().then(setState)
  }, [])

  if (!state) return null

  return (
    <div className="mt-4 border border-[#2a2a2a] bg-[#141414] p-4 text-[10px] font-mono">
      <p className="text-[9px] tracking-widest text-[#555] mb-2">// ON-CHAIN CONFIG</p>
      {state.configured ? (
        <p className="text-[#ccff00]">
          VAULT {truncateAddress(state.vault!)} · SHARD {truncateAddress(state.shard!)}
        </p>
      ) : (
        <p className="text-[#ffaa00]">
          Contracts not configured — set NEXT_PUBLIC_YURIKA_VAULT_ADDRESS and
          NEXT_PUBLIC_SHARD_TOKEN_ADDRESS after Base Sepolia deploy.
        </p>
      )}
    </div>
  )
}
