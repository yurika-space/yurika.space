"use client";

import PitchDeckSlide from "../PitchDeckSlide";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const competitors = [
  {
    name: "AngelList",
    domainAsset: false,
    communityFunding: false,
    tokenized: false,
    noAccreditation: false,
    revenueShare: false,
  },
  {
    name: "Republic",
    domainAsset: false,
    communityFunding: true,
    tokenized: false,
    noAccreditation: true,
    revenueShare: false,
  },
  {
    name: "Kickstarter",
    domainAsset: false,
    communityFunding: true,
    tokenized: false,
    noAccreditation: true,
    revenueShare: false,
  },
  {
    name: "DAOs",
    domainAsset: false,
    communityFunding: true,
    tokenized: true,
    noAccreditation: true,
    revenueShare: false,
  },
  {
    name: "Yurika",
    domainAsset: true,
    communityFunding: true,
    tokenized: true,
    noAccreditation: true,
    revenueShare: true,
    highlight: true,
  },
];

const columns = [
  "Domain as Asset",
  "Community Funding",
  "Tokenized",
  "No Accreditation",
  "Revenue Share",
];

export default function CompetitionSlide() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <PitchDeckSlide id="competition" background="dark">
      <div ref={ref} className="max-w-5xl w-full space-y-10">
        <h2 className="font-press-start-2p text-lg md:text-2xl text-center leading-relaxed uppercase">
          Competition
        </h2>

        <motion.div
          className="overflow-x-auto border-2 border-[var(--border)]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <table className="w-full font-press-start-2p text-[8px] md:text-[10px]">
            <thead>
              <tr className="border-b-2 border-[var(--border)]">
                <th className="p-3 text-left uppercase">Platform</th>
                {columns.map((col) => (
                  <th key={col} className="p-3 text-center uppercase">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {competitors.map((c) => (
                <tr
                  key={c.name}
                  className={cn(
                    "border-b border-[var(--border)]",
                    c.highlight &&
                      "bg-[color-mix(in_oklch,var(--primary)_15%,transparent)] text-[var(--primary)]"
                  )}
                >
                  <td className="p-3 font-bold">{c.name}</td>
                  {[
                    c.domainAsset,
                    c.communityFunding,
                    c.tokenized,
                    c.noAccreditation,
                    c.revenueShare,
                  ].map((val, i) => (
                    <td key={i} className="p-3 text-center">
                      {val ? "✓" : "✗"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </PitchDeckSlide>
  );
}
