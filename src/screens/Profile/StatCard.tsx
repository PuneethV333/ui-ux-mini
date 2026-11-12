import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Icon, {IconName} from '../../components/common/Icon';
import {gradients} from '../../theme';
import {styles} from './styles';

type Props = {
  icon: IconName;
  value: number;
  label: string;
  accent: string;
  tint: string;
  glow: string;
  strongBorder?: boolean;
};

/** Glass metric card with a tinted glyph and a soft colored aura. */
export default function StatCard({
  icon,
  value,
  label,
  accent,
  tint,
  glow,
  strongBorder,
}: Props) {
  return (
    <View style={[styles.statCardWrap, {shadowColor: accent}]}>
      <View style={[styles.statCard, strongBorder && styles.statCardStrong]}>
        <LinearGradient
          colors={[...gradients.card]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={StyleSheet.absoluteFill}
        />
        <LinearGradient
          colors={[glow, 'rgba(5,3,15,0)']}
          start={{x: 1, y: 0}}
          end={{x: 0.15, y: 1}}
          style={styles.statGlow}
          pointerEvents="none"
        />
        <View style={styles.statCardInner}>
          <View style={styles.statTopRow}>
            <View
              style={[
                styles.statIconBadge,
                {backgroundColor: tint, borderColor: glow},
              ]}
            >
              <Icon name={icon} size={18} color={accent} strokeWidth={1.9} />
            </View>
            <View style={[styles.statCornerDot, {backgroundColor: accent}]} />
          </View>
          <Text
            style={[styles.statValue, {textShadowColor: glow}]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.7}
          >
            {value}
          </Text>
          <Text style={styles.statLabel} numberOfLines={1}>
            {label}
          </Text>
        </View>
      </View>
    </View>
  );
}
