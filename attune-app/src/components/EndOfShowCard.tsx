'use client';

import { buildSurveyUrl, isSurveyConfigured } from '@/lib/study';

interface EndOfShowCardProps {
  durationMin: number;
  endTime: string;
  onNewShow: () => void;
  onEditProfile: () => void;
  participantId?: string | null;
}

export default function EndOfShowCard({ durationMin, endTime, onNewShow, onEditProfile, participantId }: EndOfShowCardProps) {
  const surveyReady = !!participantId && isSurveyConfigured();
  const surveyUrl = participantId ? buildSurveyUrl(participantId) : null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      {/* Concentric circles */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 8px' }}>
        <svg width="84" height="84" viewBox="0 0 84 84" fill="none">
          <circle cx="42" cy="42" r="40" stroke="var(--rule)" strokeWidth="1"/>
          <circle cx="42" cy="42" r="28" stroke="var(--rule)" strokeWidth="1"/>
          <circle cx="42" cy="42" r="16" stroke="var(--rule-strong)" strokeWidth="1"/>
          <circle cx="42" cy="42" r="3.5" fill="var(--brass)"/>
        </svg>
      </div>

      {/* End message */}
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase',
          letterSpacing: '0.16em', color: 'var(--ink-3)', marginBottom: 8,
        }}>{endTime} · ende</div>
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 26,
          lineHeight: 1.1, letterSpacing: 'var(--tracking-tight)', color: 'var(--ink)',
        }}>Sendung beendet.</h1>
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--ink-2)',
          marginTop: 12, textAlign: 'center',
        }}>
          Du hast{' '}
          <span style={{ fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums' }}>
            {durationMin} Minuten
          </span>
          {' '}gehört.
        </p>
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--ink-2)',
          marginTop: 4, textAlign: 'center',
        }}>
          Bis zur nächsten Sendung — am besten morgen.
        </p>
      </div>

      {/* Survey CTA (only during the pilot study, i.e. when a participant ID exists) */}
      {participantId && (
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 10,
          border: '1px solid var(--rule-strong)', borderRadius: 2,
          padding: '16px 16px 18px',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase',
            letterSpacing: '0.16em', color: 'var(--ink-3)',
          }}>Pilotstudie</div>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--ink-2)',
            margin: 0, lineHeight: 1.5,
          }}>
            Bitte fülle jetzt den Fragebogen aus. Deine Teilnehmer-ID ist{' '}
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink)', fontWeight: 600 }}>
              {participantId}
            </span>
            {' '}— sie ist das erste Pflichtfeld.
          </p>
          {surveyReady && surveyUrl ? (
            <a
              href={surveyUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500,
                padding: '13px 16px', background: 'var(--ink)', color: 'var(--paper)',
                border: '1px solid var(--ink)', borderRadius: 2,
                textAlign: 'center', textDecoration: 'none',
              }}
            >
              Fragebogen jetzt ausfüllen →
            </a>
          ) : (
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: 12.5, color: 'var(--ink-3)',
              margin: 0, lineHeight: 1.5,
            }}>
              (Den Link zum Fragebogen bekommst du gesondert vom Dozenten oder
              per Mail.)
            </p>
          )}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button
          onClick={onEditProfile}
          style={{
            fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500,
            padding: '13px 16px', background: 'transparent', color: 'var(--ink)',
            border: '1px solid var(--ink)', borderRadius: 2,
            cursor: 'pointer', width: '100%', textAlign: 'center',
          }}
        >
          Profil anpassen
        </button>
        <button
          onClick={onNewShow}
          style={{
            fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500,
            padding: '13px 16px', background: 'transparent', color: 'var(--ink)',
            border: '1px solid var(--ink)', borderRadius: 2,
            cursor: 'pointer', width: '100%', textAlign: 'center',
          }}
        >
          Neue Sendung jetzt
        </button>
      </div>

      {/* Reasoning */}
      <div style={{
        fontFamily: 'var(--font-serif)', fontStyle: 'italic',
        fontSize: 14.5, lineHeight: 1.55, color: 'var(--reason)',
        borderLeft: '2px solid var(--reason-rule)', padding: '6px 0 6px 14px',
      }}>
        Attune schlägt nichts automatisch vor. Eine Pause hier ist Teil
        des Konzepts — keine Cliffhanger, keine Anschlussempfehlung.
      </div>
    </div>
  );
}
