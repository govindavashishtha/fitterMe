import React from 'react';
import {
  StyleSheet,
  View,Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../Constants/Colors';
import Header from './../Components/Header';

const DesignScreen = ()=>{

    return (
      <>
       <Header title={'Design'}/>
       <View style={styles.container}>
        <Icon name={'paperclip'} size={30} color={Colors.charcoalGrey80} />
        <Text style={styles.text}>Coming Soon</Text>
       </View>
      </>  
    )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  text: {
    fontSize: 20,
    fontFamily: 'Karla-Regular',
    padding: 10,
    textAlign: 'center'
  }
})
export default DesignScreen;