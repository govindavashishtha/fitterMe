import React from 'react';
import {
  StyleSheet,
  View,Text,
} from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../Constants/Colors';
import Header from './../Components/Header';

const DesignScreen = ()=>{

  const fetchAPI = () => {
    console.log('refreshed');
    let YOUR_APP_ID = '0dd5e843';
    let YOUR_APP_KEY = '3ffcdd627a25d5dbf157a3a3854af603';
    fetch(`https://api.edamam.com/api/nutrition-data?app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&ingr=1%20large%20mango`, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
      })
      .catch((error) => {
        console.error(error);
      });
  }

    return (
      <>
       <Header title={'Design'}/>
       <View style={styles.container}>
        <Button onPress={fetchAPI}>get</Button>
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