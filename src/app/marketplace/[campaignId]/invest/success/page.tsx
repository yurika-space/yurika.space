import Link from "next/link"

export default async function InvestSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ campaignId: string }>
  searchParams: Promise<{ holdingId?: string }>
}) {
  const { campaignId } = await params
  const { holdingId } = await searchParams

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-4 text-[9px] font-mono tracking-widest text-[#555]">// TRANSACTION COMPLETE</p>
        <h1 className="mb-6 text-[clamp(14px,2.5vw,22px)] font-display text-[#ccff00]">
          INVESTMENT SUCCESSFUL
        </h1>
        <p className="mb-8 text-[12px] font-mono text-[#888] leading-relaxed">
          Your shards have been allocated to your portfolio. The ledger has been updated.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-[10px] font-mono">
          {holdingId ? (
            <Link 
              href={`/app/portfolio/holdings/${holdingId}`}
              className="btn-primary px-6 py-3"
            >
              [ VIEW RECEIPT ]
            </Link>
          ) : (
            <Link 
              href="/app/portfolio"
              className="btn-primary px-6 py-3"
            >
              [ VIEW PORTFOLIO ]
            </Link>
          )}
          <Link 
            href={`/marketplace/${campaignId}`}
            className="btn-ghost px-6 py-3"
          >
            RETURN TO CAMPAIGN
          </Link>
        </div>
      </div>
    </section>
  )
}
