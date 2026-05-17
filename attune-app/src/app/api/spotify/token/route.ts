import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { refreshAccessToken } from '@/services/spotify';

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('spotify_access_token')?.value;
  const refreshToken = cookieStore.get('spotify_refresh_token')?.value;

  // Already have a valid token
  if (accessToken) {
    return NextResponse.json({ accessToken });
  }

  // Try to refresh
  if (refreshToken) {
    const refreshed = await refreshAccessToken(refreshToken);
    if (refreshed) {
      const response = NextResponse.json({ accessToken: refreshed.accessToken });
      response.cookies.set('spotify_access_token', refreshed.accessToken, {
        httpOnly: true,
        maxAge: refreshed.expiresIn,
        sameSite: 'lax',
      });
      return response;
    }
  }

  // No valid session
  return NextResponse.json({ accessToken: null });
}
