import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {usePlayer} from '../../context/PlayerContext';
import {colors, gradients, radius, spacing} from '../../theme';
import CoverArt from '../common/CoverArt';
import Icon from '../common/Icon';
import {formatDuration} from '../../utils/format';

/** Persistent now-playing bar shown above the bottom tab bar. */
export default function MiniPlayer() {
  const navigation = useNavigation<any>();
  const {current, isPlaying, position, toggle, next} = usePlayer();

  return (
    <Pressable
      onPress={() => navigation.navigate('MusicalUniverse', {universeId: current.id})}
      style={({pressed}) => [styles.root, pressed && styles.pressed]}>
      <LinearGradient
        colors={['rgba(38,22,74,0.98)', 'rgba(14,8,30,0.98)']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.progressTrack}>
        <LinearGradient
          colors={[...gradients.aurora]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[
            styles.progressFill,
            {width: `${Math.min(100, (position / current.duration) * 100)}%`},
          ]}
        />
      </View>
      <View style={styles.row}>
        <CoverArt
          gradient={current.gradient}
          width={42}
          height={42}
          rounded={radius.sm}
          seed={current.id}
          showWave
        />
        <View style={styles.textWrap}>
          <Text style={styles.title} numberOfLines={1}>
            {current.name}
          </Text>
          <Text style={styles.meta} numberOfLines={1}>
            {current.style} • {formatDuration(current.duration)}
          </Text>
        </View>
        <Pressable
          hitSlop={10}
          onPress={() => toggle()}
          style={styles.play}
          accessibilityLabel={isPlaying ? 'Pause' : 'Play'}>
          <Icon
            name={isPlaying ? 'pause' : 'play'}
            size={18}
            color={colors.text}
          />
        </Pressable>
        <Pressable
          hitSlop={10}
          onPress={next}
          style={styles.skip}
          accessibilityLabel="Next track">
          <Icon name="skip-forward" size={16} color={colors.textMuted} />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.primary,
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: {width: 0, height: 6},
    elevation: 8,
  },
  pressed: {opacity: 0.9},
  progressTrack: {
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  progressFill: {height: 2, borderRadius: 1},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 9,
    gap: spacing.md,
  },
  textWrap: {flex: 1},
  title: {
    color: colors.text,
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 13,
  },
  meta: {
    color: colors.textDim,
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: 10,
    marginTop: 1,
  },
  play: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceGlassStrong,
  },
  skip: {padding: 4},
});
