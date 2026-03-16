"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface StepListProps {
  title: string;
  steps: string[];
  borderColor: string;
  delay?: number;
}

export default function StepList({
  title,
  steps,
  borderColor,
  delay = 0,
}: StepListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className={cn("border-2 overflow-hidden")}
      style={{ borderColor }}
      initial={{ opacity: 0, x: delay === 0 ? -30 : 30 }}
      animate={
        isInView
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: delay === 0 ? -30 : 30 }
      }
      transition={{ duration: 0.6, delay }}
    >
      {/* Title bar */}
      <div
        className="px-4 py-3 border-b-2 flex items-center gap-2"
        style={{ borderColor }}
      >
        <span className="w-3 h-3 border-2" style={{ borderColor }} />
        <span className="font-press-start-2p text-xs uppercase">{title}</span>
      </div>
      {/* Steps */}
      <div className="p-5">
        <ol className="space-y-3">
          {steps.map((step, i) => (
            <motion.li
              key={i}
              className="font-press-start-2p text-[10px] leading-relaxed uppercase"
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ delay: delay + 0.1 * (i + 1) }}
            >
              {i + 1}. {step}
            </motion.li>
          ))}
        </ol>
      </div>
      {/* Scrollbar decoration */}
      <div
        className="mx-4 mb-4 h-3 border-2 flex items-center"
        style={{ borderColor }}
      >
        <div className="h-full w-1/3 opacity-30" style={{ backgroundColor: borderColor }} />
      </div>
    </motion.div>
  );
}
