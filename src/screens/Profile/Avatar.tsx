import React, {useEffect, useRef} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Ellipse} from 'react-native-svg';
import {colors, gradients} from '../../theme';
import {styles} from './styles';

type Props = {
  name: string;
};

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) {
    return 'SV';
  }
  return parts
    .slice(0, 2)
    .map(part => part.charAt(0).toUpperCase())
    .join('');
}

/** Large avatar with a double gradient ring, orbit trail and breathing halo. */
export default function Avatar({name}: Props) {
  const {width} = useWindowDimensions();
  const size = Math.round(Math.min(124, Math.max(104, width * 0.285)));
  const wrap = size + 40;
  const haloSize = size + 36;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 2800,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 2800,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const haloScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.96, 1.08],
  });
  const haloOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 0.3],
  });

  return (
    <View style={[styles.avatarWrap, {width: wrap, height: wrap}]}>
      <Animated.View
        style={[
          styles.avatarHalo,
          {
            width: haloSize,
            height: haloSize,
            borderRadius: haloSize / 2,
            top: (wrap - haloSize) / 2,
            left: (wrap - haloSize) / 2,
            opacity: haloOpacity,
            transform: [{scale: haloScale}],
          },
        ]}
      >
        <LinearGradient
          colors={[
            'rgba(244,114,208,0.24)',
            'rgba(139,92,246,0.18)',
            'rgba(56,189,248,0.04)',
          ]}
          start={{x: 0.15, y: 0}}
          end={{x: 0.85, y: 1}}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      <Svg
        width={wrap}
        height={wrap}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      >
        <Ellipse
          cx={wrap / 2}
          cy={wrap / 2}
          rx={size / 2 + 16}
          ry={size * 0.18}
          stroke={colors.borderStrong}
          strokeWidth={1}
          strokeDasharray="2 7"
          fill="none"
          transform={`rotate(-18 ${wrap / 2} ${wrap / 2})`}
        />
      </Svg>

      <LinearGradient
        colors={[...gradients.aurora]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={[
          styles.ringOuter,
          {width: size, height: size, borderRadius: size / 2},
        ]}
      >
        <View style={[styles.ringGap, {borderRadius: size / 2}]}>
          <LinearGradient
            colors={[...gradients.gold]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={[styles.ringInner, {borderRadius: size / 2}]}
          >
            <LinearGradient
              colors={['rgba(52,30,98,0.98)', 'rgba(11,6,26,0.99)']}
              start={{x: 0.2, y: 0}}
              end={{x: 0.8, y: 1}}
              style={[styles.avatarCore, {borderRadius: size / 2}]}
            >
              <Text
                style={[styles.initials, {fontSize: Math.round(size * 0.31)}]}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.7}
              >
                {getInitials(name)}
              </Text>
            </LinearGradient>
          </LinearGradient>
        </View>
        <View style={[styles.orbitDot, {right: size * 0.18}]} />
        <View style={[styles.orbitDotCyan, {left: size * 0.18}]} />
      </LinearGradient>
    </View>
  );
}
