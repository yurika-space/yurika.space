"use client";

import { cn } from "@/lib/utils";
import { slides } from "@/lib/pitch-deck-data";
import Link from "next/link";

interface PitchDeckNavProps {
  activeSlide: string;
  onNavigate: (id: string) => void;
}

export default function PitchDeckNav({
  activeSlide,
  onNavigate,
}: PitchDeckNavProps) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b-2 border-[var(--primary)] bg-[var(--background)] overflow-x-auto">
      <div className="flex items-center min-w-max">
        <Link
          href="/"
          className="shrink-0 px-4 py-3 font-press-start-2p text-xs bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-80 transition-opacity"
        >
          YURIKA.SPACE
        </Link>
        {slides.map((slide) => (
          <button
            key={slide.id}
            onClick={() => onNavigate(slide.id)}
            className={cn(
              "shrink-0 px-4 py-3 font-press-start-2p text-[10px] uppercase tracking-wider transition-all",
              activeSlide === slide.id
                ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--card)]"
            )}
          >
            {slide.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
