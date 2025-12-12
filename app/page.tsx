"use client";

import LoadingScreen from "@/components/molecules/Loading";
import Footer from "@/components/organisms/Footer";
import Nav from "@/components/organisms/Nav";
import Hero from "@/components/pages/Hero";
import SpaceIntro from "@/components/pages/Intro";
import TheProblem from "@/components/pages/Problem";
import TheSolution from "@/components/pages/Solution";
import Benefits from "@/components/pages/Benefits";
import { useEffect, useState } from "react";
import CTA from "@/components/pages/CTA";
import FAQs from "@/components/pages/FAQs";
import { CompetitionSection } from "@/components/pages/Advantages";
import { RoadmapSection } from "@/components/pages/Roadmap";
import { SectionId } from "@/lib/utils";

export default function Home() {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("hero");

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

  // Intersection Observer for scroll tracking
  useEffect(() => {
    if (!assetsLoaded) return;

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Trigger when section is 20% from top
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id as SectionId;
          setActiveSection(sectionId);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe all sections
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [assetsLoaded]);

  if (!assetsLoaded) {
    return <LoadingScreen isLoaded={assetsLoaded} />;
  }

  return (
    <>
      <Nav activeSection={activeSection} onSectionChange={setActiveSection} />
      <Hero />
      <SpaceIntro />
      <TheProblem />
      <TheSolution />
      <Benefits />
      <CompetitionSection />
      <RoadmapSection />
      <CTA />
      <FAQs player={true} />
      <Footer />
    </>
  );
}
