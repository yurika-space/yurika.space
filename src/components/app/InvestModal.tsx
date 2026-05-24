"use client"

import { useState } from "react"
import { useInvestInCampaign } from "@/hooks/useCampaigns"
import { useAuthStore } from "@/lib/auth-store"
import { formatUSD } from "@/lib/utils"
import type { ShardCampaign } from "@/lib/types"
import Link from "next/link"

type Props = {
  campaign: ShardCampaign
  onClose: () => void
  onSuccess?: (result: any) => void
}

export function InvestModal({ campaign, onClose, onSuccess }: Props) {
  const [shards, setShards] = useState(1)
  const isAuthed = Boolean(useAuthStore((s) => s.accessToken))
  const invest = useInvestInCampaign()
  const price = Number(campaign.price_per_shard_usd)
  const estimated = shards * price

  async function handleInvest() {
    if (!isAuthed) return
    try {
      const result = await invest.mutateAsync({ campaignId: campaign.id, shards })
      onSuccess?.(result)
      onClose()
    } catch {
      /* surfaced below */
    }
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <button type="button" className="absolute inset-0 bg-black/80" aria-label="Close" onClick={onClose} />
      <div className="relative terminal-window terminal-body p-6 max-w-md w-full">
        <p className="text-[9px] font-mono text-[#555] mb-2">// INVEST — OFF-CHAIN LEDGER (V1)</p>
        <h3 className="text-[11px] font-mono text-[#ccff00] mb-4">{campaign.title}</h3>
        <p className="text-[10px] font-mono text-[#666] mb-4 leading-relaxed">
          V1 purchases are recorded in the Django ledger, not on-chain. On-chain settlement ships after
          contract checkout is deployed.
        </p>

        {!isAuthed ? (
          <p className="text-[10px] font-mono text-[#ffaa00] mb-4">
            Use the wallet controls in the page header to connect and sign in, then return here to invest.
          </p>
        ) : (
          <>
            <label className="block space-y-1 mb-4">
              <span className="text-[9px] font-mono text-[#666]">SHARDS</span>
              <input
                type="number"
                min={1}
                max={campaign.shards_available}
                value={shards}
                onChange={(e) => setShards(Math.max(1, Number(e.target.value) || 1))}
                className="w-full border border-[#2a2a2a] bg-[#141414] px-3 py-2 text-[11px] font-mono text-[#e0e0e0]"
              />
            </label>
            <p className="text-[10px] font-mono text-[#888] mb-4">
              ESTIMATED: {formatUSD(estimated)} · {campaign.shards_available} available
            </p>
            <button
              type="button"
              className="btn-primary w-full py-3 text-[10px]"
              disabled={invest.isPending || shards > campaign.shards_available}
              onClick={handleInvest}
            >
              {invest.isPending ? "PROCESSING..." : "[ CONFIRM INVESTMENT ]"}
            </button>
            {invest.isError && (
              <p className="mt-2 text-[10px] font-mono text-[#ff3131]">Investment failed — check balance and auth.</p>
            )}
          </>
        )}
        <button type="button" className="btn-ghost mt-4 w-full py-2 text-[9px]" onClick={onClose}>
          CANCEL
        </button>
      </div>
    </div>
  )
}
