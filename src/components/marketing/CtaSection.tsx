"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function CtaSection() {
  return (
    <section className="py-32 px-6">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="terminal-window p-12 terminal-body"
        >
          <p className="text-[9px] font-mono text-[#555] tracking-widest mb-6">
            // FINAL TRANSMISSION
          </p>

          <h2 className="text-[clamp(12px,2.5vw,22px)] font-display text-[#ccff00] glow-lime mb-6 leading-relaxed">
            THE TERMINAL<br />IS OPEN.
          </h2>

          <p className="text-[13px] font-mono text-[#888] leading-loose mb-10 max-w-lg mx-auto">
            Ready to turn your digital real estate into a liquid startup? The
            next generation of domain-first founders is already forging.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/app"
              className="btn-primary text-[10px] py-4 px-10 glitch-hover"
            >
              [ BOOTSTRAP YOUR PROJECT ]
            </Link>
            <Link href="#shards" className="btn-ghost text-[10px] py-4 px-10">
              View Active Shards
            </Link>
          </div>

          {/* Blinking cursor */}
          <div className="mt-12 flex items-center justify-center gap-2">
            <span className="text-[10px] font-mono text-[#444]">yurika.space</span>
            <span className="text-[10px] font-mono text-[#ccff00] animate-pulse">▮</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
