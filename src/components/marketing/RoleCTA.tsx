"use client"

import Link from "next/link"

const ROLES = [
  { label: "FOUNDER", href: "/app#project", detail: "Project → domain → campaign" },
  { label: "CURATOR", href: "/marketplace", detail: "Browse & invest" },
  { label: "CONNECTOR", href: "#graph", detail: "Explore the network" },
] as const

export function RoleCTA() {
  return (
    <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
      {ROLES.map((role) => (
        <Link
          key={role.label}
          href={role.href}
          className="border border-[#2a2a2a] bg-[#141414] px-4 py-3 text-center hover:border-[#ccff00] transition-colors group"
        >
          <p className="text-[10px] font-mono text-[#ccff00] tracking-widest group-hover:glow-lime">
            {role.label}
          </p>
          <p className="mt-1 text-[8px] font-mono text-[#555]">{role.detail}</p>
        </Link>
      ))}
    </div>
  )
}
