"use client";
import React, { useState } from "react";
import "../component_stylesheets/haccelerator.css";
import Typewriter from "../atoms/Typewriter";

const PROGRAM_LEVELS = [
  {
    week: 1,
    title: "Level 1: Idea Genesis",
    description: "Brainstorm and validate your concept",
  },
  {
    week: 2,
    title: "Level 2: Market Recon",
    description: "Research your audience and competition",
  },
  {
    week: 3,
    title: "Level 3: MVP Blueprint",
    description: "Design your minimum viable product",
  },
  {
    week: 4,
    title: "Level 4: Tech Stack",
    description: "Choose your weapons (technologies)",
  },
  {
    week: 5,
    title: "Level 5: Prototype Sprint",
    description: "Build your first working version",
  },
  {
    week: 6,
    title: "Level 6: User Testing",
    description: "Get feedback from real humans",
  },
  {
    week: 7,
    title: "Level 7: Iteration Loop",
    description: "Refine based on user data",
  },
  {
    week: 8,
    title: "Level 8: Business Model",
    description: "Figure out how to make money",
  },
  {
    week: 9,
    title: "Level 9: Brand Identity",
    description: "Create your visual presence",
  },
  {
    week: 10,
    title: "Level 10: Marketing Quest",
    description: "Plan your go-to-market strategy",
  },
  {
    week: 11,
    title: "Level 11: Pitch Deck",
    description: "Craft your story for investors",
  },
  {
    week: 12,
    title: "Level 12: Beta Launch",
    description: "Release to early adopters",
  },
  {
    week: 13,
    title: "Level 13: Analytics Setup",
    description: "Track what matters",
  },
  {
    week: 14,
    title: "Level 14: Community Build",
    description: "Grow your user base",
  },
  {
    week: 15,
    title: "Level 15: Scale Prep",
    description: "Optimize for growth",
  },
  {
    week: 16,
    title: "Level 16: BOSS BATTLE",
    description: "Official launch and beyond",
  },
];

export default function Haccelerator() {
  const [expandedLevel, setExpandedLevel] = useState<number | null>(null);

  return (
    <section className="relative min-h-screen w-full bg-yurika-bg-primary py-16 px-4 overflow-hidden">
      {/* Animated grid background - stays in background */}
      <div className="grid-bg-subtle absolute inset-0 opacity-30" />
      
      {/* Floating particles - stays in background */}
      <div className="pixel-particles" />
      
      {/* Content container - naturally flows */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-block mb-4">
            <div className="pixel-badge">
              <span className="text-yurika-electric">★</span>
              {" HACCELERATOR PROGRAM "}
              <span className="text-yurika-electric">★</span>
            </div>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-yurika-text-primary mb-6 glitch-text-subtle">
            <Typewriter
              text="16 WEEKS TO LAUNCH"
              speed={100}
              delay={5000}
              className="font-sixtyfour"
            />
          </h2>
          
          <p className="font-mono text-base sm:text-lg text-yurika-text-muted max-w-2xl mx-auto leading-relaxed px-4">
            We've created a 16-week program that takes you from idea to
            launch, including tech support and business advice—because we
            can't all afford Harvard, Wharton, or whatever fancy
            institution is gatekeeping success this week.
          </p>
        </div>

        {/* Stats display - Gaming UI style */}
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="stat-box">
            <div className="stat-label">Duration</div>
            <div className="stat-value">16 Weeks</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Support Level</div>
            <div className="stat-value">MAX</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Cost</div>
            <div className="stat-value text-yurika-electric">FREE*</div>
          </div>
        </div>

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
                        ? "The final challenge! Launch your product to the world and prepare for scale. You've completed the training—now it's time to dominate."
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

        {/* CTA Section */}
        <div 
          className="mt-12 text-center animate-fade-in-up"
          style={{ animationDelay: "1.2s" }}
        >
          <div className="game-ui-box">
            <p className="font-mono text-sm text-yurika-text-muted mb-4">
              * Free for accepted applicants. Equity-free. No strings
              attached. Just pure support for the weird and wonderful.
            </p>
            <button className="pixel-button-primary">
              <span className="button-text">APPLY NOW</span>
              <span className="button-decoration">→</span>
            </button>
          </div>
        </div>

        {/* Progress bar decoration */}
        <div 
          className="mt-8 animate-fade-in-up"
          style={{ animationDelay: "1.4s" }}
        >
          <div className="xp-bar">
            <div className="xp-bar-fill" style={{ width: "100%" }}>
              <span className="xp-text">YOUR JOURNEY AWAITS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}