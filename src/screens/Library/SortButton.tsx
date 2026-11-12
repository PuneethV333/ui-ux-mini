import React from 'react';
import {Pressable, Text} from 'react-native';
import Icon from '../../components/common/Icon';
import {colors} from '../../theme';
import {styles} from './styles';

export type SortMode = 'newest' | 'az';

type Props = {
  mode: SortMode;
  onPress: () => void;
};

export default function SortButton({mode, onPress}: Props) {
  const label = mode === 'newest' ? 'Newest' : 'A–Z';

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Sort: ${
        mode === 'newest' ? 'Newest first' : 'A to Z'
      }. Tap to change sort order.`}
      style={({pressed}) => [
        styles.sortButton,
        pressed && styles.sortButtonPressed,
      ]}>
      <Icon
        name="sliders"
        size={13}
        color={colors.secondary}
        strokeWidth={2}
      />
      <Text style={styles.sortLabel} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}
