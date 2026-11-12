import React from 'react';
import {Animated, Pressable, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GlassCard from '../../components/common/GlassCard';
import Icon from '../../components/common/Icon';
import type {IconName} from '../../components/common/Icon';
import type {RemixIngredient} from '../../data/types';
import {colors, gradients} from '../../theme';
import {styles} from './styles';

export type RemixChoice = 'original' | 'parallel';

type Props = {
  ingredient: RemixIngredient;
  choice: RemixChoice;
  onSelect: (choice: RemixChoice) => void;
  entrance: Animated.Value;
};

const ACCENTS: Record<
  string,
  {color: string; gradient: readonly string[]}
> = {
  melody: {color: colors.secondary, gradient: gradients.rose},
  beat: {color: colors.cyan, gradient: gradients.cyan},
  bass: {color: colors.gold, gradient: gradients.gold},
  atmosphere: {color: colors.primaryBright, gradient: gradients.violet},
};

export default function IngredientCard({
  ingredient,
  choice,
  onSelect,
  entrance,
}: Props) {
  const accent = ACCENTS[ingredient.id] ?? {
    color: colors.primaryBright,
    gradient: gradients.violet,
  };

  const options: Array<{key: RemixChoice; label: string}> = [
    {key: 'original', label: 'Original'},
    {key: 'parallel', label: ingredient.parallelLabel},
  ];

  const translateY = entrance.interpolate({
    inputRange: [0, 1],
    outputRange: [16, 0],
  });
  const scale = entrance.interpolate({
    inputRange: [0, 1],
    outputRange: [0.97, 1],
  });

  return (
    <Animated.View
      style={[
        styles.cardWrap,
        {opacity: entrance, transform: [{translateY}, {scale}]},
      ]}>
      <GlassCard
        padded={false}
        active={choice === 'parallel'}
        style={styles.card}>
        <View style={styles.cardInner}>
          <View style={styles.cardTop}>
            <View style={styles.orb}>
              <LinearGradient
                colors={[...accent.gradient]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.orbFill}
              />
              <View style={styles.orbInner}>
                <Icon
                  name={ingredient.icon as IconName}
                  size={15}
                  color={accent.color}
                  strokeWidth={1.8}
                  fill={accent.color}
                />
              </View>
            </View>
            <Text
              style={styles.cardLabel}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}>
              {ingredient.label}
            </Text>
          </View>

          <View style={styles.options}>
            {options.map(option => {
              const selected = choice === option.key;
              return (
                <Pressable
                  key={option.key}
                  accessibilityRole="radio"
                  accessibilityState={{checked: selected}}
                  accessibilityLabel={`${ingredient.label}: ${option.label}`}
                  hitSlop={{top: 2, bottom: 2}}
                  onPress={() => onSelect(option.key)}
                  style={[styles.option, selected && styles.optionSelected]}>
                  {selected ? (
                    <LinearGradient
                      colors={[...gradients.secondaryButton]}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 1}}
                      style={styles.optionFill}
                    />
                  ) : null}
                  <View
                    style={[
                      styles.radio,
                      selected && styles.radioSelected,
                      selected && {borderColor: accent.color},
                    ]}>
                    {selected ? (
                      <View
                        style={[
                          styles.radioDot,
                          {backgroundColor: accent.color},
                        ]}
                      />
                    ) : null}
                  </View>
                  <Text
                    style={[
                      styles.optionLabel,
                      selected && styles.optionLabelSelected,
                    ]}
                    numberOfLines={1}>
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </GlassCard>
    </Animated.View>
  );
}
