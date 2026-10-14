import { useTheme } from "../hooks/useTheme";
import { Header, DEFAULT_NAV_LINKS, DEFAULT_SOCIAL_LINKS } from "./layout/Header";
import { ThemeToggle } from "./ui/ThemeToggle";
import barStyles from "./ui/BottomBar.module.css";
import styles from "./ArticlesPage.module.css";

export function ArticlesPage() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Header
        name="Huzaifa Siddiqui"
        navLinks={DEFAULT_NAV_LINKS}
        socialLinks={DEFAULT_SOCIAL_LINKS}
      />
      <main className={styles.main}>
        <h1 className={styles.heading}>Coming Soon</h1>
      </main>
      <div className={barStyles.bottomBar}>
        <div className={barStyles.inputWrapper}>
          <footer className={barStyles.footer}>
            <span className={barStyles.footerLeft}>&copy; 2026 &middot; Huzaifa Siddiqui</span>
            <ThemeToggle theme={theme} onThemeChange={setTheme} />
          </footer>
        </div>
      </div>
    </>
  );
}
