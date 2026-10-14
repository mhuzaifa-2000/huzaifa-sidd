import { useState } from "react";
import { GitHubIcon, LinkedInIcon, EmailIcon, MenuIcon, HomeIcon } from "../icons";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "../../lib/config";
import type { NavLink, SocialLink, HeaderProps } from "../../lib/types/header";
import styles from "./Header.module.css";

export function Header({ name, navLinks, socialLinks }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <a href="/" className={styles.headerName}>{name}</a>
      <div className={styles.headerRight}>
        <nav>
          <ul className={styles.navLinks}>
            <li>
              <a href="/" aria-label="Home" className={styles.homeLink}><HomeIcon /></a>
            </li>
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
        <button
          className={styles.mobileMenuBtn}
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <MenuIcon />
        </button>
      </div>
      {open && (
        <ul className={styles.mobileMenu}>
          <li>
            <a href="/" className={styles.homeLink}><HomeIcon /> home</a>
          </li>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

export const DEFAULT_NAV_LINKS: NavLink[] = [
  { label: "work", href: "/work" },
  { label: "articles", href: "/articles" },
  { label: "books", href: "/books" },
];

export const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: GITHUB_URL, icon: GitHubIcon },
  { label: "LinkedIn", href: LINKEDIN_URL, icon: LinkedInIcon },
  { label: "Email", href: `mailto:${EMAIL}`, icon: EmailIcon },
];
