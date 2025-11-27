"use client";
import Logo from "../atoms/Logo";
import LinkButton from "../atoms/Link";
import ThemeToggle from "../atoms/ThemeToggle";
import BurgerMenu from "../molecules/BurgerMenu";
import ComponentHeader from "../atoms/ComponentHeader";

const navigation = [
  { name: "About", href: "/about" },
  { name: "Haccelerate", href: "/haccelerator" },
  { name: "Launch", href: "/eureka-launchpad" },
  { name: "Coming Soon", href: "/game-over" },
  { name: "Support Us", href: "/mission" },
  { name: "Blog", href: "/blog" },
];

export default function Header() {
  const logo = "/logo_white.png";
  const width = 164;
  const height = 96;

  return (
    <header className="font-primary w-full bg-background border-b border-foreground/20 fixed top-0 left-0 right-0 z-50 h-20">
      <div className="w-full p-4 px-8 sm:px-6 md:w-screen md:flex md:justify-self-center">
        <div className="flex items-center justify-between align-center text-center w-full">
          {/* Left section: Logo + Desktop Navigation */}
          <div className="flex items-center align-middle justify-center gap-6">
            <Logo
              src={logo}
              alt={"Logo"}
              width={width}
              height={height}
              className="box-content m-0 p-0"
            />
            <nav className="hidden md:flex md:pl-10 md:font-bold items-center gap-6">
              {navigation.map((item) => (
                <LinkButton
                  key={item.name}
                  href={item.href}
                  buttonName={item.name}
                  className="text-foreground block hover:text-foreground/80 transition-colors"
                />
              ))}
            </nav>
          </div>

          {/* Right section: Theme toggle + Burger menu */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex md:w-full md:flex-row-reverse">
              <ThemeToggle />
            </div>

            <BurgerMenu className="flex flex-col items-center justify-center align-center">
              {/* Mobile Navigation */}
              {/* Mobile Theme Toggle */}
              <div className="flex flex-col mb-10 pb-8 border-b border-foreground/10 align-center mx-auto w-[75%] justify-self-center justify-center items-center text-center">
                <ComponentHeader title="Menu" item="⚙️" />
                <ThemeToggle className="w-full rounded-none" />
              </div>
              <div className="relative w-[75%] h-[50vh] bg-card/80 backdrop-blur-sm space-y-8 items-center text-center align-center justify-center border-foreground/10 p-8 border-y-6 rounded-none">
                <div className="absolute w-[105%] h-full top-0 -left-[2.5%] bg-card/80 backdrop-blur-sm space-y-8 items-center text-center align-center justify-center border-foreground/10 p-8 border-x-6 rounded-none">
                  <nav className="flex flex-col w-full space-y-8 pt-2">
                    {navigation.map((item) => (
                      <LinkButton
                        key={item.name}
                        href={item.href}
                        buttonName={item.name}
                        className="flex justify-self-center font-bold items-center align-middle text-foreground text-center hover:text-foreground/80 hover:bg-foreground/10 p-0 transition-colors w-full"
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
