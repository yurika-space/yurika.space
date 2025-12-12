"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

export interface CardProps
  extends Omit<HTMLMotionProps<"div">, "children">,
    VariantProps<typeof cardVariants> {
  children: React.ReactNode
  // Optional: adds hover animation effect
  hoverable?: boolean
}

export const cardVariants = cva(
  // Base: border, smooth transitions, overflow handling
  "border-2 transition-all duration-300 overflow-hidden",
  {
    variants: {
      variant: {
        // Terminal: classic green-on-black command line look
        terminal:
          "bg-terminal-black border-terminal-green/60 text-terminal-green shadow-[0_0_20px_rgba(0,255,0,0.1)]",
        // Window: macOS-style window with light background
        window:
          "bg-gray-100 border-gray-300 text-gray-900 shadow-lg",
        // Retro: dark with purple accents
        retro:
          "bg-gray-900 border-yurika-purple/60 text-white",
        // Glass: translucent effect with blur
        glass:
          "bg-white/5 border-white/20 text-white backdrop-blur-md",
        // Highlight: gradient background for emphasis
        highlight:
          "bg-gradient-to-br from-terminal-lime/20 to-yurika-purple/20 border-terminal-lime/40 text-white",
        // Solid: clean dark card
        solid:
          "bg-gray-800 border-gray-700 text-white",
      },
      // Padding options
      padding: {
        none: "p-0",
        sm: "p-3",
        md: "p-5",
        lg: "p-8",
      },
      // Rounded corner options
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
      },
    },
    defaultVariants: {
      variant: "terminal",
      padding: "md",
      rounded: "none",
    },
  }
)

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, rounded, children, hoverable = false, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        // Apply CVA-generated classes based on variant props
        className={cn(cardVariants({ variant, padding, rounded, className }))}
        // Initial state: slightly transparent and moved down
        initial={{ opacity: 0, y: 20 }}
        // Animate to full opacity and original position when in view
        whileInView={{ opacity: 1, y: 0 }}
        // Only trigger animation once
        viewport={{ once: true, margin: "-50px" }}
        // Smooth spring transition
        transition={{ duration: 0.5, ease: "easeOut" }}
        // Optional hover effect: slight lift and shadow
        whileHover={hoverable ? { y: -4, transition: { duration: 0.2 } } : undefined}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = "Card"

// ============================================
// CARD HEADER
// A semantic header section for cards, typically contains the title
// ============================================
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const CardHeader: React.FC<CardHeaderProps> = ({ className, children, ...props }) => {
  return (
    <div className={cn("px-5 py-4 border-b border-inherit", className)} {...props}>
      {children}
    </div>
  )
}

// ============================================
// CARD TITLE
// The main heading within a CardHeader
// ============================================
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

const CardTitle: React.FC<CardTitleProps> = ({ className, children, ...props }) => {
  return (
    <h3 className={cn("font-mono text-lg font-bold uppercase tracking-wider", className)} {...props}>
      {children}
    </h3>
  )
}

// ============================================
// CARD CONTENT
// The main body content area of the card
// ============================================
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const CardContent: React.FC<CardContentProps> = ({ className, children, ...props }) => {
  return (
    <div className={cn("p-5", className)} {...props}>
      {children}
    </div>
  )
}

// ============================================
// CARD FOOTER
// Optional footer section, often contains actions or additional info
// ============================================
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const CardFooter: React.FC<CardFooterProps> = ({ className, children, ...props }) => {
  return (
    <div className={cn("px-5 py-4 border-t border-inherit", className)} {...props}>
      {children}
    </div>
  )
}

// Export all card-related components
export { Card, CardHeader, CardTitle, CardContent, CardFooter }
