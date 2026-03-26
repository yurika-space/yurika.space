"use client"

import { motion } from "framer-motion"
import { AnimatedSection } from "@/components/shared/AnimatedSection"

const FORGE_STAGES = [
  { step: "01", label: "VAULT DOMAIN", desc: "Secure domain credentials on-chain" },
  { step: "02", label: "MINT SHARDS", desc: "Deploy ERC-20/1155 fractional tokens" },
  { step: "03", label: "LAUNCH CAMPAIGN", desc: "Set funding target and governance rules" },
  { step: "04", label: "CURATORS INVEST", desc: "Global network funds your vision" },
  { step: "05", label: "FORGE STAGES", desc: "Structured execution pipeline to MVP" },
  { step: "06", label: "SHIP", desc: "From concept to live product" },
]

export function ForgeSection() {
  return (
    <section className="py-32 px-6" id="forge">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Copy */}
          <AnimatedSection>
            <p className="text-[9px] font-mono text-[#555] tracking-widest mb-4">
              // YURIKA FORGE — EXECUTION PIPELINE
            </p>
            <h2 className="text-[clamp(12px,2.5vw,18px)] font-display text-[#e0e0e0] leading-relaxed mb-6">
              WE DON&apos;T JUST{" "}
              <span className="text-[#ccff00] glow-lime">FUND.</span>
              <br />
              WE FORGE.
            </h2>
            <p className="text-[13px] font-mono text-[#888] leading-loose mb-8">
              Access the same strategic orchestrators used by the world&apos;s most
              efficient solo founders. From technical specs to landing copy,
              yurika.space provides the automated infrastructure to take your
              sharded project from concept to code in record time.
            </p>
            <button className="btn-primary text-[10px] py-3 px-8">
              [ ENTER THE FORGE ]
            </button>
          </AnimatedSection>

          {/* Pipeline visualization */}
          <div className="space-y-2">
            {FORGE_STAGES.map((stage, i) => (
              <motion.div
                key={stage.step}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="flex items-center gap-4 p-3 border border-[#1a1a1a] hover:border-[#ccff0022] transition-colors group"
              >
                {/* Connector line */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <span
                    className="text-[9px] font-mono font-bold group-hover:text-[#ccff00] transition-colors"
                    style={{ color: i === 0 ? "#ccff00" : "#444" }}
                  >
                    {stage.step}
                  </span>
                  {i < FORGE_STAGES.length - 1 && (
                    <div className="w-px h-4 bg-[#2a2a2a] mt-1" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-[9px] font-mono text-[#e0e0e0] tracking-widest">
                    {stage.label}
                  </p>
                  <p className="text-[10px] font-mono text-[#555] mt-0.5">{stage.desc}</p>
                </div>
                <div className="w-2 h-2 bg-[#2a2a2a] group-hover:bg-[#ccff00] transition-colors flex-shrink-0" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
