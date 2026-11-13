import React, {useMemo, useState} from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';
import Icon from '../../components/common/Icon';
import IconButton from '../../components/common/IconButton';
import SectionHeader from '../../components/common/SectionHeader';
import ScreenContainer from '../../components/layout/ScreenContainer';
import {useApp} from '../../context/AppContext';
import {usePlayer} from '../../context/PlayerContext';
import {useExitPrompt} from '../../hooks/useExitPrompt';
import {discoverItems} from '../../data/mockData';
import type {DiscoverItem, Universe} from '../../data/types';
import {colors, gradients, spacing} from '../../theme';
import DiscoverRow from './DiscoverRow';
import HeroCreateCard from './HeroCreateCard';
import Reveal from './Reveal';
import UniverseCard from './UniverseCard';
import {styles} from './styles';

function greetingForHour(hour: number) {
  if (hour < 12) {
    return 'good morning';
  }
  if (hour < 18) {
    return 'good afternoon';
  }
  return 'good evening';
}

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const initials = parts
    .slice(0, 2)
    .map(part => part.charAt(0).toUpperCase())
    .join('');
  return initials || 'SV';
}

/** Discover is a curated feed, so we build a playable Universe from a row. */
function universeFromDiscover(item: DiscoverItem): Universe {
  return {
    id: item.id,
    name: item.title,
    mood: item.mood,
    style: item.style,
    duration: item.duration,
    createdAt: 'Discover',
    description: `A ${item.style.toLowerCase()} transmission from ${item.creator}, drifting in from the wider Sonicverse.`,
    gradient: item.gradient,
    stats: {melody: 0.62, rhythm: 0.58, energy: 0.54, atmosphere: 0.72},
    isFavorite: false,
  };
}

export default function Home() {
  const navigation = useNavigation<any>();
  const {width} = useWindowDimensions();
  const {user, universes, selectUniverse} = useApp();
  const {play, toggle, isCurrent, isPlaying} = usePlayer();
  useExitPrompt();
  const [hasUnread, setHasUnread] = useState(true);

  const greeting = useMemo(() => greetingForHour(new Date().getHours()), []);
  const initials = useMemo(() => initialsOf(user.name), [user.name]);
  const cardWidth = Math.min(250, Math.max(220, Math.round(width * 0.64)));
  const snapOffsets = universes.map(
    (_, index) => index * (cardWidth + spacing.md),
  );

  const openUniverse = (universe: Universe) => {
    selectUniverse(universe.id);
    navigation.navigate('MusicalUniverse', {universeId: universe.id});
  };

  const openDiscoverItem = (item: DiscoverItem) => {
    if (isCurrent(item.id) && isPlaying) {
      toggle();
      return;
    }
    play(universeFromDiscover(item));
  };

  return (
    <ScreenContainer withTabBar contentContainerStyle={styles.content}>
      <Reveal delay={0}>
        <View style={styles.headerRow}>
          <View style={styles.greetingBlock}>
            <View style={styles.greetingLine}>
              <View style={styles.liveDot} />
              <Text style={styles.greeting} numberOfLines={1}>
                {greeting},
              </Text>
            </View>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={styles.userName}>
              {user.name}
            </Text>
          </View>

          <View style={styles.headerActions}>
            <View>
              <IconButton
                name="settings"
                size={40}
                iconSize={18}
                onPress={() => setHasUnread(false)}
                accessibilityLabel={
                  hasUnread
                    ? 'Notifications, 3 unread'
                    : 'Notifications, all read'
                }
              />
              {hasUnread ? (
                <View style={styles.badge} pointerEvents="none">
                  <Text style={styles.badgeText}>3</Text>
                </View>
              ) : null}
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Open ${user.name}'s profile`}
              onPress={() => navigation.navigate('ProfileTab')}
              style={({pressed}) => [
                styles.avatarPress,
                pressed && styles.avatarPressed,
              ]}>
              <LinearGradient
                colors={[...gradients.aurora]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.avatarRing}>
                <View style={styles.avatarInner}>
                  <Text style={styles.avatarText}>{initials}</Text>
                </View>
              </LinearGradient>
              <View style={styles.avatarStatus} pointerEvents="none" />
            </Pressable>
          </View>
        </View>
      </Reveal>

      <Reveal delay={70} style={styles.headlineWrap}>
        <Text style={styles.headline}>
          What are you{'\n'}feeling{' '}
          <Text style={styles.headlineAccent}>today?</Text>
        </Text>
        <View style={styles.rule}>
          <LinearGradient
            colors={[...gradients.primaryButton]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.ruleFill}
          />
        </View>
      </Reveal>

      <Reveal delay={140} style={styles.heroWrap}>
        <HeroCreateCard onPress={() => navigation.navigate('MoodSelection')} />
      </Reveal>

      <Reveal delay={240} style={styles.section}>
        <SectionHeader
          title="Your universe"
          actionLabel="See all"
          onAction={() => navigation.navigate('LibraryTab')}
        />
        {universes.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            snapToOffsets={snapOffsets}
            contentContainerStyle={styles.hContent}
            style={styles.hScroll}>
            {universes.map(universe => (
              <UniverseCard
                key={universe.id}
                universe={universe}
                width={cardWidth}
                active={isPlaying && isCurrent(universe.id)}
                onPress={() => openUniverse(universe)}
                onPlay={() => play(universe)}
              />
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.emptyText}>
            Your first universe is waiting to be created.
          </Text>
        )}
      </Reveal>

      <Reveal delay={330} style={styles.section}>
        <SectionHeader title="Discover" />
        <View style={styles.discoverList}>
          {discoverItems.map(item => (
            <DiscoverRow
              key={item.id}
              item={item}
              active={isPlaying && isCurrent(item.id)}
              onPress={() => openDiscoverItem(item)}
            />
          ))}
        </View>
      </Reveal>

      <Reveal delay={420}>
        <View style={styles.footer}>
          <Icon name="lock" size={11} color={colors.textDim} />
          <Text style={styles.footerText}>
            Sound generated on-device · fully offline
          </Text>
        </View>
      </Reveal>
    </ScreenContainer>
  );
}
