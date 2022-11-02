/* eslint-disable */
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          dark: colors.blue['400'],
          light: colors.blue['200'],
          medium: colors.blue['300']
        },
        orange: {
          dark: colors.orange['400'],
          light: colors.orange['200'],
          medium: colors.orange['300']
        },
        bar: {
          green: "#57cba1",
        },
        red: colors.red['600'],
        green: colors.green['600'],
        "alice-blue":"#f7fbff",
        marine: {
          dark: "rgba(0, 13, 85, 1)",
          medium: "rgba(77, 90, 136, 1)"
        }
      }
    }
  },
  plugins: []
};