'use client';

import type { NewsArticle } from '@/lib/types';

interface SourceListProps {
  sources: NewsArticle[];
}

export default function SourceList({ sources }: SourceListProps) {
  if (sources.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{
        display: 'flex', alignItems: 'baseline', gap: 8,
        fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-3)',
      }}>
        <span>quellen</span>
        <span style={{
          flex: 1, borderBottom: '1px dotted var(--rule-strong)',
          transform: 'translateY(-3px)', minWidth: 12,
        }}/>
        <span style={{ color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>
          {sources.length}
        </span>
      </div>

      <ul style={{
        listStyle: 'none', margin: 0, padding: 0,
        display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        {sources.map((article, i) => {
          const dateStr = article.publishedAt
            ? new Date(article.publishedAt).toLocaleDateString('de-CH', {
                day: '2-digit', month: '2-digit', year: 'numeric',
              })
            : null;
          const isSerendipity = article.selectionReason === 'serendipity';
          return (
            <li key={`${article.url}-${i}`} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-3)',
                letterSpacing: '0.04em', display: 'flex', alignItems: 'baseline', gap: 6,
              }}>
                <span>{article.source}{dateStr ? ` · ${dateStr}` : ''}</span>
                {isSerendipity && (
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 9.5,
                    color: 'var(--reason)', textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    border: '1px solid var(--reason-rule)',
                    padding: '1px 5px', borderRadius: 1,
                  }}>überraschung</span>
                )}
              </div>
              {article.url ? (
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-serif)', fontSize: 13.5, lineHeight: 1.35,
                    color: 'var(--ink)', textDecoration: 'underline',
                    textUnderlineOffset: 3, textDecorationColor: 'var(--rule-strong)',
                  }}
                >
                  {article.title}
                </a>
              ) : (
                <span style={{
                  fontFamily: 'var(--font-serif)', fontSize: 13.5, lineHeight: 1.35,
                  color: 'var(--ink)',
                }}>{article.title}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
