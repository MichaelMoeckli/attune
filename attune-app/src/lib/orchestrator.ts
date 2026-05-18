import type { NewsArticle, PipelineStep, ProgressEvent, Segment, ShowConfig, ShowResult, WeatherData } from './types';
import { fetchNews, selectNews } from '@/services/news';
import { fetchWeather } from '@/services/weather';
import { generateRadioText, LLM_MODEL } from '@/services/llm';
import { getTtsVoiceId, textToSpeech } from '@/services/tts';
import { pickTrack, type MusicSelection } from '@/services/music';
import { checkSpokenSources } from './source-check';

const NEWS_ARTICLE_COUNT: Record<number, number> = { 5: 2, 10: 4, 15: 6 };
const MAX_TOKENS_BY_LENGTH: Record<number, number> = { 5: 350, 10: 700, 15: 1100 };
const MUSIC_TRACK_COUNT: Record<number, number> = { 5: 1, 10: 2, 15: 3 };

function buildSegmentPlan(
  news: NewsArticle[],
  weather: WeatherData,
  music: MusicSelection[],
): Segment[] {
  const toMusic = (m: MusicSelection): Segment => ({
    id: crypto.randomUUID(),
    type: 'music',
    audioUrl: m.audioUrl,
    spotifyUri: m.spotifyUri,
    spotifyTrackName: m.trackName,
  });

  // Music slots fill in this priority order: between news/weather, weather/farewell, greeting/news.
  const slot1 = music[0]; // between news and weather
  const slot2 = music[1]; // between weather and farewell
  const slot3 = music[2]; // between greeting and news

  const segments: Segment[] = [];
  segments.push({ id: crypto.randomUUID(), type: 'jingle', audioUrl: '/jingles/intro.mp3' });
  segments.push({ id: crypto.randomUUID(), type: 'greeting' });
  if (slot3) segments.push(toMusic(slot3));
  segments.push({ id: crypto.randomUUID(), type: 'news', data: news });
  if (slot1) segments.push(toMusic(slot1));
  segments.push({ id: crypto.randomUUID(), type: 'weather', data: weather });
  if (slot2) segments.push(toMusic(slot2));
  segments.push({ id: crypto.randomUUID(), type: 'farewell' });
  segments.push({ id: crypto.randomUUID(), type: 'jingle', audioUrl: '/jingles/outro.mp3' });
  return segments;
}

type ProgressFn = (e: ProgressEvent) => void;

export async function generateShow(
  config: ShowConfig,
  onProgress: ProgressFn = () => {},
): Promise<ShowResult> {
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
  const musicTrackCount = config.includeMusic === false
    ? 0
    : (MUSIC_TRACK_COUNT[targetLength] ?? 2);

  // 1. Fetch news and weather in parallel
  onProgress({ type: 'step', key: 'fetch-news', status: 'start' });
  onProgress({ type: 'step', key: 'fetch-weather', status: 'start' });
  const fetchStart = Date.now();
  const now = new Date();
  const [rawNews, weather] = await Promise.all([
    fetchNews(config.topics),
    fetchWeather(config.location),
  ]);
  // Apply selection (capPerTopic + pickSerendipity + applyDaypart) — Hauptdokument Kap. 3.3.3.
  const news = selectNews({ articles: rawNews, topics: config.topics, now, maxArticles });
  const serendipityArticle = news.find(a => a.selectionReason === 'serendipity');
  const newsDetail = serendipityArticle
    ? `${news.length} Artikel · Überraschung: ${serendipityArticle.topic ?? '–'}`
    : `${news.length} Artikel`;
  recordStep('fetch-news', fetchStart, newsDetail);
  recordStep('fetch-weather', fetchStart, config.location);
  onProgress({ type: 'step', key: 'fetch-news', status: 'done' });
  onProgress({ type: 'step', key: 'fetch-weather', status: 'done' });

  // 2. Pick music tracks (count scales with length; 0 when music is disabled)
  onProgress({ type: 'step', key: 'pick-music', status: 'start' });
  const musicStart = Date.now();
  const music = musicTrackCount > 0
    ? await Promise.all(Array.from({ length: musicTrackCount }, () => pickTrack()))
    : [];
  recordStep('pick-music', musicStart, `${music.length} Track${music.length === 1 ? '' : 's'}`);
  onProgress({ type: 'step', key: 'pick-music', status: 'done' });

  // 3. Build segment plan
  const segments = buildSegmentPlan(news, weather, music);

  // 4. Generate text for segments that need it
  const textSegments = segments.filter(
    (s) => s.type === 'greeting' || s.type === 'news' || s.type === 'weather' || s.type === 'farewell',
  );
  const llmTotal = textSegments.length;

  for (let i = 0; i < textSegments.length; i++) {
    const segment = textSegments[i];
    onProgress({
      type: 'segment', phase: 'llm', segmentType: segment.type,
      index: i, total: llmTotal, status: 'start',
    });
    const stepStart = Date.now();
    segment.text = await generateRadioText(segment.type, segment.data, config, maxTokens);
    recordStep(`llm-${segment.type}`, stepStart);

    if (segment.type === 'news' && segment.text && Array.isArray(segment.data)) {
      segment.sourceCheck = checkSpokenSources(segment.text, segment.data);
      if (segment.sourceCheck.hasUnverifiedMention) {
        console.warn(
          `[orchestrator] News segment mentions unverified outlets: ${segment.sourceCheck.unverifiedOutlets.join(', ')}`,
        );
      }
    }
    onProgress({
      type: 'segment', phase: 'llm', segmentType: segment.type,
      index: i, total: llmTotal, status: 'done',
    });
  }

  // 5. Convert text to audio via TTS
  const ttsSegments = textSegments.filter((s) => !!s.text);
  const ttsTotal = ttsSegments.length;
  for (let i = 0; i < ttsSegments.length; i++) {
    const segment = ttsSegments[i];
    onProgress({
      type: 'segment', phase: 'tts', segmentType: segment.type,
      index: i, total: ttsTotal, status: 'start',
    });
    const stepStart = Date.now();
    const audioUrl = await textToSpeech(segment.text!, segment.id, config.voiceStyle, config.useMockTts);
    if (audioUrl) {
      segment.audioUrl = audioUrl;
    }
    recordStep(`tts-${segment.type}`, stepStart);
    onProgress({
      type: 'segment', phase: 'tts', segmentType: segment.type,
      index: i, total: ttsTotal, status: 'done',
    });
  }

  const totalDurationMs = Date.now() - startTime;
  console.log(`[orchestrator] Show generated in ${totalDurationMs}ms`);

  return {
    showId,
    segments,
    generatedAt: new Date().toISOString(),
    totalDurationMs,
    model: LLM_MODEL,
    ttsVoiceId: getTtsVoiceId(config.voiceStyle, config.useMockTts),
    topicsUsed: config.topics,
    locationUsed: config.location,
    voiceStyleUsed: config.voiceStyle,
    targetLengthMin: targetLength,
    pipelineSteps,
  };
}
