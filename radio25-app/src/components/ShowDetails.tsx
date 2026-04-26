'use client';

import type { NewsArticle, Segment, ShowResult } from '@/lib/types';

interface ShowDetailsProps {
  showResult: ShowResult | null;
}

const VOICE_STYLE_LABELS: Record<string, string> = {
  formal: 'seriös',
  casual: 'locker',
  energetic: 'energisch',
};

function isNewsArticleArray(data: Segment['data']): data is NewsArticle[] {
  return Array.isArray(data);
}

export default function ShowDetails({ showResult }: ShowDetailsProps) {
  if (!showResult) return null;

  const { topicsUsed, locationUsed, voiceStyleUsed, targetLengthMin, model, ttsVoiceId, pipelineSteps, segments } = showResult;
  const newsSegments = segments.filter((s) => s.type === 'news');
  const styleLabel = VOICE_STYLE_LABELS[voiceStyleUsed] ?? voiceStyleUsed;
  const topicsLabel = topicsUsed.length > 0 ? topicsUsed.join(', ') : '—';

  return (
    <details className="w-full max-w-md rounded-lg bg-zinc-900 p-4 text-zinc-200 shadow-lg">
      <summary className="cursor-pointer text-sm font-medium text-amber-400 hover:text-amber-300">
        Sendungsdetails
      </summary>

      <div className="mt-4 space-y-5">
        {/* Why this show */}
        <section>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Warum diese Sendung?
          </h3>
          <p className="text-sm leading-relaxed text-zinc-300">
            Ausgewählt basierend auf deinen Themen ({topicsLabel}), Standort {locationUsed}, Moderationsstil {styleLabel}, Ziellänge {targetLengthMin} Min.
          </p>
        </section>

        {/* Sources */}
        {newsSegments.length > 0 && (
          <section>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Quellen
            </h3>
            <ul className="space-y-2">
              {newsSegments.flatMap((segment) =>
                isNewsArticleArray(segment.data)
                  ? segment.data.map((article, i) => (
                      <li key={`${segment.id}-${i}`} className="rounded bg-zinc-800/60 p-2 text-xs">
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-amber-400 hover:underline"
                        >
                          {article.title}
                        </a>
                        <p className="mt-0.5 text-zinc-400">{article.source}</p>
                      </li>
                    ))
                  : [],
              )}
            </ul>
          </section>
        )}

        {/* Pipeline */}
        <section>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Pipeline
          </h3>
          <div className="overflow-hidden rounded bg-zinc-800/60">
            <table className="w-full text-xs">
              <tbody>
                {pipelineSteps.map((step, i) => (
                  <tr key={i} className="border-b border-zinc-700/40 last:border-b-0">
                    <td className="px-2 py-1 font-mono text-zinc-300">{step.step}</td>
                    <td className="px-2 py-1 text-right text-zinc-400">{step.durationMs} ms</td>
                    <td className="px-2 py-1 text-zinc-500">{step.detail ?? ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-zinc-500">
            Modell: <span className="font-mono text-zinc-400">{model}</span> · TTS-Stimme:{' '}
            <span className="font-mono text-zinc-400">{ttsVoiceId}</span>
          </p>
        </section>
      </div>
    </details>
  );
}
