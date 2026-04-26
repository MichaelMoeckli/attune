import { writeFile } from 'fs/promises';
import path from 'path';

const AUDIO_DIR = path.join(process.cwd(), 'public', 'audio');
const DEFAULT_VOICE_ID = 'pNInz6obpgDQGcFmaJgB';

export function getTtsVoiceId(): string {
  if (process.env.USE_MOCK_TTS === 'true') return 'browser-tts';
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID;
  if (!apiKey || apiKey === 'your-elevenlabs-api-key-here' || !voiceId || voiceId === 'your-voice-id-here') {
    return 'mock';
  }
  return voiceId;
}

export async function textToSpeech(text: string, segmentId: string): Promise<string> {
  // Mock mode: skip ElevenLabs, let the browser handle TTS via Web Speech API
  if (process.env.USE_MOCK_TTS === 'true') {
    console.log(`[tts] Mock mode — browser TTS will be used for: ${segmentId}`);
    return 'browser-tts';
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID;

  if (!apiKey || apiKey === 'your-elevenlabs-api-key-here' || !voiceId || voiceId === 'your-voice-id-here') {
    console.log(`[tts] Using mock audio for segment: ${segmentId}`);
    return '';
  }

  try {
    const { ElevenLabsClient } = await import('elevenlabs');

    const client = new ElevenLabsClient({ apiKey });
    const audioStream = await client.textToSpeech.convert(
      voiceId || DEFAULT_VOICE_ID,
      {
        text,
        model_id: 'eleven_multilingual_v2',
        output_format: 'mp3_44100_128',
      },
    );

    // Collect stream into buffer
    const chunks: Buffer[] = [];
    for await (const chunk of audioStream) {
      chunks.push(Buffer.from(chunk));
    }
    const buffer = Buffer.concat(chunks);

    // Write to public/audio/
    const filename = `${segmentId}.mp3`;
    const filePath = path.join(AUDIO_DIR, filename);
    await writeFile(filePath, buffer);

    return `/audio/${filename}`;
  } catch (error) {
    console.warn(`[tts] TTS failed for ${segmentId}:`, error);
    return '';
  }
}
