"use client"

import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { GraphDiscoverResponse } from "@/lib/types"

export type GraphFilters = {
  type?: "all" | "founder" | "domain" | "curator" | "connector"
  sector?: string
  geography?: string
}

export function usePublicGraphTeaser() {
  return useQuery({
    queryKey: ["graph", "public"],
    queryFn: () =>
      api.get<GraphDiscoverResponse & { counts_by_type?: Record<string, number>; offline?: boolean }>(
        "/graph/discover/public/"
      ),
    staleTime: 60_000,
    retry: false,
  })
}

export function useGraphDiscover(filters: GraphFilters, enabled = true) {
  const params = new URLSearchParams()
  if (filters.type) params.set("type", filters.type)
  if (filters.sector) params.set("sector", filters.sector)
  if (filters.geography) params.set("geography", filters.geography)
  const qs = params.toString()

  return useQuery({
    queryKey: ["graph", "discover", filters],
    queryFn: () => {
      const path = qs ? `/graph/discover/?${qs}` : "/graph/discover/"
      return api.get<GraphDiscoverResponse>(path)
    },
    enabled,
    retry: false,
  })
}
