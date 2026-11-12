import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import GlassCard from '../../components/common/GlassCard';
import CoverArt from '../../components/common/CoverArt';
import Icon from '../../components/common/Icon';
import {getMood} from '../../data/mockData';
import type {Universe} from '../../data/types';
import {colors, gradients, radius, spacing} from '../../theme';
import {formatDuration} from '../../utils/format';
import {styles} from './styles';

type Props = {
  universe: Universe;
  width: number;
  onPress: () => void;
  onPlay: () => void;
  onToggleFavorite: () => void;
};

export default function LibraryCard({
  universe,
  width,
  onPress,
  onPlay,
  onToggleFavorite,
}: Props) {
  const mood = getMood(universe.mood);
  const coverHeight = Math.max(
    112,
    Math.round((width - spacing.md * 2) * 0.96),
  );
  const duration = formatDuration(universe.duration);

  return (
    <GlassCard
      onPress={onPress}
      padded={false}
      style={[styles.card, {width}]}
      accessibilityLabel={`${universe.name}, ${mood.label} mood, ${
        universe.style
      }, ${duration}${universe.isFavorite ? ', favourite' : ''}`}>
      <View style={styles.cardInner}>
        <View style={[styles.coverWrap, {height: coverHeight}]}>
          <CoverArt
            gradient={universe.gradient}
            width="100%"
            height={coverHeight}
            rounded={radius.lg}
            seed={universe.id}
            showWave
          />
          <LinearGradient
            pointerEvents="none"
            colors={['rgba(5,3,15,0)', 'rgba(5,3,15,0.62)']}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={styles.coverFade}
          />

          <Pressable
            onPress={event => {
              event.stopPropagation();
              onToggleFavorite();
            }}
            hitSlop={6}
            accessibilityRole="button"
            accessibilityState={{selected: universe.isFavorite}}
            accessibilityLabel={
              universe.isFavorite
                ? `Remove ${universe.name} from favourites`
                : `Add ${universe.name} to favourites`
            }
            style={({pressed}) => [
              styles.favoriteButton,
              universe.isFavorite && styles.favoriteButtonActive,
              pressed && styles.favoritePressed,
            ]}>
            <Icon
              name="heart"
              size={15}
              color={universe.isFavorite ? colors.pink : colors.text}
              strokeWidth={universe.isFavorite ? 2.2 : 1.8}
            />
          </Pressable>

          <Pressable
            onPress={event => {
              event.stopPropagation();
              onPlay();
            }}
            accessibilityRole="button"
            accessibilityLabel={`Play ${universe.name}`}
            style={({pressed}) => [
              styles.playButton,
              pressed && styles.playPressed,
            ]}>
            <LinearGradient
              colors={[...gradients.primaryButton]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={StyleSheet.absoluteFill}
            />
            <Icon
              name="play"
              size={14}
              color={colors.textInverse}
              fill={colors.textInverse}
            />
          </Pressable>
        </View>

        <Text style={styles.cardName} numberOfLines={2} ellipsizeMode="tail">
          {universe.name}
        </Text>

        <View style={styles.cardMeta}>
          <View style={[styles.moodPill, {borderColor: mood.accent}]}>
            <View style={[styles.moodDot, {backgroundColor: mood.accent}]} />
            <Text
              style={[styles.moodText, {color: mood.accent}]}
              numberOfLines={1}>
              {mood.label}
            </Text>
          </View>
          <Text style={styles.cardDuration}>{duration}</Text>
        </View>
      </View>
    </GlassCard>
  );
}
