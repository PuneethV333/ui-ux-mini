import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors, fonts, fontSize, spacing} from '../../theme';
import Icon from './Icon';

type Props = {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  style?: object;
};

export default function SectionHeader({
  title,
  actionLabel,
  onAction,
  style,
}: Props) {
  return (
    <View style={[styles.row, style]}>
      <Text style={styles.title}>{title}</Text>
      {actionLabel ? (
        <Pressable
          onPress={onAction}
          hitSlop={8}
          style={({pressed}) => [styles.action, pressed && styles.pressed]}>
          <Text style={styles.actionText}>{actionLabel}</Text>
          <Icon name="chevron-right" size={14} color={colors.secondary} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  title: {
    fontFamily: fonts.bodyBold,
    fontSize: fontSize.subtitle,
    color: colors.text,
    letterSpacing: -0.2,
  },
  action: {flexDirection: 'row', alignItems: 'center', gap: 2},
  actionText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.secondary,
  },
  pressed: {opacity: 0.7},
});
