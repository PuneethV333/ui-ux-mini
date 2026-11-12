import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Slider from '@react-native-community/slider';
import {LinearGradient} from 'expo-linear-gradient';
import {colors, fonts, gradients, spacing} from '../../theme';
import {usePlayer} from '../../context/PlayerContext';
import {formatDuration} from '../../utils/format';
import IconButton from '../common/IconButton';
import ProgressBar from '../common/ProgressBar';

type Props = {
  compact?: boolean;
  accent?: readonly string[];
  showSlider?: boolean;
};

export default function PlayerControls({
  compact = false,
  accent = gradients.aurora,
  showSlider = true,
}: Props) {
  const {current, isPlaying, position, toggle, next, previous, seek} =
    usePlayer();
  const progress = Math.min(1, position / current.duration);

  return (
    <View style={styles.root}>
      {showSlider ? (
        <>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            value={progress}
            onSlidingComplete={seek}
            minimumTrackTintColor={colors.secondary}
            maximumTrackTintColor="rgba(255,255,255,0.12)"
            thumbTintColor={colors.text}
          />
          <View style={styles.times}>
            <Text style={styles.time}>{formatDuration(position)}</Text>
            <Text style={styles.time}>{formatDuration(current.duration)}</Text>
          </View>
        </>
      ) : (
        <ProgressBar progress={progress} height={4} gradient={accent} />
      )}

      <View style={[styles.controls, compact && styles.controlsCompact]}>
        <IconButton
          name="skip-back"
          onPress={previous}
          size={compact ? 40 : 48}
          background="transparent"
          borderColor="transparent"
          accessibilityLabel="Previous track"
        />
        <View style={styles.playWrap}>
          <LinearGradient
            colors={[...accent] as [string, string, ...string[]]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.playGlow}
          />
          <IconButton
            name={isPlaying ? 'pause' : 'play'}
            onPress={() => toggle()}
            size={compact ? 52 : 66}
            background={colors.surface}
            color={colors.text}
            borderColor={colors.borderStrong}
            iconSize={compact ? 20 : 26}
            accessibilityLabel={isPlaying ? 'Pause' : 'Play'}
            style={styles.playButton}
          />
        </View>
        <IconButton
          name="skip-forward"
          onPress={next}
          size={compact ? 40 : 48}
          background="transparent"
          borderColor="transparent"
          accessibilityLabel="Next track"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {width: '100%'},
  slider: {
    width: '100%',
    height: 30,
    marginHorizontal: -4,
  },
  times: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -2,
    paddingHorizontal: spacing.xs,
  },
  time: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.textDim,
    fontVariant: ['tabular-nums'],
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xl,
    marginTop: spacing.md,
  },
  controlsCompact: {gap: spacing.lg, marginTop: spacing.sm},
  playWrap: {alignItems: 'center', justifyContent: 'center'},
  playGlow: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    opacity: 0.25,
  },
  playButton: {
    borderWidth: 1.4,
  },
});
