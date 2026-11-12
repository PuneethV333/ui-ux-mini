import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Svg, {
  Circle,
  Defs,
  RadialGradient,
  Stop,
} from 'react-native-svg';
import ScreenContainer from '../../components/layout/ScreenContainer';
import GlassCard from '../../components/common/GlassCard';
import Icon from '../../components/common/Icon';
import IconButton from '../../components/common/IconButton';
import ProgressBar from '../../components/common/ProgressBar';
import OrbitVisual from '../../components/player/OrbitVisual';
import {generatingSteps} from '../../data/mockData';
import {useApp} from '../../context/AppContext';
import type {RootScreenProps} from '../../navigation/types';
import {colors, gradients} from '../../theme';
import {styles} from './styles';

type Props = RootScreenProps<'GeneratingUniverse'>;

const PROGRESS_DURATION = 3200;
const NAVIGATE_DELAY = 3450;

const orbitNodes = [
  {id: 'gen-melody', angle: -90, color: colors.secondary},
  {id: 'gen-bass', angle: -18, color: colors.primaryBright},
  {id: 'gen-beat', angle: 162, color: colors.gold},
  {id: 'gen-instrument', angle: 126, color: colors.cyan},
  {id: 'gen-atmosphere', angle: 54, color: colors.magenta},
];

export default function GeneratingUniverse({navigation}: Props) {
  const {width, height} = useWindowDimensions();
  const {draft, createUniverseFromDraft} = useApp();
  const orbitSize = Math.min(width - 90, height * 0.32, 286);

  const [progressValue, setProgressValue] = useState(0);

  const progress = useRef(new Animated.Value(0)).current;
  const spin = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;
  const glow = useRef(new Animated.Value(0)).current;
  const entrance = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const createRef = useRef(createUniverseFromDraft);
  const draftRef = useRef(draft);
  createRef.current = createUniverseFromDraft;
  draftRef.current = draft;

  useEffect(() => {
    const listener = progress.addListener(({value}) => {
      setProgressValue(value);
    });

    const intro = Animated.parallel([
      Animated.timing(entrance, {
        toValue: 1,
        duration: 520,
        useNativeDriver: true,
      }),
      Animated.timing(progress, {
        toValue: 1,
        duration: PROGRESS_DURATION,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: false,
      }),
    ]);
    intro.start();

    const spinLoop = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 16000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    spinLoop.start();

    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1700,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    );
    pulseLoop.start();

    const glowLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(glow, {
          toValue: 1,
          duration: 2400,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(glow, {
          toValue: 0,
          duration: 2400,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );
    glowLoop.start();

    timerRef.current = setTimeout(() => {
      const created = createRef.current({
        name: draftRef.current.name,
        style: draftRef.current.style,
        mode: 'parallel',
      });
      navigation.replace('MusicalUniverse', {universeId: created.id});
    }, NAVIGATE_DELAY);

    return () => {
      intro.stop();
      progress.removeListener(listener);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      spinLoop.stop();
      pulseLoop.stop();
      glowLoop.stop();
    };
  }, [entrance, glow, navigation, progress, pulse, spin]);

  const glowScale = glow.interpolate({
    inputRange: [0, 1],
    outputRange: [0.95, 1.08],
  });
  const glowOpacity = glow.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 0.78],
  });
  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const pulseScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.45],
  });
  const pulseOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.65, 0],
  });

  return (
    <ScreenContainer
      scroll={false}
      edges={['top', 'left', 'right', 'bottom']}
      contentContainerStyle={styles.content}>
      <View style={styles.cancelRow}>
        <IconButton
          name="close"
          size={36}
          color={colors.textDim}
          background="transparent"
          borderColor="transparent"
          onPress={() => navigation.goBack()}
          accessibilityLabel="Cancel generation"
        />
      </View>

      <Animated.View
        style={[
          styles.center,
          {
            opacity: entrance,
            transform: [
              {
                translateY: entrance.interpolate({
                  inputRange: [0, 1],
                  outputRange: [18, 0],
                }),
              },
            ],
          },
        ]}>
        <View
          style={[
            styles.orbitStage,
            {width: orbitSize, height: orbitSize},
          ]}>
          <Animated.View
            style={[
              styles.orbitGlow,
              {
                width: orbitSize,
                height: orbitSize,
                borderRadius: orbitSize / 2,
                opacity: glowOpacity,
                transform: [{scale: glowScale}],
              },
            ]}>
            <Svg width="100%" height="100%">
              <Defs>
                <RadialGradient
                  id="generating-glow"
                  cx="50%"
                  cy="50%"
                  r="50%">
                  <Stop
                    offset="0"
                    stopColor={colors.gold}
                    stopOpacity="0.34"
                  />
                  <Stop
                    offset="0.4"
                    stopColor={colors.secondary}
                    stopOpacity="0.28"
                  />
                  <Stop
                    offset="1"
                    stopColor={colors.primaryDeep}
                    stopOpacity="0"
                  />
                </RadialGradient>
              </Defs>
              <Circle
                cx="50%"
                cy="50%"
                r="50%"
                fill="url(#generating-glow)"
              />
            </Svg>
          </Animated.View>
          <Animated.View
            style={[
              styles.spinRing,
              {
                width: orbitSize * 0.94,
                height: orbitSize * 0.94,
                borderRadius: (orbitSize * 0.94) / 2,
                top: orbitSize * 0.03,
                left: orbitSize * 0.03,
                transform: [{rotate}],
              },
            ]}>
            <View style={styles.spinDot} />
          </Animated.View>
          <OrbitVisual
            size={orbitSize}
            nodes={orbitNodes}
            coreLabel="Core"
            showLabels={false}
          />
          <Animated.View
            style={[
              styles.corePulse,
              {
                width: orbitSize * 0.26,
                height: orbitSize * 0.26,
                borderRadius: (orbitSize * 0.26) / 2,
                top: (orbitSize - orbitSize * 0.26) / 2,
                left: (orbitSize - orbitSize * 0.26) / 2,
                opacity: pulseOpacity,
                transform: [{scale: pulseScale}],
              },
            ]}
          />
        </View>

        <Text accessibilityRole="header" style={styles.title}>
          Creating your Universe
        </Text>
        <Text style={styles.subtitle}>
          Turning your expression into sound…
        </Text>

        <GlassCard style={styles.checklist} padded>
          {generatingSteps.map((step, index) => {
            const done = index < 2;
            const active = index === 2;
            return (
              <View key={step} style={styles.stepItem}>
                {done ? (
                  <LinearGradient
                    colors={[...gradients.gold]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={styles.stepIcon}>
                    <Icon
                      name="check"
                      size={12}
                      color={colors.textInverse}
                      strokeWidth={3}
                    />
                  </LinearGradient>
                ) : (
                  <View style={[styles.stepIcon, styles.stepIconPending]}>
                    <ActivityIndicator
                      size="small"
                      color={colors.secondary}
                    />
                  </View>
                )}
                <Text
                  style={[
                    styles.stepLabel,
                    done && styles.stepLabelDone,
                    active && styles.stepLabelActive,
                  ]}>
                  {step}
                </Text>
                {active ? (
                  <Text style={styles.stepHint}>IN PROGRESS</Text>
                ) : null}
              </View>
            );
          })}
        </GlassCard>

        <View style={styles.progressBlock}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>SOUND SYNTHESIS</Text>
            <Text style={styles.progressValue}>
              {Math.round(progressValue * 100)}%
            </Text>
          </View>
          <ProgressBar
            progress={progressValue}
            height={7}
            gradient={gradients.aurora}
          />
        </View>

        <Text style={styles.footnote}>
          Generated on your device. No cloud, just you.
        </Text>
      </Animated.View>
    </ScreenContainer>
  );
}
