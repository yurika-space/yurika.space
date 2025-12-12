"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// ============================================
// RETRO WINDOW COMPONENT
// This component recreates the iconic macOS window aesthetic commonly seen in
// retro computing and pixel art designs. It features:
// - Traffic light buttons (close, minimize, maximize)
// - A title bar with customizable text
// - Various color themes to match different content types
//
// This is a signature visual element of the Yurika.space brand,
// appearing throughout the pitch deck to frame content in a tech-nostalgic way.
// ============================================

// Available visual themes for the window
type WindowVariant = "dark" | "light" | "terminal" | "purple"

interface RetroWindowProps {
  // The title displayed in the window's title bar
  title: string
  // Content to render inside the window body
  children: React.ReactNode
  // Visual theme variant - determines colors
  variant?: WindowVariant
  // Additional CSS classes for custom styling
  className?: string
  // If true, adds Framer Motion entrance animation
  animated?: boolean
  // If true, the traffic light buttons will appear functional (hover effects)
  interactive?: boolean
}

const RetroWindow: React.FC<RetroWindowProps> = ({
  title,
  children,
  variant = "dark",
  className = "",
  animated = true,
  interactive = false,
}) => {
  // Theme configuration for each variant
  // This object maps variant names to their specific color schemes
  const variants: Record<WindowVariant, {
    container: string    // Main window border and background
    titleBar: string     // Title bar background
    titleText: string    // Title text color
    body: string         // Body content area
  }> = {
    // Dark theme: classic green-on-black terminal look
    dark: {
      container: "border-[color-mix(in_oklch,_var(--secondary)_60%,_transparent)] bg-background",
      titleBar: "bg-gradient-to-r from-[var(--card)] to-[var(--sidebar)] border-[color-mix(in_oklch,_var(--secondary)_60%,_transparent)]",
      titleText: "text-muted-foreground",
      body: "bg-background text-theme-primary",
    },
    // Light theme: clean macOS window style
    light: {
      container: "border-theme-border bg-background",
      titleBar: "bg-gradient-to-r from-[var(--card)] to-[var(--sidebar)] border-theme-border",
      titleText: "text-theme-muted",
      body: "bg-background text-foreground",
    },
    // Terminal theme: bright green terminal aesthetic
    terminal: {
      container: "border-[color-mix(in_oklch,_var(--primary)_60%,_transparent)] bg-background",
      titleBar: "bg-gradient-to-r from-[var(--card)] to-[var(--sidebar)] border-[color-mix(in_oklch,_var(--primary)_60%,_transparent)]",
      titleText: "text-theme-primary",
      body: "bg-background text-theme-primary",
    },
    // Purple theme: used for special emphasis sections
    purple: {
      container: "border-theme-secondary bg-[color-mix(in_oklch,_var(--secondary)_30%,_var(--background))]",
      titleBar: "bg-gradient-to-r from-[color-mix(in_oklch,_var(--secondary)_40%,_var(--background))] to-[color-mix(in_oklch,_var(--secondary)_30%,_var(--background))] border-theme-secondary",
      titleText: "text-[color-mix(in_oklch,_var(--secondary)_80%,_white)]",
      body: "bg-[color-mix(in_oklch,_var(--secondary)_20%,_var(--background))] text-foreground",
    },
  }

  // Get the current theme configuration based on the variant prop
  const theme = variants[variant]

  // Animation configuration for the window
  // This creates a subtle fade-in and slide-up effect when the window enters the viewport
  const containerAnimation = animated
    ? {
        initial: { opacity: 0, y: 30, scale: 0.98 },
        whileInView: { opacity: 1, y: 0, scale: 1 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      }
    : {}

  // The Wrapper component conditionally uses motion.div or regular div
  // based on whether animation is enabled
  const Wrapper = animated ? motion.div : "div"

  return (
    <Wrapper
      {...(animated ? {
        ...containerAnimation,
        transition: {
          ...containerAnimation.transition,
          ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
        }
      } : undefined)}
      className={cn(
        // Base styles: border width, overflow handling
        "border-2 overflow-hidden",
        // Apply theme-specific container styles
        theme.container,
        // Custom shadow for depth
        "shadow-lg",
        // User-provided className for additional customization
        className
      )}
    >
      {/*
        TITLE BAR
        The top section of the window containing traffic light buttons and title
      */}
      <div
        className={cn(
          // Layout: flex row, items centered vertically, gap between children
          "flex items-center gap-3 px-4 py-3",
          // Bottom border to separate from content
          "border-b-2",
          // Apply theme-specific title bar styles
          theme.titleBar
        )}
      >
        {/*
          TRAFFIC LIGHT BUTTONS
          The classic red, yellow, green dots from macOS windows
          These are purely decorative unless interactive is true
        */}
        <div className="flex items-center gap-2">
          {/* Close button (red) */}
          <span
            className={cn(
              "w-3 h-3 rounded-full bg-red-500",
              // If interactive, add hover effect
              interactive && "hover:bg-red-400 cursor-pointer transition-colors"
            )}
          />
          {/* Minimize button (yellow) */}
          <span
            className={cn(
              "w-3 h-3 rounded-full bg-yellow-500",
              interactive && "hover:bg-yellow-400 cursor-pointer transition-colors"
            )}
          />
          {/* Maximize button (green) */}
          <span
            className={cn(
              "w-3 h-3 rounded-full bg-green-500",
              interactive && "hover:bg-green-400 cursor-pointer transition-colors"
            )}
          />
        </div>

        {/* Window title text */}
        <span
          className={cn(
            "font-mono text-xs uppercase tracking-wider",
            theme.titleText
          )}
        >
          {title}
        </span>
      </div>

      {/*
        WINDOW BODY
        The main content area of the window
      */}
      <div className={cn("p-5 font-mono text-sm", theme.body)}>
        {children}
      </div>
    </Wrapper>
  )
}

export { RetroWindow }
