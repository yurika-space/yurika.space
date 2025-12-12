"use client"

import * as React from "react"
import { motion, useInView, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"

// ============================================
// TERMINAL TEXT COMPONENT
// This component simulates the classic terminal/command-line text display
// where text appears character by character as if being typed.
//
// The effect is achieved using CSS animations and Framer Motion,
// creating an authentic "hacker terminal" aesthetic that reinforces
// Yurika.space's tech-forward branding.
//
// The component features:
// - A command prompt symbol (>) before the text
// - Staggered reveal animation for lines
// - Blinking cursor at the end of text
// - Configurable delay for sequential reveals
// ============================================

interface TerminalTextProps {
  // The text content to display
  children: string
  // Delay in milliseconds before this line appears
  // Useful for creating sequential line reveals
  delay?: number
  // Additional CSS classes
  className?: string
  // Whether to show the blinking cursor at the end
  showCursor?: boolean
  // Custom prompt symbol (default: ">")
  prompt?: string
  // If true, skips the entrance animation
  instant?: boolean
}

const TerminalText: React.FC<TerminalTextProps> = ({
  children,
  delay = 0,
  className = "",
  showCursor = false,
  prompt = ">",
  instant = false,
}) => {
  // useInView hook detects when the component enters the viewport
  // This triggers the animation only when the user can see it
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { 
    once: true, // Only trigger once
    margin: "-50px" // Trigger 50px before element enters viewport
  })

  // Animation variants for Framer Motion
  // These define the start and end states of the animation
  const containerVariants: Variants = {
    // Hidden state: invisible and shifted right
    hidden: {
      opacity: 0,
      x: -10
    },
    // Visible state: fully visible and in position
    visible: {
      opacity: 1,
      x: 0,
      // Transition configuration
      transition: {
        duration: 0.4,
        delay: delay / 1000, // Convert ms to seconds for Framer Motion
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number], // easeOut bezier curve
      },
    },
  }

  // For instant rendering (no animation)
  if (instant) {
    return (
      <div ref={ref} className={cn("font-mono text-sm", className)}>
        <span className="text-terminal-lime mr-2">{prompt}</span>
        <span className="text-gray-300">{children}</span>
        {showCursor && <span className="animate-blink ml-1">_</span>}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={cn("font-mono text-sm", className)}
      variants={containerVariants}
      initial="hidden"
      // Only animate to "visible" when component is in view
      animate={isInView ? "visible" : "hidden"}
    >
      {/* The command prompt symbol */}
      <span className="text-terminal-lime mr-2">{prompt}</span>
      {/* The actual text content */}
      <span className="text-gray-300">{children}</span>
      {/* Optional blinking cursor */}
      {showCursor && <span className="animate-blink ml-1 text-terminal-lime">_</span>}
    </motion.div>
  )
}

// ============================================
// TERMINAL BLOCK COMPONENT
// A container for multiple terminal lines with consistent styling
// and sequential reveal animation
// ============================================

interface TerminalBlockProps {
  // Array of text lines to display
  lines: string[]
  // Base delay before the first line appears
  baseDelay?: number
  // Delay between each consecutive line
  lineDelay?: number
  // Additional CSS classes
  className?: string
}

const TerminalBlock: React.FC<TerminalBlockProps> = ({
  lines,
  baseDelay = 0,
  lineDelay = 150,
  className = "",
}) => {
  return (
    <div className={cn("space-y-3", className)}>
      {lines.map((line, index) => (
        <TerminalText
          key={index}
          // Each line appears after the previous one
          delay={baseDelay + index * lineDelay}
          // Show cursor only on the last line
          showCursor={index === lines.length - 1}
        >
          {line}
        </TerminalText>
      ))}
    </div>
  )
}

// ============================================
// COMMAND LINE COMPONENT
// Displays a full command prompt with directory path
// Useful for showing file system navigation
// ============================================

interface CommandLineProps {
  // The directory path to display (e.g., "c:\Users\yurika")
  path?: string
  // The command being executed
  command: string
  // Additional CSS classes
  className?: string
}

const CommandLine: React.FC<CommandLineProps> = ({
  path = "c:\\Users\\yurika",
  command,
  className = "",
}) => {
  return (
    <div className={cn("font-mono text-sm", className)}>
      <span className="text-yellow-400">{path}{">"}</span>
      <span className="text-white ml-2">{command}</span>
    </div>
  )
}

export { TerminalText, TerminalBlock, CommandLine }
