// components/atoms/PacManMarquee.tsx
"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface PacManMarqueeProps {
  className?: string;
  speed?: number;
  dotCount?: number;
  variant?: "default" | "retro" | "neon";
  showGhosts?: boolean;
}

export default function PacManMarquee({
  className,
  speed = 8,
  dotCount = 30,
  variant = "default",
  showGhosts = false,
}: PacManMarqueeProps) {
  const variants = {
    default: {
      dot: "bg-yellow-400",
      pacman: "bg-yellow-300",
      track: "bg-primary/20",
      ghost: "bg-red-400",
    },
    retro: {
      dot: "bg-lime-400",
      pacman: "bg-lime-300",
      track: "bg-lime-900/30",
      ghost: "bg-pink-400",
    },
    neon: {
      dot: "bg-pink-400 shadow-[0_0_8px_#ec4899]",
      pacman: "bg-cyan-400 shadow-[0_0_15px_#22d3ee]",
      track: "bg-purple-900/30",
      ghost: "bg-purple-400 shadow-[0_0_10px_#c084fc]",
    },
  };

  const colors = variants[variant];

  return (
    <div className={cn("relative w-full overflow-hidden py-6 -mt-30", className)}>
      {/* Track line */}
      <div className={cn("absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2", colors.track)} />
      
      {/* Main container */}
      <div className="relative h-12">
        {/* Dots that scroll */}
        <div
          className="absolute inset-0 flex items-center gap-12"
          style={{
            animation: `scrollDots ${speed}s linear infinite`,
          }}
        >
          {Array.from({ length: dotCount * 3 }).map((_, i) => (
            <div
              key={i}
              className={cn("w-3 h-3 rounded-sm shrink-0", colors.dot)}
            />
          ))}
        </div>

        {/* Duplicate for seamless loop */}
        <div
          className="absolute inset-0 flex items-center gap-12"
          style={{
            animation: `scrollDots ${speed}s linear infinite`,
            animationDelay: `-${speed / 2}s`,
          }}
        >
          {Array.from({ length: dotCount * 3 }).map((_, i) => (
            <div
              key={`dup-${i}`}
              className={cn("w-3 h-3 rounded-sm shrink-0", colors.dot)}
            />
          ))}
        </div>

        {/* Pac-Man (stationary in viewport but appears to move) */}
        <div
          className="absolute left-[-1%] top-1/2 -translate-y-1/2"
          style={{ zIndex: 10 }}
        >
          <div
            className={cn("w-12 h-12 rounded-full relative", colors.pacman)}
            style={{
              animation: "chomp 0.4s steps(2) infinite",
            }}
          >
            {/* Eye */}
            <div className="absolute w-2 h-2 bg-black rounded-full top-2 right-3" />
          </div>
        </div>

        {/* Ghost (optional) */}
        {showGhosts && (
          <div
            className="absolute left-[70%] top-1/2 -translate-y-1/2"
            style={{ zIndex: 9 }}
          >
            <div className={cn("relative", colors.ghost)} style={{ width: "40px", height: "48px" }}>
              {/* Ghost body */}
              <div className="absolute top-0 left-0 right-0 h-8 rounded-t-full" style={{ backgroundColor: "inherit" }} />
              <div className="absolute bottom-0 left-0 right-0 h-5" style={{ backgroundColor: "inherit" }} />
              
              {/* Ghost wave bottom */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between">
                <div className="w-2 h-3 bg-inherit rounded-b-full" />
                <div className="w-2 h-3 bg-inherit rounded-b-full" />
                <div className="w-2 h-3 bg-inherit rounded-b-full" />
              </div>

              {/* Eyes */}
              <div className="absolute top-3 left-2 flex gap-1.5">
                <div className="w-2 h-3 bg-white rounded-full">
                  <div className="w-1 h-1 bg-black rounded-full ml-0.5 mt-1" />
                </div>
                <div className="w-2 h-3 bg-white rounded-full">
                  <div className="w-1 h-1 bg-black rounded-full ml-0.5 mt-1" />
                </div>
              </div>
            </div>
            
        
        </div>
      )}
      </div>

      <style jsx>{`
        @keyframes scrollDots {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }

        @keyframes chomp {
          0% {
            clip-path: polygon(100% 74%, 50% 50%, 100% 26%, 85% 15%, 70% 6%, 50% 0%, 0% 0%, 0% 100%, 50% 100%, 70% 94%, 85% 85%);
          }
          50% {
            clip-path: polygon(100% 50%, 50% 50%, 100% 50%, 90% 30%, 75% 15%, 50% 8%, 0% 8%, 0% 92%, 50% 92%, 75% 85%, 90% 70%);
          }
        }
      `}</style>
    </div>
  );
}