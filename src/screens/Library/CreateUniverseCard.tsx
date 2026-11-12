import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Icon from '../../components/common/Icon';
import {colors, gradients} from '../../theme';
import {styles} from './styles';

type Props = {
  onPress: () => void;
};

export default function CreateUniverseCard({onPress}: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Create new universe"
      accessibilityHint="Choose a mood to start a new universe"
      style={({pressed}) => [
        styles.createCard,
        pressed && styles.createPressed,
      ]}>
      <LinearGradient
        colors={[...gradients.card]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.createPlus}>
        <LinearGradient
          colors={[...gradients.primaryButton]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={StyleSheet.absoluteFill}
        />
        <Icon
          name="plus"
          size={22}
          color={colors.textInverse}
          strokeWidth={2.6}
        />
      </View>

      <View style={styles.createTextWrap}>
        <Text
          style={styles.createTitle}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.85}>
          Create New Universe
        </Text>
        <Text style={styles.createSubtitle} numberOfLines={2}>
          Start from a mood and let it orbit.
        </Text>
      </View>

      <Icon name="chevron-right" size={18} color={colors.textDim} />
    </Pressable>
  );
}
