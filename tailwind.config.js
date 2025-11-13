/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-light": "#F0F2F5",
        "secondary-light": "#FFFFFF",
        "text-light": "#1C1E21",
        "primary-dark": "#18191A",
        "secondary-dark": "#242526",
        "text-dark": "#E4E6EB",
        "accent-blue": "#2374E1",
        "accent-purple": "#8A3FFC",
        "accent-pink": "#FF7EB6",
        "accent-cyan": "#11A9BC",
      },
      boxShadow: {
        "neumorphic-light": "9px 9px 16px #d1d9e6, -9px -9px 16px #ffffff",
        "neumorphic-dark": "9px 9px 16px #1a1a1a, -9px -9px 16px #2e2e2e",
      },
    },
  },
  plugins: [],
};
