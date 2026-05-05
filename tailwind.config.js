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
        background:           'oklch(var(--background) / <alpha-value>)',
        foreground:           'oklch(var(--foreground) / <alpha-value>)',
        card:                 'oklch(var(--card) / <alpha-value>)',
        primary:              'oklch(var(--primary) / <alpha-value>)',
        'primary-foreground': 'oklch(var(--primary-foreground) / <alpha-value>)',
        secondary:            'oklch(var(--secondary) / <alpha-value>)',
        muted:                'oklch(var(--muted) / <alpha-value>)',
        'muted-foreground':   'oklch(var(--muted-foreground) / <alpha-value>)',
        border:               'oklch(var(--border) / <alpha-value>)',
      },
      fontFamily: {
        sans:       ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono:       ['var(--font-geist-mono)', 'monospace'],
        instrument: ['var(--font-instrument)', 'Georgia', 'serif'],
        jetbrains:  ['var(--font-jetbrains)', 'monospace'],
      },
      animation: {
        'fade-in':    'fadeIn 0.5s ease-in-out',
        'slide-up':   'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
