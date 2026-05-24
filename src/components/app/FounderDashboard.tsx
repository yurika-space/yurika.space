"use client"

import Link from "next/link"
import { useDomains } from "@/hooks/useDomains"
import { useCampaigns } from "@/hooks/useCampaigns"
import { useProtocolStats } from "@/hooks/useProtocolStats"

const STATUS_COLORS: Record<string, string> = {
  pending: "#ffaa00",
  verified: "#9d00ff",
  vaulted: "#ccff00",
  active: "#ccff00",
  sharding: "#9d00ff",
  completed: "#888",
}

export function FounderDashboard() {
  const { data: domains } = useDomains()
  const { data: campaigns } = useCampaigns()
  const { data: stats } = useProtocolStats()

  const pendingVerification = domains?.filter((d) => d.status === "pending").length ?? 0
  const vaultedCount = domains?.filter((d) => d.status === "vaulted").length ?? 0
  const latestForge = campaigns?.[0]?.forge_stage || "—"

  const statusRows = [
    { label: "Domain Vault Engine", value: vaultedCount > 0 ? "ONLINE" : "STANDBY", tone: vaultedCount > 0 ? "#ccff00" : "#ffaa00" },
    { label: "Shard Marketplace", value: `${stats?.campaign_count ?? 0} LIVE`, tone: "#9d00ff" },
    { label: "Knowledge Graph", value: "SYNCING", tone: "#ffaa00" },
    { label: "Forge Pipeline", value: latestForge, tone: "#ccff00" },
  ]

  return (
    <>
      <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
        {statusRows.map((row) => (
          <div key={row.label} className="border border-[#2a2a2a] bg-[#141414] px-4 py-3">
            <p className="text-[9px] font-mono tracking-widest text-[#666]">{row.label}</p>
            <p className="mt-1 text-[11px] font-mono font-bold" style={{ color: row.tone }}>
              {row.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-[#2a2a2a] pt-6">
        <p className="mb-3 text-[9px] font-mono tracking-widest text-[#555]">// MY DOMAINS</p>
        {pendingVerification > 0 && (
          <p className="mb-3 text-[10px] font-mono text-[#ffaa00]">
            {pendingVerification} pending verification
          </p>
        )}
        <ul className="space-y-2">
          {domains?.map((d) => (
            <li key={d.id} className="flex items-center justify-between border border-[#2a2a2a] bg-[#141414] px-3 py-2">
              <span className="text-[11px] font-mono text-[#e0e0e0]">{d.name}</span>
              <span
                className="text-[9px] font-mono uppercase"
                style={{ color: STATUS_COLORS[d.status] ?? "#888" }}
              >
                {d.status}
              </span>
              <Link href={`/app/domains/${d.id}`} className="text-[9px] font-mono text-[#ccff00] hover:underline">
                OPEN →
              </Link>
            </li>
          ))}
          {domains?.length === 0 && (
            <li className="text-[10px] font-mono text-[#555]">No domains — start vault wizard.</li>
          )}
        </ul>
      </div>
    </>
  )
}
