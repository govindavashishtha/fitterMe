import React, {useEffect} from 'react';
import {
  StyleSheet, StatusBar, Text , TextInput
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Colors from "./src/Constants/Colors"
import LoadingNavigationStack from './src/Navigation/SwitchNavigator';
import { Provider } from 'react-redux';
import store from './src/react-redux/store';


const AppWrapper = () =>{

  useEffect(() => {
    // for force Scaling Text and TextInput to default Size

    if (Text.defaultProps == null) Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;

    if (TextInput.defaultProps == null) TextInput.defaultProps = {};
    TextInput.defaultProps.allowFontScaling = false;
    
  });
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
