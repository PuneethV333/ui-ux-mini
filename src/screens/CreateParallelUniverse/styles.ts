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

  // ── Original universe ────────────────────────────────────────────────
  originalCard: {
    borderRadius: radius.xl,
    marginBottom: spacing.xxl,
  },
  originalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  originalArt: {
    width: 66,
    height: 66,
    alignItems: 'center',
    justifyContent: 'center',
  },
  originalPulse: {
    position: 'absolute',
    left: 1,
    top: 1,
    width: 64,
    height: 64,
    borderRadius: radius.lg,
    backgroundColor: 'rgba(192,132,252,0.26)',
  },
  originalCopy: {
    flex: 1,
    marginLeft: spacing.md,
  },
  originalEyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: fontSize.micro,
    letterSpacing: letterSpacing.widest,
    color: colors.gold,
  },
  originalTitle: {
    marginTop: spacing.xs,
    fontFamily: fonts.bodyBold,
    fontSize: 17,
    lineHeight: 22,
    color: colors.text,
    letterSpacing: -0.2,
  },
  originalHint: {
    marginTop: 2,
    fontFamily: fonts.body,
    fontSize: fontSize.xs,
    lineHeight: 15,
    color: colors.textDim,
  },
  originalCore: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: colors.borderGold,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,196,107,0.06)',
  },
  originalCoreDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gold,
    shadowColor: colors.gold,
    shadowOpacity: 0.9,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 0},
    elevation: 4,
  },

  // ── Selection ────────────────────────────────────────────────────────
  section: {
    marginBottom: spacing.md,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: spacing.md,
    marginBottom: spacing.xxl,
  },
  chipCell: {
    width: '48%',
  },
  previewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  previewDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.secondary,
  },
  previewText: {
    flex: 1,
    fontFamily: fonts.bodyMedium,
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },

  // ── Sticky CTA ───────────────────────────────────────────────────────
  footer: {
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.lg,
  },
  footerButton: {
    ...shadows.glowPink,
  },
});
