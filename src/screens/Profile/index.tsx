import React from 'react';
import {Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ScreenContainer from '../../components/layout/ScreenContainer';
import CosmicHeader from '../../components/layout/CosmicHeader';
import {styles} from './styles';

export default function Profile() {
  const navigation = useNavigation<any>();
  return (
    <ScreenContainer>
      <CosmicHeader title="Profile"
      />
      <View style={styles.center}>
        <Text style={styles.placeholder}>Profile screen</Text>
      </View>
    </ScreenContainer>
  );
}
