"use client"

import Link from "next/link"
import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { useCampaigns, useUpdateCampaign } from "@/hooks/useCampaigns"
import { useDomains } from "@/hooks/useDomains"

const FORGE_STAGES = [
  { step: "01", label: "VAULT DOMAIN", desc: "Secure domain credentials on-chain" },
  { step: "02", label: "MINT SHARDS", desc: "Deploy fractional tokens" },
  { step: "03", label: "LAUNCH CAMPAIGN", desc: "Set funding target and governance" },
  { step: "04", label: "CURATORS INVEST", desc: "Global network funds your vision" },
  { step: "05", label: "FORGE STAGES", desc: "Structured execution pipeline" },
  { step: "06", label: "SHIP", desc: "From concept to live product" },
]

export function ForgeTracker() {
  const searchParams = useSearchParams()
  const campaignIdParam = searchParams.get("campaignId")
  const { data: campaigns } = useCampaigns()
  const { data: domains } = useDomains()
  const updateCampaign = useUpdateCampaign()

  const myDomainIds = useMemo(() => new Set(domains?.map((d) => d.id) ?? []), [domains])

  const myCampaigns = useMemo(
    () => campaigns?.filter((c) => myDomainIds.has(c.domain)) ?? [],
    [campaigns, myDomainIds]
  )

  const active = useMemo(() => {
    if (campaignIdParam) {
      return (
        myCampaigns.find((c) => c.id === campaignIdParam) ??
        campaigns?.find((c) => c.id === campaignIdParam)
      )
    }
    return myCampaigns[0]
  }, [campaignIdParam, myCampaigns, campaigns])

  async function setStage(label: string) {
    if (!active) return
    await updateCampaign.mutateAsync({
      id: active.id,
      forge_stage: `${label}`,
    })
  }

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <Link href="/app" className="text-[9px] font-mono text-[#555] hover:text-[#ccff00]">
          ← COMMAND CENTER
        </Link>
        <p className="mt-6 text-[9px] font-mono text-[#555]">// YURIKA FORGE — MILESTONE TRACKER</p>
        <h1 className="mt-2 text-[clamp(13px,2.5vw,18px)] font-display text-[#e0e0e0]">
          WE <span className="text-[#ccff00] glow-lime">FORGE</span>
        </h1>

        {myCampaigns.length > 1 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {myCampaigns.map((c) => (
              <Link
                key={c.id}
                href={`/app/forge?campaignId=${c.id}`}
                className={`border px-3 py-1 text-[9px] font-mono ${
                  active?.id === c.id
                    ? "border-[#ccff00] text-[#ccff00]"
                    : "border-[#2a2a2a] text-[#666] hover:text-[#ccff00]"
                }`}
              >
                {c.domain_name}
              </Link>
            ))}
          </div>
        )}

        {active ? (
          <p className="mt-4 text-[11px] font-mono text-[#888]">
            Tracking: {active.domain_name} — {active.title}
            <br />
            Current stage: <span className="text-[#ccff00]">{active.forge_stage || "NOT SET"}</span>
          </p>
        ) : (
          <p className="mt-4 text-[11px] font-mono text-[#ffaa00]">
            Publish a campaign first to track Forge milestones.
          </p>
        )}

        <div className="mt-10 space-y-2">
          {FORGE_STAGES.map((stage) => {
            const isActive = active?.forge_stage?.includes(stage.step)
            return (
              <button
                key={stage.step}
                type="button"
                disabled={!active || updateCampaign.isPending}
                onClick={() => setStage(`${stage.step} ${stage.label}`)}
                className={`w-full text-left border px-4 py-3 transition-colors ${
                  isActive
                    ? "border-[#ccff00] bg-[#ccff000a]"
                    : "border-[#2a2a2a] bg-[#141414] hover:border-[#ccff0066]"
                }`}
              >
                <span className="text-[9px] font-mono text-[#ccff00]">{stage.step}</span>
                <span className="ml-3 text-[11px] font-mono text-[#e0e0e0]">{stage.label}</span>
                <p className="mt-1 text-[10px] font-mono text-[#666]">{stage.desc}</p>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
