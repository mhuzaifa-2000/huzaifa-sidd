import { useState, useEffect, useCallback } from "react";
import type { Theme } from "../lib/types/theme";

// The inline script in BaseLayout sets data-theme before first paint; this hook just mirrors it.
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "dark" || current === "light") setThemeState(current);
  }, []);

  const setTheme = useCallback((t: Theme) => {
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem("theme", t); } catch {}
    setThemeState(t);
  }, []);

  return { theme, setTheme };
}
