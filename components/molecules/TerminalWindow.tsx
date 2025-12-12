const TerminalWindow = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="border-2 border-[var(--primary)]/60 bg-black overflow-hidden">
    <div className="flex items-center gap-3 px-4 py-3 border-b-2 border-[var(--primary)]/60 bg-gradient-to-r from-[var(--card)] to-[var(--sidebar)]">
      <div className="flex gap-2">
        <span className="w-3 h-3 rounded-full bg-red-500"/>
        <span className="w-3 h-3 rounded-full bg-yellow-500"/>
        <span className="w-3 h-3 rounded-full bg-green-500"/>
      </div>
      <span className="font-mono text-xs uppercase tracking-wider text-[var(--primary)]">{title}</span>
    </div>
    <div className="p-6 font-mono text-sm text-[var(--primary)]">{children}</div>
  </div>
)

export default TerminalWindow;
