import type { Theme } from "../../hooks/useTheme";
import { ChatInput } from "./ChatInput";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./BottomBar.module.css";

interface BottomBarProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  onSubmit: (text: string) => void;
}

export function BottomBar({ theme, onThemeChange, onSubmit }: BottomBarProps) {
  return (
    <div className={styles.bottomBar}>
      <div className={styles.inputWrapper}>
        <ChatInput onSubmit={onSubmit} />
        <footer className={styles.footer}>
          <span className={styles.footerLeft}>&copy; 2026 &middot; Huzaifa Siddiqui</span>
          <ThemeToggle theme={theme} onThemeChange={onThemeChange} />
        </footer>
      </div>
    </div>
  );
}
