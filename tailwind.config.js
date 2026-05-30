/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#172033",
        leaf: "#2f855a",
        berry: "#c2416b",
        amber: "#b7791f",
        skyline: "#2563eb",
        paper: "#fbfaf7",
      },
      boxShadow: {
        soft: "0 16px 40px rgba(23, 32, 51, 0.10)",
      },
    },
  },
  plugins: [],
};
