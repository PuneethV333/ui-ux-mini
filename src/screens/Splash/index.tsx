import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Easing,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Svg, {
  Circle,
  Defs,
  RadialGradient,
  Stop,
} from 'react-native-svg';
import ScreenContainer from '../../components/layout/ScreenContainer';
import GlowButton from '../../components/common/GlowButton';
import {SonicverseMark} from '../../components/common/Logo';
import type {RootStackParamList} from '../../navigation/types';
import {colors} from '../../theme';
import {styles} from './styles';

export default function Splash() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {width, height} = useWindowDimensions();

  const markSize = Math.round(Math.min(width * 0.42, height * 0.24, 168));

  const pulse = useRef(new Animated.Value(0)).current;
  const enter = useRef(new Animated.Value(0)).current;
  const footerEnter = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 2600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 2600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );

    const entrance = Animated.parallel([
      Animated.timing(enter, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(footerEnter, {
        toValue: 1,
        duration: 800,
        delay: 260,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);

    pulseLoop.start();
    entrance.start();

    return () => {
      pulseLoop.stop();
      entrance.stop();
    };
  }, [enter, footerEnter, pulse]);

  const haloes = Math.round(markSize * 1.9);
  const haloScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.92, 1.05],
  });
  const haloOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.45, 0.9],
  });
  const heroTranslate = enter.interpolate({
    inputRange: [0, 1],
    outputRange: [18, 0],
  });
  const footerTranslate = footerEnter.interpolate({
    inputRange: [0, 1],
    outputRange: [14, 0],
  });

  return (
    <ScreenContainer
      scroll={false}
      padded={false}
      variant="deep"
      edges={['top', 'left', 'right', 'bottom']}
      contentContainerStyle={styles.root}>
      <View style={styles.topBar}>
        <Text style={styles.eyebrow}>SONICVERSE</Text>
        <Text style={styles.version}>v1.0</Text>
      </View>

      <Animated.View
        style={[
          styles.hero,
          {
            opacity: enter,
            transform: [{translateY: heroTranslate}],
          },
        ]}>
        <View style={[styles.emblemWrap, {width: markSize, height: markSize}]}>
          <Animated.View
            style={[
              styles.halo,
              {
                width: haloes,
                height: haloes,
                top: (markSize - haloes) / 2,
                left: (markSize - haloes) / 2,
                opacity: haloOpacity,
                transform: [{scale: haloScale}],
              },
            ]}>
            <Svg width={haloes} height={haloes}>
              <Defs>
                <RadialGradient id="splash-aura" cx="50%" cy="50%" r="50%">
                  <Stop
                    offset="0"
                    stopColor={colors.primary}
                    stopOpacity="0.38"
                  />
                  <Stop
                    offset="0.42"
                    stopColor={colors.primaryDeep}
                    stopOpacity="0.2"
                  />
                  <Stop
                    offset="0.7"
                    stopColor={colors.secondaryDeep}
                    stopOpacity="0.09"
                  />
                  <Stop
                    offset="1"
                    stopColor={colors.background}
                    stopOpacity="0"
                  />
                </RadialGradient>
                <RadialGradient id="splash-core" cx="50%" cy="50%" r="50%">
                  <Stop
                    offset="0"
                    stopColor={colors.secondary}
                    stopOpacity="0.5"
                  />
                  <Stop
                    offset="0.55"
                    stopColor={colors.primary}
                    stopOpacity="0.18"
                  />
                  <Stop
                    offset="1"
                    stopColor={colors.background}
                    stopOpacity="0"
                  />
                </RadialGradient>
              </Defs>
              <Circle
                cx={haloes / 2}
                cy={haloes / 2}
                r={haloes / 2}
                fill="url(#splash-aura)"
              />
              <Circle
                cx={haloes / 2}
                cy={haloes / 2}
                r={markSize * 0.78}
                fill="url(#splash-core)"
              />
            </Svg>
          </Animated.View>
          <View
            style={[
              styles.ring,
              {
                width: markSize * 1.16,
                height: markSize * 1.16,
                borderRadius: markSize * 0.58,
                top: (markSize - markSize * 1.16) / 2,
                left: (markSize - markSize * 1.16) / 2,
              },
            ]}
          />
          <SonicverseMark size={markSize} />
        </View>

        <Text style={styles.wordmark} numberOfLines={1} adjustsFontSizeToFit>
          Sonic<Text style={styles.wordmarkAccent}>Verse</Text>
        </Text>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <View style={styles.dividerDot} />
          <View style={styles.dividerLine} />
        </View>

        <Text style={styles.tagline}>
          Draw your mood.{'\n'}Create your sound.{'\n'}Explore the universe.
        </Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.footer,
          {
            opacity: footerEnter,
            transform: [{translateY: footerTranslate}],
          },
        ]}>
        <GlowButton
          title="GET STARTED"
          uppercase
          iconRight="arrow-right"
          onPress={() => navigation.navigate('Onboarding')}
        />
        <Text style={styles.hint}>Offline experience · all sounds on device</Text>
      </Animated.View>
    </ScreenContainer>
  );
}
