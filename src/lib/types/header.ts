export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: React.ComponentType;
}

export interface HeaderProps {
  name: string;
  navLinks: NavLink[];
  socialLinks: SocialLink[];
}
