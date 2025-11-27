"use client";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { type VariantProps, cva } from "class-variance-authority";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import "../../app/retro-globals.css";

export const progressVariants = cva("", {
  variants: {
    variant: {
      default: "",
      retro: "retro",
    },
    font: {
      normal: "",
      retro: "retro",
    },
  },
  defaultVariants: {
    font: "retro",
  },
});

export interface BitProgressProps
  extends React.ComponentProps<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  className?: string;
  font?: VariantProps<typeof progressVariants>["font"];
  progressBg?: string;
  animateOnView?: boolean;
  animationDuration?: number;
}

function Progress({
  className,
  font,
  variant,
  value,
  progressBg,
  animateOnView = false,
  animationDuration = 3000,
  ...props
}: BitProgressProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animatedValue, setAnimatedValue] = useState(animateOnView ? 0 : value);

  useEffect(() => {
    if (!animateOnView) return;

    let animationFrameId: number;
    let isAnimating = false;

    const startAnimation = () => {
      if (isAnimating) return;
      isAnimating = true;
      
      const targetValue = value || 0;
      
      const animateLoop = () => {
        const startTime = performance.now();
        
        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / animationDuration, 1);
          
          // Easing function (ease-out)
          const eased = 1 - Math.pow(1 - progress, 3);
          const currentValue = Math.round(eased * targetValue);
          
          setAnimatedValue(currentValue);
          
          if (progress < 1) {
            animationFrameId = requestAnimationFrame(animate);
          } else {
            // Reset and loop
            setTimeout(() => {
              setAnimatedValue(0);
              setTimeout(() => {
                animateLoop();
              }, 200);
            }, 3000);
          }
        };
        
        animationFrameId = requestAnimationFrame(animate);
      };
      
      animateLoop();
    };

    const stopAnimation = () => {
      isAnimating = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };

    let delayTimeoutId: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            delayTimeoutId = setTimeout(() => {
              startAnimation();
            }, 1000);
          } else {
            clearTimeout(delayTimeoutId);
            stopAnimation();
            setAnimatedValue(0);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      clearTimeout(delayTimeoutId);
      stopAnimation();
    };
  }, [animateOnView, value, animationDuration]);

  // Use animated value if animateOnView is enabled, otherwise use prop value
  const displayValue = animateOnView ? animatedValue : value;

  // Extract height from className if present
  const heightMatch = className?.match(/h-(\d+|\[.*?\])/);
  const heightClass = heightMatch ? heightMatch[0] : "h-2";

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <ProgressPrimitive.Root
        data-slot="progress"
        className={cn(
          "bg-primary/20 relative w-full overflow-hidden",
          heightClass,
          font !== "normal" && "retro"
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={cn(
            "h-full transition-all",
            variant === "retro" ? "flex" : "w-full flex-1",
            progressBg && variant !== "retro" ? progressBg : "bg-primary"
          )}
          style={
            variant === "retro"
              ? undefined
              : { transform: `translateX(-${100 - (displayValue || 0)}%)` }
          }
        >
          {variant === "retro" && (
            <div className="flex w-full">
              {Array.from({ length: 20 }).map((_, i) => {
                const filledSquares = Math.round(((displayValue || 0) / 100) * 20);
                return (
                  <div
                    key={i}
                    className={cn(
                      "size-full mx-px",
                      i < filledSquares ? progressBg : "bg-transparent"
                    )}
                  />
                );
              })}
            </div>
          )}
        </ProgressPrimitive.Indicator>
      </ProgressPrimitive.Root>

      <div
        className="absolute inset-0 border-y-4 -my-1 border-foreground dark:border-ring pointer-events-none"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 border-x-4 -mx-1 border-foreground dark:border-ring pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}

export { Progress };
