import Link from "next/link";
import React from "react";



export default function Hero() {
    const motivations = [
        "Discover.",
        "Build.",
        "Fund.",
        "Together.",
    ];

  return (
    <section className="flex flex-col items-center justify-center h-screen w-full px-4 overflow-hidden">
      <div className=" relative h-screen w-screen">
        <div className="relative h-full w-full">
          {/* Grid background - needs custom CSS */}
          <div className="grid-bg absolute inset-0 opacity-50 animate-grid-pulse" />
          {/* Glowing orbs with float animation */}
          <div
            className="absolute w-[400px] h-[400px] rounded-full bg-brown-300 blur-[80px] opacity-40 -top-24 -left-24 animate-float"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="absolute w-[300px] h-[300px] rounded-full bg-sidebar-accent blur-[80px] opacity-5 -bottom-12 -right-12 animate-float"
            style={{ animationDelay: "7s" }}
          />
          <div
            className="absolute w-[250px] h-[250px] rounded-full bg-green-500 blur-[80px] opacity-20 top-1/2 right-[20%] animate-float"
            style={{ animationDelay: "14s" }}
          />
        </div>
        {/* Hero content */}
        <div className="absolute z-5 inset-0 w-full text-center">
          {/* Title with glitch effect */}
          <h1
            className="eyebrow font-pixel text-4xl pt-30 lg:text-8xl font-bold leading-tight mb-8 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <span className="glitch-text animate-glitch tracking-tight px-2">
              Welcome to the Uprising
            </span>
          </h1>

          {/* Subtitle with highlights */}
          <p
            className="relative font-pixel text-2xl tracking-wide px-8 lg:text-4xl font-medium mb-6 leading-relaxed opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            For the{" "}
            <span className="absolute text-yurika-electric highlight">
              outcasts
            </span>
            , the{" "}
            <span className="absolute text-yurika-electric highlight">
              weirdos
            </span>
            , and the unrecognized{" "}
            <span className="absolute text-yurika-electric highlight">
              pioneers
            </span>
            .
          </p>

          {/* Body text */}
          <p
            className="font-pixel text-lg tracking-tighter px-4 py-1 lg:text-xl text-yurika-text-muted max-w-2xl mx-auto mb-6 leading-relaxed opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.8s" }}
          >
            A digital ecosystem that demolishes the walls between education,
            experience, and entrepreneurship.
          </p>

          <div className="flex flex-col justify-center flex-wrap opacity-0 animate-fade-in-up" style={{ animationDelay: "1s" }}>
            {motivations.map((motivation, index) => (
              <h2 key={index} className="font-sixtyfour text- px-2 text-yurika-text-muted lg:text-3xl font-bold mb-4 opacity-0 animate-fade-in-up leading-relaxed">
                {motivation}
              </h2>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            className="flex gap-4 justify-center flex-wrap opacity-0 animate-fade-in-up"
            style={{ animationDelay: "1.2s" }}
          >
            <a
              href="#"
              className="hidden btn-shimmer relative font-pixel text-base px-10 py-2 bg-yurika-electric text-yurika-bg-primary font-semibold uppercase tracking-wider overflow-hidden scroll-hidden shadow-glow-electric hover:shadow-glow-electric-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              Start Your Project
            </a>
            <a
              href="#"
              className="hidden btn-fill relative font-pixel text-base px-10 py-2 bg-transparent text-yurika-text-primary font-semibold uppercase tracking-wider border-2 border-yurika-electric  transition-all duration-300 hover:text-yurika-bg-primary hover:-translate-y-0.5"
            >
              Explore Ideas
            </a>
          </div>
          {/* Scroll indicator */}
          <div
            className="scroll-indicator absolute bottom-10 before:text-6xl! left-1/2 -translate-x-1/2 opacity-100 before:animate-fade-in-up animate-bounce-slow ease-in-out"
            style={{ animationDelay: "1.4s" }}
          />
        </div>
      </div>
    </section>
  );
}
