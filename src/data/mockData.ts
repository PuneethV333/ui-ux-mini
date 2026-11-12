import type {
  DiscoverItem,
  MapNode,
  Mood,
  OnboardingSlide,
  RemixIngredient,
  Universe,
  User,
} from './types';

/**
 * All content in Sonicverse is local mock data. There is no network layer:
 * screens read from this module and keep mutations in React Context.
 */

export const currentUser: User = {
  name: 'Puneeth',
  handle: '@SonicExplorer',
  email: 'puneeth@sonicverse.app',
  universes: 12,
  remixes: 4,
  joined: 'November 2026',
};

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: 'draw',
    eyebrow: '01 — EXPRESS',
    title: 'Draw your mood',
    description:
      'Sketch a line, a shape, a feeling. Sonicverse listens to the rhythm hiding inside your hand.',
    gradient: 'rose',
    accent: '#F472D0',
  },
  {
    id: 'sound',
    eyebrow: '02 — CREATE',
    title: 'Create your sound',
    description:
      'Your strokes become melody, bass and atmosphere — a universe of sound, generated on your device.',
    gradient: 'violet',
    accent: '#A78BFA',
  },
  {
    id: 'explore',
    eyebrow: '03 — EXPLORE',
    title: 'Explore your universe',
    description:
      'Remix, branch and compare alternate realities. Every version of your sound is a new world.',
    gradient: 'cyan',
    accent: '#38BDF8',
  },
];

export const moods: Mood[] = [
  {
    id: 'happy',
    label: 'Happy',
    tagline: 'Sunlit and weightless',
    emoji: '☀️',
    gradient: 'gold',
    accent: '#FFC46B',
  },
  {
    id: 'calm',
    label: 'Calm',
    tagline: 'Slow tides, soft air',
    emoji: '🌊',
    gradient: 'cyan',
    accent: '#38BDF8',
  },
  {
    id: 'energetic',
    label: 'Energetic',
    tagline: 'Neon pulse, full throttle',
    emoji: '⚡',
    gradient: 'rose',
    accent: '#FF7AD9',
  },
  {
    id: 'motivational',
    label: 'Motivational',
    tagline: 'A push toward the light',
    emoji: '🚀',
    gradient: 'indigo',
    accent: '#A5B4FC',
  },
  {
    id: 'sad',
    label: 'Sad',
    tagline: 'Rain on a quiet window',
    emoji: '🌧️',
    gradient: 'indigo',
    accent: '#818CF8',
  },
  {
    id: 'angry',
    label: 'Angry',
    tagline: 'Static, sparks and fire',
    emoji: '🔥',
    gradient: 'rose',
    accent: '#FB7185',
  },
  {
    id: 'dreamy',
    label: 'Dreamy',
    tagline: 'Floating between stars',
    emoji: '🌙',
    gradient: 'violet',
    accent: '#C084FC',
  },
  {
    id: 'melancholy',
    label: 'Melancholy',
    tagline: 'Gold light, fading slow',
    emoji: '🍂',
    gradient: 'emerald',
    accent: '#6EE7B7',
  },
];

export const universes: Universe[] = [
  {
    id: 'universe-original',
    name: 'Dreamscape',
    mood: 'dreamy',
    style: 'Ambient',
    duration: 134,
    createdAt: 'Today, 14:12',
    description:
      'A slow orbit of glassy pads and a melody that drifts just out of reach.',
    gradient: 'violet',
    stats: {melody: 0.58, rhythm: 0.45, energy: 0.39, atmosphere: 0.91},
    isFavorite: true,
    isOriginal: true,
  },
  {
    id: 'universe-ii',
    name: 'Universe II',
    mood: 'dreamy',
    style: 'Electronic',
    duration: 134,
    createdAt: 'Today, 14:26',
    description:
      'The dream, rebuilt in the dark: a driving pulse under suspended chords.',
    gradient: 'rose',
    stats: {melody: 0.87, rhythm: 0.95, energy: 0.8, atmosphere: 0.62},
    isFavorite: false,
  },
  {
    id: 'universe-iii',
    name: 'Universe III',
    mood: 'calm',
    style: 'Lo-fi',
    duration: 158,
    createdAt: 'Yesterday',
    description:
      'Dusty drums and warm tape hiss. A room with the window left open.',
    gradient: 'cyan',
    stats: {melody: 0.63, rhythm: 0.5, energy: 0.42, atmosphere: 0.86},
    isFavorite: false,
  },
  {
    id: 'universe-iv',
    name: 'Universe IV',
    mood: 'energetic',
    style: 'Pop',
    duration: 121,
    createdAt: 'Yesterday',
    description:
      'Bright synths, a hook that refuses to leave, and a beat built for motion.',
    gradient: 'gold',
    stats: {melody: 0.78, rhythm: 0.88, energy: 0.93, atmosphere: 0.55},
    isFavorite: false,
  },
  {
    id: 'universe-v',
    name: 'Neon Reverie',
    mood: 'energetic',
    style: 'Synthwave',
    duration: 147,
    createdAt: '2 days ago',
    description:
      'A midnight drive through a city made of violet light and chrome.',
    gradient: 'rose',
    stats: {melody: 0.71, rhythm: 0.84, energy: 0.89, atmosphere: 0.73},
    isFavorite: false,
  },
  {
    id: 'universe-vi',
    name: 'Lunar Tide',
    mood: 'calm',
    style: 'Downtempo',
    duration: 172,
    createdAt: '3 days ago',
    description:
      'Low gravity beats, salt air, and a moon reflected in still water.',
    gradient: 'emerald',
    stats: {melody: 0.49, rhythm: 0.57, energy: 0.31, atmosphere: 0.88},
    isFavorite: false,
  },
];

export const discoverItems: DiscoverItem[] = [
  {
    id: 'discover-1',
    title: 'Starlit Static',
    creator: 'Nova.',
    mood: 'dreamy',
    style: 'Ambient',
    gradient: 'violet',
    plays: '12.4k',
    duration: 156,
  },
  {
    id: 'discover-2',
    title: 'Ion Bloom',
    creator: 'kaia.wav',
    mood: 'energetic',
    style: 'Electronic',
    gradient: 'rose',
    plays: '8.1k',
    duration: 128,
  },
  {
    id: 'discover-3',
    title: 'Low Orbit',
    creator: 'Miro',
    mood: 'calm',
    style: 'Lo-fi',
    gradient: 'cyan',
    plays: '21.7k',
    duration: 181,
  },
  {
    id: 'discover-4',
    title: 'Afterglow',
    creator: 'Sena',
    mood: 'melancholy',
    style: 'Downtempo',
    gradient: 'gold',
    plays: '5.3k',
    duration: 143,
  },
];

export const generatingSteps = [
  'Reading your shapes',
  'Finding your rhythm',
  'Building your sound',
];

export const mapNodes: MapNode[] = [
  {
    id: 'node-original',
    universeId: 'universe-original',
    label: 'ORIGINAL',
    moodStyle: 'Dreamy • Ambient',
    x: 0.5,
    y: 0.12,
  },
  {
    id: 'node-ii',
    universeId: 'universe-ii',
    label: 'UNIVERSE II',
    moodStyle: 'Dark • Electronic',
    x: 0.28,
    y: 0.44,
    parentId: 'node-original',
  },
  {
    id: 'node-iii',
    universeId: 'universe-iii',
    label: 'UNIVERSE III',
    moodStyle: 'Calm • Lo-fi',
    x: 0.72,
    y: 0.44,
    parentId: 'node-original',
  },
  {
    id: 'node-iv',
    universeId: 'universe-iv',
    label: 'UNIVERSE IV',
    moodStyle: 'Energetic • Pop',
    x: 0.28,
    y: 0.74,
    parentId: 'node-ii',
  },
];

export const remixIngredients: RemixIngredient[] = [
  {
    id: 'melody',
    label: 'Melody',
    icon: 'music',
    originalLabel: 'Dreamscape',
    parallelLabel: 'Universe II',
  },
  {
    id: 'beat',
    label: 'Beat',
    icon: 'pulse',
    originalLabel: 'Dreamscape',
    parallelLabel: 'Universe II',
  },
  {
    id: 'bass',
    label: 'Bass',
    icon: 'waveform',
    originalLabel: 'Dreamscape',
    parallelLabel: 'Universe II',
  },
  {
    id: 'atmosphere',
    label: 'Atmosphere',
    icon: 'sparkles',
    originalLabel: 'Dreamscape',
    parallelLabel: 'Universe II',
  },
];

export const comparisonMetrics: Array<{
  key: 'melody' | 'rhythm' | 'energy' | 'atmosphere';
  label: string;
}> = [
  {key: 'melody', label: 'Melody'},
  {key: 'rhythm', label: 'Rhythm'},
  {key: 'energy', label: 'Energy'},
  {key: 'atmosphere', label: 'Atmosphere'},
];

export const libraryFilters = ['All', 'Dreamy', 'Happy', 'Calm', 'Energetic'];

export const parallelMoods = [
  'Happy',
  'Calm',
  'Dark',
  'Energetic',
  'Ethereal',
  'Mysterious',
];

export const parallelStyles = [
  'Lo-fi',
  'Pop',
  'Electronic',
  'Jazz',
  'Ambient',
  'Retro',
];

export const profileMenu = [
  {id: 'creations', label: 'My Creations', icon: 'edit'},
  {id: 'favourites', label: 'Favourites', icon: 'heart'},
  {id: 'share', label: 'Share', icon: 'share'},
  {id: 'settings', label: 'Settings', icon: 'settings'},
] as const;

export const getUniverse = (id?: string): Universe =>
  universes.find(u => u.id === id) ?? universes[0];

export const getMood = (id?: string): Mood =>
  moods.find(m => m.id === id) ?? moods[6];
