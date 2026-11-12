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
  header: {
    paddingHorizontal: spacing.screen,
  },
  scroll: {
    flex: 1,
  },
  body: {
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xxl,
  },

  // ── Map canvas ───────────────────────────────────────────────────────
  panel: {
    borderRadius: radius.xxl,
    marginBottom: spacing.lg,
  },
  mapEyebrow: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.lg,
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    letterSpacing: letterSpacing.widest,
    color: colors.textDim,
  },
  selectedHalo: {
    position: 'absolute',
    borderRadius: radius.xl,
    borderWidth: 1.4,
    borderColor: 'rgba(244,114,208,0.8)',
    backgroundColor: 'rgba(244,114,208,0.06)',
    shadowColor: colors.secondary,
    shadowOpacity: 0.65,
    shadowRadius: 16,
    shadowOffset: {width: 0, height: 0},
  },

  // ── Universe nodes ───────────────────────────────────────────────────
  nodeCard: {
    position: 'absolute',
    borderRadius: radius.lg,
    borderWidth: 1,
  },
  nodeCardSelected: {
    borderColor: colors.borderStrong,
  },
  nodeInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xs,
  },
  nodeOrbRing: {
    width: 27,
    height: 27,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(5,3,15,0.65)',
    borderWidth: 1,
    borderColor: 'rgba(167,139,250,0.3)',
  },
  nodeOrbRingSelected: {
    borderColor: colors.borderGold,
    shadowColor: colors.gold,
    shadowOpacity: 0.7,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 0},
    elevation: 5,
  },
  nodeOrbCore: {
    width: 19,
    height: 19,
    borderRadius: 10,
  },
  nodeLabel: {
    marginTop: spacing.xs,
    fontFamily: fonts.bodyBold,
    fontSize: 10.5,
    lineHeight: 14,
    letterSpacing: 0.7,
    color: colors.text,
    textAlign: 'center',
  },
  nodeMood: {
    marginTop: 2,
    fontFamily: fonts.body,
    fontSize: 10,
    lineHeight: 13,
    color: colors.textMuted,
    textAlign: 'center',
  },
  nodeCheck: {
    position: 'absolute',
    top: 7,
    right: 7,
    width: 17,
    height: 17,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gold,
  },

  // ── Selected summary ─────────────────────────────────────────────────
  summaryWrap: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    bottom: spacing.md,
  },
  summaryCard: {
    borderRadius: radius.lg,
    borderColor: colors.borderStrong,
  },
  summaryInner: {
    padding: spacing.md,
  },
  summaryText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12.5,
    lineHeight: 17,
    color: colors.text,
    letterSpacing: 0.1,
  },
  summaryButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  summaryButton: {
    flex: 1,
  },

  // ── CTA ──────────────────────────────────────────────────────────────
  cta: {
    marginTop: spacing.xs,
  },
  footnote: {
    marginTop: spacing.md,
    fontFamily: fonts.body,
    fontSize: fontSize.xs,
    lineHeight: 15,
    color: colors.textDim,
    textAlign: 'center',
    letterSpacing: letterSpacing.wide,
  },
});
