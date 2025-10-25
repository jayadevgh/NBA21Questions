import type { Config } from "tailwindcss";
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        card: "#0f172a",
        card2: "#111827",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
} satisfies Config;
