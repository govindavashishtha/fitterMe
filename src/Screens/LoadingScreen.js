import React from 'react';
import {
  View,Text,ImageBackground,StyleSheet,Dimensions
} from 'react-native';
import ThemeButton from '../Components/ThemeButton';
import ScreenNames from './../Constants/ScreenNames'

const LoadingScreen = ({navigation})=>{
    return (
      <View style={styles.container}>
        <View>
          <ThemeButton onPress={()=>{navigation.navigate(ScreenNames.LogInStack)}} /> 
        </View> 
      </View>
    )
}
const styles = StyleSheet.create({
  ImageContainer: {
    paddingVertical:20,
    paddingHorizontal:10,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  text: {
    color: "grey",
    fontSize: 30,
    fontWeight: "bold"
  }
});

export default LoadingScreen;
