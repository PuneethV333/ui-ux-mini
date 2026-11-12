import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors, fonts, gradients, radius, spacing} from '../../theme';

type Props = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
};

export default function Chip({label, selected, onPress, size = 'md'}: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{selected: Boolean(selected)}}
      onPress={onPress}
      style={({pressed}) => [
        styles.base,
        size === 'sm' && styles.small,
        selected && styles.selected,
        pressed && styles.pressed,
      ]}>
      {selected ? (
        <LinearGradient
          colors={[...gradients.primaryButton]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={StyleSheet.absoluteFill}
        />
      ) : null}
      <Text
        style={[
          styles.label,
          size === 'sm' && styles.labelSm,
          selected && styles.labelSelected,
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: spacing.lg,
    height: 40,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceGlass,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  small: {height: 32, paddingHorizontal: spacing.md},
  selected: {borderColor: 'transparent'},
  pressed: {opacity: 0.76},
  label: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: colors.textMuted,
  },
  labelSm: {fontSize: 12},
  labelSelected: {color: colors.textInverse, fontFamily: fonts.bodyBold},
});
