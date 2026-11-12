"use client";

import { useTheme } from "@wrksz/themes/client";

const THEMES = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
] as const;

type ThemeValue = (typeof THEMES)[number]["value"];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <label htmlFor="theme-select" className="sr-only">
        Theme
      </label>
      <select
        id="theme-select"
        value={theme ?? "system"}
        onChange={(e) => setTheme(e.target.value as ThemeValue)}
        className="h-10 rounded-md border border-input bg-background px-4
        text-base font-medium ring-offset-background transition-colors 
        hover:bg-accent hover:text-accent-foreground focus-visible:outline-hidden
         focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {THEMES.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </>
  );
}
