"use client";

import BurgerButton from "@/components/atoms/Burger";
import { cn, SectionId, sections } from "@/lib/utils";
import { cva } from "class-variance-authority";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import * as React from "react";
import Image from "next/image";
import ThemeToggle from "../atoms/ThemeToggle";

export const navLinkVariants = cva(
  // Base: monospace, small text, smooth transition
  "font-mono text-xs uppercase tracking-wider transition-all duration-200 whitespace-nowrap px-3 py-1.5",
  {
    variants: {
      // Active state for current section
      active: {
        true: "bg-terminal-lime text-black",
        false: "text-gray-400 hover:text-terminal-lime",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

interface NavigationProps {
  // Currently active section ID (for highlighting)
  activeSection: SectionId;
  // Callback when a nav link is clicked
  onSectionChange: (section: SectionId) => void;
}

export default function Nav({
  activeSection,
  onSectionChange,
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // useScroll hook tracks the page scroll position
  // scrollYProgress is a value from 0 to 1 representing how far down the page the user has scrolled
  const { scrollY } = useScroll();

  // Transform the scroll position into visual properties
  // As the user scrolls down, these values change:
  // - backgroundColor: starts transparent, becomes more opaque
  // - backdropBlur: increases blur effect as user scrolls
  const backgroundColor = useTransform(
    scrollY,
    [0, 100], // Input range: 0px to 100px scroll
    ["rgba(10, 10, 10, 0)", "rgba(10, 10, 10, 0.95)"] // Output: transparent to nearly opaque
  );

  // Handle navigation link clicks
  // This function scrolls to the target section and updates the active state
  const handleNavClick = (sectionId: SectionId, hash: string) => {
    // Close mobile menu if open
    setMobileMenuOpen(false);

    // For the hero section (hash "#"), scroll to top
    if (hash === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // For other sections, find the element and scroll to it
      const element = document.getElementById(sectionId);
      if (element) {
        // Calculate offset for fixed header (approximately 80px)
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }

    // Update the active section state in the parent
    onSectionChange(sectionId);

    // Update the URL hash without causing a jump
    // This enables direct linking to sections
    window.history.pushState(null, "", hash);
  };

  return (
    <>
      {/*
        STICKY HEADER
        Uses motion.header for animated background based on scroll position
        The header stays fixed at the top of the viewport
      */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 border-b border-terminal-lime/30"
        style={{
          // Apply the scroll-linked background color animation
          backgroundColor,
          // Backdrop blur for frosted glass effect
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/*
              BRAND LOGO
              Clicking the logo scrolls to the hero section
              The text has a lime glow effect for brand recognition
            */}
            <motion.button
              onClick={() => handleNavClick("hero", "#")}
              className="font-mono text-terminal-lime font-bold tracking-wider text-lg text-glow-lime"
              // Subtle scale animation on hover
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="/logo_white.png"
                alt="Yurika Space"
                width={150}
                height={150}
              />
            </motion.button>

            {/*
              DESKTOP NAVIGATION
              Horizontal list of section links, hidden on mobile
              Each link has hover effects and active state styling
            */}
            <nav className="hidden md:flex items-center gap-1">
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() => handleNavClick(section.id, section.hash)}
                  // Apply CVA navLinkVariants based on whether this section is active
                  className={cn(
                    navLinkVariants({ active: activeSection === section.id })
                  )}
                  // Framer Motion hover animation
                  whileHover={{
                    y: -2,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section.label}
                </motion.button>
              ))}
            </nav>

            {/*
              MOBILE MENU BUTTON
              Hamburger icon that toggles the mobile navigation drawer
              Only visible on mobile (md:hidden)
            */}
            <BurgerButton
              handleClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              isOpen={mobileMenuOpen}
              ariaExpanded={mobileMenuOpen}
              ariaLabel={mobileMenuOpen ? "Close menu" : "Open menu"}
              variant="ghost"
              size="icon"
              className="md:hidden flex flex-col justify-center items-center text-terminal-lime"
            />
          </div>
        </div>
      </motion.header>

      {/*
        MOBILE NAVIGATION DRAWER
        A full-screen overlay menu for mobile devices
        Uses AnimatePresence for smooth enter/exit animations
      */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            // Initial state: invisible and slightly shifted right
            initial={{ opacity: 0, x: "100%" }}
            // Animate to: visible and in position
            animate={{ opacity: 1, x: 0 }}
            // Exit animation: fade out and shift right
            exit={{ opacity: 0, x: "100%" }}
            // Smooth spring transition for natural feel
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            // Fixed positioning, full screen, high z-index to overlay everything
            className="fixed inset-0 z-40 bg-terminal-black/98 backdrop-blur-xl md:hidden"
          >
            {/*
              Padding top accounts for the fixed header height
              Vertical stack of navigation links
            */}
            <nav className="flex flex-col items-center justify-center h-full gap- pt-20">
              {sections.map((section, index) => (
                <motion.button
                  key={section.id}
                  onClick={() => handleNavClick(section.id, section.hash)}
                  // Staggered entrance animation for each link
                  // Each link appears slightly after the previous one
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "font-mono text-xl uppercase tracking-wider px-6 py-3",
                    // Active section gets lime color, others get gray
                    activeSection === section.id
                      ? "text-terminal-lime bg-terminal-lime/10"
                      : "text-gray-400"
                  )}
                >
                  {section.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col items-center justify-center align-center text-center border-t-4 border-terminal-lime/30 pt-6 w-[50%] mx-auto"
              >
                <ThemeToggle className="w-full mx-auto" />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
