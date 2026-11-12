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

  // ── Orbit artwork ────────────────────────────────────────────────────
  artStage: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  auraOuter: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -146,
    marginTop: -146,
    width: 292,
    height: 292,
    borderRadius: 146,
    backgroundColor: 'rgba(124,58,237,0.13)',
  },
  auraInner: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -98,
    marginTop: -98,
    width: 196,
    height: 196,
    borderRadius: 98,
    backgroundColor: 'rgba(244,114,208,0.12)',
  },
  auraCore: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -36,
    marginTop: -36,
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,196,107,0.16)',
  },

  // ── Meta ─────────────────────────────────────────────────────────────
  metaWrap: {
    alignItems: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.xxl,
  },
  meta: {
    fontFamily: fonts.bodyBold,
    fontSize: 18,
    lineHeight: 24,
    color: colors.text,
    letterSpacing: 0.2,
    textAlign: 'center',
  },
  basedOn: {
    marginTop: spacing.xs,
    fontFamily: fonts.body,
    fontSize: fontSize.caption,
    lineHeight: 19,
    color: colors.textMuted,
    textAlign: 'center',
  },
  basedOnAccent: {
    color: colors.secondary,
    fontFamily: fonts.bodyMedium,
  },

  // ── Actions ──────────────────────────────────────────────────────────
  playRow: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  playButton: {
    minWidth: 176,
    borderColor: colors.borderStrong,
    backgroundColor: 'rgba(139,92,246,0.10)',
  },
  secondaryRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  secondaryButton: {
    flex: 1,
    borderRadius: radius.pill,
  },

  // ── Sticky CTA ───────────────────────────────────────────────────────
  footer: {
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.lg,
  },
  footerButton: {
    ...shadows.glowPink,
  },
  footerCaption: {
    marginTop: spacing.sm,
    fontFamily: fonts.body,
    fontSize: fontSize.xs,
    lineHeight: 15,
    color: colors.textDim,
    textAlign: 'center',
    letterSpacing: letterSpacing.wide,
  },
});
