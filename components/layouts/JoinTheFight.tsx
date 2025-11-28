"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import DonateModal from "@/components/organisms/DonateModal";
import ContactForm from "@/components/layouts/ContactForm";
import "@/components/component_stylesheets/join-the-fight.css";
import ComponentHeader from "../atoms/ComponentHeader";
import Typewriter from "../atoms/Typewriter";

export default function JoinTheFight() {
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    // Show continue options after initial animation
    const timer = setTimeout(() => {
      setShowContinue(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-yurika-bg-primary py-16 px-4 overflow-hidden">
      {/* Animated background */}
      <div className="battle-grid absolute inset-0 opacity-30" />
      <div className="energy-particles absolute inset-0" />
      <div
        className={`absolute w-full top-0 left-[55%] transform -translate-x-1/2 z-10 insert-coin max-w-4xl mx-auto transition-opacity duration-1000 delay-500 ${showContinue ? "opacity-100" : "opacity-0"}`}
      >
        <div className="coin-prompt font-pixel text-sm text-yurika-text-muted">
          <span className="blink">█</span> PRESS ANY BUTTON TO CONTINUE{" "}
          <span className="blink">█</span>
        </div>
      </div>

      {/* Content container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Tarot Cards Grid - Three Paths */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Pixel divider */}
          <div
            className="relative z-10 pixel-divider-large mb-12 animate-fade-in-up max-w-4xl mx-auto"
            style={{ animationDelay: "0.3s" }}
          />

          {/* Main message */}
          <div
            className="relative z-10 message-container my-12 animate-fade-in-up max-w-4xl mx-auto"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="flex flex-col items-center justify-center">
              <p className="font-jetbrains-mono text-base w-[90%] leading-relaxed mb-6">
                No more gatekeeping and more focus on nurturing collaboration
                for a more open, inclusive, and equitable digital future.
              </p>

              {/* Easter egg: Konami code hint */}
              <div className="relative z-10 konami-hint font-sixtyfour text-xs text-yurika-text-muted opacity-30 mt-8 text-center max-w-4xl mx-auto">
                ↑ ↑ ↓ ↓ ← → ← → B A
              </div>
            </div>
          </div>

          {/* Continue prompt */}
          <div
            className={`relative z-10 continue-prompt mb-8 max-w-4xl mx-auto transition-opacity duration-1000 ${
              showContinue ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="prompt-text font-pixel text-xl text-yurika-pink animate-pulse-slow">
              ▼ CHOOSE YOUR PATH ▼
            </div>
          </div>

          {/* Insert coin prompt */}

          {/* Card 1: For Creators - Knight of Cups */}
          <div
            className="tarot-card-container animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="tarot-card">
              <div className="tarot-card-image flex flex-col items-center justify-center">
                <ComponentHeader
                  title="CREATORS"
                  item=" ⚔️ "
                  className="text-foreground pt-10"
                />
                <Image
                  src="/king_cups.png"
                  alt="Knight of Cups - For Creators"
                  width={600}
                  height={900}
                  className="-mt-15 pr-5 w-full h-full object-cover"
                />
              </div>

              <div className="tarot-card-content">
                <div className="space-y-6">
                  <div className="path-option">
                    <p className="font-mono text-sm text-yurika-text-primary mb-3">
                      Serious about making a difference but no idea where to
                      start?
                    </p>
                    <button className="quest-button creator">
                      <span className="button-glow" />
                      <span className="button-text">Join our Waitlist</span>
                      <span className="button-icon">→</span>
                    </button>
                  </div>

                  <div className="hidden path-divider" />

                  <div className="hidden path-option">
                    <p className="font-mono text-sm text-yurika-text-primary mb-3">
                      Already have an idea but struggling to get it out there?
                    </p>
                    <button className="quest-button creator">
                      <span className="button-glow" />
                      <span className="button-text">
                        Create a Project on Eureka
                      </span>
                      <span className="button-icon">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: For Partners - Three of Cups */}
          <div
            className="tarot-card-container animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="tarot-card">
              <div className="tarot-card-image">
                <ComponentHeader
                  title="PARTNERS"
                  item=" 🤝 "
                  className="text-foreground pt-10"
                />
                <Image
                  src="/three_cups.png"
                  alt="Three of Cups - For Partners"
                  width={600}
                  height={900}
                  className="-mt-15 pr-6 w-full object-cover"
                />
              </div>

              <div className="tarot-card-content">
                <div className="path-option space-y-4">
                  <p className="font-mono text-sm text-yurika-text-primary leading-relaxed">
                    There's more to collaboration than just financial support.
                    {/* We need mentors, 
                    development support, organizational backup, or even just emotional support 
                    to keep us going. */}
                  </p>

                  <p className="hidden font-mono text-sm text-yurika-text-muted">
                    Get in touch with us by booking a meeting with our Director
                    and tell us how you'd like to get involved.
                  </p>

                  <button className="quest-button partner">
                    <span className="button-glow" />
                    <span className="button-text text-foreground">
                      Book a Meeting
                    </span>
                    <span className="button-icon">📅</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: For Sponsors - Six of Pentacles */}
          <div
            className="tarot-card-container animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="tarot-card">
              <div className="tarot-card-image">
                <ComponentHeader
                  title="SPONSORS"
                  item=" 💰 "
                  className="text-foreground pt-10"
                />
                <Image
                  src="/six_coins.png"
                  alt="Six of Pentacles - For Sponsors"
                  width={600}
                  height={900}
                  className="-mt-30 w-full h-full object-cover"
                />
              </div>

              <div className="tarot-card-content">
                <div className="path-option space-y-4">
                  <p className="font-mono text-sm text-yurika-text-primary leading-relaxed">
                    It's time to put your money where your mouth is.
                  </p>

                  <p className="hidden font-mono text-sm text-yurika-text-muted">
                    We need your support to build infrastructure for independent
                    creators. Fund tools, gamification, or projects in our
                    catalogue.
                  </p>

                  <div className="space-y-2">
                    <button
                      className="quest-button sponsor"
                      onClick={() => setShowDonateModal(true)}
                    >
                      <span className="button-glow" />
                      <span className="button-text">Donate</span>
                      <span className="button-icon"> 💵 </span>
                    </button>

                    <button className="quest-button sponsor-alt">
                      <span className="button-text">Request Pitch Deck</span>
                      <span className="button-icon"> 📖 </span>
                    </button>

                    {/* <button className="hiddenquest-button sponsor-alt">
                      <span className="button-text">Eureka Catalogue</span>
                      <span className="button-icon">📚</span>
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final message */}
        <div
          className="text-center mt-12 animate-fade-in-up"
          style={{ animationDelay: "1s" }}
        >
          <Typewriter
            text="Let's build the future we actually want"
            speed={100}
            delay={1000}
          />
        </div>
      </div>

      {/* Modals */}
      {showDonateModal && (
        <DonateModal onClose={() => setShowDonateModal(false)} />
      )}

      {showContactForm && (
        <ContactForm onClose={() => setShowContactForm(false)} />
      )}
    </section>
  );
}
