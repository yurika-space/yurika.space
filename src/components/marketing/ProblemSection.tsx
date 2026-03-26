"use client"

import { motion } from "framer-motion"
import { AnimatedSection } from "@/components/shared/AnimatedSection"

export function ProblemSection() {
  return (
    <section className="py-32 px-6">
      <div className="mx-auto max-w-4xl">
        <AnimatedSection>
          <div className="terminal-window p-8 terminal-body">
            <div className="mb-2 text-[9px] font-mono text-[#555] tracking-widest">
              // SYSTEM DIAGNOSTIC — ERROR IDENTIFIED
            </div>

            <motion.h2
              className="text-[clamp(12px,2.5vw,20px)] font-display text-[#ff3131] mb-8 leading-relaxed"
              style={{ textShadow: "0 0 8px #ff3131, 0 0 20px #ff313166" }}
            >
              THE STATUS QUO<br />IS A DEAD END.
            </motion.h2>

            <p className="text-[13px] font-mono text-[#888] leading-loose max-w-2xl">
              Traditional funding is a closed loop. You own a premium domain, a
              digital artifact with massive potential, but it is an{" "}
              <span className="text-[#ff3131]">illiquid asset</span>. To build,
              you need capital. To get capital, you usually have to sell the very
              foundation of your brand.
            </p>

            <div className="mt-8 pt-8 border-t border-[#2a2a2a]">
              <p className="text-[11px] font-mono text-[#ccff00] glow-lime tracking-wider">
                &gt; WE ARE REWRITING THE PROTOCOL.
              </p>
              <span className="cursor text-[11px] font-mono text-[#ccff00]" />
            </div>

            {/* Comparison table */}
            <div className="mt-10 overflow-x-auto">
              <table className="w-full text-[10px] font-mono border-collapse">
                <thead>
                  <tr className="border-b border-[#2a2a2a]">
                    <th className="text-left text-[#555] py-2 pr-6">FEATURE</th>
                    <th className="text-left text-[#ff3131] py-2 pr-6">TRADITIONAL</th>
                    <th className="text-left text-[#ccff00] py-2">YURIKA.SPACE</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Asset Class", "Equity / Rewards", "Fractional Domain (RWA)"],
                    ["Liquidity", "Low / Locked", "High — tradeable on-chain"],
                    ["Governance", "Centralized", "Decentralized via token rights"],
                    ["Access", "Accredited only", "Inclusive micro-investment"],
                    ["Transparency", "Private", "Immutable blockchain ledger"],
                  ].map(([feature, bad, good]) => (
                    <tr key={feature} className="border-b border-[#1a1a1a]">
                      <td className="py-3 pr-6 text-[#555]">{feature}</td>
                      <td className="py-3 pr-6 text-[#ff313188]">{bad}</td>
                      <td className="py-3 text-[#ccff00]">{good}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
