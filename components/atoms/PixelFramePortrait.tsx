import React from 'react';
import './pixel-border-portrait.css';

interface PixelFramePortraitProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'muted' | 'card' | 'destructive' | 'chart-1' | 'chart-2';
  glow?: boolean;
  animate?: 'entrance' | 'pulse' | 'none';
  hover?: 'glow' | 'lift' | 'none';
  size?: 'compact' | 'normal' | 'tall' | 'extra-tall';
  className?: string;
}

/**
 * PixelFramePortrait - Portrait-oriented pixel border frame
 * 
 * Automatically uses theme colors from retro-globals.css
 * Perfect for vertical content like cards, profiles, or sidebars
 */
export function PixelFramePortrait({ 
  children, 
  variant = 'default',
  glow = false,
  animate = 'none',
  hover = 'none',
  size = 'normal',
  className = ''
}: PixelFramePortraitProps) {
  const variantClass = variant !== 'default' ? `frame-${variant}` : '';
  const glowClass = glow ? 'frame-glow' : '';
  const animateClass = animate !== 'none' ? `frame-animate-${animate}` : '';
  const hoverClass = hover !== 'none' ? `frame-hover-${hover}` : '';
  const sizeClass = size !== 'normal' ? `frame-${size}` : '';
  
  const combinedClasses = [
    'pixel-frame-portrait',
    variantClass,
    glowClass,
    animateClass,
    hoverClass,
    sizeClass,
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div className={combinedClasses}>
      <div className="pixel-border-portrait">
        <div className="corner-tl-portrait" />
        <div className="corner-tr-portrait" />
        <div className="corner-bl-portrait" />
        <div className="corner-br-portrait" />
        <div className="border-top-portrait" />
        <div className="border-right-portrait" />
        <div className="border-bottom-portrait" />
        <div className="border-left-portrait" />
      </div>
      <div className="pixel-frame-content-portrait">
        {children}
      </div>
    </div>
  );
}

/**
 * Example: Basic Usage
 */
export function BasicPortraitExample() {
  return (
    <PixelFramePortrait>
      <h3 className="text-xl font-bold mb-4">Player Profile</h3>
      <div className="space-y-3">
        <div>
          <span className="text-sm opacity-70">Level:</span>
          <span className="ml-2 font-bold">42</span>
        </div>
        <div>
          <span className="text-sm opacity-70">XP:</span>
          <span className="ml-2 font-bold">15,280</span>
        </div>
        <div>
          <span className="text-sm opacity-70">Rank:</span>
          <span className="ml-2 font-bold">Elite</span>
        </div>
      </div>
    </PixelFramePortrait>
  );
}

/**
 * Example: With Primary Theme Colors
 */
export function PrimaryPortraitExample() {
  return (
    <PixelFramePortrait variant="primary" glow={true}>
      <div className="text-center">
        <div className="text-4xl mb-4">🎮</div>
        <h3 className="text-xl font-bold mb-2">Achievement!</h3>
        <p className="text-sm">You've unlocked a new badge</p>
      </div>
    </PixelFramePortrait>
  );
}

/**
 * Example: Card with Chart Colors
 */
export function ChartPortraitExample() {
  return (
    <PixelFramePortrait variant="chart-1" animate="entrance">
      <h4 className="font-bold mb-3">Stats Overview</h4>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm">Projects</span>
          <span className="font-bold">24</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Contributors</span>
          <span className="font-bold">156</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Success Rate</span>
          <span className="font-bold">94%</span>
        </div>
      </div>
    </PixelFramePortrait>
  );
}

/**
 * Example: Tall Profile Card
 */
export function TallPortraitExample() {
  return (
    <PixelFramePortrait 
      variant="secondary" 
      size="tall"
      hover="glow"
    >
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-accent mb-4 flex items-center justify-center text-3xl">
          👤
        </div>
        <h3 className="text-xl font-bold mb-2">Creator Name</h3>
        <p className="text-sm opacity-70 mb-4">@username</p>
        
        <div className="w-full space-y-3 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold">128</div>
            <div className="text-xs opacity-70">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">2.4K</div>
            <div className="text-xs opacity-70">Followers</div>
          </div>
        </div>
        
        <button className="w-full py-2 bg-primary text-primary-foreground rounded">
          Follow
        </button>
      </div>
    </PixelFramePortrait>
  );
}

/**
 * Example: Destructive Warning
 */
export function DestructivePortraitExample() {
  return (
    <PixelFramePortrait 
      variant="destructive"
      glow={true}
      animate="pulse"
    >
      <div className="text-center">
        <div className="text-4xl mb-3">⚠️</div>
        <h4 className="font-bold mb-2">Warning</h4>
        <p className="text-sm mb-4">
          This action cannot be undone. Please confirm.
        </p>
        <button className="px-4 py-2 bg-background text-foreground rounded">
          Cancel
        </button>
      </div>
    </PixelFramePortrait>
  );
}

/**
 * Example: Navigation Menu Item
 */
export function MenuItemPortrait({ icon, label, count }: { 
  icon: string; 
  label: string; 
  count?: number;
}) {
  return (
    <PixelFramePortrait 
      variant="muted" 
      hover="lift"
      size="compact"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <span className="font-bold">{label}</span>
        </div>
        {count !== undefined && (
          <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm">
            {count}
          </span>
        )}
      </div>
    </PixelFramePortrait>
  );
}

/**
 * Example: Grid of Portrait Cards
 */
export function PortraitGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <PixelFramePortrait variant="primary" animate="entrance">
        <div className="text-center">
          <div className="text-3xl mb-3">🏆</div>
          <h4 className="font-bold">Winner</h4>
          <p className="text-sm mt-2 opacity-70">Top performer</p>
        </div>
      </PixelFramePortrait>

      <PixelFramePortrait variant="secondary" animate="entrance">
        <div className="text-center">
          <div className="text-3xl mb-3">⭐</div>
          <h4 className="font-bold">Rising Star</h4>
          <p className="text-sm mt-2 opacity-70">Up and coming</p>
        </div>
      </PixelFramePortrait>

      <PixelFramePortrait variant="accent" animate="entrance">
        <div className="text-center">
          <div className="text-3xl mb-3">🚀</div>
          <h4 className="font-bold">Innovator</h4>
          <p className="text-sm mt-2 opacity-70">Breaking new ground</p>
        </div>
      </PixelFramePortrait>
    </div>
  );
}

export default PixelFramePortrait;
