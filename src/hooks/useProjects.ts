"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { useAuthStore } from "@/lib/auth-store"
import { unwrapResults } from "@/lib/pagination"
import type { CreateProjectPayload, Project } from "@/lib/types"

export const projectKeys = {
  all: ["projects"] as const,
  detail: (id: string) => ["projects", id] as const,
}

export function useProjects() {
  const accessToken = useAuthStore((s) => s.accessToken)
  return useQuery({
    queryKey: projectKeys.all,
    queryFn: async () =>
      unwrapResults(await api.get<Project[] | { results: Project[] }>("/domains/projects/")),
    enabled: Boolean(accessToken),
  })
}

export function useCreateProject() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateProjectPayload) =>
      api.post<Project>("/domains/projects/", payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: projectKeys.all }),
  })
}

export function useUpdateProject() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...data }: { id: string } & Partial<CreateProjectPayload>) =>
      api.patch<Project>(`/domains/projects/${id}/`, data),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: projectKeys.all })
      qc.invalidateQueries({ queryKey: projectKeys.detail(id) })
    },
  })
}
