import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon, {IconName} from '../../components/common/Icon';
import {colors, gradients} from '../../theme';
import {styles} from './styles';

type Props = {
  icon: IconName;
  label: string;
  onPress: () => void;
  accent: string;
  tint: string;
  badge?: string;
  strongBorder?: boolean;
};

/** Tappable profile menu row: tinted glyph square, label, optional count, chevron. */
export default function MenuRow({
  icon,
  label,
  onPress,
  accent,
  tint,
  badge,
  strongBorder,
}: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={badge ? `${label}, ${badge}` : label}
      onPress={onPress}
      android_ripple={{color: 'rgba(255,255,255,0.06)'}}
      style={({pressed}) => [
        styles.menuRow,
        strongBorder && styles.menuRowStrong,
        pressed && styles.menuRowPressed,
      ]}
    >
      <LinearGradient
        colors={[...gradients.card]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.menuRowInner}>
        <View style={[styles.menuIcon, {backgroundColor: tint}]}>
          <Icon name={icon} size={18} color={accent} strokeWidth={1.9} />
        </View>
        <Text style={styles.menuLabel} numberOfLines={1}>
          {label}
        </Text>
        {badge ? (
          <View style={styles.menuBadge}>
            <Text style={styles.menuBadgeText}>{badge}</Text>
          </View>
        ) : null}
        <View style={styles.menuChevronWrap}>
          <Icon
            name="chevron-right"
            size={16}
            color={colors.textDim}
            strokeWidth={1.8}
          />
        </View>
      </View>
    </Pressable>
  );
}
