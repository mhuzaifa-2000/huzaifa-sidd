import type { Theme } from "./theme";

export interface BottomBarProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  onSubmit: (text: string) => void;
}

export interface ProfileBarProps {
  initials: string;
  name: string;
  role: string;
  isVisible: boolean;
}
