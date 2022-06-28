/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/*.tsx",
    "./components/*.tsx"
  ],
  theme: {
    extend: {
      colors: {
        'brand-amber': '#FBB03B',
        'placholder-gray': '#4D4D4D',
      },
      fontFamily: {
        'Barlow': ['Barlow', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
