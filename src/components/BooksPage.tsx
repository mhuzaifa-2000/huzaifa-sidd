import { useTheme } from "../hooks/useTheme";
import { Header, DEFAULT_NAV_LINKS, DEFAULT_SOCIAL_LINKS } from "./layout/Header";
import { ThemeToggle } from "./ui/ThemeToggle";
import barStyles from "./ui/BottomBar.module.css";
import styles from "./BooksPage.module.css";

const cover = (isbn: string) => `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

const BOOKS = [
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    isbn: "9781449373320",
    note: "Taught me how to architect robust, scalable systems and reason about trade-offs in reliability, consistency, and performance.",
  },
  {
    title: "AI Engineering",
    author: "Chip Huyen",
    isbn: "9781098166304",
    note: "Gave me a practical framework for building production applications on foundation models, covering evaluation, prompt engineering, RAG, agents, and inference optimization.",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    isbn: "9780735211292",
    note: "Showed me how small, consistent improvements compound over time, and how to build habits through systems rather than relying on motivation.",
  },
  {
    title: "The Forty Rules of Love",
    author: "Elif Shafak",
    isbn: "9780241972939",
    note: "Through the story of Rumi and Shams of Tabriz, it taught me to look beyond rigid thinking, approach people with empathy and patience, and value inner growth as much as outward achievement.",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    isbn: "9780062315007",
    note: "Through Santiago's journey, it taught me to pursue my goals with conviction, treat setbacks as part of the path, and recognize that the journey itself shapes who I become.",
  },
];

export function BooksPage() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Header
        name="Huzaifa Siddiqui"
        navLinks={DEFAULT_NAV_LINKS}
        socialLinks={DEFAULT_SOCIAL_LINKS}
      />
      <main className={styles.main}>
        <h1 className={styles.heading}>Books I've read and like</h1>
        <ul className={styles.list}>
          {BOOKS.map((b, i) => (
            <li key={b.isbn} className={styles.tile} style={{ animationDelay: `${i * 0.1}s` }}>
              <img className={styles.cover} src={cover(b.isbn)} alt={`${b.title} cover`} loading="lazy" />
              <div className={styles.body}>
                <h2 className={styles.title}>{b.title}</h2>
                <p className={styles.author}>{b.author}</p>
                <p className={styles.note}>{b.note}</p>
              </div>
            </li>
          ))}
        </ul>
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
