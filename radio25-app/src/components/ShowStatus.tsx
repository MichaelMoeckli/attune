'use client';

import type { ShowResult } from '@/lib/types';

interface ShowStatusProps {
  showResult: ShowResult | null;
  isGenerating: boolean;
  error: string | null;
  targetLengthMin?: number;
}

export default function ShowStatus({ showResult, isGenerating, error, targetLengthMin }: ShowStatusProps) {
  if (error) {
    return (
      <div className="w-full max-w-md rounded-lg bg-red-900/30 p-4 text-center">
        <p className="text-sm text-red-300">{error}</p>
      </div>
    );
  }

  if (isGenerating && !showResult) {
    return (
      <div className="w-full max-w-md rounded-lg bg-zinc-800/50 p-4 text-center">
        <div className="mb-2 inline-block h-5 w-5 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
        <p className="text-sm text-zinc-400">Deine Sendung wird zusammengestellt...</p>
        <p className="mt-1 text-xs text-zinc-500">
          {targetLengthMin ? `Geschätzte Länge: ~${targetLengthMin} Min · ` : ''}
          Nachrichten, Wetter und Moderation werden generiert
        </p>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="w-full max-w-md rounded-lg bg-zinc-800/50 p-4 text-center">
        <p className="text-sm text-zinc-400">
          Sendung generiert in {(showResult.totalDurationMs / 1000).toFixed(1)}s
        </p>
        <p className="mt-1 text-xs text-zinc-500">
          {showResult.segments.length} Segmente · ~{showResult.targetLengthMin} Min
        </p>
      </div>
    );
  }

  return null;
}
