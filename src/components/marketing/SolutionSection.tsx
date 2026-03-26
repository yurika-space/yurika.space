"use client"

import { motion } from "framer-motion"
import { AnimatedSection } from "@/components/shared/AnimatedSection"

const SOLUTION_POINTS = [
  {
    id: "01",
    title: "VAULTING AND VERIFICATION",
    body: "Your domain is secured in a transparent blockchain vault. Multi-step verification ensures authenticity before any shard is minted.",
    color: "#ccff00",
  },
  {
    id: "02",
    title: "INSTANT LIQUIDITY",
    body: "Raise funds from a global network of curators without losing total control. Set your terms, define shard supply, governance rules.",
    color: "#9d00ff",
  },
  {
    id: "03",
    title: "BUILT-IN ACCELERATION",
    body: "Every sharded project enters Yurika Forge — a battle-tested pipeline for technical and creative execution. Concept to code.",
    color: "#ccff00",
  },
]

export function SolutionSection() {
  return (
    <section className="py-32 px-6" id="vault">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection className="text-center mb-16">
          <p className="text-[9px] font-mono text-[#555] tracking-widest mb-4">
            // THE SOLUTION — DIGITAL ALCHEMY
          </p>
          <h2 className="text-[clamp(12px,2.5vw,20px)] font-display text-[#e0e0e0] leading-relaxed">
            SHARD YOUR DOMAIN.{" "}
            <span className="text-[#ccff00] glow-lime">SCALE YOUR VISION.</span>
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-[13px] font-mono text-[#888] leading-loose">
            yurika.space turns static domains into liquid engines of growth. By
            vaulting your domain, you mint tradable ownership shards. You keep
            the vision; the community provides the fuel.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SOLUTION_POINTS.map((point, i) => (
            <motion.div
              key={point.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="terminal-window p-6 terminal-body group hover:border-[#ccff0033] transition-colors"
            >
              <p
                className="text-[24px] font-display mb-4"
                style={{ color: point.color, textShadow: `0 0 12px ${point.color}66` }}
              >
                [{point.id}]
              </p>
              <h3 className="text-[9px] font-mono text-[#e0e0e0] tracking-widest mb-3">
                {point.title}
              </h3>
              <p className="text-[11px] font-mono text-[#666] leading-relaxed">
                {point.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
