import { useState, useCallback, useRef, useEffect } from "react";
import { streamChatMessage } from "../lib/chat";
import type { ChatMessage, ApiChatMessage } from "../lib/types/chat";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isActive, setIsActive] = useState(false);
  const idCounter = useRef(0);
  const abortRef = useRef<AbortController | null>(null);
  const messagesRef = useRef<ChatMessage[]>([]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const nextId = () => String(++idCounter.current);

  const sendMessage = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsActive(true);

    const userMessage: ChatMessage = {
      id: nextId(),
      role: "user",
      content: trimmed,
    };
    const botId = nextId();
    const botMessage: ChatMessage = {
      id: botId,
      role: "bot",
      content: "",
      isTyping: true,
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);

    const history: ApiChatMessage[] = messagesRef.current
      .filter((m) => !m.error && (m.role === "user" || (m.role === "bot" && m.content)))
      .map((m) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content,
      }));
    history.push({ role: "user", content: trimmed });

    (async () => {
      try {
        let received = false;
        for await (const token of streamChatMessage(history, controller.signal)) {
          if (!received) {
            received = true;
            setMessages((prev) =>
              prev.map((m) =>
                m.id === botId ? { ...m, isTyping: false, content: token } : m
              )
            );
          } else {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === botId ? { ...m, content: m.content + token } : m
              )
            );
          }
        }
        setMessages((prev) =>
          prev.map((m) => (m.id === botId ? { ...m, isTyping: false } : m))
        );
      } catch (err) {
        if (controller.signal.aborted) return;
        const message =
          err instanceof Error ? err.message : "Something went wrong. Please try again.";
        setMessages((prev) =>
          prev.map((m) =>
            m.id === botId
              ? { ...m, isTyping: false, content: message, error: true }
              : m
          )
        );
      }
    })();
  }, []);

  return { messages, isActive, sendMessage };
}
