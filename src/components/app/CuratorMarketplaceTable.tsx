"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCampaigns, type CampaignSort } from "@/hooks/useCampaigns"
import { formatShard, formatUSD } from "@/lib/utils"
import { DomainDetailDrawer } from "@/components/app/DomainDetailDrawer"
import type { ShardCampaign } from "@/lib/types"

type Props = {
  publicLinks?: boolean
}

export function CuratorMarketplaceTable({ publicLinks = false }: Props) {
  const router = useRouter()
  const [sort, setSort] = useState<CampaignSort>("funding")
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "live" | "funded" | "closed">("all")
  const [selected, setSelected] = useState<ShardCampaign | null>(null)

  const { data: listings, isLoading, isError } = useCampaigns(sort, { search })

  function getCampaignState(campaign: ShardCampaign) {
    if (campaign.funding_percentage >= 100) return "Funded"
    if (campaign.ends_at && new Date(campaign.ends_at) < new Date()) return "Closed"
    return "Live"
  }

  const filteredListings = listings?.filter((row) => {
    if (statusFilter === "all") return true
    const state = getCampaignState(row).toLowerCase()
    return state === statusFilter
  })

  function openListing(row: ShardCampaign) {
    if (publicLinks) {
      router.push(`/marketplace/${row.id}`)
      return
    }
    setSelected(row)
  }

  return (
    <>
      <section className="terminal-window terminal-body p-6">
        <p className="mb-3 text-[9px] font-mono tracking-widest text-[#555]">{"// MODULE 03 // CURATOR MARKET TERMINAL"}</p>
        <h2 className="mb-5 text-[10px] font-mono tracking-widest text-[#ccff00]">ACTIVE SHARD LISTINGS</h2>

        <div className="mb-4 flex flex-wrap gap-2">
          <div className="flex gap-1 border-r border-[#2a2a2a] pr-2 mr-1">
            {(["all", "live", "funded", "closed"] as const).map((s) => (
              <button
                key={s}
                type="button"
                className={`px-3 py-1 text-[9px] font-mono border ${
                  statusFilter === s ? "border-[#ccff00] text-[#ccff00]" : "border-[#2a2a2a] text-[#666]"
                }`}
                onClick={() => setStatusFilter(s)}
              >
                {s.toUpperCase()}
              </button>
            ))}
          </div>
          {(
            [
              ["funding", "FILL %"],
              ["price", "PRICE"],
              ["available", "SUPPLY"],
              ["name", "NAME"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={`px-3 py-1 text-[9px] font-mono border ${
                sort === key ? "border-[#ccff00] text-[#ccff00]" : "border-[#2a2a2a] text-[#666]"
              }`}
              onClick={() => setSort(key)}
            >
              {label}
            </button>
          ))}
          <input
            placeholder="SEARCH DOMAINS"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ml-auto min-w-[160px] border border-[#2a2a2a] bg-[#141414] px-3 py-1 text-[9px] font-mono text-[#e0e0e0]"
          />
        </div>

        {isLoading && <p className="text-[10px] font-mono text-[#666] animate-pulse">LOADING LISTINGS...</p>}
        {isError && <p className="text-[10px] font-mono text-[#ff3131]">MARKET OFFLINE — START DJANGO API</p>}

        <div className="overflow-x-auto border border-[#2a2a2a] bg-[#141414]">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="border-b border-[#2a2a2a] text-left text-[9px] font-mono tracking-widest text-[#666]">
                <th className="px-3 py-2">DOMAIN</th>
                <th className="px-3 py-2">CAMPAIGN</th>
                <th className="px-3 py-2">SHARD PRICE</th>
                <th className="px-3 py-2">AVAILABLE</th>
                <th className="px-3 py-2">FILL</th>
              </tr>
            </thead>
            <tbody>
              {filteredListings?.map((row) => {
                const filled = Math.min(100, Math.round(row.funding_percentage))
                const state = getCampaignState(row)
                return (
                  <tr
                    key={row.id}
                    className="border-b border-[#1a1a1a] text-[11px] font-mono text-[#888] cursor-pointer hover:bg-[#1a1a1a]"
                    onClick={() => openListing(row)}
                  >
                    <td className="px-3 py-3 text-[#e0e0e0]">
                      {row.domain_name}
                      <span className={`ml-2 inline-block px-1.5 py-0.5 text-[8px] ${
                        state === "Live" ? "bg-[#ccff00]/10 text-[#ccff00]" :
                        state === "Funded" ? "bg-[#9d00ff]/10 text-[#9d00ff]" :
                        "bg-[#333] text-[#888]"
                      }`}>
                        {state.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-3 py-3">{row.title}</td>
                    <td className="px-3 py-3 text-[#9d00ff]">{formatUSD(Number(row.price_per_shard_usd))}</td>
                    <td className="px-3 py-3">{formatShard(row.shards_available)}</td>
                    <td className="px-3 py-3">
                      <div className="w-28 border border-[#2a2a2a] bg-[#111]">
                        <div className="h-2 bg-[#ccff00]" style={{ width: `${filled}%` }} />
                      </div>
                      <span className="mt-1 inline-block text-[9px] text-[#666]">{filled}%</span>
                    </td>
                  </tr>
                )
              })}
              {!isLoading && filteredListings?.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-3 py-8 text-center text-[10px] text-[#555]">
                    NO LISTINGS MATCHING CRITERIA
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex gap-3">
          <span className="btn-primary px-4 py-2 text-[9px] opacity-50 cursor-not-allowed" title="Coming soon">
            SECONDARY MARKET — COMING SOON
          </span>
        </div>
      </section>

      {!publicLinks && (
        <DomainDetailDrawer campaign={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
