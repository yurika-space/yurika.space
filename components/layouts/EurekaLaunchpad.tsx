import React from "react";
import "../component_stylesheets/eureka-launchpad.css";
import ComponentHeader from "../atoms/ComponentHeader";
import ComponentBody from "../atoms/ComponentBody";

export default function EurekaLaunchpad() {
  return (
    <section className="flex flex-col items-center justify-center w-screen min-h-screen">
      <div className="relative inset-0 min-h-screen mx-auto w-full">
        <div className="absolute h-full w-full bg-yurika-bg-secondary py-16 px-4 overflow-hidden">
          {/* Animated background effects */}
          <div className="circuit-pattern absolute inset-0 opacity-80 h-full" />
          <div className="power-up-glow absolute top-1/4 left-1/2 -translate-x-1/2 h-full" />
        </div>

        {/* Content container */}
        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
          {/* Power-up style header */}
          <div className="text-center mb-12">
            <ComponentHeader title="Special Feature Unlocked" item="⚡" className="animate-fade-in-up w-3/4 mx-auto" style={{ animationDelay: "0.2s" }} />
            <ComponentBody className="animate-fade-in-up" delay={400}>
                <p className="font-mono text-base sm:text-lg text-yurika-text-muted leading-relaxed">
                  <span className="pixel-frame text-background font-bold">
                    Domain Name-backed Crowdfunding
                  </span>{" "}
                  for those without rich parents or a wealthy network.
                </p>
            </ComponentBody>
          </div>

          {/* Feature cards */}
          <div
            className="grid w-[90%] sm:grid-cols-2 gap-4 mb-12 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="game-ui-box">
              <div className="feature-icon">🌐</div>
              <h3 className="feature-title">Domain-Backed</h3>
              <p className="feature-description">
                Your domain name is your collateral. Build equity through
                ownership.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3 className="feature-title">Community First</h3>
              <p className="feature-description">
                Raise from people who believe in your vision, not your last
                name.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💎</div>
              <h3 className="feature-title">Fair Terms</h3>
              <p className="feature-description">
                No predatory rates. No hidden fees. Just fair funding for real
                builders.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3 className="feature-title">Launch Ready</h3>
              <p className="feature-description">
                Integrated with Haccelerator. Get funding and support together.
              </p>
            </div>
          </div>

          {/* Coming Soon - Mock-up preview */}
          <div
            className="coming-soon-section animate-fade-in-up"
            style={{ animationDelay: "0.8s" }}
          >
            <div className="section-header">
              <span className="header-line" />
              <span className="header-text font-pixel text-xl text-yurika-electric">
                &gt; PLATFORM PREVIEW
              </span>
              <span className="header-line" />
            </div>

            {/* Mock-up container - retro terminal style */}
            <div className="terminal-mockup">
              <div className="terminal-header">
                <div className="terminal-buttons">
                  <span className="terminal-button red" />
                  <span className="terminal-button yellow" />
                  <span className="terminal-button green" />
                </div>
                <div className="terminal-title">eureka_launchpad.app</div>
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
                        <div className="mock-stat-value text-yurika-pink">
                          14
                        </div>
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
                    <span className="font-pixel text-2xl">COMING SOON</span>
                  </div>
                  <p className="font-mono text-sm text-yurika-text-muted mt-4">
                    Platform launching Q2 2025
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-8">
              <button className="pixel-button-secondary">
                <span className="button-text">JOIN WAITLIST</span>
                <span className="button-decoration">→</span>
              </button>
              <p className="font-mono text-xs text-yurika-text-muted mt-4">
                Be among the first to launch your project
              </p>
            </div>
          </div>

          {/* Info banner */}
          <div
            className="info-banner animate-fade-in-up"
            style={{ animationDelay: "1s" }}
          >
            <div className="info-icon">ℹ️</div>
            <p className="info-text">
              <strong>How it works:</strong> Secure your domain name, create
              your campaign, and start raising funds from the community. Your
              domain acts as proof of ownership and commitment to your project.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
