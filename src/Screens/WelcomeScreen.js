import React from 'react';
import {
    View,Text,Image,StyleSheet
  } from 'react-native';
  import ThemeButton from '../Components/ThemeButton';

  const Welcome = ({navigation}) => {


      return(
        <View style = {{flex:1 , justifyContent:'space-evenly'}}>
            <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/fitterme-39927.appspot.com/o/welcome.jpg?alt=media&token=3c404b6e-6127-4300-8c76-98ac0978cc40'}}
             style={{width:'100%',height: '80%', borderRadius: 10}} />
              <Text style ={styles.text}>Welcome</Text>
              <View style={{marginHorizontal:20,}}>
              <ThemeButton title={'Continue'} onPress={()=>{
                  navigation.navigate('TabStack');
              }}/>
              </View> 
        </View>
      )
  }

  const styles = StyleSheet.create({
      text: {
        fontSize: 30,
        fontFamily: 'Pacifico-Regular',
        textAlign:'center',
        color: '#333',
      }
  })

  export default Welcome;