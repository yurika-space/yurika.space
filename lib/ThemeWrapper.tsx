"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;

    // Remove all theme classes
    root.classList.remove(
      "theme-default",
      "theme-sega",
      "theme-nintendo",
      "theme-gameboy",
      "theme-atari",
      "theme-arcade",
      "theme-neo-geo",
      "theme-soft-pop",
      "theme-vhs",
      "theme-pacman",
      "theme-cassette",
      "theme-rusty-byte"
    );

    // Add the current theme class with prefix
    if (theme) {
      root.classList.add(`theme-${theme}`);
    }
  }, [theme]);

  return <>{children}</>;
}

