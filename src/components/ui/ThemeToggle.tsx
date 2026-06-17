import { SunIcon, MoonIcon } from "../icons";
import type { ThemeToggleProps } from "../../lib/types/theme";
import styles from "./ThemeToggle.module.css";

export function ThemeToggle({ theme, onThemeChange }: ThemeToggleProps) {
  return (
    <div className={styles.themeToggles}>
      <button
        className={`${styles.themeBtn} ${theme === "light" ? styles.active : ""}`}
        onClick={() => onThemeChange("light")}
        aria-label="Light theme"
      >
        <SunIcon />
      </button>
      <button
        className={`${styles.themeBtn} ${theme === "dark" ? styles.active : ""}`}
        onClick={() => onThemeChange("dark")}
        aria-label="Dark theme"
      >
        <MoonIcon />
      </button>
    </div>
  );
}
