"use client";

import { useEffect, useState } from "react";
import CountdownTimer from "@/components/organisms/CountdownTimer";
import Header from "@/components/organisms/Header";
import LoadingScreen from "@/components/organisms/LoadingScreen";
import Footer from "@/components/organisms/Footer";
import Hero from "@/components/layouts/Hero";
import Haccelerator from "@/components/layouts/Haccelerator";
import EurekaLaunchpad from "@/components/layouts/EurekaLaunchpad";
import GameOver from "@/components/layouts/GameOver";
import Mission from "@/components/layouts/Mission";
import JoinTheFight from "@/components/layouts/JoinTheFight";

export default function Home() {
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    const markLoaded = () => setAssetsLoaded(true);

    if (document.readyState === "complete") {
      markLoaded();
      return;
    }

    window.addEventListener("load", markLoaded);
    const safetyTimeout = window.setTimeout(markLoaded, 7000);

    return () => {
      window.removeEventListener("load", markLoaded);
      window.clearTimeout(safetyTimeout);
    };
  }, []);

  return (
    <>
      <LoadingScreen isLoaded={assetsLoaded} />
      <div
        className={`flex flex-col items-center justify-center min-h-screen w-full bg-background text-foreground overflow-x-hidden line-height-1.6 font-jetbrains-mono transition-opacity duration-500 ${
          assetsLoaded ? "opacity-100" : "opacity-0"
        }`}
        aria-busy={!assetsLoaded}
      >
        <Header />
        <Hero />
        <Haccelerator />
        <EurekaLaunchpad />
        <GameOver />
        <Mission />
        <JoinTheFight />
      </div>
      <Footer />
    </>
  );
}
