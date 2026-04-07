'use client';

import { useState, useEffect } from 'react';
import type { ShowConfig, UserPreferences } from '@/lib/types';

const TOPIC_OPTIONS = [
  { id: 'politik', label: 'Politik' },
  { id: 'international', label: 'International' },
  { id: 'schweiz', label: 'Schweiz' },
  { id: 'wirtschaft', label: 'Wirtschaft' },
  { id: 'finanzen', label: 'Finanzen' },
  { id: 'sport', label: 'Sport' },
  { id: 'technologie', label: 'Technologie' },
  { id: 'kultur', label: 'Kultur' },
  { id: 'wissenschaft', label: 'Wissenschaft' },
  { id: 'panorama', label: 'Panorama' },
  { id: 'zuerich', label: 'Zürich' },
];

const VOICE_STYLES = [
  { id: 'formal' as const, label: 'Seriös', description: 'Wie SRF' },
  { id: 'casual' as const, label: 'Locker', description: 'Wie ein Privatsender' },
  { id: 'energetic' as const, label: 'Energisch', description: 'Mit viel Begeisterung' },
];

interface PreferenceFormProps {
  onGenerate: (config: ShowConfig) => void;
  isGenerating: boolean;
}

function getUserId(): string {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem('radio25-userId');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('radio25-userId', id);
  }
  return id;
}

export default function PreferenceForm({ onGenerate, isGenerating }: PreferenceFormProps) {
  const [topics, setTopics] = useState<string[]>(['politik', 'wirtschaft', 'sport']);
  const [location, setLocation] = useState('Zürich');
  const [voiceStyle, setVoiceStyle] = useState<ShowConfig['voiceStyle']>('casual');
  const [loaded, setLoaded] = useState(false);

  // Load saved preferences
  useEffect(() => {
    const userId = getUserId();
    if (!userId) return;

    fetch(`/api/preferences?userId=${userId}`)
      .then((res) => res.json())
      .then((prefs: UserPreferences | null) => {
        if (prefs) {
          setTopics(prefs.topics);
          setLocation(prefs.location);
          setVoiceStyle(prefs.voiceStyle);
        }
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const toggleTopic = (topicId: string) => {
    setTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((t) => t !== topicId)
        : [...prev, topicId],
    );
  };

  const handleSubmit = async () => {
    const userId = getUserId();
    const config: ShowConfig = {
      userId,
      topics,
      location,
      voiceStyle,
      language: 'de',
    };

    // Save preferences
    fetch('/api/preferences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    }).catch(console.warn);

    onGenerate(config);
  };

  if (!loaded) return null;

  return (
    <div className="w-full max-w-md space-y-5">
      {/* Topics */}
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Themen
        </label>
        <div className="flex flex-wrap gap-2">
          {TOPIC_OPTIONS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => toggleTopic(topic.id)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                topics.includes(topic.id)
                  ? 'bg-amber-500 text-zinc-900'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
              }`}
            >
              {topic.label}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <label htmlFor="location" className="mb-2 block text-sm font-medium text-zinc-300">
          Standort
        </label>
        <input
          id="location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="z.B. Zürich"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
        />
      </div>

      {/* Voice Style */}
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Moderationsstil
        </label>
        <div className="grid grid-cols-3 gap-2">
          {VOICE_STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => setVoiceStyle(style.id)}
              className={`rounded-lg p-2 text-center transition ${
                voiceStyle === style.id
                  ? 'bg-amber-500 text-zinc-900'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
              }`}
            >
              <div className="text-sm font-medium">{style.label}</div>
              <div className="text-xs opacity-70">{style.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleSubmit}
        disabled={isGenerating || topics.length === 0}
        className="w-full rounded-lg bg-amber-500 py-3 text-sm font-bold text-zinc-900 transition hover:bg-amber-400 disabled:opacity-50"
      >
        {isGenerating ? 'Sendung wird generiert...' : 'Sendung starten'}
      </button>
    </div>
  );
}
