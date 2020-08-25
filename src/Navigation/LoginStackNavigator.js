import * as React from 'react';
import LoginScreen from '../Screens/LoginScreen';
import PhoneLoginScreen from '../Screens/PhoneLoginScreen';
import SignUpScreen from '../Screens/SignUpScreen';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();
const LoginStackNavigator = ({navigation})=>{
  const LogIn=({navigation})=> {
    return (
      <LoginScreen navigation={navigation}/>
    );
  }
  const PhoneLogIn=({navigation})=> {
    return (
      <PhoneLoginScreen navigation={navigation}/>
    );
  }
  const SignUp=({navigation})=> {
    return (
      <SignUpScreen navigation={navigation} />
    );
  }
  return(
    <Stack.Navigator screenOptions={{
      headerShown : Platform.OS ==='android'?false:true
    }}>
    <Stack.Screen name="LogIn" component={LogIn} />
    <Stack.Screen name="PhoneLogIn" component={PhoneLogIn} />
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
  );
}
export default LoginStackNavigator;