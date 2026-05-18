const JAMENDO_API_BASE = 'https://api.jamendo.com/v3.0';

export interface JamendoTrack {
  name: string;
  artist: string;
  audioUrl: string;
  durationMs: number;
}

export function isJamendoConfigured(): boolean {
  const clientId = process.env.JAMENDO_CLIENT_ID;
  return !!clientId && clientId !== 'your-jamendo-client-id-here';
}

function getClientId(): string {
  return process.env.JAMENDO_CLIENT_ID!;
}

const POP_TAGS = ['pop', 'synthpop', 'popdance', 'electropop'];

export async function getRandomTrack(): Promise<JamendoTrack | null> {
  const tag = POP_TAGS[Math.floor(Math.random() * POP_TAGS.length)];
  const offset = Math.floor(Math.random() * 41);

  const params = new URLSearchParams({
    client_id: getClientId(),
    format: 'json',
    limit: '10',
    offset: String(offset),
    tags: tag,
    order: 'popularity_total',
    audioformat: 'mp32',
  });

  try {
    const res = await fetch(`${JAMENDO_API_BASE}/tracks/?${params}`);
    if (!res.ok) {
      console.warn('[jamendo] API request failed:', res.status);
      return null;
    }

    const data = await res.json();

    if (data.headers?.status === 'failed') {
      console.warn('[jamendo] API error:', data.headers.error_message);
      return null;
    }

    const results = data.results;
    if (!results || results.length === 0) {
      console.warn('[jamendo] No tracks found for tag:', tag);
      return null;
    }

    // Pick a random track from the results for variety
    const track = results[Math.floor(Math.random() * results.length)];

    return {
      name: track.name,
      artist: track.artist_name,
      audioUrl: track.audio,
      durationMs: track.duration * 1000,
    };
  } catch (error) {
    console.warn('[jamendo] Fetch failed:', error);
    return null;
  }
}
