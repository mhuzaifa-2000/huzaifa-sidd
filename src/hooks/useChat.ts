import { useState, useCallback, useRef } from "react";

export interface ChatMessage {
  id: string;
  role: "user" | "bot";
  content: string;
  isTyping?: boolean;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isActive, setIsActive] = useState(false);
  const idCounter = useRef(0);

  const nextId = () => String(++idCounter.current);

  const sendMessage = useCallback((text: string) => {
    setIsActive(true);

    const userId = nextId();
    setMessages((prev) => [
      ...prev,
      { id: userId, role: "user", content: text },
    ]);

    const botId = nextId();
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: botId, role: "bot", content: "", isTyping: true },
      ]);

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === botId
              ? {
                  ...m,
                  isTyping: false,
                  content:
                    "This is a demo of the chat interface. Connect your AI backend to bring this to life!",
                }
              : m
          )
        );
      }, 1500);
    }, 400);
  }, []);

  return { messages, isActive, sendMessage };
}
