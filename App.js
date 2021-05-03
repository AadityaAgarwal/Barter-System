import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {  StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen';
import {TabNavigator} from './TabNavigator'
import {createSwitchNavigator,createAppContainer} from 'react-navigation'
import{ DrawerNavigator} from './components/DrawerNavigator'
import Settings from './screens/Settings'
export default function App() {
  return (
    
      <AppContainer />
   
  );
}

const SwitchNavigator=createSwitchNavigator({
  WelcomeScreen:WelcomeScreen,
  Drawer:DrawerNavigator,
  Settings:Settings
})

const AppContainer=createAppContainer(SwitchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE0B2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
//#FFE0B2
