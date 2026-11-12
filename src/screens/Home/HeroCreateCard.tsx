import React, {useEffect, useRef} from 'react';
import {Animated, Easing, Pressable, StyleSheet, Text, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  RadialGradient,
  Stop,
} from 'react-native-svg';
import Icon from '../../components/common/Icon';
import {
  colors,
  fonts,
  fontSize,
  gradients,
  letterSpacing,
  radius,
  shadows,
  spacing,
} from '../../theme';

type Props = {
  onPress: () => void;
};

const ART_SIZE = 240;

/**
 * Hero "create universe" card: aurora gradient, slowly orbiting art and a
 * single clear call to action. The whole card is the touch target.
 */
export default function HeroCreateCard({onPress}: Props) {
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 54000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [spin]);

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Create universe. Draw a mood and compose a new sound."
      onPress={onPress}
      style={({pressed}) => [styles.card, pressed && styles.pressed]}>
      <LinearGradient
        colors={[...gradients.cardActive]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={[
          'rgba(244,114,208,0.26)',
          'rgba(99,102,241,0.10)',
          'rgba(5,3,15,0)',
        ]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      <View style={styles.art} pointerEvents="none">
        <Animated.View style={{transform: [{rotate}]}}>
          <Svg width={ART_SIZE} height={ART_SIZE} viewBox="0 0 200 200">
            <Defs>
              <RadialGradient id="hero-nebula" cx="50%" cy="50%" r="50%">
                <Stop offset="0" stopColor="#F472D0" stopOpacity="0.5" />
                <Stop offset="0.55" stopColor="#8B5CF6" stopOpacity="0.24" />
                <Stop offset="1" stopColor="#05030F" stopOpacity="0" />
              </RadialGradient>
              <RadialGradient id="hero-core" cx="50%" cy="50%" r="50%">
                <Stop offset="0" stopColor="#FFF6E2" stopOpacity="1" />
                <Stop offset="0.42" stopColor="#FFE1A8" stopOpacity="0.95" />
                <Stop offset="0.75" stopColor="#FFC46B" stopOpacity="0.45" />
                <Stop offset="1" stopColor="#FF8A4C" stopOpacity="0" />
              </RadialGradient>
            </Defs>

            <Circle cx="100" cy="100" r="92" fill="url(#hero-nebula)" />

            <G>
              <Ellipse
                cx="100"
                cy="100"
                rx="92"
                ry="40"
                stroke="rgba(244,114,208,0.22)"
                strokeWidth="0.8"
                fill="none"
              />
              <Ellipse
                cx="100"
                cy="100"
                rx="76"
                ry="29"
                stroke="rgba(255,255,255,0.30)"
                strokeWidth="0.9"
                fill="none"
              />
              <Ellipse
                cx="100"
                cy="100"
                rx="56"
                ry="21"
                stroke="rgba(255,225,168,0.42)"
                strokeWidth="0.7"
                fill="none"
                strokeDasharray="2 6"
              />
              <Circle cx="176" cy="100" r="3.6" fill="#FFE1A8" />
              <Circle cx="44" cy="100" r="2.4" fill="#F472D0" />
              <Circle cx="100" cy="71" r="1.9" fill="#FFFFFF" opacity="0.85" />
            </G>

            <Circle cx="100" cy="100" r="26" fill="url(#hero-core)" />
            <Circle cx="100" cy="100" r="9" fill="#FFF6E2" />
            <Circle
              cx="100"
              cy="100"
              r="15"
              stroke="rgba(255,225,168,0.65)"
              strokeWidth="0.9"
              fill="none"
            />
          </Svg>
        </Animated.View>
      </View>

      <View style={styles.content}>
        <View style={styles.eyebrow}>
          <Icon name="sparkles" size={12} color={colors.goldBright} />
          <Text style={styles.eyebrowText}>NEW UNIVERSE</Text>
        </View>

        <Text style={styles.title} numberOfLines={2} adjustsFontSizeToFit>
          create{'\n'}universe
        </Text>

        <Text style={styles.subtitle} numberOfLines={2}>
          Draw a feeling. We&apos;ll tune the stars around it.
        </Text>

        <View style={styles.cta}>
          <LinearGradient
            colors={[...gradients.primaryButton]}
            locations={[0, 0.5, 1]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={StyleSheet.absoluteFill}
          />
          <Text style={styles.ctaText}>Start creating</Text>
          <Icon
            name="arrow-right"
            size={15}
            color={colors.textInverse}
            strokeWidth={2.2}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 218,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    ...shadows.glowViolet,
  },
  pressed: {opacity: 0.9, transform: [{scale: 0.994}]},
  art: {
    position: 'absolute',
    right: -54,
    top: -10,
    width: ART_SIZE,
    height: ART_SIZE,
    opacity: 0.9,
  },
  content: {
    padding: spacing.lg + 2,
    maxWidth: '82%',
  },
  eyebrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    height: 24,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(255,225,168,0.28)',
    backgroundColor: 'rgba(5,3,15,0.4)',
    marginBottom: spacing.md,
  },
  eyebrowText: {
    fontFamily: fonts.bodyBold,
    fontSize: 9.5,
    color: colors.goldBright,
    letterSpacing: letterSpacing.wider,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 30,
    lineHeight: 34,
    color: colors.text,
    letterSpacing: letterSpacing.tight,
    textShadowColor: 'rgba(244,114,208,0.45)',
    textShadowRadius: 16,
  },
  subtitle: {
    marginTop: spacing.sm,
    fontFamily: fonts.body,
    fontSize: fontSize.caption,
    lineHeight: 18,
    color: colors.textMuted,
    maxWidth: 230,
  },
  cta: {
    marginTop: spacing.lg,
    alignSelf: 'flex-start',
    height: 40,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ctaText: {
    fontFamily: fonts.bodyBold,
    fontSize: 12.5,
    color: colors.textInverse,
    letterSpacing: letterSpacing.wide,
  },
});
