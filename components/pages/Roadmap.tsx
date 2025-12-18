"use client";

import { cn } from "@/lib/utils";
import { motion, type Variants } from "framer-motion";
import { Section, SectionGrid } from "../atoms/Section";
import { InvaderField } from "../atoms/SpaceInvader";
import "@/app/retro-globals.css";

export const RoadmapSection: React.FC = () => {
  const phases = [
    {
      period: "Now → H2 2026",
      title: "Beta Launch",
      items: [
        "15 Projects",
        "20 Founder Communities",
        "3 Domain Marketplace Partners",
      ],
      color: "purple",
    },
    {
      period: "H2 2026 → Q1 2027",
      title: "Public Launch",
      items: ["150 Projects", "Fiat On-ramps", "Secondary Marketplace Launch"],
      color: "yellow",
    },
    {
      period: "Q1 2027 → Q3 2027",
      title: "Scale",
      items: [
        "DAO Governance Tooling",
        "500+ Projects",
        "No-code tools partnerships",
        "Educational Platform",
      ],
      color: "gray",
    },
  ];

  const roadmapCardVariants: Variants = {
    hidden: { opacity: 0, y: 30, rotate: 0 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      rotate: index === 0 ? -2 : index === 2 ? 2 : 0,
      transition: {
        duration: 0.5,
        delay: index * 0.15,
      },
    }),
  };

  return (
    <Section sectionId="roadmap" style={{
      backgroundImage: `linear-gradient(to bottom, var(--primary-foreground), color-mix(in oklch, var(--primary) 30%, transparent))`
    }} className="relative">
      {/* Background invaders */}
      <InvaderField count={50} color="var(--primary)"/>

      <div className="relative z-10">
        <div className="text-center mb-12 px-4">
          <h2 className="font-press-start-2p text-2xl md:text-3xl text-foreground mb-2">
            WE&apos;RE BUILDING THE INFRASTRUCTURE
          </h2>
          <h3 className="font-press-start-2p text-xl md:text-2xl text-theme-secondary pt-6">
            FOR EVERYONE THAT VCS HAVE IGNORED
          </h3>
        </div>

        <SectionGrid columns={3} gap="lg">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.title}
              variants={roadmapCardVariants}
              custom={i}
              whileHover={{ y: -8, rotate: 0 }}
              className={cn(
                "p-6 border-2 transition-transform w-[80%] max-w-7xl mx-auto",
                phase.color === "purple" && "bg-[color-mix(in_oklch,_var(--secondary)_20%,_var(--background))] border-theme-secondary",
                phase.color === "yellow" && "bg-[color-mix(in_oklch,_var(--warning)_20%,_var(--background))] border-theme-warning",
                phase.color === "gray" && "bg-theme-card border-theme-border"
              )}
              style={{ boxShadow: "4px 4px 0 rgba(0,0,0,0.2)" }}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="font-jetbrains-mono text-xs font-bold text-theme-muted">
                  {phase.period}
                </span>
                <div className="w-4 h-4 rounded-full bg-theme-warning" />
              </div>
              <h4 className="font-jetbrains-mono text-lg font-bold mb-4 text-foreground">
                {phase.title}
              </h4>
              <ul className="space-y-2 font-jetbrains-mono text-sm text-theme-muted">
                {phase.items.map((item, j) => (
                  <li key={j}>• {item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </SectionGrid>
      </div>
    </Section>
  );
};
