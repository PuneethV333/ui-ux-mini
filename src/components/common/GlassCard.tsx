import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {colors, gradients, radius, shadows} from '../../theme';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  active?: boolean;
  padded?: boolean;
  glow?: boolean;
  gradient?: readonly string[];
  accessibilityLabel?: string;
};

export default function GlassCard({
  children,
  style,
  onPress,
  active,
  padded = true,
  glow,
  gradient,
  accessibilityLabel,
}: Props) {
  const content = (
    <>
      {!gradient ? (
        <LinearGradient
          colors={active ? [...gradients.cardActive] : [...gradients.card]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={StyleSheet.absoluteFill}
        />
      ) : (
        <LinearGradient
          colors={[...gradient] as [string, string, ...string[]]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={StyleSheet.absoluteFill}
        />
      )}
      <View style={[styles.content, padded && styles.padded]}>{children}</View>
    </>
  );

  const baseStyle: StyleProp<ViewStyle> = [
    styles.base,
    active && styles.active,
    glow && shadows.glowViolet,
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        onPress={onPress}
        style={({pressed}) => [baseStyle, pressed && styles.pressed]}>
        {content}
      </Pressable>
    );
  }

  return <View style={baseStyle}>{content}</View>;
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  active: {borderColor: colors.borderStrong},
  content: {flexGrow: 1},
  padded: {padding: 16},
  pressed: {opacity: 0.86, transform: [{scale: 0.995}]},
});
