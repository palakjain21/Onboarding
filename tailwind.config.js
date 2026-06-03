/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
        sans: ['Open Sans', 'sans-serif'],
      },
      colors: {
        navy:      '#132C4A',
        blue:      '#0054FD',
        'blue-light': '#729CF0',
        'blue-border': '#4B59D5',
        'bg-page':  '#F6F7F9',
        'border-default': '#D9E0E6',
        'text-muted':     '#8292A1',
        'text-placeholder': '#D9E0E6',
        coral:     '#FF7C52',
        'social-border': '#DADADA',
        'social-text':   '#636363',
        success:   '#047647',
        purple:    '#4B59D5',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
}
