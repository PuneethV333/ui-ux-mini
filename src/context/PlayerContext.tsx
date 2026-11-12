import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {universes as seedUniverses} from '../data/mockData';
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
  const [isPlaying, setPlaying] = useState(false);
  const [position, setPosition] = useState(24);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }
    tickRef.current = setInterval(() => {
      setPosition(prev => {
        if (prev + 1 >= current.duration) {
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => {
      if (tickRef.current) {
        clearInterval(tickRef.current);
      }
    };
  }, [isPlaying, current.duration]);

  const play = useCallback((universe: Universe) => {
    setCurrent(universe);
    setPosition(0);
    setPlaying(true);
    setQueue(prev => {
      if (prev.some(item => item.id === universe.id)) {
        return prev;
      }
      return [...prev, universe];
    });
  }, []);

  const pause = useCallback(() => setPlaying(false), []);

  const toggle = useCallback(
    (universe?: Universe) => {
      if (universe && universe.id !== current.id) {
        play(universe);
        return;
      }
      setPlaying(prev => !prev);
    },
    [current.id, play],
  );

  const seek = useCallback(
    (ratio: number) => {
      const clamped = Math.max(0, Math.min(1, ratio));
      setPosition(Math.round(clamped * current.duration));
    },
    [current.duration],
  );

  const step = useCallback(
    (offset: number) => {
      const index = queue.findIndex(item => item.id === current.id);
      const nextIndex = (index + offset + queue.length) % queue.length;
      const nextUniverse = queue[nextIndex] ?? current;
      setCurrent(nextUniverse);
      setPosition(0);
      setPlaying(true);
    },
    [current, queue],
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
      progress: Math.min(1, position / current.duration),
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
