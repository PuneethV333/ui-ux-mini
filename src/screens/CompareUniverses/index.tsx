import React, {useEffect, useMemo, useRef} from 'react';
import {
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import type {RootScreenProps} from '../../navigation/types';
import type {Universe} from '../../data/types';
import {useApp} from '../../context/AppContext';
import {usePlayer} from '../../context/PlayerContext';
import {comparisonMetrics, getMood, getUniverse} from '../../data/mockData';
import ScreenContainer from '../../components/layout/ScreenContainer';
import CosmicHeader from '../../components/layout/CosmicHeader';
import OrbitVisual from '../../components/player/OrbitVisual';
import GlassCard from '../../components/common/GlassCard';
import GlowButton from '../../components/common/GlowButton';
import ProgressBar from '../../components/common/ProgressBar';
import Icon, {type IconName} from '../../components/common/Icon';
import {colors, gradients, spacing} from '../../theme';
import {styles} from './styles';

const METRIC_ICONS: Record<string, IconName> = {
  melody: 'music',
  rhythm: 'pulse',
  energy: 'waveform',
  atmosphere: 'sparkles',
};

const ORBIT_NODES_ORIGINAL = [
  {id: 'one', color: colors.gold, angle: -130},
  {id: 'two', color: colors.primaryBright, angle: -28},
  {id: 'three', color: colors.cyan, angle: 118},
  {id: 'four', color: colors.secondary, angle: 64},
];

const ORBIT_NODES_PARALLEL = [
  {id: 'one', color: colors.pink, angle: -130},
  {id: 'two', color: colors.gold, angle: -28},
  {id: 'three', color: colors.cyan, angle: 118},
  {id: 'four', color: colors.primaryBright, angle: 64},
];

const displayMood = (universe: Universe) =>
  universe.displayMood ??
  (universe.id === 'universe-ii' || universe.name === 'Universe II'
    ? 'Dark'
    : getMood(universe.mood).label);

type MetricCardProps = {
  metric: (typeof comparisonMetrics)[number];
  left: Universe;
  right: Universe;
  anim: Animated.Value;
};

function MetricCard({metric, left, right, anim}: MetricCardProps) {
  const original = left.stats[metric.key];
  const parallel = right.stats[metric.key];
  return (
    <Animated.View
      style={{
        opacity: anim,
        transform: [
          {
            translateY: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [16, 0],
            }),
          },
        ],
      }}>
      <GlassCard style={styles.metricCard} padded>
        <View style={styles.metricHead}>
          <View style={styles.metricIcon}>
            <Icon
              name={METRIC_ICONS[metric.key]}
              size={14}
              color={colors.primaryBright}
              strokeWidth={1.9}
            />
          </View>
          <Text style={styles.metricTitle}>{metric.label}</Text>
        </View>

        <View style={styles.metricRow}>
          <Text style={styles.metricRowLabel}>Original</Text>
          <View style={styles.metricTrack}>
            <ProgressBar
              progress={original}
              height={7}
              gradient={gradients.violet}
              showGlow={false}
              trackColor="transparent"
            />
          </View>
          <Text style={styles.metricValue}>{Math.round(original * 100)}</Text>
        </View>

        <View style={styles.metricRow}>
          <Text style={[styles.metricRowLabel, styles.metricRowLabelParallel]}>
            Parallel
          </Text>
          <View style={styles.metricTrack}>
            <ProgressBar
              progress={parallel}
              height={7}
              gradient={gradients.primaryButton}
              showGlow={false}
              trackColor="transparent"
            />
          </View>
          <Text style={styles.metricValue}>{Math.round(parallel * 100)}</Text>
        </View>
      </GlassCard>
    </Animated.View>
  );
}

export default function CompareUniverses({
  navigation,
  route,
}: RootScreenProps<'CompareUniverses'>) {
  const {universes} = useApp();
  const {play} = usePlayer();
  const {width} = useWindowDimensions();

  const left = useMemo(() => {
    const id = route.params?.leftId ?? 'universe-original';
    return universes.find(item => item.id === id) ?? getUniverse(id);
  }, [route.params?.leftId, universes]);

  const right = useMemo(() => {
    const id = route.params?.rightId ?? 'universe-ii';
    return universes.find(item => item.id === id) ?? getUniverse(id);
  }, [route.params?.rightId, universes]);

  const cardWidth = (width - spacing.screen * 2 - spacing.md) / 2;
  const orbitSize = Math.min(cardWidth - 38, 100);

  const intro = useRef(new Animated.Value(0)).current;
  const metricAnims = useRef(
    comparisonMetrics.map(() => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    Animated.timing(intro, {
      toValue: 1,
      duration: 480,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    const sequence = Animated.sequence([
      Animated.delay(120),
      Animated.stagger(
        80,
        metricAnims.map(value =>
          Animated.timing(value, {
            toValue: 1,
            duration: 420,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ),
      ),
    ]);
    sequence.start();
    return () => sequence.stop();
  }, [intro, metricAnims]);

  const introStyle = {
    opacity: intro,
    transform: [
      {translateY: intro.interpolate({inputRange: [0, 1], outputRange: [16, 0]})},
    ],
  };

  return (
    <ScreenContainer
      scroll={false}
      padded={false}
      edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.header}>
        <CosmicHeader
          eyebrow="SIDE BY SIDE"
          title="Compare Universes"
          onBack={() => navigation.goBack()}
        />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <Animated.View style={[styles.summaryRow, introStyle]}>
          <GlassCard style={styles.summaryCard} padded={false}>
            <View style={styles.summaryInner}>
              <View>
                <View style={styles.orbitWrap}>
                  <View style={styles.orbitGlow} pointerEvents="none" />
                  <OrbitVisual
                    size={orbitSize}
                    nodes={ORBIT_NODES_ORIGINAL}
                    coreLabel=""
                    showLabels={false}
                  />
                </View>
                <Text
                  style={[
                    styles.summaryEyebrow,
                    left.isOriginal && styles.summaryEyebrowOriginal,
                  ]}>
                  {left.isOriginal ? 'ORIGINAL' : left.name.toUpperCase()}
                </Text>
                <Text
                  style={styles.summaryName}
                  numberOfLines={1}
                  adjustsFontSizeToFit>
                  {left.name}
                </Text>
                <Text
                  style={styles.summaryMeta}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.8}>
                  {displayMood(left)} • {left.style}
                </Text>
              </View>
              <GlowButton
                title="PLAY"
                uppercase
                size="sm"
                variant="secondary"
                icon="play"
                onPress={() => play(left)}
                style={styles.summaryPlay}
              />
            </View>
          </GlassCard>

          <GlassCard
            style={[styles.summaryCard, styles.summaryCardParallel]}
            padded={false}
            gradient={['rgba(45,18,55,0.92)', 'rgba(16,10,34,0.94)']}>
            <View style={styles.summaryInner}>
              <View>
                <View style={styles.orbitWrap}>
                  <View style={styles.orbitGlow} pointerEvents="none" />
                  <OrbitVisual
                    size={orbitSize}
                    nodes={ORBIT_NODES_PARALLEL}
                    coreLabel=""
                    showLabels={false}
                  />
                </View>
                <Text style={styles.summaryEyebrow}>PARALLEL</Text>
                <Text
                  style={styles.summaryName}
                  numberOfLines={1}
                  adjustsFontSizeToFit>
                  {right.name}
                </Text>
                <Text
                  style={styles.summaryMeta}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.8}>
                  {displayMood(right)} • {right.style}
                </Text>
              </View>
              <GlowButton
                title="PLAY"
                uppercase
                size="sm"
                variant="secondary"
                icon="play"
                onPress={() => play(right)}
                style={styles.summaryPlay}
              />
            </View>
          </GlassCard>
        </Animated.View>

        <View style={styles.signatureHead}>
          <Text style={styles.signatureLabel}>SONIC SIGNATURE</Text>
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendDot, styles.legendDotOriginal]}
              />
              <Text style={styles.legendText}>Original</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendDot, styles.legendDotParallel]}
              />
              <Text style={styles.legendText}>Parallel</Text>
            </View>
          </View>
        </View>

        {comparisonMetrics.map((metric, index) => (
          <MetricCard
            key={metric.key}
            metric={metric}
            left={left}
            right={right}
            anim={metricAnims[index]}
          />
        ))}
      </ScrollView>

      <View style={styles.footer} pointerEvents="box-none">
        <LinearGradient
          pointerEvents="none"
          colors={[
            'rgba(5,3,15,0)',
            'rgba(5,3,15,0.86)',
            colors.background,
          ]}
          locations={[0, 0.4, 1]}
          style={StyleSheet.absoluteFill}
        />
        <GlowButton
          title="REMIX THESE"
          uppercase
          icon="sparkles"
          onPress={() => navigation.navigate('RemixMerge')}
          style={styles.footerButton}
        />
        <Text style={styles.footerHint}>BLEND THE BEST OF BOTH WORLDS</Text>
      </View>
    </ScreenContainer>
  );
}
