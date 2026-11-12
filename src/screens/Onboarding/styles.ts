import {StyleSheet} from 'react-native';
import {
  colors,
  fonts,
  fontSize,
  letterSpacing,
  lineHeight,
  radius,
  sizes,
  spacing,
} from '../../theme';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingBottom: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.sm,
    minHeight: 44,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  brandText: {
    fontFamily: fonts.bodyBold,
    fontSize: fontSize.micro,
    letterSpacing: letterSpacing.brand,
    color: colors.textMuted,
  },
  skip: {
    minHeight: sizes.touch,
    minWidth: sizes.touch,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  skipText: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSize.sm,
    letterSpacing: letterSpacing.wide,
    color: colors.textMuted,
  },
  pager: {
    flex: 1,
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
    paddingBottom: spacing.sm,
  },
  artWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  eyebrowPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceGlass,
  },
  eyebrowText: {
    fontFamily: fonts.bodyBold,
    fontSize: fontSize.micro,
    letterSpacing: letterSpacing.widest,
  },
  title: {
    marginTop: spacing.lg,
    fontFamily: fonts.displayBold,
    fontSize: fontSize.h2,
    lineHeight: lineHeight.h2,
    letterSpacing: letterSpacing.tight,
    color: colors.text,
    textAlign: 'center',
  },
  description: {
    marginTop: spacing.md,
    maxWidth: 320,
    fontFamily: fonts.body,
    fontSize: fontSize.body,
    lineHeight: lineHeight.bodyLg,
    color: colors.textMuted,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: spacing.xxl,
    paddingBottom: spacing.md,
    gap: spacing.lg,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 20,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: radius.pill,
    backgroundColor: colors.borderStrong,
  },
  dotActive: {
    width: 26,
    height: 7,
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  dotFill: {
    flex: 1,
  },
  counter: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSize.micro,
    letterSpacing: letterSpacing.widest,
    color: colors.textDim,
  },
});
