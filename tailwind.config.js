module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      lineHeight: {
        '12': '3rem',
      },
      backgroundColor: {
        'slategrey': '#708090',
      },
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
