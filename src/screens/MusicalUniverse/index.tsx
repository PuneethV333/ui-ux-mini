import React, {useEffect, useMemo, useRef} from 'react';
import {
  Alert,
  Animated,
  Easing,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import Svg, {
  Circle,
  Defs,
  RadialGradient,
  Stop,
} from 'react-native-svg';
import CosmicHeader from '../../components/layout/CosmicHeader';
import ScreenContainer from '../../components/layout/ScreenContainer';
import GlassCard from '../../components/common/GlassCard';
import GlowButton from '../../components/common/GlowButton';
import IconButton from '../../components/common/IconButton';
import ProgressBar from '../../components/common/ProgressBar';
import OrbitVisual from '../../components/player/OrbitVisual';
import PlayerControls from '../../components/player/PlayerControls';
import {useApp} from '../../context/AppContext';
import {usePlayer} from '../../context/PlayerContext';
import {comparisonMetrics, getMood, getUniverse} from '../../data/mockData';
import type {RootScreenProps} from '../../navigation/types';
import {colors, gradients, spacing} from '../../theme';
import {styles} from './styles';

type Props = RootScreenProps<'MusicalUniverse'>;

const ORBIT_NODES = [
  {id: 'melody', label: 'Melody', color: colors.secondary, angle: -90},
  {id: 'bass', label: 'Bass', color: colors.primaryBright, angle: -18},
  {id: 'beat', label: 'Beat', color: colors.gold, angle: 162},
  {id: 'instrument', label: 'Instrument', color: colors.cyan, angle: 126},
  {id: 'atmosphere', label: 'Atmosphere', color: colors.magenta, angle: 54},
];

const STAT_COLORS: Record<string, string> = {
  melody: colors.secondary,
  rhythm: colors.primaryBright,
  energy: colors.gold,
  atmosphere: colors.cyan,
};

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

export default function MusicalUniverse({navigation, route}: Props) {
  const {width} = useWindowDimensions();
  const {universes} = useApp();
  const {play, current, isCurrent} = usePlayer();

  const universeId = route.params?.universeId;

  const universe = useMemo(() => {
    if (universeId) {
      return (
        universes.find(item => item.id === universeId) ??
        getUniverse(universeId)
      );
    }
    return universes.find(item => item.id === current.id) ?? current;
  }, [current, universeId, universes]);

  const mood = getMood(universe.mood);
  const orbitSize = Math.min(width - spacing.screen * 2 - 16, 326);

  const fade = useRef(new Animated.Value(0)).current;
  const glow = useRef(new Animated.Value(0)).current;
  const playedRef = useRef<string | null>(null);

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 520,
      useNativeDriver: true,
    }).start();
  }, [fade]);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(glow, {
          toValue: 1,
          duration: 2600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(glow, {
          toValue: 0,
          duration: 2600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [glow]);

  useEffect(() => {
    if (playedRef.current === universe.id) {
      return;
    }
    playedRef.current = universe.id;
    if (!isCurrent(universe.id)) {
      play(universe);
    }
  }, [isCurrent, play, universe]);

  const glowScale = glow.interpolate({
    inputRange: [0, 1],
    outputRange: [0.92, 1.06],
  });
  const glowOpacity = glow.interpolate({
    inputRange: [0, 1],
    outputRange: [0.34, 0.7],
  });

  const showHelp = () => {
    Alert.alert(
      'Your universe',
      'Every node is a layer of your sound — melody, bass, beat, instrument and atmosphere orbiting one core. Play it below, redraw the feeling with Edit Sound, or branch into an alternate reality with Parallel Universe.',
      [{text: 'Got it'}],
    );
  };

  return (
    <ScreenContainer
      edges={['top', 'left', 'right', 'bottom']}
      contentContainerStyle={styles.content}>
      <View style={styles.stepRow}>
        <Text style={styles.stepText}>STEP 3 OF 3</Text>
        <StepBars active={3} />
      </View>

      <CosmicHeader
        compact
        title="My Universe"
        onBack={() => navigation.goBack()}
        right={
          <IconButton
            name="help"
            size={40}
            onPress={showHelp}
            accessibilityLabel="Universe help"
          />
        }
      />

      <Animated.View
        style={{
          opacity: fade,
          transform: [
            {
              translateY: fade.interpolate({
                inputRange: [0, 1],
                outputRange: [16, 0],
              }),
            },
          ],
        }}>
        <View style={styles.heading}>
          <Text style={styles.eyebrow}>
            {universe.isOriginal ? 'ORIGINAL UNIVERSE' : 'NEW UNIVERSE'}
          </Text>
          <Text
            accessibilityRole="header"
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.universeName}>
            {universe.name}
          </Text>
          <Text style={styles.universeMeta}>
            {mood.label} <Text style={styles.metaDot}>•</Text> {universe.style}
          </Text>
          <Text numberOfLines={2} style={styles.description}>
            {universe.description}
          </Text>
        </View>

        <View
          style={[styles.orbitWrap, {width: orbitSize, height: orbitSize}]}
          accessibilityLabel={`Orbit diagram of ${universe.name} with melody, bass, beat, instrument and atmosphere around the core`}>
          <View style={styles.orbitGlowWrap} pointerEvents="none">
            <Animated.View
              style={[
                styles.orbitGlow,
                {
                  width: orbitSize * 0.78,
                  height: orbitSize * 0.78,
                  borderRadius: (orbitSize * 0.78) / 2,
                  opacity: glowOpacity,
                  transform: [{scale: glowScale}],
                },
              ]}>
              <Svg width="100%" height="100%">
                <Defs>
                  <RadialGradient
                    id="universe-glow"
                    cx="50%"
                    cy="50%"
                    r="50%">
                    <Stop
                      offset="0"
                      stopColor={colors.primary}
                      stopOpacity="0.6"
                    />
                    <Stop
                      offset="0.5"
                      stopColor={colors.secondary}
                      stopOpacity="0.24"
                    />
                    <Stop
                      offset="1"
                      stopColor={colors.background}
                      stopOpacity="0"
                    />
                  </RadialGradient>
                </Defs>
                <Circle
                  cx="50%"
                  cy="50%"
                  r="50%"
                  fill="url(#universe-glow)"
                />
              </Svg>
            </Animated.View>
          </View>
          <OrbitVisual
            size={orbitSize}
            nodes={ORBIT_NODES}
            coreLabel="Core"
          />
        </View>

        <View style={styles.statsRow}>
          {comparisonMetrics.map(metric => (
            <View key={metric.key} style={styles.stat}>
              <Text numberOfLines={1} style={styles.statLabel}>
                {metric.label}
              </Text>
              <ProgressBar
                progress={universe.stats[metric.key]}
                height={4}
                showGlow={false}
                gradient={[
                  STAT_COLORS[metric.key] ?? colors.primary,
                  STAT_COLORS[metric.key] ?? colors.primary,
                ]}
                style={styles.statBar}
              />
            </View>
          ))}
        </View>

        <GlassCard
          style={styles.playerCard}
          gradient={gradients.card}
          padded>
          <View style={styles.playerHeader}>
            <Text style={styles.playerLabel}>NOW PLAYING</Text>
            <Text style={styles.playerStyle}>{universe.style}</Text>
          </View>
          <PlayerControls accent={gradients.aurora} />
        </GlassCard>

        <View style={styles.actions}>
          <GlowButton
            title="Edit Sound"
            variant="secondary"
            size="md"
            icon="edit"
            onPress={() =>
              navigation.navigate('DrawYourMood', {moodId: universe.mood})
            }
          />
          <GlowButton
            title="Parallel Universe"
            size="md"
            icon="layers"
            onPress={() =>
              navigation.navigate('CreateParallelUniverse', {
                universeId: universe.id,
              })
            }
          />
        </View>

        <Text style={styles.footnote}>
          Every version of this feeling becomes another world.
        </Text>
      </Animated.View>
    </ScreenContainer>
  );
}
