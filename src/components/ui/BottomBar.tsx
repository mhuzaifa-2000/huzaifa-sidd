import { ChatInput } from "./ChatInput";
import { ThemeToggle } from "./ThemeToggle";
import type { BottomBarProps } from "../../lib/types/layout";
import styles from "./BottomBar.module.css";

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
