"use client"

import { DynamicWidget } from "@dynamic-labs/sdk-react-core"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { injected } from "wagmi/connectors"

const hasDynamic = Boolean(process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID)

export function WalletConnectButton({ className }: { className?: string }) {
  if (hasDynamic) {
    return (
      <div className={className}>
        <DynamicWidget />
      </div>
    )
  }

  return <WagmiConnectButton className={className} />
}

function WagmiConnectButton({ className }: { className?: string }) {
  const { address, isConnected } = useAccount()
  const { connect, isPending } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected && address) {
    return (
      <button type="button" className={className ?? "btn-ghost px-4 py-2 text-[9px]"} onClick={() => disconnect()}>
        {address.slice(0, 6)}…{address.slice(-4)} [ DISCONNECT ]
      </button>
    )
  }

  return (
    <button
      type="button"
      className={className ?? "btn-primary px-4 py-2 text-[9px]"}
      disabled={isPending}
      onClick={() => connect({ connector: injected() })}
    >
      {isPending ? "CONNECTING..." : "[ CONNECT WALLET ]"}
    </button>
  )
}
