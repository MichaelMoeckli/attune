import { NextResponse } from 'next/server';
import type { ShowConfig } from '@/lib/types';
import { generateShow } from '@/lib/orchestrator';

export const maxDuration = 60; // Allow up to 60s for show generation

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const config: ShowConfig = {
      userId: body.userId || 'anonymous',
      topics: body.topics || ['politik', 'wirtschaft', 'sport'],
      location: body.location || 'Zürich',
      voiceStyle: body.voiceStyle || 'casual',
      language: body.language || 'de',
    };

    if (!Array.isArray(config.topics) || config.topics.length === 0) {
      return NextResponse.json(
        { error: 'Mindestens ein Thema muss ausgewählt werden.' },
        { status: 400 },
      );
    }

    const result = await generateShow(config);
    return NextResponse.json(result);
  } catch (error) {
    console.error('[api/generate] Error:', error);
    return NextResponse.json(
      { error: 'Sendung konnte nicht generiert werden. Bitte versuchen Sie es erneut.' },
      { status: 500 },
    );
  }
}
