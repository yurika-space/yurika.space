"use client";

import PitchDeckSlide from "../PitchDeckSlide";
import MarketCard from "../MarketCard";

export default function MarketSlide() {
  return (
    <PitchDeckSlide id="market" background="light">
      <div className="max-w-6xl w-full space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <h2 className="font-press-start-2p text-sm md:text-lg leading-relaxed uppercase">
            378.5M Domain Name Registrations
          </h2>
          <h2 className="font-press-start-2p text-sm md:text-lg leading-relaxed uppercase text-right">
            Alt. Models Needed Since VC Decline
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MarketCard
            title="Domain Market"
            accentColor="var(--chart-3, #06b6d4)"
            items={[
              "378.5M domain name registrations",
              "$2.4B+ global domain registration market",
              "Expected CAGR of 4.5% YoY",
            ]}
            delay={0}
          />
          <MarketCard
            title="Web3 Market"
            accentColor="var(--warning, #eab308)"
            items={[
              "$16B raised in blockchain funding in 2024 despite being 4% of global VC investments",
              "Altcoin MC of $1.26T",
              "De-Fi expected CAGR of 46.5% YoY",
            ]}
            delay={0.15}
          />
          <MarketCard
            title="Key Factors"
            accentColor="var(--success, #22c55e)"
            items={[
              "Premium, brandable domains hold great value",
              "Diverse founders outperform yet receive <3% of funding",
              "Alternative models needed since VC decline",
            ]}
            delay={0.3}
          />
        </div>

        <p className="font-press-start-2p text-sm md:text-base text-center uppercase">
          $16B Raised in Blockchain Funding
        </p>
      </div>
    </PitchDeckSlide>
  );
}
