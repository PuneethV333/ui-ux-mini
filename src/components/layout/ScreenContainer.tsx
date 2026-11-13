import React from 'react';
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {layout, spacing} from '../../theme';
import GradientBackground from './GradientBackground';

type Props = {
  children: React.ReactNode;
  scroll?: boolean;
  padded?: boolean;
  withTabBar?: boolean;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  edges?: Array<'top' | 'bottom' | 'left' | 'right'>;
  variant?: 'default' | 'soft' | 'deep';
  showNebula?: boolean;
  scrollRef?: React.RefObject<React.ComponentRef<typeof ScrollView> | null>;
};

export default function ScreenContainer({
  children,
  scroll = true,
  padded = true,
  withTabBar = false,
  style,
  contentContainerStyle,
  edges = ['top', 'left', 'right'],
  variant = 'default',
  showNebula = true,
  scrollRef,
}: Props) {
  const paddingBottom = withTabBar ? spacing.xxl : spacing.xxxl;
  return (
    <GradientBackground variant={variant} showNebula={showNebula}>
      <SafeAreaView style={[styles.safe, style]} edges={edges}>
        {scroll ? (
          <ScrollView
            ref={scrollRef}
            showsVerticalScrollIndicator={false}
            bounces={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            contentContainerStyle={[
              styles.scrollContent,
              padded && styles.padded,
              {paddingBottom},
              contentContainerStyle,
            ]}>
            {children}
          </ScrollView>
        ) : (
          <View
            style={[
              styles.flex,
              padded && styles.padded,
              {paddingBottom},
              contentContainerStyle,
            ]}>
            {children}
          </View>
        )}
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1},
  flex: {flex: 1},
  scrollContent: {flexGrow: 1},
  padded: {
    paddingHorizontal: layout.screenPadding,
  },
});
