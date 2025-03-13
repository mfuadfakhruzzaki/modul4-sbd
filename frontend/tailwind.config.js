/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors - these will work in Tailwind v4
        primary: "#FF5D5D", // vibrant red
        "primary-hover": "#FF3838",
        secondary: "#5DB8FF", // bright blue
        "secondary-hover": "#38A0FF",
        accent: "#FFD15D", // bright yellow
        "accent-hover": "#FFBF38",
        "custom-light": "#EFEFEF", // off-white (replacing neutral)
        "custom-dark": "#2D2D2D", // almost black (replacing neutral-dark)
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      boxShadow: {
        neo: "5px 5px 0px 0px rgba(0,0,0,1)",
        "neo-lg": "8px 8px 0px 0px rgba(0,0,0,1)",
        "neo-hover": "7px 7px 0px 0px rgba(0,0,0,1)",
      },
      borderWidth: {
        3: "3px",
      },
    },
  },
  plugins: [],
};
