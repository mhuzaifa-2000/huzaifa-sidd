export type Theme = "light" | "dark";

export interface ThemeToggleProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}
