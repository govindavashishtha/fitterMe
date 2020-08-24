import React, {Component} from 'react';
import {
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/Screens/HomeScreen';
import CalculateScreen from './src/Screens/CalculateScreen';
import DesignScreen from './src/Screens/DesignScreen';
import SettingsScreen from './src/Screens/SettingsScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Home=({navigation})=> {
  return (
    <HomeScreen/>
  );
}
const Calculate=({navigation})=> {
  return (
   <CalculateScreen />
  );
}
const Design=({navigation})=> {
  return (
    <DesignScreen/>
  );
}
const Settings=({navigation})=> {
  return (
    <SettingsScreen />
  );
}

const Tab = createBottomTabNavigator();
 const  App = ()=> {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
       <Tab.Navigator
       screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'cog' : 'cog';
            }else if( route.name ==='Calculate'){
              iconName = focused ? 'calculator' : 'calculator';
            }else if( route.name ==='Design'){
              iconName = focused ? 'calculator' : 'cog';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Calculate" component={Calculate} />
        <Tab.Screen name="Design" component={Design} />
        <Tab.Screen name="Settings" component={Settings} />
       </Tab.Navigator>
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
