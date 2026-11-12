import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors, fonts, gradients, radius, spacing} from '../../theme';
import Icon, {IconName} from '../common/Icon';
import MiniPlayer from '../player/MiniPlayer';

const TAB_META: Record<string, {label: string; icon: IconName}> = {
  HomeTab: {label: 'Home', icon: 'home'},
  LibraryTab: {label: 'Library', icon: 'library'},
  CreateTab: {label: 'Create', icon: 'plus'},
  ProfileTab: {label: 'Profile', icon: 'profile'},
};

export default function BottomTabBar({
  state,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, {paddingBottom: Math.max(insets.bottom, 12)}]}>
      <MiniPlayer />
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const meta = TAB_META[route.name] ?? {
            label: route.name,
            icon: 'home' as IconName,
          };
          const isCreate = route.name === 'CreateTab';

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={meta.label}
              onPress={onPress}
              style={({pressed}) => [
                styles.tab,
                pressed && styles.pressed,
              ]}>
              {isCreate ? (
                <View style={styles.createWrap}>
                  <LinearGradient
                    colors={[...gradients.primaryButton]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={styles.createButton}
                  >
                    <Icon
                      name="plus"
                      size={22}
                      color={colors.textInverse}
                      strokeWidth={2.6}
                    />
                  </LinearGradient>
                  <Text
                    style={[
                      styles.label,
                      styles.createLabel,
                      isFocused && styles.activeLabel,
                    ]}>
                    {meta.label}
                  </Text>
                </View>
              ) : (
                <>
                  <View style={[styles.iconWrap, isFocused && styles.iconActive]}>
                    <Icon
                      name={meta.icon}
                      size={21}
                      color={isFocused ? colors.text : colors.textDim}
                      strokeWidth={isFocused ? 2 : 1.6}
                    />
                    {isFocused ? <View style={styles.dot} /> : null}
                  </View>
                  <Text
                    style={[styles.label, isFocused && styles.activeLabel]}>
                    {meta.label}
                  </Text>
                </>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: 'rgba(5,3,15,0.92)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    gap: 4,
  },
  pressed: {opacity: 0.7},
  iconWrap: {
    width: 42,
    height: 30,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconActive: {backgroundColor: 'rgba(139,92,246,0.16)'},
  dot: {
    position: 'absolute',
    bottom: -5,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.secondary,
  },
  label: {
    fontFamily: fonts.bodyMedium,
    fontSize: 10,
    color: colors.textDim,
    letterSpacing: 0.2,
  },
  activeLabel: {color: colors.text},
  createWrap: {alignItems: 'center', gap: 4, marginTop: -22},
  createButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.secondary,
    shadowOpacity: 0.55,
    shadowRadius: 16,
    shadowOffset: {width: 0, height: 4},
    elevation: 10,
  },
  createLabel: {color: colors.textMuted},
});
