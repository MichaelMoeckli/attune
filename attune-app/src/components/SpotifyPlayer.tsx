'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// Spotify Web Playback SDK types
interface SpotifyPlayer {
  connect: () => Promise<boolean>;
  disconnect: () => void;
  addListener: (event: string, callback: (...args: unknown[]) => void) => void;
  removeListener: (event: string) => void;
  getCurrentState: () => Promise<SpotifyPlaybackState | null>;
  resume: () => Promise<void>;
  pause: () => Promise<void>;
  seek: (positionMs: number) => Promise<void>;
}

interface SpotifyPlaybackState {
  paused: boolean;
  position: number;
  duration: number;
  track_window: {
    current_track: {
      name: string;
      artists: Array<{ name: string }>;
      uri: string;
    };
  };
}

declare global {
  interface Window {
    Spotify: {
      Player: new (options: {
        name: string;
        getOAuthToken: (cb: (token: string) => void) => void;
        volume: number;
      }) => SpotifyPlayer;
    };
    onSpotifyWebPlaybackSDKReady: () => void;
  }
}

interface SpotifyPlayerProps {
  spotifyUri: string;
  onTrackEnd: () => void;
  isActive: boolean;
  onPlayingChange: (playing: boolean) => void;
}

export default function SpotifyPlayerComponent({
  spotifyUri,
  onTrackEnd,
  isActive,
  onPlayingChange,
}: SpotifyPlayerProps) {
  const playerRef = useRef<SpotifyPlayer | null>(null);
  const deviceIdRef = useRef<string | null>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const trackEndTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getToken = useCallback(async (): Promise<string | null> => {
    try {
      const res = await fetch('/api/spotify/token');
      const data = await res.json();
      return data.accessToken || null;
    } catch {
      return null;
    }
  }, []);

  // Load Spotify SDK script
  useEffect(() => {
    if (window.Spotify) {
      setSdkReady(true);
      return;
    }

    window.onSpotifyWebPlaybackSDKReady = () => setSdkReady(true);

    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Don't remove script on unmount — SDK should persist
    };
  }, []);

  // Initialize player when SDK is ready
  useEffect(() => {
    if (!sdkReady) return;

    const player = new window.Spotify.Player({
      name: 'Attune',
      getOAuthToken: async (cb) => {
        const token = await getToken();
        if (token) cb(token);
      },
      volume: 0.8,
    });

    player.addListener('ready', (({ device_id }: { device_id: string }) => {
      console.log('[SpotifyPlayer] Ready with device:', device_id);
      deviceIdRef.current = device_id;
    }) as (...args: unknown[]) => void);

    player.addListener('not_ready', (() => {
      console.warn('[SpotifyPlayer] Device went offline');
      deviceIdRef.current = null;
    }) as (...args: unknown[]) => void);

    player.addListener('initialization_error', (({ message }: { message: string }) => {
      setError(`Spotify Init-Fehler: ${message}`);
    }) as (...args: unknown[]) => void);

    player.addListener('authentication_error', (() => {
      setError('Spotify nicht verbunden. Bitte zuerst einloggen.');
    }) as (...args: unknown[]) => void);

    player.addListener('player_state_changed', ((state: SpotifyPlaybackState | null) => {
      if (!state) return;
      onPlayingChange(!state.paused);
    }) as (...args: unknown[]) => void);

    player.connect();
    playerRef.current = player;

    return () => {
      player.disconnect();
      playerRef.current = null;
    };
  }, [sdkReady, getToken, onPlayingChange]);

  // Play track when spotifyUri changes and this player is active
  useEffect(() => {
    if (!isActive || !spotifyUri || !deviceIdRef.current) return;

    const playTrack = async () => {
      const token = await getToken();
      if (!token || !deviceIdRef.current) return;

      try {
        const res = await fetch(
          `https://api.spotify.com/v1/me/player/play?device_id=${deviceIdRef.current}`,
          {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uris: [spotifyUri] }),
          },
        );

        if (!res.ok) {
          console.warn('[SpotifyPlayer] Play failed:', res.status);
          // If playback fails, skip to next segment
          onTrackEnd();
        }
      } catch {
        onTrackEnd();
      }
    };

    playTrack();

    // Poll for track end (SDK state_changed doesn't always fire on track end)
    trackEndTimerRef.current = setInterval(async () => {
      const state = await playerRef.current?.getCurrentState();
      if (state && state.position >= state.duration - 500 && state.duration > 0) {
        onTrackEnd();
      }
    }, 1000);

    return () => {
      if (trackEndTimerRef.current) clearInterval(trackEndTimerRef.current);
    };
  }, [isActive, spotifyUri, getToken, onTrackEnd]);

  // Pause when not active
  useEffect(() => {
    if (!isActive && playerRef.current) {
      playerRef.current.pause().catch(() => {});
    }
  }, [isActive]);

  if (error) {
    return (
      <p className="text-xs text-red-400">{error}</p>
    );
  }

  return null; // No visible UI — playback is handled by the SDK
}

export function useSpotifyStatus() {
  const [isConnected, setIsConnected] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    fetch('/api/spotify/token')
      .then((res) => res.json())
      .then((data) => setIsConnected(!!data.accessToken))
      .catch(() => setIsConnected(false))
      .finally(() => setIsChecking(false));
  }, []);

  return { isConnected, isChecking };
}
