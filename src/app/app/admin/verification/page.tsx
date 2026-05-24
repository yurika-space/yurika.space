"use client"

import { useAdminDomains, useVerifyDomain } from "@/hooks/useDomains"
import { useState } from "react"

export default function AdminVerificationPage() {
  const { data: domains, isLoading, error } = useAdminDomains()
  const verifyMutation = useVerifyDomain()
  const [verifyingId, setVerifyingId] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse h-8 w-48 bg-white/10 rounded mb-8" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse h-16 bg-white/5 border border-white/10 rounded" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="text-red-500 border border-red-500/30 bg-red-500/10 p-4 rounded-none font-mono text-sm">
          Error loading domains. You may not have staff access.
        </div>
      </div>
    )
  }

  const pendingDomains = domains?.filter((d) => d.status === "pending") || []
  const otherDomains = domains?.filter((d) => d.status !== "pending") || []

  const handleVerify = async (id: string) => {
    try {
      setVerifyingId(id)
      setMessage(null)
      await verifyMutation.mutateAsync(id)
      setMessage({ type: "success", text: "Domain verified successfully" })
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to verify domain" })
    } finally {
      setVerifyingId(null)
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-display text-yurika-lime mb-8">Staff Verification</h1>

      {message && (
        <div
          className={`mb-8 p-4 font-mono text-sm border ${
            message.type === "success"
              ? "bg-yurika-lime/10 text-yurika-lime border-yurika-lime/30"
              : "bg-red-500/10 text-red-500 border-red-500/30"
          }`}
        >
          {message.text}
        </div>
      )}

      <section className="mb-12">
        <h2 className="text-lg font-mono text-white/80 mb-4 border-b border-white/10 pb-2">
          Pending Verification ({pendingDomains.length})
        </h2>
        {pendingDomains.length === 0 ? (
          <p className="text-white/50 font-mono text-sm">No domains pending verification.</p>
        ) : (
          <div className="space-y-4">
            {pendingDomains.map((domain) => (
              <div
                key={domain.id}
                className="p-4 border border-white/10 bg-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <div className="font-mono text-white text-lg mb-1">{domain.name}</div>
                  <div className="text-sm text-white/50 font-mono mb-2">
                    Owner: {domain.owner_display || "Unknown"}
                  </div>
                  {domain.ownership_proof_url ? (
                    <a
                      href={domain.ownership_proof_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-yurika-lime hover:underline font-mono"
                    >
                      View Proof ↗
                    </a>
                  ) : (
                    <span className="text-sm text-yellow-500/80 font-mono">No proof provided</span>
                  )}
                </div>
                <button
                  onClick={() => handleVerify(domain.id)}
                  disabled={verifyingId === domain.id}
                  className="px-4 py-2 bg-yurika-lime text-black font-mono text-sm hover:bg-[#aacc00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {verifyingId === domain.id ? "VERIFYING..." : "VERIFY DOMAIN"}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-mono text-white/80 mb-4 border-b border-white/10 pb-2">
          Recently Processed
        </h2>
        <div className="space-y-2">
          {otherDomains.slice(0, 10).map((domain) => (
            <div key={domain.id} className="p-3 border border-white/5 bg-black/50 flex justify-between items-center">
              <span className="font-mono text-white/70">{domain.name}</span>
              <span className="font-mono text-xs px-2 py-1 bg-white/10 text-white/60">
                {domain.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
