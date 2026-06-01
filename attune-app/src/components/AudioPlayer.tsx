'use client';

import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import type { ShowResult, Segment } from '@/lib/types';
import SpotifyPlayerComponent from './SpotifyPlayer';
import SourceList from './SourceList';
import HelpButton from './HelpButton';
import type { NewsArticle } from '@/lib/types';

const SEGMENT_LABELS: Record<string, string> = {
  jingle:   'Jingle',
  greeting: 'Begrüssung',
  news:     'Nachrichten',
  weather:  'Wetter',
  music:    'Musik',
  farewell: 'Verabschiedung',
};

// Short pause between segments — gives the listener a moment to "land" before
// the next block starts (radio convention, also matches the prompt-level pauses
// inserted between individual news items). Manual skip bypasses this.
const SEGMENT_GAP_MS = 800;

interface AudioPlayerProps {
  showResult: ShowResult;
  spotifyConnected: boolean;
  onEnded: () => void;
  onOpenRationale: () => void;
}

function isNewsArticleArray(data: Segment['data']): data is NewsArticle[] {
  return Array.isArray(data);
}

export default function AudioPlayer({ showResult, spotifyConnected, onEnded, onOpenRationale }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isBrowserTts = useRef(false);
  const hasStartedRef = useRef(false);
  const gapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearGapTimer = useCallback(() => {
    if (gapTimerRef.current) {
      clearTimeout(gapTimerRef.current);
      gapTimerRef.current = null;
    }
  }, []);

  const playableSegments = useMemo(
    () => showResult.segments.filter(s => s.audioUrl || s.spotifyUri),
    [showResult],
  );
  const currentSegment: Segment | undefined = playableSegments[currentIndex];
  const isSpotifySegment = !!(currentSegment?.spotifyUri && spotifyConnected);

  const playSegment = useCallback((index: number) => {
    clearGapTimer();
    if (index >= playableSegments.length) {
      setIsPlaying(false);
      setCurrentIndex(-1);
      onEnded();
      return;
    }

    const segment = playableSegments[index];
    if (!segment.audioUrl && !segment.spotifyUri) { playSegment(index + 1); return; }

    if (isBrowserTts.current) { window.speechSynthesis.cancel(); isBrowserTts.current = false; }

    setCurrentIndex(index);
    setProgress(0);
    setElapsed(0);
    setDuration(0);
    hasStartedRef.current = true;

    if (segment.spotifyUri && spotifyConnected) return;

    if (segment.audioUrl === 'browser-tts' && segment.text) {
      isBrowserTts.current = true;
      const utt = new SpeechSynthesisUtterance(segment.text);
      utt.lang = 'de-DE';
      utt.onend = () => {
        isBrowserTts.current = false;
        // Short pause before the next segment kicks in.
        gapTimerRef.current = setTimeout(() => playSegment(index + 1), SEGMENT_GAP_MS);
      };
      utteranceRef.current = utt;
      window.speechSynthesis.speak(utt);
      return;
    }

    const audio = audioRef.current;
    if (!audio || !segment.audioUrl) { playSegment(index + 1); return; }
    audio.src = segment.audioUrl;
    audio.play().catch(e => console.warn('[AudioPlayer]', e));
  }, [playableSegments, spotifyConnected, onEnded, clearGapTimer]);

  // Cleanup any pending gap timer on unmount.
  useEffect(() => clearGapTimer, [clearGapTimer]);

  useEffect(() => {
    if (playableSegments.length > 0 && currentIndex === -1 && !hasStartedRef.current) {
      playSegment(0);
      setIsPlaying(true);
    }
  }, [playableSegments.length, currentIndex, playSegment]);

  const togglePlayPause = () => {
    if (isBrowserTts.current) {
      if (isPlaying) { window.speechSynthesis.pause(); setIsPlaying(false); }
      else { window.speechSynthesis.resume(); setIsPlaying(true); }
      return;
    }
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) { audio.pause(); setIsPlaying(false); }
    else { audio.play(); setIsPlaying(true); }
  };

  const skipNext = () => {
    if (currentIndex < playableSegments.length - 1) {
      clearGapTimer();
      if (isBrowserTts.current) window.speechSynthesis.cancel();
      playSegment(currentIndex + 1);
    }
  };

  const skipPrev = () => {
    if (currentIndex > 0) {
      clearGapTimer();
      if (isBrowserTts.current) window.speechSynthesis.cancel();
      playSegment(currentIndex - 1);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      setProgress((audio.currentTime / audio.duration) * 100);
      setElapsed(audio.currentTime);
      setDuration(audio.duration);
    }
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  // All sources for current segment (was: only data[0])
  const currentSources: NewsArticle[] = currentSegment && isNewsArticleArray(currentSegment.data)
    ? currentSegment.data
    : [];
  const sourceCheck = currentSegment?.sourceCheck;

  return (
    <div style={{
      background: 'var(--paper)',
      boxShadow: 'var(--shadow-instrument)',
      borderRadius: 4,
      padding: '22px 24px',
      display: 'flex', flexDirection: 'column', gap: 18,
    }}>
      <audio
        ref={audioRef}
        onEnded={() => {
          const next = currentIndex + 1;
          // Short pause before the next segment kicks in.
          gapTimerRef.current = setTimeout(() => playSegment(next), SEGMENT_GAP_MS);
        }}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedMetadata={() => {
          if (audioRef.current) setDuration(audioRef.current.duration);
        }}
      />

      {spotifyConnected && currentSegment?.spotifyUri && (
        <SpotifyPlayerComponent
          spotifyUri={currentSegment.spotifyUri}
          isActive={isSpotifySegment}
          onTrackEnd={() => playSegment(currentIndex + 1)}
          onPlayingChange={setIsPlaying}
        />
      )}

      {/* Segment header */}
      <div>
        <div style={{
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          gap: 10,
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase',
              letterSpacing: '0.16em', color: 'var(--ink-3)',
            }}>sendung läuft · Schritt 3 / 4</span>
            <HelpButton label="Was ist zu tun?">
              Lehn dich zurück und hör die Sendung vollständig durch — bitte mit
              Kopfhörern oder in einer ruhigen Umgebung. Du kannst zwischen Segmenten
              springen (◀ ▶) oder pausieren, aber für die Studie ist es wichtig,
              dass du die ganze Sendung hörst. Unten findest du den «Quellen»-Bereich
              (welche Artikel die Nachricht stützen) und das «Transkript» (der vollständige
              gesprochene Text). Wenn die Sendung endet, erscheint automatisch der
              Fragebogen-Link.
            </HelpButton>
          </span>
          {duration > 0 && (
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink)',
              fontVariantNumeric: 'tabular-nums',
            }}>
              {formatTime(elapsed)} / {formatTime(duration)}
            </span>
          )}
        </div>
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 22,
          lineHeight: 1.15, letterSpacing: 'var(--tracking-tight)', color: 'var(--ink)',
          marginTop: 4,
        }}>
          {currentSegment
            ? SEGMENT_LABELS[currentSegment.type] ?? currentSegment.type
            : 'Bereit'}
          {currentSegment?.spotifyTrackName && (
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ink-3)',
              marginLeft: 10, fontWeight: 400,
            }}>
              · {currentSegment.spotifyTrackName}
            </span>
          )}
        </h1>
        {currentIndex >= 0 && (
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)', marginTop: 4,
          }}>
            segment {currentIndex + 1} von {playableSegments.length}
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div>
        <div style={{ height: 2, background: 'var(--rule)', position: 'relative' }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0,
            width: `${progress}%`, background: 'var(--brass)',
            transition: 'width 0.3s linear',
          }}/>
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between', marginTop: 6,
          fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-3)',
          fontVariantNumeric: 'tabular-nums',
        }}>
          <span>{formatTime(elapsed)}</span>
          {duration > 0 && <span>noch {formatTime(Math.max(0, duration - elapsed))}</span>}
        </div>
      </div>

      {/* Transparenz — sources block */}
      {currentSources.length > 0 && (
        <div style={{
          borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)',
          padding: '10px 0',
        }}>
          <SourceList sources={currentSources} />
          {sourceCheck?.hasUnverifiedMention && (
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)',
              padding: '8px 0 0', display: 'flex', gap: 8, alignItems: 'flex-start',
              borderTop: '1px dotted var(--rule)', marginTop: 8,
            }}>
              <span style={{ color: 'var(--brass-deep)' }}>[!]</span>
              <span>
                Im Audio wird {sourceCheck.unverifiedOutlets.join(', ')} erwähnt, aber nicht in den oben gelisteten Artikeln verlinkt. Mögliche Ungenauigkeit der Sprache.
              </span>
            </div>
          )}
        </div>
      )}

      {/* Transcript */}
      {currentSegment?.text && (
        <div style={{
          background: 'var(--paper-2)', padding: '12px 14px',
          borderLeft: '2px solid var(--rule-strong)',
          maxHeight: 96, overflowY: 'auto',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase',
            letterSpacing: '0.16em', color: 'var(--ink-3)', marginBottom: 6,
          }}>transkript</div>
          <p style={{
            fontFamily: 'var(--font-serif)', fontSize: 14, lineHeight: 1.5, color: 'var(--ink-2)',
            whiteSpace: 'pre-line',
          }}>
            {currentSegment.text}
          </p>
        </div>
      )}

      {/* Player controls */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28,
        padding: '4px 0',
      }}>
        <button
          onClick={skipPrev}
          disabled={currentIndex <= 0}
          style={{
            background: 'transparent', border: 0, cursor: 'pointer',
            color: currentIndex <= 0 ? 'var(--ink-4)' : 'var(--ink)',
            display: 'flex', padding: 8,
          }}
          aria-label="Vorheriges Segment"
        >
          <SkipBackIcon />
        </button>

        <button
          onClick={togglePlayPause}
          disabled={playableSegments.length === 0}
          style={{
            width: 56, height: 56, borderRadius: 28,
            background: 'var(--ink)', color: 'var(--paper)',
            border: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0,
            opacity: playableSegments.length === 0 ? 0.4 : 1,
          }}
          aria-label={isPlaying ? 'Pause' : 'Abspielen'}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>

        <button
          onClick={skipNext}
          disabled={currentIndex >= playableSegments.length - 1}
          style={{
            background: 'transparent', border: 0, cursor: 'pointer',
            color: currentIndex >= playableSegments.length - 1 ? 'var(--ink-4)' : 'var(--ink)',
            display: 'flex', padding: 8,
          }}
          aria-label="Nächstes Segment"
        >
          <SkipFwdIcon />
        </button>
      </div>

      {/* Segment overview */}
      <details style={{ cursor: 'pointer' }}>
        <summary style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase',
          letterSpacing: '0.16em', color: 'var(--ink-3)', listStyle: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingBottom: 8,
        }}>
          <span>sendung-übersicht</span>
          <ChevronIcon />
        </summary>
        {playableSegments.map((seg, i) => {
          const isCurrent = i === currentIndex;
          const isDone = i < currentIndex;
          return (
            <div key={seg.id} style={{
              display: 'flex', alignItems: 'baseline', gap: 10, padding: '8px 0',
              borderTop: '1px solid var(--rule)',
            }}>
              <span style={{ width: 12, display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                {isDone
                  ? <CheckIcon />
                  : isCurrent
                    ? <span style={{ width: 6, height: 6, background: 'var(--brass)', display: 'inline-block' }}/>
                    : <span style={{ width: 8, height: 8, border: '1.5px solid var(--ink-4)', borderRadius: 4, display: 'inline-block' }}/>
                }
              </span>
              <span style={{
                fontFamily: 'var(--font-sans)', fontSize: 13.5, flex: 1,
                color: isCurrent ? 'var(--ink)' : isDone ? 'var(--ink-3)' : 'var(--ink-2)',
                fontWeight: isCurrent ? 500 : 400,
              }}>
                {SEGMENT_LABELS[seg.type] ?? seg.type}
                {seg.spotifyTrackName && (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)', marginLeft: 8 }}>
                    · {seg.spotifyTrackName}
                  </span>
                )}
              </span>
              {isCurrent && (
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--brass-deep)',
                  letterSpacing: '0.04em',
                }}>aktuell</span>
              )}
            </div>
          );
        })}
        <div style={{ height: 1, background: 'var(--rule)', marginTop: 4 }}/>
      </details>

      {/* Footer: Rationale link */}
      <div>
        <button
          onClick={onOpenRationale}
          style={{
            fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500,
            background: 'transparent', color: 'var(--ink)', border: 0,
            cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '8px 0',
          }}
        >
          <InfoIcon /> Warum diese Sendung?
        </button>
      </div>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="7,5 19,12 7,19"/>
    </svg>
  );
}
function PauseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <rect x="7" y="5" width="3.5" height="14"/>
      <rect x="13.5" y="5" width="3.5" height="14"/>
    </svg>
  );
}
function SkipBackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="18,5 8,12 18,19"/>
      <rect x="5" y="5" width="2" height="14"/>
    </svg>
  );
}
function SkipFwdIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="6,5 16,12 6,19"/>
      <rect x="17" y="5" width="2" height="14"/>
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="var(--ink-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="5,12 10,17 19,7"/>
    </svg>
  );
}
function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6,9 12,15 18,9"/>
    </svg>
  );
}
function InfoIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <line x1="12" y1="11" x2="12" y2="16"/>
      <circle cx="12" cy="8" r="0.6" fill="currentColor"/>
    </svg>
  );
}
