import { CuratorMarketplaceTable } from "@/components/app/CuratorMarketplaceTable"
import { DomainVaultWizard } from "@/components/app/DomainVaultWizard"
import { ShardLaunchConfigurator } from "@/components/app/ShardLaunchConfigurator"

const statusRows = [
  { label: "Domain Vault Engine", value: "ONLINE", tone: "#ccff00" },
  { label: "Shard Marketplace", value: "STANDBY", tone: "#9d00ff" },
  { label: "Knowledge Graph", value: "SYNCING", tone: "#ffaa00" },
  { label: "Forge Pipeline", value: "ACTIVE", tone: "#ccff00" },
]

const launchTasks = [
  "Connect founder wallet",
  "Verify domain ownership",
  "Configure shard economics",
  "Publish funding campaign",
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
            This is the founder control surface for vaulting domains, launching shard offerings,
            and tracking execution through Forge. Phase 2 introduces the application shell and
            workflow modules that connect your marketing surface to usable product operations.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
            {statusRows.map((row) => (
              <div key={row.label} className="border border-[#2a2a2a] bg-[#141414] px-4 py-3">
                <p className="text-[9px] font-mono tracking-widest text-[#666]">{row.label}</p>
                <p className="mt-1 text-[11px] font-mono font-bold" style={{ color: row.tone }}>
                  {row.value}
                </p>
              </div>
            ))}
          </div>
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
          <div className="mt-8 border-t border-[#2a2a2a] pt-4 text-[10px] font-mono text-[#666]">
            STATUS: <span className="text-[#ccff00]">READY FOR INTEGRATION</span>
          </div>
        </aside>

        <div className="lg:col-span-6">
          <DomainVaultWizard />
        </div>

        <div className="lg:col-span-6">
          <ShardLaunchConfigurator />
        </div>

        <div className="lg:col-span-12">
          <CuratorMarketplaceTable />
        </div>
      </div>
    </section>
  )
}
