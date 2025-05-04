import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 50%' },
          '100%': { backgroundPosition: '-200% 50%' },
        },
        pulseGlow: {
          '0%, 100%': {
            transform: 'scale(1)',
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.3), 0 0 60px rgba(255, 215, 0, 0.1)',
          },
          '50%': {
            transform: 'scale(1.02)',
            boxShadow: '0 0 30px rgba(255, 215, 0, 0.4), 0 0 80px rgba(255, 215, 0, 0.2)',
          },
        },
        spinY: {
          '0%': { transform: 'rotateY(0deg) rotateX(0deg) translateZ(0)' },
          '50%': { transform: 'rotateY(360deg) rotateX(-20deg) translateZ(100px)' },
          '100%': { transform: 'rotateY(720deg) rotateX(0deg) translateZ(0)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'shimmer': 'shimmer 3s linear infinite',
        'pulse-glow': 'pulseGlow 2s infinite',
        'spin-y': 'spinY 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
    },
  },
  plugins: [],
};

export default config;
