'use client';

import type { PipelineProgress } from '@/lib/types';
import HelpButton from './HelpButton';

type StepStatus = 'wait' | 'run' | 'done';

interface RowDef {
  label: string;
  source: string;
}

const ROWS: Record<'news' | 'weather' | 'llm' | 'tts' | 'mix', RowDef> = {
  news:    { label: 'Nachrichten geladen', source: 'SRF · NZZ — RSS-Feeds' },
  weather: { label: 'Wetter geladen',      source: 'OpenWeatherMap'         },
  llm:     { label: 'Moderationstexte',    source: 'Claude Sonnet'          },
  tts:     { label: 'Sprache erzeugen',    source: 'ElevenLabs TTS'         },
  mix:     { label: 'Sendung montieren',   source: 'Audio-Mixer'            },
};

interface PipelineTraceProps {
  progress: PipelineProgress;
  error: string | null;
}

export default function PipelineTrace({ progress, error }: PipelineTraceProps) {
  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase',
          letterSpacing: '0.16em', color: 'var(--err)',
        }}>Fehler</div>
        <div style={{
          background: 'var(--err-tint)', border: '1px solid var(--err)',
          borderRadius: 2, padding: '12px 14px',
          fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--err)', lineHeight: 1.5,
        }}>{error}</div>
      </div>
    );
  }

  // No real server-side mix step exists; this row marks "alle Segmente fertig".
  // Stays 'wait' until the final 'done' event arrives, so it doesn't pretend something is running.
  const mixStatus: StepStatus = progress.mix === 'done' ? 'done' : 'wait';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 10, marginBottom: 8,
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase',
            letterSpacing: '0.16em', color: 'var(--ink-3)',
          }}>pipeline läuft</div>
          <HelpButton label="Was passiert hier?">
            Nichts zu tun — kurz warten. Attune holt jetzt live Nachrichten und Wetter,
            lässt Claude die Moderationstexte schreiben und schickt diese durch
            ElevenLabs für die Stimme. Jeder Schritt ist eine echte API-Anfrage —
            kein synthetischer Ladebalken. Erscheint ein Fehler, klick im Browser auf
            «Zurück» (oder lade neu) und melde dich bei moeckmic@students.zhaw.ch.
          </HelpButton>
        </div>
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 26,
          lineHeight: 1.1, letterSpacing: 'var(--tracking-tight)', color: 'var(--ink)',
        }}>Sendung wird zusammengestellt</h1>
      </div>

      <div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase',
          letterSpacing: '0.16em', color: 'var(--ink-3)', marginBottom: 4,
        }}>schritte</div>

        <StepRow def={ROWS.news} status={progress.news} />
        <StepRow def={ROWS.weather} status={progress.weather} />
        <StepRow
          def={ROWS.llm}
          status={progress.llm.status}
          counter={progress.llm.total > 0 ? `${progress.llm.done} / ${progress.llm.total}` : undefined}
        />
        <StepRow
          def={ROWS.tts}
          status={progress.tts.status}
          counter={progress.tts.total > 0 ? `${progress.tts.done} / ${progress.tts.total}` : undefined}
        />
        <StepRow def={ROWS.mix} status={mixStatus} />

        <div style={{ height: 1, background: 'var(--rule)' }}/>
      </div>

      {/* Reasoning */}
      <div style={{
        fontFamily: 'var(--font-serif)', fontStyle: 'italic',
        fontSize: 14.5, lineHeight: 1.55, color: 'var(--reason)',
        borderLeft: '2px solid var(--reason-rule)', padding: '6px 0 6px 14px',
      }}>
        Du siehst, was wann passiert. Jeder Schritt ist eine echte API-Anfrage —
        kein synthetischer Ladebalken.
      </div>
    </div>
  );
}

function StepRow({
  def, status, counter,
}: { def: RowDef; status: StepStatus; counter?: string }) {
  const labelColor = status === 'wait' ? 'var(--ink-3)' : 'var(--ink)';
  const timeColor = status === 'run' ? 'var(--brass-deep)' : 'var(--ink-3)';

  let rightLabel: string;
  if (counter) {
    rightLabel = counter;
  } else if (status === 'done') {
    rightLabel = 'fertig';
  } else if (status === 'run') {
    rightLabel = 'läuft …';
  } else {
    rightLabel = '—';
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 0',
      borderTop: '1px solid var(--rule)',
    }}>
      <span style={{ width: 16, display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <StepIcon status={status} />
      </span>
      <div style={{ flex: 1 }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8,
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 12.5, color: labelColor,
          }}>{def.label}</span>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, color: timeColor,
            fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap',
          }}>{rightLabel}</span>
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-3)',
          marginTop: 3, letterSpacing: '0.02em',
        }}>{def.source}</div>
      </div>
    </div>
  );
}

function StepIcon({ status }: { status: StepStatus }) {
  if (status === 'done') {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="5,12 10,17 19,7"/>
      </svg>
    );
  }
  if (status === 'run') {
    return (
      <span style={{
        display: 'inline-block', width: 14, height: 14,
        border: '1.5px solid var(--brass)', borderRadius: 7, position: 'relative',
      }}>
        <span className="attune-pulse" style={{
          position: 'absolute', inset: 2,
          background: 'var(--brass)', borderRadius: 4,
        }}/>
      </span>
    );
  }
  return (
    <span style={{
      display: 'inline-block', width: 14, height: 14,
      border: '1.5px solid var(--ink-4)', borderRadius: 7,
    }}/>
  );
}
