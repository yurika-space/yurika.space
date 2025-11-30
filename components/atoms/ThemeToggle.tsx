"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

const themes = [
  { value: "default", label: "Default" },
  { value: "sega", label: "Sega" },
  { value: "nintendo", label: "Nintendo" },
  { value: "gameboy", label: "Game Boy" },
  { value: "atari", label: "Atari" },
  { value: "arcade", label: "Arcade" },
  { value: "neo-geo", label: "Neo Geo" },
  { value: "soft-pop", label: "Soft Pop" },
  { value: "vhs", label: "VHS" },
  { value: "pacman", label: "Pac-Man" },
  { value: "cassette", label: "Cassette" },
  { value: "rusty-byte", label: "Rusty Byte" },
];

interface ThemeToggleProps {
  className?: string;
  ariaLabel?: string;
}

export default function ThemeToggle({ className, ariaLabel }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  // Ensure dark mode is always enabled
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className={`flex items-center ${className}`} aria-label={ariaLabel}>
      <div className="relative inline-block">
        <select
          value={theme || "default"}
          onChange={(e) => setTheme(e.target.value)}
          className="appearance-none lg:text-[12px] xl:text-[16px] lg:w-[8vh] xl:w-[16vh] bg-background border border-border text-foreground px-4 py-2 pr-8 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Select theme"
        >
          {themes.map((themeOption) => (
            <option key={themeOption.value} value={themeOption.value}>
              {themeOption.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 lg:px-2! lg:mr-2! xl:-mr-1! xl:px-4! text-foreground">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

