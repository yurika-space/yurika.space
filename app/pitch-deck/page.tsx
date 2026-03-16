"use client";

import { useState, useCallback } from "react";
import PitchDeckNav from "@/components/pitch-deck/PitchDeckNav";
import {
  ProblemSlide,
  SolutionSlide,
  HowItWorksSlide,
  MarketSlide,
  BusinessModelSlide,
  TractionSlide,
  CompetitionSlide,
  RoadmapSlide,
  AskSlide,
} from "@/components/pitch-deck/slides";

export default function PitchDeckPage() {
  const [activeSlide, setActiveSlide] = useState("problem");

  const handleNavigate = useCallback((id: string) => {
    setActiveSlide(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-screen">
      <PitchDeckNav activeSlide={activeSlide} onNavigate={handleNavigate} />
      <main className="grow w-full">
        <ProblemSlide />
        <SolutionSlide />
        <HowItWorksSlide />
        <MarketSlide />
        <BusinessModelSlide />
        <TractionSlide />
        <CompetitionSlide />
        <RoadmapSlide />
        <AskSlide />
      </main>
    </div>
  );
}
