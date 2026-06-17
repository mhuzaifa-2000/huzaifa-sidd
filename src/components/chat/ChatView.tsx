import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { UserIcon } from "../icons";
import type { ChatViewProps } from "../../lib/types/chat";
import styles from "./ChatView.module.css";

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
              {msg.role === "user" ? <UserIcon width={15} height={15} /> : "H"}
            </div>
            <div className={styles.messageContent}>
              {msg.isTyping ? (
                <TypingDots />
              ) : msg.role === "bot" ? (
                <div className={styles.markdown}>
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                msg.content
              )}
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
