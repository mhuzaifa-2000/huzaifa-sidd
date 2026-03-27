import styles from "./ProfileBar.module.css";

interface ProfileBarProps {
  initials: string;
  name: string;
  role: string;
  isVisible: boolean;
}

export function ProfileBar({ initials, name, role, isVisible }: ProfileBarProps) {
  return (
    <div className={`${styles.profileBar} ${isVisible ? styles.visible : ""}`}>
      <div className={styles.avatarSm}>
        <span>{initials}</span>
      </div>
      <div className={styles.info}>
        <span className={styles.name}>{name}</span>
        <span className={styles.role}>{role}</span>
      </div>
    </div>
  );
}
