"use client";

import PitchDeckSlide from "../PitchDeckSlide";
import { RetroWindow } from "@/components/molecules/RetroWindow";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const metrics = [
  { label: "Founders Waiting", value: "1,000+", icon: "👥" },
  { label: "Target First Raise", value: "$300K", icon: "💰" },
  { label: "Pilot Projects", value: "15", icon: "🚀" },
  { label: "Community Members", value: "20+", icon: "🌍" },
];

const milestones = [
  "Platform MVP in development",
  "15 pilot projects identified and onboarding",
  "20+ founder communities engaged",
  "3 domain marketplace partnerships in discussion",
  "Accelerator program curriculum designed (16 levels)",
];

export default function TractionSlide() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <PitchDeckSlide id="traction" background="dark">
      <div ref={ref} className="max-w-5xl w-full space-y-10">
        <h2 className="font-press-start-2p text-lg md:text-2xl text-center leading-relaxed uppercase">
          Traction
        </h2>

        {/* Key metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              className="border-2 border-[var(--primary)] p-4 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.9 }
              }
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-2xl mb-2">{m.icon}</div>
              <div className="font-press-start-2p text-sm text-[var(--primary)]">
                {m.value}
              </div>
              <div className="font-jetbrains-mono text-[10px] text-[var(--muted-foreground)] mt-1 uppercase">
                {m.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Milestones */}
        <RetroWindow title="milestones.log" variant="terminal" animated>
          <div className="space-y-2">
            {milestones.map((m, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-[var(--success,#22c55e)]">[OK]</span>
                <span className="font-jetbrains-mono text-xs">{m}</span>
              </div>
            ))}
          </div>
        </RetroWindow>
      </div>
    </PitchDeckSlide>
  );
}
