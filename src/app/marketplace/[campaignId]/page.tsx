"use client"

import { use, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCampaign } from "@/hooks/useCampaigns"
import { RiskDisclosure } from "@/components/app/RiskDisclosure"
import { InvestModal } from "@/components/app/InvestModal"
import { formatUSD, formatShard } from "@/lib/utils"

export default function CampaignDetailPage({
  params,
}: {
  params: Promise<{ campaignId: string }>
}) {
  const { campaignId } = use(params)
  const router = useRouter()
  const { data: campaign, isLoading, isError } = useCampaign(campaignId || null)
  const [showInvest, setShowInvest] = useState(false)

  if (isLoading) {
    return (
      <section className="px-6 py-16">
        <p className="text-[11px] font-mono text-[#666] animate-pulse">LOADING CAMPAIGN...</p>
      </section>
    )
  }

  if (isError || !campaign) {
    return (
      <section className="px-6 py-16">
        <p className="text-[11px] font-mono text-[#ff3131]">CAMPAIGN NOT FOUND</p>
        <Link href="/marketplace" className="mt-4 inline-block text-[10px] font-mono text-[#ccff00]">
          ← Back to marketplace
        </Link>
      </section>
    )
  }

  const filled = Math.min(100, Math.round(campaign.funding_percentage))

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <Link href="/marketplace" className="text-[9px] font-mono text-[#555] hover:text-[#ccff00]">
          ← MARKETPLACE
        </Link>
        <p className="mt-6 text-[9px] font-mono text-[#555]">{campaign.domain_name}</p>
        <h1 className="mt-2 text-[clamp(14px,2.5vw,20px)] font-display text-[#e0e0e0]">{campaign.title}</h1>

        <div className="mt-6 h-3 border border-[#2a2a2a] bg-[#111]">
          <div className="h-full bg-[#ccff00]" style={{ width: `${filled}%` }} />
        </div>
        <p className="mt-2 text-[10px] font-mono text-[#666]">
          {filled}% funded · {formatUSD(Number(campaign.funding_raised_usd))} /{" "}
          {formatUSD(Number(campaign.funding_target_usd))}
        </p>

        {campaign.project && (
          <div className="mt-8 terminal-window terminal-body p-6">
            <p className="text-[9px] font-mono text-[#555] mb-2">// PROJECT</p>
            <h2 className="text-[11px] font-mono text-[#ccff00]">{campaign.project.name}</h2>
            {campaign.project.description && (
              <p className="mt-2 text-[12px] font-mono text-[#888] leading-relaxed">
                {campaign.project.description}
              </p>
            )}
            <div className="mt-4 flex flex-wrap gap-3 text-[10px] font-mono">
              {campaign.project.pitch_deck_url && (
                <a
                  href={campaign.project.pitch_deck_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#ccff00] hover:underline"
                >
                  View pitch deck →
                </a>
              )}
              {campaign.project.repository_url && (
                <a
                  href={campaign.project.repository_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#9d00ff] hover:underline"
                >
                  Repository →
                </a>
              )}
            </div>
          </div>
        )}

        <div className="mt-8 terminal-window terminal-body p-6">
          <p className="text-[9px] font-mono text-[#555] mb-2">// THESIS</p>
          <p className="text-[12px] font-mono text-[#888] leading-relaxed">{campaign.thesis}</p>
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-4 text-[11px] font-mono">
          <div className="border border-[#2a2a2a] bg-[#141414] p-4">
            <dt className="text-[9px] text-[#555]">PRICE / SHARD</dt>
            <dd className="text-[#9d00ff]">{formatUSD(Number(campaign.price_per_shard_usd))}</dd>
          </div>
          <div className="border border-[#2a2a2a] bg-[#141414] p-4">
            <dt className="text-[9px] text-[#555]">AVAILABLE</dt>
            <dd>{formatShard(campaign.shards_available)}</dd>
          </div>
          <div className="border border-[#2a2a2a] bg-[#141414] p-4">
            <dt className="text-[9px] text-[#555]">QUORUM</dt>
            <dd>{campaign.quorum_percentage}%</dd>
          </div>
          <div className="border border-[#2a2a2a] bg-[#141414] p-4">
            <dt className="text-[9px] text-[#555]">FORGE STAGE</dt>
            <dd className="text-[#ccff00]">{campaign.forge_stage || "NOT SET"}</dd>
          </div>
        </dl>

        <div className="mt-8">
          <RiskDisclosure />
        </div>

        <button
          type="button"
          className="btn-primary mt-8 px-8 py-3 text-[10px]"
          onClick={() => setShowInvest(true)}
        >
          [ INVEST IN SHARDS ]
        </button>

        {showInvest && (
          <InvestModal 
            campaign={campaign} 
            onClose={() => setShowInvest(false)} 
            onSuccess={(result) => {
              const holdingId = result?.id || result?.holding_id || result?.holdingId;
              if (holdingId) {
                router.push(`/marketplace/${campaign.id}/invest/success?holdingId=${holdingId}`);
              } else {
                router.push(`/marketplace/${campaign.id}/invest/success`);
              }
            }}
          />
        )}
      </div>
    </section>
  )
}
