/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          50: '#e8f0f8',
          100: '#c5d9ee',
          200: '#9ebfe3',
          300: '#74a3d5',
          400: '#4d87c7',
          500: '#2a6bb5',
          600: '#1e548f',
          700: '#153d69',
          800: '#0c2744',
          900: '#061525',
          950: '#030b14',
        },
        eucalyptus: {
          50: '#edf7f0',
          100: '#d4edda',
          200: '#a8dbb5',
          300: '#7cc990',
          400: '#50b76b',
          500: '#2d9e4b',
          600: '#237d3b',
          700: '#1a5d2c',
          800: '#113d1d',
          900: '#081e0e',
        },
      },
    },
  },
  plugins: [],
};
