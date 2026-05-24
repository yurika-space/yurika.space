"use client"

import Link from "next/link"
import { useHoldings } from "@/hooks/useHoldings"
import { useAuthStore } from "@/lib/auth-store"
import { formatShard, formatUSD } from "@/lib/utils"

export default function PortfolioPage() {
  const isAuthed = Boolean(useAuthStore((s) => s.accessToken))
  const { data: holdings, isLoading, isError } = useHoldings()

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <Link href="/app" className="text-[9px] font-mono text-[#555] hover:text-[#ccff00]">
          ← COMMAND CENTER
        </Link>
        <h1 className="mt-6 text-[clamp(13px,2.5vw,18px)] font-display text-[#e0e0e0]">
          CURATOR <span className="text-[#9d00ff]">PORTFOLIO</span>
        </h1>
        <p className="mt-2 text-[11px] font-mono text-[#888]">
          Off-chain ledger holdings (V1). Authenticate to view positions.
        </p>

        {!isAuthed && (
          <p className="mt-8 text-[10px] font-mono text-[#ffaa00]">
            <Link href="/marketplace" className="text-[#ccff00] underline">
              Sign in
            </Link>{" "}
            via the header wallet to view holdings.
          </p>
        )}

        {isAuthed && isLoading && (
          <p className="mt-8 text-[10px] font-mono text-[#666] animate-pulse">LOADING...</p>
        )}
        {isAuthed && isError && (
          <p className="mt-8 text-[10px] font-mono text-[#ff3131]">
            Failed to load holdings — try signing in again.
          </p>
        )}

        <div className="mt-8 overflow-x-auto border border-[#2a2a2a]">
          <table className="w-full border-collapse text-[11px] font-mono">
            <thead>
              <tr className="border-b border-[#2a2a2a] text-[9px] text-[#555]">
                <th className="px-3 py-2 text-left">DOMAIN</th>
                <th className="px-3 py-2 text-left">CAMPAIGN</th>
                <th className="px-3 py-2 text-left">SHARDS</th>
                <th className="px-3 py-2 text-left">TOTAL COST</th>
              </tr>
            </thead>
            <tbody>
              {isAuthed && holdings?.map((h) => (
                <tr key={h.id} className="border-b border-[#1a1a1a] text-[#888]">
                  <td className="px-3 py-3">
                    <Link href={`/marketplace/${h.campaign}`} className="text-[#ccff00] hover:underline">
                      {h.domain_name}
                    </Link>
                  </td>
                  <td className="px-3 py-3">{h.campaign_title}</td>
                  <td className="px-3 py-3">{formatShard(h.shards_held)}</td>
                  <td className="px-3 py-3">{formatUSD(Number(h.purchase_price_usd) * h.shards_held)}</td>
                </tr>
              ))}
              {isAuthed && !isLoading && holdings?.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-3 py-8 text-center text-[#555]">
                    NO HOLDINGS — invest from the marketplace.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
