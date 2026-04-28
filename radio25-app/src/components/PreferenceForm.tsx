'use client';

import { useState, useEffect } from 'react';
import type { ShowConfig } from '@/lib/types';

const PREFS_KEY = 'radio25-prefs';

const TOPIC_OPTIONS = [
  { id: 'politik',       label: 'Politik' },
  { id: 'international', label: 'International' },
  { id: 'schweiz',       label: 'Schweiz' },
  { id: 'wirtschaft',    label: 'Wirtschaft' },
  { id: 'finanzen',      label: 'Finanzen' },
  { id: 'sport',         label: 'Sport' },
  { id: 'technologie',   label: 'Technologie' },
  { id: 'kultur',        label: 'Kultur' },
  { id: 'wissenschaft',  label: 'Wissenschaft' },
  { id: 'panorama',      label: 'Panorama' },
  { id: 'zuerich',       label: 'Zürich' },
];

const VOICE_STYLES = [
  { id: 'formal'    as const, label: 'Seriös',    description: 'Wie SRF' },
  { id: 'casual'    as const, label: 'Locker',    description: 'Wie ein Privatsender' },
  { id: 'energetic' as const, label: 'Energisch', description: 'Mit viel Begeisterung' },
];

const LENGTH_OPTIONS = [
  { id: 5  as const, label: '5 Min',  description: 'Kurz' },
  { id: 10 as const, label: '10 Min', description: 'Standard' },
  { id: 15 as const, label: '15 Min', description: 'Ausführlich' },
];

const monoLabel: React.CSSProperties = {
  fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase',
  letterSpacing: '0.16em', color: 'var(--ink-3)', display: 'block', marginBottom: 8,
};

const chip = (active: boolean): React.CSSProperties => ({
  fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 500,
  padding: '6px 12px',
  border: '1px solid ' + (active ? 'var(--ink)' : 'var(--rule-strong)'),
  borderRadius: 2,
  color: active ? 'var(--paper)' : 'var(--ink)',
  background: active ? 'var(--ink)' : 'transparent',
  cursor: 'pointer', whiteSpace: 'nowrap' as const,
  transition: 'background var(--d-quick) var(--ease)',
});

interface PreferenceFormProps {
  onSubmit: (config: ShowConfig) => void;
  isGenerating: boolean;
  defaultConfig?: Partial<ShowConfig>;
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

export default function PreferenceForm({ onSubmit, isGenerating, defaultConfig }: PreferenceFormProps) {
  const [topics, setTopics] = useState<string[]>(defaultConfig?.topics ?? ['politik', 'wirtschaft', 'sport']);
  const [location, setLocation] = useState(defaultConfig?.location ?? 'Zürich');
  const [voiceStyle, setVoiceStyle] = useState<ShowConfig['voiceStyle']>(defaultConfig?.voiceStyle ?? 'casual');
  const [targetLengthMin, setTargetLengthMin] = useState<ShowConfig['targetLengthMin']>(defaultConfig?.targetLengthMin ?? 10);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') { setLoaded(true); return; }
    try {
      const raw = localStorage.getItem(PREFS_KEY);
      if (raw) {
        const prefs = JSON.parse(raw) as Partial<ShowConfig>;
        if (Array.isArray(prefs.topics)) setTopics(prefs.topics);
        if (typeof prefs.location === 'string') setLocation(prefs.location);
        if (prefs.voiceStyle) setVoiceStyle(prefs.voiceStyle);
        if (prefs.targetLengthMin) setTargetLengthMin(prefs.targetLengthMin);
      }
    } catch {
      // Ignore corrupt localStorage; fall back to defaults.
    }
    setLoaded(true);
  }, []);

  const toggleTopic = (id: string) => {
    setTopics(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
  };

  const handleSubmit = () => {
    const userId = getUserId();
    const config: ShowConfig = { userId, topics, location, voiceStyle, language: 'de', targetLengthMin };
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify({ topics, location, voiceStyle, targetLengthMin }));
    } catch {
      // Quota exceeded or storage disabled — non-fatal.
    }
    onSubmit(config);
  };

  if (!loaded) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Topics */}
      <div>
        <label style={monoLabel}>Themen</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {TOPIC_OPTIONS.map(t => (
            <button key={t.id} onClick={() => toggleTopic(t.id)} style={chip(topics.includes(t.id))}>
              {t.label}
            </button>
          ))}
        </div>
        {/* Reasoning block */}
        <div style={{
          fontFamily: 'var(--font-serif)', fontStyle: 'italic',
          fontSize: 13, lineHeight: 1.55, color: 'var(--reason)',
          borderLeft: '2px solid var(--reason-rule)', padding: '5px 0 5px 12px',
          marginTop: 12,
        }}>
          Diese Sendung enthält je eine Meldung pro Thema. Ein zufälliges Thema ausserhalb
          deiner Auswahl wird hinzugefügt.
        </div>
      </div>

      {/* Location */}
      <div>
        <label htmlFor="r25-location" style={monoLabel}>Standort</label>
        <input
          id="r25-location"
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="z.B. Zürich"
          style={{
            width: '100%', padding: '9px 12px',
            fontFamily: 'var(--font-serif)', fontSize: 15,
            background: 'var(--paper)', border: '1px solid var(--rule-strong)',
            borderRadius: 2, color: 'var(--ink)', outline: 'none',
          }}
        />
      </div>

      {/* Voice style */}
      <div>
        <label style={monoLabel}>Moderationsstil</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
          {VOICE_STYLES.map(s => (
            <button key={s.id} onClick={() => setVoiceStyle(s.id)} style={{
              ...chip(voiceStyle === s.id),
              padding: '10px 8px', textAlign: 'center',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            }}>
              <span style={{ fontSize: 13 }}>{s.label}</span>
              <span style={{ fontSize: 11, opacity: 0.7 }}>{s.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Show length */}
      <div>
        <label style={monoLabel}>Sendelänge</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
          {LENGTH_OPTIONS.map(o => (
            <button key={o.id} onClick={() => setTargetLengthMin(o.id)} style={{
              ...chip(targetLengthMin === o.id),
              padding: '10px 8px', textAlign: 'center',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            }}>
              <span style={{ fontSize: 13 }}>{o.label}</span>
              <span style={{ fontSize: 11, opacity: 0.7 }}>{o.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={isGenerating || topics.length === 0}
        style={{
          fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 500,
          width: '100%', padding: '16px 18px',
          background: 'var(--ink)', color: 'var(--paper)',
          border: '1px solid var(--ink)', borderRadius: 2,
          cursor: topics.length === 0 || isGenerating ? 'not-allowed' : 'pointer',
          opacity: topics.length === 0 || isGenerating ? 0.4 : 1,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'opacity var(--d-quick) var(--ease)',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 6, height: 6, background: 'var(--brass)', display: 'inline-block' }}/>
          Sendung vorbereiten
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums' }}>
          · {targetLengthMin} Min
        </span>
      </button>
    </div>
  );
}
