'use client';

interface SourceLinkProps {
  source: string;
  date?: string;
  url?: string;
}

export default function SourceLink({ source, date, url }: SourceLinkProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{
        display: 'flex', alignItems: 'baseline', gap: 8,
        fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-3)',
      }}>
        <span>quelle</span>
        <span style={{
          flex: 1, borderBottom: '1px dotted var(--rule-strong)',
          transform: 'translateY(-3px)', minWidth: 12,
        }}/>
        <span style={{ color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>
          {source}{date ? ` · ${date}` : ''}
        </span>
      </div>
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--ink)',
            textDecoration: 'underline', textUnderlineOffset: 3,
            display: 'inline-flex', alignItems: 'center', gap: 6, alignSelf: 'flex-start',
          }}
        >
          <ArrowExtIcon />
          Zur Originalquelle
        </a>
      )}
    </div>
  );
}

function ArrowExtIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9,5 19,5 19,15"/>
      <line x1="19" y1="5" x2="9" y2="15"/>
    </svg>
  );
}
