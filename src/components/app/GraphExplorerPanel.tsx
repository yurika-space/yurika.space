"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuthStore } from "@/lib/auth-store"
import { useGraphDiscover, usePublicGraphTeaser, type GraphFilters } from "@/hooks/useGraph"
import type { GraphNode } from "@/lib/types"
import { WaitlistForm } from "@/components/marketing/WaitlistForm"

const NODE_COLORS: Record<string, string> = {
  founder: "#ccff00",
  domain: "#9d00ff",
  curator: "#ffaa00",
  connector: "#e0e0e0",
}

function NodeCard({
  node,
  onSelect,
}: {
  node: GraphNode
  onSelect: (n: GraphNode) => void
}) {
  const color = NODE_COLORS[node.node_type] ?? "#888"
  return (
    <button
      type="button"
      onClick={() => onSelect(node)}
      className="border border-[#2a2a2a] bg-[#141414] p-3 text-left hover:border-[#ccff0066] transition-colors"
    >
      <p className="text-[9px] font-mono tracking-widest" style={{ color }}>
        {node.node_type.toUpperCase()}
      </p>
      <p className="mt-1 text-[11px] font-mono text-[#e0e0e0]">{node.label}</p>
      {node.sublabel && <p className="text-[9px] font-mono text-[#666]">{node.sublabel}</p>}
    </button>
  )
}

function NodeProfileSlide({ node, onClose }: { node: GraphNode; onClose: () => void }) {
  const isConnector = node.node_type === "connector"
  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <button type="button" className="absolute inset-0 bg-black/70" aria-label="Close" onClick={onClose} />
      <aside className="relative h-full w-full max-w-sm border-l border-[#2a2a2a] bg-[#0d0d0d] p-6 overflow-y-auto">
        <p className="text-[9px] font-mono text-[#555]">{node.node_type.toUpperCase()} PROFILE</p>
        <h2 className="mt-2 text-[12px] font-mono text-[#ccff00]">{node.label}</h2>
        {node.sector && <p className="mt-2 text-[10px] font-mono text-[#888]">Sector: {node.sector}</p>}
        {node.geography && <p className="text-[10px] font-mono text-[#888]">Geo: {node.geography}</p>}
        {node.metadata?.funding_percentage != null && (
          <p className="mt-2 text-[10px] font-mono text-[#9d00ff]">
            Funding: {String(node.metadata.funding_percentage)}%
          </p>
        )}
        <div className="mt-8">
          {isConnector ? (
            <>
              <p className="mb-3 text-[10px] font-mono text-[#888]">Join the network as a connector.</p>
              <WaitlistForm compact />
            </>
          ) : node.node_type === "domain" ? (
            <Link href="/marketplace" className="btn-primary inline-block px-4 py-2 text-[9px]">
              VIEW CAMPAIGNS →
            </Link>
          ) : (
            <Link href="/app" className="btn-ghost inline-block px-4 py-2 text-[9px]">
              OPEN COMMAND CENTER →
            </Link>
          )}
        </div>
      </aside>
    </div>
  )
}

export function GraphExplorerPanel({
  compact = false,
  publicTeaser = false,
}: {
  compact?: boolean
  publicTeaser?: boolean
}) {
  const isAuthed = Boolean(useAuthStore((s) => s.accessToken))
  const [filters, setFilters] = useState<GraphFilters>({ type: "all" })
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null)

  const publicQuery = usePublicGraphTeaser()
  const authQuery = useGraphDiscover(filters, isAuthed && !publicTeaser)

  const data = publicTeaser ? publicQuery.data : authQuery.data
  const isLoading = publicTeaser ? publicQuery.isLoading : authQuery.isLoading
  const isError = publicTeaser ? publicQuery.isError : authQuery.isError
  const error = publicTeaser ? publicQuery.error : authQuery.error

  if (!publicTeaser && !isAuthed) {
    return (
      <section className={compact ? "" : "terminal-window terminal-body p-6"}>
        <p className="text-[11px] font-mono text-[#888] mb-4">
          Public network teaser below. Connect wallet in Command Center for full filters.
        </p>
        <GraphExplorerPanel compact publicTeaser />
      </section>
    )
  }

  return (
    <>
      <section className={compact ? "" : "terminal-window terminal-body p-6"}>
        {!compact && (
          <>
            <p className="mb-3 text-[9px] font-mono tracking-widest text-[#555]">
              {"// MODULE 04 // KNOWLEDGE GRAPH EXPLORER"}
            </p>
            <h2 className="mb-4 text-[10px] font-mono tracking-widest text-[#ccff00]">STAR MAP DISCOVERY</h2>
          </>
        )}

        {publicTeaser && data && (
          <p className="mb-4 text-[10px] font-mono text-[#666]">
            NETWORK NODES: {data.count}
            {data.counts_by_type &&
              ` · founders ${data.counts_by_type.founder ?? 0} · domains ${data.counts_by_type.domain ?? 0}`}
          </p>
        )}

        {!publicTeaser && isAuthed && (
          <div className="mb-4 flex flex-wrap gap-2">
            {(["all", "founder", "domain", "curator", "connector"] as const).map((t) => (
              <button
                key={t}
                type="button"
                className={`px-3 py-1 text-[9px] font-mono border ${
                  filters.type === t
                    ? "border-[#ccff00] text-[#ccff00] bg-[#ccff000a]"
                    : "border-[#2a2a2a] text-[#666]"
                }`}
                onClick={() => setFilters((f) => ({ ...f, type: t }))}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>
        )}

        {isLoading && (
          <p className="text-[10px] font-mono text-[#666] animate-pulse">SCANNING CONSTELLATION...</p>
        )}

        {isError && (
          <div className="border border-[#ff3131] bg-[#ff31310a] p-4">
            <p className="text-[10px] font-mono text-[#ff3131]">SIGNAL LOST</p>
            <p className="mt-1 text-[9px] font-mono text-[#888]">
              {(error as Error)?.message || "Graph unavailable — is Neo4j running?"}
            </p>
          </div>
        )}

        {data && data.count === 0 && !isLoading && (
          <p className="text-[10px] font-mono text-[#666]">NO NODES IN RANGE. RUN FOUNDER + INVEST FLOWS TO SEED.</p>
        )}

        {data && data.results.length > 0 && (
          <div
            className={`grid gap-2 ${compact ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}
          >
            {data.results.map((node) => (
              <NodeCard key={`${node.node_type}-${node.uid}`} node={node} onSelect={setSelectedNode} />
            ))}
          </div>
        )}

        {publicTeaser && (
          <Link href="/app" className="mt-6 inline-block text-[10px] font-mono text-[#ccff00] hover:underline">
            Full graph in Command Center →
          </Link>
        )}
      </section>

      {selectedNode && <NodeProfileSlide node={selectedNode} onClose={() => setSelectedNode(null)} />}
    </>
  )
}
