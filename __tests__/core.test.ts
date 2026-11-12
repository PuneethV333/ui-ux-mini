import {clamp, formatDuration, initials, titleCase} from '../src/utils/format';
import {isValidEmail, minLength, required} from '../src/utils/validation';
import {moods, universes, discoverItems} from '../src/data/mockData';

describe('format helpers', () => {
  it('formats seconds as m:ss', () => {
    expect(formatDuration(0)).toBe('0:00');
    expect(formatDuration(134)).toBe('2:14');
    expect(formatDuration(59)).toBe('0:59');
  });

  it('clamps values into range', () => {
    expect(clamp(1.4)).toBe(1);
    expect(clamp(-0.2)).toBe(0);
    expect(clamp(0.42)).toBe(0.42);
  });

  it('builds initials and title case', () => {
    expect(initials('Puneeth V')).toBe('PV');
    expect(titleCase('dreamy')).toBe('Dreamy');
  });
});

describe('validation', () => {
  it('validates email addresses', () => {
    expect(isValidEmail('puneeth@sonicverse.app')).toBe(true);
    expect(isValidEmail('not-an-email')).toBe(false);
  });

  it('requires non-empty values and minimum length', () => {
    expect(required('  ')).toBe(false);
    expect(required('Sonicverse')).toBe(true);
    expect(minLength('12345', 6)).toBe(false);
    expect(minLength('123456', 6)).toBe(true);
  });
});

describe('offline mock data', () => {
  it('ships every mood used by the flow', () => {
    expect(moods).toHaveLength(8);
    expect(moods.map(mood => mood.id)).toContain('dreamy');
  });

  it('ships universes and discover items', () => {
    expect(universes.length).toBeGreaterThanOrEqual(6);
    expect(universes[0].isOriginal).toBe(true);
    expect(discoverItems.length).toBeGreaterThanOrEqual(4);
  });
});
