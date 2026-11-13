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
import {useApp} from '../../context/AppContext';
import {getMood, getUniverse} from '../../data/mockData';
import {formatDuration} from '../../utils/format';
import ScreenContainer from '../../components/layout/ScreenContainer';
import CosmicHeader from '../../components/layout/CosmicHeader';
import OrbitVisual from '../../components/player/OrbitVisual';
import GlowButton from '../../components/common/GlowButton';
import IconButton from '../../components/common/IconButton';
import {colors, spacing} from '../../theme';
import {styles} from './styles';

const ORBIT_NODES = [
  {id: 'melody', label: 'Melody', color: colors.gold, angle: -140},
  {id: 'bass', label: 'Bass', color: colors.primaryBright, angle: -40},
  {id: 'beat', label: 'Beat', color: colors.cyan, angle: 140},
  {id: 'atmosphere', label: 'Atmosphere', color: colors.secondary, angle: 40},
];

export default function ParallelUniverseResult({
  navigation,
  route,
}: RootScreenProps<'ParallelUniverseResult'>) {
  const {
    universes,
    upsertUniverse,
    toggleFavorite,
    selectUniverse,
  } = useApp();
  const {width} = useWindowDimensions();
  const orbitSize = Math.min(width - spacing.screen * 2, 338);

  const universe = useMemo(() => {
    const id = route.params?.universeId ?? 'universe-ii';
    return universes.find(item => item.id === id) ?? getUniverse(id);
  }, [route.params?.universeId, universes]);

  const original = useMemo(
    () => universes.find(item => item.isOriginal) ?? getUniverse(),
    [universes],
  );

  const isHeroParallel =
    universe.id === 'universe-ii' || universe.name === 'Universe II';
  const displayMood =
    universe.displayMood ??
    (isHeroParallel ? 'Dark' : getMood(universe.mood).label);
  const displayStyle = universe.style;
  const meta = `${displayMood} • ${displayStyle} • ${formatDuration(
    universe.duration,
  )}`;
  const basedOnName = `${getMood(original.mood).label} Universe`;

  const enter = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(enter, {
      toValue: 1,
      duration: 640,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [enter]);

  const artStyle = {
    opacity: enter,
    transform: [
      {translateY: enter.interpolate({inputRange: [0, 1], outputRange: [22, 0]})},
      {scale: enter.interpolate({inputRange: [0, 1], outputRange: [0.92, 1]})},
    ],
  };

  const handleSave = () => {
    upsertUniverse({...universe, isFavorite: universe.isFavorite});
    navigation.navigate('MainTabs', {screen: 'LibraryTab'});
  };

  return (
    <ScreenContainer
      scroll={false}
      padded={false}
      edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.header}>
        <CosmicHeader
          eyebrow="PARALLEL REALITY"
          title={universe.name.toUpperCase()}
          onBack={() => navigation.goBack()}
          right={
            <IconButton
              name="heart"
              size={42}
              onPress={() => toggleFavorite(universe.id)}
              color={universe.isFavorite ? colors.pink : colors.textMuted}
              background={
                universe.isFavorite
                  ? 'rgba(244,114,208,0.16)'
                  : colors.surfaceGlass
              }
              borderColor={
                universe.isFavorite
                  ? 'rgba(244,114,208,0.55)'
                  : colors.border
              }
              glow={universe.isFavorite}
              accessibilityLabel={
                universe.isFavorite
                  ? 'Remove universe from favourites'
                  : 'Add universe to favourites'
              }
            />
          }
        />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <Animated.View style={artStyle}>
          <View style={styles.artStage}>
            <View style={styles.auraOuter} pointerEvents="none" />
            <View style={styles.auraInner} pointerEvents="none" />
            <View style={styles.auraCore} pointerEvents="none" />
            <OrbitVisual
              size={orbitSize}
              nodes={ORBIT_NODES}
              coreLabel="CORE"
              activeNodeId="beat"
            />
          </View>
        </Animated.View>

        <View style={styles.metaWrap}>
          <Text style={styles.meta} numberOfLines={1} adjustsFontSizeToFit>
            {meta}
          </Text>
          <Text style={styles.basedOn}>
            Based on:{' '}
            <Text style={styles.basedOnAccent}>{basedOnName}</Text>
          </Text>
        </View>

        <View style={styles.playRow}>
          <GlowButton
            title="PLAY"
            uppercase
            variant="secondary"
            icon="play"
            fullWidth={false}
            onPress={() => {
              selectUniverse(universe.id);
              navigation.navigate('MusicalUniverse', {
                universeId: universe.id,
              });
            }}
            style={styles.playButton}
          />
        </View>

        <View style={styles.secondaryRow}>
          <GlowButton
            title="COMPARE"
            uppercase
            size="sm"
            variant="ghost"
            onPress={() =>
              navigation.navigate('CompareUniverses', {
                leftId: original.id,
                rightId: universe.id,
              })
            }
            style={styles.secondaryButton}
          />
          <GlowButton
            title="REMIX"
            uppercase
            size="sm"
            variant="ghost"
            onPress={() => navigation.navigate('RemixMerge')}
            style={styles.secondaryButton}
          />
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
          locations={[0, 0.4, 1]}
          style={StyleSheet.absoluteFill}
        />
        <GlowButton
          title="SAVE UNIVERSE"
          uppercase
          iconRight="arrow-right"
          onPress={handleSave}
          style={styles.footerButton}
        />
        <Text style={styles.footerCaption}>OFFLINE • ON THIS DEVICE</Text>
      </View>
    </ScreenContainer>
  );
}
