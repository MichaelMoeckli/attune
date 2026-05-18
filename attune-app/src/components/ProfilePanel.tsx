'use client';

import type { ShowConfig } from '@/lib/types';

const VOICE_LABELS: Record<string, string> = {
  formal: 'Seriös',
  casual: 'Locker',
  energetic: 'Energisch',
};

interface ProfilePanelProps {
  config: ShowConfig;
  onEdit: () => void;
}

export default function ProfilePanel({ config, onEdit }: ProfilePanelProps) {
  const topicsLabel = config.topics.length > 0
    ? config.topics.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(' · ')
    : '—';

  const includeMusic = config.includeMusic !== false;
  const tracksByLength: Record<number, number> = { 5: 1, 10: 2, 15: 3 };
  const spokenMinByLength: Record<number, number> = { 5: 2, 10: 3, 15: 6 };
  const tracks = tracksByLength[config.targetLengthMin] ?? 2;
  const displayMin = includeMusic
    ? config.targetLengthMin
    : (spokenMinByLength[config.targetLengthMin] ?? config.targetLengthMin);
  const musicLabel = includeMusic
    ? `Mit Musik · ${tracks} Song${tracks === 1 ? '' : 's'}`
    : 'Ohne Musik';

  const rows: [string, string][] = [
    ['Themen', topicsLabel],
    ['Standort', config.location || '—'],
    ['Stil', VOICE_LABELS[config.voiceStyle] ?? config.voiceStyle],
    ['Länge', `${displayMin} Minuten`],
    ['Musik', musicLabel],
  ];

  return (
    <div>
      {/* Wordmark */}
      <div style={{
        display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 20,
      }}>
        <span style={{ width: 5, height: 5, background: 'var(--brass)', display: 'inline-block', flexShrink: 0 }}/>
        <span style={{
          fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 16,
          letterSpacing: '0.18em', color: 'var(--ink)',
        }}>ATTUNE</span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.22em',
          color: 'var(--ink-3)', textTransform: 'uppercase', marginLeft: 'auto',
        }}>vollautomatisiertes radio</span>
      </div>

      {/* Profile header */}
      <div style={{
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4,
      }}>
        <h2 style={{
          fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: 20,
          letterSpacing: 'var(--tracking-tight)', color: 'var(--ink)',
        }}>Dein Profil</h2>
        <button
          onClick={onEdit}
          style={{
            fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500,
            background: 'transparent', color: 'var(--ink)', border: 0,
            cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '8px 0',
          }}
        >
          <EditIcon /> Anpassen
        </button>
      </div>

      {/* Profile rows */}
      {rows.map(([label, value]) => (
        <div key={label} style={{
          display: 'grid', gridTemplateColumns: '78px 1fr', gap: 14, alignItems: 'baseline',
          paddingTop: 10, paddingBottom: 10, borderTop: '1px solid var(--rule)',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 10.5,
            textTransform: 'lowercase', color: 'var(--ink-3)', letterSpacing: '0.04em',
          }}>{label}</span>
          <span style={{
            fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--ink)', lineHeight: 1.4,
          }}>{value}</span>
        </div>
      ))}
      <div style={{ height: 1, background: 'var(--rule)' }}/>

      {/* Reasoning block */}
      <div style={{
        fontFamily: 'var(--font-serif)', fontStyle: 'italic',
        fontSize: 14.5, lineHeight: 1.55, color: 'var(--reason)',
        borderLeft: '2px solid var(--reason-rule)',
        padding: '6px 0 6px 14px', marginTop: 16,
      }}>
        Dein Profil bleibt sichtbar — es lernt nichts aus deinem Hörverhalten.
        Änderungen passieren nur durch dich.
      </div>
    </div>
  );
}

function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20 L4 16 L16 4 L20 8 L8 20 Z"/>
    </svg>
  );
}
