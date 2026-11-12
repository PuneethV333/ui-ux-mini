import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {colors, gradients, radius} from '../../theme';

type Props = {
  progress: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
  showGlow?: boolean;
  trackColor?: string;
  gradient?: readonly string[];
};

export default function ProgressBar({
  progress,
  height = 6,
  style,
  showGlow = true,
  trackColor = colors.surfaceGlassStrong,
  gradient = gradients.aurora,
}: Props) {
  const value = Math.max(0, Math.min(1, progress));
  return (
    <View
      style={[
        styles.track,
        {height, borderRadius: height / 2, backgroundColor: trackColor},
        style,
      ]}>
      <View style={[styles.fill, {width: `${value * 100}%`}]}>
        <LinearGradient
          colors={[...gradient] as [string, string, ...string[]]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[StyleSheet.absoluteFill, {borderRadius: height / 2}]}
        />
        {showGlow ? (
          <View
            style={[
              styles.thumb,
              {
                width: height * 2.4,
                height: height * 2.4,
                borderRadius: height * 1.2,
              },
            ]}
          />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'visible',
    justifyContent: 'center',
  },
  fill: {
    height: '100%',
    borderRadius: radius.pill,
    overflow: 'visible',
    justifyContent: 'center',
  },
  thumb: {
    position: 'absolute',
    right: -10,
    backgroundColor: colors.text,
    borderWidth: 3,
    borderColor: colors.primary,
    shadowColor: colors.secondary,
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 0},
    elevation: 6,
  },
});
