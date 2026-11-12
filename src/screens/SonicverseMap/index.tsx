import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {
  Circle,
  Defs,
  Ellipse,
  LinearGradient as SvgLinearGradient,
  Path,
  RadialGradient,
  Stop,
} from 'react-native-svg';
import type {RootScreenProps} from '../../navigation/types';
import {useApp} from '../../context/AppContext';
import {usePlayer} from '../../context/PlayerContext';
import {getUniverse, mapNodes} from '../../data/mockData';
import type {MapNode} from '../../data/types';
import ScreenContainer from '../../components/layout/ScreenContainer';
import CosmicHeader from '../../components/layout/CosmicHeader';
import GlassCard from '../../components/common/GlassCard';
import GlowButton from '../../components/common/GlowButton';
import Icon from '../../components/common/Icon';
import {colors, gradients, spacing} from '../../theme';
import {styles} from './styles';

const NODE_HEIGHT_MIN = 64;
const NODE_HEIGHT_MAX = 84;
const SUMMARY_HEIGHT = 118;
const NODE_WIDTH_RATIO = 0.42;

const NODE_ORB_COLORS: Record<string, readonly string[]> = {
  'node-original': [colors.goldBright, colors.gold, colors.orange],
  'node-ii': [colors.pink, colors.secondary, colors.primaryDeep],
  'node-iii': [colors.cyan, colors.blue, colors.primaryDeep],
  'node-iv': [colors.goldBright, colors.secondary, colors.primaryDeep],
};

type NodePosition = {x: number; y: number; left: number; top: number};

const sentenceCase = (value: string) =>
  value
    .split(' ')
    .map(word => {
      if (/^(I|II|III|IV|V)$/.test(word)) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');

export default function SonicverseMap({navigation}: RootScreenProps<'SonicverseMap'>) {
  const {universes, selectUniverse} = useApp();
  const {play} = usePlayer();
  const {width} = useWindowDimensions();

  const [selectedId, setSelectedId] = useState('node-ii');

  const panelWidth = Math.min(width - spacing.screen * 2, 520);
  const panelHeight = Math.round(panelWidth / 0.68);
  const nodeWidth = panelWidth * NODE_WIDTH_RATIO;
  const nodeHeight = Math.round(
    Math.min(NODE_HEIGHT_MAX, Math.max(NODE_HEIGHT_MIN, panelHeight * 0.15)),
  );
  const summaryTop = panelHeight - SUMMARY_HEIGHT - spacing.md;
  const nodeAreaHeight = summaryTop - spacing.xs;

  const positions = useMemo<Record<string, NodePosition>>(() => {
    const halfWidth = nodeWidth / 2;
    const halfHeight = nodeHeight / 2;
    const topLimit = spacing.xxl + halfHeight;
    const bottomLimit = nodeAreaHeight - spacing.md - halfHeight;
    const minX = halfWidth + 2;
    const maxX = panelWidth - halfWidth - 2;
    const yValues = mapNodes.map(node => node.y);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);

    const result: Record<string, NodePosition> = {};
    mapNodes.forEach(node => {
      const x = Math.min(maxX, Math.max(minX, node.x * panelWidth));
      const ratio = maxY === minY ? 0.5 : (node.y - minY) / (maxY - minY);
      const y = topLimit + ratio * (bottomLimit - topLimit);
      result[node.id] = {
        x,
        y,
        left: x - halfWidth,
        top: y - halfHeight,
      };
    });
    return result;
  }, [nodeAreaHeight, nodeHeight, nodeWidth, panelWidth]);

  const stars = useMemo(() => {
    return Array.from({length: 28}, (_, index) => ({
      x: Math.abs(Math.sin(index * 12.9898 + 3.1) * 43758.5) % 1,
      y: Math.abs(Math.sin(index * 78.233 + 1.7) * 43758.5) % 1,
      r: 0.6 + (index % 3) * 0.55,
      opacity: 0.18 + (index % 5) * 0.1,
    }));
  }, []);

  const selectedNode =
    mapNodes.find(node => node.id === selectedId) ?? mapNodes[1];
  const selectedPosition = positions[selectedNode.id];
  const selectedUniverse =
    universes.find(item => item.id === selectedNode.universeId) ??
    getUniverse(selectedNode.universeId);

  // Breathing glow around the selected universe.
  const halo = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(halo, {
          toValue: 1,
          duration: 1700,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(halo, {
          toValue: 0,
          duration: 1700,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [halo]);

  const haloOpacity = halo.interpolate({
    inputRange: [0, 1],
    outputRange: [0.32, 0.82],
  });

  const enter = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(enter, {
      toValue: 1,
      duration: 560,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [enter]);

  const panelAnim = {
    opacity: enter,
    transform: [
      {translateY: enter.interpolate({inputRange: [0, 1], outputRange: [18, 0]})},
    ],
  };

  const handleSelect = (node: MapNode) => {
    setSelectedId(node.id);
    selectUniverse(node.universeId);
  };

  const handleCompare = () => {
    const originalId = mapNodes[0].universeId;
    const rightId =
      selectedNode.universeId === originalId
        ? 'universe-ii'
        : selectedNode.universeId;
    navigation.navigate('CompareUniverses', {
      leftId: originalId,
      rightId,
    });
  };

  return (
    <ScreenContainer
      scroll={false}
      padded={false}
      edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.header}>
        <CosmicHeader
          title="Sonicverse Map"
          subtitle="Tap any universe node to explore it"
          onBack={() => navigation.goBack()}
        />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <Animated.View style={panelAnim}>
          <GlassCard
            padded={false}
            gradient={['rgba(24,14,48,0.97)', 'rgba(8,4,20,0.99)']}
            style={[styles.panel, {width: panelWidth, height: panelHeight}]}>
            <Text style={styles.mapEyebrow}>04 REALITIES</Text>

            <Svg
              width={panelWidth}
              height={panelHeight}
              style={StyleSheet.absoluteFill}
              pointerEvents="none">
              <Defs>
                <RadialGradient id="map-nebula" cx="50%" cy="50%" r="50%">
                  <Stop offset="0" stopColor={colors.primary} stopOpacity="0.34" />
                  <Stop
                    offset="0.6"
                    stopColor={colors.primaryDeep}
                    stopOpacity="0.12"
                  />
                  <Stop
                    offset="1"
                    stopColor={colors.background}
                    stopOpacity="0"
                  />
                </RadialGradient>
                <SvgLinearGradient id="map-ring" x1="0" y1="0" x2="1" y2="1">
                  <Stop
                    offset="0"
                    stopColor={colors.secondary}
                    stopOpacity="0.4"
                  />
                  <Stop
                    offset="0.55"
                    stopColor={colors.primary}
                    stopOpacity="0.26"
                  />
                  <Stop offset="1" stopColor={colors.cyan} stopOpacity="0.34" />
                </SvgLinearGradient>
              </Defs>

              <Circle
                cx={panelWidth / 2}
                cy={panelHeight * 0.42}
                r={panelWidth * 0.44}
                fill="url(#map-nebula)"
              />
              <Ellipse
                cx={panelWidth / 2}
                cy={panelHeight * 0.4}
                rx={panelWidth * 0.43}
                ry={panelWidth * 0.2}
                stroke="url(#map-ring)"
                strokeWidth="1"
                fill="none"
                strokeDasharray="2 9"
                transform={`rotate(-16 ${panelWidth / 2} ${panelHeight * 0.4})`}
              />
              <Ellipse
                cx={panelWidth / 2}
                cy={panelHeight * 0.4}
                rx={panelWidth * 0.3}
                ry={panelWidth * 0.14}
                stroke="url(#map-ring)"
                strokeWidth="0.8"
                fill="none"
                opacity="0.6"
                transform={`rotate(-16 ${panelWidth / 2} ${panelHeight * 0.4})`}
              />

              {mapNodes.map(node => {
                if (!node.parentId) {
                  return null;
                }
                const from = positions[node.parentId];
                const to = positions[node.id];
                if (!from || !to) {
                  return null;
                }
                const active =
                  node.id === selectedNode.id ||
                  node.parentId === selectedNode.id;
                const midY = (from.y + to.y) / 2;
                const path = `M ${from.x} ${from.y} C ${from.x} ${midY}, ${to.x} ${midY}, ${to.x} ${to.y}`;
                return (
                  <React.Fragment key={`edge-${node.id}`}>
                    {active ? (
                      <Path
                        d={path}
                        stroke={colors.secondary}
                        strokeOpacity={0.16}
                        strokeWidth={8}
                        fill="none"
                        strokeLinecap="round"
                      />
                    ) : null}
                    <Path
                      d={path}
                      stroke={
                        active
                          ? colors.secondary
                          : 'rgba(167,139,250,0.34)'
                      }
                      strokeWidth={active ? 1.8 : 1.2}
                      strokeDasharray={active ? undefined : '4 7'}
                      fill="none"
                      strokeLinecap="round"
                    />
                  </React.Fragment>
                );
              })}

              {stars.map((star, index) => (
                <Circle
                  key={`map-star-${index}`}
                  cx={star.x * panelWidth}
                  cy={star.y * panelHeight}
                  r={star.r}
                  fill={colors.text}
                  opacity={star.opacity}
                />
              ))}
            </Svg>

            <Animated.View
              pointerEvents="none"
              style={[
                styles.selectedHalo,
                {
                  left: selectedPosition.left - 6,
                  top: selectedPosition.top - 6,
                  width: nodeWidth + 12,
                  height: nodeHeight + 12,
                  opacity: haloOpacity,
                },
              ]}
            />

            {mapNodes.map(node => {
              const position = positions[node.id];
              const isSelected = node.id === selectedNode.id;
              const orbColors =
                NODE_ORB_COLORS[node.id] ?? gradients.violet;
              return (
                <GlassCard
                  key={node.id}
                  active={isSelected}
                  onPress={() => handleSelect(node)}
                  accessibilityLabel={`${node.label}, ${node.moodStyle}`}
                  padded={false}
                  gradient={
                    isSelected ? gradients.cardActive : gradients.card
                  }
                  style={[
                    styles.nodeCard,
                    {
                      left: position.left,
                      top: position.top,
                      width: nodeWidth,
                      height: nodeHeight,
                    },
                    isSelected && styles.nodeCardSelected,
                  ]}>
                  <View style={styles.nodeInner}>
                    <View
                      style={[
                        styles.nodeOrbRing,
                        isSelected && styles.nodeOrbRingSelected,
                      ]}>
                      <LinearGradient
                        colors={[...orbColors]}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 1}}
                        style={styles.nodeOrbCore}
                      />
                    </View>
                    <Text
                      style={styles.nodeLabel}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      maxFontSizeMultiplier={1.15}
                      minimumFontScale={0.82}>
                      {node.label}
                    </Text>
                    <Text
                      style={styles.nodeMood}
                      numberOfLines={1}
                      maxFontSizeMultiplier={1.15}>
                      {node.moodStyle}
                    </Text>
                    {isSelected ? (
                      <View style={styles.nodeCheck}>
                        <Icon
                          name="check"
                          size={10}
                          color={colors.textInverse}
                          strokeWidth={3}
                        />
                      </View>
                    ) : null}
                  </View>
                </GlassCard>
              );
            })}

            <View style={styles.summaryWrap}>
              <GlassCard
                padded={false}
                gradient={['rgba(21,12,40,0.98)', 'rgba(10,6,22,0.99)']}
                style={styles.summaryCard}>
                <View style={styles.summaryInner}>
                  <Text
                    style={styles.summaryText}
                    numberOfLines={2}
                    maxFontSizeMultiplier={1.2}>
                    Selected:{' '}
                    <Text style={{color: colors.secondary}}>
                      {sentenceCase(selectedNode.label)}
                    </Text>{' '}
                    ({selectedNode.moodStyle})
                  </Text>
                  <View style={styles.summaryButtons}>
                    <GlowButton
                      title="PLAY"
                      uppercase
                      size="sm"
                      variant="secondary"
                      onPress={() => play(selectedUniverse)}
                      style={styles.summaryButton}
                    />
                    <GlowButton
                      title="COMPARE"
                      uppercase
                      size="sm"
                      variant="ghost"
                      onPress={handleCompare}
                      style={styles.summaryButton}
                    />
                  </View>
                </View>
              </GlassCard>
            </View>
          </GlassCard>
        </Animated.View>

        <GlowButton
          title="NEW UNIVERSE"
          uppercase
          icon="plus"
          onPress={() => navigation.navigate('MoodSelection')}
          style={styles.cta}
        />
        <Text style={styles.footnote}>BRANCH • COMPARE • REMIX</Text>
      </ScrollView>
    </ScreenContainer>
  );
}
