import {StyleSheet} from 'react-native';
import {
  colors,
  fonts,
  fontSize,
  letterSpacing,
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
