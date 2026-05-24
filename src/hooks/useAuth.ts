"use client"

import { useMutation } from "@tanstack/react-query"
import { api, ApiError, detailMessage } from "@/lib/api"
import { useAuthStore } from "@/lib/auth-store"
import type { AuthTokens } from "@/lib/types"

export function useWalletVerify() {
  const setSession = useAuthStore((s) => s.setSession)

  return useMutation({
    mutationFn: async (payload: { message: string; signature: string }) => {
      const data = await api.post<AuthTokens & { created?: boolean }>(
        "/auth/wallet/verify/",
        payload
      )
      return data
    },
    onSuccess: (data) => {
      setSession(data.access, data.refresh, data.user)
    },
  })
}

export function useAuthErrorMessage(error: unknown): string {
  if (error instanceof ApiError) return detailMessage(error.data)
  if (error instanceof Error) return error.message
  return "Unknown error"
}
