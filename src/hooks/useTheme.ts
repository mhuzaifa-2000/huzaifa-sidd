import { useState, useEffect, useCallback } from "react";
import type { Theme } from "../lib/types/theme";

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = prefersDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", initial);
    setThemeState(initial);
  }, []);

  const setTheme = useCallback((t: Theme) => {
    document.documentElement.setAttribute("data-theme", t);
    setThemeState(t);
  }, []);

  return { theme, setTheme };
}
