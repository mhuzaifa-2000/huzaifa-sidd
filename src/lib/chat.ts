import type { ApiChatMessage, ChatApiError } from './types/chat';

export async function* streamChatMessage(
  messages: ApiChatMessage[],
  signal?: AbortSignal,
): AsyncGenerator<string, void, void> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
    signal,
  });

  if (!response.ok) {
    const err = (await response.json().catch(() => null)) as ChatApiError | null;
    throw new Error(err?.error ?? `Chat request failed with status ${response.status}`);
  }

  if (!response.body) {
    throw new Error('Chat response has no body');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data:')) continue;

        const payload = trimmed.slice(5).trim();
        if (payload === '[DONE]') return;

        try {
          const parsed = JSON.parse(payload);
          const delta: string | undefined = parsed?.choices?.[0]?.delta?.content;
          if (delta) yield delta;
        } catch {
          // ignore malformed chunks
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}

export async function streamChatToCallback(
  messages: ApiChatMessage[],
  onToken: (token: string) => void,
  signal?: AbortSignal,
): Promise<string> {
  let full = '';
  for await (const token of streamChatMessage(messages, signal)) {
    full += token;
    onToken(token);
  }
  return full;
}

export async function askQuestion(question: string, signal?: AbortSignal): Promise<string> {
  return streamChatToCallback([{ role: 'user', content: question }], () => {}, signal);
}
