"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const LOADING_MESSAGES = [
  "Spooling up the Yurika.Space mainframe...",
  "Decrypting retro assets...",
  "Bootstrapping synthwave shaders...",
  "Synchronizing countdown timers...",
  "Establishing link to the Outcast Network...",
];

interface LoadingScreenProps {
  isLoaded: boolean;
}

export default function LoadingScreen({ isLoaded }: LoadingScreenProps) {
  const [charIndex, setCharIndex] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(LOADING_MESSAGES[0]);


  useEffect(() => {
    const timer = setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * LOADING_MESSAGES.length);
      setCurrentMessage(LOADING_MESSAGES[randomIndex]);
    }, 0);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (isLoaded) {
      return;
    }

    const isLineComplete = charIndex >= currentMessage.length;
    const delay = isLineComplete ? 1000 : 50;

    const timeoutId = window.setTimeout(() => {
      if (isLineComplete) {
        const randomIndex = Math.floor(Math.random() * LOADING_MESSAGES.length);
        setCurrentMessage(LOADING_MESSAGES[randomIndex]);
        setCharIndex(0);
      } else {
        setCharIndex((prev) => prev + 1);
      }
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [charIndex, currentMessage.length, isLoaded]);

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center gap-6 bg-background text-foreground transition-opacity duration-500 ${
        isLoaded ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden={isLoaded}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-xl font-sixtyfour uppercase tracking-[0.3em] text-muted-foreground">
          Loading Interface
        </p>
        <p className="text-2xl font-semibold font-press-start-2p">
          {currentMessage.slice(0, charIndex)}
          <span className="animate-pulse"></span>
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
