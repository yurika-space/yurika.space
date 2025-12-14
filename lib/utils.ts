"use client";

import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function to merge Tailwind classes with clsx
// This helps avoid className conflicts when using CVA variants
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Navigation sections configuration
// Each section has an id for scrolling, a label for navigation, and a hash for URL
export const sections = [
  { id: "hero", label: "Home", hash: "#" },
  { id: "about", label: "About", hash: "#about" },
  { id: "problem", label: "Problem", hash: "#problem" },
  { id: "solution", label: "Solution", hash: "#solution" },
  { id: "business-model", label: "Benefits", hash: "#business-model" },
  { id: "competition", label: "Competition", hash: "#competition" },
  { id: "roadmap", label: "Roadmap", hash: "#roadmap" },
  { id: "cta", label: "Join Us", hash: "#cta" },
  { id: "ask", label: "FAQ", hash: "#ask" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
/**
 * Custom hook for scroll-based navigation
 * Tracks which section is currently in view and provides header styling based on scroll
 *
 * @param sectionIds - Array of section IDs to track (e.g., ['hero', 'about', 'services'])
 * @returns Object containing activeSection, headerStyle, and scrollY/scrollYProgress values
 */
export function useScrollNavigation(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '');
  const { scrollY, scrollYProgress } = useScroll();

  // Transform scroll progress into header visual properties
  // Think of this as a dimmer switch: as you scroll, the header background fades in
  const headerStyle = useTransform(
    scrollYProgress,
    [0, 0.25], // When scroll is between 0% and 5% of total page height
    [
      {
        backgroundColor: "rgba(10, 10, 10, 0)",
        backdropFilter: "blur(0px)",
      },
      {
        backgroundColor: `hsl(var(--primary) / 0.9)`,
        backdropFilter: "blur(16px)",
      },
    ]
  );

  // APPROACH 1: Intersection Observer (Recommended - More Performant)
  // This watches when sections enter the viewport, like security cameras at each section
  useEffect(() => {
    // Track which sections are currently intersecting
    const intersectingEntries = new Map<string, IntersectionObserverEntry>();

    const observer = new IntersectionObserver(
      (entries) => {
        // Update our map of intersecting entries
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            intersectingEntries.set(id, entry);
          } else {
            intersectingEntries.delete(id);
          }
        });

        // Find the most prominent section (highest intersection ratio)
        let maxRatio = 0;
        let activeId = '';

        intersectingEntries.forEach((entry, id) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            activeId = id;
          }
        });

        // Update active section if we found one
        if (activeId) {
          setActiveSection(activeId);
        }
      },
      {
        // rootMargin: account for fixed header (80px from top)
        // Trigger when section enters the top 20% of viewport
        rootMargin: "-80px 0px -70% 0px",
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      }
    );

    // Observe all sections with a single observer
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Cleanup: disconnect observer when component unmounts
    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  // APPROACH 2: Scroll Position Based (Alternative - More Control)
  // Uncomment this and comment out the useEffect above if you want precise control
  /*
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Get current scroll position with header offset
    const scrollPosition = latest + 100; // 100px offset for header

    // Find all sections and their positions
    const sectionPositions = sectionIds
      .map((id) => {
        const element = document.getElementById(id);
        if (!element) return null;

        return {
          id,
          offsetTop: element.offsetTop,
          offsetBottom: element.offsetTop + element.offsetHeight,
        };
      })
      .filter((section): section is NonNullable<typeof section> => section !== null);

    // Find which section we're currently in
    const currentSection = sectionPositions.find(
      (section) =>
        scrollPosition >= section.offsetTop &&
        scrollPosition < section.offsetBottom
    );

    if (currentSection && currentSection.id !== activeSection) {
      setActiveSection(currentSection.id);
    }
  });
  */

  return {
    activeSection,
    setActiveSection,
    headerStyle,
    scrollY,
    scrollYProgress,
  };
}

/**
 * Alternative hook with manual section setting
 * Use this if you want to manually control the active section (e.g., on click)
 */
export function useScrollNavigationWithManualControl(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '');
  const [manualOverride, setManualOverride] = useState<boolean>(false);
  const { scrollY, scrollYProgress } = useScroll();

  const headerStyle = useTransform(
    scrollYProgress,
    [0, 0.05],
    [
      {
        backgroundColor: "rgba(10, 10, 10, 0)",
        backdropFilter: "blur(0px)",
      },
      {
        backgroundColor: "rgba(10, 10, 10, 0.9)",
        backdropFilter: "blur(12px)",
      },
    ]
  );

  useEffect(() => {
    // Don't update via scroll if user just clicked a nav link
    if (manualOverride) {
      const timer = setTimeout(() => setManualOverride(false), 1000);
      return () => clearTimeout(timer);
    }

    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.4 && !manualOverride) {
              setActiveSection(id);
            }
          });
        },
        {
          rootMargin: "-80px 0px -50% 0px",
          threshold: [0, 0.25, 0.5, 0.75, 1],
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sectionIds, manualOverride]);

  // Function to manually set active section (e.g., when clicking nav)
  const setActiveSectionManually = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    setManualOverride(true);
  }, []);

  return {
    activeSection,
    setActiveSection: setActiveSectionManually,
    headerStyle,
    scrollY,
    scrollYProgress,
  };
}
