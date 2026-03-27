import { useState, useCallback } from "react";
import { MicIcon, SendIcon } from "../icons";
import { useVoiceInput } from "../../hooks/useVoiceInput";
import styles from "./ChatInput.module.css";

interface ChatInputProps {
  onSubmit: (text: string) => void;
}

export function ChatInput({ onSubmit }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleVoiceResult = useCallback((transcript: string) => {
    setValue(transcript);
  }, []);

  const { isRecording, toggle: toggleVoice } = useVoiceInput(handleVoiceResult);

  const submit = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setValue("");
  }, [value, onSubmit]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") submit();
  };

  const hasText = value.trim().length > 0;

  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputRow}>
        <button
          className={`${styles.micBtn} ${isRecording ? styles.recording : ""}`}
          aria-label="Voice input"
          onClick={toggleVoice}
        >
          <MicIcon />
        </button>
        <input
          type="text"
          className={styles.chatInput}
          placeholder={isRecording ? "Listening..." : "Ask me anything..."}
          autoComplete="off"
          spellCheck={false}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className={`${styles.sendBtn} ${hasText ? styles.active : ""}`}
          aria-label="Send"
          onClick={submit}
        >
          <SendIcon />
        </button>
      </div>
      <div className={`${styles.voiceStatus} ${isRecording ? styles.visible : ""}`}>
        <div className={styles.voiceWave}>
          <span /><span /><span /><span /><span />
        </div>
        <span>Listening...</span>
      </div>
    </div>
  );
}
