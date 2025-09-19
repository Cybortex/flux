/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        flux: {
          primary: '#00d4ff', // Neon cyan
          'primary-dark': '#0088cc',
          'primary-light': '#66e0ff',
          accent: {
            gold: '#ffd700', // Bright gold
            purple: '#9333ea', // Electric purple
            green: '#00ff88', // Neon green
            red: '#ff0040', // Neon red
            pink: '#ff0080', // Neon pink
            blue: '#0080ff', // Electric blue
          },
          bg: {
            primary: '#0a0a0a', // Deep black
            secondary: '#111111', // Dark gray
            tertiary: '#1a1a1a', // Medium dark
            card: '#141414', // Card background
          },
          text: {
            primary: '#ffffff',
            secondary: '#b3b3b3',
            accent: '#00d4ff',
          },
          border: {
            primary: '#333333',
            accent: '#00d4ff',
          },
          glow: {
            cyan: '0 0 20px rgba(0, 212, 255, 0.5)',
            purple: '0 0 20px rgba(147, 51, 234, 0.5)',
            green: '0 0 20px rgba(0, 255, 136, 0.5)',
          },
          light: {
            bg: {
              primary: '#ffffff',
              secondary: '#f8fafc',
              tertiary: '#e2e8f0',
            },
            text: {
              primary: '#0f172a',
              secondary: '#64748b',
            },
          },
        },
      },
      backgroundImage: {
        'flux-gradient': 'linear-gradient(135deg, #00d4ff 0%, #9333ea 50%, #ff0080 100%)',
        'flux-gradient-gold': 'linear-gradient(135deg, #ffd700 0%, #ff8c00 100%)',
        'flux-gradient-live': 'linear-gradient(135deg, #ff0040 0%, #ff0080 100%)',
        'flux-gradient-card': 'linear-gradient(135deg, #141414 0%, #1a1a1a 100%)',
        'flux-gradient-button': 'linear-gradient(135deg, #00d4ff 0%, #0080ff 100%)',
        'flux-gradient-hover': 'linear-gradient(135deg, #9333ea 0%, #ff0080 100%)',
        'flux-bg-gaming': 'radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)',
      },
      screens: {
        'xs': '375px',
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'scan': 'scan 2s linear infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 212, 255, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.8), 0 0 30px rgba(0, 212, 255, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};