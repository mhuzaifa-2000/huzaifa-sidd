import { useTypingAnimation } from "../../hooks/useTypingAnimation";
import styles from "./Landing.module.css";

interface LandingProps {
  initials: string;
  heading: string;
  subtitle: string;
  typingPhrase: string;
  chips: string[];
  isHidden: boolean;
  onChipClick: (text: string) => void;
}

export function Landing({
  initials,
  heading,
  subtitle,
  typingPhrase,
  chips,
  isHidden,
  onChipClick,
}: LandingProps) {
  const displayedText = useTypingAnimation(typingPhrase);

  return (
    <div className={`${styles.landing} ${isHidden ? styles.hidden : ""}`}>
      <div className={styles.inner}>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <span className={styles.avatarPlaceholder}>{initials}</span>
          </div>
          <div className={styles.profileInfo}>
            <h1>{heading}</h1>
            <p>{subtitle}</p>
          </div>
        </div>

        <h2 className={styles.chatHeading}>
          <span>{displayedText}</span>
          <span className={styles.typingCursor} />
        </h2>

        <div className={styles.chips}>
          {chips.map((chip) => (
            <button
              key={chip}
              className={styles.chip}
              onClick={() => onChipClick(chip)}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
