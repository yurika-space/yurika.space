"use client"

import { useMemo, useState } from "react"

const STEPS = [
  {
    key: "wallet",
    title: "Connect Wallet",
    detail: "Link founder wallet and verify signing authority for vault actions.",
  },
  {
    key: "domain",
    title: "Domain Verification",
    detail: "Validate DNS/ENS ownership and capture proof artifacts.",
  },
  {
    key: "custody",
    title: "Vault Custody",
    detail: "Confirm custody mode, withdrawal policy, and recovery contacts.",
  },
  {
    key: "ready",
    title: "Ready to Mint",
    detail: "Domain can now be tokenized into shards and listed for curators.",
  },
] as const

export function DomainVaultWizard() {
  const [stepIndex, setStepIndex] = useState(0)

  const progress = useMemo(() => Math.round(((stepIndex + 1) / STEPS.length) * 100), [stepIndex])

  return (
    <section className="terminal-window terminal-body p-6">
      <p className="mb-3 text-[9px] font-mono tracking-widest text-[#555]">{"// MODULE 01 // DOMAIN VAULT WIZARD"}</p>
      <h2 className="mb-2 text-[10px] font-mono tracking-widest text-[#ccff00]">FOUNDATION INITIALIZATION</h2>
      <p className="mb-6 text-[11px] font-mono leading-relaxed text-[#888]">
        Guide founders through a deterministic vaulting flow before shard minting.
      </p>

      <div className="mb-4 border border-[#2a2a2a] bg-[#141414] p-4">
        <p className="text-[9px] font-mono tracking-widest text-[#666]">CURRENT STEP</p>
        <p className="mt-2 text-[12px] font-mono text-[#e0e0e0]">{STEPS[stepIndex].title}</p>
        <p className="mt-1 text-[11px] font-mono leading-relaxed text-[#777]">{STEPS[stepIndex].detail}</p>
      </div>

      <div className="mb-5">
        <div className="mb-1 flex items-center justify-between text-[9px] font-mono text-[#666]">
          <span>PROGRESS</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 border border-[#2a2a2a] bg-[#111]">
          <div className="h-full bg-[#ccff00]" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <ol className="mb-6 space-y-2">
        {STEPS.map((step, i) => (
          <li key={step.key} className="flex items-center gap-3 text-[10px] font-mono">
            <span className={i <= stepIndex ? "text-[#ccff00]" : "text-[#444]"}>
              [{String(i + 1).padStart(2, "0")}]
            </span>
            <span className={i === stepIndex ? "text-[#e0e0e0]" : "text-[#666]"}>{step.title}</span>
          </li>
        ))}
      </ol>

      <div className="flex gap-3">
        <button
          type="button"
          className="btn-ghost px-4 py-2 text-[9px]"
          onClick={() => setStepIndex((prev) => Math.max(prev - 1, 0))}
          disabled={stepIndex === 0}
        >
          PREVIOUS
        </button>
        <button
          type="button"
          className="btn-primary px-4 py-2 text-[9px]"
          onClick={() => setStepIndex((prev) => Math.min(prev + 1, STEPS.length - 1))}
          disabled={stepIndex === STEPS.length - 1}
        >
          NEXT STEP
        </button>
      </div>
    </section>
  )
}
