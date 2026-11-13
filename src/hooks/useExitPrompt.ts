import {useCallback} from 'react';
import {Alert, BackHandler} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useApp} from '../context/AppContext';

/**
 * Android hardware back on an authenticated tab root should never walk back
 * into the login/signup flow. It offers logout or exit instead.
 */
export function useExitPrompt() {
  const navigation = useNavigation<any>();
  const {signOut} = useApp();

  useFocusEffect(
    useCallback(() => {
      const onBack = () => {
        if (navigation.canGoBack()) {
          return false;
        }
        Alert.alert(
          'Leave Sonicverse?',
          'Your universes stay saved on this device.',
          [
            {text: 'Stay', style: 'cancel'},
            {
              text: 'Log out',
              style: 'destructive',
              onPress: () => {
                signOut();
                const root = navigation.getParent() ?? navigation;
                root.reset({index: 0, routes: [{name: 'Login'}]});
              },
            },
            {
              text: 'Exit',
              style: 'destructive',
              onPress: () => BackHandler.exitApp(),
            },
          ],
        );
        return true;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBack,
      );
      return () => subscription.remove();
    }, [navigation, signOut]),
  );
}
