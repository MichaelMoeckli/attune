import { NextResponse } from 'next/server';
import { createSession, SESSION_COOKIE_NAME, SESSION_TTL_SECONDS } from '@/lib/session';

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function POST(request: Request) {
  const expected = process.env.DEMO_PASSWORD;
  if (!expected) {
    return NextResponse.json({ error: 'Auth not configured' }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
  const password = typeof (body as { password?: unknown })?.password === 'string'
    ? (body as { password: string }).password
    : '';

  if (!constantTimeEqual(password, expected)) {
    // Small server-side delay discourages casual brute-forcing; not a substitute for rate limiting.
    await new Promise((r) => setTimeout(r, 500));
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const token = await createSession();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  });
  return response;
}
