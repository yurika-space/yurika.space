import { Suspense } from "react"
import { ForgeTracker } from "./ForgeTracker"

export default function ForgePage() {
  return (
    <Suspense
      fallback={
        <section className="px-6 py-12">
          <p className="text-[11px] font-mono text-[#666] animate-pulse">Loading forge...</p>
        </section>
      }
    >
      <ForgeTracker />
    </Suspense>
  )
}
