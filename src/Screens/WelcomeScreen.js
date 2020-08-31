import React from 'react';
import {
    View,Text,Image,StyleSheet
  } from 'react-native';

  const Welcome = () => {


      return(
        <View>
            <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/fitterme-39927.appspot.com/o/welcome.jpg?alt=media&token=3c404b6e-6127-4300-8c76-98ac0978cc40'}}
             style={{width:'100%',height: '80%', borderRadius: 10}} />
             <Text style ={styles.text}>Welcome!!!!! :)</Text>
             <Text style = {styles.text}>To the FiTtErMe Family</Text>
        </View>
      )
  }

  const styles = StyleSheet.create({
      text: {
        fontSize: 30,
        fontFamily: 'Karla-BoldItalic',
        textAlign:'center',
        color: '#333',
      }
  })

  export default Welcome;