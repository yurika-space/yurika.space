import type { SectionId } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useInView, type HTMLMotionProps } from "framer-motion";
import * as React from "react";

export const sectionVariants = cva(
  // Base: full width, padding
  "w-full py-20 md:py-32 px-4 md:px-8",
  {
    variants: {
      background: {
        dark: "bg-gray-900",
        darker: "bg-terminal-black",
        light: "bg-gray-100",
        gradient: "bg-linear-to-br from-gray-900 via-purple-900/20 to-gray-900",
        "gradient-purple":
          "bg-linear-to-br from-yurika-purple-dark via-gray-900 to-gray-900",
        terminal: "bg-terminal-black",
      },
    },
    defaultVariants: {
      background: "dark",
    },
  }
);

interface SectionProps
  extends
    Omit<HTMLMotionProps<"section">, "ref">,
    VariantProps<typeof sectionVariants> {
  // Unique ID for scroll navigation
  // This matches the navigation section IDs
  sectionId: SectionId;
  // Section content
  children: React.ReactNode;
  // Optional: disable entrance animation
  noAnimation?: boolean;
}

export function Section({
  sectionId,
  children,
  background,
  className,
  noAnimation,
  ...props
}: SectionProps) {
  const ref = React.useRef<HTMLElement>(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  return (
    <motion.section
      ref={ref}
      id={sectionId}
      className={cn(sectionVariants({ background }), className)}
      variants={noAnimation ? undefined : containerVariants}
      initial={noAnimation ? undefined : "hidden"}
      animate={noAnimation ? undefined : isInView ? "visible" : "hidden"}
      {...props}
    >
      {children}
    </motion.section>
  );
}

// ============================================
// SECTION HEADER COMPONENT
// A consistent header pattern for sections
// Includes animated title and optional subtitle
// ============================================

interface SectionHeaderProps {
  // Main section title
  title: string;
  // Optional subtitle displayed below the title
  subtitle?: string;
  // Title alignment
  align?: "left" | "center" | "right";
  // Additional CSS classes
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  align,
  className = "",
}: SectionHeaderProps) {
  return (
    <motion.div
      className={cn(
        "mb-12 md:mb-16",
        align === "center"
          ? "text-center"
          : align === "left"
            ? "text-left"
            : "text-right",
        className
      )}
    >
      <h2 className="text-3xl md:text-5xl font-bold text-theme-secondary mb-4 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-theme-secondary max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

// ============================================
// SECTION GRID COMPONENT
// A responsive grid layout for section content
// Handles common column configurations
// ============================================

interface SectionGridProps {
  // Grid content
  children: React.ReactNode;
  // Number of columns (responsive)
  columns?: 1 | 2 | 3 | 4;
  // Gap between grid items
  gap?: "sm" | "md" | "lg";
  // Additional CSS classes
  className?: string;
}
const SectionGrid: React.FC<SectionGridProps> = ({
  children,
  columns = 2,
  gap = "md",
  className = "",
}) => {
  // Column configuration classes
  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  // Gap size classes
  const gapClasses = {
    sm: "gap-4",
    md: "gap-6 md:gap-8",
    lg: "gap-8 md:gap-12",
  };

  return (
    <div
      className={cn("grid", columnClasses[columns], gapClasses[gap], className)}
    >
      {children}
    </div>
  );
};

export { SectionGrid };
