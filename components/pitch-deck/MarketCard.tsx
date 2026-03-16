"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface MarketCardProps {
  title: string;
  items: string[];
  accentColor: string;
  delay?: number;
}

export default function MarketCard({
  title,
  items,
  accentColor,
  delay = 0,
}: MarketCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className={cn(
        "border-2 flex flex-col overflow-hidden",
        "bg-[var(--card)]"
      )}
      style={{ borderColor: accentColor }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay }}
    >
      {/* VHS-style color stripe */}
      <div className="h-3 flex">
        <div className="flex-1" style={{ backgroundColor: accentColor }} />
        <div className="w-4 bg-red-500" />
        <div className="w-4 bg-yellow-400" />
        <div className="w-4 bg-green-500" />
        <div className="w-4 bg-cyan-400" />
        <div className="w-4 bg-white" />
      </div>
      {/* Title */}
      <div
        className="px-4 py-3 text-center font-press-start-2p text-xs uppercase tracking-wider"
        style={{
          backgroundColor: accentColor,
          color: "var(--primary-foreground)",
        }}
      >
        {title}
      </div>
      {/* Items */}
      <div className="p-5 flex-1 flex flex-col justify-center gap-4">
        {items.map((item, i) => (
          <p
            key={i}
            className="font-press-start-2p text-[10px] leading-relaxed text-center uppercase"
          >
            {item}
          </p>
        ))}
      </div>
    </motion.div>
  );
}
