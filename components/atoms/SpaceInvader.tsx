"use client";

import { cn } from "@/lib/utils";
import { motion, type Transition } from "framer-motion";
import * as React from "react";

// ============================================
// SPACE INVADER COMPONENT
// A pixel-art SVG component that renders the classic Space Invaders alien.
// This iconic 8-bit design is used throughout the Yurika.space pitch deck
// as a decorative element that reinforces the retro-tech aesthetic.
//
// The component is highly customizable:
// - Multiple size options
// - Various color variants
// - Optional floating animation
// - Responsive scaling
//
// The SVG is hand-crafted to match the original 8-bit sprite,
// using rectangular pixels to maintain the authentic pixelated look.
// ============================================

export interface SpaceInvaderProps {
  // Additional CSS classes for positioning and custom styling
  className?: string;
  // Color of the invader - can be any valid CSS color
  color?: string;
  // Predefined size variants
  size?: "sm" | "md" | "lg" | "xl";
  // If true, adds a gentle floating animation
  animated?: boolean;
  // Animation delay in seconds - useful for staggering multiple invaders
  animationDelay?: number;

  style?: React.CSSProperties;
}

const SpaceInvader: React.FC<SpaceInvaderProps> = ({
  className = "",
  color = "currentColor",
  size = "md",
  animated = false,
  animationDelay = 0,
  style, // Destructure style
}) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  const floatTransition: Transition = {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
    delay: animationDelay,
  };

  const floatAnimationProps = animated
    ? {
        animate: {
          y: [0, -8, 0],
        },
        transition: floatTransition,
      }
    : undefined;

  const Wrapper = animated ? motion.svg : "svg";

  return (
    <Wrapper
      viewBox="0 0 11 8"
      className={cn(sizeClasses[size], className)}
      fill={color}
      style={style} // Apply style here
      {...floatAnimationProps}
    >
      {/* Row 0 - Antenna tips */}
      <rect x="2" y="0" width="1" height="1" />
      <rect x="8" y="0" width="1" height="1" />

      {/* Row 1 - Antenna bases */}
      <rect x="3" y="1" width="1" height="1" />
      <rect x="7" y="1" width="1" height="1" />

      {/* Row 2 - Top of head */}
      <rect x="2" y="2" width="7" height="1" />

      {/* Row 3 - Upper body with eyes */}
      <rect x="1" y="3" width="2" height="1" />
      <rect x="4" y="3" width="3" height="1" />
      <rect x="8" y="3" width="2" height="1" />

      {/* Row 4 - Full body width */}
      <rect x="0" y="4" width="11" height="1" />

      {/* Row 5 - Body with gaps */}
      <rect x="0" y="5" width="1" height="1" />
      <rect x="2" y="5" width="7" height="1" />
      <rect x="10" y="5" width="1" height="1" />

      {/* Row 6 - Arms extended */}
      <rect x="0" y="6" width="1" height="1" />
      <rect x="2" y="6" width="1" height="1" />
      <rect x="8" y="6" width="1" height="1" />
      <rect x="10" y="6" width="1" height="1" />

      {/* Row 7 - Legs at bottom */}
      <rect x="3" y="7" width="2" height="1" />
      <rect x="6" y="7" width="2" height="1" />
    </Wrapper>
  );
};

// ============================================
// INVADER FIELD COMPONENT
// Renders multiple Space Invaders in a pattern
// Used for background decorations
// ============================================

interface InvaderFieldProps {
  // Number of invaders to render
  count?: number;
  // Additional CSS classes for the container
  className?: string;
  // Color for all invaders
  color?: string;
  // Opacity for subtle background effect
  opacity?: number;
}

const INVADER_SIZES: Array<SpaceInvaderProps["size"]> = [
  "sm",
  "md",
  "md",
  "lg",
];

const pseudoRandom = (seed: number) => {
  const value = Math.sin(seed) * 43758.5453123;
  return value - Math.floor(value);
};

export function InvaderField({
  count = 12,
  className = "",
  color = "currentColor",
  opacity = 0.1,
}: InvaderFieldProps) {
  const invaders = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const leftJitter = pseudoRandom(i * 0.43);
      const topJitter = pseudoRandom(i * 1.17);

      return {
        id: i,
        left: `${(i % 4) * 25 + leftJitter * 10}%`,
        top: `${Math.floor(i / 4) * 30 + topJitter * 15}%`,
        delay: i * 0.3,
        size: INVADER_SIZES[i % INVADER_SIZES.length],
      };
    });
  }, [count]);

  return (
    <div
      className={cn(
        "absolute inset-0 w-full h-full overflow-hidden pointer-events-none",
        className
      )}
    >
      {invaders.map((invader) => (
        <div
          key={invader.id}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            left: invader.left,
            top: invader.top,
            opacity,
          }}
        >
          <SpaceInvader
            color={color}
            size={invader.size}
            animated={true}
            animationDelay={invader.delay}
          />
        </div>
      ))}
    </div>
  );
}

export { SpaceInvader };
