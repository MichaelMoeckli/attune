import type { VoiceStyle } from '@/lib/types';

const DEFAULT_VOICE_ID = 'pNInz6obpgDQGcFmaJgB';

const STYLE_ENV_VAR: Record<VoiceStyle, string> = {
  formal: 'ELEVENLABS_VOICE_ID_FORMAL',
  casual: 'ELEVENLABS_VOICE_ID_CASUAL',
  energetic: 'ELEVENLABS_VOICE_ID_ENERGETIC',
};

const VOICE_SETTINGS_BY_STYLE: Record<VoiceStyle, {
  stability: number;
  similarity_boost: number;
  style: number;
  use_speaker_boost: boolean;
}> = {
  formal:    { stability: 0.55, similarity_boost: 0.75, style: 0.20, use_speaker_boost: true },
  casual:    { stability: 0.40, similarity_boost: 0.75, style: 0.45, use_speaker_boost: true },
  energetic: { stability: 0.30, similarity_boost: 0.80, style: 0.65, use_speaker_boost: true },
};

function resolveVoiceId(voiceStyle?: VoiceStyle): string | undefined {
  if (voiceStyle) {
    const styleVoiceId = process.env[STYLE_ENV_VAR[voiceStyle]];
    if (styleVoiceId && styleVoiceId !== 'your-voice-id-here') {
      return styleVoiceId;
    }
  }
  const fallback = process.env.ELEVENLABS_VOICE_ID;
  if (fallback && fallback !== 'your-voice-id-here') {
    return fallback;
  }
  return undefined;
}

export function getTtsVoiceId(voiceStyle?: VoiceStyle, forceMock?: boolean): string {
  const mock = forceMock === true || process.env.USE_MOCK_TTS === 'true';
  if (mock) return 'browser-tts';
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = resolveVoiceId(voiceStyle);
  if (!apiKey || apiKey === 'your-elevenlabs-api-key-here' || !voiceId) {
    return 'mock';
  }
  return voiceId;
}

export async function textToSpeech(
  text: string,
  segmentId: string,
  voiceStyle?: VoiceStyle,
  forceMock?: boolean,
): Promise<string> {
  const mock = forceMock === true || process.env.USE_MOCK_TTS === 'true';
  // Mock mode: skip ElevenLabs, let the browser handle TTS via Web Speech API
  if (mock) {
    console.log(`[tts] Mock mode — browser TTS will be used for: ${segmentId}`);
    return 'browser-tts';
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = resolveVoiceId(voiceStyle);

  if (!apiKey || apiKey === 'your-elevenlabs-api-key-here' || !voiceId) {
    console.log(`[tts] Using mock audio for segment: ${segmentId}`);
    return '';
  }

  try {
    const { ElevenLabsClient } = await import('elevenlabs');

    const client = new ElevenLabsClient({ apiKey });
    const voiceSettings = VOICE_SETTINGS_BY_STYLE[voiceStyle ?? 'casual'];
    const audioStream = await client.textToSpeech.convert(
      voiceId || DEFAULT_VOICE_ID,
      {
        text,
        model_id: 'eleven_multilingual_v2',
        output_format: 'mp3_44100_128',
        voice_settings: voiceSettings,
      },
    );

    // Collect stream into buffer
    const chunks: Buffer[] = [];
    for await (const chunk of audioStream) {
      chunks.push(Buffer.from(chunk));
    }
    const buffer = Buffer.concat(chunks);

    // Return audio inline as a data URL — Vercel's filesystem is read-only at runtime.
    return `data:audio/mpeg;base64,${buffer.toString('base64')}`;
  } catch (error) {
    console.warn(`[tts] TTS failed for ${segmentId}:`, error);
    return '';
  }
}
