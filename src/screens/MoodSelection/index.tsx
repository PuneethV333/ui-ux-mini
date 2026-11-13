import React, {useEffect, useRef} from 'react';
import {Animated, Pressable, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LinearGradient} from 'expo-linear-gradient';
import CosmicHeader from '../../components/layout/CosmicHeader';
import ScreenContainer from '../../components/layout/ScreenContainer';
import GlassCard from '../../components/common/GlassCard';
import GlowButton from '../../components/common/GlowButton';
import Icon from '../../components/common/Icon';
import {useApp} from '../../context/AppContext';
import {useExitPrompt} from '../../hooks/useExitPrompt';
import {moods} from '../../data/mockData';
import type {Mood} from '../../data/types';
import type {RootStackParamList} from '../../navigation/types';
import {colors, gradients} from '../../theme';
import {styles} from './styles';

type MoodCardProps = {
  mood: Mood;
  selected: boolean;
  onPress: () => void;
};

function MoodCard({mood, selected, onPress}: MoodCardProps) {
  const orbColors = gradients[mood.gradient];
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{selected}}
      accessibilityLabel={`${mood.label} mood. ${mood.tagline}`}
      onPress={onPress}
      style={({pressed}) => [
        styles.cardPress,
        selected && styles.cardPressSelected,
        pressed && styles.cardPressed,
      ]}>
      <LinearGradient
        colors={
          selected
            ? [...gradients.primaryButton]
            : [colors.borderStrong, colors.border]
        }
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.cardBorder}>
        <GlassCard
          padded={false}
          gradient={selected ? gradients.cardActive : gradients.card}
          style={styles.card}>
          <View style={styles.cardInner}>
            <LinearGradient
              colors={[...orbColors]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={[styles.orb, {shadowColor: mood.accent}]}>
              <View style={styles.orbShine} />
              <Text style={styles.orbEmoji}>{mood.emoji}</Text>
            </LinearGradient>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={[styles.cardLabel, selected && styles.cardLabelSelected]}>
              {mood.label}
            </Text>
            <Text numberOfLines={2} style={styles.cardTagline}>
              {mood.tagline}
            </Text>
          </View>
        </GlassCard>
      </LinearGradient>
      {selected ? (
        <View style={styles.checkBadge}>
          <Icon
            name="check"
            size={13}
            color={colors.textInverse}
            strokeWidth={3}
          />
        </View>
      ) : null}
    </Pressable>
  );
}

function StepBars({active}: {active: number}) {
  return (
    <View style={styles.stepBars}>
      {[1, 2, 3].map(step => (
        <View
          key={step}
          style={[styles.stepBar, step <= active && styles.stepBarActive]}
        />
      ))}
    </View>
  );
}

export default function MoodSelection() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {selectedMood, selectMood} = useApp();
  useExitPrompt();
  const fade = useRef(new Animated.Value(0)).current;
  const cardAnims = useRef(moods.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 420,
        useNativeDriver: true,
      }),
      Animated.stagger(
        45,
        cardAnims.map(anim =>
          Animated.spring(anim, {
            toValue: 1,
            speed: 14,
            bounciness: 5,
            useNativeDriver: true,
          }),
        ),
      ),
    ]).start();
  }, [cardAnims, fade]);

  return (
    <ScreenContainer
      edges={['top', 'left', 'right', 'bottom']}
      contentContainerStyle={styles.content}>
      <Animated.View style={{opacity: fade}}>
        <View style={styles.stepRow}>
          <Text style={styles.stepText}>STEP 1 OF 3</Text>
          <StepBars active={1} />
        </View>
        <CosmicHeader
          title="How do you feel?"
          subtitle="Choose the energy you want to create with"
          onBack={navigation.canGoBack() ? () => navigation.goBack() : undefined}
        />
      </Animated.View>

      <View style={styles.grid}>
        {moods.map((mood, index) => (
          <Animated.View
            key={mood.id}
            style={[
              styles.cardWrap,
              {
                opacity: cardAnims[index],
                transform: [
                  {
                    translateY: cardAnims[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [16, 0],
                    }),
                  },
                ],
              },
            ]}>
            <MoodCard
              mood={mood}
              selected={selectedMood === mood.id}
              onPress={() => selectMood(mood.id)}
            />
          </Animated.View>
        ))}
      </View>

      <Animated.View style={[styles.footer, {opacity: fade}]}>
        <GlowButton
          title="Continue"
          iconRight="arrow-right"
          onPress={() =>
            navigation.navigate('DrawYourMood', {moodId: selectedMood})
          }
        />
        <Text style={styles.footerHint}>
          Your mood colours every sound you make.
        </Text>
      </Animated.View>
    </ScreenContainer>
  );
}
