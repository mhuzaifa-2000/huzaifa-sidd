import { useTheme } from "../hooks/useTheme";
import { Header, DEFAULT_NAV_LINKS, DEFAULT_SOCIAL_LINKS } from "./layout/Header";
import { ThemeToggle } from "./ui/ThemeToggle";
import barStyles from "./ui/BottomBar.module.css";
import styles from "./BooksPage.module.css";

const PROJECTS = [
  {
    name: "Unmudl",
    role: "Associate Tech Lead · 3 years",
    href: "https://unmudl.com",
    image: "/work/unmudl.png",
    note: "A skills-to-jobs marketplace I've helped build and scale over the past three years, now as Associate Tech Lead. I own features end to end across a Next.js front end and NestJS back end on AWS (S3, EC2), and I'm currently leading the platform's AI initiatives, bringing LLM-powered features into the core product.",
  },
  {
    name: "WalletFlo",
    role: "Full-stack engineer · Turing Technologies",
    href: "https://walletflo.com",
    image: "/work/walletflo.png",
    note: "A fintech app that lets users manage their credit cards. Built with React Native on the front end and NestJS on the back end. I played a major part in integrating the RevenueCat payment system and handling its webhooks on the back end.",
  },
  {
    name: "ThreatHawk",
    role: "Final Year Project",
    href: "https://github.com/mhuzaifa-2000",
    image: "/work/threathawk.png",
    note: "An investigative threat intelligence platform that puts the power of open-source tools at a cyber threat analyst's fingertips, collecting meaningful intelligence on IP addresses, domains, emails, and file hashes in a single click. It aggregates IOCs from multiple threat feeds and presents them through intuitive graphs and charts. Built with Python microservices (Django and FastAPI) on the back end and Next.js with Material UI on the front end.",
  },
];

export function WorkPage() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Header
        name="Huzaifa Siddiqui"
        navLinks={DEFAULT_NAV_LINKS}
        socialLinks={DEFAULT_SOCIAL_LINKS}
      />
      <main className={styles.main}>
        <h1 className={styles.heading}>Work</h1>
        <ul className={styles.list}>
          {PROJECTS.map((p, i) => (
            <li key={p.name} className={styles.tile} style={{ animationDelay: `${i * 0.1}s` }}>
              <img className={styles.logo} src={p.image} alt={`${p.name} logo`} />
              <div className={styles.body}>
                <h2 className={styles.title}>
                  <a href={p.href} target="_blank" rel="noreferrer">{p.name}</a>
                </h2>
                <p className={styles.author}>{p.role}</p>
                <p className={styles.note}>{p.note}</p>
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
