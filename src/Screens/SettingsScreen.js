import React from 'react';
import {
  StyleSheet,
  View,Text
} from 'react-native';
import auth from '@react-native-firebase/auth';
import ThemeButton from './../Components/ThemeButton'
import ScreenNames from '../Constants/ScreenNames';
const SettingsScreen = ({navigation})=>{
    return (
      <View>
          <Text>this is SettingsScreen</Text>
          <ThemeButton title={'signOut'} onPress={()=>{
            auth()
               .signOut()
                 .then(() => {
                   console.log('User signed out!')
                   navigation.navigate(ScreenNames.LoadingStack)});
          }}/>
      </View>  
    )
}
export default SettingsScreen;