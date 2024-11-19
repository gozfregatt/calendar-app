/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    "bg-red-200", "hover:bg-red-300",
    "bg-blue-200", "hover:bg-blue-300",
    "bg-green-200", "hover:bg-green-300",
    "bg-gray-200", "hover:bg-gray-300",
  ],

  theme: {
    extend: {},
  },
  plugins: [],
}

