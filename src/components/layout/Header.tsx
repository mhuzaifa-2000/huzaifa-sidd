import { GitHubIcon, LinkedInIcon, EmailIcon, MenuIcon } from "../icons";
import styles from "./Header.module.css";

interface NavLink {
  label: string;
  href: string;
}

interface SocialLink {
  label: string;
  href: string;
  icon: React.ComponentType;
}

interface HeaderProps {
  name: string;
  navLinks: NavLink[];
  socialLinks: SocialLink[];
}

export function Header({ name, navLinks, socialLinks }: HeaderProps) {
  return (
    <header className={styles.header}>
      <span className={styles.headerName}>{name}</span>
      <div className={styles.headerRight}>
        <nav>
          <ul className={styles.navLinks}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.navDivider} />
        <div className={styles.socialLinks}>
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto:") ? undefined : "noopener"}
              aria-label={link.label}
            >
              <link.icon />
            </a>
          ))}
        </div>
        <button className={styles.mobileMenuBtn} aria-label="Menu">
          <MenuIcon />
        </button>
      </div>
    </header>
  );
}

export const DEFAULT_NAV_LINKS: NavLink[] = [
  { label: "work", href: "#work" },
  { label: "articles", href: "#articles" },
  { label: "books", href: "#books" },
];

export const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: "#", icon: GitHubIcon },
  { label: "LinkedIn", href: "#", icon: LinkedInIcon },
  { label: "Email", href: "mailto:hello@huzaifa.dev", icon: EmailIcon },
];
