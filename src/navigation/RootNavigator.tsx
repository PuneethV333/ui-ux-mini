import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import Splash from '../screens/Splash';
import Onboarding from '../screens/Onboarding';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import MoodSelection from '../screens/MoodSelection';
import DrawYourMood from '../screens/DrawYourMood';
import GeneratingUniverse from '../screens/GeneratingUniverse';
import MusicalUniverse from '../screens/MusicalUniverse';
import CreateParallelUniverse from '../screens/CreateParallelUniverse';
import ParallelUniverseResult from '../screens/ParallelUniverseResult';
import SonicverseMap from '../screens/SonicverseMap';
import CompareUniverses from '../screens/CompareUniverses';
import RemixMerge from '../screens/RemixMerge';
import FinalComposition from '../screens/FinalComposition';
import {useApp} from '../context/AppContext';
import type {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const {isAuthenticated} = useApp();

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? 'MainTabs' : 'Splash'}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: {backgroundColor: '#05030F'},
      }}>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{animation: 'fade'}}
      />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{animation: 'fade'}}
      />
      <Stack.Screen name="MoodSelection" component={MoodSelection} />
      <Stack.Screen name="DrawYourMood" component={DrawYourMood} />
      <Stack.Screen name="GeneratingUniverse" component={GeneratingUniverse} />
      <Stack.Screen name="MusicalUniverse" component={MusicalUniverse} />
      <Stack.Screen
        name="CreateParallelUniverse"
        component={CreateParallelUniverse}
      />
      <Stack.Screen
        name="ParallelUniverseResult"
        component={ParallelUniverseResult}
      />
      <Stack.Screen name="SonicverseMap" component={SonicverseMap} />
      <Stack.Screen name="CompareUniverses" component={CompareUniverses} />
      <Stack.Screen name="RemixMerge" component={RemixMerge} />
      <Stack.Screen name="FinalComposition" component={FinalComposition} />
    </Stack.Navigator>
  );
}
