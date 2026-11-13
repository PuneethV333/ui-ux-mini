import React, {useCallback} from 'react';
import {StatusBar} from 'react-native';
import {
  NavigationContainer,
  DarkTheme,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useFonts} from 'expo-font';
import RootNavigator from './src/navigation/RootNavigator';
import {AppProvider} from './src/context/AppContext';
import {PlayerProvider, usePlayer} from './src/context/PlayerContext';
import {colors} from './src/theme';

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.secondary,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
    notification: colors.secondary,
  },
};

const AUDIO_ROUTES = new Set(['MusicalUniverse', 'FinalComposition']);

function AppNavigator() {
  const navigationRef = useNavigationContainerRef();
  const {pause} = usePlayer();

  const handleStateChange = useCallback(() => {
    const route = navigationRef.getCurrentRoute()?.name;
    if (route && !AUDIO_ROUTES.has(route)) {
      pause();
    }
  }, [navigationRef, pause]);

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={navigationTheme}
      onStateChange={handleStateChange}>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Orbitron-Regular': require('./assets/fonts/Orbitron-Regular.ttf'),
    'Orbitron-Bold': require('./assets/fonts/Orbitron-Bold.ttf'),
    'Orbitron-Black': require('./assets/fonts/Orbitron-Black.ttf'),
    'SpaceGrotesk-Regular': require('./assets/fonts/SpaceGrotesk-Regular.ttf'),
    'SpaceGrotesk-Medium': require('./assets/fonts/SpaceGrotesk-Medium.ttf'),
    'SpaceGrotesk-Bold': require('./assets/fonts/SpaceGrotesk-Bold.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <AppProvider>
        <PlayerProvider>
          <AppNavigator />
        </PlayerProvider>
      </AppProvider>
    </SafeAreaProvider>
  );
}
