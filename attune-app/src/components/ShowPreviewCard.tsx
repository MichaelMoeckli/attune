'use client';

import type { ShowConfig } from '@/lib/types';
import HelpButton from './HelpButton';

interface ShowPreviewCardProps {
  config: ShowConfig;
  onConfirm: () => void;
  onBack: () => void;
}

const SPOKEN_MIN_BY_LENGTH: Record<number, number> = { 5: 2, 10: 3, 15: 6 };
const MUSIC_TRACKS_BY_LENGTH: Record<number, number> = { 5: 1, 10: 2, 15: 3 };
const MUSIC_MIN_PER_TRACK = 3;

function computeEndTime(minutesFromNow: number): string {
  const end = new Date(Date.now() + minutesFromNow * 60 * 1000);
  return `${end.getHours().toString().padStart(2, '0')}:${end.getMinutes().toString().padStart(2, '0')}`;
}

export default function ShowPreviewCard({ config, onConfirm, onBack }: ShowPreviewCardProps) {
  const includeMusic = config.includeMusic !== false;
  const tracks = includeMusic ? (MUSIC_TRACKS_BY_LENGTH[config.targetLengthMin] ?? 2) : 0;
  const spokenMin = SPOKEN_MIN_BY_LENGTH[config.targetLengthMin] ?? 4;
  const approxMin = spokenMin + tracks * MUSIC_MIN_PER_TRACK;
  const endTime = computeEndTime(approxMin);

  type Row = { label: string; count: string | null };
  const segments: Row[] = [{ label: 'Begrüssung', count: null }];
  if (tracks >= 3) segments.push({ label: 'Musik', count: null });
  segments.push({ label: 'Nachrichten', count: config.topics.length > 0 ? String(config.topics.length) : null });
  if (tracks >= 1) segments.push({ label: 'Musik', count: null });
  segments.push({ label: `Wetter ${config.location || 'Zürich'}`, count: null });
  if (tracks >= 2) segments.push({ label: 'Musik', count: null });
  segments.push({ label: 'Verabschiedung', count: null });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      {/* Header */}
      <div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 10, marginBottom: 8,
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase',
            letterSpacing: '0.16em', color: 'var(--ink-3)',
          }}>vorschau</div>
          <HelpButton label="Was ist zu tun?">
            Das ist die geplante Sendungs-Struktur — keine Wiedergabe, nur ein Plan.
            Prüf kurz, ob die Segmente und die Länge stimmen. Wenn ja: «Sendung starten»
            tippen — danach werden Nachrichten, Wetter und Stimmen live erzeugt
            (dauert je nach Länge ca. 20–60&nbsp;Sek). Mit «Zurück zum Profil»
            kannst du noch Änderungen machen.
          </HelpButton>
        </div>
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 26,
          lineHeight: 1.1, letterSpacing: 'var(--tracking-tight)', color: 'var(--ink)',
        }}>Geplante Sendung</h1>
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--ink-2)',
          marginTop: 6, lineHeight: 1.5,
        }}>
          {segments.length} Segmente · ca.{' '}
          <span style={{ fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums' }}>
            {approxMin} Minuten
          </span>
          {' '}· endet hörbar um{' '}
          <span style={{ fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums' }}>
            {endTime}
          </span>
        </p>
      </div>

      {/* Segment list */}
      <div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase',
          letterSpacing: '0.16em', color: 'var(--ink-3)', marginBottom: 4,
        }}>segmente</div>
        {segments.map((seg, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'baseline', gap: 10, padding: '10px 0',
            borderTop: '1px solid var(--rule)',
          }}>
            <CaretIcon />
            <span style={{
              fontFamily: 'var(--font-sans)', fontSize: 14.5, color: 'var(--ink)', flex: 1,
            }}>{seg.label}</span>
            {seg.count && (
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)',
                letterSpacing: '0.04em',
              }}>{seg.count}</span>
            )}
          </div>
        ))}
        <div style={{ height: 1, background: 'var(--rule)' }}/>
      </div>

      {/* Reasoning */}
      <div style={{
        fontFamily: 'var(--font-serif)', fontStyle: 'italic',
        fontSize: 14.5, lineHeight: 1.55, color: 'var(--reason)',
        borderLeft: '2px solid var(--reason-rule)', padding: '6px 0 6px 14px',
      }}>
        Diese Sendung enthält bewusst ein Thema ausserhalb deiner Auswahl
        («Serendipity») — als kleiner Gegenpol zur Filterblase.
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button
          onClick={onConfirm}
          style={{
            fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 500,
            width: '100%', padding: '16px 18px',
            background: 'var(--ink)', color: 'var(--paper)',
            border: '1px solid var(--ink)', borderRadius: 2,
            cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 6, height: 6, background: 'var(--brass)', display: 'inline-block' }}/>
            Sendung starten
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums' }}>
            · ca. {approxMin} Min
          </span>
        </button>
        <button
          onClick={onBack}
          style={{
            fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500,
            background: 'transparent', color: 'var(--ink)', border: 0,
            cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '8px 0', alignSelf: 'flex-start',
          }}
        >
          ← Zurück zum Profil
        </button>
      </div>
    </div>
  );
}

function CaretIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="var(--ink-3)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9,5 16,12 9,19"/>
    </svg>
  );
}
