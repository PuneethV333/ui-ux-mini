import React, {useMemo, useState} from 'react';
import {ScrollView, Text, useWindowDimensions, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ScreenContainer from '../../components/layout/ScreenContainer';
import Chip from '../../components/common/Chip';
import IconButton from '../../components/common/IconButton';
import {useApp} from '../../context/AppContext';
import {usePlayer} from '../../context/PlayerContext';
import {getMood, libraryFilters} from '../../data/mockData';
import type {RootStackParamList} from '../../navigation/types';
import {layout, spacing} from '../../theme';
import CreateUniverseCard from './CreateUniverseCard';
import EmptyState from './EmptyState';
import LibraryCard from './LibraryCard';
import SearchBar from './SearchBar';
import SortButton from './SortButton';
import type {SortMode} from './SortButton';
import {styles} from './styles';

const SORT_LABEL: Record<SortMode, string> = {
  newest: 'Newest first',
  az: 'A–Z order',
};

export default function Library() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {width} = useWindowDimensions();
  const {universes, selectUniverse, toggleFavorite} = useApp();
  const {play} = usePlayer();

  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortMode, setSortMode] = useState<SortMode>('newest');

  const contentWidth = width - layout.screenPadding * 2;
  const cardWidth = Math.min(220, Math.floor((contentWidth - spacing.md) / 2));

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    const list = universes.filter(universe => {
      const matchesMood =
        activeFilter === 'All' ||
        universe.mood === activeFilter.toLowerCase();
      if (!matchesMood) {
        return false;
      }
      if (!query) {
        return true;
      }
      const haystack = `${universe.name} ${universe.style} ${
        getMood(universe.mood).label
      }`.toLowerCase();
      return haystack.includes(query);
    });

    if (sortMode === 'az') {
      return [...list].sort((a, b) =>
        a.name.localeCompare(b.name, undefined, {sensitivity: 'base'}),
      );
    }
    return list;
  }, [activeFilter, search, sortMode, universes]);

  const hasFilters = activeFilter !== 'All' || search.trim().length > 0;
  const total = universes.length;
  const subtitle = `${total} ${
    total === 1 ? 'universe' : 'universes'
  } in your orbit`;
  const countLabel = hasFilters
    ? `${filtered.length} ${filtered.length === 1 ? 'match' : 'matches'}`
    : `${total} ${total === 1 ? 'universe' : 'universes'}`;

  const clearFilters = () => {
    setSearch('');
    setActiveFilter('All');
  };

  const openUniverse = (id: string) => {
    selectUniverse(id);
    navigation.navigate('MusicalUniverse', {universeId: id});
  };

  return (
    <ScreenContainer withTabBar>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.eyebrow}>Your collection</Text>
          <View style={styles.headerTools}>
            <IconButton
              name="compass"
              size={34}
              iconSize={16}
              onPress={() => navigation.navigate('SonicverseMap')}
              accessibilityLabel="Open Sonicverse map"
            />
            <SortButton
              mode={sortMode}
              onPress={() =>
                setSortMode(prev => (prev === 'newest' ? 'az' : 'newest'))
              }
            />
          </View>
        </View>
        <Text
          style={styles.title}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.8}>
          My Universes
        </Text>
        <View style={styles.subtitleRow}>
          <View style={styles.subtitleDot} />
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>

      <SearchBar
        value={search}
        onChangeText={setSearch}
        onClear={() => setSearch('')}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={styles.chipScroll}
        contentContainerStyle={styles.chipContent}>
        {libraryFilters.map(filter => (
          <Chip
            key={filter}
            label={filter}
            size="sm"
            selected={activeFilter === filter}
            onPress={() => setActiveFilter(filter)}
          />
        ))}
      </ScrollView>

      <View style={styles.resultRow}>
        <Text style={styles.resultText}>{countLabel}</Text>
        <Text style={styles.resultSort}>{SORT_LABEL[sortMode]}</Text>
      </View>

      {filtered.length > 0 ? (
        <View style={styles.grid}>
          {filtered.map(universe => (
            <LibraryCard
              key={universe.id}
              universe={universe}
              width={cardWidth}
              onPress={() => openUniverse(universe.id)}
              onPlay={() => play(universe)}
              onToggleFavorite={() => toggleFavorite(universe.id)}
            />
          ))}
        </View>
      ) : (
        <EmptyState onClear={clearFilters} />
      )}

      <CreateUniverseCard
        onPress={() => navigation.navigate('MoodSelection')}
      />
    </ScreenContainer>
  );
}
