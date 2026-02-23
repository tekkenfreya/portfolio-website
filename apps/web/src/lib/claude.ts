import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

interface ClaudeOptions {
  systemPrompt?: string;
  maxTokens?: number;
  temperature?: number;
}

export async function generateWithClaude(
  prompt: string,
  options: ClaudeOptions = {}
): Promise<string> {
  const {
    systemPrompt,
    maxTokens = 1024,
    temperature = 0.7,
  } = options;

  const response = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: maxTokens,
    temperature,
    ...(systemPrompt ? { system: systemPrompt } : {}),
    messages: [{ role: 'user', content: prompt }],
  });

  const textBlock = response.content.find((block) => block.type === 'text');
  return textBlock?.text || '';
}

export async function generateJsonWithClaude<T>(
  prompt: string,
  options: ClaudeOptions = {}
): Promise<T> {
  const result = await generateWithClaude(prompt, {
    ...options,
    temperature: options.temperature ?? 0.3,
  });

  // Extract JSON from the response (handle markdown code blocks)
  const jsonMatch = result.match(/```(?:json)?\s*([\s\S]*?)```/);
  const jsonStr = jsonMatch ? jsonMatch[1].trim() : result.trim();

  return JSON.parse(jsonStr) as T;
}

export async function generateWithClaudeStream(
  prompt: string,
  options: ClaudeOptions = {}
) {
  const {
    systemPrompt,
    maxTokens = 1024,
    temperature = 0.7,
  } = options;

  return anthropic.messages.stream({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: maxTokens,
    temperature,
    ...(systemPrompt ? { system: systemPrompt } : {}),
    messages: [{ role: 'user', content: prompt }],
  });
}
