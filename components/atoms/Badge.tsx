"use client";

import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

// ============================================
// BADGE COMPONENT
// Small, inline labels used for:
// - Displaying metrics (e.g., "378.5M REGISTRATIONS")
// - Status indicators (e.g., "BETA", "LIVE")
// - Tags and categories
// - Highlighting key information
//
// The component uses CVA (Class Variance Authority) for variant management,
// allowing easy switching between different visual styles and sizes.
// ============================================
export const badgeVariants = cva(
  // Base: inline block, monospace, uppercase
  "inline-flex items-center font-mono uppercase tracking-wider font-bold",
  {
    variants: {
      variant: {
        lime: "bg-lime-500 text-black",
        purple: "bg-purple-500 text-white",
        cyan: "bg-cyan-500 text-black",
        yellow: "bg-yellow-500 text-black",
        red: "bg-red-500 text-white",
        pink: "bg-pink-500 text-white",
        // Outlined versions
        "lime-outline": "bg-transparent border border-lime-500 text-lime-500",
        "purple-outline":
          "bg-transparent border border-purple-500 text-purple-500",
        // Gradient versions
        gradient: "bg-linear-to-r from-lime-500 to-cyan-500 text-black",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-3 py-1 text-xs",
        lg: "px-4 py-2 text-sm",
      },
    },
    defaultVariants: {
      variant: "lime",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  // Optional: adds a subtle pulse animation to draw attention
  pulse?: boolean;
  // Optional: adds entrance animation
  animated?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  className,
  variant,
  size,
  children,
  pulse = true,
  animated = true,
  ...props
}) => {
  // If animated prop is true, wrap in motion.span for entrance animation
  if (animated) {
    return (
      <motion.span {...props as HTMLMotionProps<"span">}
        className={cn(
          badgeVariants({ variant, size, className }),
          pulse && "animate-pulse"
        )}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {children}
      </motion.span>
    );
  }

  // Default: render as a simple span without motion
  return (
    <span
      className={cn(
        badgeVariants({ variant, size, className }),
        pulse && "animate-pulse"
      )}
      {...props}
    >
      {children}
    </span>
  );
};

Badge.displayName = "Badge";

export { Badge };
