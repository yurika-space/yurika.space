"use client";
import React, { useState, useEffect } from 'react'
import '../component_stylesheets/game-over.css'
import ComponentHeader from '../atoms/ComponentHeader'

export default function GameOver() {
  const [showContinue, setShowContinue] = useState(false)

  useEffect(() => {
    // Show continue options after initial animation
    const timer = setTimeout(() => {
      setShowContinue(true)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-screen bg-yurika-bg-primary py-16 px-4 overflow-hidden flex items-center justify-center">
      {/* Scanline effect */}
      <div className="scanlines absolute inset-0" />
      
      {/* Glitch background */}
      <div className="glitch-bg absolute inset-0 opacity-10" />
      
      {/* Vignette effect */}
      <div className="vignette absolute inset-0" />
      
      {/* Content container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        
        {/* Game Over title with glitch effect */}
        <div className="game-over-title-container mb-8 animate-fade-in-up">
          {/* Progress bar decoration */}
        <div
          className="mt-8 animate-fade-in-up"
          style={{ animationDelay: "1.4s" }}
        >
          <div className="xp-bar">
            <div className="xp-bar-fill" style={{ width: "100%" }}>
              <span className="xp-text">YOUR JOURNEY AWAITS</span>
            </div>
          </div>
        </div>
          <div className="game-over-subtitle font-mono text-xl sm:text-2xl text-yurika-electric mt-4">
           This is just the beginning...
          </div>
        </div>

        {/* Coming Soon - Mock-up preview */}
          <div
            className="coming-soon-section animate-fade-in-up"
            style={{ animationDelay: "0.8s" }}
          >
            <ComponentHeader
              title="Platform Preview"
              item="🚀"
              className="animate-fade-in-up w-3/4 mx-auto"
              style={{ animationDelay: "0.2s" }}
            />

            {/* Info banner */}
            <div
              className="info-banner animate-fade-in-up"
              style={{ animationDelay: "1s" }}
            >
              <div className="info-icon">ℹ️</div>
              <p className="info-text">
                <strong>How it works:</strong> Secure your domain name, create
                your campaign, and start raising funds from the community. Your
                domain acts as proof of ownership and commitment to your
                project.
              </p>
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

        {/* Pixel divider */}
        <div 
          className="pixel-divider-large mb-12 animate-fade-in-up"
          style={{ animationDelay: '0.3s' }}
        />

        {/* Main message */}
        <div 
          className="message-container mb-12 animate-fade-in-up"
          style={{ animationDelay: '0.6s' }}
        >
          <div className="message-box">
            <p className="font-mono text-base sm:text-lg text-yurika-text-primary leading-relaxed mb-6">
              We&apos;re dismantling the gatekeeping and nurturing collaboration for a more open, 
              inclusive, and equitable digital future. Take a module. Join a team. Support a project. 
              Complete a quest to help an up-and-coming visionary.
            </p>
            <p className="font-mono text-base sm:text-lg text-yurika-text-primary leading-relaxed">
              Stick around, unleash your voice, and connect with other like-minded rebels. 
              You might just find your own <span className="text-yurika-electric font-bold">&quot;Yurika!&quot;</span> moment.
            </p>
          </div>
        </div>

        {/* Continue prompt */}
        <div 
          className={`continue-prompt mb-8 transition-opacity duration-1000 ${
            showContinue ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="prompt-text font-pixel text-xl text-yurika-pink animate-pulse-slow">
            ▼ CHOOSE YOUR PATH ▼
          </div>
        </div>



        {/* Insert coin prompt */}
        <div 
          className={`insert-coin mt-12 transition-opacity duration-1000 delay-500 ${
            showContinue ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="coin-prompt font-pixel text-sm text-yurika-text-muted">
            <span className="blink">▐</span> PRESS ANY BUTTON TO CONTINUE <span className="blink">▌</span>
          </div>
        </div>

        {/* Easter egg: Konami code hint */}
        <div className="konami-hint font-mono text-xs text-yurika-text-muted opacity-30 mt-8">
          ↑ ↑ ↓ ↓ ← → ← → B A
        </div>
      </div>
    </section>
  )
}
