"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface StatBarProps {
  label: string;
  value: number;
  maxValue?: number;
  suffix?: string;
  color?: string;
}

export default function StatBar({
  label,
  value,
  maxValue = 5,
  suffix = "%",
  color = "var(--foreground)",
}: StatBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const barHeight = Math.max((value / maxValue) * 100, 8);

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <span className="font-press-start-2p text-xs text-center leading-relaxed">
        {label}
      </span>
      <div className="relative w-full h-32 border-2 border-[var(--border)] flex items-end">
        {/* Y-axis labels */}
        <div className="absolute left-1 top-0 text-[8px] font-mono text-[var(--muted-foreground)]">
          {maxValue}%
        </div>
        <div className="absolute left-1 top-1/2 -translate-y-1/2 text-[8px] font-mono text-[var(--muted-foreground)]">
          {maxValue / 2}%
        </div>
        <div className="absolute left-1 bottom-0 text-[8px] font-mono text-[var(--muted-foreground)]">
          0%
        </div>
        {/* Bar */}
        <motion.div
          className="w-full"
          style={{ backgroundColor: color }}
          initial={{ height: 0 }}
          animate={isInView ? { height: `${barHeight}%` } : { height: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        />
      </div>
      {/* Value label */}
      <motion.span
        className="font-press-start-2p text-xs border border-[var(--border)] px-2 py-1 bg-[var(--card)]"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.2 }}
      >
        {value}
        {suffix}
      </motion.span>
    </div>
  );
}
