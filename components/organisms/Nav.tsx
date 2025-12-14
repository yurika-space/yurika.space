"use client";

import BurgerButton from "@/components/atoms/Burger";
import { cn, sections } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { AnimatePresence, motion, useScroll, useMotionValueEvent, MotionValue } from "framer-motion";
import Link from "next/link";
import {
  type MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import ThemeToggle from "../atoms/ThemeToggle";
import { useScrollNavigation } from "@/lib/utils";

export const navLinkVariants = cva(
  // Base: monospace, small text, smooth transition
  "font-press-start-2p text-[10px] uppercase tracking-wider transition-all duration-200 whitespace-nowrap px-3 py-1.5",
  {
    variants: {
      // Active state for current section
      active: {
        true: "bg-theme-primary text-theme-primary",
        false: "bg-theme-secondary text-theme-secondary",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

type SectionInfo = (typeof sections)[number];

export default function Nav() {
  const navRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  // Get section IDs from your sections array
  const sectionIds = sections.map(s => s.id);

  // Use the scroll navigation hook
  const { activeSection, setActiveSection, headerStyle } = useScrollNavigation(sectionIds);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    width: number;
  }>({
    left: 0,
    width: 0,
  });
  const [isScrolled, setIsScrolled] = useState(false);

  // Listen to scroll changes
  useMotionValueEvent(useScroll().scrollY, "change", (latest: number) => {
    setIsScrolled(latest > 50); // Change at 50px scroll
  });
  // Update indicator position when active section changes
  useEffect(() => {
    const updateIndicatorPosition = () => {
      const activeLink = linkRefs.current.get(activeSection);
      const navContainer = navRef.current?.parentElement;

      if (activeLink && navContainer) {
        const navRect = navContainer.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();

        setIndicatorStyle({
          left: linkRect.left - navRect.left,
          width: linkRect.width,
        });
      }
    };

    updateIndicatorPosition();
    window.addEventListener("resize", updateIndicatorPosition);

    return () => {
      window.removeEventListener("resize", updateIndicatorPosition);
    };
  }, [activeSection]);

  const handleNavClick = (
    event: ReactMouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    sectionId: SectionInfo["id"],
    hash: SectionInfo["hash"]
  ) => {
    // Prevent default behavior
    event.preventDefault();

    // Update active section immediately for instant indicator animation
    setActiveSection(sectionId);

    // Close mobile menu when navigating
    setMobileMenuOpen(false);

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

      // Update URL hash
      window.history.pushState(null, "", hash);
    }
  };

  return (
    <>
      {/*
        STICKY HEADER
        Uses motion.header for animated background based on scroll position
        The header stays fixed at the top of the viewport
      */}
      <motion.header
        className={cn("fixed top-0 left-0 right-0 z-50 border-b border-theme-primary","transparent bg-transparent ", isScrolled ? "text-theme-primary" : "text-theme-secondary")}
        style={{ backdropFilter: isScrolled ? "blur(16px)" : "blur(12px)", transition: "background-color 0.3s ease, backdrop-filter 0.3s ease" }}
      >
        <div className="max-w-[1280px] mx-auto items-center justify-between align-center relative">
          <div className="flex items-center align-center justify-between mx-auto h-20">
            {/*
              BRAND LOGO
              Clicking the logo scrolls to the hero section
            */}
            <Link
              href="/"
              className="shrink-0 flex items-center justify-center align-center px-4"
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                src={"/logo_white.png"}
                alt="Yurika Space"
                width={150}
                height={18.5}
                className="shrink-0 m-0 p-0"
              />
            </Link>

            {/*
              DESKTOP NAVIGATION
              Horizontal list of section links, hidden on mobile
            */}
            <nav className="hidden lg:flex items-center font-press-start-2p relative">
              <ul
                ref={navRef}
                className="flex items-center gap-1 list-none m-0 p-0"
              >
                {sections.map((section, index) => (
                  <li key={index} className="m-0 p-0">
                    <motion.a
                      href={`#${section.id}`}
                      data-section={section.id}
                      ref={(el) => {
                        if (el) {
                          linkRefs.current.set(section.id, el);
                        } else {
                          linkRefs.current.delete(section.id);
                        }
                      }}
                      aria-label={section.label}
                      aria-current={
                        activeSection === section.id ? "page" : undefined
                      }
                      onClick={(e) =>
                        handleNavClick(e, section.id, section.hash)
                      }
                      className={cn(
                        "block py-4 px-2 transition-colors",
                        navLinkVariants({
                          active: activeSection === section.id,
                        })
                      )}
                      whileHover={{
                        y: -2,
                        transition: { duration: 0.1 },
                        backgroundColor:
                          section.id !== activeSection
                            ? "var(--glow-secondary)"
                            : "var(--primary)",
                        color:
                          section.id !== activeSection
                            ? "var(--secondary-foreground)"
                            : "var(--primary-foreground)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {section.label}
                    </motion.a>
                  </li>
                ))}
              </ul>

              {/* Animated underline indicator */}
              <motion.div
                className="absolute bottom-0 h-0.5 bg-theme-secondary"
                animate={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                }}
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </nav>

            <ThemeToggle className="hidden lg:block" />

            {/*
              MOBILE MENU BUTTON
            */}
            <BurgerButton
              handleClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              isOpen={mobileMenuOpen}
              ariaExpanded={mobileMenuOpen}
              ariaLabel={mobileMenuOpen ? "Close menu" : "Open menu"}
              variant="ghost"
              size="icon"
              className="lg:hidden flex flex-col justify-center items-center text-theme-primary px-4"
            />
          </div>
        </div>
      </motion.header>

      {/*
        MOBILE NAVIGATION DRAWER
      */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-theme-card backdrop-blur-3xl lg:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full pt-20">
              <ul className="flex flex-col items-center gap-y-4 list-none m-0 p-0">
                {sections.map((section, index) => (
                  <li key={section.id} className="m-0 p-0">
                    <motion.a
                      href={`#${section.id}`}
                      onClick={(e) =>
                        handleNavClick(e, section.id, section.hash)
                      }
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={cn(
                        "font-press-start-2p text-xl uppercase tracking-wider px-6 py-3 cursor-pointer",
                        activeSection === section.id
                          ? "text-theme-card border-b-2 border-[var(--secondary-foreground)]"
                          : "text-[var(--accent)]"
                      )}
                    >
                      {section.label}
                    </motion.a>
                  </li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col items-center justify-center align-center text-center border-t-2 border-[var(--primary)] pt-6 w-[50%] mx-auto mt-4"
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
