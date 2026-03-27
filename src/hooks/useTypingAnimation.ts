import { useState, useEffect } from "react";

export function useTypingAnimation(phrase: string, delay = 800) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let charIdx = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      charIdx++;
      setDisplayedText(phrase.substring(0, charIdx));
      if (charIdx < phrase.length) {
        timeout = setTimeout(type, 55 + Math.random() * 40);
      }
    };

    timeout = setTimeout(type, delay);
    return () => clearTimeout(timeout);
  }, [phrase, delay]);

  return displayedText;
}
