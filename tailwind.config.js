/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html,js}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Color primario (mismo en light y dark)
        primary: '#F84733',

        // LIGHT MODE (colores por defecto)
        background: '#F8F8F8',
        text: '#191A1B',
        'text-muted': '#4c5052',
        container: '#FCF6F0',
        contrast: '#F84733',
        'contrast-v2': '#FCF6F0',

        // DARK MODE (usar con prefijo dark:)
        'bg-dark': '#191A1B',
        'text-dark': '#F6F6F6',
        'text-muted-dark': '#FCF5EF',
        'container-dark': '#3B3C3E',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        kangge: ['Kangge', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-out': 'fadeOut 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
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

