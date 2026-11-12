import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {colors, fonts, gradients, radius, shadows, sizes, spacing} from '../../theme';
import Icon, {IconName} from './Icon';

type Props = {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: IconName;
  iconRight?: IconName;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  uppercase?: boolean;
};

const HEIGHTS = {sm: 44, md: 54, lg: 60};

export default function GlowButton({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  disabled,
  loading,
  fullWidth = true,
  style,
  uppercase,
}: Props) {
  const height = HEIGHTS[size];
  const isPrimary = variant === 'primary';
  const isGold = variant === 'gold';
  const textColor =
    variant === 'primary' || variant === 'gold'
      ? colors.textInverse
      : variant === 'danger'
        ? colors.danger
        : colors.text;

  const content = (
    <View style={styles.inner}>
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <>
          {icon ? (
            <View style={styles.iconLeft}>
              <Icon name={icon} size={18} color={textColor} strokeWidth={2} />
            </View>
          ) : null}
          <Text
            numberOfLines={1}
            style={[
              styles.label,
              {color: textColor},
              uppercase && styles.uppercase,
            ]}>
            {title}
          </Text>
          {iconRight ? (
            <View style={styles.iconRight}>
              <Icon name={iconRight} size={18} color={textColor} strokeWidth={2} />
            </View>
          ) : null}
        </>
      )}
    </View>
  );

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{disabled: Boolean(disabled), busy: Boolean(loading)}}
      disabled={disabled || loading}
      onPress={onPress}
      style={({pressed}) => [
        styles.base,
        {height},
        fullWidth ? styles.full : styles.compact,
        variant === 'secondary' && styles.secondary,
        variant === 'ghost' && styles.ghost,
        variant === 'danger' && styles.danger,
        isPrimary && shadows.glowPink,
        isGold && shadows.glowGold,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}>
      {isPrimary ? (
        <LinearGradient
          colors={[...gradients.primaryButton]}
          locations={[0, 0.5, 1]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={StyleSheet.absoluteFill}
        />
      ) : null}
      {isGold ? (
        <LinearGradient
          colors={[...gradients.gold]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={StyleSheet.absoluteFill}
        />
      ) : null}
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.pill,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  full: {alignSelf: 'stretch'},
  compact: {paddingHorizontal: spacing.xxl},
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  label: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    letterSpacing: 0.4,
    textAlign: 'center',
  },
  uppercase: {
    letterSpacing: 1.6,
    fontSize: 13,
  },
  iconLeft: {marginRight: spacing.sm},
  iconRight: {marginLeft: spacing.sm},
  secondary: {
    backgroundColor: 'rgba(139,92,246,0.12)',
    borderColor: colors.borderStrong,
  },
  ghost: {
    backgroundColor: colors.surfaceGlass,
    borderColor: colors.border,
  },
  danger: {
    backgroundColor: 'rgba(251,113,133,0.10)',
    borderColor: 'rgba(251,113,133,0.38)',
  },
  disabled: {opacity: 0.45},
  pressed: {opacity: 0.82, transform: [{scale: 0.99}]},
});

export {sizes};
