"use client";

import PitchDeckSlide from "../PitchDeckSlide";
import StickyNote from "../StickyNote";
import { SpaceInvader, InvaderField } from "@/components/atoms/SpaceInvader";

export default function RoadmapSlide() {
  return (
    <PitchDeckSlide id="roadmap" background="dark">
      <div className="max-w-6xl w-full space-y-10 relative">
        {/* Background invaders */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <InvaderField count={20} />
        </div>

        <h2 className="font-press-start-2p text-sm md:text-lg text-center leading-relaxed uppercase relative z-10">
          We&apos;re Building the Infrastructure
          <br />
          For Everyone That VCs Have Ignored
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          <StickyNote
            title="Now > H2 2026"
            color="var(--chart-5, #ec4899)"
            textColor="#1a1a1a"
            rotation={-2}
            delay={0}
            items={[
              "Beta Launch",
              "15 Projects",
              "20 Founder Communities",
              "3 Domain Marketplace Partners",
            ]}
          />
          <StickyNote
            title="H2 2026 > Q1 2027"
            color="var(--warning, #eab308)"
            textColor="#1a1a1a"
            rotation={1}
            delay={0.15}
            items={[
              "Public Launch",
              "150 Projects",
              "Fiat On-ramps",
              "Secondary Marketplace Launch",
            ]}
          />
          <StickyNote
            title="Q1 2027 > Q3 2027"
            color="var(--card)"
            rotation={-1}
            delay={0.3}
            items={[
              "DAO Governance Tooling",
              "500+ Projects",
              "No-code tools",
              "Partnerships",
              "Educational Platform",
            ]}
          />
        </div>
      </div>
    </PitchDeckSlide>
  );
}
