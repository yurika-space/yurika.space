"use client";

import { Section } from "@/components/atoms/Section";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState, type FormEvent } from "react";
import Button from "../atoms/Button";
import ComponentHeader from "../atoms/ComponentHeader";
import Icons from "../atoms/Icons";
import Modals from "./Modals";

const letterAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

// Animated Counter
const Counter = ({ end, suffix = "" }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const duration = 2000;
    const step = end / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [end]);
  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export default function Hero() {
  const [userType, setUserType] = useState<"founder" | "investor">("founder");
  const [activeModal, setActiveModal] = useState<
    "waitlist" | "call" | "donate" | null
  >(null);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
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
        sectionId="hero"
        background="gradient-purple"
        className="min-h-screen w-screen flex items-center justify-center align-center overflow-hidden relative bg-background text-foreground"
        style={{
          backgroundImage:
            "linear-gradient(180deg, var(--background), var(--card))",
        }}
      >
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle, color-mix(in oklch, var(--accent) 90%, transparent 10%) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-[rgba(0,0,0,0.35)] via-transparent to-[rgba(0,0,0,0.9)]" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center items-center justify-center">
          <ComponentHeader
            title="BETA LAUNCH Q2 2026"
            item="🔥"
            className="text-center items-center justify-center animate-pulse"
          />

          <div className="relative z-10 text-center px-4">
            {/* YURIKA brand name with animated letters */}
            <div className="grid justify-center items-center text-center grid-cols-6 grid-rows-2 gap-2 md:gap-3 mb-8 lg:grid-cols-12 lg:grid-rows-1 mx-auto max-w-[350px] lg:max-w-[1096px]">
              {"yurika.space".split("").map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterAnimation}
                  initial="hidden"
                  animate="visible"
                  className={cn(
                    "text-xl sm:text-xl md:text-xl font-bold text-center",
                    "border-4 px-3 md:px-5 py-1",
                    "border-foreground",
                    "hover:bg-accent hover:text-accent-foreground hover:border-accent",
                    "transition-colors duration-200 cursor-default font-mono"
                  )}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-foreground">RAISE CAPITAL.</span>
              <br />
              <span
                className="text-accent"
                style={{ textShadow: "0 0 20px color-mix(in oklch, var(--accent) 50%, transparent)" }}
              >
                NO GATEKEEPERS.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Tokenize your domain. Fund your dream.
              <span className="text-secondary"> No warm intros</span>,
              <span className="text-secondary-foreground"> no pedigree</span>,
              <span className="text-accent"> no BS</span>. Just you, your idea,
              and a community ready to back it.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                icon={<Icons.Rocket />}
                variant="primary"
                onClick={() => {
                  setUserType("founder");
                  setSubmitted(false);
                  setEmail("");
                  setActiveModal("waitlist");
                }}
              >
                Join the Revolution
              </Button>
              <Button
                variant="secondary"
                size="lg"
                icon={<Icons.Heart />}
                onClick={() => {
                  setUserType("investor");
                  setSubmitted(false);
                  setEmail("");
                  setActiveModal("donate");
                }}
              >
                Support the Mission
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {[
                { v: 1000, s: "+", l: "Founders Waiting" },
                { v: 300, s: "K", l: "Target First Raise" },
                { v: 15, s: "", l: "Pilot Projects" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-accent">
                    <Counter end={stat.v} suffix={stat.s} />
                  </div>
                  <div className="text-xs text-theme-muted uppercase tracking-wider">
                    {stat.l}
                  </div>
                </div>
              ))}
            </div>
            {/* Scroll indicator */}
            <div
              className="scroll-indicator flex items-center justify-center pt-15 align-center xl:hidden! md:before:text-6xl! before:text-4xl! opacity-100 before:animate-fade-in-up animate-bounce-slow ease-in-out"
              style={{ animationDelay: "1.4s" }}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
