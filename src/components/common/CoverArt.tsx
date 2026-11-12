import React, {useMemo} from 'react';
import {
  DimensionValue,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Path,
  RadialGradient,
  Stop,
} from 'react-native-svg';
import {gradients, radius} from '../../theme';
import type {GradientName} from '../../theme';

type Props = {
  gradient?: GradientName;
  width?: DimensionValue;
  height?: number;
  style?: StyleProp<ViewStyle>;
  seed?: string;
  showWave?: boolean;
  rounded?: number;
};

export default function CoverArt({
  gradient = 'violet',
  width = '100%',
  height = 140,
  style,
  seed = 'sonicverse',
  showWave = true,
  rounded = radius.lg,
}: Props) {
  const colors = gradients[gradient] ?? gradients.violet;
  const uid = `${seed}-${gradient}`.replace(/[^a-zA-Z0-9]/g, '');

  const stars = useMemo(() => {
    const list: Array<{x: number; y: number; r: number; o: number}> = [];
    for (let i = 0; i < 22; i += 1) {
      const x = Math.abs(Math.sin(i * 9.13 + seed.length) * 43758.5) % 100;
      const y = Math.abs(Math.sin(i * 4.77 + 2.3) * 43758.5) % 100;
      list.push({
        x,
        y,
        r: 0.5 + (i % 3) * 0.5,
        o: 0.3 + (i % 5) * 0.12,
      });
    }
    return list;
  }, [seed]);

  return (
    <View
      style={[
        styles.root,
        {width, height, borderRadius: rounded},
        style,
      ]}>
      <Svg width="100%" height="100%" viewBox="0 0 200 140">
        <Defs>
          <LinearGradient id={`${uid}-bg`} x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={colors[0]} stopOpacity="0.95" />
            <Stop offset="0.5" stopColor={colors[1]} stopOpacity="0.9" />
            <Stop offset="1" stopColor={colors[2]} stopOpacity="0.98" />
          </LinearGradient>
          <RadialGradient id={`${uid}-glow`} cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.55" />
            <Stop offset="0.4" stopColor={colors[0]} stopOpacity="0.35" />
            <Stop offset="1" stopColor="#05030F" stopOpacity="0" />
          </RadialGradient>
          <LinearGradient id={`${uid}-ring`} x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.9" />
            <Stop offset="0.6" stopColor="#FFE1A8" stopOpacity="0.75" />
            <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0.2" />
          </LinearGradient>
        </Defs>
        <Circle cx="100" cy="70" r="78" fill={`url(#${uid}-bg)`} />
        <Circle cx="128" cy="58" r="62" fill={`url(#${uid}-glow)`} />
        <G transform="rotate(-22 100 70)">
          <Ellipse
            cx="100"
            cy="70"
            rx="72"
            ry="28"
            stroke={`url(#${uid}-ring)`}
            strokeWidth="1.1"
            fill="none"
            opacity="0.85"
          />
          <Ellipse
            cx="100"
            cy="70"
            rx="54"
            ry="20"
            stroke={`url(#${uid}-ring)`}
            strokeWidth="0.7"
            fill="none"
            opacity="0.55"
            strokeDasharray="1.5 7"
          />
        </G>
        <Circle cx="100" cy="70" r="24" fill="#060312" opacity="0.8" />
        <Circle
          cx="100"
          cy="70"
          r="24"
          stroke={`url(#${uid}-ring)`}
          strokeWidth="1"
          fill="none"
          opacity="0.8"
        />
        {showWave ? (
          <Path
            d="M84 70h6l4-9 5 18 4-13 3 6 3-2h7"
            stroke="#FFE1A8"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        ) : null}
        {stars.map((star, index) => (
          <Circle
            key={`${uid}-star-${index}`}
            cx={(star.x / 100) * 200}
            cy={(star.y / 100) * 140}
            r={star.r}
            fill="#FFFFFF"
            opacity={star.o}
          />
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    overflow: 'hidden',
    backgroundColor: '#0B0618',
    borderWidth: 1,
    borderColor: 'rgba(167,139,250,0.18)',
  },
});
