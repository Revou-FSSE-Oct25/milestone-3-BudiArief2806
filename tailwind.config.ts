import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class", // 🔴 INI YANG PENTING untuk dark/light toggle
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
