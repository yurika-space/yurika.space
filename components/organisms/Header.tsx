"use client";
import { useState, useEffect } from "react";
import ComponentHeader from "../atoms/ComponentHeader";
import LinkButton from "../atoms/Link";
import Logo from "../atoms/Logo";
import ThemeToggle from "../atoms/ThemeToggle";
import BurgerMenu from "../molecules/BurgerMenu";

const navigation = [
  { name: "About", href: "/about" },
  { name: "Haccelerate", href: "/haccelerator" },
  { name: "Launch", href: "/eureka-launchpad" },
  { name: "Coming Soon", href: "/game-over" },
  { name: "Support Us", href: "/mission" },
];

export default function Header() {
  const logo = "/logo_white.png";
  const width = 164;
  const height = 96;

  /**
   * Track viewport width for responsive button sizing.
   * Using useState + useEffect to avoid hydration mismatch since
   * window is undefined during server-side rendering in Next.js.
   * Default to larger screen values to prevent layout shift on desktop.
   */
  const [viewportWidth, setViewportWidth] = useState(1440);

  useEffect(() => {
    const updateWidth = () => {
      setViewportWidth(window.innerWidth);
    };
    
    // Set initial width on mount
    updateWidth();
    
    // Update on resize
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Derive responsive values from viewport width
  const isSmallDesktop = viewportWidth < 1440;
  const isMobile = viewportWidth < 800;

  return (
    <header className="w-screen bg-background border-b border-foreground/20 fixed top-0 left-0 right-0 z-50 h-20 md:h-25 lg:h-25 px-8 lg:pt-4">
      <div className="flex md:items-start md:justify-start md:space-around items-center align-middle justify-center align-center lg:justify-self-center w-full lg:flex lg:flex-row lg:justify-between lg:items-center lg:align-middle lg:space-center lg:w-full lg:pl-12">
        <div className="flex items-center align-center justify-center align-center mb-4 space-around justify-self-center lg:space-center p-4 pl-4 md:pt-6 lg:-mt-15">
          {/* Left section: Logo + Desktop Navigation */}
          <div className="flex w-[50%] lg:w-screen justify-start items-start align-middle lg:items-center lg:align-middle lg:justify-center lg:gap-1 lg:-ml-35">
            <Logo
              src={logo}
              alt={"Logo"}
              width={width}
              height={height}
              className="box-content w-full h-auto md:w-[70%] lg:w-[15%] lg:h-[10%] justify-self-start items-start align-middle pl-20 md:pl-10 md:-mt-4! lg:pl-30 lg:pt-2 xl:px-6"
            />
            <nav className="hidden lg:flex lg:pl-5 lg:font-bold lg:items-center lg:gap-6 xl:gap-9">
              {navigation.map((item) => (
                <LinkButton
                  key={item.name}
                  href={item.href}
                  buttonName={item.name}
                  className="text-foreground block hover:text-foreground/80 transition-colors"
                  size={isSmallDesktop ? "xs" : "default"}
                  variant={isSmallDesktop ? "ghost" : "default"}
                />
              ))}
            </nav>
            <div className="hidden lg:block lg:pl-6 xl:pl-9">
              <ThemeToggle className="lg:w-[10vh] lg:h-[10vh] xl:w-[15vh]! xl:h-[15vh]!" />
            </div>
          </div>

          {/* Right section: Theme toggle + Burger menu */}
          <div className="flex w-screen justify-between space-between items-center align-middle lg:gap-4 md:-mr-[30vh] ">
            <BurgerMenu className="h-10 flex flex-col shrink-0 items-center align-center justify-center border-box md:items-end mt-1 pl-25! md:-pt-10! w-full lg:hidden">
              {/* Mobile Navigation */}
              {/* Mobile Theme Toggle */}
              <div className="flex flex-col mb-8 -mt-4 sm:-mt-6! md:-mt-20! lg:-mt-20 md:h-30 lg:h-30 align-center mx-auto w-[75%] justify-self-center justify-center items-center text-center">
                <ComponentHeader title="Menu" item="⚙️" />
                <ThemeToggle
                  className="w-full -mt-4 sm:mt-10! md:-mt-4 lg:-mt-10 h-10 rounded-none align-center justify-center items-center text-center"
                  ariaLabel="Theme Toggle"
                />
              </div>
              <div className="relative w-[80%] md:w-[90%] h-[50vh] sm:h-[40vh]! md:[30vh]! md:mt-15! bg-card/80 backdrop-blur-sm space-y-6 items-center text-center align-center justify-center border-foreground/10 p-6 border-y-6 rounded-none">
                <div className="absolute w-[105%] md:w-[102%]! md:left-[-1%]! h-full top-0 -left-[2.5%] bg-card/80 backdrop-blur-sm space-y-8 items-center text-center align-center justify-center border-foreground/10 p-4 border-x-6 rounded-none">
                  <nav className="flex flex-col w-full space-y-7 sm:space-y-8! pt-1 sm:pt-4! md:space-y-11! md:-mt-1">
                    {navigation.map((item) => (
                      <LinkButton
                        key={item.name}
                        href={item.href}
                        buttonName={item.name}
                        className="flex justify-self-center font-bold items-center align-middle text-foreground text-center hover:text-foreground/80 hover:bg-foreground/10 p-0 transition-colors w-full lg:text-[8px]!"
                        size={isMobile ? "full" : "xs"}
                      />
                    ))}
                  </nav>
                </div>
              </div>
            </BurgerMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
