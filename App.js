import React, {Component} from 'react';
import {
  StyleSheet, StatusBar
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Colors from "./src/Constants/Colors"
import LoadingNavigationStack from './src/Navigation/SwitchNavigator';
import { Provider } from 'react-redux';
import store from './src/react-redux/store';
import SignUpScreen from './src/Screens/SignUpScreen'


const AppWrapper = () =>{
  return(
    <Provider store={store}>
    <App />
  </Provider>
  );
}

 const  App = ()=> {
    return (
      <SafeAreaProvider> 
         <StatusBar  
            backgroundColor = {Colors.primaryColorDark}  
             barStyle = "light-content"   
        /> 
        <NavigationContainer>
         <LoadingNavigationStack />
      </NavigationContainer>
      </SafeAreaProvider>
      // <SignUpScreen />
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

export default AppWrapper;
