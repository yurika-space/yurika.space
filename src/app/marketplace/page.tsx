import Link from "next/link"
import { CuratorMarketplaceTable } from "@/components/app/CuratorMarketplaceTable"

export const metadata = {
  title: "Shard Marketplace — yurika.space",
  description: "Browse active shard campaigns and invest in fractional domain ownership.",
}

export default function MarketplacePage() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-[9px] font-mono tracking-widest text-[#555]">// PUBLIC MARKETPLACE</p>
        <h1 className="mb-4 text-[clamp(14px,2.5vw,22px)] font-display text-[#e0e0e0]">
          ACTIVE <span className="text-[#9d00ff]">SHARD</span> LISTINGS
        </h1>
        <p className="mb-8 max-w-2xl text-[12px] font-mono text-[#888] leading-relaxed">
          Discover fractional domain campaigns. Select a listing for thesis, terms, and investment.
        </p>
        <CuratorMarketplaceTable publicLinks />
        <p className="mt-6 text-[10px] font-mono text-[#555]">
          Curators with holdings:{" "}
          <Link href="/app/portfolio" className="text-[#ccff00] hover:underline">
            view portfolio →
          </Link>
        </p>
      </div>
    </section>
  )
}
