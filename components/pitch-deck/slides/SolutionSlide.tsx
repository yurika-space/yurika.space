"use client";

import PitchDeckSlide from "../PitchDeckSlide";
import { RetroWindow } from "@/components/molecules/RetroWindow";
import Icons from "@/components/atoms/Icons";

const steps = [
  {
    icon: <Icons.Globe />,
    title: "Get a Domain",
    description: "Acquire a premium, brandable domain for your project ($0.99-$5K)",
  },
  {
    icon: <Icons.Zap />,
    title: "Tokenize It",
    description: "Mint tokens representing fractional ownership + revenue rights",
  },
  {
    icon: <Icons.Users />,
    title: "Rally Community",
    description: "Raise $5K-$50K from your community in small increments",
  },
  {
    icon: <Icons.TrendingUp />,
    title: "Build & Share",
    description: "Revenue shared automatically via smart contracts with token holders",
  },
];

export default function SolutionSlide() {
  return (
    <PitchDeckSlide id="solution" background="gradient">
      <div className="max-w-6xl w-full space-y-10">
        <h2 className="font-press-start-2p text-lg md:text-2xl text-center leading-relaxed uppercase">
          Tokenize Your Domain.
          <br />
          Fund Your Dream.
        </h2>
        <p className="font-jetbrains-mono text-sm md:text-base text-center text-[var(--muted-foreground)] max-w-3xl mx-auto">
          yurika.space lets founders tokenize premium domains and raise capital
          from their community — no VCs, no gatekeepers, no BS.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <RetroWindow
              key={step.title}
              title={`step_${i + 1}.sh`}
              variant="terminal"
              animated
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className="text-[var(--primary)]">{step.icon}</div>
                <h3 className="font-press-start-2p text-[10px] uppercase">
                  {step.title}
                </h3>
                <p className="font-jetbrains-mono text-xs text-[var(--muted-foreground)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </RetroWindow>
          ))}
        </div>
      </div>
    </PitchDeckSlide>
  );
}
