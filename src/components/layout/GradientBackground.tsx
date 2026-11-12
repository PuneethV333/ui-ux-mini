import React, {useMemo} from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Svg, {
  Circle,
  Defs,
  Ellipse,
  RadialGradient,
  Rect,
  Stop,
} from 'react-native-svg';
import {colors, gradients} from '../../theme';

type Props = {
  children?: React.ReactNode;
  variant?: 'default' | 'soft' | 'deep';
  showNebula?: boolean;
  starCount?: number;
};

/** Shared cosmic canvas used by every screen. */
export default function GradientBackground({
  children,
  variant = 'default',
  showNebula = true,
  starCount = 54,
}: Props) {
  const {width, height} = useWindowDimensions();

  const stars = useMemo(() => {
    // Deterministic pseudo-random star field so renders stay stable.
    const items: Array<{x: number; y: number; r: number; o: number}> = [];
    for (let i = 0; i < starCount; i += 1) {
      const x = (Math.sin(i * 12.9898) * 43758.5453) % 1;
      const y = (Math.sin(i * 78.233 + 4.1) * 43758.5453) % 1;
      const r = 0.5 + Math.abs(Math.sin(i * 3.77)) * 1.5;
      const o = 0.18 + Math.abs(Math.sin(i * 6.31)) * 0.55;
      items.push({
        x: Math.abs(x) * width,
        y: Math.abs(y) * height,
        r,
        o,
      });
    }
    return items;
  }, [width, height, starCount]);

  const palette =
    variant === 'soft'
      ? gradients.screenSoft
      : variant === 'deep'
        ? (['#080418', '#040210', '#020108'] as const)
        : gradients.screen;

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[...palette]}
        locations={[0, 0.55, 1]}
        start={{x: 0.1, y: 0}}
        end={{x: 0.9, y: 1}}
        style={StyleSheet.absoluteFill}
      />
      {showNebula ? (
        <Svg
          width={width}
          height={height}
          style={StyleSheet.absoluteFill}
          pointerEvents="none">
          <Defs>
            <RadialGradient id="nebula-violet" cx="50%" cy="50%" r="50%">
              <Stop offset="0" stopColor="#8B5CF6" stopOpacity="0.34" />
              <Stop offset="0.55" stopColor="#5B21B6" stopOpacity="0.14" />
              <Stop offset="1" stopColor="#05030F" stopOpacity="0" />
            </RadialGradient>
            <RadialGradient id="nebula-pink" cx="50%" cy="50%" r="50%">
              <Stop offset="0" stopColor="#F472D0" stopOpacity="0.26" />
              <Stop offset="0.6" stopColor="#BE3FA5" stopOpacity="0.1" />
              <Stop offset="1" stopColor="#05030F" stopOpacity="0" />
            </RadialGradient>
            <RadialGradient id="nebula-cyan" cx="50%" cy="50%" r="50%">
              <Stop offset="0" stopColor="#38BDF8" stopOpacity="0.2" />
              <Stop offset="1" stopColor="#05030F" stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Ellipse
            cx={width * 0.15}
            cy={height * 0.14}
            rx={width * 0.72}
            ry={height * 0.26}
            fill="url(#nebula-violet)"
          />
          <Ellipse
            cx={width * 0.92}
            cy={height * 0.42}
            rx={width * 0.55}
            ry={height * 0.3}
            fill="url(#nebula-pink)"
          />
          <Ellipse
            cx={width * 0.4}
            cy={height * 0.9}
            rx={width * 0.6}
            ry={height * 0.22}
            fill="url(#nebula-cyan)"
          />
          {stars.map((star, index) => (
            <Circle
              key={`star-${index}`}
              cx={star.x}
              cy={star.y}
              r={star.r}
              fill="#F7F3FF"
              opacity={star.o}
            />
          ))}
          <Rect width={width} height={height} fill="transparent" />
        </Svg>
      ) : null}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
});
