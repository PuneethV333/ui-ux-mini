import {StyleSheet} from 'react-native';
import {
  colors,
  fonts,
  fontSize,
  letterSpacing,
  lineHeight,
  spacing,
} from '../../theme';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: spacing.xxl,
    paddingBottom: spacing.lg,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
  },
  eyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: fontSize.micro,
    letterSpacing: letterSpacing.brand,
    color: colors.textMuted,
  },
  version: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSize.micro,
    letterSpacing: letterSpacing.widest,
    color: colors.textDim,
  },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: spacing.xl,
  },
  emblemWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  halo: {
    position: 'absolute',
  },
  ring: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: colors.borderStrong,
    opacity: 0.65,
  },
  wordmark: {
    marginTop: spacing.lg,
    fontFamily: fonts.display,
    fontSize: 34,
    lineHeight: 42,
    letterSpacing: letterSpacing.widest,
    color: colors.text,
    textAlign: 'center',
    textShadowColor: 'rgba(244,114,208,0.55)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 22,
  },
  wordmarkAccent: {
    color: colors.secondary,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
    gap: spacing.sm,
  },
  dividerLine: {
    width: 34,
    height: 1,
    backgroundColor: colors.borderStrong,
  },
  dividerDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.gold,
  },
  tagline: {
    marginTop: spacing.lg,
    fontFamily: fonts.body,
    fontSize: fontSize.body,
    lineHeight: lineHeight.bodyLg,
    letterSpacing: 0.5,
    color: colors.textMuted,
    textAlign: 'center',
  },
  footer: {
    gap: spacing.md,
  },
  hint: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSize.micro,
    letterSpacing: letterSpacing.widest,
    color: colors.textDim,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
