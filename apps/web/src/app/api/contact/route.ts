import { NextRequest, NextResponse } from 'next/server';
import { generateJsonWithClaude } from '@/lib/claude';
import { saveContact } from '@/lib/supabase';
import { getClientIp, checkRateLimit, rateLimitResponse } from '@/lib/rateLimit';
import type { ContactFormInput, ContactFormOutput, ApiResponse } from '@gowater-portfolio/types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ClaudeContactResult = Omit<ContactFormOutput, 'saved'>;

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(ip, 'contact', { maxRequests: 5, windowMs: 24 * 60 * 60 * 1000 });
  if (!rateLimit.allowed) return rateLimitResponse(rateLimit.resetAt);

  try {
    const body = (await request.json()) as Partial<ContactFormInput>;

    if (!body.name || typeof body.name !== 'string' || body.name.trim().length === 0) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: 'Name is required.' },
        { status: 400 },
      );
    }
    if (!body.email || !EMAIL_REGEX.test(body.email.trim())) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 },
      );
    }
    if (!body.message || typeof body.message !== 'string' || body.message.trim().length < 20) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: 'Message must be at least 20 characters.' },
        { status: 400 },
      );
    }

    const input: ContactFormInput = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      company: body.company?.trim() || undefined,
      message: body.message.trim().slice(0, 2000),
    };

    const prompt = `You are analyzing a contact form submission for an AI automation specialist's portfolio.

From: ${input.name}${input.company ? ` at ${input.company}` : ''}
Email: ${input.email}
Message: ${input.message}

Analyze this message and generate a personalized response.

Return ONLY a valid JSON object with this exact structure — no explanation, no markdown, just raw JSON:
{
  "aiAnalysis": {
    "intent": "brief description of why they are reaching out (e.g. project inquiry, consultation request, partnership proposal)",
    "urgency": "high" or "medium" or "low",
    "topics": ["array", "of", "relevant", "topics", "mentioned"]
  },
  "personalizedResponse": "2-3 sentence warm professional response that directly addresses their specific needs and situation"
}`;

    const claudeResult = await generateJsonWithClaude<ClaudeContactResult>(prompt, {
      maxTokens: 512,
      temperature: 0,
    });

    void saveContact(
      input.name,
      input.email,
      input.company ?? null,
      input.message,
      claudeResult.aiAnalysis as unknown as Record<string, unknown>,
      claudeResult.personalizedResponse,
    );

    const output: ContactFormOutput = { ...claudeResult, saved: true };

    return NextResponse.json<ApiResponse<ContactFormOutput>>({
      success: true,
      data: output,
    });
  } catch (error) {
    console.error('[contact] error:', error);
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 },
    );
  }
}
