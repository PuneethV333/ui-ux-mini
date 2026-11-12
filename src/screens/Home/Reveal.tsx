import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StyleProp, ViewStyle} from 'react-native';

type Props = {
  children: React.ReactNode;
  delay?: number;
  style?: StyleProp<ViewStyle>;
  /** Distance in dp the content travels upward as it fades in. */
  distance?: number;
};

/** Small staggered entrance animation used across the Home screen. */
export default function Reveal({
  children,
  delay = 0,
  style,
  distance = 16,
}: Props) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: 520,
      delay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [delay, progress]);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: progress,
          transform: [
            {
              translateY: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [distance, 0],
              }),
            },
          ],
        },
      ]}>
      {children}
    </Animated.View>
  );
}
