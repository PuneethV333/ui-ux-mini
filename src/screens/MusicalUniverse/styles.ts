import {StyleSheet} from 'react-native';
import {
  colors,
  fonts,
  fontSize,
  letterSpacing,
  radius,
  spacing,
} from '../../theme';

export const styles = StyleSheet.create({
  content: {
    paddingTop: spacing.sm,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  stepText: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: letterSpacing.widest,
    color: colors.textDim,
  },
  stepBars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  stepBar: {
    width: 20,
    height: 3,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceGlassStrong,
  },
  stepBarActive: {
    backgroundColor: colors.secondary,
  },
  heading: {
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
  },
  eyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    letterSpacing: letterSpacing.widest,
    color: colors.secondary,
    marginBottom: spacing.xs,
  },
  universeName: {
    fontFamily: fonts.displayBold,
    fontSize: fontSize.h2,
    lineHeight: 35,
    letterSpacing: letterSpacing.tight,
    color: colors.text,
    textAlign: 'center',
    maxWidth: '100%',
  },
  universeMeta: {
    marginTop: 2,
    fontFamily: fonts.bodyMedium,
    fontSize: fontSize.body,
    lineHeight: 21,
    color: colors.textMuted,
    textAlign: 'center',
  },
  metaDot: {
    color: colors.secondary,
  },
  description: {
    marginTop: spacing.sm,
    fontFamily: fonts.body,
    fontSize: fontSize.xs,
    lineHeight: 17,
    color: colors.textDim,
    textAlign: 'center',
    maxWidth: 320,
  },
  orbitWrap: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  orbitGlowWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbitGlow: {
    overflow: 'hidden',
    borderRadius: 999,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.xs,
  },
  stat: {
    flex: 1,
  },
  statLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 9,
    lineHeight: 12,
    letterSpacing: 0.4,
    color: colors.textDim,
    marginBottom: 5,
  },
  statBar: {
    borderRadius: radius.pill,
  },
  playerCard: {
    borderRadius: radius.xl,
    marginBottom: spacing.lg,
  },
  playerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  playerLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    letterSpacing: letterSpacing.widest,
    color: colors.secondary,
  },
  playerStyle: {
    fontFamily: fonts.bodyMedium,
    fontSize: 10,
    color: colors.textDim,
  },
  actions: {
    gap: spacing.md,
  },
  footnote: {
    marginTop: spacing.xl,
    fontFamily: fonts.body,
    fontSize: fontSize.xs,
    lineHeight: 16,
    color: colors.textDim,
    textAlign: 'center',
  },
});
