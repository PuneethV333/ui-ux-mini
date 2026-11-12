import React, {useCallback, useMemo, useState} from 'react';
import {Alert, Pressable, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import Icon from '../../components/common/Icon';
import IconButton from '../../components/common/IconButton';
import ScreenContainer from '../../components/layout/ScreenContainer';
import {useApp} from '../../context/AppContext';
import {profileMenu} from '../../data/mockData';
import {colors, gradients} from '../../theme';
import Avatar from './Avatar';
import MenuRow from './MenuRow';
import SettingsSheet, {ProfileSettings} from './SettingsSheet';
import ShareSheet from './ShareSheet';
import StatCard from './StatCard';
import {styles} from './styles';

const DEFAULT_SETTINGS: ProfileSettings = {
  haptics: true,
  autoplay: true,
  highContrast: false,
};

const MENU_TONES: Record<string, {accent: string; tint: string}> = {
  creations: {accent: colors.secondary, tint: 'rgba(244,114,208,0.14)'},
  favourites: {accent: colors.magenta, tint: 'rgba(232,121,249,0.14)'},
  share: {accent: colors.cyan, tint: 'rgba(56,189,248,0.14)'},
  settings: {accent: colors.primaryBright, tint: 'rgba(139,92,246,0.18)'},
};

export default function Profile() {
  const navigation = useNavigation<any>();
  const {user, universes, signOut} = useApp();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [settings, setSettings] = useState<ProfileSettings>(DEFAULT_SETTINGS);

  const favouriteCount = useMemo(
    () => universes.filter(universe => universe.isFavorite).length,
    [universes],
  );

  const openLibrary = useCallback(() => {
    navigation.navigate('MainTabs', {screen: 'LibraryTab'});
  }, [navigation]);

  const handleMenuPress = useCallback(
    (id: string) => {
      switch (id) {
        case 'creations':
        case 'favourites':
          openLibrary();
          break;
        case 'share':
          setShareOpen(true);
          break;
        case 'settings':
          setSettingsOpen(true);
          break;
        default:
          break;
      }
    },
    [openLibrary],
  );

  const toggleSetting = useCallback((key: keyof ProfileSettings) => {
    setSettings(previous => ({...previous, [key]: !previous[key]}));
  }, []);

  const confirmSignOut = useCallback(() => {
    Alert.alert(
      'Sign out of Sonicverse?',
      'Your universes stay saved on this device. You can sign back in any time.',
      [
        {text: 'Stay', style: 'cancel'},
        {
          text: 'Sign out',
          style: 'destructive',
          onPress: () => {
            signOut();
            const action = {index: 0, routes: [{name: 'Splash'}]};
            const root = navigation.getParent();
            if (root) {
              root.reset(action);
            } else {
              navigation.reset(action);
            }
          },
        },
      ],
    );
  }, [navigation, signOut]);

  return (
    <>
      <ScreenContainer withTabBar>
        <View style={styles.headerRow}>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.eyebrow}>Your identity</Text>
            <Text
              style={styles.headerTitle}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
            >
              PROFILE
            </Text>
            <LinearGradient
              colors={[...gradients.aurora]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.titleBar}
            />
          </View>
          <IconButton
            name="settings"
            size={46}
            iconSize={21}
            background="rgba(139,92,246,0.16)"
            borderColor={colors.borderStrong}
            glow
            onPress={() => setSettingsOpen(true)}
            accessibilityLabel="Open settings"
            style={styles.headerAction}
          />
        </View>

        <View style={styles.profileBlock}>
          <Avatar name={user.name} />
          <Text
            style={styles.name}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.75}
          >
            {user.name}
          </Text>
          <View style={styles.handleRow}>
            <Icon name="star" size={11} color={colors.gold} strokeWidth={2} />
            <Text style={styles.handle} numberOfLines={1}>
              {user.handle}
            </Text>
          </View>
          <View style={styles.memberRow}>
            <View style={styles.memberDot} />
            <Text style={styles.member}>Member since {user.joined}</Text>
          </View>
        </View>

        <View style={styles.statRow}>
          <StatCard
            icon="globe"
            value={user.universes}
            label="Universes"
            accent={colors.cyan}
            tint="rgba(56,189,248,0.14)"
            glow="rgba(56,189,248,0.22)"
            strongBorder={settings.highContrast}
          />
          <StatCard
            icon="star"
            value={user.remixes}
            label="Remixes"
            accent={colors.gold}
            tint="rgba(255,196,107,0.14)"
            glow="rgba(255,196,107,0.2)"
            strongBorder={settings.highContrast}
          />
        </View>

        <View style={styles.menuSection}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionLabel}>Your space</Text>
            <View style={styles.sectionLine} />
          </View>
          <View style={styles.menuList}>
            {profileMenu.map(item => {
              const tone = MENU_TONES[item.id] ?? {
                accent: colors.primaryBright,
                tint: 'rgba(139,92,246,0.16)',
              };
              const badge =
                item.id === 'creations'
                  ? String(user.universes)
                  : item.id === 'favourites' && favouriteCount > 0
                  ? String(favouriteCount)
                  : undefined;

              return (
                <MenuRow
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  badge={badge}
                  accent={tone.accent}
                  tint={tone.tint}
                  strongBorder={settings.highContrast}
                  onPress={() => handleMenuPress(item.id)}
                />
              );
            })}
          </View>
        </View>

        <View style={styles.footer}>
          <Pressable
            onPress={confirmSignOut}
            accessibilityRole="button"
            accessibilityLabel="Sign out"
            style={({pressed}) => [
              styles.signOut,
              pressed && styles.signOutPressed,
            ]}
          >
            <Icon
              name="logout"
              size={17}
              color={colors.danger}
              strokeWidth={2}
            />
            <Text style={styles.signOutText}>SIGN OUT</Text>
          </Pressable>
          <Text style={styles.version}>Sonicverse v1.0 • offline demo</Text>
        </View>
      </ScreenContainer>

      <SettingsSheet
        visible={settingsOpen}
        values={settings}
        onToggle={toggleSetting}
        onClose={() => setSettingsOpen(false)}
      />
      <ShareSheet
        visible={shareOpen}
        handle={user.handle}
        universeCount={user.universes}
        onClose={() => setShareOpen(false)}
      />
    </>
  );
}
