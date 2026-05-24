"use client"

import Link from "next/link"
import { WaitlistForm } from "@/components/marketing/WaitlistForm"
import { readVaultConfigured } from "@/lib/contracts"
import { useEffect, useState } from "react"

const PROTOCOL_LINKS = [
  { label: "The Vault", href: "/app" },
  { label: "Shard Marketplace", href: "/marketplace" },
  { label: "The Forge", href: "/app/forge" },
  { label: "Knowledge Graph", href: "/#graph" },
] as const

export function Footer() {
  const year = new Date().getFullYear()
  const [chainLabel, setChainLabel] = useState<string | null>(null)

  useEffect(() => {
    readVaultConfigured().then((s) => {
      setChainLabel(
        s.configured
          ? "DEPLOYED ON BASE SEPOLIA"
          : "PROTOCOL IN GENESIS — CONTRACTS PENDING DEPLOY"
      )
    })
  }, [])

  return (
    <footer className="border-t border-[#2a2a2a] bg-[#0d0d0d] mt-24">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <p className="text-[10px] font-display text-[#ccff00] mb-3 tracking-wider">YURIKA.SPACE</p>
            <p className="text-[11px] font-mono text-[#555] leading-relaxed">
              Liquid Domains.<br />Accelerated Founders.
            </p>
          </div>

          <div>
            <p className="text-[9px] font-mono text-[#888] tracking-widest uppercase mb-4">// PROTOCOL</p>
            <ul className="space-y-2">
              {PROTOCOL_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[11px] font-mono text-[#555] hover:text-[#ccff00] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[9px] font-mono text-[#888] tracking-widest uppercase mb-4">// JOIN THE SIGNAL</p>
            <p className="text-[11px] font-mono text-[#555] mb-4">
              No noise, just alpha on upcoming drops.
            </p>
            <WaitlistForm compact />
          </div>
        </div>

        <div className="border-t border-[#1a1a1a] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[9px] font-mono text-[#333]">
            © {year} YURIKA.SPACE — ALL RIGHTS RESERVED
          </p>
          <p className="text-[9px] font-mono text-[#333]">
            {chainLabel ?? "CHECKING CHAIN STATUS..."}
          </p>
        </div>
      </div>
    </footer>
  )
}
