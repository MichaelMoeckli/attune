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
}

// --- Show Types ---

export interface ShowConfig {
  userId: string;
  topics: string[];
  location: string;
  voiceStyle: 'formal' | 'casual' | 'energetic';
  language: 'de' | 'en';
}

export interface ShowResult {
  showId: string;
  segments: Segment[];
  generatedAt: string;
  totalDurationMs: number;
}

// --- News Types ---

export interface NewsArticle {
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  url: string;
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

// --- User Preferences ---

export interface UserPreferences extends ShowConfig {
  createdAt: string;
  updatedAt: string;
}
