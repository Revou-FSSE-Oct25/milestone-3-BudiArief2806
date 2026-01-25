"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function applyTheme(next: Theme) {
  const root = document.documentElement; // <html>
  const body = document.body;

  root.classList.toggle("dark", next === "dark");
  body.classList.toggle("dark", next === "dark"); // <- tambahan biar pasti

  root.style.colorScheme = next;
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as Theme) || "light";
    setTheme(saved);
    applyTheme(saved);
  }, []);

  function toggleTheme() {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    applyTheme(next);
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label="Toggle theme"
      className="rounded-xl border px-3 py-2 text-sm font-semibold transition
                 border-slate-200 bg-white hover:bg-slate-50
                 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
