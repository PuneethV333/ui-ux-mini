import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon, {IconName} from '../../components/common/Icon';
import IconButton from '../../components/common/IconButton';
import {colors, spacing} from '../../theme';
import {styles} from './styles';

const TARGETS: Array<{
  id: string;
  label: string;
  icon: IconName;
  accent: string;
  tint: string;
}> = [
  {
    id: 'message',
    label: 'Message',
    icon: 'mail',
    accent: colors.cyan,
    tint: 'rgba(56,189,248,0.14)',
  },
  {
    id: 'orbit',
    label: 'Orbit feed',
    icon: 'globe',
    accent: colors.magenta,
    tint: 'rgba(232,121,249,0.14)',
  },
  {
    id: 'export',
    label: 'Export',
    icon: 'download',
    accent: colors.gold,
    tint: 'rgba(255,196,107,0.14)',
  },
];

type Props = {
  visible: boolean;
  onClose: () => void;
  handle: string;
  universeCount: number;
};

/** Local-only share sheet; every action is simulated, nothing leaves the device. */
export default function ShareSheet({
  visible,
  onClose,
  handle,
  universeCount,
}: Props) {
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(380)).current;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [status, setStatus] = useState<string | null>(null);

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

  useEffect(() => {
    if (!visible) {
      setStatus(null);
    }
  }, [visible]);

  useEffect(
    () => () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    },
    [],
  );

  const announce = useCallback((message: string) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    setStatus(message);
    timer.current = setTimeout(() => setStatus(null), 2200);
  }, []);

  const copied = status === 'Profile link copied (demo)';
  const profileUrl = `sonicverse.app/${handle}`;

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
          accessibilityLabel="Close share sheet"
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
            <View style={[styles.sheetIconBadge, styles.shareHeaderBadge]}>
              <Icon name="share" size={18} color={colors.cyan} />
            </View>
            <View style={styles.sheetTitleWrap}>
              <Text style={styles.sheetTitle}>Share your universe</Text>
              <Text style={styles.sheetSubtitle}>
                Send a little gravity to a friend.
              </Text>
            </View>
            <IconButton
              name="close"
              size={36}
              iconSize={16}
              onPress={onClose}
              accessibilityLabel="Close share sheet"
            />
          </View>

          <View style={styles.sheetContent}>
            <View style={styles.shareLinkCard}>
              <View style={styles.shareLinkIcon}>
                <Icon name="globe" size={18} color={colors.cyan} />
              </View>
              <View style={styles.linkTextWrap}>
                <Text style={styles.linkLabel}>PROFILE LINK</Text>
                <Text style={styles.linkValue} numberOfLines={1}>
                  {profileUrl}
                </Text>
              </View>
              <Pressable
                onPress={() => announce('Profile link copied (demo)')}
                accessibilityRole="button"
                accessibilityLabel="Copy profile link"
                style={({pressed}) => [
                  styles.copyButton,
                  pressed && styles.copyButtonPressed,
                ]}
              >
                {copied ? (
                  <Icon name="check" size={13} color={colors.success} />
                ) : null}
                <Text
                  style={[styles.copyText, copied && styles.copyTextSuccess]}
                >
                  {copied ? 'COPIED' : 'COPY'}
                </Text>
              </Pressable>
            </View>

            <Text style={styles.shareTargetsLabel}>SEND TO</Text>
            <View style={styles.shareTargets}>
              {TARGETS.map(target => (
                <Pressable
                  key={target.id}
                  accessibilityRole="button"
                  accessibilityLabel={`Share to ${target.label}`}
                  onPress={() =>
                    announce(`Ready to share to ${target.label} (demo)`)
                  }
                  style={({pressed}) => [
                    styles.shareTarget,
                    pressed && styles.shareTargetPressed,
                  ]}
                >
                  <View
                    style={[
                      styles.shareTargetIcon,
                      {backgroundColor: target.tint},
                    ]}
                  >
                    <Icon
                      name={target.icon}
                      size={20}
                      color={target.accent}
                      strokeWidth={1.8}
                    />
                  </View>
                  <Text style={styles.shareTargetLabel}>{target.label}</Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.shareStatus}>
              {status ? (
                <>
                  <Icon name="check" size={14} color={colors.success} />
                  <Text style={styles.shareStatusText} numberOfLines={2}>
                    {status}
                  </Text>
                </>
              ) : (
                <Text style={styles.shareStatusIdle}>
                  Private by design — nothing is uploaded.
                </Text>
              )}
            </View>

            <Text style={styles.sheetFooterNote}>
              {universeCount} universes in orbit · offline demo
            </Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
