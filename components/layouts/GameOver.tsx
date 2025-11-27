"use client";
import React, { useState, useEffect } from 'react'
import '../component_stylesheets/game-over.css'

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

        {/* Action buttons - Game style selection */}
        <div 
          className={`action-grid transition-all duration-1000 ${
            showContinue ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* For Creators */}
          <div className="action-card creator-card">
            <div className="card-glow creator-glow" />
            <div className="card-icon">🎨</div>
            <h3 className="card-title font-pixel text-2xl mb-3">
              FOR CREATORS
            </h3>
            <p className="card-description font-mono text-sm text-yurika-text-muted mb-6">
              You have ideas that could change the world. Let&apos;s build them together.
            </p>
            <a 
              href="/join-fight/creators"
              className="game-button creator-button"
            >
              <span className="button-inner">
                <span className="button-text">JOIN THE REVOLUTION</span>
                <span className="button-arrow">→</span>
              </span>
            </a>
            <div className="card-stats">
              <div className="stat">
                <span className="stat-icon">⚡</span>
                <span className="stat-text">Launch Your Vision</span>
              </div>
            </div>
          </div>

          {/* For Partners */}
          <div className="action-card partner-card">
            <div className="card-glow partner-glow" />
            <div className="card-icon">🤝</div>
            <h3 className="card-title font-pixel text-2xl mb-3">
              FOR PARTNERS
            </h3>
            <p className="card-description font-mono text-sm text-yurika-text-muted mb-6">
              Connect with rebels and innovators. Find your tribe. Build something amazing.
            </p>
            <a 
              href="/join-fight/partners"
              className="game-button partner-button"
            >
              <span className="button-inner">
                <span className="button-text">BE WEIRD TOGETHER</span>
                <span className="button-arrow">→</span>
              </span>
            </a>
            <div className="card-stats">
              <div className="stat">
                <span className="stat-icon">🌟</span>
                <span className="stat-text">Join the Community</span>
              </div>
            </div>
          </div>

          {/* For Sponsors */}
          <div className="action-card sponsor-card">
            <div className="card-glow sponsor-glow" />
            <div className="card-icon">🚀</div>
            <h3 className="card-title font-pixel text-2xl mb-3">
              FOR SPONSORS
            </h3>
            <p className="card-description font-mono text-sm text-yurika-text-muted mb-6">
              Invest in the future. Back the underdogs. Shape what comes next.
            </p>
            <a 
              href="/join-fight/sponsors"
              className="game-button sponsor-button"
            >
              <span className="button-inner">
                <span className="button-text">BUILD THE FUTURE</span>
                <span className="button-arrow">→</span>
              </span>
            </a>
            <div className="card-stats">
              <div className="stat">
                <span className="stat-icon">💎</span>
                <span className="stat-text">Support Innovation</span>
              </div>
            </div>
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
