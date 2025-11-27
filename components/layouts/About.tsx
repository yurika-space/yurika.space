"use case"
import { useState } from "react";
import { PROGRAM_LEVELS } from "@/lib/haccelerator_program";
import Typewriter from "../atoms/Typewriter";
import "@components/component_stylesheets/haccelerator.css";
import Mission from "./Mission";

export default function About() {
    const [expandedLevel, setExpandedLevel] = useState<number | null>(null);
    return (
        <section className="relative min-h-screen w-full bg-yurika-bg-primary py-16 px-4 overflow-hidden">
            <div className="grid-bg-subtle absolute inset-0 opacity-30" />
            <div className="pixel-particles" />
            <div className="relative z-10 w-full max-w-4xl mx-auto">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-yurika-text-primary mb-6 glitch-text-subtle">
                    About
                </h2>
                {/* Program levels - Game progression style */}
        <div 
          className="mb-12 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <h3 className="font-sixtyfour text-2xl text-yurika-electric mb-6 text-center">
            &gt; <Typewriter
              text="PROGRAM BREAKDOWN_"
              speed={100}
              delay={5000}
            />
          </h3>
          
          <div className="space-y-3">
            {PROGRAM_LEVELS.map((level, index) => (
              <div
                key={level.week}
                className="level-card"
                style={{ animationDelay: `${0.6 + index * 0.05}s` }}
                onClick={() =>
                  setExpandedLevel(
                    expandedLevel === level.week ? null : level.week
                  )
                }
              >
                <div className="level-header">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="level-number">
                      {level.week.toString().padStart(2, "0")}
                    </div>
                    <div className="flex-1">
                      <div className="level-title">{level.title}</div>
                      <div className="level-description">
                        {level.description}
                      </div>
                    </div>
                  </div>
                  <div className="level-icon">
                    {expandedLevel === level.week ? "▼" : "▶"}
                  </div>
                </div>

                {expandedLevel === level.week && (
                  <div className="level-details">
                    <div className="pixel-divider" />
                    <p className="font-mono text-sm text-yurika-text-muted">
                      {level.week === 16
                        ? "The final challenge! Launch your product to the world and prepare for scale. You&apos;ve completed the training—now it&apos;s time to dominate."
                        : level.week >= 12
                          ? "Advanced stage: Focus on launch preparation, community building, and setting up systems for long-term success."
                          : level.week >= 8
                            ? "Mid-game: Validate your MVP, establish your business model, and prepare your brand identity."
                            : "Early game: Lay the foundation with solid research, planning, and building your initial prototype."}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
            </div>
            <Mission />
            {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="fight-badge inline-block mb-6">
            <span className="font-pixel text-base sm:text-lg">
              ⚔️ JOIN THE FIGHT ⚔️
            </span>
          </div>
          
          <h2 className="font-sixtyfour text-4xl sm:text-5xl md:text-7xl font-bold text-yurika-text-primary mb-8">
            <span className="text-yurika-electric">OUR ASK IS</span>{" "}
            <span className="text-yurika-pink">SIMPLE</span>
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="font-mono text-base sm:text-lg text-yurika-text-primary leading-relaxed">
              Not just financial support{" "}
              <span className="text-yurika-text-muted">(though if you're capable of it, please give us all your money)</span>. 
              We need <span className="text-yurika-electric font-bold">commitment</span>. 
              A real, no-bullshit commitment to push Web3 past its current state as gambling 
              thinly veiled as speculative asset trading and yield farming.
            </p>
            
            <p className="font-mono text-base sm:text-lg text-yurika-text-primary leading-relaxed">
              To usher in a new generation of creators, designers, artists, freaks, and geeks 
              who will diversify the Web3 experience and finally—<span className="text-yurika-pink font-bold">FINALLY</span>—put 
              us on the path to mass adoption.
            </p>
          </div>
        </div>
        </section>
    )
}