import React, {Component} from 'react';
import {
  StyleSheet, StatusBar
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Colors from "./src/Constants/Colors"
import LoadingNavigationStack from './src/Navigation/SwitchNavigator'

 const  App = ()=> {
    return (
      <SafeAreaProvider> 
         <StatusBar  
            backgroundColor = {Colors.primaryColorDark}  
             barStyle = "light-content"   
        /> 
        <NavigationContainer>
          {/* < TabNavigator/> */}
         <LoadingNavigationStack />
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
