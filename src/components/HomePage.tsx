import { useCallback } from "react";
import { useTheme } from "../hooks/useTheme";
import { useChat } from "../hooks/useChat";
import { Header, DEFAULT_NAV_LINKS, DEFAULT_SOCIAL_LINKS } from "./layout/Header";
import { ProfileBar } from "./layout/ProfileBar";
import { Landing } from "./landing/Landing";
import { ChatView } from "./chat/ChatView";
import { BottomBar } from "./ui/BottomBar";

const CHIPS = [
  "What's your tech stack?",
  "Walk me through your career",
  "What are you working on?",
  "What problems excite you?",
];

export function HomePage() {
  const { theme, setTheme } = useTheme();
  const { messages, isActive, sendMessage } = useChat();

  const handleChipClick = useCallback(
    (text: string) => sendMessage(text),
    [sendMessage]
  );

  return (
    <>
      <Header
        name="Huzaifa Siddiqui"
        navLinks={DEFAULT_NAV_LINKS}
        socialLinks={DEFAULT_SOCIAL_LINKS}
      />
      <ProfileBar
        initials="H"
        name="Huzaifa Siddiqui"
        role="Full-stack engineer \u00B7 AI security enthusiast"
        isVisible={isActive}
      />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0, position: "relative" }}>
        <Landing
          initials="H"
          heading="Hey, I'm Huzaifa"
          subtitle="Full-stack engineer, AI security enthusiast, occasional golfer. Ask my digital clone anything."
          typingPhrase="Ask me anything"
          chips={CHIPS}
          isHidden={isActive}
          onChipClick={handleChipClick}
        />
        <ChatView messages={messages} isActive={isActive} />
      </div>
      <BottomBar theme={theme} onThemeChange={setTheme} onSubmit={sendMessage} />
    </>
  );
}
