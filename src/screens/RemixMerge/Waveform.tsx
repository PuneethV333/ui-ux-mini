import React, {useEffect, useMemo, useRef} from 'react';
import {Animated, Easing, View} from 'react-native';
import {colors} from '../../theme';
import {styles} from './styles';

const BAR_COUNT = 34;
const BAR_COLORS = [colors.secondary, colors.primaryBright, colors.cyan];

type Props = {active: boolean};

/** Deterministic waveform that gently breathes while the blend is previewing. */
export default function Waveform({active}: Props) {
  const pulse = useRef(new Animated.Value(0)).current;

  const heights = useMemo(
    () =>
      Array.from(
        {length: BAR_COUNT},
        (_, index) => 0.24 + Math.abs(Math.sin(index * 1.73 + 0.4)) * 0.76,
      ),
    [],
  );

  useEffect(() => {
    if (!active) {
      pulse.stopAnimation();
      pulse.setValue(0);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 820,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 820,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [active, pulse]);

  return (
    <View
      style={styles.waveRow}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants">
      {heights.map((height, index) => {
        const low = 0.42 + (index % 4) * 0.08;
        const scale = pulse.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange:
            index % 2 === 0 ? [low, 1, low] : [1, low, 1],
        });
        return (
          <Animated.View
            key={`bar-${index}`}
            style={[
              styles.waveBar,
              active ? styles.waveBarActive : styles.waveBarIdle,
              {
                height: Math.round(8 + height * 26),
                backgroundColor: BAR_COLORS[index % BAR_COLORS.length],
                transform: [{scaleY: active ? scale : 0.62}],
              },
            ]}
          />
        );
      })}
    </View>
  );
}
