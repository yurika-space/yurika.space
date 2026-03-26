"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { label: "THE VAULT", href: "#vault" },
  { label: "SHARDS", href: "#shards" },
  { label: "GRAPH", href: "#graph" },
  { label: "THE FORGE", href: "#forge" },
]

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-[#2a2a2a] bg-[#0d0d0d]/90 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <span className="text-[10px] font-display text-[#ccff00] glow-lime tracking-wider group-hover:animate-pulse">
            YURIKA
          </span>
          <span className="text-[10px] font-mono text-[#888] tracking-widest">.SPACE</span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[9px] font-mono text-[#888] tracking-widest uppercase",
                "hover:text-[#ccff00] transition-colors duration-150",
                "hover:glow-lime"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/app"
            className="btn-primary text-[9px] py-2 px-4 hidden sm:block"
          >
            [ LAUNCH APP ]
          </Link>
        </div>
      </div>
    </motion.header>
  )
}
