import React from 'react';
import {
  View,Text,StyleSheet
} from 'react-native';
import Colors from '../Constants/Colors';
import ScreenNames from './../Constants/ScreenNames'

const LoadingScreen = ({navigation})=>{
    return (
      <View style={styles.container}>
       <Text onPress={()=>{
         navigation.navigate(ScreenNames.LogInStack);
       }} style={styles.logoText}>fitterMe</Text>
       <Text></Text>
      </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    height:'100%',
    backgroundColor:Colors.primaryColorDark,
    justifyContent:'center'
  },
  logoText: {
    color: Colors.white,
    fontSize: 40,
    fontFamily:'Pacifico-Regular',
    textAlign:'center'
  }
});

export default LoadingScreen;
