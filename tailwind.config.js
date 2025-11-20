/** @type {import('tailwindcss').Config} config */
const config = {
  content: ['./app/**/*.php', './resources/**/*.{php,vue,js}'],
  theme: {
    extend: {
      colors: {
        // Brand colors matching theme.json
        primary: '#DF391C',
        secondary: '#22B0D6',
        text: '#2B2B2B',
        cream: '#FFF8F0',
        'red-light': '#F5927E',
        'red-dark': '#A82815',
        'blue-light': '#7DD3ED',
        'blue-dark': '#1A8CAB',
        'gray-light': '#F5F5F5',
        'gray-medium': '#949494',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'vt323': ['VT323', 'monospace'],
        'sans': ['Inter', 'sans-serif'], // Set Inter as default sans-serif
      },
    },
  },
  plugins: [],
};

export default config;
