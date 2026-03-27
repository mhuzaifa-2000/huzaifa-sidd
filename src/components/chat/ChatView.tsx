import { useEffect, useRef } from "react";
import type { ChatMessage } from "../../hooks/useChat";
import styles from "./ChatView.module.css";

interface ChatViewProps {
  messages: ChatMessage[];
  isActive: boolean;
}

export function ChatView({ messages, isActive }: ChatViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      requestAnimationFrame(() => {
        containerRef.current!.scrollTop = containerRef.current!.scrollHeight;
      });
    }
  }, [messages]);

  if (!isActive) return null;

  return (
    <div className={styles.chatView} ref={containerRef}>
      <div className={styles.messagesInner}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.message} ${
              msg.role === "user" ? styles.messageUser : styles.messageBot
            }`}
          >
            <div className={styles.messageAvatar}>
              {msg.role === "user" ? "H" : "\u2726"}
            </div>
            <div className={styles.messageContent}>
              {msg.isTyping ? <TypingDots /> : msg.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className={styles.typingDots}>
      <span />
      <span />
      <span />
    </div>
  );
}
