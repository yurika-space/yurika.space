"use client"

import { useEffect } from "react"
import { useAuthStore } from "@/lib/auth-store"

const AUTH_STORAGE_KEY = "yurika-auth"

function syncPersistedSession() {
  if (typeof window === "undefined") return
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) return
    const parsed = JSON.parse(raw) as {
      state?: {
        accessToken?: string | null
        refreshToken?: string | null
        user?: unknown
      }
    }
    const access = parsed.state?.accessToken
    if (!access) return
    const current = useAuthStore.getState()
    if (!current.accessToken) {
      useAuthStore.setState({
        accessToken: access,
        refreshToken: parsed.state?.refreshToken ?? null,
        user: (parsed.state?.user as typeof current.user) ?? null,
      })
    }
  } catch {
    /* ignore malformed storage */
  }
}

export function AuthHydrator() {
  const hydrateApi = useAuthStore((s) => s.hydrateApi)

  useEffect(() => {
    syncPersistedSession()
    hydrateApi()
  }, [hydrateApi])

  return null
}
