// --- Segment Types ---

export type SegmentType =
  | 'jingle'
  | 'greeting'
  | 'news'
  | 'weather'
  | 'music'
  | 'farewell';

export interface Segment {
  id: string;
  type: SegmentType;
  text?: string;
  audioUrl?: string;
  spotifyUri?: string;
  spotifyTrackName?: string;
  data?: NewsArticle[] | WeatherData;
  durationMs?: number;
  sourceCheck?: { hasUnverifiedMention: boolean; unverifiedOutlets: string[] };
}

// --- Show Types ---

export type VoiceStyle = 'formal' | 'casual' | 'energetic';

export interface ShowConfig {
  userId: string;
  topics: string[];
  location: string;
  voiceStyle: VoiceStyle;
  language: 'de' | 'en';
  targetLengthMin: 5 | 10 | 15;
  includeMusic?: boolean;
  useMockTts?: boolean;
}

export interface PipelineStep {
  step: string;
  durationMs: number;
  detail?: string;
}

export interface ShowResult {
  showId: string;
  segments: Segment[];
  generatedAt: string;
  totalDurationMs: number;
  model: string;
  ttsVoiceId: string;
  topicsUsed: string[];
  locationUsed: string;
  voiceStyleUsed: VoiceStyle;
  targetLengthMin: number;
  pipelineSteps: PipelineStep[];
}

// --- Streaming progress events (NDJSON over /api/generate) ---

export type ProgressEvent =
  | { type: 'step'; key: 'fetch-news' | 'fetch-weather' | 'pick-music'; status: 'start' | 'done' }
  | { type: 'segment'; phase: 'llm' | 'tts'; segmentType: SegmentType; index: number; total: number; status: 'start' | 'done' }
  | { type: 'done'; result: ShowResult }
  | { type: 'error'; message: string };

export interface PipelineProgress {
  news: 'wait' | 'run' | 'done';
  weather: 'wait' | 'run' | 'done';
  llm: { status: 'wait' | 'run' | 'done'; done: number; total: number };
  tts: { status: 'wait' | 'run' | 'done'; done: number; total: number };
  mix: 'wait' | 'done';
}

// --- News Types ---

export type SelectionReason = 'profile' | 'serendipity' | 'fallback';

export interface NewsArticle {
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  url: string;
  topic?: string;
  selectionReason?: SelectionReason;
}

// --- Weather Types ---

export interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  forecast: string;
}

