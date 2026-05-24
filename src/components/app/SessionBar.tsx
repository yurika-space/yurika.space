"use client"

import { WalletConnectButton } from "@/components/app/WalletConnectButton"
import { useSiweSession } from "@/hooks/useSiweSession"

type Props = {
  compact?: boolean
}

export function SessionBar({ compact = false }: Props) {
  const { isAuthed, isConnected, user, statusMsg, authError, isPending, signIn, signOut } =
    useSiweSession()

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        {isAuthed ? (
          <>
            <span className="hidden text-[9px] font-mono text-[#ccff00] sm:inline">
              {user?.username ?? "SIGNED IN"}
            </span>
            <button type="button" className="btn-ghost px-2 py-1 text-[8px]" onClick={signOut}>
              [ SIGN OUT ]
            </button>
          </>
        ) : (
          <>
            <WalletConnectButton className="btn-ghost px-2 py-1 text-[8px]" />
            {isConnected && (
              <button
                type="button"
                className="btn-primary px-2 py-1 text-[8px]"
                disabled={isPending}
                onClick={() => signIn()}
              >
                {isPending ? "..." : "[ SIGN IN ]"}
              </button>
            )}
          </>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-3 border border-[#2a2a2a] bg-[#141414] px-4 py-3">
      <WalletConnectButton />
      {isAuthed ? (
        <>
          <span className="text-[9px] font-mono text-[#ccff00]">
            SESSION: {user?.username ?? user?.wallet_address?.slice(0, 10) ?? "active"}
          </span>
          <button type="button" className="btn-ghost px-3 py-1 text-[9px]" onClick={signOut}>
            [ SIGN OUT ]
          </button>
        </>
      ) : (
        isConnected && (
          <button
            type="button"
            className="btn-primary px-4 py-2 text-[9px]"
            disabled={isPending}
            onClick={() => signIn()}
          >
            {isPending ? "SIGNING..." : "[ VERIFY WALLET ]"}
          </button>
        )
      )}
      {(statusMsg || authError) && (
        <span className={`text-[9px] font-mono ${authError ? "text-[#ff3131]" : "text-[#888]"}`}>
          {authError || statusMsg}
        </span>
      )}
    </div>
  )
}
