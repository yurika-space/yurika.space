"use client"

import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"

export interface ProtocolStats {
  campaign_count: number
  total_funding_raised_usd: string
  vaulted_domain_count: number
  founder_count: number
  genesis_mode: boolean
}

export function useProtocolStats() {
  return useQuery({
    queryKey: ["protocol-stats"],
    queryFn: () => api.get<ProtocolStats>("/stats/"),
    staleTime: 60_000,
  })
}
