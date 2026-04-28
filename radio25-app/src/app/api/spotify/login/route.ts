import { NextResponse } from 'next/server';
import { getAuthUrl } from '@/services/spotify';

export async function GET(request: Request) {
  const { origin } = new URL(request.url);
  const redirectUri = `${origin}/api/spotify/callback`;
  const state = crypto.randomUUID();

  const authUrl = getAuthUrl(redirectUri, state);
  if (!authUrl) {
    return NextResponse.json(
      { error: 'Spotify ist nicht konfiguriert.' },
      { status: 500 },
    );
  }

  // Store state in a cookie for CSRF protection
  const response = NextResponse.redirect(authUrl);
  response.cookies.set('spotify_auth_state', state, {
    httpOnly: true,
    maxAge: 300,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });

  return response;
}
