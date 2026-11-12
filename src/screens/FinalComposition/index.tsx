import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import CosmicHeader from '../../components/layout/CosmicHeader';
import ScreenContainer from '../../components/layout/ScreenContainer';
import GlassCard from '../../components/common/GlassCard';
import GlowButton from '../../components/common/GlowButton';
import Icon from '../../components/common/Icon';
import type {IconName} from '../../components/common/Icon';
import PlayerControls from '../../components/player/PlayerControls';
import type {OrbitNode} from '../../components/player/OrbitVisual';
import {useApp} from '../../context/AppContext';
import {usePlayer} from '../../context/PlayerContext';
import {getMood} from '../../data/mockData';
import type {RootScreenProps} from '../../navigation/types';
import {colors, gradients} from '../../theme';
import {formatDuration} from '../../utils/format';
import CompositionStage from './CompositionStage';
import {styles} from './styles';

const COMPOSITION_NODES: OrbitNode[] = [
  {id: 'melody', label: 'Melody', color: colors.secondary, angle: 306},
  {id: 'bass', label: 'Bass', color: colors.gold, angle: 18},
  {id: 'beat', label: 'Beat', color: colors.cyan, angle: 90},
  {id: 'atmosphere', label: 'Atmosphere', color: colors.primaryBright, angle: 162},
  {id: 'instrument', label: 'Instrument', color: colors.pink, angle: 234},
];

const COMPOSITION_LEGEND = [
  {id: 'melody', label: 'Melody', color: colors.secondary},
  {id: 'bass', label: 'Bass', color: colors.gold},
  {id: 'beat', label: 'Beat', color: colors.cyan},
  {id: 'atmosphere', label: 'Atmosphere', color: colors.primaryBright},
  {id: 'instrument', label: 'Instrument', color: colors.pink},
  {id: 'core', label: 'Core', color: colors.gold},
];

function MetaChip({icon, label}: {icon: IconName; label: string}) {
  return (
    <View style={styles.metaChip}>
      <Icon name={icon} size={13} color={colors.textMuted} strokeWidth={1.8} />
      <Text style={styles.metaLabel}>{label}</Text>
    </View>
  );
}

type ActionProps = {
  icon: IconName;
  label: string;
  accessibilityLabel: string;
  active?: boolean;
  onPress: () => void;
};

function ActionButton({
  icon,
  label,
  accessibilityLabel,
  active,
  onPress,
}: ActionProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{selected: Boolean(active)}}
      onPress={onPress}
      style={({pressed}) => [styles.action, pressed && {opacity: 0.7}]}>
      <View style={[styles.actionIcon, active && styles.actionIconActive]}>
        <Icon
          name={icon}
          size={20}
          color={active ? colors.secondary : colors.textMuted}
          strokeWidth={1.8}
        />
      </View>
      <Text
        style={[styles.actionLabel, active && styles.actionLabelActive]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.8}>
        {label}
      </Text>
    </Pressable>
  );
}

export default function FinalComposition({
  navigation,
}: RootScreenProps<'FinalComposition'>) {
  const {width} = useWindowDimensions();
  const {draft, createUniverseFromDraft, toggleFavorite} = useApp();
  const {current, isPlaying} = usePlayer();

  const [favorite, setFavorite] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const entrance = useRef(new Animated.Value(0)).current;
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savingRef = useRef(false);

  const mood = getMood(draft.mood);
  const orbitSize = Math.round(Math.max(224, Math.min(width - 112, 300)));

  useEffect(() => {
    const animation = Animated.timing(entrance, {
      toValue: 1,
      duration: 480,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });
    animation.start();
    return () => {
      animation.stop();
      if (feedbackTimer.current) {
        clearTimeout(feedbackTimer.current);
      }
    };
  }, [entrance]);

  const notify = (message: string) => {
    setFeedback(message);
    if (feedbackTimer.current) {
      clearTimeout(feedbackTimer.current);
    }
    feedbackTimer.current = setTimeout(() => setFeedback(null), 2400);
  };

  const handleFavourite = () => {
    const next = !favorite;
    setFavorite(next);
    notify(next ? 'Added to favourites' : 'Removed from favourites');
  };

  const handleShare = () => {
    notify('Share link ready · offline');
  };

  const handleExport = () => {
    notify('Audio export ready · offline');
  };

  const handleSave = () => {
    if (savingRef.current) {
      return;
    }
    savingRef.current = true;
    const created = createUniverseFromDraft({
      name: 'My Sonicverse',
      style: 'Electronic',
      gradient: 'violet',
      mode: 'remix',
    });
    if (favorite) {
      toggleFavorite(created.id);
    }
    navigation.navigate('MainTabs', {screen: 'LibraryTab'});
  };

  const entranceStyle = {
    opacity: entrance,
    transform: [
      {
        translateY: entrance.interpolate({
          inputRange: [0, 1],
          outputRange: [18, 0],
        }),
      },
    ],
  };

  return (
    <ScreenContainer>
      <CosmicHeader
        title="New Universe"
        eyebrow="FINAL COMPOSITION"
        onBack={() => navigation.goBack()}
        compact
      />

      <Animated.View style={entranceStyle}>
        <GlassCard style={styles.stage} padded={false} glow>
          <View style={styles.stageInner}>
            <View style={styles.stageHeader}>
              <Text style={styles.stageEyebrow}>COMPOSITION</Text>
              <View style={styles.liveBadge}>
                <View
                  style={[styles.liveDot, isPlaying && styles.liveDotActive]}
                />
                <Text style={styles.liveText}>
                  {isPlaying ? 'LIVE' : 'READY'}
                </Text>
              </View>
            </View>

            <CompositionStage
              size={orbitSize}
              nodes={COMPOSITION_NODES}
              coreLabel="Core"
            />

            <View style={styles.legend}>
              {COMPOSITION_LEGEND.map(item => (
                <View key={item.id} style={styles.legendItem}>
                  <View
                    style={[styles.legendDot, {backgroundColor: item.color}]}
                  />
                  <Text style={styles.legendText} numberOfLines={1}>
                    {item.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </GlassCard>

        <View style={styles.titleBlock}>
          <Text style={styles.compositionTitle} accessibilityRole="header">
            My Sonicverse
          </Text>
          <Text style={styles.compositionSubtitle}>Your blended universe</Text>
          <View style={styles.metaRow}>
            <MetaChip icon="disc" label={formatDuration(current.duration)} />
            <MetaChip icon="sparkles" label={mood.label} />
            <MetaChip icon="layers" label="6 layers" />
          </View>
        </View>

        <GlassCard style={styles.playerCard}>
          <View style={styles.playerHeader}>
            <View style={styles.playerLabelWrap}>
              <Icon
                name="waveform"
                size={14}
                color={colors.secondary}
                strokeWidth={1.8}
              />
              <Text style={styles.playerLabel}>PREVIEW BLEND</Text>
            </View>
            <Text style={styles.playerStatus}>
              {isPlaying ? 'PLAYING' : 'PAUSED'}
            </Text>
          </View>
          <PlayerControls compact showSlider accent={gradients.aurora} />
        </GlassCard>

        <View style={styles.saveWrap}>
          <GlowButton
            title="SAVE UNIVERSE"
            size="lg"
            iconRight="arrow-right"
            uppercase
            onPress={handleSave}
          />

          <View style={styles.actionRow}>
            <ActionButton
              icon="heart"
              label="Favourite"
              active={favorite}
              accessibilityLabel={
                favorite ? 'Remove from favourites' : 'Add to favourites'
              }
              onPress={handleFavourite}
            />
            <ActionButton
              icon="share"
              label="Share"
              accessibilityLabel="Share universe"
              onPress={handleShare}
            />
            <ActionButton
              icon="download"
              label="Export Audio"
              accessibilityLabel="Export audio"
              onPress={handleExport}
            />
          </View>

          <View style={styles.feedbackSlot}>
            {feedback ? (
              <View style={styles.feedbackPill}>
                <Icon
                  name="check"
                  size={12}
                  color={colors.success}
                  strokeWidth={2}
                />
                <Text
                  style={styles.feedbackText}
                  accessibilityLiveRegion="polite">
                  {feedback}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </Animated.View>
    </ScreenContainer>
  );
}
