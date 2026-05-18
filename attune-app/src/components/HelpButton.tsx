'use client';

import { useState, type ReactNode } from 'react';

interface HelpButtonProps {
  label?: string;
  ariaLabel?: string;
  children: ReactNode;
}

export default function HelpButton({ label, ariaLabel, children }: HelpButtonProps) {
  const [open, setOpen] = useState(false);
  const a11yLabel = ariaLabel ?? label ?? 'Hilfe anzeigen';

  return (
    <>
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen((v) => !v); }}
        aria-label={a11yLabel}
        aria-expanded={open}
        style={{
          width: 18, height: 18, padding: 0,
          background: open ? 'var(--ink)' : 'transparent',
          color: open ? 'var(--paper)' : 'var(--ink-3)',
          border: '1px solid ' + (open ? 'var(--ink)' : 'var(--rule-strong)'),
          borderRadius: '50%',
          fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, lineHeight: 1,
          cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          verticalAlign: 'middle',
          transition: 'background var(--d-quick) var(--ease), color var(--d-quick) var(--ease)',
        }}
      >
        ?
      </button>
      {open && (
        <div
          role="note"
          style={{
            gridColumn: '1 / -1',
            fontFamily: 'var(--font-serif)', fontStyle: 'italic',
            fontSize: 13.5, lineHeight: 1.55, color: 'var(--reason)',
            borderLeft: '2px solid var(--reason-rule)',
            background: 'var(--reason-tint)',
            padding: '8px 12px 8px 14px',
            marginTop: 8,
            width: '100%',
          }}
        >
          {label && (
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, fontStyle: 'normal',
              textTransform: 'uppercase', letterSpacing: '0.16em',
              color: 'var(--ink-3)', marginBottom: 4,
            }}>{label}</div>
          )}
          {children}
        </div>
      )}
    </>
  );
}
