"use client";
import { useState, useEffect } from "react";
import "../component_stylesheets/game-over.css";
import ComponentHeader from "../atoms/ComponentHeader";
import { Instructions } from "../organisms/Instructions";
import ProgressBarSeparator from "../atoms/ProgressBarHR";
import InstructionsContent from "../molecules/InstructionsContent";
import CountdownTimer from "../organisms/CountdownTimer";
import PacManMarquee from "../atoms/Pacmanmarquee";

export default function GameOver() {
  const [showContinue, setShowContinue] = useState(false);
  const [isExpandable, setIsExpandable] = useState(false);

  const toggleIsExpandable = () => {
    setIsExpandable(!isExpandable);
  };

  useEffect(() => {
    // Show continue options after initial animation
    const timer = setTimeout(() => {
      setShowContinue(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="relative w-full min-h-screen bg-yurika-bg-primary py-16 px-4">
        {/* Background effects layer */}
        <div className="absolute inset-0 z-0">
          {/* Scanline effect */}
          <div className="scanlines absolute inset-0" />

          {/* Glitch background */}
          <div className="glitch-bg absolute inset-0 opacity-10" />

          {/* Vignette effect */}
          <div className="vignette absolute inset-0" />
        </div>

        <ProgressBarSeparator
          text="YOUR JOURNEY AWAITS"
          progress={100}
          position={"top"}
          className="w-full h-16 z-1 absolute top-0 left-0 mb-8"
        />

        {/* Content container */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl mx-auto w-full mb-12 mt-8">
          <ComponentHeader
            title="Platform Preview"
            item="💻"
            className="animate-fade-in-up flex flex-col items-center justify-center text-center w-3/4 mx-auto"
            style={{ animationDelay: "0.2s" }}
          />
          {/* Game Over title with glitch effect */}
          <div
            className="game-over-title animate-fade-in-up w-full h-4 justify-center items-center mb-10"
            style={{ animationDelay: "0.2s" }}
          >
          </div>
        </div>

        <PacManMarquee className="w-full" speed={10} dotCount={30} variant="default" showGhosts={false} />

        {/* Instructions Section */}
        <div
          className="w-full h-auto mx-auto flex flex-col items-center justify-center mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <Instructions
            className="w-full flex flex-col items-center justify-center space-y-8"
            title="Getting Started"
            description=""
          />
          <InstructionsContent
            actions={[
              {
                label: isExpandable ? "▼ Collapse" : "▶ Expand",
                onClick: toggleIsExpandable,
                variant: "default",
                disabled: false,
                canDoState: true,
                isInState: isExpandable,
                expectedStateLabel: "▼ Collapse",
                notExpectedStateLabel: "▶ Expand",
                expectedStateContent: (
                  <div className="text-center text-sm bg-transparent!">
                    Expected state content
                  </div>
                ),
                notExpectedStateContent: <div></div>,
              },
            ]}
            stepNumber={1}
            step={"first"}
            text="Secure Your Domain Name"
          />
          <InstructionsContent
            actions={[
              {
                label: isExpandable ? "▼ Collapse" : "▶ Expand",
                onClick: toggleIsExpandable,
                variant: "default",
                disabled: false,
                canDoState: true,
                isInState: isExpandable,
                expectedStateLabel: "▼ Collapse",
                notExpectedStateLabel: "▶ Expand",
                expectedStateContent: (
                  <div className="text-center text-sm bg-transparent!">
                    Expected state content
                  </div>
                ),
                notExpectedStateContent: <div></div>,
              },
            ]}
            stepNumber={2}
            step={"second"}
            text="Create Your Campaign"
          />
          <InstructionsContent
            actions={[
              {
                label: isExpandable ? "▼ Collapse" : "▶ Expand",
                onClick: toggleIsExpandable,
                variant: "default",
                disabled: false,
                canDoState: true,
                isInState: isExpandable,
                expectedStateLabel: "▼ Collapse",
                notExpectedStateLabel: "▶ Expand",
                expectedStateContent: (
                  <div className="text-center text-sm bg-transparent!">
                    Expected state content
                  </div>
                ),
                notExpectedStateContent: <div></div>,
              },
            ]}
            stepNumber={3}
            step={"third"}
            text="Start Raising Funds"
          />
          <InstructionsContent
            actions={[
              {
                label: isExpandable ? "▼ Collapse" : "▶ Expand",
                onClick: toggleIsExpandable,
                variant: "default",
                disabled: false,
                canDoState: true,
                isInState: isExpandable,
                expectedStateLabel: "▼ Collapse",
                notExpectedStateLabel: "▶ Expand",
                expectedStateContent: (
                  <div className="text-center text-sm bg-transparent!">
                    Expected state content
                  </div>
                ),
                notExpectedStateContent: <div></div>,
              },
            ]}
            stepNumber={4}
            step={"current"}
            text="Complete Your Quest"
          />
        </div>

        <PacManMarquee className="w-screen my-10" speed={10} dotCount={30} variant="default" showGhosts={false} />

        {/* Coming Soon - Mock-up preview */}
        <div
          className="relative z-10 coming-soon-section animate-fade-in-up max-w-4xl mx-auto"
          style={{ animationDelay: "0.8s" }}
        >

          {/* Mock-up container - retro terminal style */}
          <div className="terminal-mockup">
            <div className="terminal-header">
              <div className="terminal-buttons">
                <span className="terminal-button red" />
                <span className="terminal-button yellow" />
                <span className="terminal-button green" />
              </div>
              <div className="terminal-title border-2 rounded-md p-2">eureka.yurika.space</div>
            </div>

            <div className="terminal-body">
              {/* Mock interface */}
              <div className="mock-project-card">
                <div className="mock-header">
                  <div className="mock-avatar">👤</div>
                  <div className="mock-info">
                    <div className="mock-name">Project: QuantumSocial</div>
                    <div className="mock-domain">quantumsocial.xyz</div>
                  </div>
                  <div className="mock-status">LIVE</div>
                </div>

                <div className="mock-progress-section">
                  <div className="mock-stats">
                    <div className="mock-stat">
                      <div className="mock-stat-value text-yurika-electric">
                        $24,500
                      </div>
                      <div className="mock-stat-label">Raised</div>
                    </div>
                    <div className="mock-stat">
                      <div className="mock-stat-value text-yurika-cyan">
                        $50,000
                      </div>
                      <div className="mock-stat-label">Goal</div>
                    </div>
                    <div className="mock-stat">
                      <div className="mock-stat-value text-yurika-pink">14</div>
                      <div className="mock-stat-label">Days Left</div>
                    </div>
                  </div>

                  <div className="mock-progress-bar">
                    <div
                      className="mock-progress-fill"
                      style={{ width: "49%" }}
                    >
                      <span className="progress-text">49%</span>
                    </div>
                  </div>
                </div>

                <div className="mock-description">
                  <p className="font-mono text-xs text-yurika-text-muted">
                    A decentralized social network built for privacy and owned
                    by its users. Join us in building the future of social
                    media.
                  </p>
                </div>

                <div className="mock-actions">
                  <button className="mock-button primary">
                    <span>BACK PROJECT</span>
                  </button>
                  <button className="mock-button secondary">
                    <span>LEARN MORE</span>
                  </button>
                </div>
              </div>

              {/* Coming soon overlay */}
              <div className="coming-soon-overlay">
                <div className="coming-soon-badge">
                  <span className="badge-shimmer" />
                  <span className="font-pixel text-xl flex flex-col space-y-4 items-center justify-center">
                  <CountdownTimer targetDate={new Date(2026, 2, 5)} />
                  <button className="pixel-button-secondary border-pink-500!">
              <span className="button-text">JOIN WAITLIST</span>
              <span className="button-decoration">→</span>
            </button>
                  </span>
                  
                </div>
              </div>
            
            </div>
            
          </div>

          
        </div>

        {/* Pixel divider */}
        <div
          className="relative z-10 pixel-divider-large mb-12 animate-fade-in-up max-w-4xl mx-auto"
          style={{ animationDelay: "0.3s" }}
        />

        {/* Main message */}
        <div
          className="relative z-10 message-container mb-12 animate-fade-in-up max-w-4xl mx-auto"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="message-box">
            <p className="font-mono text-base sm:text-lg text-yurika-text-primary leading-relaxed mb-6">
              We&apos;re dismantling the gatekeeping and nurturing collaboration
              for a more open, inclusive, and equitable digital future. 
            </p>
            
          </div>
        </div>

        {/* Continue prompt */}
        <div
          className={`relative z-10 continue-prompt mb-8 max-w-4xl mx-auto transition-opacity duration-1000 ${
            showContinue ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="prompt-text font-pixel text-xl text-yurika-pink animate-pulse-slow">
            ▼ CHOOSE YOUR PATH ▼
          </div>
        </div>

        {/* Insert coin prompt */}
        <div
          className={`relative z-10 insert-coin mt-12 max-w-4xl mx-auto transition-opacity duration-1000 delay-500 ${showContinue ? "opacity-100" : "opacity-0"}`}
        >
          <div className="coin-prompt font-pixel text-sm text-yurika-text-muted">
            <span className="blink">█</span> PRESS ANY BUTTON TO CONTINUE{" "}
            <span className="blink">█</span>
          </div>
        </div>

        {/* Easter egg: Konami code hint */}
        <div className="relative z-10 konami-hint font-mono text-xs text-yurika-text-muted opacity-30 mt-8 text-center max-w-4xl mx-auto">
          ↑ ↑ ↓ ↓ ← → ← → B A
        </div>
      </div>
    </section>
  );
}
