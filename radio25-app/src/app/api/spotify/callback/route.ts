import { NextResponse } from 'next/server';
import { exchangeCode } from '@/services/spotify';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const error = url.searchParams.get('error');

  if (error) {
    return NextResponse.redirect(`${url.origin}/?spotifyError=${error}`);
  }

  // Verify CSRF state
  const cookies = request.headers.get('cookie') || '';
  const stateCookie = cookies
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith('spotify_auth_state='));
  const storedState = stateCookie?.split('=')[1];

  if (!code || !state || state !== storedState) {
    return NextResponse.redirect(`${url.origin}/?spotifyError=state_mismatch`);
  }

  const redirectUri = `${url.origin}/api/spotify/callback`;
  const tokens = await exchangeCode(code, redirectUri);

  if (!tokens) {
    return NextResponse.redirect(`${url.origin}/?spotifyError=token_exchange_failed`);
  }

  // Store tokens in httpOnly cookies
  const response = NextResponse.redirect(`${url.origin}/?spotifyConnected=true`);

  const isProd = process.env.NODE_ENV === 'production';

  response.cookies.set('spotify_access_token', tokens.accessToken, {
    httpOnly: true,
    maxAge: tokens.expiresIn,
    sameSite: 'lax',
    secure: isProd,
    path: '/',
  });

  response.cookies.set('spotify_refresh_token', tokens.refreshToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30, // 30 days
    sameSite: 'lax',
    secure: isProd,
    path: '/',
  });

  // Clear the auth state cookie
  response.cookies.delete('spotify_auth_state');

  return response;
}
