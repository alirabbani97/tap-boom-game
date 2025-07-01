/** @type {import('tailwindcss').Config} */
import animations from "@midudev/tailwind-animations";

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryblue: "#5680E9",
        lightblue: "#84CEEB",
        skyblue: "#5AB9EA",
        lavender: "#C1C8E4",
        purple: "#8860D0",
      },
    },
  },
  plugins: [animations, require("daisyui")],
};
