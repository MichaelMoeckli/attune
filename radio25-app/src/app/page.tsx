'use client';

import { useState, useRef, useEffect } from 'react';
import type { ShowConfig, ShowResult } from '@/lib/types';
import AudioPlayer from '@/components/AudioPlayer';
import PreferenceForm from '@/components/PreferenceForm';
import ProfilePanel from '@/components/ProfilePanel';
import ShowPreviewCard from '@/components/ShowPreviewCard';
import PipelineTrace from '@/components/PipelineTrace';
import EndOfShowCard from '@/components/EndOfShowCard';
import RationaleCard from '@/components/RationaleCard';
import ApiDisclaimer from '@/components/ApiDisclaimer';
import MockBanner from '@/components/MockBanner';
import SpotifyConnect from '@/components/SpotifyConnect';
import TtsModeToggle from '@/components/TtsModeToggle';

type AppState = 'idle' | 'preview' | 'generating' | 'ready' | 'ended';

const isMockMode = process.env.NEXT_PUBLIC_MOCK_MODE === 'true';
const TTS_MODE_KEY = 'radio25.useMockTts';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('idle');
  const [pendingConfig, setPendingConfig] = useState<ShowConfig | null>(null);
  const [showResult, setShowResult] = useState<ShowResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [spotifyConnected, setSpotifyConnected] = useState(false);
  const [showRationale, setShowRationale] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [useMockTts, setUseMockTts] = useState<boolean>(true);
  const generationStartRef = useRef<number>(0);

  const endTimeRef = useRef('');

  // Hydrate TTS mode from localStorage; default to mock if unset.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(TTS_MODE_KEY);
    if (stored === 'true') setUseMockTts(true);
    else if (stored === 'false') setUseMockTts(false);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(TTS_MODE_KEY, String(useMockTts));
  }, [useMockTts]);

  // S1 → S2: user submits form → show preview
  const handleFormSubmit = (config: ShowConfig) => {
    setPendingConfig(config);
    setError(null);
    setIsEditing(false);
    setAppState('preview');
  };

  // S2 → S3: user confirms preview → fire API
  const handleConfirmGenerate = async () => {
    if (!pendingConfig) return;
    setAppState('generating');
    generationStartRef.current = Date.now();
    setError(null);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...pendingConfig, useMockTts }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Unbekannter Fehler');
      }
      const result: ShowResult = await res.json();
      setShowResult(result);
      setAppState('ready');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sendung konnte nicht generiert werden.');
      // Stay in 'generating' state so PipelineTrace can display the error
    }
  };

  // S4 → S5: player signals playback finished
  const handlePlaybackEnded = () => {
    const now = new Date();
    endTimeRef.current = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    setAppState('ended');
  };

  // S5 → S1: start fresh
  const handleReset = (editProfile = false) => {
    setShowResult(null);
    setError(null);
    setShowRationale(false);
    setAppState('idle');
    if (editProfile) setIsEditing(true);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', color: 'var(--ink)' }}>
      {(isMockMode || useMockTts) && <MockBanner ttsMode={useMockTts ? 'mock' : 'real'} />}

      <main style={{
        maxWidth: 520, margin: '0 auto',
        padding: '32px 24px 64px',
        display: 'flex', flexDirection: 'column', gap: 32,
      }}>

        {/* ── S1: Idle ─────────────────────────────────── */}
        {appState === 'idle' && (
          <>
            {pendingConfig && !isEditing ? (
              <>
                <ProfilePanel config={pendingConfig} onEdit={() => setIsEditing(true)} />
                {!isEditing && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <button
                      onClick={() => setAppState('preview')}
                      style={{
                        fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 500,
                        width: '100%', padding: '16px 18px',
                        background: 'var(--ink)', color: 'var(--paper)',
                        border: '1px solid var(--ink)', borderRadius: 2,
                        cursor: 'pointer', display: 'flex', alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ width: 6, height: 6, background: 'var(--brass)', display: 'inline-block' }}/>
                        Sendung starten
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums' }}>
                        · {pendingConfig.targetLengthMin} Min
                      </span>
                    </button>
                  </div>
                )}
              </>
            ) : null}

            {(!pendingConfig || isEditing) && (
              <PreferenceForm
                onSubmit={handleFormSubmit}
                isGenerating={false}
                defaultConfig={pendingConfig ?? undefined}
              />
            )}

            <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
              <TtsModeToggle value={useMockTts} onChange={setUseMockTts} />
              <ApiDisclaimer />
            </div>
            <SpotifyConnect onConnectionChange={setSpotifyConnected} />
          </>
        )}

        {/* ── S2: Preview ──────────────────────────────── */}
        {appState === 'preview' && pendingConfig && (
          <ShowPreviewCard
            config={pendingConfig}
            onConfirm={handleConfirmGenerate}
            onBack={() => setAppState('idle')}
          />
        )}

        {/* ── S3: Generating ───────────────────────────── */}
        {appState === 'generating' && (
          <PipelineTrace
            showResult={showResult}
            error={error}
            startedAt={generationStartRef.current}
          />
        )}

        {/* ── S4: Ready / Playing ──────────────────────── */}
        {appState === 'ready' && showResult && (
          <AudioPlayer
            showResult={showResult}
            spotifyConnected={spotifyConnected}
            onEnded={handlePlaybackEnded}
            onOpenRationale={() => setShowRationale(true)}
          />
        )}

        {/* ── S5: Ended ────────────────────────────────── */}
        {appState === 'ended' && (
          <EndOfShowCard
            durationMin={showResult?.targetLengthMin ?? 0}
            endTime={endTimeRef.current}
            onNewShow={() => handleReset(false)}
            onEditProfile={() => handleReset(true)}
          />
        )}
      </main>

      {/* ── S6: Rationale overlay ────────────────────── */}
      {showRationale && pendingConfig && (
        <RationaleCard
          config={pendingConfig}
          showResult={showResult}
          onClose={() => setShowRationale(false)}
        />
      )}
    </div>
  );
}
