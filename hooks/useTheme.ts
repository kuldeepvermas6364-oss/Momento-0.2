"use client";

import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

export default function useTheme() {
  const [mode, setMode] = useState<ThemeMode>("light");

  useEffect(() => {
    // TODO: read from localStorage / system preference
    const stored = localStorage.getItem("momento_theme");
    if (stored === "dark" || stored === "light") {
      setMode(stored);
    }
  }, []);

  function toggle() {
    const next: ThemeMode = mode === "light" ? "dark" : "light";
    setMode(next);
    localStorage.setItem("momento_theme", next);
  }

  return { mode, toggle };
}
