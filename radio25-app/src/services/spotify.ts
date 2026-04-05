// Server-side Spotify helpers: Client Credentials for search, token management for playback

const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';
const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';

// Scopes needed for Web Playback SDK
const SCOPES = [
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-modify-playback-state',
  'user-read-playback-state',
].join(' ');

function getCredentials() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || clientId === 'your-spotify-client-id-here') return null;
  if (!clientSecret || clientSecret === 'your-spotify-client-secret-here') return null;
  return { clientId, clientSecret };
}

export function isSpotifyConfigured(): boolean {
  return getCredentials() !== null;
}

// --- Client Credentials Flow (for search, no user login needed) ---

let clientToken: { token: string; expiresAt: number } | null = null;

async function getClientToken(): Promise<string | null> {
  const creds = getCredentials();
  if (!creds) return null;

  if (clientToken && Date.now() < clientToken.expiresAt) {
    return clientToken.token;
  }

  const res = await fetch(SPOTIFY_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${creds.clientId}:${creds.clientSecret}`).toString('base64')}`,
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) {
    console.warn('[spotify] Failed to get client token:', res.status);
    return null;
  }

  const data = await res.json();
  clientToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };
  return clientToken.token;
}

// --- Search for tracks ---

export interface SpotifyTrack {
  uri: string;
  name: string;
  artist: string;
  durationMs: number;
  previewUrl: string | null;
}

export async function searchTracks(query: string, limit = 5): Promise<SpotifyTrack[]> {
  const token = await getClientToken();
  if (!token) return [];

  try {
    const params = new URLSearchParams({
      q: query,
      type: 'track',
      limit: String(limit),
      market: 'CH',
    });

    const res = await fetch(`${SPOTIFY_API_BASE}/search?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) return [];

    const data = await res.json();
    return (data.tracks?.items || []).map((t: Record<string, unknown>) => ({
      uri: t.uri as string,
      name: t.name as string,
      artist: ((t.artists as Array<{ name: string }>)?.[0]?.name) || 'Unknown',
      durationMs: t.duration_ms as number,
      previewUrl: t.preview_url as string | null,
    }));
  } catch (error) {
    console.warn('[spotify] Search failed:', error);
    return [];
  }
}

export async function getRandomTrack(genre?: string): Promise<SpotifyTrack | null> {
  // Search with genre-based queries for variety
  const queries = [
    genre ? `genre:${genre}` : 'Swiss radio hits',
    'chill instrumental',
    'pop hits 2025',
    'acoustic chill',
    'indie radio',
  ];
  const query = queries[Math.floor(Math.random() * queries.length)];
  const offset = Math.floor(Math.random() * 20);

  const token = await getClientToken();
  if (!token) return null;

  try {
    const params = new URLSearchParams({
      q: query,
      type: 'track',
      limit: '1',
      offset: String(offset),
      market: 'CH',
    });

    const res = await fetch(`${SPOTIFY_API_BASE}/search?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) return null;

    const data = await res.json();
    const track = data.tracks?.items?.[0];
    if (!track) return null;

    return {
      uri: track.uri,
      name: track.name,
      artist: track.artists?.[0]?.name || 'Unknown',
      durationMs: track.duration_ms,
      previewUrl: track.preview_url,
    };
  } catch (error) {
    console.warn('[spotify] Random track fetch failed:', error);
    return null;
  }
}

// --- OAuth Authorization Code Flow (for Web Playback SDK) ---

export function getAuthUrl(redirectUri: string, state: string): string | null {
  const creds = getCredentials();
  if (!creds) return null;

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: creds.clientId,
    scope: SCOPES,
    redirect_uri: redirectUri,
    state,
  });

  return `${SPOTIFY_AUTH_URL}?${params}`;
}

export async function exchangeCode(
  code: string,
  redirectUri: string,
): Promise<{ accessToken: string; refreshToken: string; expiresIn: number } | null> {
  const creds = getCredentials();
  if (!creds) return null;

  const res = await fetch(SPOTIFY_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${creds.clientId}:${creds.clientSecret}`).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    }),
  });

  if (!res.ok) {
    console.warn('[spotify] Token exchange failed:', res.status);
    return null;
  }

  const data = await res.json();
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
  };
}

export async function refreshAccessToken(
  refreshToken: string,
): Promise<{ accessToken: string; expiresIn: number } | null> {
  const creds = getCredentials();
  if (!creds) return null;

  const res = await fetch(SPOTIFY_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${creds.clientId}:${creds.clientSecret}`).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  if (!res.ok) return null;

  const data = await res.json();
  return {
    accessToken: data.access_token,
    expiresIn: data.expires_in,
  };
}
