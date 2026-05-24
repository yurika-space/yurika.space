"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useAuthStore } from "@/lib/auth-store"
import { maxReachableStep, pickActiveDomain } from "@/lib/domain-flow"
import {
  useCreateDomain,
  useDomains,
  useSubmitProof,
  useVerifyDomain,
  useVaultDomain,
} from "@/hooks/useDomains"
import { SessionBar } from "@/components/app/SessionBar"
import { useAuthErrorMessage } from "@/hooks/useAuth"

const STEPS = [
  { key: "wallet", title: "Connect Wallet", detail: "SIWE required before domain operations." },
  { key: "domain", title: "Domain + Proof", detail: "Register domain and submit ownership proof URL." },
  { key: "verification", title: "Verification", detail: "Domain must reach verified status before vaulting." },
  { key: "vault", title: "Vault Custody", detail: "Vault only when status is verified." },
  { key: "ready", title: "Ready to Mint", detail: "Launch shards from Tokenomics Console." },
] as const

export function DomainVaultWizard() {
  const [stepIndex, setStepIndex] = useState(0)
  const [domainInput, setDomainInput] = useState("ai-health.com")
  const [description, setDescription] = useState("")
  const [proofUrl, setProofUrl] = useState("")
  const [selectedDomainId, setSelectedDomainId] = useState<string | null>(null)
  const [statusMsg, setStatusMsg] = useState<string | null>(null)

  const isAuthed = Boolean(useAuthStore((s) => s.accessToken))
  const createDomain = useCreateDomain()
  const submitProof = useSubmitProof()
  const verifyDomain = useVerifyDomain()
  const vaultDomain = useVaultDomain()
  const { data: domains, refetch } = useDomains()

  const activeDomain = useMemo(
    () => pickActiveDomain(domains, selectedDomainId),
    [domains, selectedDomainId]
  )

  const maxStep = maxReachableStep(activeDomain, isAuthed)
  const progress = useMemo(() => Math.round(((stepIndex + 1) / STEPS.length) * 100), [stepIndex])
  const domainError = useAuthErrorMessage(
    createDomain.error ?? submitProof.error ?? verifyDomain.error ?? vaultDomain.error
  )

  useEffect(() => {
    setStepIndex((prev) => {
      const target = Math.min(maxStep, STEPS.length - 1)
      return prev < target ? target : Math.min(prev, maxStep)
    })
  }, [maxStep])

  async function handleCreateDomain() {
    setStatusMsg(null)
    const fqdn = domainInput.trim().toLowerCase().replace(/^https?:\/\//, "").split("/")[0]
    const parts = fqdn.split(".")
    const tld = parts.length > 1 ? (parts.pop() ?? "com") : "com"
    try {
      const domain = await createDomain.mutateAsync({
        name: fqdn,
        tld,
        description,
      })
      setSelectedDomainId(domain.id)
      if (proofUrl.trim()) {
        await submitProof.mutateAsync({ id: domain.id, ownership_proof_url: proofUrl.trim() })
      }
      setStatusMsg(`Domain registered: ${domain.name}`)
      await refetch()
      setStepIndex(2)
    } catch {
      /* error via domainError */
    }
  }

  async function handleSubmitProof() {
    const id = activeDomain?.id
    if (!id) return
    setStatusMsg(null)
    try {
      await submitProof.mutateAsync({ id, ownership_proof_url: proofUrl.trim() })
      setStatusMsg("Proof submitted.")
      await refetch()
    } catch {
      /* domainError */
    }
  }

  async function handleVerify() {
    const id = activeDomain?.id
    if (!id) return
    setStatusMsg(null)
    try {
      await verifyDomain.mutateAsync(id)
      setStatusMsg("Domain verified (dev/staff endpoint).")
      await refetch()
      setStepIndex(3)
    } catch {
      /* domainError */
    }
  }

  async function handleVault() {
    const id = activeDomain?.id
    if (!id) {
      setStatusMsg("Create a domain first.")
      return
    }
    if (activeDomain?.status !== "verified") {
      setStatusMsg("Domain must be verified before vaulting.")
      return
    }
    setStatusMsg(null)
    try {
      await vaultDomain.mutateAsync(id)
      setStatusMsg("Domain vaulted.")
      await refetch()
      setStepIndex(4)
    } catch {
      /* domainError */
    }
  }

  function goNext() {
    setStepIndex((prev) => Math.min(prev + 1, Math.min(maxStep, STEPS.length - 1)))
  }

  return (
    <section className="terminal-window terminal-body p-6">
      <p className="mb-3 text-[9px] font-mono tracking-widest text-[#555]">{"// MODULE 01 // DOMAIN VAULT WIZARD"}</p>
      <h2 className="mb-2 text-[10px] font-mono tracking-widest text-[#ccff00]">FOUNDATION INITIALIZATION</h2>
      <p className="mb-6 text-[11px] font-mono leading-relaxed text-[#888]">
        Gated vaulting: proof → verify → vault → shard launch.
      </p>

      {activeDomain && (
        <p className="mb-4 text-[10px] font-mono text-[#9d00ff]">
          ACTIVE: {activeDomain.name} — <span className="uppercase">{activeDomain.status}</span>
          {activeDomain.id && (
            <Link href={`/app/domains/${activeDomain.id}`} className="ml-2 text-[#ccff00] hover:underline">
              detail →
            </Link>
          )}
        </p>
      )}

      {stepIndex === 0 && (
        <div className="mb-4">
          <SessionBar />
        </div>
      )}

      {stepIndex === 1 && isAuthed && (
        <div className="mb-4 space-y-3">
          <label className="block space-y-1">
            <span className="text-[9px] font-mono text-[#666]">DOMAIN</span>
            <input
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
              className="w-full border border-[#2a2a2a] bg-[#141414] px-3 py-2 text-[11px] font-mono text-[#e0e0e0]"
            />
          </label>
          <label className="block space-y-1">
            <span className="text-[9px] font-mono text-[#666]">OWNERSHIP PROOF URL</span>
            <input
              value={proofUrl}
              onChange={(e) => setProofUrl(e.target.value)}
              placeholder="https://dns-proof or registrar doc"
              className="w-full border border-[#2a2a2a] bg-[#141414] px-3 py-2 text-[11px] font-mono text-[#e0e0e0]"
            />
          </label>
          <label className="block space-y-1">
            <span className="text-[9px] font-mono text-[#666]">DESCRIPTION</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full border border-[#2a2a2a] bg-[#141414] px-3 py-2 text-[11px] font-mono text-[#e0e0e0]"
            />
          </label>
          <button
            type="button"
            className="btn-primary px-4 py-2 text-[9px]"
            disabled={createDomain.isPending}
            onClick={handleCreateDomain}
          >
            {createDomain.isPending ? "SUBMITTING..." : "[ REGISTER DOMAIN + PROOF ]"}
          </button>
        </div>
      )}

      {stepIndex === 2 && isAuthed && activeDomain && (
        <div className="mb-4 space-y-3">
          {activeDomain.status === "pending" && (
            <>
              {!activeDomain.ownership_proof_url && (
                <>
                  <input
                    value={proofUrl}
                    onChange={(e) => setProofUrl(e.target.value)}
                    placeholder="Proof URL"
                    className="w-full border border-[#2a2a2a] bg-[#141414] px-3 py-2 text-[11px] font-mono"
                  />
                  <button type="button" className="btn-ghost px-4 py-2 text-[9px]" onClick={handleSubmitProof}>
                    [ SUBMIT PROOF ]
                  </button>
                </>
              )}
              <button type="button" className="btn-primary px-4 py-2 text-[9px]" onClick={handleVerify}>
                [ REQUEST VERIFICATION (DEV) ]
              </button>
              <p className="text-[9px] font-mono text-[#555]">Production uses staff review; DEBUG allows instant verify.</p>
            </>
          )}
          {activeDomain.status === "verified" && (
            <p className="text-[10px] font-mono text-[#ccff00]">Verified — proceed to vault step.</p>
          )}
        </div>
      )}

      {stepIndex === 3 && isAuthed && (
        <div className="mb-4">
          <button
            type="button"
            className="btn-primary px-4 py-2 text-[9px]"
            disabled={vaultDomain.isPending || activeDomain?.status !== "verified"}
            onClick={handleVault}
          >
            {vaultDomain.isPending ? "VAULTING..." : "[ INITIATE VAULT ]"}
          </button>
        </div>
      )}

      {stepIndex === 4 && (
        <div className="mb-4">
          <Link
            href={activeDomain ? `/app?domainId=${activeDomain.id}#launch` : "/app#launch"}
            className="btn-primary inline-block px-4 py-2 text-[9px]"
          >
            [ OPEN TOKENOMICS CONSOLE ]
          </Link>
        </div>
      )}

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

      {(statusMsg || domainError) && (
        <p className={`mb-4 text-[10px] font-mono ${domainError ? "text-[#ff3131]" : "text-[#ccff00]"}`}>
          {domainError || statusMsg}
        </p>
      )}

      <ol className="mb-6 space-y-2">
        {STEPS.map((step, i) => (
          <li key={step.key} className="flex items-center gap-3 text-[10px] font-mono">
            <span className={i <= stepIndex ? "text-[#ccff00]" : "text-[#444]"}>
              [{String(i + 1).padStart(2, "0")}]
            </span>
            <button
              type="button"
              disabled={i > maxStep}
              className={`text-left ${i === stepIndex ? "text-[#e0e0e0]" : "text-[#666]"} disabled:opacity-40`}
              onClick={() => i <= maxStep && setStepIndex(i)}
            >
              {step.title}
            </button>
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
          onClick={goNext}
          disabled={stepIndex >= Math.min(maxStep, STEPS.length - 1)}
        >
          NEXT STEP
        </button>
      </div>
    </section>
  )
}
