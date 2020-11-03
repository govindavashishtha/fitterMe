import React,{useState} from 'react';
import {
  StyleSheet,
  View,Text,TextInput,
  TouchableOpacity
} from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../Constants/Colors';
import Header from './../Components/Header';

const DesignScreen = ()=>{

  const [query, setQuery] = useState('');
  const [error, setError] = useState(false);

  const fetchAPI = () => {
    console.log('refreshed');
    let YOUR_APP_ID = '0dd5e843';
    let YOUR_APP_KEY = '3ffcdd627a25d5dbf157a3a3854af603';
    let Query = query.replace(/\s/g, '%20')
    fetch(`https://api.edamam.com/api/nutrition-data?app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&ingr=${Query}`, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        setError(false);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      });
  }

    return (
      <>
       <Header title={'Design'}/>
       <View style={styles.container}>
        <View  style={styles.icon}> 
          <TouchableOpacity onPressIn={fetchAPI}>
           <Icon name={'search'} size={20} color={Colors.charcoalGrey80} />
          </TouchableOpacity>
        </View>
          <TextInput style={styles.search} placeholder='Search...' placeholderTextColor={Colors.charcoalGrey80} onChangeText={(n) => {setQuery(n)}} />
          <Text style={styles.text}>Search food item and get its Nutritional Values (e.g. 1 large apple)</Text>
       </View>
      </>  
    )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'flex-start',
    alignItems:'center',
    zIndex: 0,
  },
  text: {
    fontSize: 22,
    fontFamily: 'Karla-Regular',
    padding: 20,
    textAlign: 'center'
  },
  search: {
    borderColor: Colors.primaryColorDark,
    borderWidth: 2,
    borderRadius: 50,
    width: '90%',
    marginTop: 10,
    padding: 12,
    textAlign: 'center',
    fontSize: 12,
  },
  icon: {
    position: 'absolute',
    right: 37,
    top: 27,
    zIndex: 1,
  },
  searchcontainer: {

  }
})
export default DesignScreen;