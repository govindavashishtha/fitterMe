import React from 'react';
import {
  StyleSheet,
  View,Text
} from 'react-native';
import Header from './../Components/Header';
import ThemeButton from '../Components/ThemeButton';

const HomeScreen = ({navigation})=>{
    return (
      <>
         <Header title ={'Home'}/>
         <View style = {styles.container}></View>
      </>  
    )
}
const styles = StyleSheet.create({
  container:{
    height:'100%',
  },
})

export default HomeScreen;