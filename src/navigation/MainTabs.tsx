import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import BottomTabBar from '../components/layout/BottomTabBar';
import Home from '../screens/Home';
import Library from '../screens/Library';
import MoodSelection from '../screens/MoodSelection';
import Profile from '../screens/Profile';
import type {TabParamList} from './types';

const Tab = createBottomTabNavigator<TabParamList>();

export default function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={props => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: styles.scene,
      }}>
      <Tab.Screen name="HomeTab" component={Home} />
      <Tab.Screen name="LibraryTab" component={Library} />
      <Tab.Screen name="CreateTab" component={MoodSelection} />
      <Tab.Screen name="ProfileTab" component={Profile} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  scene: {backgroundColor: '#05030F'},
});
