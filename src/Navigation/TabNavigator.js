import React from 'react';
import HomeScreen from './../Screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalculateScreen from '../Screens/CalculateScreen';
import DesignScreen from '../Screens/DesignScreen';
import SettingsScreen from '../Screens/SettingsScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../Constants/Colors';

const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation }) => {
  const Home = ({ navigation }) => {
    return (
      <HomeScreen navigation={navigation} />
    );
  }
  const Calculate = ({ navigation }) => {
    return (
      <CalculateScreen navigation={navigation} />
    );
  }
  const Design = ({ navigation }) => {
    return (
      <DesignScreen navigation={navigation} />
    );
  }
  const Settings = () => {
    return (
      <SettingsScreen navigation={navigation} />
    );
  }
  return (
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
          } else if (route.name === 'Calculate') {
            iconName = focused ? 'list-alt' : 'list-alt';
          } else if (route.name === 'Design') {
            iconName = focused ? 'pencil' : 'pencil';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.primaryColorDark,
        inactiveTintColor: 'gray',
        keyboardHidesTabBar: true,
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Calculate" component={Calculate} />
      <Tab.Screen name="Design" component={Design} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
export default TabNavigator;