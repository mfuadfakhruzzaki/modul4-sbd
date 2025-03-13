const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF5D5D", // vibrant red
          hover: "#FF3838",
        },
        secondary: {
          DEFAULT: "#5DB8FF", // bright blue
          hover: "#38A0FF",
        },
        accent: {
          DEFAULT: "#FFD15D", // bright yellow
          hover: "#FFBF38",
        },
        neutral: {
          DEFAULT: "#EFEFEF", // off-white
          dark: "#2D2D2D", // almost black
        },
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
  plugins: ["@tailwindcss/postcss"],
};

export default config;
