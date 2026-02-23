import { NextRequest, NextResponse } from 'next/server';

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap) {
    if (entry.resetAt < now) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

export function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1'
  );
}

export function hashIp(ip: string): string {
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

interface RateLimitOptions {
  maxRequests: number;
  windowMs: number;
}

export function checkRateLimit(
  ip: string,
  demoType: string,
  options: RateLimitOptions = { maxRequests: 10, windowMs: 24 * 60 * 60 * 1000 }
): { allowed: boolean; remaining: number; resetAt: number } {
  const key = `${demoType}:${ip}`;
  const now = Date.now();

  const entry = rateLimitMap.get(key);

  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(key, { count: 1, resetAt: now + options.windowMs });
    return { allowed: true, remaining: options.maxRequests - 1, resetAt: now + options.windowMs };
  }

  if (entry.count >= options.maxRequests) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count++;
  return { allowed: true, remaining: options.maxRequests - entry.count, resetAt: entry.resetAt };
}

export function rateLimitResponse(resetAt: number): NextResponse {
  const retryAfter = Math.ceil((resetAt - Date.now()) / 1000);
  return NextResponse.json(
    {
      success: false,
      error: 'Demo limit reached. Contact me directly for unlimited access!',
      retryAfter,
    },
    {
      status: 429,
      headers: { 'Retry-After': retryAfter.toString() },
    }
  );
}
