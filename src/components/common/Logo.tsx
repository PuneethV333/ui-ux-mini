import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {colors} from '../../theme';

const fullLogo = require('../../../assets/brand/sonicverse-logo.png');
const markLogo = require('../../../assets/brand/sonicverse-mark.png');

type MarkProps = {
  size?: number;
  showStars?: boolean;
};

/** The supplied Sonicverse emblem, cropped from the official brand artwork. */
export function SonicverseMark({size = 96}: MarkProps) {
  return (
    <Image
      source={markLogo}
      style={[
        styles.mark,
        {width: size, height: size, borderRadius: size * 0.24},
      ]}
      resizeMode="contain"
      accessibilityLabel="Sonicverse"
    />
  );
}

type LockupProps = {
  size?: number;
  showWordmark?: boolean;
  showTagline?: boolean;
  tagline?: string;
};

/** Official Sonicverse lockup — emblem, wordmark and tagline. */
export default function Logo({
  size = 120,
  showWordmark = true,
}: LockupProps) {
  return (
    <Image
      source={showWordmark ? fullLogo : markLogo}
      style={[
        styles.lockup,
        {width: size, height: size, borderRadius: size * 0.22},
      ]}
      resizeMode="contain"
      accessibilityLabel="Sonicverse — draw your mood. Create your sound. Explore the universe."
    />
  );
}

const styles = StyleSheet.create({
  mark: {
    backgroundColor: colors.background,
  },
  lockup: {
    backgroundColor: colors.background,
  },
});
