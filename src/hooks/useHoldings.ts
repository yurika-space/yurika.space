"use client"

import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { useAuthStore } from "@/lib/auth-store"
import { unwrapResults } from "@/lib/pagination"

export interface ShardHolding {
  id: string
  campaign: string
  campaign_title: string
  domain_name: string
  shards_held: number
  purchase_price_usd: string
  tx_hash: string
  created_at: string
}

export const holdingKeys = {
  all: ["holdings"] as const,
}

export function useHoldings() {
  const accessToken = useAuthStore((s) => s.accessToken)
  return useQuery({
    queryKey: holdingKeys.all,
    queryFn: async () =>
      unwrapResults(
        await api.get<ShardHolding[] | { results: ShardHolding[] }>("/domains/holdings/")
      ),
    enabled: Boolean(accessToken),
  })
}
