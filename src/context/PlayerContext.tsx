import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {AppState} from 'react-native';
import {
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
} from 'expo-audio';
import {universes as seedUniverses} from '../data/mockData';
import {audioForUniverse} from '../data/audioTracks';
import type {Universe} from '../data/types';

type PlayerContextValue = {
  current: Universe;
  queue: Universe[];
  isPlaying: boolean;
  position: number;
  progress: number;
  play: (universe: Universe) => void;
  pause: () => void;
  toggle: (universe?: Universe) => void;
  seek: (ratio: number) => void;
  next: () => void;
  previous: () => void;
  isCurrent: (id: string) => boolean;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({children}: {children: React.ReactNode}) {
  const [queue, setQueue] = useState<Universe[]>(seedUniverses);
  const [current, setCurrent] = useState<Universe>(seedUniverses[0]);
  const player = useAudioPlayer(undefined, {updateInterval: 250});
  const status = useAudioPlayerStatus(player);

  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      interruptionMode: 'doNotMix',
    }).catch(() => {
      // Audio focus is best-effort; playback still works without it.
    });
  }, []);

  useEffect(() => {
    player.loop = true;
  }, [player]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', state => {
      if (state !== 'active') {
        player.pause();
      }
    });
    return () => subscription.remove();
  }, [player]);

  const isPlaying = status.playing;
  const position = status.currentTime;

  const play = useCallback(
    (universe: Universe) => {
      setCurrent(universe);
      player.replace(audioForUniverse(universe));
      player.loop = true;
      player.play();
      setQueue(prev => {
        if (prev.some(item => item.id === universe.id)) {
          return prev;
        }
        return [...prev, universe];
      });
    },
    [player],
  );

  const pause = useCallback(() => {
    player.pause();
  }, [player]);

  const toggle = useCallback(
    (universe?: Universe) => {
      if (universe && universe.id !== current.id) {
        play(universe);
        return;
      }
      if (status.playing) {
        player.pause();
        return;
      }
      if (!status.isLoaded) {
        play(current);
        return;
      }
      if (status.didJustFinish) {
        player.seekTo(0).catch(() => {});
      }
      player.play();
    },
    [current, play, player, status.didJustFinish, status.isLoaded, status.playing],
  );

  const seek = useCallback(
    (ratio: number) => {
      const clamped = Math.max(0, Math.min(1, ratio));
      const duration = status.duration || current.duration;
      player.seekTo(clamped * duration).catch(() => {});
    },
    [current.duration, player, status.duration],
  );

  const step = useCallback(
    (offset: number) => {
      const index = queue.findIndex(item => item.id === current.id);
      const nextIndex = (index + offset + queue.length) % queue.length;
      const nextUniverse = queue[nextIndex] ?? current;
      play(nextUniverse);
    },
    [current, play, queue],
  );

  const next = useCallback(() => step(1), [step]);
  const previous = useCallback(() => step(-1), [step]);

  const isCurrent = useCallback(
    (id: string) => current.id === id,
    [current.id],
  );

  const value = useMemo<PlayerContextValue>(
    () => ({
      current,
      queue,
      isPlaying,
      position,
      progress: Math.min(1, position / (status.duration || current.duration)),
      play,
      pause,
      toggle,
      seek,
      next,
      previous,
      isCurrent,
    }),
    [
      current,
      queue,
      isPlaying,
      position,
      status.duration,
      play,
      pause,
      toggle,
      seek,
      next,
      previous,
      isCurrent,
    ],
  );

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used inside PlayerProvider');
  }
  return context;
}
