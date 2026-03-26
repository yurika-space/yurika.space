"use client"

import { motion } from "framer-motion"

const FEATURES = [
  {
    id: "01",
    name: "THE VAULT",
    tagline: "Secure smart-contract-governed storage for your TLDs.",
    body: "Your assets, protected by the ledger. Ownership proof artifacts stored immutably. Multi-signature withdrawal protection. Emergency pause controls for security incidents.",
    stat: "256-BIT",
    statLabel: "ENCRYPTION",
    accent: "#ccff00",
  },
  {
    id: "02",
    name: "SHARD MARKETPLACE",
    tagline: "A high-frequency terminal for trading fractional ownership.",
    body: "Invest in the names that will define the next decade of the web. ERC-20 and ERC-1155 strategies per campaign. Live order book, bid/ask management, and shard-holder governance voting.",
    stat: "ERC-20/1155",
    statLabel: "TOKEN STANDARD",
    accent: "#9d00ff",
  },
  {
    id: "03",
    name: "KNOWLEDGE GRAPH",
    tagline: "A Neo4j-powered star map of founders, developers, and investors.",
    body: "Find your co-founder by following the data, not the hype. Graph-driven discovery by skill, stage, sector, and geography. Relationship edges from investments, follows, partnerships, and milestones.",
    stat: "NEO4J",
    statLabel: "GRAPH ENGINE",
    accent: "#ccff00",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-32 px-6" id="shards">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <p className="text-[9px] font-mono text-[#555] tracking-widest mb-4">
            // CORE MODULES — THE POWER-UPS
          </p>
          <h2 className="text-[clamp(12px,2.5vw,20px)] font-display text-[#e0e0e0]">
            WEAPONS OF{" "}
            <span className="text-[#9d00ff]" style={{ textShadow: "0 0 12px #9d00ff66" }}>
              MASS
            </span>{" "}
            CONSTRUCTION.
          </h2>
        </div>

        <div className="space-y-4">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="terminal-window terminal-body p-0 overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {/* ID block */}
                <div
                  className="flex-shrink-0 w-full md:w-24 flex items-center justify-center p-6 md:p-0"
                  style={{ background: `${feature.accent}08`, borderRight: `1px solid ${feature.accent}22` }}
                >
                  <span
                    className="text-[20px] font-display"
                    style={{ color: feature.accent, textShadow: `0 0 12px ${feature.accent}66` }}
                  >
                    {feature.id}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3
                        className="text-[10px] font-mono tracking-widest mb-1"
                        style={{ color: feature.accent }}
                      >
                        {feature.name}
                      </h3>
                      <p className="text-[12px] font-mono text-[#e0e0e0]">{feature.tagline}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-[11px] font-mono font-bold" style={{ color: feature.accent }}>
                        {feature.stat}
                      </p>
                      <p className="text-[8px] font-mono text-[#555] tracking-widest">{feature.statLabel}</p>
                    </div>
                  </div>
                  <p className="text-[11px] font-mono text-[#666] leading-relaxed">{feature.body}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
