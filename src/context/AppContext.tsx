import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  currentUser as seedUser,
  universes as seedUniverses,
} from '../data/mockData';
import type {MoodId, Universe, User} from '../data/types';
import type {GradientName} from '../theme';

export type DraftUniverse = {
  mood: MoodId;
  intensity: number;
  strokes: number;
  name: string;
  style: string;
};

type AppContextValue = {
  user: User;
  isAuthenticated: boolean;
  universes: Universe[];
  selectedMood: MoodId;
  draft: DraftUniverse;
  selectedUniverseId: string;
  remixChoices: Record<string, 'original' | 'parallel'>;
  signIn: (email: string, name?: string) => void;
  signUp: (name: string, email: string) => void;
  signOut: () => void;
  selectMood: (mood: MoodId) => void;
  updateDraft: (patch: Partial<DraftUniverse>) => void;
  upsertUniverse: (universe: Universe) => void;
  createUniverseFromDraft: (options?: {
    name?: string;
    style?: string;
    gradient?: GradientName;
    mode?: 'parallel' | 'remix';
    displayMood?: string;
  }) => Universe;
  toggleFavorite: (id: string) => void;
  selectUniverse: (id: string) => void;
  setRemixChoice: (ingredient: string, choice: 'original' | 'parallel') => void;
};

const AppContext = createContext<AppContextValue | null>(null);

const initialDraft: DraftUniverse = {
  mood: 'dreamy',
  intensity: 0.62,
  strokes: 9,
  name: 'Dreamscape',
  style: 'Ambient',
};

export function AppProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<User>(seedUser);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [universes, setUniverses] = useState<Universe[]>(seedUniverses);
  const [selectedMood, setSelectedMood] = useState<MoodId>('dreamy');
  const [draft, setDraft] = useState<DraftUniverse>(initialDraft);
  const [selectedUniverseId, setSelectedUniverseId] = useState<string>(
    seedUniverses[0].id,
  );
  const [remixChoices, setRemixChoices] = useState<
    Record<string, 'original' | 'parallel'>
  >({melody: 'original', beat: 'parallel', bass: 'original', atmosphere: 'parallel'});

  const signIn = useCallback((email: string, name?: string) => {
    setUser(prev => ({
      ...prev,
      email: email || prev.email,
      name: name?.trim() || prev.name,
    }));
    setAuthenticated(true);
  }, []);

  const signUp = useCallback((name: string, email: string) => {
    setUser(prev => ({
      ...prev,
      name: name.trim() || prev.name,
      email: email || prev.email,
      handle: `@${(name.trim() || 'SonicExplorer').replace(/\s+/g, '')}`,
    }));
    setAuthenticated(true);
  }, []);

  const signOut = useCallback(() => setAuthenticated(false), []);

  const selectMood = useCallback((mood: MoodId) => {
    setSelectedMood(mood);
    setDraft(prev => ({...prev, mood}));
  }, []);

  const updateDraft = useCallback((patch: Partial<DraftUniverse>) => {
    setDraft(prev => ({...prev, ...patch}));
  }, []);

  const upsertUniverse = useCallback((universe: Universe) => {
    setUniverses(prev => {
      const exists = prev.some(item => item.id === universe.id);
      if (exists) {
        return prev.map(item => (item.id === universe.id ? universe : item));
      }
      return [universe, ...prev];
    });
    setSelectedUniverseId(universe.id);
  }, []);

  const createUniverseFromDraft = useCallback(
    (options?: {
      name?: string;
      style?: string;
      gradient?: GradientName;
      mode?: 'parallel' | 'remix';
      displayMood?: string;
    }) => {
      const seed = seedUniverses;
      const index = universes.length + 1;
      const name =
        options?.name ??
        (options?.mode === 'remix'
          ? 'My Sonicverse'
          : `Universe ${['I', 'II', 'III', 'IV', 'V'][index % 5]}`);
      const created: Universe = {
        ...seed[0],
        id: `universe-${Date.now()}`,
        name,
        mood: draft.mood,
        style: options?.style ?? draft.style,
        displayMood: options?.displayMood,
        gradient: options?.gradient ?? seed[index % seed.length].gradient,
        duration: 134,
        createdAt: 'Just now',
        isOriginal: false,
        isFavorite: false,
        stats: {
          melody: 0.55 + draft.intensity * 0.3,
          rhythm: 0.5 + draft.intensity * 0.2,
          energy: 0.35 + draft.intensity * 0.5,
          atmosphere: 0.9 - draft.intensity * 0.25,
        },
      };
      upsertUniverse(created);
      return created;
    },
    [draft, universes.length, upsertUniverse],
  );

  const toggleFavorite = useCallback((id: string) => {
    setUniverses(prev =>
      prev.map(item =>
        item.id === id ? {...item, isFavorite: !item.isFavorite} : item,
      ),
    );
  }, []);

  const selectUniverse = useCallback((id: string) => {
    setSelectedUniverseId(id);
  }, []);

  const setRemixChoice = useCallback(
    (ingredient: string, choice: 'original' | 'parallel') => {
      setRemixChoices(prev => ({...prev, [ingredient]: choice}));
    },
    [],
  );

  const value = useMemo<AppContextValue>(
    () => ({
      user,
      isAuthenticated,
      universes,
      selectedMood,
      draft,
      selectedUniverseId,
      remixChoices,
      signIn,
      signUp,
      signOut,
      selectMood,
      updateDraft,
      upsertUniverse,
      createUniverseFromDraft,
      toggleFavorite,
      selectUniverse,
      setRemixChoice,
    }),
    [
      user,
      isAuthenticated,
      universes,
      selectedMood,
      draft,
      selectedUniverseId,
      remixChoices,
      signIn,
      signUp,
      signOut,
      selectMood,
      updateDraft,
      upsertUniverse,
      createUniverseFromDraft,
      toggleFavorite,
      selectUniverse,
      setRemixChoice,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used inside AppProvider');
  }
  return context;
}
