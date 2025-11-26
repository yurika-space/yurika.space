export default {
  darkMode: 'class', // Enable selector-based dark mode
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pixelify: ['var(--font-pixelify-sans)'],
        sixtyfour: ['var(--font-sixtyfour)'],
        jetbrains: ['var(--font-jetbrains-mono)'],
        pressStart2p: ['var(--font-press-start-2p)'],
      },
      colors: {
        'yurika': {
          'bg-primary': '#0a0e17',
          'bg-secondary': '#111827',
          'electric': '#00ff9f',
          'pink': '#ff006e',
          'cyan': '#00d9ff',
          'text-primary': '#e5e7eb',
          'text-muted': '#9ca3af',
        }
      },
      keyframes: {
        gridPulse: {
          '0%, 100%': { transform: 'perspective(500px) rotateX(60deg) scale(1)' },
          '50%': { transform: 'perspective(500px) rotateX(60deg) scale(1.1)' },
        },
        float: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(30px, -30px)' },
          '66%': { transform: 'translate(-20px, 20px)' },
        },
        glitchPulse: {
          '0%, 90%, 100%': {
            textShadow: '2px 2px 0 #00ff9f, -2px -2px 0 #ff006e',
          },
          '95%': {
            textShadow: '-2px 2px 0 #00ff9f, 2px -2px 0 #ff006e',
          },
        },
        underlinePulse: {
          '0%, 100%': { opacity: '1', transform: 'scaleX(1)' },
          '50%': { opacity: '0.5', transform: 'scaleX(0.8)' },
        },
        fadeInUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        bounce: {
          '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
          '50%': { transform: 'translateX(-50%) translateY(10px)' },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '50.01%, 100%': { opacity: '0' },
        },
        blinkCaret: {
          '0%, 49%': { borderColor: '#00ff9f' },
          '50%, 100%': { borderColor: 'transparent' },
        },
      },
      animation: {
        'grid-pulse': 'gridPulse 8s ease-in-out infinite',
        'float': 'float 20s ease-in-out infinite',
        'float-slow': 'float 2000s ease-in-out infinite',
        'glitch': 'glitchPulse 3s ease-in-out infinite',
        'underline-pulse': 'underlinePulse 2s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
        'blink': 'blink 1s steps(2, start) infinite',
        'blink-caret': 'blinkCaret 0.8s step-end infinite',
      },
      blur: {
        'xl': '80px',
      },
      // Custom box shadows for glow effects
      boxShadow: {
        'glow-electric': '0 0 20px rgba(0, 255, 159, 0.3)',
        'glow-electric-lg': '0 0 30px rgba(0, 255, 159, 0.6)',
      },
      transitionDelay: {
        '700': '700ms',
        '1400': '1400ms',
      },
    },
  },
  plugins: [],
}
