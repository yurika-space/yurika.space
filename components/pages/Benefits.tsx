import React, { useState } from "react";
import Button from "../atoms/Button";
import ComponentHeader from "../atoms/ComponentHeader";
import Icons from "../atoms/Icons";
import { Section } from "../atoms/Section";
import TerminalWindow from "../molecules/TerminalWindow";
import Modals from "./Modals";

export default function Benefits() {
  const [userType, setUserType] = useState<"founder" | "investor">("founder");
  const [activeModal, setActiveModal] = useState<
    "waitlist" | "call" | "donate" | null
  >(null);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

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
        sectionId="business-model"
        className="min-h-screen w-screen flex flex-col items-center justify-center align-center overflow-hidden relative bg-theme-primary-foreground"
      >
        <div className="absolute h-screen w-screen inset-0">
          {/* Grid background - needs custom CSS */}
          <div className="grid-bg absolute inset-0 opacity-50 animate-grid-pulse h-full w-full" />
          {/* Glowing orbs with float animation */}
          <div
            className="absolute w-[400px] h-[400px] rounded-full bg-theme-secondary blur-[80px] opacity-40 -top-24 -left-24 animate-float"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute w-[300px] h-[300px] rounded-full bg-theme-accent blur-[80px] opacity-50 -bottom-12 -right-12 animate-float"
            style={{ animationDelay: "7s" }}
          />
          <div
            className="absolute w-[300px] h-[300px] rounded-full bg-[var(--primary)] blur-[80px] opacity-50 top-[45%] left-[40%] animate-float"
            style={{ animationDelay: "7s" }}
          />
          <div
            className="absolute w-[250px] h-[250px] rounded-full bg-[var(--chart-4)]  blur-[80px] opacity-20 top-[55%] right-[20%] animate-float"
            style={{ animationDelay: "14s" }}
          />
        </div>
        {/* FOR FOUNDERS */}
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <ComponentHeader
                title="FOR FOUNDERS"
                item="🔥"
                className="animate-fade-in-up w-3/4 mx-auto"
                style={{ animationDelay: "0.2s" }}
              />
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Your Idea. <span className="text-theme-secondary">Your Terms.</span>
              </h2>
              <p className="text-theme-muted text-lg mb-8">
                Stop pitching. Start building. Raise from people who actually
                get what you&apos;re creating.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Raise $5K-$50K without giving up your soul",
                  "Keep control—community advises, you decide",
                  "Automatic revenue sharing via smart contracts",
                  "Exit options: keep building, get acquired, or sell",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-theme-primary">
                      <Icons.Check />
                    </span>
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>

              <Button
                variant="purple"
                size="lg"
                onClick={() => {
                  setUserType("founder");
                  setSubmitted(false);
                  setEmail("");
                  setActiveModal("waitlist");
                }}
              >
                Join as Founder
              </Button>
            </div>

            <TerminalWindow title="founder_journey.sh">
              <div className="space-y-2">
                <p className="text-theme-warning">$ yurika init my-startup</p>
                <p className="text-theme-muted">
                  → Domain registered: mystartup.io
                </p>
                <p className="text-theme-muted">
                  → Tokens minted: 10,000 $MYSTARTUP
                </p>
                <p className="text-theme-muted">
                  → Campaign created: $25,000 goal
                </p>
                <p className="text-theme-warning mt-4">$ yurika status --week 2</p>
                <p className="text-theme-primary">
                  ✓ Raised: $18,450 from 127 backers
                </p>
                <p className="text-theme-primary">✓ Community: 340 members</p>
              </div>
            </TerminalWindow>
          </div>
        </div>

        {/* FOR INVESTORS */}
        <div className="max-w-6xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center z-10">
            <TerminalWindow title="investor_dashboard.exe">
              <div className="space-y-2">
                <div className="flex justify-between border-b border-theme-border pb-2">
                  <span className="text-theme-muted">Portfolio</span>
                  <span className="text-theme-primary">12 Projects</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-theme-muted">Total Invested</span>
                  <span>$2,340</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-theme-muted">Revenue Earned</span>
                  <span className="text-theme-primary">$847.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-theme-muted">Token Value</span>
                  <span className="text-theme-primary">+34%</span>
                </div>
              </div>
            </TerminalWindow>

            <div>
              <ComponentHeader
                title="FOR INVESTORS"
                item="🔥"
                className="animate-fade-in-up w-3/4 mx-auto"
                style={{ animationDelay: "0.2s" }}
              />
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Back Founders.{" "}
                <span className="text-theme-accent">Earn Returns.</span>
              </h2>
              <p className="text-theme-muted text-lg mb-8">
                No accreditation needed. Invest as little as $50. Get real
                ownership—not just a t-shirt.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Invest $50 to $5,000 per project",
                  "Real ownership tokens, not rewards",
                  "Automatic revenue distribution",
                  "Trade on secondary market anytime",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-theme-accent">
                      <Icons.Check />
                    </span>
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                onClick={() => {
                  setUserType("investor");
                  setSubmitted(false);
                  setEmail("");
                  setActiveModal("waitlist");
                }}
              >
                Join as Investor
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
