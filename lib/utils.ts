import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Utility function to merge Tailwind classes with clsx
// This helps avoid className conflicts when using CVA variants
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
] as const

export type SectionId = (typeof sections)[number]["id"]
