"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { unwrapResults } from "@/lib/pagination"
import type { CreateCampaignPayload, ShardCampaign } from "@/lib/types"

export const campaignKeys = {
  all: ["campaigns"] as const,
  detail: (id: string) => ["campaigns", id] as const,
}

export type CampaignSort = "funding" | "price" | "available" | "name"
export type CampaignFilter = { sector?: string; search?: string }

export function useCampaigns(sort: CampaignSort = "funding", filter: CampaignFilter = {}) {
  return useQuery({
    queryKey: [...campaignKeys.all, sort, filter],
    queryFn: async () => {
      const rows = unwrapResults(
        await api.get<ShardCampaign[] | { results: ShardCampaign[] }>("/domains/campaigns/")
      )
      let list = [...rows]

      if (filter.search) {
        const q = filter.search.toLowerCase()
        list = list.filter(
          (c) =>
            c.domain_name.toLowerCase().includes(q) ||
            c.title.toLowerCase().includes(q) ||
            c.thesis.toLowerCase().includes(q)
        )
      }

      list.sort((a, b) => {
        switch (sort) {
          case "price":
            return Number(b.price_per_shard_usd) - Number(a.price_per_shard_usd)
          case "available":
            return b.shards_available - a.shards_available
          case "name":
            return a.domain_name.localeCompare(b.domain_name)
          case "funding":
          default:
            return b.funding_percentage - a.funding_percentage
        }
      })

      return list
    },
  })
}

export function useCampaign(id: string | null) {
  return useQuery({
    queryKey: campaignKeys.detail(id ?? ""),
    queryFn: () => api.get<ShardCampaign>(`/domains/campaigns/${id}/`),
    enabled: Boolean(id),
  })
}

export function useCreateCampaign() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateCampaignPayload) =>
      api.post<ShardCampaign>("/domains/campaigns/", payload),
    onSuccess: (campaign) => {
      qc.invalidateQueries({ queryKey: campaignKeys.all })
      qc.invalidateQueries({ queryKey: campaignKeys.detail(campaign.id) })
      qc.invalidateQueries({ queryKey: ["projects"] })
    },
  })
}

export function useUpdateCampaign() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...data }: { id: string; forge_stage?: string; title?: string; thesis?: string }) =>
      api.patch<ShardCampaign>(`/domains/campaigns/${id}/`, data),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: campaignKeys.all })
      qc.invalidateQueries({ queryKey: campaignKeys.detail(id) })
    },
  })
}

export function useInvestInCampaign() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ campaignId, shards }: { campaignId: string; shards: number }) =>
      api.post<any>(`/domains/campaigns/${campaignId}/invest/`, { shards }),
    onSuccess: (_, { campaignId }) => {
      qc.invalidateQueries({ queryKey: campaignKeys.all })
      qc.invalidateQueries({ queryKey: campaignKeys.detail(campaignId) })
      qc.invalidateQueries({ queryKey: ["holdings"] })
    },
  })
}
