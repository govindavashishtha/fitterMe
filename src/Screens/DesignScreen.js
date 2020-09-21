import React from 'react';
import {
  StyleSheet,
  View,Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from './../Components/Header';

const DesignScreen = ()=>{
    return (
      <>
       <Header title={'Design'}/>
       <View style={styles.container}></View>
      </>  
    )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
})
export default DesignScreen;