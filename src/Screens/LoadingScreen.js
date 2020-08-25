import React from 'react';
import {
  View,Text,ImageBackground,StyleSheet
} from 'react-native';
import ThemeButton from '../Components/ThemeButton';
import ScreenNames from './../Constants/ScreenNames'
const image = { uri: "https://picsum.photos/food/picsum/900/300" };


const LoadingScreen = ({navigation})=>{
    return (
      <View style={styles.container}>
    <ImageBackground source={require('./../assets/loading.jpg')} style={styles.image}>
        <View style={styles.container}> 
        <Text style={styles.text}>Inside</Text>
        <View>
        <ThemeButton onPress={()=>{navigation.navigate(ScreenNames.LogInStack)}} title={'LogIn'}/>
        </View>
        
        </View>
      {/* <Text style={styles.text}>Inside</Text> */}
      {/* <ThemeButton onPress={()=>{navigation.navigate(ScreenNames.LogInStack)}} title={'go to login Stack'}/>
          <ThemeButton onPress={()=>{navigation.navigate(ScreenNames.TabStack)}} title={'go to Tab Stack'}/> */}

    </ImageBackground>
  </View>
    )
}
const styles = StyleSheet.create({
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
