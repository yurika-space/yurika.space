import { Suspense } from "react"
import { CuratorMarketplaceTable } from "@/components/app/CuratorMarketplaceTable"
import { ProjectConfigurator } from "@/components/app/ProjectConfigurator"
import { DomainVaultWizard } from "@/components/app/DomainVaultWizard"
import { ShardLaunchConfigurator } from "@/components/app/ShardLaunchConfigurator"
import { GraphExplorerPanel } from "@/components/app/GraphExplorerPanel"
import { ContractStatus } from "@/components/app/ContractStatus"
import { FounderDashboard } from "@/components/app/FounderDashboard"
import Link from "next/link"

const launchTasks = [
  "Create project & upload deck",
  "Mint / vault domain",
  "Configure shard economics",
  "Publish campaign (attach project)",
]

export default function AppHomePage() {
  return (
    <section className="px-6 py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="terminal-window terminal-body p-6 lg:col-span-8">
          <p className="mb-4 text-[9px] font-mono tracking-widest text-[#555]">
            {"// PHASE 2 // FOUNDER OPERATIONS HUB"}
          </p>
          <h1 className="mb-6 text-[clamp(13px,2.5vw,20px)] font-display leading-relaxed text-[#e0e0e0]">
            COMMAND CENTER <span className="text-[#ccff00] glow-lime">INITIALIZED</span>
          </h1>
          <p className="max-w-2xl text-[12px] font-mono leading-loose text-[#888]">
            Founder control surface for vaulting domains, launching shard offerings,
            and tracking execution through Forge. Wired to Django API at{" "}
            <span className="text-[#9d00ff]">
              {process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}
            </span>
            .
          </p>

          <ContractStatus />
          <FounderDashboard />
        </div>

        <aside className="terminal-window terminal-body p-6 lg:col-span-4">
          <p className="mb-4 text-[9px] font-mono tracking-widest text-[#555]">
            {"// NEXT ACTIONS"}
          </p>
          <h2 className="mb-4 text-[10px] font-mono tracking-widest text-[#ccff00]">LAUNCH TASK QUEUE</h2>
          <ol className="space-y-3">
            {launchTasks.map((task, index) => (
              <li key={task} className="flex items-start gap-3 text-[11px] font-mono text-[#888]">
                <span className="mt-[1px] text-[#ccff00]">[{String(index + 1).padStart(2, "0")}]</span>
                <span>{task}</span>
              </li>
            ))}
          </ol>
          <nav className="mt-6 space-y-2 border-t border-[#2a2a2a] pt-4 text-[10px] font-mono">
            <Link href="/marketplace" className="block text-[#888] hover:text-[#ccff00]">
              → Public marketplace
            </Link>
            <Link href="/app/portfolio" className="block text-[#888] hover:text-[#ccff00]">
              → Curator portfolio
            </Link>
            <Link href="/app/forge" className="block text-[#888] hover:text-[#ccff00]">
              → Forge milestones
            </Link>
          </nav>
        </aside>

        <div className="lg:col-span-12">
          <ProjectConfigurator />
        </div>

        <div className="lg:col-span-6">
          <DomainVaultWizard />
        </div>

        <div className="lg:col-span-6">
          <Suspense fallback={<p className="text-[10px] font-mono text-[#666]">Loading configurator...</p>}>
            <ShardLaunchConfigurator />
          </Suspense>
        </div>

        <div className="lg:col-span-12">
          <CuratorMarketplaceTable />
        </div>

        <div className="lg:col-span-12">
          <GraphExplorerPanel />
        </div>
      </div>
    </section>
  )
}
