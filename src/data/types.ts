import type {GradientName} from '../theme';

export type MoodId =
  | 'happy'
  | 'calm'
  | 'energetic'
  | 'motivational'
  | 'sad'
  | 'angry'
  | 'dreamy'
  | 'melancholy';

export type Mood = {
  id: MoodId;
  label: string;
  tagline: string;
  emoji: string;
  gradient: GradientName;
  accent: string;
};

export type UniverseStats = {
  melody: number;
  rhythm: number;
  energy: number;
  atmosphere: number;
};

export type Universe = {
  id: string;
  name: string;
  mood: MoodId;
  style: string;
  displayMood?: string;
  duration: number;
  createdAt: string;
  description: string;
  gradient: GradientName;
  stats: UniverseStats;
  isFavorite: boolean;
  isOriginal?: boolean;
};

export type DiscoverItem = {
  id: string;
  title: string;
  creator: string;
  mood: MoodId;
  style: string;
  gradient: GradientName;
  plays: string;
  duration: number;
};

export type MapNode = {
  id: string;
  universeId: string;
  label: string;
  moodStyle: string;
  x: number;
  y: number;
  parentId?: string;
};

export type RemixIngredient = {
  id: string;
  label: string;
  icon: string;
  originalLabel: string;
  parallelLabel: string;
};

export type User = {
  name: string;
  handle: string;
  email: string;
  universes: number;
  remixes: number;
  joined: string;
};

export type OnboardingSlide = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  gradient: GradientName;
  accent: string;
};
