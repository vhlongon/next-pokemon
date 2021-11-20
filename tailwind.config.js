// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    options: {
      safelist: [/^bg-gradient-to-/, /^from-/, /^via-/, /^to-/],
    },
  },
  darkMode: false,
  variants: {
    animation: ['hover', 'focus'],
  },
  theme: {
    extend: {
      colors: {
        bug: '#A8B820',
        normal: '#A8A878',
        fire: '#F08030',
        water: '#6890F0',
        grass: '#78C850',
        electric: '#F8D030',
        ice: '#98D8D8',
        fighting: '#C03028',
        poison: '#A040A0',
        ground: '#E0C068',
        flying: '#A890F0',
        psychic: '#F85888',
        rock: '#B8A038',
        ghost: '#705898',
        dark: '#705848',
        dragon: '#7038F8',
        steel: '#B8B8D0',
        fairy: '#F0B6BC',
      },
      fontFamily: {
        sans: ['Lato', ...defaultTheme.fontFamily.sans],
        Lato: ['Lato', 'sans-serif'],
        RobotoCondensed: ['Roboto Condensed', 'sans-serif'],
      },
    },
    minWidth: {
      0: '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      full: '100%',
    },
  },
  plugins: [require('tailwindcss-textshadow')],
};
