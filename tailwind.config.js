/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      inter: ["Inter"],
    },
    extend: {
      colors: {
        PrimaryRed: "#C1121F",
        SecondaryRed: "#780000",
        PrimaryBlue: "#003049",
        SecondaryBlue: "#669BBC",
        Line: "#B3B3B3",
      },
    },
  },
  plugins: [require("daisyui")],
};
