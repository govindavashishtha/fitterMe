import React, {Component} from 'react';
import {
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/Screens/HomeScreen';
import CalculateScreen from './src/Screens/CalculateScreen';
import DesignScreen from './src/Screens/DesignScreen';
import SettingsScreen from './src/Screens/SettingsScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import TabNavigator from './src/Navigation/TabNavigator';

 const  App = ()=> {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <TabNavigator />
      </NavigationContainer>
      </SafeAreaProvider>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c34',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
