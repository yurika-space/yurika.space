"use client"

import Link from "next/link"
import type { ShardCampaign } from "@/lib/types"
import { formatUSD } from "@/lib/utils"

type Props = {
  campaign: ShardCampaign | null
  onClose: () => void
}

export function DomainDetailDrawer({ campaign, onClose }: Props) {
  if (!campaign) return null

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-black/70"
        aria-label="Close drawer"
        onClick={onClose}
      />
      <aside className="relative h-full w-full max-w-md border-l border-[#2a2a2a] bg-[#0d0d0d] p-6 overflow-y-auto">
        <p className="mb-2 text-[9px] font-mono tracking-widest text-[#555]">{"// CAMPAIGN PREVIEW"}</p>
        <h2 className="mb-4 text-[12px] font-mono text-[#ccff00]">{campaign.domain_name}</h2>

        <div className="mt-4 border-t border-[#2a2a2a] pt-6">
          <p className="mb-3 text-[9px] font-mono tracking-widest text-[#9d00ff]">CAMPAIGN</p>
          <h3 className="mb-2 text-[11px] font-mono text-[#e0e0e0]">{campaign.title}</h3>
          <p className="mb-4 text-[10px] font-mono text-[#666] leading-relaxed">{campaign.thesis}</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-[#2a2a2a] bg-[#141414] p-3">
              <p className="text-[8px] text-[#555]">RAISED</p>
              <p className="text-[#ccff00]">{formatUSD(Number(campaign.funding_raised_usd))}</p>
            </div>
            <div className="border border-[#2a2a2a] bg-[#141414] p-3">
              <p className="text-[8px] text-[#555]">TARGET</p>
              <p className="text-[#e0e0e0]">{formatUSD(Number(campaign.funding_target_usd))}</p>
            </div>
          </div>
          <Link
            href={`/marketplace/${campaign.id}`}
            className="btn-primary mt-6 inline-block px-4 py-2 text-[9px]"
          >
            VIEW FULL DETAIL →
          </Link>
        </div>
      </aside>
    </div>
  )
}
