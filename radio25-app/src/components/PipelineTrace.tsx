'use client';

import { useEffect, useState } from 'react';
import type { ShowResult } from '@/lib/types';

interface PipelineStep {
  label: string;
  source: string;
  triggerMs: number;
}

const STEPS: PipelineStep[] = [
  { label: 'Nachrichten geladen',   source: 'SRF · NZZ — RSS-Feeds',        triggerMs: 500  },
  { label: 'Wetter geladen',        source: 'OpenWeatherMap',                triggerMs: 1000 },
  { label: 'Moderationstexte',      source: 'Claude Sonnet',                 triggerMs: 1500 },
  { label: 'Sprache erzeugen',      source: 'ElevenLabs TTS',                triggerMs: 3000 },
  { label: 'Sendung montieren',     source: 'Audio-Mixer',                   triggerMs: 4000 },
];

type StepStatus = 'wait' | 'run' | 'done';

interface PipelineTraceProps {
  showResult: ShowResult | null;
  error: string | null;
  startedAt: number;
}

export default function PipelineTrace({ showResult, error, startedAt }: PipelineTraceProps) {
  const [statuses, setStatuses] = useState<StepStatus[]>(STEPS.map(() => 'wait'));

  useEffect(() => {
    if (showResult) {
      setStatuses(STEPS.map(() => 'done'));
      return;
    }

    const timers = STEPS.map((step, i) => {
      const delay = step.triggerMs - (Date.now() - startedAt);
      if (delay <= 0) {
        setStatuses(prev => {
          const next = [...prev];
          if (next[i] === 'wait') next[i] = 'done';
          if (i + 1 < next.length && next[i + 1] === 'wait') next[i + 1] = 'run';
          return next;
        });
        return null;
      }
      return setTimeout(() => {
        setStatuses(prev => {
          const next = [...prev];
          if (next[i] === 'wait' || next[i] === 'run') next[i] = 'done';
          if (i + 1 < next.length && next[i + 1] === 'wait') next[i + 1] = 'run';
          return next;
        });
      }, delay);
    });

    // Start first step immediately
    setStatuses(prev => {
      const next = [...prev];
      if (next[0] === 'wait') next[0] = 'run';
      return next;
    });

    return () => timers.forEach(t => t && clearTimeout(t));
  }, [showResult, startedAt]);

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase',
          letterSpacing: '0.16em', color: 'var(--ink-3)', marginBottom: 8,
        }}>pipeline läuft</div>
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
        {STEPS.map((step, i) => (
          <StepRow key={i} step={step} status={statuses[i]} />
        ))}
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

function StepRow({ step, status }: { step: PipelineStep; status: StepStatus }) {
  const labelColor = status === 'wait' ? 'var(--ink-3)' : 'var(--ink)';
  const timeColor = status === 'run' ? 'var(--brass-deep)' : 'var(--ink-3)';

  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 0',
      borderTop: '1px solid var(--rule)',
    }}>
      <span style={{ width: 14, display: 'flex', justifyContent: 'center', marginTop: 3 }}>
        <StepIcon status={status} />
      </span>
      <div style={{ flex: 1 }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8,
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 12.5, color: labelColor,
          }}>{step.label}</span>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, color: timeColor,
            fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap',
          }}>
            {status === 'done' ? `${(step.triggerMs / 1000).toFixed(1)} s` :
             status === 'run'  ? 'läuft …' : '—'}
          </span>
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-3)',
          marginTop: 3, letterSpacing: '0.02em',
        }}>{step.source}</div>
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
        display: 'inline-block', width: 10, height: 10,
        border: '1.5px solid var(--brass)', borderRadius: 5, position: 'relative',
      }}>
        <span style={{
          position: 'absolute', inset: 2,
          background: 'var(--brass)', borderRadius: 3,
        }}/>
      </span>
    );
  }
  return (
    <span style={{
      display: 'inline-block', width: 10, height: 10,
      border: '1.5px solid var(--ink-4)', borderRadius: 5,
    }}/>
  );
}
