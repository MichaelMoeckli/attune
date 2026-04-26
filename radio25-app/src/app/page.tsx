'use client';

import { useState } from 'react';
import type { ShowConfig, ShowResult } from '@/lib/types';
import AudioPlayer from '@/components/AudioPlayer';
import PreferenceForm from '@/components/PreferenceForm';
import ShowStatus from '@/components/ShowStatus';
import ShowDetails from '@/components/ShowDetails';
import SpotifyConnect from '@/components/SpotifyConnect';

export default function Home() {
  const [showResult, setShowResult] = useState<ShowResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [spotifyConnected, setSpotifyConnected] = useState(false);
  const [lastConfig, setLastConfig] = useState<ShowConfig | null>(null);

  const handleGenerate = async (config: ShowConfig) => {
    setIsGenerating(true);
    setError(null);
    setShowResult(null);
    setLastConfig(config);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Unbekannter Fehler');
      }

      const result: ShowResult = await res.json();
      setShowResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sendung konnte nicht generiert werden.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-950 p-4">
      <h1 className="text-3xl font-bold tracking-wide text-white">Radio 25</h1>

      <AudioPlayer showResult={showResult} isGenerating={isGenerating} spotifyConnected={spotifyConnected} />

      <ShowDetails showResult={showResult} />

      <ShowStatus
        showResult={showResult}
        isGenerating={isGenerating}
        error={error}
        targetLengthMin={lastConfig?.targetLengthMin}
      />

      <PreferenceForm onGenerate={handleGenerate} isGenerating={isGenerating} />

      <SpotifyConnect onConnectionChange={setSpotifyConnected} />
    </div>
  );
}
