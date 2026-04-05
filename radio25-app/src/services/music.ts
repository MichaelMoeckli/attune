import { readdirSync } from 'fs';
import path from 'path';
import { isSpotifyConfigured, getRandomTrack, type SpotifyTrack } from './spotify';

const MUSIC_DIR = path.join(process.cwd(), 'public', 'music');

export interface MusicSelection {
  type: 'local' | 'spotify';
  audioUrl?: string;
  spotifyUri?: string;
  trackName?: string;
}

function pickLocalTrack(): string | null {
  try {
    const files = readdirSync(MUSIC_DIR).filter((f) =>
      f.toLowerCase().endsWith('.mp3'),
    );

    if (files.length === 0) return null;

    const randomFile = files[Math.floor(Math.random() * files.length)];
    return `/music/${randomFile}`;
  } catch {
    return null;
  }
}

export async function pickTrack(): Promise<MusicSelection> {
  // Try Spotify first if configured
  if (isSpotifyConfigured()) {
    try {
      const track: SpotifyTrack | null = await getRandomTrack();
      if (track) {
        console.log(`[music] Spotify track selected: ${track.artist} — ${track.name}`);
        return {
          type: 'spotify',
          spotifyUri: track.uri,
          trackName: `${track.artist} — ${track.name}`,
        };
      }
    } catch (error) {
      console.warn('[music] Spotify fetch failed, falling back to local:', error);
    }
  }

  // Fallback to local MP3
  const localUrl = pickLocalTrack();
  if (localUrl) {
    console.log(`[music] Local track selected: ${localUrl}`);
    return { type: 'local', audioUrl: localUrl };
  }

  console.warn('[music] No music available (no Spotify, no local files)');
  return { type: 'local' };
}
