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
        paper: "#F8F4ED",
        "paper-2": "#F1EBDF",
        "paper-3": "#E8DFCE",
        ink: "#211B15",
        "ink-soft": "#5A5044",
        "ink-faint": "#988B79",
        kraft: "#C66E22",
        "kraft-deep": "#9A4F16",
        "kraft-soft": "#E8A765",
        sky: "#4E86A8",
        blush: "#D98B6A",
        line: "rgba(33,27,21,0.12)",
      },
      letterSpacing: { tightest: "-0.05em" },
    },
  },
  plugins: [],
};
