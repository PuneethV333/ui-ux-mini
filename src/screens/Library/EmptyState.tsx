import React from 'react';
import {Text, View} from 'react-native';
import GlowButton from '../../components/common/GlowButton';
import Icon from '../../components/common/Icon';
import {colors} from '../../theme';
import {styles} from './styles';

type Props = {
  onClear: () => void;
};

export default function EmptyState({onClear}: Props) {
  return (
    <View style={styles.emptyCard}>
      <View style={styles.orbitMark} accessibilityElementsHidden>
        <View style={styles.orbitRing} />
        <View style={[styles.orbitRing, styles.orbitRingInner]} />
        <View style={[styles.orbitDot, styles.orbitDotOne]} />
        <View style={[styles.orbitDot, styles.orbitDotTwo]} />
        <View style={styles.orbitCore}>
          <Icon name="disc" size={24} color={colors.secondary} strokeWidth={1.7} />
        </View>
      </View>

      <Text style={styles.emptyTitle}>No universes in this orbit</Text>
      <Text style={styles.emptyText}>
        Try a different mood, or adjust your search to find a world you have
        already made.
      </Text>

      <GlowButton
        title="Clear filters"
        variant="secondary"
        size="sm"
        icon="refresh"
        fullWidth={false}
        onPress={onClear}
        style={styles.emptyButton}
      />
    </View>
  );
}
