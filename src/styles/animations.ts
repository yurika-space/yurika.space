import type { Variants } from "framer-motion"

// ── Scroll-reveal for section entrances ──────────────────────────
export const scrollReveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: "easeOut" },
}

// ── Stagger container for lists of items ─────────────────────────
export const staggerContainer: { variants: Variants } = {
  variants: {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  },
}

export const staggerItem: { variants: Variants } = {
  variants: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  },
}

// ── Fade-in upward (hero elements) ───────────────────────────────
export const fadeInUp = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

// ── Typewriter text reveal ────────────────────────────────────────
export const typewriterContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
}

export const typewriterChar: Variants = {
  hidden: { opacity: 0, y: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.01 },
  },
}

// ── Glitch flash (on mount / hover) ──────────────────────────────
export const glitchFlash = {
  initial: { x: 0, skewX: 0 },
  animate: {
    x: [0, -2, 2, -1, 0],
    skewX: [0, -1, 1, 0, 0],
    transition: {
      duration: 0.3,
      times: [0, 0.25, 0.5, 0.75, 1],
    },
  },
}

// ── Terminal window entrance ──────────────────────────────────────
export const terminalReveal = {
  initial: { opacity: 0, scaleY: 0, originY: 0 },
  animate: { opacity: 1, scaleY: 1 },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
}

// ── Slide from left (nav items) ───────────────────────────────────
export const slideFromLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.4 },
}

// ── Scale-in (modal / overlay) ───────────────────────────────────
export const scaleIn = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.96 },
  transition: { duration: 0.2 },
}
