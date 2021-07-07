import React from 'react';
import {
    View,Text,ImageBackground,StyleSheet
  } from 'react-native';
import ThemeButton from '../Components/ThemeButton';


  const Welcome = ({navigation}) => {
      return(
        <View style = {{flex:1 , justifyContent:'space-evenly'}}>
            <ImageBackground source={require('./../assets/deadlift1.jpg')}
             style={{width:'100%',height: '100%'}} >
              <View style={styles.end}>
                <Text style ={styles.text}>Welcome</Text>
                <View style={{marginHorizontal:20,}}>
                <ThemeButton title={'Continue➝'} onPress={()=>{
                    navigation.navigate('TabStack');
                }}/>
                </View> 
              </View>
              </ImageBackground>
        </View>
      )
  }

  const styles = StyleSheet.create({
      text: {
        fontSize: 30,
        fontFamily: 'Pacifico-Regular',
        textAlign:'center',
        color: '#fff',
        letterSpacing: 3,
      }, 
      end: {
        flexDirection: 'column',
        position: 'absolute',
        bottom: 30,
        left: '30%',
      }
  })

  export default Welcome;