import type { APIRoute } from 'astro';
import { SYSTEM_PROMPT } from '../../lib/context';
import type { ChatRequestBody } from '../../lib/types/chat';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.OPENAI_API_KEY;
  if (!apiKey) {
    return jsonResponse({ error: 'Missing OPENAI_API_KEY' }, 500);
  }

  let body: ChatRequestBody;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }

  const messages = body?.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return jsonResponse({ error: 'messages array is required' }, 400);
  }

  const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      stream: true,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
    }),
  });

  if (!openaiResponse.ok || !openaiResponse.body) {
    const details = await openaiResponse.text().catch(() => '');
    return jsonResponse({ error: 'OpenAI request failed', details }, openaiResponse.status);
  }

  return new Response(openaiResponse.body, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
};

function jsonResponse(payload: unknown, status: number): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
