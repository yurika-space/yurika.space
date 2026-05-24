"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useAuthStore } from "@/lib/auth-store"
import { useCreateCampaign } from "@/hooks/useCampaigns"
import { useDomains } from "@/hooks/useDomains"
import { useProjects } from "@/hooks/useProjects"
import { useAuthErrorMessage } from "@/hooks/useAuth"
import { formatUSD } from "@/lib/utils"

export function ShardLaunchConfigurator() {
  const searchParams = useSearchParams()
  const [title, setTitle] = useState("Genesis Shard Round")
  const [thesis, setThesis] = useState("")
  const [supply, setSupply] = useState(10000)
  const [pricePerShard, setPricePerShard] = useState(12)
  const [governanceThreshold, setGovernanceThreshold] = useState(51)
  const [domainId, setDomainId] = useState<string>("")
  const [projectId, setProjectId] = useState<string>("")
  const [forgeStage, setForgeStage] = useState("01 Vault")
  const [message, setMessage] = useState<string | null>(null)
  const [publishedCampaignId, setPublishedCampaignId] = useState<string | null>(null)

  const isAuthed = Boolean(useAuthStore((s) => s.accessToken))
  const { data: domains } = useDomains()
  const { data: projects } = useProjects()
  const createCampaign = useCreateCampaign()
  const errMsg = useAuthErrorMessage(createCampaign.error)

  const vaultedDomains = domains?.filter((d) => d.status === "vaulted")
  const availableProjects = projects?.filter((p) => !p.is_attached && !p.campaign_id) ?? []

  useEffect(() => {
    const q = searchParams.get("domainId")
    if (q) setDomainId(q)
  }, [searchParams])

  const selectedDomain = vaultedDomains?.find((d) => d.id === domainId)
  const estimatedRaise = useMemo(() => supply * pricePerShard, [supply, pricePerShard])
  const targetMismatch =
    selectedDomain && estimatedRaise <= 0

  const selectedProject = availableProjects.find((p) => p.id === projectId)
  const canLaunch =
    isAuthed && domainId !== "" && projectId !== "" && selectedDomain && selectedProject && !targetMismatch

  async function handlePublish() {
    if (!canLaunch || !domainId || !projectId) return
    setMessage(null)
    createCampaign.reset()
    try {
      const campaign = await createCampaign.mutateAsync({
        domain: domainId,
        project_id: projectId,
        title,
        thesis: thesis || selectedProject?.description || `Funding round for ${selectedDomain?.name}`,
        total_shards: supply,
        shards_available: supply,
        price_per_shard_usd: pricePerShard,
        funding_target_usd: estimatedRaise,
        quorum_percentage: governanceThreshold,
        governance_enabled: true,
        forge_stage: forgeStage,
      })
      setPublishedCampaignId(campaign.id)
      setMessage("Campaign published to marketplace.")
    } catch {
      /* errMsg */
    }
  }

  return (
    <section id="launch" className="terminal-window terminal-body p-6">
      <p className="mb-3 text-[9px] font-mono tracking-widest text-[#555]">{"// MODULE 02 // SHARD LAUNCH CONFIG"}</p>
      <h2 className="mb-5 text-[10px] font-mono tracking-widest text-[#9d00ff]">TOKENOMICS CONSOLE</h2>

      {!isAuthed && (
        <p className="mb-4 text-[10px] font-mono text-[#ffaa00]">
          Authenticate via vault wizard before publishing campaigns.
        </p>
      )}

      {vaultedDomains?.length === 0 && isAuthed && (
        <p className="mb-4 text-[10px] font-mono text-[#ffaa00]">
          No vaulted domains — complete verify → vault in the wizard first.
        </p>
      )}

      {availableProjects.length === 0 && isAuthed && (
        <p className="mb-4 text-[10px] font-mono text-[#ffaa00]">
          No unattached projects —{" "}
          <a href="#project" className="text-[#ccff00] underline">
            create a project
          </a>{" "}
          first.
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="space-y-1 md:col-span-2">
          <span className="text-[9px] font-mono tracking-widest text-[#666]">ATTACH PROJECT (REQUIRED)</span>
          <select
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className="w-full border border-[#2a2a2a] bg-[#141414] px-3 py-2 text-[11px] font-mono text-[#e0e0e0]"
            disabled={!isAuthed}
          >
            <option value="">SELECT PROJECT</option>
            {availableProjects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1 md:col-span-2">
          <span className="text-[9px] font-mono tracking-widest text-[#666]">VAULTED DOMAIN (REQUIRED)</span>
          <select
            value={domainId}
            onChange={(e) => setDomainId(e.target.value)}
            className="w-full border border-[#2a2a2a] bg-[#141414] px-3 py-2 text-[11px] font-mono text-[#e0e0e0]"
            disabled={!isAuthed}
          >
            <option value="">SELECT VAULTED DOMAIN</option>
            {vaultedDomains?.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.status})
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1 md:col-span-2">
          <span className="text-[9px] font-mono tracking-widest text-[#666]">CAMPAIGN TITLE</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-[#2a2a2a] bg-[#141414] px-3 py-2 text-[11px] font-mono text-[#e0e0e0]"
          />
        </label>

        <label className="space-y-1 md:col-span-2">
          <span className="text-[9px] font-mono tracking-widest text-[#666]">THESIS</span>
          <textarea
            value={thesis}
            onChange={(e) => setThesis(e.target.value)}
            rows={3}
            className="w-full border border-[#2a2a2a] bg-[#141414] px-3 py-2 text-[11px] font-mono text-[#e0e0e0]"
          />
        </label>

        <label className="space-y-1">
          <span className="text-[9px] font-mono tracking-widest text-[#666]">TOTAL SHARDS</span>
          <input
            type="number"
            min={1}
            value={supply}
            onChange={(e) => setSupply(Number(e.target.value))}
            className="w-full border border-[#2a2a2a] bg-[#141414] px-3 py-2 text-[11px] font-mono text-[#e0e0e0]"
          />
        </label>

        <label className="space-y-1">
          <span className="text-[9px] font-mono tracking-widest text-[#666]">PRICE / SHARD (USD)</span>
          <input
            type="number"
            min={0.01}
            step={0.01}
            value={pricePerShard}
            onChange={(e) => setPricePerShard(Number(e.target.value))}
            className="w-full border border-[#2a2a2a] bg-[#141414] px-3 py-2 text-[11px] font-mono text-[#e0e0e0]"
          />
        </label>

        <label className="space-y-1">
          <span className="text-[9px] font-mono tracking-widest text-[#666]">FORGE STAGE</span>
          <input
            value={forgeStage}
            onChange={(e) => setForgeStage(e.target.value)}
            className="w-full border border-[#2a2a2a] bg-[#141414] px-3 py-2 text-[11px] font-mono text-[#e0e0e0]"
          />
        </label>

        <label className="space-y-1">
          <span className="text-[9px] font-mono tracking-widest text-[#666]">QUORUM %</span>
          <input
            type="number"
            min={1}
            max={100}
            value={governanceThreshold}
            onChange={(e) => setGovernanceThreshold(Number(e.target.value))}
            className="w-full border border-[#2a2a2a] bg-[#141414] px-3 py-2 text-[11px] font-mono text-[#e0e0e0]"
          />
        </label>
      </div>

      <p className="mt-4 text-[10px] font-mono text-[#666]">
        EST. RAISE: {formatUSD(estimatedRaise)} (supply × price)
      </p>

      <button
        type="button"
        className="btn-primary mt-6 px-6 py-3 text-[10px]"
        disabled={!canLaunch || createCampaign.isPending}
        onClick={handlePublish}
      >
        {createCampaign.isPending ? "PUBLISHING..." : "[ PUBLISH CAMPAIGN ]"}
      </button>

      {message && (
        <p className="mt-4 text-[10px] font-mono text-[#ccff00]">{message}</p>
      )}
      {!message && errMsg && (
        <p className="mt-4 text-[10px] font-mono text-[#ff3131]">{errMsg}</p>
      )}

      {publishedCampaignId && (
        <Link
          href={`/marketplace/${publishedCampaignId}`}
          className="mt-4 inline-block text-[10px] font-mono text-[#ccff00] hover:underline"
        >
          View public campaign → /marketplace/{publishedCampaignId}
        </Link>
      )}
    </section>
  )
}
