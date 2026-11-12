import React from 'react';
import {Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ScreenContainer from '../../components/layout/ScreenContainer';
import CosmicHeader from '../../components/layout/CosmicHeader';
import {styles} from './styles';

export default function Login() {
  const navigation = useNavigation<any>();
  return (
    <ScreenContainer>
      <CosmicHeader title="Login"
        onBack={() => navigation.goBack()}
      />
      <View style={styles.center}>
        <Text style={styles.placeholder}>Login screen</Text>
      </View>
    </ScreenContainer>
  );
}
