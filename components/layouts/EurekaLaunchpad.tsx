import React from "react";
import "../component_stylesheets/eureka-launchpad.css";
import ComponentHeader from "../atoms/ComponentHeader";
import ComponentBody from "../atoms/ComponentBody";
import AnimatedBackground from "../molecules/AnimatedBg";
import FeatureCard from "../atoms/FeatureCard";
import ProgressBarSeparator from "../atoms/ProgressBarHR";

const featureCards = [
  {
    icon: "🌐",
    title: "Domain-Backed",
    description:
      "Your domain name is your collateral. Build equity through ownership.",
  },
  {
    icon: "🤝",
    title: "Community First",
    description:
      "Raise from people who believe in your vision, not your last name.",
  },
  {
    icon: "💎",
    title: "Fair Terms",
    description:
      "No predatory rates. No hidden fees. Just fair funding for real builders.",
  },
  {
    icon: "🚀",
    title: "Launch Ready",
    description:
      "Integrated with Haccelerator. Get funding and support together.",
  },
];

export default function EurekaLaunchpad() {
  return (
    <section className="flex flex-col items-center justify-center w-screen min-h-screen">
      <AnimatedBackground>
        {/* Content container */}
        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
          {/* Power-up style header */}
          <div className="text-center mb-2">
            <ComponentHeader
              title="Feature Unlocked"
              item="⚡"
              className="animate-fade-in-up w-3/4 mx-auto"
              style={{ animationDelay: "0.2s" }}
            />
            <ComponentBody className="animate-fade-in-up" delay={400}>
              <p className="font-mono text-base sm:text-lg text-yurika-text-muted leading-relaxed">
                <span className="pixel-frame text-background font-bold">
                  Domain Name-backed Crowdfunding
                </span>{" "}
                for those without rich parents or a wealthy network.
              </p>
            </ComponentBody>
          </div>

          {/* Feature cards */}
          <div
            className="grid w-[90%] sm:grid-cols-2 gap-4 mb-12 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            {featureCards.map((item, index) =>
              index % 2 === 0 ? (
                <FeatureCard
                  key={item.title}
                  {...item}
                  className="pixel-frame-border"
                />
              ) : (
                <FeatureCard key={item.title} {...item} className="" />
              )
            )}
          </div>
        </div>  
      </AnimatedBackground>
    </section>
  );
}
