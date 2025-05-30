import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        card: '#121212',
        border: '#2a2a2a',
        subheading: '#aaa',
        text: '#F1F1F1',
        accent: '#2a2a2a',
        'accent-hover': '#333',
        tile: '#1a1a1a',
        'border-light': '#444',
        'text-subtle': '#888',
      },
      fontFamily: {
        sans: ['"Franklin Gothic Medium"', 'Arial Narrow', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [typography],
};
