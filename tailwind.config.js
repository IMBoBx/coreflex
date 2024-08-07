const {nextui} = require('@nextui-org/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(accordion|image|popover|scroll-shadow|divider|button|ripple|spinner).js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'raisin-black': '#1e1f2b',
        'flame': '#cf5c36',
        'lavender-bush': '#eee5e9',
        'gray_': '#7c7c7c',
        'sunset': '#efc88b',
        'chinese-violet': '#726482',
        'lilac': '#ac9ac1',
      }
    },
  },
  plugins: [nextui()],
};
