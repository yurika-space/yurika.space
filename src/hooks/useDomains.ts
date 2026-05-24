"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { useAuthStore } from "@/lib/auth-store"
import { unwrapResults } from "@/lib/pagination"
import type { CreateDomainPayload, Domain } from "@/lib/types"

export const domainKeys = {
  all: ["domains"] as const,
  adminAll: ["domains", "admin"] as const,
  detail: (id: string) => ["domains", id] as const,
}

export function useDomains() {
  const accessToken = useAuthStore((s) => s.accessToken)
  return useQuery({
    queryKey: domainKeys.all,
    queryFn: async () => unwrapResults(await api.get<Domain[] | { results: Domain[] }>("/domains/")),
    enabled: Boolean(accessToken),
  })
}

export function useAdminDomains() {
  const accessToken = useAuthStore((s) => s.accessToken)
  return useQuery({
    queryKey: domainKeys.adminAll,
    queryFn: async () => unwrapResults(await api.get<Domain[] | { results: Domain[] }>("/domains/admin-list/")),
    enabled: Boolean(accessToken),
  })
}

export function useDomain(id: string | null) {
  const accessToken = useAuthStore((s) => s.accessToken)
  return useQuery({
    queryKey: domainKeys.detail(id ?? ""),
    queryFn: () => api.get<Domain>(`/domains/${id}/`),
    enabled: Boolean(id) && Boolean(accessToken),
  })
}

export function useCreateDomain() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateDomainPayload) => api.post<Domain>("/domains/", payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: domainKeys.all }),
  })
}

export function useSubmitProof() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ownership_proof_url }: { id: string; ownership_proof_url: string }) =>
      api.post<Domain>(`/domains/${id}/submit_proof/`, { ownership_proof_url }),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: domainKeys.all })
      qc.invalidateQueries({ queryKey: domainKeys.detail(id) })
    },
  })
}

export function useVerifyDomain() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.post<Domain>(`/domains/${id}/verify/`),
    onSuccess: (_, id) => {
      qc.invalidateQueries({ queryKey: domainKeys.all })
      qc.invalidateQueries({ queryKey: domainKeys.adminAll })
      qc.invalidateQueries({ queryKey: domainKeys.detail(id) })
    },
  })
}

export function useVaultDomain() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.post<Domain>(`/domains/${id}/vault/`),
    onSuccess: (_, id) => {
      qc.invalidateQueries({ queryKey: domainKeys.all })
      qc.invalidateQueries({ queryKey: domainKeys.detail(id) })
    },
  })
}
