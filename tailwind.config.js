module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./lib/**/*.{js,jsx,ts,tsx}']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
