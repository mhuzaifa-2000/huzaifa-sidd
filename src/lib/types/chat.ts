export interface ChatMessage {
  id: string;
  role: "user" | "bot";
  content: string;
  isTyping?: boolean;
  error?: boolean;
}

export interface ApiChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatApiError {
  error: string;
  details?: string;
}

export interface ChatRequestBody {
  messages: ApiChatMessage[];
}

export interface ChatInputProps {
  onSubmit: (text: string) => void;
}

export interface ChatViewProps {
  messages: ChatMessage[];
  isActive: boolean;
}
