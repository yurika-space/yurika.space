import React, { useEffect, useState } from "react";
import Button from "../atoms/Button";
import Icons from "../atoms/Icons";
import { SpaceInvader } from "../atoms/SpaceInvader";
import Modals from "./Modals";
import { Section } from "../atoms/Section";
import TarotCard from "../molecules/TarotCard";

type ModalType = "waitlist" | "call" | "donate" | null;

export default function CTA() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState<"founder" | "investor">("founder");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    // Show continue options after initial animation
    const timer = setTimeout(() => {
      setShowContinue(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const [showDonateModal, setShowDonateModal] = useState(false);

  return (
    <>
      <Modals
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        submitted={submitted}
        setSubmitted={setSubmitted}
        email={email}
        setEmail={setEmail}
        handleSubmit={handleSubmit}
        userType={userType}
        setUserType={setUserType}
        isSubmitting={isSubmitting}
      />
      <Section
        sectionId="cta"
        background="dark"
        className="py-20 md:py-32 px-4 relative bg-background text-foreground overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(135deg, var(--background), color-mix(in oklch, var(--background) 50%, var(--accent) 50%))",
        }}
      >
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <SpaceInvader
            size="lg"
            color="var(--primary)"
            className="mx-auto mb-8"
          />
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            The Future of Funding is{" "}
            <span
              className="text-theme-primary"
              style={{
                textShadow:
                  "0 0 20px color-mix(in oklch, var(--primary) 50%, transparent)",
              }}
            >
              Permissionless
            </span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            We&apos;re building infrastructure for everyone that VCs have
            ignored. Join the waitlist. Be part of the uprising.
          </p>
          {/* Animated background */}
          <div className="battle-grid absolute inset-0 opacity-30" />
          <div className="energy-particles absolute inset-0" />

          <div
            className="relative z-10 pixel-divider-large mb-12 animate-fade-in-up max-w-4xl mx-auto"
            style={{ animationDelay: "0.3s" }}
          />
          <div
            className={`flex flex-col items-center justify-center w-full insert-coin max-w-4xl mx-auto transition-opacity duration-1000 delay-500 ${showContinue ? "opacity-100" : "opacity-0"}`}
          >
            <div className="coin-prompt font-pixel text-sm text-yurika-text-muted mt-12">
              <span className="blink">█  </span>  PRESS ANY BUTTON TO CONTINUE  {" "}
              <span className="blink"> ⏩ </span>
            </div>
          </div>
          {/* Main message */}
          <div
            className="relative z-10 message-container my-12 animate-fade-in-up max-w-4xl mx-auto"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="relative z-10 konami-hint font-sixtyfour text-xs text-yurika-text-muted opacity-30 mb-6 text-center max-w-4xl mx-auto">
                ↑ ↑ ↓ ↓ ← → ← → B A
              </div>
              <p className="font-jetbrains-mono text-base w-[90%] leading-relaxed mb-6">
                No more gatekeeping and more focus on nurturing collaboration
                for a more open, inclusive, and equitable digital future.
              </p>

              {/* Easter egg: Konami code hint */}
              <div className="relative z-10 konami-hint font-sixtyfour text-xs text-yurika-text-muted opacity-30  text-center max-w-4xl mx-auto">
                ↑ ↑ ↓ ↓ ← → ← → B A
              </div>
            </div>
          </div>
        </div>

        {/* Card 1: For Creators - King of Cups */}
        <div className="lg:grid lg:grid-cols-3 lg:align-center lg:h-[80vh] lg:grid-rows-1 lg:mx-auto lg:gap-4 lg:items-center lg:justify-center lg:max-w-7xl flex flex-col items-center justify-center align-center w-full max-w-4xl space-y-12">
        <TarotCard
          title="CREATORS"
          icon="⚔️"
          imageSrc="/king_cups.png"
          imageAlt="Knight of Cups - For Creators"
          paragraphs={[
            {
              text: "Serious about making a difference but no idea where to start?",
              className: "text-wrap",
            },
            {
              text: "Already have an idea but struggling to get it out there?",
              hidden: true,
            },
          ]}
          buttons={[
            {
              text: "Join our Waitlist",
              icon: "→",
              variant: "primary",
              onClick: () => {
                setUserType("founder");
                setSubmitted(false);
                setEmail("");
                setActiveModal("waitlist");
              },
            },
            {
              text: "Create a Project on Eureka",
              icon: "→",
              variant: "primary",
              hidden: true,
            },
          ]}
          showDivider={true}
          animationDelay="0.2s"
        />

        {/* Card 2: For Partners - Three of Cups */}
        <TarotCard
          title="PARTNERS"
          icon="🤝"
          imageSrc="/three_cups.png"
          imageAlt="Three of Cups - For Partners"
          imageClassName=""
          contentClassName=""
          paragraphs={[
            {
              text: "There's more to collaboration than just financial support.",
              className: "leading-relaxed",
            },
            {
              text: "Get in touch with us by booking a meeting with our Director and tell us how you'd like to get involved.",
              className: "text-yurika-text-muted",
              hidden: true,
            },
          ]}
          buttons={[
            {
              text: "Book a Meeting",
              icon: "📅",
              variant: "secondary",
              onClick: () => setActiveModal("call"),
            },
          ]}
          animationDelay="0.4s"
        />

        {/* Card 3: For Sponsors - Six of Pentacles */}
        <TarotCard
          title="SPONSORS"
          className="md:-translate-y-6"
          icon="💰"
          imageSrc="/six_coins.png"
          imageAlt="Six of Pentacles - For Sponsors"
          imageClassName=""
          contentClassName=""
          paragraphs={[
            {
              text: "It's time to put your money where your mouth is.",
              className: "leading-relaxed",
            },
            {
              text: "We need your support to build infrastructure for independent creators. Fund tools, gamification, or projects in our catalogue.",
              className: "text-yurika-text-muted",
              hidden: true,
            },
          ]}
          buttons={[
            {
              text: "Request Pitch Deck",
              icon: "📖",
              variant: "purple",
              onClick: () => console.log("Request pitch deck"),
            },
          ]}
          animationDelay="0.6s"
        />
        </div>
      </Section>
    </>
  );
}
