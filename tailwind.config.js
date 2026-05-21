/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
      boxShadow: {
        calm: "0 28px 90px rgba(26, 25, 22, 0.08)",
        fine: "0 12px 40px rgba(26, 25, 22, 0.06)",
      },
    },
  },
  plugins: [],
};
