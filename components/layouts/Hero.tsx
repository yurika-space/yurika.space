import Link from "next/link";

export default function Hero() {
  const motivations = ["Build.","Collaborate.","Raise.",];

  return (
    <section className="flex flex-col items-center justify-center min-h-screen w-full px-4 overflow-hidden">
      <div className=" relative h-screen w-screen">
        <div className="relative h-full w-full">
          {/* Grid background - needs custom CSS */}
          <div className="grid-bg absolute inset-0 opacity-50 animate-grid-pulse" />
          {/* Glowing orbs with float animation */}
          <div
            className="absolute w-[400px] h-[400px] rounded-full bg-indigo-400 blur-[80px] opacity-40 -top-24 -left-24 animate-float"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute w-[300px] h-[300px] rounded-full bg-sidebar-accent blur-[80px] opacity-50 -bottom-12 -right-12 animate-float"
            style={{ animationDelay: "7s" }}
          />
          <div
            className="absolute w-[250px] h-[250px] rounded-full bg-green-500 blur-[80px] opacity-20 top-1/2 right-[20%] animate-float"
            style={{ animationDelay: "14s" }}
          />
        </div>
        {/* Hero content */}
        <div className="absolute z-5 inset-0 w-full text-center">
          {/* Title with glitch effect */}
          <h1
            className="font-pixel text-3xl sm:text-4xl! md:text-6xl! lg:text-8xl! pt-30 font-bold leading-tight mb-8 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <span className="glitch-text animate-glitch tracking-tight px-2">
              Welcome to the Uprising
            </span>
          </h1>
          <p
            className="max-md:hidden! block relative font-mono lg:text-3xl!  px-6 py-6 lg:py-10 mb-6 xl:px-2! xl:mb-4 leading-relaxed opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            For the{" "}
            <span className="absolute text-yurika-electric highlight">
              outcasts
            </span>
            , the{" "}
            <span className="absolute text-yurika-electric highlight">
              weirdos
            </span>
            , and the unrecognized{" "}
            <span className="absolute text-yurika-electric highlight">
              pioneers
            </span>
          </p>
          {/* Body text */}
          <p
            className="font-pixel text-xl sm:text-2xl! lg:text-3xl! xl:px-8 tracking-tighter px-4 py-1 pt-4 text-yurika-text-muted mx-auto mb-6 leading-relaxed opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.8s" }}
          >
            A digital ecosystem that brings together education, experience, and
            entrepreneurship.
          </p>

          <div
            className="hidden sm:flex! mt-8 sm:flex-col! md:flex-row! sm:justify-center! sm:items-center! flex-wrap opacity-0 animate-fade-in-up"
            style={{ animationDelay: "1s" }}
          >
            {motivations.map((motivation, index) => (
              <h2
                key={index}
                className=" sm:flex! font-sixtyfour text-xl px-2 text-yurika-text-muted lg:text-3xl font-bold mb-4 opacity-0 animate-fade-in-up leading-relaxed"
              >
                {motivation}
              </h2>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col xl:flex-row gap-4  justify-center items-center align-center sm:mt-8 md:mt-12 flex-wrap opacity-0 animate-fade-in-up w-full"
            style={{ animationDelay: "1.2s" }}
          >
            <Link
              href="/"
              className="btn-shimmer relative font-pixel text-lg px-10 py-2 lg:px-12 lg:py-6 bg-yurika-electric text-yurika-bg-primary font-semibold uppercase tracking-wider overflow-hidden scroll-hidden shadow-glow-electric hover:shadow-glow-electric-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              Start Your Project
            </Link>
            <Link
              href="#"
              className="btn-fill relative font-pixel text-lg px-10 py-2 lg:px-12 lg:py-6 bg-transparent text-yurika-text-primary font-semibold uppercase tracking-wider border-2 border-yurika-electric  transition-all duration-300 hover:text-black hover:-translate-y-0.5"
            >
              Explore Ideas
            </Link>
          </div>
          {/* Scroll indicator */}
          <div
            className="scroll-indicator absolute bottom-20 md:bottom-35! xl:hidden! md:before:text-6xl! before:text-4xl! left-1/2 -translate-x-1/2 opacity-100 before:animate-fade-in-up animate-bounce-slow ease-in-out"
            style={{ animationDelay: "1.4s" }}
          />
        </div>
      </div>
    </section>
  );
}
