/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          contrast: 'var(--color-primary-contrast)',
        },
        background: {
          DEFAULT: 'var(--color-background)',
          contrast: 'var(--color-background-contrast)',
        },
        divider: {
          DEFAULT: 'var(--color-divider)',
        },
      },
      textColor: {
        primary: {
          primary: 'var(--color-primary)',
          DEFAULT: 'var(--color-text-primary)',
        },
        secondary: {
          DEFAULT: 'var(--color-text-secondary)',
        },
      },
    },
  },
  plugins: [],
}
