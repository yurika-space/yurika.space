"use client";

import LoadingScreen from "@/components/molecules/Loading";
import Footer from "@/components/organisms/Footer";
import Nav from "@/components/organisms/Nav";
import { CompetitionSection } from "@/components/pages/Advantages";
import Benefits from "@/components/pages/Benefits";
import CTA from "@/components/pages/CTA";
import FAQs from "@/components/pages/FAQs";
import Hero from "@/components/pages/Hero";
import SpaceIntro from "@/components/pages/Intro";
import TheProblem from "@/components/pages/Problem";
import { RoadmapSection } from "@/components/pages/Roadmap";
import TheSolution from "@/components/pages/Solution";
import { useEffect, useState } from "react";

export default function Home() {
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    const markLoaded = () => {
      setTimeout(() => {
        setAssetsLoaded(true);
      }, 3500);
    };

    if (document.readyState === "complete") {
      markLoaded();
      return;
    }

    window.addEventListener("load", markLoaded);
    const safetyTimeout = window.setTimeout(markLoaded, 5000);

    return () => {
      window.removeEventListener("load", markLoaded);
      window.clearTimeout(safetyTimeout);
    };
  }, []);

  if (!assetsLoaded) {
    return <LoadingScreen isLoaded={assetsLoaded} />;
  }

  return (
    <div className="flex flex-col min-h-screen w-screen dark">
      <Nav />
      <main className="grow w-full">
        <Hero />
        <SpaceIntro />
        <TheProblem />
        <TheSolution />
        <Benefits />
        <CompetitionSection />
        <RoadmapSection />
        <CTA />
        <FAQs player={true} />
      </main>
      <Footer />
    </div>
  );
}
