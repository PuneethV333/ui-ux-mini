import React, {useEffect, useRef} from 'react';
import {Animated, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import GlowButton from '../../components/common/GlowButton';
import Icon, {IconName} from '../../components/common/Icon';
import IconButton from '../../components/common/IconButton';
import {colors, spacing} from '../../theme';
import {styles} from './styles';

export type ProfileSettings = {
  haptics: boolean;
  autoplay: boolean;
  highContrast: boolean;
};

type ToggleProps = {
  value: boolean;
  label: string;
  onChange: (next: boolean) => void;
};

function Toggle({value, label, onChange}: ToggleProps) {
  const position = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(position, {
      toValue: value ? 1 : 0,
      damping: 16,
      stiffness: 220,
      mass: 0.6,
      useNativeDriver: true,
    }).start();
  }, [position, value]);

  const translateX = position.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  });

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={label}
      accessibilityState={{checked: value}}
      hitSlop={8}
      onPress={() => onChange(!value)}
      style={[styles.toggleTrack, value && styles.toggleTrackOn]}
    >
      <Animated.View
        style={[
          styles.toggleThumb,
          value && styles.toggleThumbOn,
          {transform: [{translateX}]},
        ]}
      />
    </Pressable>
  );
}

const ROWS: Array<{
  key: keyof ProfileSettings;
  label: string;
  description: string;
  icon: IconName;
  accent: string;
  tint: string;
}> = [
  {
    key: 'haptics',
    label: 'Haptics',
    description: 'Subtle taps for buttons and gestures.',
    icon: 'pulse',
    accent: colors.secondary,
    tint: 'rgba(244,114,208,0.14)',
  },
  {
    key: 'autoplay',
    label: 'Autoplay',
    description: 'Start playing when you open a universe.',
    icon: 'play',
    accent: colors.cyan,
    tint: 'rgba(56,189,248,0.14)',
  },
  {
    key: 'highContrast',
    label: 'High contrast',
    description: 'Brighten borders and key labels.',
    icon: 'star',
    accent: colors.gold,
    tint: 'rgba(255,196,107,0.14)',
  },
];

type Props = {
  visible: boolean;
  values: ProfileSettings;
  onToggle: (key: keyof ProfileSettings) => void;
  onClose: () => void;
};

/** Styled bottom sheet with local, session-only preferences. */
export default function SettingsSheet({
  visible,
  values,
  onToggle,
  onClose,
}: Props) {
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(380)).current;

  useEffect(() => {
    if (!visible) {
      translateY.setValue(380);
      return;
    }
    Animated.spring(translateY, {
      toValue: 0,
      damping: 20,
      stiffness: 190,
      mass: 0.9,
      useNativeDriver: true,
    }).start();
  }, [translateY, visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.modalRoot}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Close settings"
        />
        <Animated.View
          style={[
            styles.sheet,
            {
              paddingBottom: Math.max(insets.bottom, spacing.lg),
              transform: [{translateY}],
            },
          ]}
        >
          <LinearGradient
            colors={['rgba(36,21,68,0.99)', 'rgba(9,5,22,0.99)']}
            start={{x: 0, y: 0}}
            end={{x: 0.9, y: 1}}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.sheetHandleRow}>
            <View style={styles.sheetHandle} />
          </View>
          <View style={styles.sheetHeader}>
            <View style={[styles.sheetIconBadge, styles.settingsHeaderBadge]}>
              <Icon name="sliders" size={18} color={colors.primaryBright} />
            </View>
            <View style={styles.sheetTitleWrap}>
              <Text style={styles.sheetTitle}>Settings</Text>
              <Text style={styles.sheetSubtitle}>
                Tune how Sonicverse feels.
              </Text>
            </View>
            <IconButton
              name="close"
              size={36}
              iconSize={16}
              onPress={onClose}
              accessibilityLabel="Close settings"
            />
          </View>

          <View style={styles.sheetContent}>
            {ROWS.map((row, index) => (
              <View
                key={row.key}
                style={[
                  styles.settingRow,
                  index === ROWS.length - 1 && styles.lastSettingRow,
                  values.highContrast && styles.settingRowStrong,
                ]}
              >
                <View style={[styles.settingIcon, {backgroundColor: row.tint}]}>
                  <Icon name={row.icon} size={17} color={row.accent} />
                </View>
                <View style={styles.settingTextWrap}>
                  <Text style={styles.settingLabel}>{row.label}</Text>
                  <Text style={styles.settingDescription}>
                    {row.description}
                  </Text>
                </View>
                <Toggle
                  value={values[row.key]}
                  label={row.label}
                  onChange={() => onToggle(row.key)}
                />
              </View>
            ))}
            <Text style={styles.sheetFooterNote}>
              Preferences stay on this device for the demo session.
            </Text>
            <GlowButton
              title="Done"
              size="sm"
              variant="secondary"
              onPress={onClose}
              style={styles.sheetDone}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
