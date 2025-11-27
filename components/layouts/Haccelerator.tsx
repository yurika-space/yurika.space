"use client";
import React, { useState } from "react";
import "../component_stylesheets/haccelerator.css";
import Typewriter from "../atoms/Typewriter";
import ComponentHeader from "../atoms/ComponentHeader";
import ComponentBody from "../atoms/ComponentBody";
import HealthBar from "../molecules/HealthBar";
import StarburstSticker from "../atoms/StarburstSticker";

export default function Haccelerator() {
  return (
    <section className="relative min-h-screen w-full bg-yurika-bg-primary py-2 px-4">
      {/* Animated grid background - stays in background */}
      <div className="grid-bg-subtle absolute inset-0 opacity-30" />

      {/* Floating particles - stays in background */}
      <div className="pixel-particles" />

      {/* Content container - naturally flows */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center animate-fade-in-up pt-8">
          <ComponentHeader title="Haccelerator Program" item=" ★ " />
          <Typewriter
            text="16 WEEKS TO LAUNCH"
            speed={100}
            delay={10000}
            className="font-sixtyfour text-2xl tracking-wide mb-8 glitch-text-subtle leading-relaxed"
          />

          <ComponentBody>
            <p className="font-pixel text-[1.1rem] tracking-normal leading-relaxed">
              From idea to launch, we&apos;ll provide tech and business support,
              because we can&apos;t all go to Harvard, Wharton, or whatever
              fancy school is gatekeeping success this week.
              <br />
              <br />
              We&apos;re here to help you get your idea off the ground and into
              the world.
            </p>
          </ComponentBody>
        </div>

        {/* Stats display - Gaming UI style */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-4 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
            <ComponentBody>
              <section className="flex w-full justify-between items-center mb-2">
              <span className="font-pixel text-[1.1rem] tracking-normal leading-relaxed">
                Support Level
              </span>
              <span className="font-pixel text-[1.1rem] tracking-normal leading-relaxed max-glow">MAX</span>
              </section>
              <HealthBar value={100} variant="retro" animateOnView />
            </ComponentBody>
          </div>
        {/* CTA Section */}
        <div
          className=" text-center animate-fade-in-up"
          style={{ animationDelay: "1.2s" }}
        >
          <div className="flex flex-col items-center justify-center">
            <p className="font-pixel text-sm game-ui-box p-4 pb-14">
              * Free for accepted applicants. Equity-free. No strings attached.
              Just pure support for the weird and wonderful.
            </p>
            <StarburstSticker
              text="Join Waitlist"
              className="animate-shimmer -mt-25 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
