import ComponentHeader from "../atoms/ComponentHeader";
import { Section } from "../atoms/Section";
import Typewriter from "../atoms/Typewriter";
import TerminalWindow from "../molecules/TerminalWindow";
import "../stylesheets/haccelerator.css";

export default function TheProblem() {
  const stats = [
    { label: "Women-led teams funded", value: "< 2.3%", color: "text-[var(--accent)]" },
    { label: "Black founders funded", value: "< 0.4%", color: "text-[var(--secondary)]" },
    { label: "LGBTQ+ founders funded", value: "< 0.5%", color: "text-[var(--warning)]" },
  ];
  return (
    <Section
      sectionId="problem"
      background={null}
      className="min-h-screen min-w-screen flex items-center justify-center align-center overflow-hidden relative bg-theme-card py-8! md:py-12!"
    >
      <div className="grid-bg-subtle absolute w-screen min-h-[110vh] opacity-30" />
      <div className="pixel-particles absolute inset-0 z-0" />
      <div className="absolute inset-0 bg-linear-to-b from-[rgba(0,0,0,0.5)] via-transparent to-[rgba(0,0,0,0.7)]"/>
      <div className="max-w-6xl mx-auto z-10 relative w-full">
      <div className="text-center">
      <ComponentHeader
              title="THE PROBLEM"
              item="🔥"
              className="animate-fade-in-up w-3/4 mx-auto"
              style={{ animationDelay: "0.2s" }}
            />
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-theme-secondary">VC Funding is <span className="text-[var(--destructive)]">Broken</span></h2>
            <p className="text-theme-muted max-w-2xl mx-auto text-lg mb-12">The traditional funding game is rigged. Less than 3% of funded startups are led by women, black founders, or LGBTQ+ founders.</p>
          </div>
        <div className="flex flex-col font-press-start-2p md:grid md:grid-cols-3 gap-4 mb-12">
          {stats.map((item, i) => (
            <div
              key={i}
              className="bg-transparent backdrop-blur-xl border border-[var(--primary)] p-4 max-w-80 md:w-auto mx-auto text-center"
            >
              <div
                className={`text-2xl md:text-3xl font-bold ${item.color} mb-2`}
              >
                {item.value}
              </div>
              <div className="text-theme-muted text-sm uppercase tracking-wider">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <TerminalWindow title="system_log.txt" className="mx-auto w-3/4">
          <div className="space-y-2 " >
            <p className="ease-in-out duration-300">
              <span className="text-[var(--destructive)]">[ERROR]</span>{" "}
              <span className="text-theme-muted">
                Need warm intro to access VCs... ACCESS_DENIED
              </span>
            </p>
            <p className="ease-in-out duration-300">
              <span className="text-[var(--destructive)]">[ERROR]</span>{" "}
              <span className="text-theme-muted">
                Checking pedigree... Stanford? YC? NO_MATCH
              </span>
            </p>
            <p className="ease-in-out duration-300">
              <span className="text-[var(--destructive)]">[ERROR]</span>{" "}
              <span className="text-theme-muted">
                Investment amount $25K... TOO_SMALL_FOR_FUND
              </span>
            </p>
            <p className="ease-in-out duration-300">
              <span className="text-[var(--destructive)]">[FATAL]</span>{" "}
              <span className="text-theme-muted">
                Traditional funding system... FUNDAMENTALLY_BROKEN
              </span>
            </p>
            <p className="ease-in-out duration-300 mt-4 pt-4 border-t border-theme-border">
              <span className="text-[var(--primary)] animate-pulse">[YURIKA]</span>{" "}
              <Typewriter text="Initializing alternative funding protocol" className="text-theme-secondary" speed={100} delay={10000} spanItem="█ "/>
            </p>
          </div>
        </TerminalWindow>
      </div>
    </Section>
  );
}
