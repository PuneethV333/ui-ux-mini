import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CoverArt from '../../components/common/CoverArt';
import Icon from '../../components/common/Icon';
import {getMood} from '../../data/mockData';
import type {Universe} from '../../data/types';
import {
  colors,
  fonts,
  fontSize,
  gradients,
  letterSpacing,
  radius,
  shadows,
  spacing,
} from '../../theme';

type Props = {
  universe: Universe;
  width: number;
  active?: boolean;
  onPress: () => void;
  onPlay: () => void;
};

export function formatDuration(seconds: number) {
  const safe = Math.max(0, Math.round(seconds));
  const minutes = Math.floor(safe / 60);
  const rest = safe % 60;
  return `${minutes}:${rest.toString().padStart(2, '0')}`;
}

export default function UniverseCard({
  universe,
  width,
  active,
  onPress,
  onPlay,
}: Props) {
  const mood = getMood(universe.mood);
  const coverHeight = Math.round(width * 0.58);
  const duration = formatDuration(universe.duration);

  return (
    <View style={[styles.card, {width}]}>
      <LinearGradient
        colors={[...gradients.card]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={StyleSheet.absoluteFill}
      />

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Open ${universe.name}. ${mood.label} ${universe.style}, ${duration}.`}
        onPress={onPress}
        style={({pressed}) => [styles.press, pressed && styles.pressed]}>
        <View style={styles.cover}>
          <CoverArt
            gradient={universe.gradient}
            width="100%"
            height={coverHeight}
            rounded={0}
            seed={universe.id}
          />
          <LinearGradient
            colors={['rgba(5,3,15,0)', 'rgba(5,3,15,0.72)']}
            style={[styles.coverFade, {height: Math.round(coverHeight * 0.62)}]}
            pointerEvents="none"
          />
          <View style={styles.moodPill}>
            <View style={[styles.moodDot, {backgroundColor: mood.accent}]} />
            <Text style={styles.moodText}>{mood.label}</Text>
          </View>
          {active ? (
            <View style={styles.playing}>
              <Icon name="waveform" size={11} color={colors.goldBright} />
              <Text style={styles.playingText}>PLAYING</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.info}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.name}>
            {universe.name}
          </Text>
          <View style={styles.metaRow}>
            <Text numberOfLines={1} style={styles.meta}>
              {universe.style}
            </Text>
            <View style={styles.metaDot} />
            <Text style={styles.meta}>{duration}</Text>
          </View>
        </View>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Play ${universe.name}`}
        onPress={onPlay}
        hitSlop={8}
        style={({pressed}) => [
          styles.playButton,
          {top: coverHeight - 50},
          pressed && styles.playPressed,
        ]}>
        <LinearGradient
          colors={[...gradients.primaryButton]}
          locations={[0, 0.5, 1]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={StyleSheet.absoluteFill}
        />
        <Icon
          name="play"
          size={14}
          color={colors.textInverse}
          strokeWidth={2.4}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadows.card,
  },
  press: {width: '100%'},
  pressed: {opacity: 0.88},
  cover: {width: '100%', overflow: 'hidden'},
  coverFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  moodPill: {
    position: 'absolute',
    top: spacing.sm + 2,
    left: spacing.sm + 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    height: 22,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    backgroundColor: 'rgba(5,3,15,0.55)',
  },
  moodDot: {width: 5, height: 5, borderRadius: 3},
  moodText: {
    fontFamily: fonts.bodyBold,
    fontSize: 9.5,
    color: colors.text,
    letterSpacing: letterSpacing.wide,
    textTransform: 'uppercase',
  },
  playing: {
    position: 'absolute',
    top: spacing.sm + 2,
    right: spacing.sm + 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 22,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(255,225,168,0.42)',
    backgroundColor: 'rgba(5,3,15,0.6)',
  },
  playingText: {
    fontFamily: fonts.bodyBold,
    fontSize: 8.5,
    color: colors.goldBright,
    letterSpacing: letterSpacing.wider,
  },
  info: {paddingHorizontal: spacing.md, paddingTop: spacing.sm + 2, paddingBottom: spacing.md},
  name: {
    fontFamily: fonts.bodyBold,
    fontSize: fontSize.body,
    lineHeight: 20,
    color: colors.text,
    letterSpacing: -0.1,
  },
  metaRow: {
    marginTop: 3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  meta: {
    fontFamily: fonts.body,
    fontSize: fontSize.xs + 0.5,
    color: colors.textMuted,
  },
  metaDot: {
    width: 2.5,
    height: 2.5,
    borderRadius: 2,
    backgroundColor: colors.textDim,
  },
  playButton: {
    position: 'absolute',
    right: spacing.sm + 2,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.24)',
    ...shadows.glowPink,
  },
  playPressed: {opacity: 0.82, transform: [{scale: 0.94}]},
});
