import type { Segment, ShowConfig, ShowResult } from './types';
import { fetchNews } from '@/services/news';
import { fetchWeather } from '@/services/weather';
import { generateRadioText } from '@/services/llm';
import { textToSpeech } from '@/services/tts';
import { pickTrack } from '@/services/music';

export async function generateShow(config: ShowConfig): Promise<ShowResult> {
  const showId = crypto.randomUUID();
  const startTime = Date.now();

  console.log(`[orchestrator] Starting show generation: ${showId}`);

  // 1. Fetch news and weather in parallel
  console.log('[orchestrator] Fetching news and weather...');
  const [news, weather] = await Promise.all([
    fetchNews(config.topics),
    fetchWeather(config.location),
  ]);
  console.log(`[orchestrator] Data fetched in ${Date.now() - startTime}ms`);

  // 2. Pick music tracks (may involve Spotify API calls)
  const [music1, music2] = await Promise.all([pickTrack(), pickTrack()]);

  // 3. Build segment plan
  const segments: Segment[] = [
    { id: crypto.randomUUID(), type: 'jingle', audioUrl: '/jingles/intro.mp3' },
    { id: crypto.randomUUID(), type: 'greeting' },
    { id: crypto.randomUUID(), type: 'news', data: news },
    {
      id: crypto.randomUUID(),
      type: 'music',
      audioUrl: music1.audioUrl,
      spotifyUri: music1.spotifyUri,
      spotifyTrackName: music1.trackName,
    },
    { id: crypto.randomUUID(), type: 'weather', data: weather },
    {
      id: crypto.randomUUID(),
      type: 'music',
      audioUrl: music2.audioUrl,
      spotifyUri: music2.spotifyUri,
      spotifyTrackName: music2.trackName,
    },
    { id: crypto.randomUUID(), type: 'farewell' },
    { id: crypto.randomUUID(), type: 'jingle', audioUrl: '/jingles/outro.mp3' },
  ];

  // 4. Generate text for segments that need it (greeting, news, weather, farewell)
  const textSegments = segments.filter(
    (s) => s.type === 'greeting' || s.type === 'news' || s.type === 'weather' || s.type === 'farewell',
  );

  console.log(`[orchestrator] Generating text for ${textSegments.length} segments...`);
  for (const segment of textSegments) {
    const textStart = Date.now();
    segment.text = await generateRadioText(segment.type, segment.data, config);
    console.log(`[orchestrator] Text for ${segment.type}: ${Date.now() - textStart}ms`);
  }

  // 5. Convert text to audio via TTS
  console.log('[orchestrator] Converting text to speech...');
  for (const segment of textSegments) {
    if (segment.text) {
      const ttsStart = Date.now();
      const audioUrl = await textToSpeech(segment.text, segment.id);
      if (audioUrl) {
        segment.audioUrl = audioUrl;
      }
      console.log(`[orchestrator] TTS for ${segment.type}: ${Date.now() - ttsStart}ms`);
    }
  }

  const totalDurationMs = Date.now() - startTime;
  console.log(`[orchestrator] Show generated in ${totalDurationMs}ms`);

  return {
    showId,
    segments,
    generatedAt: new Date().toISOString(),
    totalDurationMs,
  };
}
