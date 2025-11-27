import React from "react";

interface AnimatedBackgroundProps {
    children: React.ReactNode;
}

export default function AnimatedBackground({ children }: AnimatedBackgroundProps) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-secondary">
          
          {/* Circuit pattern - now the animation class works! */}
          <div 
            className="absolute inset-0 opacity-8 animate-circuit-pattern"
            style={{
              backgroundImage: `
                linear-gradient(90deg, #00ff9f 1px, transparent 1px),
                linear-gradient(180deg, #00ff9f 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
          
          {/* Power-up glow - now the animation class works! */}
          <div 
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-30 blur-3xl animate-power-up-glow"
            style={{
              background: 'radial-gradient(circle, #00ff9f 0%, #ff006e 50%, transparent 60%)'
            }}
          />
        </div>
        
        <div className="relative z-10 py-12 px-4 h-full">
          {children}
        </div>
      </div>
    );
  }