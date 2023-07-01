/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5600E3',
        'brand-cyan': '#1BD7E3',
        'cyan-401': '#9EE9EE',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
