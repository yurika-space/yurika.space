"use client";
import React from "react";
import Image from "next/image";
import "@/components/component_stylesheets/mission.css";
import { NesHeart } from "@/components/atoms/NesHeart";

export default function Mission() {
  return (
    <section className="relative min-h-screen w-full bg-yurika-bg-secondary py-16 px-4 overflow-hidden">
      {/* Animated background effects */}
      <div className="pixel-static absolute inset-0 opacity-10" />
      <div className="floating-pixels absolute inset-0 opacity-20" />
      
      {/* Content container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        
        {/* Mission header with retro badge */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="mission-badge inline-block mb-6">
            <span className="badge-text font-pixel text-sm sm:text-base">
              ▲ THE MISSION ▲
            </span>
          </div>
          
          <h2 className="font-sixtyfour text-4xl sm:text-5xl md:text-6xl font-bold text-yurika-text-primary mb-8">
            <span className="text-yurika-electric">NO MORE</span>{" "}
            <span className="text-yurika-pink">GATEKEEPING</span>
          </h2>
        </div>

        {/* Main content with pixel border */}
        <div 
          className="mission-frame relative animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          {/* Pixel border using the uploaded image as reference */}
          <div className="pixel-border-frame">
            {/* Top corners */}
            <div className="corner-tl" />
            <div className="corner-tr" />
            
            {/* Bottom corners */}
            <div className="corner-bl" />
            <div className="corner-br" />
            
            {/* Sides */}
            <div className="border-top" />
            <div className="border-right" />
            <div className="border-bottom" />
            <div className="border-left" />
          </div>

          {/* Content inside frame */}
          <div className="frame-content p-8 sm:p-12 md:p-16">
            
            {/* Server hearts image */}
            <div 
              className="flex justify-center mb-8 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="server-hearts-container">
                <Image
                  src="/chests.png"
                  alt="Pixel art servers with hearts"
                  width={400}
                  height={200}
                  className="pixelated"
                  priority
                />
              </div>
            </div>

            {/* Mission text blocks */}
            <div className="space-y-6">
              <div 
                className="mission-text-block animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                <p className="font-mono text-base sm:text-lg text-yurika-text-primary leading-relaxed">
                  We&apos;re tired of watching the same damn casinos gobble up all the funding, 
                  only for everyone to pull a shocked Pikachu face when their unsustainable 
                  business models inevitably collapse.{" "}
                  <span className="text-yurika-electric font-bold">Yurika.space</span> gives 
                  purpose-built ideas a real shot at fundraising, micro-grants, and getting 
                  in front of the right people.
                </p>
              </div>

              <div 
                className="mission-text-block animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                <p className="font-mono text-base sm:text-lg text-yurika-text-primary leading-relaxed">
                  We&apos;re not promising you the next billion users. But we{" "}
                  <span className="text-yurika-cyan font-bold">ARE</span> promising more 
                  accessible blockchain tooling for future generations. We{" "}
                  <span className="text-yurika-cyan font-bold">ARE</span> promising work 
                  experience for that entry-level job requiring 5 years in a framework that 
                  dropped last week. And we{" "}
                  <span className="text-yurika-cyan font-bold">ARE</span> promising real-world 
                  entrepreneurship training to anyone brave enough to try, because that courage 
                  alone already sets them apart from the pack.
                </p>
              </div>

              <div 
                className="mission-quote animate-fade-in-up"
                style={{ animationDelay: "1s" }}
              >
                <div className="quote-decoration">&gt;&gt;&gt;</div>
                <p className="font-pixel text-xl sm:text-2xl text-yurika-electric text-center py-6">
                  We don&apos;t believe in failure.
                  <br />
                  Just lessons for improvement.
                </p>
                <div className="quote-decoration bottom">&lt;&lt;&lt;</div>
              </div>
            </div>

            {/* Pixel divider */}
            <div 
              className="pixel-divider-glow my-8 animate-fade-in-up"
              style={{ animationDelay: "1.2s" }}
            />

            {/* Call to action */}
            <div 
              className="text-center mt-8 animate-fade-in-up"
              style={{ animationDelay: "1.4s" }}
            >
              <button className="mission-cta-button">
                <span className="button-bg" />
                <span className="button-content">
                  <span className="button-text font-pixel">JOIN THE UPRISING</span>
                  <span className="button-icon">→</span>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom decoration */}
        <div 
          className="flex justify-center mt-12 animate-fade-in-up"
          style={{ animationDelay: "1.6s" }}
        >
          <div className="pixel-hearts-row space-x-4">
            <span className="pixel-heart"><NesHeart variant="full" size={2} /></span>
            <span className="pixel-heart delay-1"><NesHeart variant="full" size={2} /></span>
            <span className="pixel-heart delay-2"><NesHeart variant="full" size={2} /></span>
            <span className="pixel-heart delay-3"><NesHeart variant="half" size={2} /></span>
          </div>
        </div>
      </div>
    </section>
  );
}