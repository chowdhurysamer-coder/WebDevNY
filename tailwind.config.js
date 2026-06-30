/** @type {import('tailwindcss').Config} */
const rgb = (v) => `rgb(var(${v}) / <alpha-value>)`;
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["'Fraunces'", "Georgia", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      colors: {
        paper: rgb("--c-paper"),
        "paper-2": rgb("--c-paper-2"),
        "paper-3": rgb("--c-paper-3"),
        ink: rgb("--c-ink"),
        "ink-soft": rgb("--c-ink-soft"),
        "ink-faint": rgb("--c-ink-faint"),
        kraft: rgb("--c-kraft"),
        "kraft-deep": rgb("--c-kraft-deep"),
        "kraft-soft": rgb("--c-kraft-soft"),
        sky: rgb("--c-sky"),
        blush: rgb("--c-blush"),
        line: "var(--line)",
      },
      letterSpacing: { tightest: "-0.05em" },
    },
  },
  plugins: [],
};
