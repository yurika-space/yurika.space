"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { fadeInUp } from "@/styles/animations"

const LOADING_STATES = [
  "SYNCING WITH BASE...",
  "DECRYPTING SHARDS...",
  "FORGING METADATA...",
  "SIGNAL DETECTED.",
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14">
      {/* Terminal grid background */}
      <div
        className="absolute inset-0 bg-grid-terminal bg-grid opacity-40"
        aria-hidden
      />

      {/* Radial glow from center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(157,0,255,0.06) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Status badge */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 border border-[#ccff0033] bg-[#ccff000a] px-4 py-2 mb-10"
        >
          <span className="w-2 h-2 bg-[#ccff00] animate-pulse" />
          <span className="text-[9px] font-mono text-[#ccff00] tracking-widest">
            SIGNAL DETECTED — EARLY ACCESS OPEN
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[clamp(14px,3vw,28px)] font-display text-[#e0e0e0] leading-relaxed mb-6"
        >
          <span className="text-[#ccff00] glow-lime">[SIGNAL DETECTED]</span>
          <br />
          UNLOCK THE EQUITY
          <br />
          IN YOUR DOMAIN.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl mx-auto text-[13px] font-mono text-[#888] leading-relaxed mb-10"
        >
          Don&apos;t let your digital real estate sit idle. Fractionalize your domain
          ownership, raise instant capital, and accelerate your vision within the
          Yurika ecosystem.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/app" className="btn-primary text-[10px] py-3 px-8 glitch-hover">
            [ INITIALIZE FRACTIONALIZATION ]
          </Link>
          <Link
            href="#shards"
            className="btn-ghost text-[10px] py-3 px-8"
          >
            Browse Active Shards
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-20 grid grid-cols-3 gap-6 max-w-lg mx-auto"
        >
          {[
            { label: "TOTAL VALUE LOCKED", value: "$0.00", unit: "TVL" },
            { label: "ACTIVE CAMPAIGNS", value: "0", unit: "LIVE" },
            { label: "FOUNDERS FORGED", value: "0", unit: "BUILT" },
          ].map((stat) => (
            <div key={stat.unit} className="text-center">
              <p className="text-[18px] font-mono text-[#ccff00] glow-lime font-bold">
                {stat.value}
              </p>
              <p className="text-[8px] font-mono text-[#555] tracking-widest mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #0d0d0d)",
        }}
        aria-hidden
      />
    </section>
  )
}
