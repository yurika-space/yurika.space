"use client";

import PitchDeckSlide from "../PitchDeckSlide";
import StatBar from "../StatBar";
import { RetroWindow } from "@/components/molecules/RetroWindow";

export default function ProblemSlide() {
  return (
    <PitchDeckSlide id="problem" background="dark">
      <div className="max-w-6xl w-full space-y-10">
        {/* Main heading */}
        <RetroWindow title="problem.exe" variant="light" animated>
          <h2 className="font-press-start-2p text-lg md:text-2xl text-center leading-relaxed uppercase">
            The Funding Gap is Getting Worse
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="border-2 border-[var(--border)] p-4 space-y-3">
              <ul className="space-y-3 font-press-start-2p text-[10px] leading-relaxed uppercase">
                <li>
                  &bull; Need warm introductions to access angels/VCs
                </li>
                <li>
                  &bull; Must have &quot;pedigree&quot; (right school, right
                  accelerator, right network)
                </li>
              </ul>
            </div>
            <div className="border-2 border-[var(--border)] p-4 space-y-3">
              <ul className="space-y-3 font-press-start-2p text-[10px] leading-relaxed uppercase">
                <li>
                  &bull; Small checks ($5K-$50K) are &quot;too small&quot; for
                  institutional investors
                </li>
                <li>&bull; Friends &amp; family can&apos;t participate</li>
              </ul>
            </div>
          </div>
        </RetroWindow>

        {/* Stats */}
        <RetroWindow title="funding_stats.dat" variant="purple" animated>
          <h3 className="font-press-start-2p text-sm text-center mb-6 uppercase">
            Problem
          </h3>
          <div className="grid grid-cols-3 gap-6">
            <StatBar
              label="Women-Only Teams"
              value={2.3}
              color="var(--foreground)"
            />
            <StatBar
              label="Black Founders"
              value={0.4}
              color="var(--foreground)"
            />
            <StatBar
              label="LGBTQ+ Founders"
              value={0.5}
              color="var(--foreground)"
            />
          </div>
        </RetroWindow>
      </div>
    </PitchDeckSlide>
  );
}
