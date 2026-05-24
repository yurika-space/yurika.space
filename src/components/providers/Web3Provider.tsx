"use client"

import { ReactNode } from "react"
import { WagmiProvider } from "wagmi"
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core"
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector"
import { wagmiConfig } from "@/lib/wagmi-config"

const dynamicEnvId = process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID

export function Web3Provider({ children }: { children: ReactNode }) {
  if (!dynamicEnvId) {
    return <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
  }

  return (
    <DynamicContextProvider settings={{ environmentId: dynamicEnvId }}>
      <WagmiProvider config={wagmiConfig}>
        <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
      </WagmiProvider>
    </DynamicContextProvider>
  )
}
