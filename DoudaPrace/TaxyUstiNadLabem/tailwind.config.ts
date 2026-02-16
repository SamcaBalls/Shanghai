import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#f4b400",
          dark: "#c88b00",
        },
        accent: "#000000",
        muted: "#f7f7f7",
        "subtle-text": "#6b6b6b",
        success: "#28a745",
      },
      fontFamily: {
        sans: ["Inter", "Montserrat", "Helvetica Neue", "Arial", "sans-serif"],
      },
      borderRadius: {
        lg: "14px",
        md: "12px",
        xl: "16px",
      },
      boxShadow: {
        soft: "0 8px 32px rgba(11,11,11,0.08)",
        btn: "0 6px 18px rgba(0,0,0,0.12)",
      },
      maxWidth: {
        container: "1200px",
      },
    },
  },
  plugins: [],
};
export default config;
