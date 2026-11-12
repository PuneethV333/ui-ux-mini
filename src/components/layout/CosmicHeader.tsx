import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts, fontSize, letterSpacing, radius, spacing} from '../../theme';
import Icon from '../common/Icon';
import IconButton from '../common/IconButton';

type Props = {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  right?: React.ReactNode;
  eyebrow?: string;
  compact?: boolean;
};

export default function CosmicHeader({
  title,
  subtitle,
  onBack,
  right,
  eyebrow,
  compact,
}: Props) {
  return (
    <View style={[styles.root, compact && styles.compact]}>
      <View style={styles.row}>
        {onBack ? (
          <IconButton
            name="arrow-left"
            onPress={onBack}
            size={42}
            accessibilityLabel="Go back"
            style={styles.back}
          />
        ) : null}
        <View style={styles.titleWrap}>
          {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {right ? <View style={styles.right}>{right}</View> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {marginBottom: spacing.xl},
  compact: {marginBottom: spacing.md},
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  back: {marginRight: spacing.md, marginTop: 4},
  titleWrap: {flex: 1},
  eyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: letterSpacing.widest,
    color: colors.secondary,
    marginBottom: 6,
  },
  title: {
    fontFamily: fonts.displayBold,
    fontSize: fontSize.title,
    lineHeight: 29,
    letterSpacing: -0.3,
    color: colors.text,
  },
  subtitle: {
    marginTop: 6,
    fontFamily: fonts.body,
    fontSize: fontSize.caption,
    lineHeight: 19,
    color: colors.textMuted,
  },
  right: {marginLeft: spacing.md, marginTop: 2},
});
