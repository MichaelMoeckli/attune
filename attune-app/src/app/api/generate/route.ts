import { NextResponse } from 'next/server';
import type { ProgressEvent, ShowConfig } from '@/lib/types';
import { generateShow } from '@/lib/orchestrator';

export const maxDuration = 60; // Allow up to 60s for show generation

const ALLOWED_TOPICS = new Set([
  'politik', 'international', 'schweiz', 'wirtschaft', 'finanzen',
  'sport', 'technologie', 'kultur', 'wissenschaft', 'gesellschaft', 'zuerich',
]);
const ALLOWED_VOICE_STYLES = new Set(['formal', 'casual', 'energetic']);
const ALLOWED_LANGUAGES = new Set(['de', 'en']);
const ALLOWED_LENGTHS = new Set([5, 10, 15]);

function badRequest(error: string) {
  return NextResponse.json({ error }, { status: 400 });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const topics: unknown = body.topics;
    if (!Array.isArray(topics) || topics.length === 0 || topics.length > 10) {
      return badRequest('Mindestens ein und höchstens zehn Themen müssen ausgewählt werden.');
    }
    const validTopics = topics.filter(
      (t): t is string => typeof t === 'string' && ALLOWED_TOPICS.has(t),
    );
    if (validTopics.length === 0) {
      return badRequest('Mindestens ein gültiges Thema muss ausgewählt werden.');
    }

    const voiceStyle = typeof body.voiceStyle === 'string' && ALLOWED_VOICE_STYLES.has(body.voiceStyle)
      ? (body.voiceStyle as ShowConfig['voiceStyle'])
      : 'casual';

    const language = typeof body.language === 'string' && ALLOWED_LANGUAGES.has(body.language)
      ? (body.language as ShowConfig['language'])
      : 'de';

    const targetLengthMin = ALLOWED_LENGTHS.has(body.targetLengthMin)
      ? (body.targetLengthMin as ShowConfig['targetLengthMin'])
      : 10;

    // Strip control chars and cap length to limit prompt-injection / log-spam surface.
    const rawLocation = typeof body.location === 'string' ? body.location : 'Zürich';
    const location = rawLocation.replace(/[\r\n\t]/g, ' ').trim().slice(0, 100) || 'Zürich';

    const userId = typeof body.userId === 'string' ? body.userId.slice(0, 100) : 'anonymous';

    const useMockTts = typeof body.useMockTts === 'boolean' ? body.useMockTts : undefined;
    const includeMusic = typeof body.includeMusic === 'boolean' ? body.includeMusic : true;

    const config: ShowConfig = {
      userId,
      topics: validTopics,
      location,
      voiceStyle,
      language,
      targetLengthMin,
      includeMusic,
      useMockTts,
    };

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        const enc = new TextEncoder();
        let closed = false;
        const send = (e: ProgressEvent) => {
          if (closed) return;
          try {
            controller.enqueue(enc.encode(JSON.stringify(e) + '\n'));
          } catch {
            // Client disconnected — stop trying to write but let the orchestrator finish.
            closed = true;
          }
        };
        try {
          const result = await generateShow(config, send);
          send({ type: 'done', result });
        } catch (err) {
          console.error('[api/generate] Error:', err);
          send({
            type: 'error',
            message: 'Sendung konnte nicht generiert werden. Bitte versuchen Sie es erneut.',
          });
        } finally {
          if (!closed) {
            try { controller.close(); } catch { /* already closed */ }
          }
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'application/x-ndjson; charset=utf-8',
        'Cache-Control': 'no-store',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (error) {
    console.error('[api/generate] Error:', error);
    return NextResponse.json(
      { error: 'Sendung konnte nicht generiert werden. Bitte versuchen Sie es erneut.' },
      { status: 500 },
    );
  }
}
