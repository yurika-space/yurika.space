import { formatShard, formatUSD } from "@/lib/utils"

type Listing = {
  domain: string
  sector: string
  shardPrice: number
  availableShards: number
  filled: number
}

const LISTINGS: Listing[] = [
  {
    domain: "ai-health.com",
    sector: "Health AI",
    shardPrice: 14,
    availableShards: 7400,
    filled: 26,
  },
  {
    domain: "agentic-finance.xyz",
    sector: "DeFi Infra",
    shardPrice: 11,
    availableShards: 12000,
    filled: 44,
  },
  {
    domain: "sori.page",
    sector: "Story Graph",
    shardPrice: 9,
    availableShards: 5100,
    filled: 61,
  },
]

export function CuratorMarketplaceTable() {
  return (
    <section className="terminal-window terminal-body p-6">
      <p className="mb-3 text-[9px] font-mono tracking-widest text-[#555]">{"// MODULE 03 // CURATOR MARKET TERMINAL"}</p>
      <h2 className="mb-5 text-[10px] font-mono tracking-widest text-[#ccff00]">ACTIVE SHARD LISTINGS</h2>

      <div className="overflow-x-auto border border-[#2a2a2a] bg-[#141414]">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr className="border-b border-[#2a2a2a] text-left text-[9px] font-mono tracking-widest text-[#666]">
              <th className="px-3 py-2">DOMAIN</th>
              <th className="px-3 py-2">SECTOR</th>
              <th className="px-3 py-2">SHARD PRICE</th>
              <th className="px-3 py-2">AVAILABLE</th>
              <th className="px-3 py-2">FILL</th>
            </tr>
          </thead>
          <tbody>
            {LISTINGS.map((row) => (
              <tr key={row.domain} className="border-b border-[#1a1a1a] text-[11px] font-mono text-[#888]">
                <td className="px-3 py-3 text-[#e0e0e0]">{row.domain}</td>
                <td className="px-3 py-3">{row.sector}</td>
                <td className="px-3 py-3 text-[#9d00ff]">{formatUSD(row.shardPrice)}</td>
                <td className="px-3 py-3">{formatShard(row.availableShards)}</td>
                <td className="px-3 py-3">
                  <div className="w-28 border border-[#2a2a2a] bg-[#111]">
                    <div className="h-2 bg-[#ccff00]" style={{ width: `${row.filled}%` }} />
                  </div>
                  <span className="mt-1 inline-block text-[9px] text-[#666]">{row.filled}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex gap-3">
        <button type="button" className="btn-primary px-4 py-2 text-[9px]">
          OPEN TRADING TERMINAL
        </button>
        <button type="button" className="btn-ghost px-4 py-2 text-[9px]">
          EXPORT WATCHLIST
        </button>
      </div>
    </section>
  )
}
