import React from 'react';
import {
  StyleSheet,
  View,Text
} from 'react-native';
import auth from '@react-native-firebase/auth';
import ThemeButton from './../Components/ThemeButton'
import ScreenNames from '../Constants/ScreenNames';
import Header from './../Components/Header';
import ConfirmDialog from '../Components/ConfirmDialog';
const SettingsScreen = ({navigation})=>{
  const signOut = ()=>{
    auth()
    .signOut()
      .then(() => {
        console.log('User signed out!')
        navigation.navigate(ScreenNames.LoadingStack)});
  }
    return (
      <>
          <Header title={'Settings'} />
          <View style ={styles.container}>
          <View>
          <ThemeButton title={'signOut'} onPress={()=>{
                        ConfirmDialog('Sign Out' , 'Sure to SignOut?' , signOut)
          }
           }/>
          </View>
          </View>
      </>  
    )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
})
export default SettingsScreen;