/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0052FF', // Asia-Insights primary blue
          dark: '#0040CC',
          light: '#3366FF'
        },
        background: {
          white: '#FFFFFF',
          gray: '#F1F2F6', // Updated to cooler, darker grey for premium feel
          slate: '#F8FAFC'
        },
        // Premium metallic accents
        metallic: {
          gold: '#D4AF37', // Soft gold for premium features
          goldLight: '#E5C158',
          goldDark: '#B8941F'
        },
        gunmetal: {
          DEFAULT: '#414A4C', // Dark accent for premium feel
          light: '#5A6C6F',
          dark: '#2D3436'
        },
        text: {
          DEFAULT: '#111827',
          secondary: '#6B7280',
          light: '#9CA3AF'
        },
        border: {
          DEFAULT: '#E5E7EB',
          light: '#F3F4F6'
        }
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif']
      },
      borderRadius: {
        'default': '8px'
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'premium': '0 8px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.05)',
        'metallic': '0 4px 20px rgba(212, 175, 55, 0.15)'
      },
      backgroundImage: {
        'gradient-metallic': 'linear-gradient(to bottom right, #FFFFFF, #D1D5DB)',
        'gradient-primary': 'linear-gradient(to bottom, #0A5EFF, #0052FF)',
        'gradient-hero': 'linear-gradient(to bottom, #414A4C, transparent)',
        'gradient-gold': 'linear-gradient(135deg, #D4AF37, #E5C158)'
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-gentle': 'bounce 2s infinite'
      }
    },
  },
  plugins: [],
}
