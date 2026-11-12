import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import type {RootScreenProps} from '../../navigation/types';
import {useApp} from '../../context/AppContext';
import {
  getMood,
  getUniverse,
  parallelMoods,
  parallelStyles,
} from '../../data/mockData';
import ScreenContainer from '../../components/layout/ScreenContainer';
import CosmicHeader from '../../components/layout/CosmicHeader';
import GlassCard from '../../components/common/GlassCard';
import CoverArt from '../../components/common/CoverArt';
import Chip from '../../components/common/Chip';
import GlowButton from '../../components/common/GlowButton';
import SectionHeader from '../../components/common/SectionHeader';
import {colors} from '../../theme';
import {styles} from './styles';

export default function CreateParallelUniverse({
  navigation,
  route,
}: RootScreenProps<'CreateParallelUniverse'>) {
  const {universes, createUniverseFromDraft} = useApp();
  const [selectedMood, setSelectedMood] = useState('Dark');
  const [selectedStyle, setSelectedStyle] = useState('Electronic');

  const original = useMemo(() => {
    const id = route.params?.universeId;
    return (
      universes.find(item => item.id === id) ??
      (id ? getUniverse(id) : universes[0])
    );
  }, [route.params?.universeId, universes]);

  const originalLabel = `${getMood(original.mood).label} • ${original.style}`;

  // Soft breathing halo around the original cover art.
  const pulse = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 2200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 2200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const pulseScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.94, 1.1],
  });
  const pulseOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.16, 0.42],
  });

  const enter = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(enter, {
      toValue: 1,
      duration: 520,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [enter]);

  const introStyle = {
    opacity: enter,
    transform: [
      {translateY: enter.interpolate({inputRange: [0, 1], outputRange: [14, 0]})},
    ],
  };

  const handleCreate = () => {
    const created = createUniverseFromDraft({
      name: 'Universe II',
      style: selectedStyle,
      gradient: 'rose',
      mode: 'parallel',
      displayMood: selectedMood,
    });
    navigation.navigate('ParallelUniverseResult', {universeId: created.id});
  };

  return (
    <ScreenContainer
      scroll={false}
      padded={false}
      edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.header}>
        <CosmicHeader
          title="Parallel Universe"
          subtitle="Transform your creation into another possibility"
          onBack={() => navigation.goBack()}
        />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <Animated.View style={introStyle}>
          <GlassCard style={styles.originalCard} padded={false}>
            <View style={styles.originalRow}>
              <View style={styles.originalArt}>
                <Animated.View
                  pointerEvents="none"
                  style={[
                    styles.originalPulse,
                    {opacity: pulseOpacity, transform: [{scale: pulseScale}]},
                  ]}
                />
                <CoverArt
                  gradient={original.gradient}
                  width={56}
                  height={56}
                  rounded={16}
                  seed={original.id}
                />
              </View>
              <View style={styles.originalCopy}>
                <Text style={styles.originalEyebrow}>ORIGINAL</Text>
                <Text style={styles.originalTitle} numberOfLines={1}>
                  {originalLabel}
                </Text>
                <Text style={styles.originalHint} numberOfLines={1}>
                  Your starting point for this branch
                </Text>
              </View>
              <View style={styles.originalCore}>
                <View style={styles.originalCoreDot} />
              </View>
            </View>
          </GlassCard>
        </Animated.View>

        <SectionHeader title="Choose a new mood" style={styles.section} />
        <View style={styles.chipGrid}>
          {parallelMoods.map(mood => (
            <View key={mood} style={styles.chipCell}>
              <Chip
                label={mood}
                selected={selectedMood === mood}
                onPress={() => setSelectedMood(mood)}
              />
            </View>
          ))}
        </View>

        <SectionHeader title="Choose style" style={styles.section} />
        <View style={styles.chipGrid}>
          {parallelStyles.map(style => (
            <View key={style} style={styles.chipCell}>
              <Chip
                label={style}
                selected={selectedStyle === style}
                onPress={() => setSelectedStyle(style)}
              />
            </View>
          ))}
        </View>

        <View style={styles.previewRow}>
          <View style={styles.previewDot} />
          <Text style={styles.previewText}>
            {selectedMood} • {selectedStyle} — a new branch of {original.name}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer} pointerEvents="box-none">
        <LinearGradient
          pointerEvents="none"
          colors={[
            'rgba(5,3,15,0)',
            'rgba(5,3,15,0.86)',
            colors.background,
          ]}
          locations={[0, 0.42, 1]}
          style={StyleSheet.absoluteFill}
        />
        <GlowButton
          title="CREATE PARALLEL UNIVERSE"
          uppercase
          onPress={handleCreate}
          style={styles.footerButton}
        />
      </View>
    </ScreenContainer>
  );
}
