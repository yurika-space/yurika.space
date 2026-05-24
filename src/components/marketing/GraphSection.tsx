"use client"

import { GraphExplorerPanel } from "@/components/app/GraphExplorerPanel"

export function GraphSection() {
  return (
    <section className="py-32 px-6" id="graph">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <p className="text-[9px] font-mono text-[#555] tracking-widest mb-4">
            // NETWORK INTELLIGENCE
          </p>
          <h2 className="text-[clamp(12px,2.5vw,20px)] font-display text-[#e0e0e0]">
            KNOWLEDGE{" "}
            <span className="text-[#ccff00] glow-lime">GRAPH</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-[11px] font-mono text-[#888] leading-relaxed">
            Neo4j-powered discovery — founders, domains, curators, and connectors as a star map.
          </p>
        </div>
        <GraphExplorerPanel compact publicTeaser />
      </div>
    </section>
  )
}
