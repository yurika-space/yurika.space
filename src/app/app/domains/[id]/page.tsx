"use client"

import { use, useState } from "react"
import Link from "next/link"
import { useDomain } from "@/hooks/useDomains"
import { useCampaigns, useUpdateCampaign } from "@/hooks/useCampaigns"
import { formatUSD } from "@/lib/utils"

const FORGE_STAGES = [
  "01 Vault",
  "02 Mint Shards",
  "03 Launch Campaign",
  "04 Curators Invest",
  "05 Forge Stages",
  "06 Ship",
]

export default function DomainDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: validId } = use(params)
  const { data: domain, isLoading, isError } = useDomain(validId)
  const { data: campaigns } = useCampaigns()
  const updateCampaign = useUpdateCampaign()
  const campaign = campaigns?.find((c) => c.domain === validId)
  const [forgeStage, setForgeStage] = useState("")

  if (!validId?.trim()) {
    return (
      <section className="px-6 py-12">
        <p className="text-[11px] font-mono text-[#ff3131]">Invalid domain ID.</p>
        <Link href="/app" className="mt-4 inline-block text-[10px] font-mono text-[#ccff00]">
          ← COMMAND CENTER
        </Link>
      </section>
    )
  }

  if (isLoading) {
    return (
      <section className="px-6 py-12">
        <p className="text-[11px] font-mono text-[#666] animate-pulse">Loading domain...</p>
      </section>
    )
  }

  if (isError || !domain) {
    return (
      <section className="px-6 py-12">
        <p className="text-[11px] font-mono text-[#ff3131]">Domain not found or access denied.</p>
        <Link href="/app" className="mt-4 inline-block text-[10px] font-mono text-[#ccff00]">
          ← COMMAND CENTER
        </Link>
      </section>
    )
  }

  async function saveForgeStage() {
    if (!campaign || !forgeStage) return
    await updateCampaign.mutateAsync({ id: campaign.id, forge_stage: forgeStage })
  }

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <Link href="/app" className="text-[9px] font-mono text-[#555] hover:text-[#ccff00]">
          ← COMMAND CENTER
        </Link>
        <h1 className="mt-6 text-[clamp(13px,2vw,18px)] font-display text-[#e0e0e0]">{domain.name}</h1>
        <p className="mt-2 text-[10px] font-mono uppercase text-[#9d00ff]">{domain.status}</p>

        <dl className="mt-8 space-y-4 text-[11px] font-mono">
          {domain.ownership_proof_url && (
            <div>
              <dt className="text-[9px] text-[#555]">PROOF</dt>
              <dd>
                <a href={domain.ownership_proof_url} className="text-[#ccff00] break-all hover:underline" target="_blank" rel="noreferrer">
                  {domain.ownership_proof_url}
                </a>
              </dd>
            </div>
          )}
          {domain.vault_contract_address && (
            <div>
              <dt className="text-[9px] text-[#555]">VAULT CONTRACT</dt>
              <dd className="break-all text-[#9d00ff]">{domain.vault_contract_address}</dd>
            </div>
          )}
        </dl>

        {campaign ? (
          <div className="mt-10 terminal-window terminal-body p-6">
            <p className="text-[9px] font-mono text-[#555] mb-2">// CAMPAIGN</p>
            <h2 className="text-[11px] font-mono text-[#ccff00]">{campaign.title}</h2>
            <p className="mt-2 text-[10px] font-mono text-[#666]">
              {formatUSD(Number(campaign.funding_raised_usd))} raised · {Math.round(campaign.funding_percentage)}%
            </p>

            {domain.status === "completed" && (
              <div className="mt-6 border border-[#2a2a2a] bg-[#111] p-4">
                <p className="text-[9px] font-mono text-[#555] mb-2">// TREASURY</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[8px] text-[#555]">FUNDS IN LEDGER</p>
                    <p className="text-[11px] text-[#ccff00]">{formatUSD(Number(campaign.funding_raised_usd))}</p>
                  </div>
                  <div>
                    <p className="text-[8px] text-[#555]">CURATORS</p>
                    <p className="text-[11px] text-[#e0e0e0]">{campaign.curator_count ?? "—"}</p>
                  </div>
                </div>
                <button className="btn-primary mt-4 w-full py-2 text-[9px] opacity-50 cursor-not-allowed" disabled>
                  [ WITHDRAW/TRANSFER (COMING SOON) ]
                </button>
              </div>
            )}

            <label className="mt-6 block space-y-1">
              <span className="text-[9px] font-mono text-[#555]">FORGE STAGE</span>
              <select
                value={forgeStage || campaign.forge_stage || FORGE_STAGES[0]}
                onChange={(e) => setForgeStage(e.target.value)}
                className="w-full border border-[#2a2a2a] bg-[#141414] px-3 py-2 text-[11px] font-mono"
              >
                {FORGE_STAGES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <button type="button" className="btn-primary mt-4 px-4 py-2 text-[9px]" onClick={saveForgeStage}>
              [ UPDATE FORGE STAGE ]
            </button>
            <Link href={`/marketplace/${campaign.id}`} className="mt-4 block text-[10px] font-mono text-[#ccff00]">
              Public campaign view →
            </Link>
            <Link href={`/app/forge?campaignId=${campaign.id}`} className="mt-2 block text-[10px] font-mono text-[#888]">
              Open Forge tracker →
            </Link>
          </div>
        ) : (
          <p className="mt-8 text-[10px] font-mono text-[#555]">No campaign published for this domain yet.</p>
        )}

        <div className="mt-8 border border-[#2a2a2a] p-4 text-[10px] font-mono text-[#666]">
          <p className="text-[9px] text-[#555] mb-2">// STATUS TIMELINE (V1)</p>
          <ul className="space-y-1">
            <li>Registered — {new Date(domain.created_at).toLocaleDateString()}</li>
            <li>Current — {domain.status}</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
