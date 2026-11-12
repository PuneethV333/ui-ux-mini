import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {colors, radius, shadows} from '../../theme';
import Icon, {IconName} from './Icon';

type Props = {
  name: IconName;
  onPress?: () => void;
  size?: number;
  color?: string;
  background?: string;
  borderColor?: string;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  iconSize?: number;
  glow?: boolean;
  disabled?: boolean;
};

export default function IconButton({
  name,
  onPress,
  size = 44,
  color = colors.text,
  background = colors.surfaceGlass,
  borderColor = colors.border,
  accessibilityLabel,
  style,
  iconSize,
  glow,
  disabled,
}: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      onPress={onPress}
      style={({pressed}) => [
        styles.base,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: background,
          borderColor,
        },
        glow && shadows.glowViolet,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}>
      <View style={styles.center}>
        <Icon
          name={name}
          size={iconSize ?? Math.round(size * 0.44)}
          color={color}
          strokeWidth={1.9}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {alignItems: 'center', justifyContent: 'center'},
  pressed: {opacity: 0.7, transform: [{scale: 0.96}]},
  disabled: {opacity: 0.4},
});

export {radius};
