import {StyleSheet} from 'react-native';
import {
  colors,
  fonts,
  fontSize,
  letterSpacing,
  radius,
  shadows,
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

  // ── Universe summaries ───────────────────────────────────────────────
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
  summaryCard: {
    flex: 1,
    borderRadius: radius.xl,
  },
  summaryCardParallel: {
    borderColor: 'rgba(244,114,208,0.32)',
  },
  summaryInner: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  orbitWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  orbitGlow: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -38,
    marginTop: -38,
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: 'rgba(139,92,246,0.14)',
  },
  summaryEyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    lineHeight: 12,
    letterSpacing: letterSpacing.widest,
    color: colors.secondary,
  },
  summaryEyebrowOriginal: {
    color: colors.gold,
  },
  summaryName: {
    marginTop: 3,
    fontFamily: fonts.bodyBold,
    fontSize: fontSize.body,
    lineHeight: 20,
    color: colors.text,
    letterSpacing: -0.2,
  },
  summaryMeta: {
    marginTop: 2,
    fontFamily: fonts.body,
    fontSize: 10.5,
    lineHeight: 14,
    color: colors.textMuted,
  },
  summaryPlay: {
    marginTop: spacing.md,
    borderRadius: radius.pill,
  },

  // ── Signature metrics ────────────────────────────────────────────────
  signatureHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  signatureLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: fontSize.micro,
    letterSpacing: letterSpacing.widest,
    color: colors.textDim,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  legendDotOriginal: {
    backgroundColor: colors.primaryBright,
  },
  legendDotParallel: {
    backgroundColor: colors.secondary,
  },
  legendText: {
    fontFamily: fonts.body,
    fontSize: 9.5,
    color: colors.textDim,
  },

  metricCard: {
    marginBottom: spacing.md,
    borderRadius: radius.lg,
  },
  metricHead: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  metricIcon: {
    width: 26,
    height: 26,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    backgroundColor: 'rgba(139,92,246,0.12)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  metricTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: fontSize.bodyLg,
    lineHeight: 21,
    color: colors.text,
    letterSpacing: -0.2,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  metricRowLabel: {
    width: 54,
    fontFamily: fonts.body,
    fontSize: fontSize.xs,
    lineHeight: 15,
    color: colors.textMuted,
  },
  metricRowLabelParallel: {
    fontFamily: fonts.bodyMedium,
    color: colors.text,
  },
  metricTrack: {
    flex: 1,
    height: 13,
    justifyContent: 'center',
    marginHorizontal: spacing.sm,
    paddingHorizontal: 1.5,
    borderRadius: radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(167,139,250,0.13)',
    backgroundColor: 'rgba(255,255,255,0.028)',
  },
  metricValue: {
    width: 24,
    textAlign: 'right',
    fontFamily: fonts.bodyMedium,
    fontSize: 10.5,
    color: colors.textDim,
    fontVariant: ['tabular-nums'],
  },

  // ── Sticky CTA ───────────────────────────────────────────────────────
  footer: {
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.lg,
  },
  footerButton: {
    ...shadows.glowPink,
  },
  footerHint: {
    marginTop: spacing.sm,
    fontFamily: fonts.body,
    fontSize: fontSize.xs,
    color: colors.textDim,
    textAlign: 'center',
    letterSpacing: letterSpacing.wide,
  },
});
