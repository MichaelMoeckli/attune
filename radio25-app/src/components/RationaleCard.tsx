'use client';

import type { NewsArticle, ShowConfig, ShowResult } from '@/lib/types';

const VOICE_LABELS: Record<string, string> = {
  formal: 'Seriös',
  casual: 'Locker',
  energetic: 'Energisch',
};

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

interface RationaleCardProps {
  config: ShowConfig;
  showResult: ShowResult | null;
  onClose: () => void;
}

export default function RationaleCard({ config, showResult, onClose }: RationaleCardProps) {
  const topicsLabel = config.topics.length > 0
    ? config.topics.map(cap).join(' · ')
    : '—';

  const profileRows: [string, string][] = [
    ['Themen', topicsLabel],
    ['Standort', config.location || '—'],
    ['Stil', VOICE_LABELS[config.voiceStyle] ?? config.voiceStyle],
  ];

  // Pull the actual articles selected for this show, so the mapping reflects
  // what selectNews picked (capPerTopic + pickSerendipity + applyDaypart).
  const newsSegment = showResult?.segments.find(s => s.type === 'news');
  const articles = (Array.isArray(newsSegment?.data) ? newsSegment.data : []) as NewsArticle[];
  const profileArticles = articles.filter(a => a.selectionReason !== 'serendipity');
  const serendipityArticles = articles.filter(a => a.selectionReason === 'serendipity');

  const profileTopics = Array.from(new Set(
    profileArticles.map(a => a.topic).filter((t): t is string => !!t),
  ));
  const serendipityTopic = serendipityArticles[0]?.topic;

  const topicMappings: [string, string][] = profileTopics.length > 0
    ? profileTopics.map(t => [cap(t), `Profil-Nachricht aus SRF + NZZ`] as [string, string])
    : config.topics.map(t => [cap(t), 'Nachricht aus SRF + NZZ'] as [string, string]);

  const mappings: [string, string][] = [
    ...topicMappings,
    ['Überraschung', serendipityTopic ? `${cap(serendipityTopic)} (ausserhalb Profil)` : 'keine in dieser Sendung'],
    [`Standort ${config.location || 'Zürich'}`, `Wetter ${config.location || 'Zürich'}`],
    [`Stil '${VOICE_LABELS[config.voiceStyle]?.toLowerCase() ?? config.voiceStyle}'`, `Voice '${config.voiceStyle}'`],
  ];

  const pipelineSteps = showResult?.pipelineSteps ?? null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, background: 'oklch(0% 0 0 / 0.3)', zIndex: 40,
        }}
      />
      {/* Drawer */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
        background: 'var(--paper)', borderTop: '1px solid var(--rule-strong)',
        maxHeight: '85vh', overflowY: 'auto',
        animation: `slideUp var(--d-quick) var(--ease)`,
      }}>
        <style>{`
          @keyframes slideUp {
            from { transform: translateY(100%); }
            to   { transform: translateY(0); }
          }
        `}</style>

        <div style={{ padding: '20px 24px 40px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase',
              letterSpacing: '0.16em', color: 'var(--ink-3)',
            }}>begründung</span>
            <button
              onClick={onClose}
              aria-label="Schliessen"
              style={{
                background: 'transparent', border: 0, cursor: 'pointer',
                color: 'var(--ink)', display: 'flex', padding: 8,
              }}
            >
              <XIcon />
            </button>
          </div>

          {/* Title */}
          <div style={{ paddingLeft: 14, borderLeft: '2px solid var(--reason-rule)' }}>
            <h1 style={{
              fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400,
              fontSize: 26, color: 'var(--reason)', lineHeight: 1.15,
              letterSpacing: 'var(--tracking-tight)',
            }}>Warum diese Sendung?</h1>
          </div>

          {/* Section 1 — Profil */}
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase',
              letterSpacing: '0.16em', color: 'var(--ink-3)', marginBottom: 6,
            }}>1 · dein profil</div>
            <div style={{ borderTop: '1px solid var(--rule)' }}/>
            {profileRows.map(([k, v]) => (
              <div key={k} style={{
                display: 'grid', gridTemplateColumns: '78px 1fr', gap: 14,
                padding: '8px 0', borderBottom: '1px solid var(--rule)',
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-3)',
                  textTransform: 'lowercase', letterSpacing: '0.04em',
                }}>{k}</span>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13.5, color: 'var(--ink)' }}>{v}</span>
              </div>
            ))}
          </div>

          {/* Section 2 — Mapping */}
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase',
              letterSpacing: '0.16em', color: 'var(--ink-3)', marginBottom: 6,
            }}>2 · daraus wurde</div>
            {mappings.map(([from, to], i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '1fr 18px 1fr', gap: 8,
                alignItems: 'baseline', padding: '8px 0', borderTop: '1px solid var(--rule)',
              }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13.5, color: 'var(--ink)' }}>{from}</span>
                <span style={{ display: 'flex', justifyContent: 'center', color: 'var(--reason-rule)' }}>
                  <ArrowIcon />
                </span>
                <span style={{
                  fontFamily: 'var(--font-serif)', fontStyle: 'italic',
                  fontSize: 13.5, color: 'var(--reason)',
                }}>{to}</span>
              </div>
            ))}
            <div style={{ height: 1, background: 'var(--rule)' }}/>
          </div>

          {/* Section 3 — Pipeline */}
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase',
              letterSpacing: '0.16em', color: 'var(--ink-3)', marginBottom: 8,
            }}>3 · pipeline</div>
            {pipelineSteps ? (
              <div style={{
                background: 'var(--paper-3)', padding: '12px 14px',
                fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink)',
                lineHeight: 1.7,
              }}>
                {pipelineSteps.map((step, i) => (
                  <div key={i}>
                    {i === 0 ? '' : '→ '}
                    {step.step}
                    {step.detail && (
                      <span style={{ color: 'var(--ink-3)' }}> ({step.detail})</span>
                    )}
                    <span style={{ color: 'var(--ink-3)', marginLeft: 8, fontVariantNumeric: 'tabular-nums' }}>
                      {step.durationMs} ms
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                background: 'var(--paper-3)', padding: '12px 14px',
                fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink)', lineHeight: 1.7,
              }}>
                <div>RSS  →  Auswahl <span style={{ color: 'var(--ink-3)' }}>(max 1/Thema + 1 Diversität)</span></div>
                <div>     →  Claude Sonnet <span style={{ color: 'var(--ink-3)' }}>(Moderationstexte)</span></div>
                <div>     →  ElevenLabs <span style={{ color: 'var(--ink-3)' }}>(TTS)</span></div>
                <div>     →  Audio-Mixer</div>
              </div>
            )}
          </div>

          {/* Privacy note */}
          <div style={{
            display: 'flex', gap: 8, alignItems: 'flex-start',
            padding: '10px 0', borderTop: '1px solid var(--rule)',
          }}>
            <InfoIcon />
            <span style={{
              fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.5,
            }}>
              Es gibt kein Verhaltens-Tracking. Deine Hör-Daten verlassen den Browser nicht.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="13,6 19,12 13,18"/>
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="var(--ink-3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="12" cy="12" r="9"/>
      <line x1="12" y1="11" x2="12" y2="16"/>
      <circle cx="12" cy="8" r="0.6" fill="var(--ink-3)"/>
    </svg>
  );
}
