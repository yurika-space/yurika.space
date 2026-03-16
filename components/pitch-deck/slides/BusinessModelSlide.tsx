"use client";

import PitchDeckSlide from "../PitchDeckSlide";
import { RetroWindow } from "@/components/molecules/RetroWindow";

const revenueStreams = [
  {
    name: "Campaign Fees",
    detail: "2-5% of funds raised on the platform",
  },
  {
    name: "Token Minting",
    detail: "Fee per domain tokenization event",
  },
  {
    name: "Secondary Market",
    detail: "1% transaction fee on token trades",
  },
  {
    name: "Domain Marketplace",
    detail: "Commission on domain acquisitions",
  },
  {
    name: "Premium Features",
    detail: "Analytics, featured listings, accelerator access",
  },
];

export default function BusinessModelSlide() {
  return (
    <PitchDeckSlide id="business-model" background="gradient">
      <div className="max-w-5xl w-full space-y-10">
        <h2 className="font-press-start-2p text-lg md:text-2xl text-center leading-relaxed uppercase">
          Business Model
        </h2>
        <p className="font-jetbrains-mono text-sm text-center text-[var(--muted-foreground)]">
          Multiple revenue streams from day one with network effects
        </p>

        <RetroWindow title="revenue_model.cfg" variant="terminal" animated>
          <div className="space-y-4">
            {revenueStreams.map((stream, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-[var(--primary)] shrink-0">
                  [{String(i + 1).padStart(2, "0")}]
                </span>
                <div>
                  <span className="font-press-start-2p text-[10px] uppercase">
                    {stream.name}
                  </span>
                  <p className="font-jetbrains-mono text-xs text-[var(--muted-foreground)] mt-1">
                    {stream.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </RetroWindow>
      </div>
    </PitchDeckSlide>
  );
}
