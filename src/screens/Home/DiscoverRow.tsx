import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import CoverArt from '../../components/common/CoverArt';
import Icon from '../../components/common/Icon';
import {getMood} from '../../data/mockData';
import type {DiscoverItem} from '../../data/types';
import {
  colors,
  fonts,
  fontSize,
  gradients,
  letterSpacing,
  radius,
  spacing,
} from '../../theme';

type Props = {
  item: DiscoverItem;
  active?: boolean;
  onPress: () => void;
};

/** Compact discover row. The entire row is the play action. */
export default function DiscoverRow({item, active, onPress}: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Play ${item.title} by ${item.creator}, ${item.plays} plays`}
      accessibilityState={{selected: Boolean(active)}}
      onPress={onPress}
      style={({pressed}) => [styles.row, pressed && styles.pressed]}>
      <LinearGradient
        colors={[...gradients.card]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={StyleSheet.absoluteFill}
      />
      <CoverArt
        gradient={item.gradient}
        width={54}
        height={54}
        rounded={radius.md}
        seed={item.id}
        showWave={false}
      />
      <View style={styles.text}>
        <Text numberOfLines={1} style={styles.title}>
          {item.title}
        </Text>
        <Text numberOfLines={1} style={styles.sub}>
          {item.creator}
          <Text style={styles.dot}> · </Text>
          {item.plays} plays
        </Text>
        <Text numberOfLines={1} style={styles.tags}>
          {item.style} · {getMood(item.mood).label}
        </Text>
      </View>
      <View style={[styles.play, active && styles.playActive]}>
        <Icon
          name={active ? 'pause' : 'play'}
          size={14}
          color={active ? colors.textInverse : colors.text}
          strokeWidth={2.2}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.sm + 2,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  pressed: {opacity: 0.84, transform: [{scale: 0.995}]},
  text: {flex: 1, minWidth: 0},
  title: {
    fontFamily: fonts.bodyBold,
    fontSize: fontSize.body,
    lineHeight: 19,
    color: colors.text,
    letterSpacing: -0.1,
  },
  sub: {
    marginTop: 1,
    fontFamily: fonts.body,
    fontSize: fontSize.xs + 0.5,
    lineHeight: 16,
    color: colors.textMuted,
  },
  dot: {color: colors.textDim},
  tags: {
    marginTop: 2,
    fontFamily: fonts.bodyMedium,
    fontSize: 9.5,
    lineHeight: 13,
    color: colors.textDim,
    letterSpacing: letterSpacing.wide,
    textTransform: 'uppercase',
  },
  play: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: 'rgba(139,92,246,0.16)',
  },
  playActive: {
    backgroundColor: colors.gold,
    borderColor: colors.goldBright,
  },
});
