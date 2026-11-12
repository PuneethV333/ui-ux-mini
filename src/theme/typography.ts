import {TextStyle} from 'react-native';
import {colors} from './colors';

export const fonts = {
  display: 'Orbitron-Black',
  displayBold: 'Orbitron-Bold',
  displayRegular: 'Orbitron-Regular',
  body: 'SpaceGrotesk-Regular',
  bodyMedium: 'SpaceGrotesk-Medium',
  bodyBold: 'SpaceGrotesk-Bold',
} as const;

export const fontSize = {
  micro: 10,
  xs: 11,
  sm: 12,
  caption: 13,
  body: 15,
  bodyLg: 16,
  subtitle: 18,
  title: 22,
  h3: 24,
  h2: 28,
  h1: 32,
  display: 40,
  hero: 46,
} as const;

export const lineHeight = {
  micro: 14,
  xs: 16,
  sm: 17,
  caption: 19,
  body: 22,
  bodyLg: 24,
  subtitle: 26,
  title: 30,
  h3: 32,
  h2: 36,
  h1: 40,
  display: 48,
  hero: 54,
} as const;

export const letterSpacing = {
  tighter: -0.8,
  tight: -0.4,
  normal: 0,
  wide: 0.4,
  wider: 1,
  widest: 2.4,
  brand: 3.2,
} as const;

/** Reusable text presets. */
export const textStyles = {
  hero: {
    fontFamily: fonts.display,
    fontSize: fontSize.hero,
    lineHeight: lineHeight.hero,
    color: colors.text,
    letterSpacing: letterSpacing.tighter,
  },
  display: {
    fontFamily: fonts.display,
    fontSize: fontSize.display,
    lineHeight: lineHeight.display,
    color: colors.text,
    letterSpacing: letterSpacing.tight,
  },
  h1: {
    fontFamily: fonts.displayBold,
    fontSize: fontSize.h1,
    lineHeight: lineHeight.h1,
    color: colors.text,
    letterSpacing: letterSpacing.tight,
  },
  h2: {
    fontFamily: fonts.displayBold,
    fontSize: fontSize.h2,
    lineHeight: lineHeight.h2,
    color: colors.text,
    letterSpacing: letterSpacing.tight,
  },
  h3: {
    fontFamily: fonts.bodyBold,
    fontSize: fontSize.h3,
    lineHeight: lineHeight.h3,
    color: colors.text,
    letterSpacing: letterSpacing.tight,
  },
  title: {
    fontFamily: fonts.bodyBold,
    fontSize: fontSize.title,
    lineHeight: lineHeight.title,
    color: colors.text,
  },
  subtitle: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSize.subtitle,
    lineHeight: lineHeight.subtitle,
    color: colors.text,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: fontSize.body,
    lineHeight: lineHeight.body,
    color: colors.text,
  },
  bodyMedium: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSize.body,
    lineHeight: lineHeight.body,
    color: colors.text,
  },
  bodyBold: {
    fontFamily: fonts.bodyBold,
    fontSize: fontSize.body,
    lineHeight: lineHeight.body,
    color: colors.text,
  },
  caption: {
    fontFamily: fonts.body,
    fontSize: fontSize.caption,
    lineHeight: lineHeight.caption,
    color: colors.textMuted,
  },
  label: {
    fontFamily: fonts.bodyBold,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: colors.textMuted,
    letterSpacing: letterSpacing.wider,
    textTransform: 'uppercase',
  },
  button: {
    fontFamily: fonts.bodyBold,
    fontSize: fontSize.body,
    lineHeight: lineHeight.body,
    color: colors.text,
    letterSpacing: letterSpacing.wide,
  },
  brand: {
    fontFamily: fonts.display,
    fontSize: fontSize.h1,
    lineHeight: lineHeight.h1,
    color: colors.text,
    letterSpacing: letterSpacing.brand,
  },
} satisfies Record<string, TextStyle>;
