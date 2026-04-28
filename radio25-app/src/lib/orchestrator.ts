import type { PipelineStep, Segment, ShowConfig, ShowResult } from './types';
import { fetchNews } from '@/services/news';
import { fetchWeather } from '@/services/weather';
import { generateRadioText, LLM_MODEL } from '@/services/llm';
import { getTtsVoiceId, textToSpeech } from '@/services/tts';
import { pickTrack } from '@/services/music';

const NEWS_ARTICLE_COUNT: Record<number, number> = { 5: 3, 10: 5, 15: 8 };
const MAX_TOKENS_BY_LENGTH: Record<number, number> = { 5: 250, 10: 500, 15: 750 };

export async function generateShow(config: ShowConfig): Promise<ShowResult> {
  const showId = crypto.randomUUID();
  const startTime = Date.now();
  const pipelineSteps: PipelineStep[] = [];

  const recordStep = (step: string, stepStart: number, detail?: string) => {
    const durationMs = Date.now() - stepStart;
    pipelineSteps.push({ step, durationMs, detail });
    console.log(`[orchestrator] ${step}: ${durationMs}ms${detail ? ` (${detail})` : ''}`);
  };

  console.log(`[orchestrator] Starting show generation: ${showId}`);

  const targetLength = config.targetLengthMin ?? 10;
  const maxArticles = NEWS_ARTICLE_COUNT[targetLength] ?? 5;
  const maxTokens = MAX_TOKENS_BY_LENGTH[targetLength] ?? 500;

  // 1. Fetch news and weather in parallel
  const fetchStart = Date.now();
  const [news, weather] = await Promise.all([
    fetchNews(config.topics, maxArticles),
    fetchWeather(config.location),
  ]);
  recordStep('fetch-news', fetchStart, `${news.length} Artikel`);
  recordStep('fetch-weather', fetchStart, config.location);

  // 2. Pick music tracks
  const musicStart = Date.now();
  const [music1, music2] = await Promise.all([pickTrack(), pickTrack()]);
  recordStep('pick-music', musicStart, `2 Tracks`);

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

  // 4. Generate text for segments that need it
  const textSegments = segments.filter(
    (s) => s.type === 'greeting' || s.type === 'news' || s.type === 'weather' || s.type === 'farewell',
  );

  for (const segment of textSegments) {
    const stepStart = Date.now();
    segment.text = await generateRadioText(segment.type, segment.data, config, maxTokens);
    recordStep(`llm-${segment.type}`, stepStart);
  }

  // 5. Convert text to audio via TTS
  for (const segment of textSegments) {
    if (segment.text) {
      const stepStart = Date.now();
      const audioUrl = await textToSpeech(segment.text, segment.id, config.useMockTts);
      if (audioUrl) {
        segment.audioUrl = audioUrl;
      }
      recordStep(`tts-${segment.type}`, stepStart);
    }
  }

  const totalDurationMs = Date.now() - startTime;
  console.log(`[orchestrator] Show generated in ${totalDurationMs}ms`);

  return {
    showId,
    segments,
    generatedAt: new Date().toISOString(),
    totalDurationMs,
    model: LLM_MODEL,
    ttsVoiceId: getTtsVoiceId(config.useMockTts),
    topicsUsed: config.topics,
    locationUsed: config.location,
    voiceStyleUsed: config.voiceStyle,
    targetLengthMin: targetLength,
    pipelineSteps,
  };
}
