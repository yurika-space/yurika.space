"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import * as React from "react";

export const buttonVariants = cva(
  // Base styles: monospace font, uppercase, smooth transitions
  "font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer border-2 inline-flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      // Visual style variants
      variant: {
      // Primary: themed accent color
      primary:
        "bg-[var(--accent)] text-[var(--accent-foreground)] border-[var(--accent)] hover:shadow-[0_0_30px_var(--accent)] active:scale-95",
      // Secondary: outlined button that still highlights accent
      secondary:
        "bg-transparent text-[var(--accent)] border-[var(--accent)] hover:bg-[var(--accent)] hover:shadow-[0_0_20px_var(--accent)]",
      // Terminal: dark shell style
      terminal:
        "bg-[var(--sidebar)] text-[var(--sidebar-foreground)] border-[var(--sidebar-ring)] hover:border-[var(--accent)] hover:shadow-[0_0_15px_var(--sidebar)]",
      // Purple: tonal secondary accent
      purple:
        "bg-[var(--secondary)] text-[var(--secondary-foreground)] border-[var(--secondary)] hover:bg-[var(--secondary)] hover:shadow-[0_0_25px_var(--secondary)]",
      // Ghost: minimal link
      ghost:
        "bg-transparent text-[var(--muted-foreground)] border-transparent hover:text-[var(--accent)] hover:bg-[var(--accent)]",
      // Destructive: warning/danger actions
      destructive:
        "bg-[var(--destructive)] text-white border-[var(--destructive)] hover:bg-[var(--destructive)] hover:shadow-[0_0_20px_var(--destructive)]",
      },
      // Size variants
      size: {
        sm: "px-3 py-1.5 text-xs",
        md: "px-5 py-2.5 text-sm",
        lg: "px-8 py-4 text-base",
        icon: "aspect-square",
      },
    },
    // Default values when variants aren't specified
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends
    Omit<HTMLMotionProps<"button">, "children">,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, children, isLoading, icon, ...props },
  ref
) {
  return (
    <motion.button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={isLoading}
      {...props}
    >
      {isLoading && (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
        />
      )}
      {icon && !isLoading && <span>{icon}</span>}
      {children}
    </motion.button>
  );
});

export default Button;
