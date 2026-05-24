"use client"

import { useState } from "react"
import { useAccount, useSignMessage } from "wagmi"
import { useAuthStore } from "@/lib/auth-store"
import { buildSiweMessage } from "@/lib/siwe"
import { useWalletVerify, useAuthErrorMessage } from "@/hooks/useAuth"

export function useSiweSession() {
  const [statusMsg, setStatusMsg] = useState<string | null>(null)
  const accessToken = useAuthStore((s) => s.accessToken)
  const user = useAuthStore((s) => s.user)
  const clearSession = useAuthStore((s) => s.clearSession)
  const isAuthed = Boolean(accessToken)
  const { address, isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const walletVerify = useWalletVerify()
  const authError = useAuthErrorMessage(walletVerify.error)

  async function signIn() {
    if (!address) {
      setStatusMsg("Connect wallet first.")
      return false
    }
    setStatusMsg(null)
    try {
      const message = buildSiweMessage(address)
      const signature = await signMessageAsync({ message })
      await walletVerify.mutateAsync({ message, signature })
      setStatusMsg("Session active.")
      return true
    } catch (e) {
      setStatusMsg(e instanceof Error ? e.message : "Verification failed")
      return false
    }
  }

  function signOut() {
    clearSession()
    setStatusMsg(null)
  }

  return {
    isAuthed,
    isConnected,
    user,
    address,
    statusMsg,
    authError,
    isPending: walletVerify.isPending,
    signIn,
    signOut,
  }
}
