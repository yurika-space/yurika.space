import Link from "next/link"

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <header className="border-b border-[#2a2a2a] bg-[#0d0d0d]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="text-[10px] font-display tracking-wider text-[#ccff00] glow-lime">
            YURIKA.SPACE // COMMAND CENTER
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/" className="text-[9px] font-mono tracking-widest text-[#888] hover:text-[#ccff00]">
              RETURN TO LANDING
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
