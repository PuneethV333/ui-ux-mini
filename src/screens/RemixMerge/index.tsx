import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Animated, Easing, Text, View} from 'react-native';
import CosmicHeader from '../../components/layout/CosmicHeader';
import ScreenContainer from '../../components/layout/ScreenContainer';
import GlassCard from '../../components/common/GlassCard';
import GlowButton from '../../components/common/GlowButton';
import Icon from '../../components/common/Icon';
import {useApp} from '../../context/AppContext';
import {remixIngredients} from '../../data/mockData';
import type {RootScreenProps} from '../../navigation/types';
import {colors} from '../../theme';
import IngredientCard from './IngredientCard';
import Waveform from './Waveform';
import {styles} from './styles';

export default function RemixMerge({navigation}: RootScreenProps<'RemixMerge'>) {
  const {remixChoices, setRemixChoice} = useApp();
  const [previewing, setPreviewing] = useState(false);

  const entrance = useRef(new Animated.Value(0)).current;
  const cardEntrances = useRef(
    remixIngredients.map(() => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(entrance, {
        toValue: 1,
        duration: 420,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.stagger(
        70,
        cardEntrances.map(value =>
          Animated.spring(value, {
            toValue: 1,
            friction: 9,
            tension: 70,
            useNativeDriver: true,
          }),
        ),
      ),
    ]);
    animation.start();
    return () => animation.stop();
  }, [cardEntrances, entrance]);

  const parallelCount = remixIngredients.reduce(
    (count, ingredient) =>
      remixChoices[ingredient.id] === 'parallel' ? count + 1 : count,
    0,
  );
  const originalCount = remixIngredients.length - parallelCount;

  const originalLabel = remixIngredients[0].originalLabel;
  const parallelLabel = remixIngredients[0].parallelLabel;

  const summaryTitle = useMemo(() => {
    if (parallelCount === 0) {
      return 'Pure original layers';
    }
    if (parallelCount === remixIngredients.length) {
      return `Full ${parallelLabel} blend`;
    }
    return `${parallelCount} layer${parallelCount === 1 ? '' : 's'} from ${parallelLabel}`;
  }, [parallelCount, parallelLabel]);

  const entranceStyle = {
    opacity: entrance,
    transform: [
      {
        translateY: entrance.interpolate({
          inputRange: [0, 1],
          outputRange: [12, 0],
        }),
      },
    ],
  };

  return (
    <ScreenContainer>
      <CosmicHeader
        title="Universe Remix"
        onBack={() => navigation.goBack()}
        compact
      />

      <Animated.View style={[styles.hero, entranceStyle]}>
        <Text style={styles.eyebrow}>REMIX ENGINE</Text>
        <Text style={styles.headline} accessibilityRole="header">
          Build Your{'\n'}Perfect Universe
        </Text>
        <Text style={styles.helper}>
          Blend the layers you love from both realities into one new sound.
        </Text>
      </Animated.View>

      <Animated.View style={entranceStyle}>
        <GlassCard style={styles.summary} padded={false}>
          <View style={styles.summaryInner}>
            <View style={styles.summaryHeader}>
              <View style={styles.summaryTitleWrap}>
                <Text style={styles.summaryEyebrow}>MIX SUMMARY</Text>
                <Text style={styles.summaryTitle}>{summaryTitle}</Text>
              </View>
              <View style={styles.summaryIcon}>
                <Icon
                  name="waveform"
                  size={16}
                  color={colors.secondary}
                  strokeWidth={1.8}
                />
              </View>
            </View>

            <Waveform active={previewing} />

            <Text
              style={[
                styles.summaryNote,
                previewing && styles.summaryNoteActive,
              ]}
              accessibilityLiveRegion="polite">
              {previewing
                ? 'Previewing blend…'
                : `${originalLabel} × ${parallelLabel} · ${originalCount} original / ${parallelCount} parallel`}
            </Text>
          </View>
        </GlassCard>
      </Animated.View>

      <View style={styles.grid}>
        <View style={styles.gridRow}>
          <IngredientCard
            ingredient={remixIngredients[0]}
            choice={remixChoices[remixIngredients[0].id] ?? 'original'}
            onSelect={choice => setRemixChoice(remixIngredients[0].id, choice)}
            entrance={cardEntrances[0]}
          />
          <IngredientCard
            ingredient={remixIngredients[1]}
            choice={remixChoices[remixIngredients[1].id] ?? 'original'}
            onSelect={choice => setRemixChoice(remixIngredients[1].id, choice)}
            entrance={cardEntrances[1]}
          />
        </View>
        <View style={styles.gridRow}>
          <IngredientCard
            ingredient={remixIngredients[2]}
            choice={remixChoices[remixIngredients[2].id] ?? 'original'}
            onSelect={choice => setRemixChoice(remixIngredients[2].id, choice)}
            entrance={cardEntrances[2]}
          />
          <IngredientCard
            ingredient={remixIngredients[3]}
            choice={remixChoices[remixIngredients[3].id] ?? 'original'}
            onSelect={choice => setRemixChoice(remixIngredients[3].id, choice)}
            entrance={cardEntrances[3]}
          />
        </View>
      </View>

      <View style={styles.actions}>
        <GlowButton
          title={previewing ? 'STOP PREVIEW' : 'PREVIEW'}
          variant="ghost"
          icon={previewing ? 'pause' : 'play'}
          uppercase
          onPress={() => setPreviewing(value => !value)}
        />
        <GlowButton
          title="MERGE UNIVERSES"
          iconRight="arrow-right"
          uppercase
          onPress={() => navigation.navigate('FinalComposition')}
        />
      </View>
    </ScreenContainer>
  );
}
