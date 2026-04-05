import { NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import type { UserPreferences } from '@/lib/types';

const PREFS_FILE = path.join(process.cwd(), 'src', 'data', 'preferences.json');

async function readPrefs(): Promise<Record<string, UserPreferences>> {
  try {
    const data = await readFile(PREFS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

async function writePrefs(prefs: Record<string, UserPreferences>): Promise<void> {
  await writeFile(PREFS_FILE, JSON.stringify(prefs, null, 2), 'utf-8');
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'userId parameter required' }, { status: 400 });
  }

  const prefs = await readPrefs();
  const userPrefs = prefs[userId];

  if (!userPrefs) {
    return NextResponse.json(null);
  }

  return NextResponse.json(userPrefs);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const prefs = await readPrefs();
    const now = new Date().toISOString();

    prefs[body.userId] = {
      userId: body.userId,
      topics: body.topics || ['politik', 'wirtschaft', 'sport'],
      location: body.location || 'Zürich',
      voiceStyle: body.voiceStyle || 'casual',
      language: body.language || 'de',
      createdAt: prefs[body.userId]?.createdAt || now,
      updatedAt: now,
    };

    await writePrefs(prefs);
    return NextResponse.json(prefs[body.userId]);
  } catch (error) {
    console.error('[api/preferences] Error:', error);
    return NextResponse.json(
      { error: 'Einstellungen konnten nicht gespeichert werden.' },
      { status: 500 },
    );
  }
}
