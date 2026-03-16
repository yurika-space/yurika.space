"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface PitchDeckSlideProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  background?: "dark" | "light" | "gradient" | "terminal";
}

const bgMap = {
  dark: "bg-[var(--background)] text-[var(--foreground)]",
  light: "bg-[var(--card)] text-[var(--card-foreground)]",
  gradient:
    "bg-gradient-to-b from-[var(--background)] to-[var(--card)] text-[var(--foreground)]",
  terminal: "bg-black text-[var(--primary)]",
};

export default function PitchDeckSlide({
  id,
  children,
  className,
  background = "dark",
}: PitchDeckSlideProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={cn(
        "min-h-screen w-full flex flex-col items-center justify-center px-6 py-20 md:px-12 lg:px-24 relative overflow-hidden",
        bgMap[background],
        className
      )}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.section>
  );
}
