import Link from "next/link"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[#2a2a2a] bg-[#0d0d0d] mt-24">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <p className="text-[10px] font-display text-[#ccff00] mb-3 tracking-wider">YURIKA.SPACE</p>
            <p className="text-[11px] font-mono text-[#555] leading-relaxed">
              Liquid Domains.<br />Accelerated Founders.
            </p>
          </div>

          {/* Protocol */}
          <div>
            <p className="text-[9px] font-mono text-[#888] tracking-widest uppercase mb-4">// PROTOCOL</p>
            <ul className="space-y-2">
              {["The Vault", "Shard Marketplace", "The Forge", "Knowledge Graph"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-[11px] font-mono text-[#555] hover:text-[#ccff00] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Signal */}
          <div>
            <p className="text-[9px] font-mono text-[#888] tracking-widest uppercase mb-4">// JOIN THE SIGNAL</p>
            <p className="text-[11px] font-mono text-[#555] mb-4">
              No noise, just alpha on upcoming drops.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@signal.eth"
                className="flex-1 bg-[#141414] border border-[#2a2a2a] px-3 py-2 text-[11px] font-mono text-[#e0e0e0] placeholder:text-[#444] focus:outline-none focus:border-[#ccff00] transition-colors"
              />
              <button className="btn-primary text-[9px] py-2 px-3">TX</button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1a1a1a] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[9px] font-mono text-[#333]">
            © {year} YURIKA.SPACE — ALL RIGHTS RESERVED
          </p>
          <p className="text-[9px] font-mono text-[#333]">
            DEPLOYED ON BASE MAINNET — BLOCK #{" "}
            <span className="text-[#ccff00]">∞</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
