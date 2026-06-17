export interface LandingProps {
  initials: string;
  heading: string;
  subtitle: string;
  typingPhrase: string;
  chips: string[];
  isHidden: boolean;
  onChipClick: (text: string) => void;
}
