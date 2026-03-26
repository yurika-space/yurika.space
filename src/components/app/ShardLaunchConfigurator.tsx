"use client"

import { useMemo, useState } from "react"
import { formatUSD } from "@/lib/utils"

export function ShardLaunchConfigurator() {
  const [domainName, setDomainName] = useState("ai-health.com")
  const [supply, setSupply] = useState(10000)
  const [pricePerShard, setPricePerShard] = useState(12)
  const [governanceThreshold, setGovernanceThreshold] = useState(51)

  const estimatedRaise = useMemo(() => supply * pricePerShard, [supply, pricePerShard])

  return (
    <section className="terminal-window terminal-body p-6">
      <p className="mb-3 text-[9px] font-mono tracking-widest text-[#555]">{"// MODULE 02 // SHARD LAUNCH CONFIG"}</p>
      <h2 className="mb-5 text-[10px] font-mono tracking-widest text-[#9d00ff]">TOKENOMICS CONSOLE</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="space-y-1">
          <span className="text-[9px] font-mono tracking-widest text-[#666]">DOMAIN</span>
          <input
            value={domainName}
            onChange={(e) => setDomainName(e.target.value)}
            className="w-full border border-[#2a2a2a] bg-[#141414] px-3 py-2 text-[11px] font-mono text-[#e0e0e0]"
          />
        </label>

        <label className="space-y-1">
          <span className="text-[9px] font-mono tracking-widest text-[#666]">TOTAL SHARDS</span>
          <input
            type="number"
            min={100}
            step={100}
            value={supply}
            onChange={(e) => setSupply(Number(e.target.value || 0))}
            className="w-full border border-[#2a2a2a] bg-[#141414] px-3 py-2 text-[11px] font-mono text-[#e0e0e0]"
          />
        </label>

        <label className="space-y-1">
          <span className="text-[9px] font-mono tracking-widest text-[#666]">PRICE / SHARD (USD)</span>
          <input
            type="number"
            min={1}
            step={1}
            value={pricePerShard}
            onChange={(e) => setPricePerShard(Number(e.target.value || 0))}
            className="w-full border border-[#2a2a2a] bg-[#141414] px-3 py-2 text-[11px] font-mono text-[#e0e0e0]"
          />
        </label>

        <label className="space-y-1">
          <span className="text-[9px] font-mono tracking-widest text-[#666]">
            GOVERNANCE THRESHOLD ({governanceThreshold}%)
          </span>
          <input
            type="range"
            min={50}
            max={80}
            value={governanceThreshold}
            onChange={(e) => setGovernanceThreshold(Number(e.target.value))}
            className="w-full accent-[#9d00ff]"
          />
        </label>
      </div>

      <div className="mt-6 border border-[#2a2a2a] bg-[#141414] p-4">
        <p className="text-[9px] font-mono tracking-widest text-[#666]">ESTIMATED RAISE</p>
        <p className="mt-2 text-[16px] font-mono text-[#9d00ff]" style={{ textShadow: "0 0 12px #9d00ff66" }}>
          {formatUSD(estimatedRaise)}
        </p>
        <p className="mt-1 text-[10px] font-mono text-[#777]">
          {domainName || "Unnamed domain"} · {supply.toLocaleString()} shards · {formatUSD(pricePerShard)} each
        </p>
      </div>

      <div className="mt-5 flex gap-3">
        <button type="button" className="btn-primary px-4 py-2 text-[9px]">
          SIMULATE LAUNCH
        </button>
        <button type="button" className="btn-ghost px-4 py-2 text-[9px]">
          SAVE DRAFT
        </button>
      </div>
    </section>
  )
}
