import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
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
import {colors, fonts, letterSpacing} from '../../theme';

type MarkProps = {
  size?: number;
  showStars?: boolean;
};

/** Vector recreation of the Sonicverse orbital waveform mark. */
export function SonicverseMark({size = 96, showStars = true}: MarkProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 240 240">
      <Defs>
        <RadialGradient id="sv-core" cx="50%" cy="50%" r="50%">
          <Stop offset="0" stopColor="#3B1B6B" stopOpacity="0.95" />
          <Stop offset="0.55" stopColor="#160A33" stopOpacity="0.9" />
          <Stop offset="1" stopColor="#05030F" stopOpacity="0" />
        </RadialGradient>
        <LinearGradient id="sv-orbit" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FF7AD9" />
          <Stop offset="0.38" stopColor="#C084FC" />
          <Stop offset="0.72" stopColor="#6366F1" />
          <Stop offset="1" stopColor="#38BDF8" />
        </LinearGradient>
        <LinearGradient id="sv-orbit2" x1="1" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFE1A8" />
          <Stop offset="0.5" stopColor="#FFC46B" />
          <Stop offset="1" stopColor="#FF8A4C" stopOpacity="0.4" />
        </LinearGradient>
        <LinearGradient id="sv-wave" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#FFC46B" />
          <Stop offset="0.5" stopColor="#FFE1A8" />
          <Stop offset="1" stopColor="#FF8A4C" />
        </LinearGradient>
      </Defs>

      <Circle cx="120" cy="118" r="112" fill="url(#sv-core)" />

      <G transform="rotate(-26 120 120)">
        <Ellipse
          cx="120"
          cy="120"
          rx="102"
          ry="42"
          stroke="url(#sv-orbit)"
          strokeWidth="5"
          fill="none"
          opacity="0.95"
        />
        <Ellipse
          cx="120"
          cy="120"
          rx="88"
          ry="34"
          stroke="url(#sv-orbit)"
          strokeWidth="2"
          fill="none"
          opacity="0.55"
        />
        <Ellipse
          cx="120"
          cy="120"
          rx="112"
          ry="50"
          stroke="url(#sv-orbit2)"
          strokeWidth="1.6"
          fill="none"
          opacity="0.75"
          strokeDasharray="2 10"
        />
      </G>

      <G transform="rotate(38 120 120)">
        <Ellipse
          cx="120"
          cy="120"
          rx="86"
          ry="30"
          stroke="url(#sv-orbit)"
          strokeWidth="1.4"
          fill="none"
          opacity="0.5"
        />
      </G>

      <Circle
        cx="120"
        cy="120"
        r="49"
        fill="#0B0518"
        stroke="url(#sv-orbit)"
        strokeWidth="2.4"
      />
      <Circle
        cx="120"
        cy="120"
        r="42"
        fill="none"
        stroke="url(#sv-orbit2)"
        strokeWidth="1.2"
        opacity="0.75"
      />

      <Path
        d="M90 121h10l6-17 8 34 8-26 5 13 5-6h8"
        stroke="url(#sv-wave)"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Small gold planet on the outer orbit */}
      <Circle cx="196" cy="160" r="6.5" fill="#FFC46B" />
      <Circle cx="196" cy="160" r="11" fill="none" stroke="#FFC46B" opacity="0.35" strokeWidth="2" />

      {showStars ? (
        <G fill="#F7F3FF">
          <Circle cx="34" cy="52" r="1.6" opacity="0.9" />
          <Circle cx="52" cy="176" r="1.2" opacity="0.6" />
          <Circle cx="206" cy="62" r="1.5" opacity="0.85" />
          <Circle cx="184" cy="212" r="1.1" opacity="0.5" />
          <Circle cx="24" cy="126" r="1" opacity="0.5" />
          <Circle cx="150" cy="28" r="1.2" opacity="0.7" />
        </G>
      ) : null}
    </Svg>
  );
}

type LockupProps = {
  size?: number;
  showWordmark?: boolean;
  showTagline?: boolean;
  tagline?: string;
};

/** Emblem + SonicVerse wordmark. */
export default function Logo({
  size = 120,
  showWordmark = true,
  showTagline = false,
  tagline = 'Draw your mood. Create your sound. Explore the universe.',
}: LockupProps) {
  return (
    <View style={styles.wrap}>
      <SonicverseMark size={size} />
      {showWordmark ? (
        <Text style={[styles.wordmark, {fontSize: size * 0.22}]}>
          Sonic<Text style={styles.wordmarkAccent}>Verse</Text>
        </Text>
      ) : null}
      {showTagline ? <Text style={styles.tagline}>{tagline}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {alignItems: 'center'},
  wordmark: {
    marginTop: 2,
    fontFamily: fonts.display,
    color: colors.text,
    letterSpacing: 1.4,
    textShadowColor: 'rgba(244,114,208,0.55)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 18,
  },
  wordmarkAccent: {
    color: colors.secondary,
  },
  tagline: {
    marginTop: 10,
    fontFamily: fonts.body,
    fontSize: 12,
    letterSpacing: letterSpacing.wide,
    color: colors.textMuted,
    textAlign: 'center',
    maxWidth: 280,
  },
});
