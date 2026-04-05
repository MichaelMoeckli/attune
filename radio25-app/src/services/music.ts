import { readdirSync } from 'fs';
import path from 'path';

const MUSIC_DIR = path.join(process.cwd(), 'public', 'music');

export function pickRandomTrack(): string | null {
  try {
    const files = readdirSync(MUSIC_DIR).filter((f) =>
      f.toLowerCase().endsWith('.mp3'),
    );

    if (files.length === 0) {
      console.warn('[music] No MP3 files found in public/music/');
      return null;
    }

    const randomFile = files[Math.floor(Math.random() * files.length)];
    return `/music/${randomFile}`;
  } catch (error) {
    console.warn('[music] Failed to read music directory:', error);
    return null;
  }
}
