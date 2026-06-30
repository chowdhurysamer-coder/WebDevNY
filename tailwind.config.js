/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["'Playfair Display'", "Georgia", "serif"],
        barlow: ["'Barlow'", "system-ui", "sans-serif"],
        serif: ["'Playfair Display'", "Georgia", "serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease forwards",
        "slide-up": "slideUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: "translateY(30px)" }, to: { opacity: 1, transform: "translateY(0)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
      },
    },
  },
  plugins: [],
};
