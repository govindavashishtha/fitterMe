import * as React from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import LoginStackNavigator from './LoginStackNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import LoadingScreen from '../Screens/LoadingScreen';

const Stack = createStackNavigator();
const LoadingNavigationStack = ({navigation}) =>{
    const Loading=()=> {
        return (
          <LoadingScreen navigation={navigation}/>
        );
      }
    return(
        <Stack.Navigator screenOptions={{
            headerShown : Platform.OS ==='android'?false:true
          }}>
          <Stack.Screen name="Loading" component={Loading} />
        </Stack.Navigator>
    )
}

const NavigatorStacks = {
  loading: LoadingNavigationStack,
  LogIn: LoginStackNavigator,
  Tab: TabNavigator,
};

const SwitchNavigator = createSwitchNavigator(
  {
    LoadingStack: NavigatorStacks.loading,
    LogInStack: NavigatorStacks.LogIn,
    TabStack: NavigatorStacks.Tab,
  },
  {
    initialRouteName: 'LoadingStack',
  },
);

export default createAppContainer(SwitchNavigator);
