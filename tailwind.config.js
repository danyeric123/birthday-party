/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Luckiest Guy", "cursive"],
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        // Custom party theme colors
        party: {
          primary: "hsl(312 78% 58%)", // Pink/Magenta
          secondary: "hsl(262 52% 47%)", // Purple
          accent: "hsl(180 62% 55%)", // Cyan/Teal
          muted: "hsl(45 93% 88%)", // Light Yellow/Cream
        },
        // Shadcn/ui compatible color tokens
        border: "hsl(214.3 31.8% 91.4%)",
        background: "hsl(0 0% 100%)",
        foreground: "hsl(222.2 84% 4.9%)",
        primary: {
          DEFAULT: "hsl(312 78% 58%)",
          foreground: "hsl(0 0% 100%)",
        },
        secondary: {
          DEFAULT: "hsl(210 40% 96%)",
          foreground: "hsl(222.2 47.4% 11.2%)",
        },
        muted: {
          DEFAULT: "hsl(210 40% 96%)",
          foreground: "hsl(215.4 16.3% 46.9%)",
        },
        card: {
          DEFAULT: "hsl(0 0% 100%)",
          foreground: "hsl(222.2 84% 4.9%)",
        },
        destructive: {
          DEFAULT: "hsl(0 84.2% 60.2%)",
          foreground: "hsl(210 40% 98%)",
        },
      },
      animation: {
        "bounce-gentle": "bounce-gentle 2s infinite",
      },
    },
  },
};
