import type {AudioSource} from 'expo-audio';
import type {MoodId, Universe} from './types';

/**
 * Original instrumental loops synthesized for Sonicverse. They are bundled as
 * local MP3 assets, so playback works completely offline.
 */
const trackByUniverse: Record<string, AudioSource> = {
  'universe-original': require('../../assets/audio/dreamscape.mp3'),
  'universe-ii': require('../../assets/audio/universe-ii.mp3'),
  'universe-iii': require('../../assets/audio/universe-iii.mp3'),
  'universe-iv': require('../../assets/audio/universe-iv.mp3'),
  'universe-v': require('../../assets/audio/neon-reverie.mp3'),
  'universe-vi': require('../../assets/audio/lunar-tide.mp3'),
};

const trackByMood: Record<MoodId, AudioSource> = {
  happy: require('../../assets/audio/universe-iv.mp3'),
  calm: require('../../assets/audio/lunar-tide.mp3'),
  energetic: require('../../assets/audio/neon-reverie.mp3'),
  motivational: require('../../assets/audio/universe-iv.mp3'),
  sad: require('../../assets/audio/lunar-tide.mp3'),
  angry: require('../../assets/audio/universe-ii.mp3'),
  dreamy: require('../../assets/audio/dreamscape.mp3'),
  melancholy: require('../../assets/audio/universe-iii.mp3'),
};

export function audioForUniverse(universe: Universe): AudioSource {
  return trackByUniverse[universe.id] ?? trackByMood[universe.mood];
}

export const trackTitles: Record<string, string> = {
  'universe-original': 'Dreamscape',
  'universe-ii': 'Universe II',
  'universe-iii': 'Lunar Tide (Lo-fi)',
  'universe-iv': 'Afterglow',
  'universe-v': 'Neon Reverie',
  'universe-vi': 'Low Orbit',
};
