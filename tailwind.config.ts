import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./utils/**/*.{ts,tsx}",
    "./constants/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366F1",
        secondary: "#8B5CF6",
        background: "#FFFFFF",
        surface: "#F8FAFC",
        text: "#111827",
        "text-secondary": "#6B7280",
        border: "#E5E7EB",
        success: "#22C55E",
        warning: "#F59E0B",
        error: "#EF4444"
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "20px"
      },
      fontFamily: {
        heading: ["Inter", "sans-serif"],
        body: ["Inter", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
