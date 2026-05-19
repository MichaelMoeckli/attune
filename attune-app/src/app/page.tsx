'use client';

import { useState, useRef, useEffect } from 'react';
import type { PipelineProgress, ProgressEvent, ShowConfig, ShowResult } from '@/lib/types';
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
import WelcomeScreen from '@/components/WelcomeScreen';
import ParticipantIdForm from '@/components/ParticipantIdForm';
import { WELCOME_SEEN_KEY, PARTICIPANT_ID_KEY } from '@/lib/study';

type AppState = 'loading' | 'welcome' | 'participant-id' | 'idle' | 'preview' | 'generating' | 'ready' | 'ended';

const isMockMode = process.env.NEXT_PUBLIC_MOCK_MODE === 'true';
const TTS_MODE_KEY = 'attune.useMockTts.v2';

const initialProgress: PipelineProgress = {
  news: 'wait',
  weather: 'wait',
  llm: { status: 'wait', done: 0, total: 0 },
  tts: { status: 'wait', done: 0, total: 0 },
  mix: 'wait',
};

function applyProgressEvent(prev: PipelineProgress, e: ProgressEvent): PipelineProgress {
  if (e.type === 'step') {
    if (e.key === 'fetch-news') return { ...prev, news: e.status === 'start' ? 'run' : 'done' };
    if (e.key === 'fetch-weather') return { ...prev, weather: e.status === 'start' ? 'run' : 'done' };
    return prev;
  }
  if (e.type === 'segment') {
    if (e.phase === 'llm') {
      const done = e.status === 'done' ? Math.max(prev.llm.done, e.index + 1) : prev.llm.done;
      const status: 'run' | 'done' = done >= e.total && e.total > 0 ? 'done' : 'run';
      return { ...prev, llm: { status, done, total: e.total } };
    }
    if (e.phase === 'tts') {
      const done = e.status === 'done' ? Math.max(prev.tts.done, e.index + 1) : prev.tts.done;
      const status: 'run' | 'done' = done >= e.total && e.total > 0 ? 'done' : 'run';
      return { ...prev, tts: { status, done, total: e.total } };
    }
  }
  if (e.type === 'done') {
    return {
      ...prev,
      news: 'done',
      weather: 'done',
      llm: { ...prev.llm, status: 'done' },
      tts: { ...prev.tts, status: 'done' },
      mix: 'done',
    };
  }
  return prev;
}

export default function Home() {
  // Start in 'loading' so SSR and the first client render agree on empty output;
  // the useEffect below decides whether to land on welcome / participant-id / idle.
  const [appState, setAppState] = useState<AppState>('loading');
  const [participantId, setParticipantId] = useState<string | null>(null);
  const [pendingConfig, setPendingConfig] = useState<ShowConfig | null>(null);
  const [showResult, setShowResult] = useState<ShowResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [spotifyConnected, setSpotifyConnected] = useState(false);
  const [showRationale, setShowRationale] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [useMockTts, setUseMockTts] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState(false);
  const [progress, setProgress] = useState<PipelineProgress>(initialProgress);

  const endTimeRef = useRef('');

  // Hydrate welcome / participant-id flow from localStorage on first mount.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const welcomeSeen = localStorage.getItem(WELCOME_SEEN_KEY) === 'true';
    const storedPid = localStorage.getItem(PARTICIPANT_ID_KEY);
    if (storedPid) setParticipantId(storedPid);

    if (!welcomeSeen) {
      setAppState('welcome');
    } else if (!storedPid) {
      setAppState('participant-id');
    } else {
      setAppState('idle');
    }
  }, []);

  // Hydrate TTS mode from localStorage; default to ElevenLabs (real) if unset.
  // Defer reading until after mount so SSR and first client render match.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(TTS_MODE_KEY);
    if (stored === 'true') setUseMockTts(true);
    else if (stored === 'false') setUseMockTts(false);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !hydrated) return;
    localStorage.setItem(TTS_MODE_KEY, String(useMockTts));
  }, [useMockTts, hydrated]);

  // Welcome → participant-id (or idle, if ID was set previously somehow)
  const handleWelcomeContinue = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(WELCOME_SEEN_KEY, 'true');
    }
    setAppState(participantId ? 'idle' : 'participant-id');
  };

  // Participant-id → idle (persist the entered ID)
  const handleParticipantIdSubmit = (id: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(PARTICIPANT_ID_KEY, id);
    }
    setParticipantId(id);
    setAppState('idle');
  };

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
    setError(null);
    setProgress(initialProgress);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...pendingConfig, useMockTts }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Unbekannter Fehler');
      }
      if (!res.body) {
        throw new Error('Keine Antwort vom Server.');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let finalResult: ShowResult | null = null;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buffer.indexOf('\n')) !== -1) {
          const line = buffer.slice(0, nl).trim();
          buffer = buffer.slice(nl + 1);
          if (!line) continue;
          let event: ProgressEvent;
          try {
            event = JSON.parse(line) as ProgressEvent;
          } catch {
            continue;
          }
          if (event.type === 'error') {
            throw new Error(event.message);
          }
          setProgress((prev) => applyProgressEvent(prev, event));
          if (event.type === 'done') {
            finalResult = event.result;
          }
        }
      }

      if (!finalResult) {
        throw new Error('Sendung konnte nicht generiert werden.');
      }
      setShowResult(finalResult);
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
      {hydrated && (isMockMode || useMockTts) && <MockBanner ttsMode={useMockTts ? 'mock' : 'real'} />}

      <main style={{
        maxWidth: 520, margin: '0 auto',
        padding: '32px 24px 64px',
        display: 'flex', flexDirection: 'column', gap: 32,
      }}>

        {/* ── Participant-ID Badge (shown once the ID is set) ── */}
        {participantId && appState !== 'welcome' && appState !== 'participant-id' && appState !== 'loading' && (
          <div style={{
            display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8,
            marginBottom: -16,
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase',
              letterSpacing: '0.16em', color: 'var(--ink-3)',
            }}>Teilnehmer-ID</span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink)',
              padding: '4px 8px', border: '1px solid var(--rule-strong)', borderRadius: 2,
            }}>{participantId}</span>
          </div>
        )}

        {/* ── S0a: Welcome ─────────────────────────────── */}
        {appState === 'welcome' && (
          <WelcomeScreen onContinue={handleWelcomeContinue} />
        )}

        {/* ── S0b: Participant-ID entry ────────────────── */}
        {appState === 'participant-id' && (
          <ParticipantIdForm onSubmit={handleParticipantIdSubmit} />
        )}

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
                        · ca. {(() => {
                          const SPOKEN: Record<number, number> = { 5: 2, 10: 4, 15: 6 };
                          const TRACKS: Record<number, number> = { 5: 1, 10: 2, 15: 3 };
                          const len = pendingConfig.targetLengthMin;
                          const spoken = SPOKEN[len] ?? 4;
                          const tracks = pendingConfig.includeMusic !== false ? (TRACKS[len] ?? 2) : 0;
                          return spoken + tracks * 3;
                        })()} Min
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
              <ApiDisclaimer />
              <details style={{ marginTop: 4 }}>
                <summary style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase',
                  letterSpacing: '0.16em', color: 'var(--ink-3)', cursor: 'pointer',
                  listStyle: 'none', userSelect: 'none',
                }}>
                  Erweiterte Einstellungen · nur für Entwickler
                </summary>
                <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <p style={{
                    fontFamily: 'var(--font-sans)', fontSize: 12.5, lineHeight: 1.5,
                    color: 'var(--ink-3)', margin: 0,
                  }}>
                    Dieser Abschnitt ist nur für Entwickler gedacht. Für die Studie
                    bitte unverändert lassen («Real (ElevenLabs)»).
                  </p>
                  <TtsModeToggle value={useMockTts} onChange={setUseMockTts} />
                </div>
              </details>
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
            progress={progress}
            error={error}
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
            participantId={participantId}
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
