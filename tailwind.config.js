/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Fraunces'", "Georgia", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      colors: {
        paper: "#EFE9DD",
        "paper-2": "#E6DCCB",
        "paper-3": "#DBCFB8",
        ink: "#17130F",
        "ink-soft": "#4A4138",
        "ink-faint": "#8A7E6E",
        kraft: "#BE6A24",
        "kraft-deep": "#8F4D18",
        blue: "#1E3A5F",
        line: "rgba(23,19,15,0.14)",
      },
      letterSpacing: {
        tightest: "-0.05em",
      },
    },
  },
  plugins: [],
};
