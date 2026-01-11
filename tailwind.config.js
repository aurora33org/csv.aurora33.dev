/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Quicksand', 'sans-serif'],
        'heading': ['Kangge', 'sans-serif'],
        'quicksand': ['Quicksand', 'sans-serif'],
        'kangge': ['Kangge', 'sans-serif'],
      },
      colors: {
        // Aurora 33 Brand Colors
        primary: {
          50: '#FEF2F2',
          100: '#FEE5E2',
          200: '#FECDC7',
          300: '#FDB4AC',
          400: '#FC9B91',
          500: '#F84733',
          600: '#E63920',
          700: '#C72F1A',
          800: '#A82515',
          900: '#891C10',
        },
        background: {
          DEFAULT: '#F8F8F8',
          secondary: '#FCF6F0',
        },
        text: {
          DEFAULT: '#191A1B',
          muted: '#838A8D',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

