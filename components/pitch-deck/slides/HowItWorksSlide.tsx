"use client";

import PitchDeckSlide from "../PitchDeckSlide";
import StepList from "../StepList";

const founderSteps = [
  "Acquire domain (coolstartup.com for $0.99-$5K)",
  "Create campaign with funding goal, roadmap, revenue share terms",
  "Mint tokens representing fractional ownership + revenue rights",
  "Raise capital from community ($5K-$50K in small increments)",
  "Build & share revenue automatically via smart contracts",
  "Exit optionality (keep building, get acquired, sell domain, token holders profit)",
];

const investorSteps = [
  "Discover projects they believe in",
  "Back with small amounts ($50-$5K)",
  "Get tokens representing ownership + revenue share",
  "Vote on decisions via DAO governance",
  "Trade tokens on secondary market or hold for revenue",
  "Earn returns if project succeeds — without accredited investor requirements",
];

export default function HowItWorksSlide() {
  return (
    <PitchDeckSlide id="how-it-works" background="dark">
      <div className="max-w-6xl w-full space-y-10">
        <h2 className="font-press-start-2p text-base md:text-xl text-center leading-relaxed uppercase">
          Raise Capital From Community
          <br />
          <span className="text-[var(--muted-foreground)]">
            ($5K-$50K in Small Increments)
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StepList
            title="For Founders"
            steps={founderSteps}
            borderColor="var(--success, #22c55e)"
            delay={0}
          />
          <StepList
            title="For Investors"
            steps={investorSteps}
            borderColor="var(--secondary)"
            delay={0.2}
          />
        </div>

        <p className="font-press-start-2p text-[10px] text-center text-[var(--muted-foreground)] uppercase">
          Get tokens representing ownership + revenue share
        </p>
      </div>
    </PitchDeckSlide>
  );
}
