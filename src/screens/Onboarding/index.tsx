import React, {useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import type {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ScreenContainer from '../../components/layout/ScreenContainer';
import GlowButton from '../../components/common/GlowButton';
import {SonicverseMark} from '../../components/common/Logo';
import {onboardingSlides} from '../../data/mockData';
import type {OnboardingSlide} from '../../data/types';
import type {RootStackParamList} from '../../navigation/types';
import {gradients} from '../../theme';
import SlideArt from './SlideArt';
import {styles} from './styles';

const LAST_INDEX = onboardingSlides.length - 1;

export default function Onboarding() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {width, height} = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [pagerHeight, setPagerHeight] = useState(0);

  const listRef = useRef<FlatList<OnboardingSlide>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const artSize = Math.round(Math.min(width * 0.76, height * 0.31, 290));

  const handleMomentumEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const next = Math.round(event.nativeEvent.contentOffset.x / width);
    setIndex(Math.max(0, Math.min(LAST_INDEX, next)));
  };

  const handleNext = () => {
    if (index >= LAST_INDEX) {
      navigation.navigate('Login');
      return;
    }
    const next = index + 1;
    listRef.current?.scrollToOffset({offset: next * width, animated: true});
    setIndex(next);
  };

  const renderItem = ({
    item,
    index: slideIndex,
  }: {
    item: OnboardingSlide;
    index: number;
  }) => {
    const inputRange = [
      (slideIndex - 1) * width,
      slideIndex * width,
      (slideIndex + 1) * width,
    ];
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.25, 1, 0.25],
      extrapolate: 'clamp',
    });
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.94, 1, 0.94],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[
          styles.slide,
          {width, minHeight: pagerHeight, opacity, transform: [{scale}]},
        ]}>
        <View style={styles.artWrap}>
          <SlideArt slide={item} size={artSize} />
        </View>

        <View style={styles.eyebrowPill}>
          <Text style={[styles.eyebrowText, {color: item.accent}]}>
            {item.eyebrow}
          </Text>
        </View>

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </Animated.View>
    );
  };

  const isLast = index === LAST_INDEX;

  return (
    <ScreenContainer
      scroll={false}
      padded={false}
      variant="soft"
      edges={['top', 'left', 'right', 'bottom']}
      contentContainerStyle={styles.root}>
      <View style={styles.header}>
        <View style={styles.brand}>
          <SonicverseMark size={28} showStars={false} />
          <Text style={styles.brandText}>SONICVERSE</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Skip onboarding and go to login"
          onPress={() => navigation.navigate('Login')}
          style={styles.skip}
          hitSlop={8}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </View>

      <FlatList
        ref={listRef}
        data={onboardingSlides}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        style={styles.pager}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          // VirtualizedList cannot drive onScroll natively on RN 0.88+.
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleMomentumEnd}
        onLayout={event => setPagerHeight(event.nativeEvent.layout.height)}
        getItemLayout={(_, itemIndex) => ({
          length: width,
          offset: width * itemIndex,
          index: itemIndex,
        })}
      />

      <View style={styles.footer}>
        <View style={styles.metaRow}>
          <View
            style={styles.dots}
            accessibilityLabel={`Slide ${index + 1} of ${
              onboardingSlides.length
            }`}>
            {onboardingSlides.map((slide, dotIndex) =>
              dotIndex === index ? (
                <View key={slide.id} style={styles.dotActive}>
                  <LinearGradient
                    colors={[...gradients.primaryButton]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={styles.dotFill}
                  />
                </View>
              ) : (
                <View key={slide.id} style={styles.dot} />
              ),
            )}
          </View>
          <Text style={styles.counter}>
            {`0${index + 1} / 0${onboardingSlides.length}`}
          </Text>
        </View>

        <GlowButton
          title={isLast ? 'GET STARTED' : 'NEXT'}
          uppercase
          iconRight={isLast ? 'sparkles' : 'arrow-right'}
          onPress={handleNext}
        />
      </View>
    </ScreenContainer>
  );
}
