"use client";

import { useEffect, useMemo, useState } from "react";

const LOADING_MESSAGES = [
  "Spooling up the Yurika.Space mainframe...",
  "Decrypting retro assets...",
  "Bootstrapping synthwave shaders...",
  "Synchronizing countdown timers...",
  "Establishing link to the Outcast Network..."
];

interface LoadingScreenProps {
  isLoaded: boolean;
}

export default function LoadingScreen({ isLoaded }: LoadingScreenProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const currentMessage = useMemo(
    () => LOADING_MESSAGES[lineIndex] ?? "",
    [lineIndex]
  );

  useEffect(() => {
    if (isLoaded) {
      return;
    }

    const isLineComplete = charIndex >= currentMessage.length;
    const delay = isLineComplete ? 1100 : 55;

    const timeoutId = window.setTimeout(() => {
      if (isLineComplete) {
        setCharIndex(Math.floor(Math.random() * currentMessage.length));
        setLineIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
      } else {
        setCharIndex((prev) => prev + 1);
      }
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [charIndex, currentMessage.length, isLoaded]);

  return (
    <div
      className={`fixed inset-0 z-9999 flex flex-col items-center justify-center gap-6 bg-background text-foreground transition-opacity duration-500 ${
        isLoaded ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden={isLoaded}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
          Loading Interface
        </p>
        <p className="text-2xl font-semibold font-mono">
          {currentMessage.slice(0, charIndex)}
          <span className="animate-pulse">▌</span>
        </p>
      </div>

      <div className="w-64 h-2 bg-foreground/10 rounded-full overflow-hidden">
        <div className="h-full bg-foreground animate-[progress_2.4s_ease-in-out_infinite]" />
      </div>

      <style jsx>{`
        @keyframes progress {
          0% {
            width: 0%;
          }
          50% {
            width: 80%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}


