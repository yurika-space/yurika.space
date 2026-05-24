import type { Domain } from "@/lib/types"

export function pickActiveDomain(
  domains: Domain[] | undefined,
  selectedId: string | null
): Domain | undefined {
  if (!domains?.length) return undefined
  if (selectedId != null) {
    const found = domains.find((d) => d.id === selectedId)
    if (found) return found
  }
  return [...domains].sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  )[0]
}

export function maxReachableStep(domain: Domain | undefined, isAuthed: boolean): number {
  if (!isAuthed) return 0
  if (!domain) return 1
  if (domain.status === "pending" && !domain.ownership_proof_url) return 1
  if (domain.status === "pending") return 2
  if (domain.status === "verified") return 3
  if (domain.status === "vaulted") return 4
  return 2
}
