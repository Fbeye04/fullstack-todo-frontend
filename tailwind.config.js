/** @type {import('tailwindcss').Config} */

export default {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-background": "var(--color-main-background)",
        "blur-background": "var(--color-blur-background)",
        "active-filter": "var(--color-active-filter)",
        "completed-tasks": "var(--color-completed-tasks)",
        "completed-tasks-border": "var(--color-completed-tasks-border)",
        "primer-button": "var(--color-primer-button)",
        "primer-border": "var(--color-primer-border)",
        "secondary-button": "var(--color-secondary-button)",
        "secondary-border": "var(--color-secondary-border)",
        "side-text": "var(--color-side-text)",
        "task-background": "var(--color-task-background)",
        "task-border": "var(--color-task-border)",
      },
    },
  },
  plugins: [],
};
