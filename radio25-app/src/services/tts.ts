import { writeFile } from 'fs/promises';
import path from 'path';

const AUDIO_DIR = path.join(process.cwd(), 'public', 'audio');

export async function textToSpeech(text: string, segmentId: string): Promise<string> {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID;

  if (!apiKey || apiKey === 'your-elevenlabs-api-key-here' || !voiceId || voiceId === 'your-voice-id-here') {
    console.log(`[tts] Using mock audio for segment: ${segmentId}`);
    // Return empty string — AudioPlayer will skip segments without audioUrl
    // In a real mock, we could generate a silent MP3, but for now this is fine
    return '';
  }

  try {
    const { ElevenLabsClient } = await import('elevenlabs');

    const client = new ElevenLabsClient({ apiKey });
    const audioStream = await client.textToSpeech.convert(
      voiceId || 'pNInz6obpgDQGcFmaJgB', // Default: "Adam" multilingual voice
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
