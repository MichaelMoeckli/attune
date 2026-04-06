'use client';

import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import type { ShowResult, Segment } from '@/lib/types';
import SpotifyPlayerComponent from './SpotifyPlayer';

const SEGMENT_LABELS: Record<string, string> = {
  jingle: 'Jingle',
  greeting: 'Begrüssung',
  news: 'Nachrichten',
  weather: 'Wetter',
  music: 'Musik',
  farewell: 'Verabschiedung',
};

interface AudioPlayerProps {
  showResult: ShowResult | null;
  isGenerating: boolean;
  spotifyConnected: boolean;
}

export default function AudioPlayer({ showResult, isGenerating, spotifyConnected }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isBrowserTts = useRef(false);

  const playableSegments = useMemo(
    () => showResult?.segments.filter((s) => s.audioUrl || s.spotifyUri) || [],
    [showResult],
  );
  const currentSegment: Segment | undefined = playableSegments[currentIndex];
  const isSpotifySegment = !!(currentSegment?.spotifyUri && spotifyConnected);

  const playSegment = useCallback(
    (index: number) => {
      if (index >= playableSegments.length) {
        setIsPlaying(false);
        setCurrentIndex(-1);
        return;
      }

      const segment = playableSegments[index];

      // Skip segments with neither audio source
      if (!segment.audioUrl && !segment.spotifyUri) {
        playSegment(index + 1);
        return;
      }

      // Stop any ongoing browser TTS
      if (isBrowserTts.current) {
        window.speechSynthesis.cancel();
        isBrowserTts.current = false;
      }

      setCurrentIndex(index);
      setProgress(0);

      // Spotify segments are handled by SpotifyPlayerComponent
      if (segment.spotifyUri && spotifyConnected) {
        return;
      }

      // Browser TTS segments (mock mode)
      if (segment.audioUrl === 'browser-tts' && segment.text) {
        isBrowserTts.current = true;
        const utterance = new SpeechSynthesisUtterance(segment.text);
        utterance.lang = 'de-DE';
        utterance.onend = () => {
          isBrowserTts.current = false;
          playSegment(index + 1);
        };
        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
        return;
      }

      // HTML5 audio segments
      const audio = audioRef.current;
      if (!audio || !segment.audioUrl) {
        playSegment(index + 1);
        return;
      }

      audio.src = segment.audioUrl;
      audio.play().catch((err) => {
        console.warn('[AudioPlayer] Playback failed:', err);
      });
    },
    [playableSegments, spotifyConnected],
  );

  // Start playback when show result arrives
  useEffect(() => {
    if (showResult && playableSegments.length > 0 && currentIndex === -1) {
      playSegment(0);
      setIsPlaying(true);
    }
  }, [showResult, playableSegments.length, currentIndex, playSegment]);

  const handleEnded = () => {
    playSegment(currentIndex + 1);
  };

  const handleSpotifyTrackEnd = useCallback(() => {
    playSegment(currentIndex + 1);
  }, [currentIndex, playSegment]);

  const handleSpotifyPlayingChange = useCallback((playing: boolean) => {
    setIsPlaying(playing);
  }, []);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      setProgress((audio.currentTime / audio.duration) * 100);
    }
  };

  const togglePlayPause = () => {
    if (isBrowserTts.current) {
      if (isPlaying) {
        window.speechSynthesis.pause();
        setIsPlaying(false);
      } else {
        window.speechSynthesis.resume();
        setIsPlaying(true);
      }
      return;
    }

    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const skipNext = () => {
    if (currentIndex < playableSegments.length - 1) {
      if (isBrowserTts.current) window.speechSynthesis.cancel();
      playSegment(currentIndex + 1);
    }
  };

  const skipPrev = () => {
    if (currentIndex > 0) {
      if (isBrowserTts.current) window.speechSynthesis.cancel();
      playSegment(currentIndex - 1);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-6 text-white shadow-xl">
      <audio
        ref={audioRef}
        onEnded={handleEnded}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Spotify Web Playback SDK (invisible — handles Spotify segments) */}
      {spotifyConnected && currentSegment?.spotifyUri && (
        <SpotifyPlayerComponent
          spotifyUri={currentSegment.spotifyUri}
          isActive={isSpotifySegment}
          onTrackEnd={handleSpotifyTrackEnd}
          onPlayingChange={handleSpotifyPlayingChange}
        />
      )}

      {/* Station name */}
      <div className="mb-4 text-center">
        <h2 className="text-xl font-bold tracking-wide">Radio 25</h2>
        {isGenerating && !showResult && (
          <p className="mt-1 text-sm text-zinc-400">Sendung wird generiert...</p>
        )}
      </div>

      {/* Current segment info */}
      {currentSegment && (
        <div className="mb-4 text-center">
          <span className="inline-block rounded-full bg-zinc-700 px-3 py-1 text-xs font-medium uppercase tracking-wider">
            {SEGMENT_LABELS[currentSegment.type] || currentSegment.type}
          </span>
          {currentSegment.spotifyTrackName && (
            <p className="mt-1 text-sm text-amber-400">{currentSegment.spotifyTrackName}</p>
          )}
          <p className="mt-1 text-sm text-zinc-300">
            Segment {currentIndex + 1} von {playableSegments.length}
          </p>
        </div>
      )}

      {/* Progress bar */}
      <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-zinc-700">
        <div
          className="h-full rounded-full bg-amber-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={skipPrev}
          disabled={currentIndex <= 0}
          className="text-zinc-400 transition hover:text-white disabled:opacity-30"
          aria-label="Vorheriges Segment"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path d="M9.195 18.44c1.25.713 2.805-.19 2.805-1.629v-2.34l6.945 3.968c1.25.714 2.805-.188 2.805-1.628V7.19c0-1.44-1.555-2.342-2.805-1.628L12 9.53V7.19c0-1.44-1.555-2.342-2.805-1.628l-7.108 4.061c-1.26.72-1.26 2.536 0 3.256l7.108 4.061z" />
          </svg>
        </button>

        <button
          onClick={togglePlayPause}
          disabled={!showResult || playableSegments.length === 0}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-zinc-900 transition hover:bg-amber-400 disabled:opacity-30"
          aria-label={isPlaying ? 'Pause' : 'Abspielen'}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
              <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
              <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        <button
          onClick={skipNext}
          disabled={currentIndex >= playableSegments.length - 1}
          className="text-zinc-400 transition hover:text-white disabled:opacity-30"
          aria-label="Nächstes Segment"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path d="M5.055 7.06c-1.25-.714-2.805.189-2.805 1.628v9.726c0 1.44 1.555 2.342 2.805 1.628L12 16.471v2.34c0 1.44 1.555 2.342 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256l-7.108-4.06C13.555 8.346 12 9.25 12 10.69v2.34L5.055 7.06z" />
          </svg>
        </button>
      </div>

      {/* Transcript */}
      {currentSegment?.text && (
        <div className="mt-4 max-h-24 overflow-y-auto rounded-lg bg-zinc-800 p-3">
          <p className="text-xs leading-relaxed text-zinc-400">{currentSegment.text}</p>
        </div>
      )}
    </div>
  );
}
