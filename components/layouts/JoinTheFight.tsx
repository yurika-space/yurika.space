"use client";
import React, { useState } from "react";
import Image from "next/image";
import DonateModal from "@/components/organisms/DonateModal";
import ContactForm from "@/components/layouts/ContactForm";
import "@/components/component_stylesheets/join-the-fight.css";

export default function JoinTheFight() {
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <section className="relative min-h-screen w-full bg-yurika-bg-primary py-16 px-4 overflow-hidden">
      {/* Animated background */}
      <div className="battle-grid absolute inset-0 opacity-20" />
      <div className="energy-particles absolute inset-0" />
      
      {/* Content container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        

        {/* Tarot Cards Grid - Three Paths */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          
          {/* Card 1: For Creators - Knight of Cups */}
          <div 
            className="tarot-card-container animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="tarot-card">
              <div className="tarot-card-image">
                <Image
                  src="/king_cups.png"
                  alt="Knight of Cups - For Creators"
                  width={300}
                  height={450}
                  className="pixelated"
                />
              </div>
              
              <div className="tarot-card-content">
                <h3 className="font-pixel text-2xl text-yurika-electric mb-4">
                  FOR CREATORS
                </h3>
                
                <div className="space-y-6">
                  <div className="path-option">
                    <p className="font-mono text-sm text-yurika-text-primary mb-3">
                      Serious about making a difference but no idea where to start?
                    </p>
                    <button className="quest-button creator">
                      <span className="button-glow" />
                      <span className="button-text">Join our Haccelerator</span>
                      <span className="button-icon">→</span>
                    </button>
                  </div>
                  
                  <div className="path-divider" />
                  
                  <div className="path-option">
                    <p className="font-mono text-sm text-yurika-text-primary mb-3">
                      Already have an idea but struggling to get it out there?
                    </p>
                    <button className="quest-button creator">
                      <span className="button-glow" />
                      <span className="button-text">Create a Project on Eureka</span>
                      <span className="button-icon">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: For Partners - Three of Cups */}
          <div 
            className="tarot-card-container animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="tarot-card">
              <div className="tarot-card-image">
                <Image
                  src="/three_cups.png"
                  alt="Three of Cups - For Partners"
                  width={300}
                  height={450}
                  className="pixelated"
                />
              </div>
              
              <div className="tarot-card-content">
                <h3 className="font-pixel text-2xl text-yurika-cyan mb-4">
                  FOR PARTNERS
                </h3>
                
                <div className="space-y-4">
                  <p className="font-mono text-sm text-yurika-text-primary leading-relaxed">
                    There's more to collaboration than just financial support. We need mentors, 
                    development support, organizational backup, or even just emotional support 
                    to keep us going.
                  </p>
                  
                  <p className="font-mono text-sm text-yurika-text-muted">
                    Get in touch with us by booking a meeting with our Director and tell us 
                    how you'd like to get involved.
                  </p>
                  
                  <button className="quest-button partner">
                    <span className="button-glow" />
                    <span className="button-text">Book a Meeting</span>
                    <span className="button-icon">📅</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: For Sponsors - Six of Pentacles */}
          <div 
            className="tarot-card-container animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="tarot-card">
              <div className="tarot-card-image">
                <Image
                  src="/six_coins.png"
                  alt="Six of Pentacles - For Sponsors"
                  width={300}
                  height={450}
                  className="pixelated"
                />
              </div>
              
              <div className="tarot-card-content">
                <h3 className="font-pixel text-2xl text-yurika-pink mb-4">
                  FOR SPONSORS
                </h3>
                
                <div className="space-y-4">
                  <p className="font-mono text-sm text-yurika-text-primary leading-relaxed">
                    It's time to put your money where your mouth is.
                  </p>
                  
                  <p className="font-mono text-sm text-yurika-text-muted">
                    We need your support to build infrastructure for independent creators. 
                    Fund tools, gamification, or projects in our catalogue.
                  </p>
                  
                  <div className="space-y-2">
                    <button 
                      className="quest-button sponsor"
                      onClick={() => setShowDonateModal(true)}
                    >
                      <span className="button-glow" />
                      <span className="button-text">Donate</span>
                      <span className="button-icon">💰</span>
                    </button>
                    
                    <button className="quest-button sponsor-alt">
                      <span className="button-text">Request Pitch Deck</span>
                      <span className="button-icon">📄</span>
                    </button>
                    
                    <button className="quest-button sponsor-alt">
                      <span className="button-text">Eureka Catalogue</span>
                      <span className="button-icon">📚</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div 
          className="contact-section animate-fade-in-up"
          style={{ animationDelay: "0.8s" }}
        >
          <div className="contact-box">
            <h3 className="font-pixel text-3xl text-yurika-electric mb-4 text-center">
              CONTACT US
            </h3>
            <p className="font-mono text-base text-yurika-text-muted text-center mb-6">
              For everything else, hit us up through our general contact form below.
            </p>
            
            <button 
              className="quest-button contact"
              onClick={() => setShowContactForm(true)}
            >
              <span className="button-glow" />
              <span className="button-text">Contact Us</span>
              <span className="button-icon">✉️</span>
            </button>
          </div>
        </div>

        {/* Final message */}
        <div 
          className="text-center mt-12 animate-fade-in-up"
          style={{ animationDelay: "1s" }}
        >
          <p className="font-pixel text-xl sm:text-2xl text-yurika-electric">
            Let's build the future we actually want to live in.
          </p>
        </div>
      </div>

      {/* Modals */}
      {showDonateModal && (
        <DonateModal onClose={() => setShowDonateModal(false)} />
      )}
      
      {showContactForm && (
        <ContactForm onClose={() => setShowContactForm(false)} />
      )}
    </section>
  );
}
