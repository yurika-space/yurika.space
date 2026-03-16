"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface StickyNoteProps {
  title: string;
  items: string[];
  color: string;
  textColor?: string;
  rotation?: number;
  delay?: number;
}

export default function StickyNote({
  title,
  items,
  color,
  textColor = "var(--foreground)",
  rotation = 0,
  delay = 0,
}: StickyNoteProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className={cn("p-5 shadow-lg relative")}
      style={{
        backgroundColor: color,
        color: textColor,
        transform: `rotate(${rotation}deg)`,
      }}
      initial={{ opacity: 0, scale: 0.8, rotate: rotation - 5 }}
      animate={
        isInView
          ? { opacity: 1, scale: 1, rotate: rotation }
          : { opacity: 0, scale: 0.8, rotate: rotation - 5 }
      }
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
    >
      {/* Pin */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[var(--muted-foreground)] shadow-md border border-[var(--border)]" />
      <h4 className="font-press-start-2p text-[10px] font-bold mb-3 leading-relaxed">
        {title}
      </h4>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="font-jetbrains-mono text-xs leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
