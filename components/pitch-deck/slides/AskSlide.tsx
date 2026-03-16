"use client";

import PitchDeckSlide from "../PitchDeckSlide";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AskSlide() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <PitchDeckSlide
      id="ask"
      background="dark"
      className="bg-[var(--secondary)]! text-[var(--secondary-foreground)]!"
    >
      <div ref={ref} className="max-w-4xl w-full font-jetbrains-mono space-y-8">
        {/* Terminal prompt */}
        <motion.div
          className="text-lg md:text-xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-[var(--warning,#eab308)]">
            yurika.space(venv) $~
          </span>{" "}
          python3 run ask.py
        </motion.div>

        {/* Ask content */}
        <motion.div
          className="space-y-6 text-[var(--warning,#eab308)]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div>
            <p className="text-xl md:text-2xl font-bold">Our Ask:</p>
            <p className="text-2xl md:text-3xl font-bold">$50k Angel Round</p>
          </div>

          <p className="text-base md:text-lg leading-relaxed">
            The more people we have onboard the easier it is to get off the
            ground.
          </p>

          <div>
            <p className="text-base md:text-lg">
              I hope you&apos;ve enjoyed the presentation.
            </p>
            <p className="text-base md:text-lg">
              So long, and thanks for all the fish!
            </p>
          </div>

          <p className="text-base">exit Code 0</p>
        </motion.div>

        {/* Blinking cursor prompt */}
        <motion.div
          className="text-lg"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1 }}
        >
          <span className="text-[var(--warning,#eab308)]">
            yurika.space(venv) $~
          </span>{" "}
          <span className="inline-block w-3 h-5 bg-[var(--warning,#eab308)] animate-[blink_1s_step-end_infinite]" />
        </motion.div>

        {/* Contact info */}
        <motion.div
          className="text-right text-sm space-y-1 text-[var(--secondary-foreground)] opacity-70"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ delay: 1.2 }}
        >
          <p>Prince John</p>
          <p>eureka@yurika.space</p>
          <p>yurika.space</p>
        </motion.div>
      </div>
    </PitchDeckSlide>
  );
}
