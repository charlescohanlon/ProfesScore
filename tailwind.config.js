/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
module.exports = {
  content: ["./pages/*.tsx",
    "./**/components/**",
  ],
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        'brandAmber': '#FBB03B',
        'brandGray': '#4D4D4D',
      },
      fontFamily: {
        'Barlow': ['Barlow', 'sans-serif'],
        'PTSans': ['PT Sans', 'sans-serif'],
      },
      boxShadow: {
        'inputShadow': '0 1px 6px rgb(32 33 36 / 28%)',
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('last', '&:last-child');
      addVariant('not-last', '&:not(:last-child)');
    }),
  ],
}
