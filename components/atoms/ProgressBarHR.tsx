// components/atoms/ProgressBarSeparator.tsx
import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarSeparatorProps {
  text?: string;
  progress?: number; // 0-100
  className?: string;
  animationDelay?: string;
  position?: "top" | "bottom"; // where to attach the separator
}

export default function ProgressBarSeparator({
  text = "YOUR JOURNEY AWAITS",
  progress = 100,
  className,
  animationDelay = "0s",
  position = "bottom",
}: ProgressBarSeparatorProps) {
  return (
    <div
      className={cn(
        "w-full animate-fade-in-up",
        position === "bottom" ? "mt-8" : "mb-8",
        className
      )}
      style={{ animationDelay }}
    >
      <div className="xp-bar">
        <div className="xp-bar-fill" style={{ width: `${progress}%` }}>
          <span className="xp-text">{text}</span>
        </div>
      </div>
    </div>
  );
}