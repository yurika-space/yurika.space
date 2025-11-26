import React from "react";

interface HeroProps {
  title: string;
  description: string;
  image: string;
}

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center h-screen w-full">
      <div className=" relative h-full w-screen overflow-hidden">
        <div className="relative h-full w-screen flex items-center justify-center">
          {/* Grid background - needs custom CSS */}
          <div className="grid-bg absolute inset-0 opacity-50 animate-grid-pulse" />

          {/* Glowing orbs with float animation */}
          <div
            className="absolute w-[400px] h-[400px] rounded-full bg-yurika-electric blur-[80px] opacity-30 -top-24 -left-24 animate-float"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="absolute w-[300px] h-[300px] rounded-full bg-yurika-pink blur-[80px] opacity-30 -bottom-12 -right-12 animate-float"
            style={{ animationDelay: "7s" }}
          />
          <div
            className="absolute w-[250px] h-[250px] rounded-full bg-yurika-cyan blur-[80px] opacity-30 top-1/2 right-[20%] animate-float"
            style={{ animationDelay: "14s" }}
          />
        </div>
        {/* Hero content */}

        <div className="absolute z-5 inset-0 w-full text-center">
          {/* Title with glitch effect */}
          <h1
            className="eyebrow font-pixel text-3xl pt-25 sm:text-7xl lg:text-8xl font-bold leading-tight mb-6 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <span className="glitch-text animate-glitch">
              Welcome to the Uprising
            </span>
          </h1>

          {/* Subtitle with highlights */}
          <p
            className="relative font-pixel text-md px-8 lg:text-4xl font-medium mb-6 leading-relaxed opacity-0 animate-fade-in-up"
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
            className="font-pixel text-sm px-8 py-1 lg:text-xl text-yurika-text-muted max-w-2xl mx-auto mb-6 leading-relaxed opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.8s" }}
          >
            A digital ecosystem that demolishes the walls between education,
            experience, and entrepreneurship.
          </p>

          <h2
            className="font-press-start-2p text-sm px-2 text-yurika-text-muted lg:text-3xl font-bold mb-6 opacity-0 animate-fade-in-up leading-relaxed"
            style={{ animationDelay: "1s" }}
          >
            Discover. Build. Fund. Together.
          </h2>

          {/* CTA Buttons */}
          <div
            className="flex gap-4 justify-center flex-wrap opacity-0 animate-fade-in-up"
            style={{ animationDelay: "1.2s" }}
          >
            <a
              href="#"
              className="btn-shimmer relative font-pixel text-base px-10 py-2 bg-yurika-electric text-yurika-bg-primary font-semibold uppercase tracking-wider overflow-hidden scroll-hidden shadow-glow-electric hover:shadow-glow-electric-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              Start Your Project
            </a>
            <a
              href="#"
              className="btn-fill relative font-pixel text-base px-10 py-2 bg-transparent text-yurika-text-primary font-semibold uppercase tracking-wider border-2 border-yurika-electric  transition-all duration-300 hover:text-yurika-bg-primary hover:-translate-y-0.5"
            >
              Explore Ideas
            </a>
          </div>
            {/* Scroll indicator */}
        <div
          className="scroll-indicator absolute bottom-5 left-1/2 -translate-x-1/2 opacity-100 animate-fade-in-up animate-bounce-slow"
          style={{ animationDelay: "1.4s" }}
        />
      </div>
        </div>

      
    </section>
  );
}
