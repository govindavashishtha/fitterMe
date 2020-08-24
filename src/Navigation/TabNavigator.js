import React from 'react';
import HomeScreen from './../Screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalculateScreen from '../Screens/CalculateScreen';
import DesignScreen from '../Screens/DesignScreen';
import SettingsScreen from '../Screens/SettingsScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
const Tab = createBottomTabNavigator();
const TabNavigator =()=>{
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
             }else if( route.name ==='Calculate'){
               iconName = focused ? 'list-alt' : 'list-alt';
             }else if( route.name ==='Design'){
               iconName = focused ? 'pencil' : 'pencil';
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
    );
}
export default TabNavigator;