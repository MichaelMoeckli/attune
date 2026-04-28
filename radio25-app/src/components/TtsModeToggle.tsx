'use client';

interface TtsModeToggleProps {
  value: boolean;
  onChange: (useMockTts: boolean) => void;
}

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

export default function TtsModeToggle({ value, onChange }: TtsModeToggleProps) {
  return (
    <div>
      <span style={monoLabel}>TTS-Modus</span>
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          type="button"
          onClick={() => onChange(true)}
          aria-pressed={value === true}
          style={chip(value === true)}
        >
          Mock (Browser)
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          aria-pressed={value === false}
          style={chip(value === false)}
        >
          Real (ElevenLabs)
        </button>
      </div>
    </div>
  );
}
