/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['var(--font-playfair)', 'Georgia', 'serif'],
        'sans': ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        gildedGrove: {
          "primary": "#d6b86b",
          "secondary": "#2d5a27",
          "accent": "#8b7355",
          "neutral": "#1a1a1a",
          "base-100": "#0f0f0f",
          "base-200": "#1a1a1a",
          "base-300": "#2a2a2a",
          "base-content": "#ffffff",
        },
      },
    ],
    darkTheme: "gildedGrove",
  },
}
