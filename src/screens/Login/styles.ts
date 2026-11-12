import {StyleSheet} from 'react-native';
import {
  colors,
  fonts,
  fontSize,
  letterSpacing,
  lineHeight,
  sizes,
  spacing,
} from '../../theme';

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
  },
  glowPink: {
    position: 'absolute',
    top: -70,
    right: -80,
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: 'rgba(244,114,208,0.10)',
  },
  glowViolet: {
    position: 'absolute',
    top: 150,
    left: -110,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(139,92,246,0.12)',
  },
  brandBlock: {
    alignItems: 'center',
  },
  eyebrow: {
    marginTop: spacing.xl,
    fontFamily: fonts.bodyBold,
    fontSize: fontSize.micro,
    letterSpacing: letterSpacing.brand,
    color: colors.secondary,
    textAlign: 'center',
  },
  title: {
    marginTop: spacing.sm,
    fontFamily: fonts.displayBold,
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: letterSpacing.tight,
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: spacing.sm,
    maxWidth: 320,
    fontFamily: fonts.body,
    fontSize: fontSize.caption,
    lineHeight: lineHeight.caption + 2,
    color: colors.textMuted,
    textAlign: 'center',
  },
  card: {
    marginTop: spacing.xl,
  },
  form: {
    gap: spacing.md,
  },
  submit: {
    marginTop: spacing.xs,
  },
  google: {
    marginTop: spacing.md,
  },
  hint: {
    marginTop: spacing.md,
    fontFamily: fonts.body,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: colors.textDim,
    textAlign: 'center',
  },
  footer: {
    marginTop: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  footerText: {
    fontFamily: fonts.body,
    fontSize: fontSize.caption,
    color: colors.textMuted,
  },
  link: {
    minHeight: sizes.touch,
    justifyContent: 'center',
    paddingHorizontal: spacing.xxs,
  },
  linkText: {
    fontFamily: fonts.bodyBold,
    fontSize: fontSize.caption,
    letterSpacing: 0.2,
    color: colors.secondary,
  },
});
